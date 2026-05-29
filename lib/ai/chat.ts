import { GoogleGenerativeAI } from "@google/generative-ai";
import projects from "../data/projects.json";
import skills from "../data/skills.json";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");

export async function getChatReply(message: string, history: any[], persona: string = "default") {
  if (!process.env.GOOGLE_API_KEY) {
    return "I'm currently offline (API Key missing). Please contact Khushwith directly!";
  }

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const contextData = `
    MY PROFILE:
    Name: R Khushwith Kumar
    Role: Full Stack Software Engineer Intern
    Education: RNS Institute of Technology, Bengaluru (B.E. CSE - Data Science, Expected May 2026)
    CGPA: 8.6/10.0
    Recent Experience: Software Engineering Intern at ATSPL (Jan 2026 -- May 2026). 
    Architected production features with React, Node.js, and PostgreSQL. Built CI/CD pipelines with GitHub Actions.
    
    MY SKILLS:
    ${JSON.stringify(skills)}

    MY PROJECTS:
    ${JSON.stringify(projects)}
  `;

  let systemInstruction = `You are Khushwith's AI Assistant. Use the following profile data to answer questions.
  If asked about something not in the profile, politely say you don't know but can forward a message.    
  Keep answers concise and professional.
  ${contextData}`;

  if (persona === "recruiter") {
    systemInstruction = `You are Khushwith's Agent talking to a Recruiter. Focus on ROI, value delivery, and technical proficiency. Highlight the 'Autonomous Vehicle' and 'InstaResume' projects as key achievements. Be persuasive but professional.
    ${contextData}`;
  } else if (persona === "mentor") {
    systemInstruction = `You are Khushwith (in Mentor Mode). Explain technical concepts behind the projects deeply. Focus on architecture (MVC, JWT, CNNs). Be educational and humble.
    ${contextData}`;
  } else if (persona === "developer") {
    systemInstruction = `You are Khushwith (Developer Mode). Speak in tech-savvy language. Use jargon correctly (React hooks, PyTorch tensors, RESTful endpoints). Be geeky and enthusiastic.
    ${contextData}`;
  }

  const chat = model.startChat({
    history: history.map((msg) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.text }],
    })),
    generationConfig: {
      maxOutputTokens: 500,
    },
  });

  const result = await chat.sendMessage(message);
  const response = await result.response;
  return response.text();
}
