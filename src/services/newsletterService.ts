import OpenAI from "openai";
import { INewsletter, Newsletter } from "../models/newsletter";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateNewsletter = async (prompt: string): Promise<string> => {
  const response = await client.responses.create({
    model: "gpt-4.1",
    input: prompt,
  });
  
  return response.output_text;
};

export const createNewsletter = async (data: INewsletter): Promise<INewsletter> => {
    const newsletter = new Newsletter(data);
    await newsletter.save();
    return newsletter;
}

export const getAllNewsletter = async (): Promise<INewsletter[]> => {
    return await Newsletter.find();
}