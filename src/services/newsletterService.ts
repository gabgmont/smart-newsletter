import OpenAI from "openai";
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
