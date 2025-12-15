import { GoogleGenAI, Content, Part } from "@google/genai";
import { CompanyData, ChatMessage } from "../types";
import { AI_CEO_SYSTEM_PROMPT, MARKETING_ANALYSIS_PROMPT } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateCEOAdvice = async (
  currentHistory: ChatMessage[],
  companyData: CompanyData,
  userPrompt: string
): Promise<string> => {
  try {
    const model = "gemini-2.5-flash";
    
    // Construct the context string from company data
    const dataContext = `
      CURRENT COMPANY STATUS REPORT:
      Company Name: ${companyData.name}
      Industry: ${companyData.industry}
      Cash on Hand: $${companyData.cashOnHand.toLocaleString()}
      
      MARKETING INTELLIGENCE:
      Segments: ${companyData.marketingSegments.map(s => `${s.name} (CLV: $${s.clv}, Sentiment: ${s.sentiment})`).join(', ')}
      Brand Humanity Index: Intellect ${companyData.brandIndex.intellect}/100, Emotionality ${companyData.brandIndex.emotionality}/100, Morality ${companyData.brandIndex.morality}/100.
      
      Recent Performance (Last Month):
      Revenue: $${companyData.history[companyData.history.length - 1].revenue.toLocaleString()}
      Users: ${companyData.history[companyData.history.length - 1].users.toLocaleString()}
    `;

    const contents: Content[] = currentHistory.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text } as Part]
    }));

    contents.push({
      role: 'user',
      parts: [{ text: `[SYSTEM DATA CONTEXT]\n${dataContext}\n\n[USER QUERY]\n${userPrompt}` }]
    });

    const response = await ai.models.generateContent({
      model: model,
      contents: contents,
      config: {
        systemInstruction: AI_CEO_SYSTEM_PROMPT,
        temperature: 0.7, 
        maxOutputTokens: 1000,
      }
    });

    return response.text || "I need to review the board reports before answering that. (Error generating response)";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "My strategic analysis is currently unavailable due to a connection issue. Please try again shortly.";
  }
};

export const simulateScenario = async (
  companyData: CompanyData,
  scenario: string
): Promise<string> => {
  try {
     const prompt = `
     As the CEO/CMO, run a simulation for the following strategic decision: "${scenario}".
     
     Based on our current metrics (Cash: $${companyData.cashOnHand}, Segments: ${companyData.marketingSegments.length}), provide:
     1. Projected Outcome (Best Case & Worst Case)
     2. Potential Risks
     3. Alignment with Marketing 5.0 (Data-driven, Agile, Human-centric)
     4. Your Final Decision
     
     Format the output as a structured executive memo.
     `;

     const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are a pragmatic, data-driven Executive running a risk assessment simulation.",
        temperature: 0.4,
      }
    });

    return response.text || "Simulation failed.";
  } catch (error) {
    console.error("Simulation Error", error);
    return "Unable to run simulation protocols.";
  }
}

export const generateNextBestActions = async (companyData: CompanyData): Promise<any[]> => {
  try {
    const context = `
      Segments: ${JSON.stringify(companyData.marketingSegments)}
      Brand Humanity Index: ${JSON.stringify(companyData.brandIndex)}
      Industry: ${companyData.industry}
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Context: ${context}`,
      config: {
        systemInstruction: MARKETING_ANALYSIS_PROMPT,
        temperature: 0.5,
        responseMimeType: "application/json"
      }
    });

    // Clean up potential markdown code blocks if the model includes them despite instructions
    let jsonStr = response.text || "[]";
    jsonStr = jsonStr.replace(/```json/g, '').replace(/```/g, '');
    
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error("Marketing Analysis Error", error);
    return [
      { title: "Error", target: "System", action: "Check API Connection", impact: "High" }
    ];
  }
}
