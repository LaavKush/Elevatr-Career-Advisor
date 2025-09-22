// import express from "express";
// import cors from "cors";
// import multer from "multer";
// import dotenv from "dotenv";
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import fs from "fs";
// import path from "path";

// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// // ✅ Correct import
// import pdf from "pdf-parse/lib/pdf-parse.js";

// // Ensure uploads folder exists
// const uploadDir = path.join(process.cwd(), "uploads");
// if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

// // Multer setup
// const upload = multer({ dest: uploadDir });

// // Google Generative AI setup
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// // Resume upload endpoint
// app.post("/upload", upload.single("resume"), async (req, res) => {
//   if (!req.file) return res.status(400).json({ error: "No file uploaded" });

//   const filePath = req.file.path;

//   try {
//     const dataBuffer = fs.readFileSync(filePath);
//     const pdfData = await pdf(dataBuffer);
//     const resumeText = pdfData.text;

//    const prompt = `
// You are an expert career advisor. Read the following resume text carefully and generate a **very detailed summary**. Organize the summary into clear sections with headings and bullet points. Highlight the candidate's key strengths, technical and soft skills, accomplishments, and career potential.

// Summary should include:

// 1. **Profile Overview:** A concise introduction of the candidate, including motivation, academic background, and core competencies.
// 2. **Education:** List degrees, universities, years, CGPA or grades, and any notable academic achievements.
// 3. **Skills:** Separate into:
//    - **Technical Skills:** Programming languages, frameworks, tools, libraries, databases, cloud services.
//    - **Soft Skills:** Communication, leadership, teamwork, problem-solving, adaptability, etc.
// 4. **Work Experience & Internships:** Include company, role, duration, technologies used, and achievements or contributions.
// 5. **Projects:** Describe key projects, technologies used, and impact or outcomes.
// 6. **Achievements & Awards:** Any competitions, hackathons, certifications, or recognitions.
// 7. **Extracurricular Activities & Leadership:** Clubs, leadership positions, community involvement.
// 8. **Career Potential:** Suggest suitable career paths, growth potential, and skills to focus on next.

// Use clear headings, bullet points where appropriate, and keep the summary professional, readable, and structured. Avoid vague statements. Emphasize measurable outcomes and real-world impact.

// Resume Text:
// ${resumeText}
// `;


//     const result = await model.generateContent(prompt);
//     const summary = result.response.text();

//     fs.unlinkSync(filePath); // delete after processing

//     res.json({ summary });
//   } catch (error) {
//     console.error("Error processing resume:", error);

//     if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

//     res.status(500).json({ error: "Resume processing failed" });
//   }
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () =>
//   console.log(`✅ Backend running on http://localhost:${PORT}`)
// );


// import express from "express";
// import cors from "cors";
// import multer from "multer";
// import dotenv from "dotenv";
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import fs from "fs";
// import path from "path";
// import pdf from "pdf-parse/lib/pdf-parse.js";

// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Ensure uploads folder exists
// const uploadDir = path.join(process.cwd(), "uploads");
// if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

// // Multer setup
// const upload = multer({ dest: uploadDir });

// // Google Generative AI setup
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// // ------------------ RESUME UPLOAD ------------------
// app.post("/upload", upload.single("resume"), async (req, res) => {
//   if (!req.file) return res.status(400).json({ error: "No file uploaded" });

//   const filePath = req.file.path;

//   try {
//     const dataBuffer = fs.readFileSync(filePath);
//     const pdfData = await pdf(dataBuffer);
//     const resumeText = pdfData.text;

//     // 1️⃣ Generate detailed summary
//     const summaryPrompt = `
// You are an expert career advisor. Read the following resume text and generate a **very detailed summary** with clear sections, headings, and bullet points.
// Highlight: Profile Overview, Education, Skills, Work Experience, Projects, Achievements, Extracurricular Activities, and Career Potential.

// Resume Text:
// ${resumeText}
// `;
//     const summaryResult = await model.generateContent(summaryPrompt);
//     const summary = summaryResult.response.text();

//     // 2️⃣ Generate AI recommendations
//     const recommendationsPrompt = `
// You are a career guide. Based on the following detailed resume summary, provide **personalized recommendations** for the candidate. Include:

// 1. Suggested next steps in learning and skill development.
// 2. Recommended courses, certifications, or workshops.
// 3. Suitable internships or job roles.
// 4. Tips to improve portfolio, networking, and career growth.

// Resume Summary:
// ${summary}
// `;
//     const recommendationsResult = await model.generateContent(recommendationsPrompt);
//     const recommendations = recommendationsResult.response.text();

//     // 3️⃣ Generate suggested questions using numbered list
//     const suggestedQuestionsPrompt = `
// Based on the following resume summary, generate 4-5 short, relevant questions a candidate might want to ask an AI mentor.
// Return them as a numbered list (1., 2., 3., etc.), one question per number.

// Resume Summary:
// ${summary}
// `;
//     const suggestedQuestionsResult = await model.generateContent(suggestedQuestionsPrompt);
//     const suggestedQuestionsText = suggestedQuestionsResult.response.text();

//     // Split only by numbers (1., 2., 3.) to preserve questions with line breaks
//     const suggestedQuestions = suggestedQuestionsText
//       .split(/\n(?=\d+\.)/)         // split lines starting with number + dot
//       .map(q => q.replace(/^\d+\.\s*/, '').trim()) // remove numbering
//       .filter(q => q.length > 0)
//       .slice(0, 4);                 // max 4 questions

//     fs.unlinkSync(filePath); // delete uploaded file

