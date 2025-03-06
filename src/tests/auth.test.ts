import { PrismaClient } from '@prisma/client';
import request from 'supertest';
import app from '../server';


const prisma = new PrismaClient();

const testUser = {
  email: 'testuser@example.com',
  password: 'Test@1234',
};

let refreshToken: string;
let accessToken: string;

beforeAll(async () => {
  await prisma.user.deleteMany(); // Clean database before tests
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe('Auth API Tests', () => {
  test('Should register a new user successfully', async () => {
    const res = await request(app).post('/api/auth/register').send(testUser);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('User registered successfully');
  });

  test('Should not register a user with an existing email', async () => {
    const res = await request(app).post('/api/auth/register').send(testUser);
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('User already exists');
  });

  test('Should login successfully and receive tokens', async () => {
    const res = await request(app).post('/api/auth/login').send(testUser);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('accessToken');
    expect(res.body).toHaveProperty('refreshToken');
    accessToken = res.body.accessToken;
    refreshToken = res.body.refreshToken;
  });

  test('Should fail login with wrong password', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: testUser.email,
      password: 'wrongpassword',
    });
    expect(res.status).toBe(401);
    expect(res.body.error).toBe('Invalid credentials');
  });

  test('Should refresh access token using refresh token', async () => {
    const res = await request(app).post('/api/auth/refresh').send({ token: refreshToken });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('accessToken');
  });

  test('Should fail refresh with invalid refresh token', async () => {
    const res = await request(app).post('/api/auth/refresh').send({ token: 'invalidtoken' });
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Invalid refresh token');
  });

  test('Should request password reset', async () => {
    const res = await request(app).post('/api/auth/reset-password-request').send({ email: testUser.email });
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Password reset email sent');
  });

  test('Should fail password reset request for non-existent email', async () => {
    const res = await request(app).post('/api/auth/reset-password-request').send({ email: 'unknown@example.com' });
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('User not found');
  });
});
