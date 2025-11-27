import { GoogleGenAI } from "@google/genai";
import { Tear } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const analyzeFactoryStatus = async (teares: Tear[]): Promise<string> => {
  if (!apiKey) {
    return "API Key não configurada. Por favor configure a chave da API do Gemini.";
  }

  const dataContext = JSON.stringify(teares);

  const prompt = `
    Atue como um gerente de produção têxtil experiente.
    Aqui estão os dados atuais de 10 teares jacquard da minha fábrica:
    ${dataContext}

    Por favor, forneça um relatório curto e direto em Português de Portugal (pt-PT) com:
    1. Um resumo do estado atual da produção.
    2. Alertas críticos (ex: máquinas paradas ou manutenções longas).
    3. Sugestões rápidas para otimização.
    
    Use formatação Markdown para deixar legível. Seja profissional e conciso.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    
    return response.text || "Não foi possível gerar a análise.";
  } catch (error) {
    console.error("Error analyzing factory:", error);
    return "Erro ao comunicar com o serviço de IA. Verifique a consola.";
  }
};