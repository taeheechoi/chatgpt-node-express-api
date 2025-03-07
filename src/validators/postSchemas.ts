import { z } from 'zod';

export const createPostSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters long"),
  content: z.string().min(10, "Content must be at least 10 characters long"),
});

export type CreatePostInput = z.infer<typeof createPostSchema>;
