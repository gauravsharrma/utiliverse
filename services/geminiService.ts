
import { GoogleGenAI } from "@google/genai";

// Ensure the API key is available in the environment variables
const apiKey = process.env.API_KEY;
if (!apiKey) {
    throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey });

export const generateCreativeIdeas = async (topic: string): Promise<string[]> => {
    if (!topic.trim()) {
        return [];
    }
    
    try {
        const prompt = `Generate a list of 5 creative and unique project ideas about "${topic}". The response should be a JSON array of strings. For example: ["Idea 1", "Idea 2"].`;
        
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash-preview-04-17",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                temperature: 0.9,
            },
        });
        
        let jsonStr = response.text.trim();
        const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
        const match = jsonStr.match(fenceRegex);
        if (match && match[2]) {
            jsonStr = match[2].trim();
        }
        
        const parsedData = JSON.parse(jsonStr);
        
        if (Array.isArray(parsedData) && parsedData.every(item => typeof item === 'string')) {
            return parsedData;
        } else {
            console.error("Parsed data is not an array of strings:", parsedData);
            throw new Error("Invalid response format from AI.");
        }
    } catch (error) {
        console.error("Error generating ideas with Gemini:", error);
        throw new Error("Failed to generate ideas. Please check your API key and try again.");
    }
};
