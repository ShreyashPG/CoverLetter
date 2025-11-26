import dotenv from "dotenv";
dotenv.config();

import fs from "fs";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const generateCoverLetter = async ({
  resume,
  jobInfo,
  role,
  company,
  template,
}) => {

  const systemPrompt = `
You are an expert career writer. 
Generate a professional 200–250 word cover letter based on:
- Candidate resume
- Job description
- Company
- Selected template
Keep tone formal, ATS-friendly, and achievement-focused.
`;

  const templateText = fs.readFileSync(`./templates/${template}.txt`, "utf8");

  const userPrompt = `
Resume:
${resume}

Job Description:
${jobInfo}

Selected Template:
${templateText}

Role: ${role}
Company: ${company}

Generate a tailored cover letter using the structure above.
`;

  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
  });

  const result = await model.generateContent(userPrompt);

  return result.response.text();
};
