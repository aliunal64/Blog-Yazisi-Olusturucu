
import { GoogleGenAI } from "@google/genai";
import type { BlogCriteria, BlogPost } from "../types";

const parseGeneratedText = (text: string): BlogPost => {
  const lines = text.trim().split('\n');
  const title = lines[0] || 'Untitled Post';
  const body = lines.slice(1).join('\n').trim();
  return { title, body };
};

export const generateBlogPost = async (criteria: BlogCriteria): Promise<BlogPost> => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set.");
  }
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const prompt = `
# ROL
Sen, uzman bir içerik yazarı ve SEO editörüsün.

# GÖREV
Aşağıda "KRİTERLER" bölümünde detayları verilen bilgilere göre profesyonel, bilgilendirici ve hedef kitleye uygun bir blog yazısı taslağı oluştur. Yazı, belirtilen konu, üslup, uzunluk ve özel isteklere tam olarak uymalıdır.

# KRİTERLER
---
Konu: ${criteria.topic}
Hedef Kitle: ${criteria.audience}
Üslup: ${criteria.tone}
Uzunluk: ${criteria.length}
Ek İstekler: ${criteria.extraRequests}
---

# ÇIKTI FORMATI
Lütfen çıktıyı doğrudan blog yazısı olarak, bir başlık ve ardından metin gövdesi şeklinde oluştur.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    const text = response.text;
    if (!text) {
      throw new Error("API returned an empty response.");
    }
    
    return parseGeneratedText(text);

  } catch (error) {
    console.error("Error generating blog post:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to generate content: ${error.message}`);
    }
    throw new Error("An unknown error occurred while generating content.");
  }
};