//     res.json({ summary, recommendations, suggestedQuestions });

//   } catch (error) {
//     console.error("Error processing resume:", error);
//     if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
//     res.status(500).json({ error: "Resume processing failed" });
//   }
// });

// // ------------------ FOLLOW-UP QUESTIONS ------------------
// app.post("/ask", async (req, res) => {
//   const { summary, question } = req.body;

//   if (!summary || !question)
//     return res.status(400).json({ error: "Missing summary or question" });

//   try {
//     const followUpPrompt = `
// You are a career and resume expert. The candidate has this resume summary:
// ${summary}

// They asked the following question:
// ${question}

// Answer their question in a professional, clear, and actionable way. Provide concrete examples or steps if possible.
// `;
//     const followUpResult = await model.generateContent(followUpPrompt);
//     const answer = followUpResult.response.text();

//     res.json({ answer });

//   } catch (error) {
//     console.error("Error processing follow-up question:", error);
//     res.status(500).json({ error: "Failed to process question" });
//   }
// });

// // ------------------ START SERVER ------------------
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () =>
//   console.log(`✅ Backend running on http://localhost:${PORT}`)
// );


import express from "express";
import cors from "cors";
import multer from "multer";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import path from "path";
import pdf from "pdf-parse/lib/pdf-parse.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Ensure uploads folder exists
const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

// Multer setup
const upload = multer({ dest: uploadDir });

// Google Generative AI setup
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// ------------------ RESUME UPLOAD ------------------
app.post("/upload", upload.single("resume"), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });

  const filePath = req.file.path;

  try {
    const dataBuffer = fs.readFileSync(filePath);
    const pdfData = await pdf(dataBuffer);
    const resumeText = pdfData.text;

    // 1️⃣ Generate detailed summary
    const summaryPrompt = `
You are an expert career advisor. Read the following resume text and generate a **very detailed summary** with clear sections, headings, and bullet points.
Highlight: Profile Overview, Education, Skills, Work Experience, Projects, Achievements, Extracurricular Activities, and Career Potential.

Resume Text:
${resumeText}
`;
    const summaryResult = await model.generateContent(summaryPrompt);
    const summary = summaryResult.response.text();

    // 2️⃣ Generate AI recommendations
    const recommendationsPrompt = `
You are a career guide. Based on the following detailed resume summary, provide **personalized recommendations** for the candidate. Include:

1. Suggested next steps in learning and skill development.
2. Recommended courses, certifications, or workshops.
3. Suitable internships or job roles.
4. Tips to improve portfolio, networking, and career growth.

Resume Summary:
${summary}
`;
    const recommendationsResult = await model.generateContent(recommendationsPrompt);
    const recommendations = recommendationsResult.response.text();

    // 3️⃣ Generate suggested questions using numbered list
    const suggestedQuestionsPrompt = `
Based on the following resume summary, generate 4-5 short, relevant questions a candidate might want to ask an AI mentor.
Return them as a numbered list (1., 2., 3., etc.), one question per number.

Resume Summary:
${summary}
`;
    const suggestedQuestionsResult = await model.generateContent(suggestedQuestionsPrompt);
    const suggestedQuestionsText = suggestedQuestionsResult.response.text();

    const suggestedQuestions = suggestedQuestionsText
      .split(/\n(?=\d+\.)/)               // split lines starting with number + dot
      .map(q => q.replace(/^\d+\.\s*/, '').trim()) // remove numbering
      .filter(q => q.length > 0)
      .slice(0, 4);                       // max 4 questions

    fs.unlinkSync(filePath); // delete uploaded file

    res.json({ summary, recommendations, suggestedQuestions });

  } catch (error) {
    console.error("Error processing resume:", error);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    res.status(500).json({ error: "Resume processing failed" });
  }
});

// ------------------ FOLLOW-UP QUESTIONS ------------------
app.post("/ask", async (req, res) => {
  const { summary, question } = req.body;

  if (!summary || !question)
    return res.status(400).json({ error: "Missing summary or question" });

  try {
    const followUpPrompt = `
You are a career and resume expert. The candidate has this resume summary:
${summary}

They asked the following question:
${question}

Answer their question in a professional, clear, and actionable way. Provide concrete examples or steps if possible.
`;
    const followUpResult = await model.generateContent(followUpPrompt);
    const answer = followUpResult.response.text();

    res.json({ answer });

  } catch (error) {
    console.error("Error processing follow-up question:", error);
    res.status(500).json({ error: "Failed to process question" });
  }
});

// ------------------ TASK SUGGESTIONS ------------------
app.post("/tasks", async (req, res) => {
  const { context } = req.body; // e.g., candidate role, interest, or goals

  if (!context)
    return res.status(400).json({ error: "Missing context for task suggestions" });

  try {
    const taskPrompt = `
You are an AI assistant for task planning. 
Based on the following context, suggest 5-7 actionable tasks or projects. 
Include clear steps, estimated difficulty, and skills required.

Context:
${context}
`;
    const taskResult = await model.generateContent(taskPrompt);
    const tasksText = taskResult.response.text();

    const tasks = tasksText
      .split(/\n(?=\d+\.)/)               // split lines starting with number + dot
      .map(t => t.replace(/^\d+\.\s*/, '').trim()) // remove numbering
      .filter(t => t.length > 0)
      .slice(0, 2);                       // limit to 2 tasks

    res.json({ tasks });

  } catch (error) {
    console.error("Error generating tasks:", error);
    res.status(500).json({ error: "Failed to generate tasks" });
  }
});

// ------------------ START SERVER ------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`✅ Backend running on http://localhost:${PORT}`)
);
