import { GoogleGenAI, Type } from "@google/genai";
import { WordAnalysis } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeWordWithGemini = async (word: string): Promise<WordAnalysis> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Analyze the English word "${word}" for phonics learning. 
      1. Break it into natural speaking syllables.
      2. Identify specific phonics patterns (digraphs, blends, vowel teams, suffixes) within the word and their character indices (0-based) relative to the full word string.
      3. Create a simple, easy-to-understand example sentence using the word.
      `,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            word: { type: Type.STRING },
            syllables: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING } 
            },
            phonicsMatches: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  pattern: { type: Type.STRING },
                  indices: { 
                    type: Type.ARRAY, 
                    items: { type: Type.INTEGER } 
                  }
                }
              }
            },
            sentence: { type: Type.STRING }
          },
          required: ["word", "syllables", "phonicsMatches", "sentence"]
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as WordAnalysis;
    }
    throw new Error("Empty response from AI");
  } catch (error) {
    console.error("Error analyzing word:", error);
    // Fallback for demo purposes if API fails or key is missing
    return {
      word: word,
      syllables: [word],
      phonicsMatches: [],
      sentence: `Could not analyze "${word}" at the moment. Please check your connection or API key.`
    };
  }
};