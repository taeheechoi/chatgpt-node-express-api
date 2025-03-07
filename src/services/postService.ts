import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createPost = async (userId: string, title: string, content: string) => {
  return await prisma.post.create({
    data: { userId, title, content },
  });
};

export const getAllPosts = async () => {
  return await prisma.post.findMany({
    include: { user: { select: { email: true } } }, // Include user email in response
  });
};

export const getPostsByUser = async (userId: string) => {
  return await prisma.post.findMany({
    where: { userId: userId },
    include: { user: { select: { email: true } } }, // Include user email in response
  });
};
