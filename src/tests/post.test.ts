import { PrismaClient } from "@prisma/client";
import jwt from 'jsonwebtoken'; // Import the jsonwebtoken library
import request from "supertest";
import { config } from '../config';
import app, { server } from "../server";

const prisma = new PrismaClient();

let userToken: string;
let postId: string;
let userId: string; 

beforeAll(async () => {
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();

  // Register and login to get an access token
  const registerRes = await request(app)
    .post("/api/auth/register")
    .send({ email: "test@example.com", password: "Test@1234" });
  
    const loginRes = await request(app)
    .post("/api/auth/login")
    .send({ email: "test@example.com", password: "Test@1234" });
  
    userToken = loginRes.body.accessToken;

    const decoded = jwt.verify(userToken, config.jwtSecret) as { userId: string };
    userId = decoded.userId;

});

afterAll(async () => {
  await prisma.$disconnect();
  await new Promise<void>((resolve, reject) => { // Close the server
    server.close((err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
});

describe("Post API Tests", () => {
  test("Should create a post", async () => {
    const res = await request(app)
      .post("/api/posts")
      .set("Authorization", `Bearer ${userToken}`)
      .send({ title: "Test Post", content: "This is a test post content." });

    expect(res.status).toBe(201);
    expect(res.body.post).toHaveProperty("id");
    postId = res.body.post.id;
  });

  test("Should fetch posts", async () => {
    const res = await request(app)
      .get("/api/posts")
      .set("Authorization", `Bearer ${userToken}`);

    expect(res.status).toBe(200);
    expect(res.body.posts.length).toBeGreaterThan(0);
  });

  test("Should not create a post with invalid data", async () => {
    const res = await request(app)
      .post("/api/posts")
      .set("Authorization", `Bearer ${userToken}`)
      .send({ title: "", content: "Short" });

    expect(res.status).toBe(400);
  });

  test("Should fail without authentication", async () => {
    const res = await request(app)
      .post("/api/posts")
      .send({ title: "Title", content: "Content" });

    expect(res.status).toBe(401);
  });

  test("Should get posts by user", async () => {
    const res = await request(app)
      .get("/api/posts/user")
      .set("Authorization", `Bearer ${userToken}`)
   
    expect(res.status).toBe(200);
    expect(res.body.posts).toBeDefined();
    expect(res.body.posts.length).toBeGreaterThan(0);
    res.body.posts.forEach((post: { userId: string; }) => {
      expect(post.userId).toBe(userId);
    });
  });
});
