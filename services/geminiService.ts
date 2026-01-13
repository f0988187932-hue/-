
import { GoogleGenAI } from "@google/genai";

export const generateBusinessSummary = async (data: any) => {
  // Fix: Initialize GoogleGenAI strictly following the guideline to use process.env.API_KEY directly
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `
    請根據以下仲介公司的營運數據提供一份繁體中文的簡短商業洞察摘要（約 200 字）：
    數據概要：
    - 當月成交量：${data.transactionsCount} 筆
    - 總成交金額：$${data.totalSales.toLocaleString()}
    - 待處理合約到期提醒：${data.expiringContractsCount} 件
    - 包租代管件數：${data.rentalsCount} 件
    - 本月總收入：$${data.totalIncome.toLocaleString()}
    - 本月總支出：$${data.totalExpenses.toLocaleString()}
    
    請特別針對「合約到期提醒」與「財務健康度」給出具體建議。
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    // Fix: Access response.text directly (property, not a method)
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "無法生成 AI 摘要，請檢查網路連線或 API 金鑰配置。";
  }
};
