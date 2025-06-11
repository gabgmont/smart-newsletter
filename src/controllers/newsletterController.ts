import { Request, Response } from 'express';
import { generateNewsletter } from '../services/newsletterService';

export const makeNewsletter = async (req: Request, res: Response): Promise<void> => {
    const { prompt } = req.body;
    const newsletter = await generateNewsletter(prompt);
  
    res.json({ newsletter });
  };