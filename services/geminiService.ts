
import { GoogleGenAI } from "@google/genai";

// Initialize the GoogleGenAI client following guidelines
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const searchGhazipurServices = async (query: string) => {
  // Use ai.models.generateContent to query GenAI with both the model name and prompt.
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `The user is looking for service information in Ghazipur, UP: ${query}. Provide a helpful summary of where they can find these services or general advice for this region.`,
    config: {
      tools: [{ googleSearch: {} }],
    },
  });

  // Access the extracted string output directly via the .text property
  const text = response.text || "No information found.";
  // Extract URLs from groundingChunks when Google Search is used
  const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

  return { text, sources };
};

export const editImageWithPrompt = async (base64Image: string, prompt: string, mimeType: string) => {
  // Use ai.models.generateContent to edit images with gemini-2.5-flash-image
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        {
          inlineData: {
            data: base64Image,
            mimeType: mimeType,
          },
        },
        {
          text: `Edit this image based on the prompt: ${prompt}. Return only the edited image.`,
        },
      ],
    },
  });

  // Iterate through parts to find the image part, do not assume it's the first one.
  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
    }
  }
  return null;
};
