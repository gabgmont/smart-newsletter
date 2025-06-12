import OpenAI from "openai";
import { INewsletter, Newsletter } from "../models/newsletter";
import { sendEmail } from "./emailService";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Base Prompts -
const basePrompts = [
  'Gere uma newsletter em HTML sobre o seguinte tema: [THEME].\nData: [DATE].\nAssinatura: [SIGNATURE].\nO estilo deve ser semelhante ao "[REFERENCE]", com leitura de até [READ TIME]. Considere o tempo de leitura para gerar mais conteúdo, conforme maior for o tempo de leitura.\n\nA newsletter deve conter:\n- Um título em destaque;\n- Um subtítulo com o tempo estimado de leitura;\n- Parágrafos bem organizados explicando o que aconteceu e as perspectivas futuras;\n- De exemplos de situações reais ou notícias relevantes sobre o assunto;\n- Uma assinatura final com o nome indicado;\n- Formatação limpa e simples, adequada para email marketing (uso de tags HTML básicas como <h1>, <p>, <strong>, <a>, <button>, etc.).\n\nGere apenas o código HTML da newsletter.',
];

export const generateNewsletterPrompt = async (
  prompt: string
): Promise<string> => {
  const response = await client.responses.create({
    model: "gpt-4o",
    input: prompt,
  });

  return (
    "<!DOCTYPE html>" +
    response.output_text
      .split("</html>")[0]
      .split("<!DOCTYPE html>")[1]
      .replaceAll("\n", "")
      .replace("```html", "")
      .replace("```", "") +
    "</html>"
  );
};

export const generateNewsletterParameters = async (
  promptType: number,
  theme: string,
  signature: string,
  referenceStyle: string,
  readingTime: string
): Promise<string> => {
  const response = await client.responses.create({
    model: "gpt-4o",
    input: basePrompts[promptType]
      .replace("[THEME]", theme)
      .replace("[SIGNATURE]", signature)
      .replace("[REFERENCE]", referenceStyle)
      .replace("[READ TIME]", readingTime)
      .replace("[DATE]", Date.now().toString()),
  });

  const newsletterHtml =
    "<!DOCTYPE html>" +
    response.output_text
      .split("</html>")[0]
      .split("<!DOCTYPE html>")[1]
      .replaceAll("\n", "")
      .replace("```html", "")
      .replace("```", "") +
    "</html>";
    await sendEmail({
      to: "gabg.mont@hotmail.com",
      subject: "Sua smart newsletter chegou!",
      text: "Confira abaixo:",
      html: newsletterHtml,
    });
  return newsletterHtml;
};

export const createNewsletter = async (
  data: INewsletter
): Promise<INewsletter> => {
  const newsletter = new Newsletter(data);
  await newsletter.save();
  return newsletter;
};

export const getAllNewsletter = async (): Promise<INewsletter[]> => {
  return await Newsletter.find();
};

export const sendNewsletter = async (id: string): Promise<void> => {
  const newsletter = await Newsletter.findById(id); 

  if (newsletter == null) {
    return;
  }
  console.log(newsletter);
  const newsletterHtml = await generateNewsletterPrompt(newsletter.prompt);

  for (const index in newsletter?.emailList) {
    sendEmail({
      to: newsletter.emailList[index],
      subject: "Sua smart newsletter chegou!",
      text: "Confira abaixo:",
      html: newsletterHtml,
    });
  }
}
