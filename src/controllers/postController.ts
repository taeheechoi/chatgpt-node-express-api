import { Request, Response } from 'express';
import * as postService from '../services/postService';

export const createPost = async (req: Request, res: Response) => {
  try {
    const userId = req.body.userId; // Extract from auth middleware
    const { title, content } = req.body;

    const post = await postService.createPost(userId, title, content);
    res.status(201).json({ message: 'Post created successfully', post });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create post' });
  }
};

export const getPosts = async (_req: Request, res: Response) => {
  try {
    const posts = await postService.getAllPosts();
    res.status(200).json({ posts });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
};

export const getPostsByUser = async (req: Request, res: Response) => {
  try {
    const userId = req.body.userId; // Extract from auth middleware or params
    const posts = await postService.getPostsByUser(userId);
    res.status(200).json({ posts });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch posts by user' });
  }
};