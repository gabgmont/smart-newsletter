import { Request, Response } from "express";
import { generateNewsletterPrompt } from "../services/newsletterService";
import { INewsletter } from "../models/newsletter";
import * as newsletterService from "../services/newsletterService";

export const validatePrompt = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { prompt } = req.body;
  const newsletter = await generateNewsletterPrompt(prompt);

  res.json({ newsletter });
};

export const validateParameters = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { promptType, theme, signature, referenceStyle, readingTime } =
    req.body;

  const newsletter = await newsletterService.generateNewsletterParameters(
    promptType,
    theme,
    signature,
    referenceStyle,
    readingTime
  );

  res.json({ newsletter });
};

export const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = req.body as INewsletter;
    const newsletter = await newsletterService.createNewsletter(data);

    res.status(201).json(newsletter);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar newsletter" });
  }
};

export const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const newsletters = await newsletterService.getAllNewsletter();
    console.log("Newsletters: ", newsletters);
    res.status(200).json(newsletters);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar newsletter" });
  }
};

export const send = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    newsletterService.sendNewsletter(id);
    res.status(200);
  } catch (error) {
    res.status(500).json({ error: "Erro ao enviar newsletter" });
  }
};
