import { NextFunction, Request, Response } from 'express';
import { ZodError, ZodSchema } from 'zod';

export const validateRequest = (schema: ZodSchema<any>) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ errors: error.errors }); // Ensure proper Zod error handling
      } else {
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  };
};
