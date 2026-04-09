import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export interface ExtractedDetails {
  // name: string | null;
  issueDate: string | null;
  expiryDate: string | null;
  // confidence: number;
  // summary: string;
}

export async function extractDetailsFromDocument(
  fileBase64: string,
  mimeType: string,
  isTextOnly: boolean = false
): Promise<ExtractedDetails> {
  const model = "gemini-3-flash-preview";

  const prompt = `Extract the following details from the document:
1. Issue Date
2. Expiry Date

If a detail is not found, return null for that field.`;

  const contents = isTextOnly
    ? prompt + "\n\nDocument Content:\n" + fileBase64
    : {
        parts: [
          {
            inlineData: {
              mimeType,
              data: fileBase64,
            },
          },
          { text: prompt },
        ],
      };

  try {
    const response = await ai.models.generateContent({
      model,
      contents,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            // name: { type: Type.STRING, nullable: true },
            issueDate: { type: Type.STRING, nullable: true },
            expiryDate: { type: Type.STRING, nullable: true },
            // confidence: { type: Type.NUMBER, description: "Confidence score from 0 to 1" },
            // summary: { type: Type.STRING },
          },
          // required: ["name", "issueDate", "expiryDate", "confidence", "summary"],
          required: ["issueDate", "expiryDate"],
        },
      },
    });

    const text = response.text || "{}";
    return JSON.parse(text) as ExtractedDetails;
  } catch (error) {
    console.error("Gemini extraction error:", error);
    throw new Error("Failed to extract details from document.");
  }
}
