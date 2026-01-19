import { GoogleGenAI, Type, Schema, Chat } from "@google/genai";
import { Question, DocReference, ImageSize } from "../types";
import { APP_CONFIG } from "../config";

const getClient = async (requiresUserKey = false): Promise<GoogleGenAI> => {
  const win = window as any;
  if (requiresUserKey && win.aistudio) {
    const hasKey = await win.aistudio.hasSelectedApiKey();
    if (!hasKey) {
      await win.aistudio.openSelectKey();
    }
    return new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

// --- Chat Service ---

let chatSession: Chat | null = null;

export const sendMessageToChat = async (message: string, context?: string): Promise<string> => {
  try {
    const ai = await getClient();

    if (!chatSession) {
      chatSession = ai.chats.create({
        model: APP_CONFIG.MODELS.CHAT,
        config: {
          systemInstruction: `あなたは学習アプリの優秀なメンターです。
          ユーザーは多肢選択式の問題を解いています。
          質問には簡潔かつ分かりやすく、日本語で答えてください。
          必要であれば具体的なコード例や例え話を用いてください。`,
        },
      });
    }

    const fullMessage = context
      ? `[現在の問題コンテキスト]\n${context}\n\n[ユーザーの質問]\n${message}`
      : message;

    const response = await chatSession.sendMessage({ message: fullMessage });
    return response.text || "申し訳ありません。応答を生成できませんでした。";
  } catch (error) {
    console.error("Chat error:", error);
    return "エラーが発生しました。もう一度お試しください。";
  }
};

// --- Similar Problem Generation ---

export const generateSimilarQuestion = async (originalQuestion: Question): Promise<Question | null> => {
  try {
    const ai = await getClient();

    const schema: Schema = {
      type: Type.OBJECT,
      properties: {
        id: { type: Type.STRING },
        text: { type: Type.STRING },
        options: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              text: { type: Type.STRING },
            },
            required: ["id", "text"]
          }
        },
        correctOptionIds: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        },
        explanation: { type: Type.STRING },
        category: { type: Type.STRING },
        tags: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        },
      },
      required: ["id", "text", "options", "correctOptionIds", "explanation", "category", "tags"]
    };

    const prompt = `以下の問題に似た新しい問題を1つ作成してください。
    分野、難易度は維持しつつ、別の角度から知識を問う問題にしてください。
    JSON形式で出力してください。

    [元の問題]
    分野: ${originalQuestion.category}
    問題文: ${originalQuestion.text}
    正解: ${originalQuestion.explanation}
    `;

    const response = await ai.models.generateContent({
      model: APP_CONFIG.MODELS.GENERATION,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
      }
    });

    const jsonText = response.text;
    if (!jsonText) return null;

    const newQuestion = JSON.parse(jsonText) as Question;
    newQuestion.id = `gen-${Date.now()}`;
    return newQuestion;

  } catch (error) {
    console.error("Generation error:", error);
    return null;
  }
};

// --- Question Correction (Fix Fake/Incorrect) ---

export const fixQuestion = async (originalQuestion: Question, context: string, userFeedback?: string): Promise<Question | null> => {
  try {
    const ai = await getClient();

    const schema: Schema = {
      type: Type.OBJECT,
      properties: {
        id: { type: Type.STRING },
        text: { type: Type.STRING },
        options: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              text: { type: Type.STRING },
            },
            required: ["id", "text"]
          }
        },
        correctOptionIds: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        },
        explanation: { type: Type.STRING },
        category: { type: Type.STRING },
        tags: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        },
        urls: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        }
      },
      required: ["id", "text", "options", "correctOptionIds", "explanation", "category", "tags"]
    };

    const prompt = `User flagged the following question as INCORRECT or FAKE.
    Please act as a rigid Quality Assurance auditor for the context: "${context}".
    
    User Feedback (Reason for flagging): "${userFeedback || "No specific reason provided. Please review thoroughly."}"
    
    Analyze the question for factual errors, ambiguity, or incorrect options/explanations, paying close attention to the user's feedback.
    
    Task:
    1. Correct any factual errors in the question text, options, or explanation.
    2. Ensure the correctOptionIds match the actually correct options.
    3. Improve the explanation to be more precise and cite the reasoning.
    4. Keep the same ID.
    5. Return the corrected question object in JSON.

    [Flagged Question]
    ${JSON.stringify(originalQuestion)}
    `;

    const response = await ai.models.generateContent({
      model: APP_CONFIG.MODELS.GENERATION,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
      }
    });

    const jsonText = response.text;
    if (!jsonText) return null;

    return JSON.parse(jsonText) as Question;

  } catch (error) {
    console.error("Fix question error:", error);
    return null;
  }
};


// --- Documentation Search (Grounding) ---

export const findOfficialDocumentation = async (questionText: string, category: string, context: string): Promise<DocReference[]> => {
  try {
    const ai = await getClient();

    const prompt = `Find official documentation and reference links that explain the following question.
    
    Global Context: ${context}
    Category: ${category}
    Question: ${questionText}
    
    Please select the top 2 or 3 most relevant official documentation pages (e.g., official docs, guides).
    Avoid generic tutorials if official documentation is available.
    For each page, provide the URL, the Title, and a brief 1-sentence summary of its content.
    
    Output the results in the following plain text format for each entry (separated by "---"):
    
    URL: <url>
    TITLE: <title>
    SUMMARY: <summary>
    ---
    URL: <url>...
    `;

    const response = await ai.models.generateContent({
      model: APP_CONFIG.MODELS.SEARCH,
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
      }
    });

    const text = response.text || "";
    const references: DocReference[] = [];

    const blocks = text.split('---');
    for (const block of blocks) {
      const urlMatch = block.match(/URL:\s*(.+)/i);
      const titleMatch = block.match(/TITLE:\s*(.+)/i);
      const summaryMatch = block.match(/SUMMARY:\s*(.+)/i);

      if (urlMatch && titleMatch) {
        const clean = (s: string) => s.replace(/\*\*/g, '').trim();
        references.push({
          uri: clean(urlMatch[1]),
          title: clean(titleMatch[1]),
          summary: summaryMatch ? clean(summaryMatch[1]) : undefined
        });
      }
    }

    if (references.length === 0) {
      const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
      chunks.forEach((chunk: any) => {
        if (chunk.web && chunk.web.uri && chunk.web.title) {
          references.push({
            title: chunk.web.title,
            uri: chunk.web.uri,
          });
        }
      });
    }

    return references.filter((v, i, a) => a.findIndex(t => (t.uri === v.uri)) === i).slice(0, 3);
  } catch (error) {
    console.error("Search error:", error);
    return [];
  }
};

// --- Image Generation ---

export const generateStudyImage = async (prompt: string, size: ImageSize): Promise<string | null> => {
  try {
    const ai = await getClient(true);

    const response = await ai.models.generateContent({
      model: APP_CONFIG.MODELS.IMAGE,
      contents: {
        parts: [
          { text: prompt }
        ]
      },
      config: {
        imageConfig: {
          aspectRatio: "16:9",
          imageSize: size
        }
      }
    });

    if (response.candidates?.[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          const base64EncodeString = part.inlineData.data;
          const mimeType = part.inlineData.mimeType || 'image/png';
          return `data:${mimeType};base64,${base64EncodeString}`;
        }
      }
    }
    return null;
  } catch (error) {
    console.error("Image generation error:", error);
    throw error;
  }
};