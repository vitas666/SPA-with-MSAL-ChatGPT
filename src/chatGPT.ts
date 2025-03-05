import { AzureOpenAI } from 'openai';
import { ChatCompletion } from 'openai/resources/index.mjs';

const endpoint = process.env["AZURE_OPENAI_ENDPOINT"] || "https://vitas-m7viocp8-eastus2.openai.azure.com/";  
const apiVersion = "2024-05-01-preview";
const deployment = "gpt-4o";
const apiKey = process.env["AZURE_OPENAI_API_KEY"] || "864HXGx892NdVu196eSHZTDNAfDLYogNaJQfdZWSpPBvGyOhQnOlJQQJ99BCACHYHv6XJ3w3AAAAACOGRuAM";  
const openai = new AzureOpenAI({ endpoint, apiKey, apiVersion, deployment, dangerouslyAllowBrowser: true });  

export const chatWithGPT = async (message: string) => {
  try {
    const response: ChatCompletion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: message }],
      temperature: 0.7,
    });
    return response.choices[0].message.content;
  } catch (error: unknown) {
    return `Error while fetching response, message: ${error}`;
  }
};
