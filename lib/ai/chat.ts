import { GoogleGenerativeAI } from "@google/generative-ai";
import projects from "../data/projects.json";
import skills from "../data/skills.json";

const genAI = process.env.API_KEY ? new GoogleGenerativeAI(process.env.API_KEY) : null;

export async function getChatReply(message: string, history: any[], persona: string = "default") {
  if (!genAI) {
    return "I'm currently offline (API Key missing). Please contact Khushwith directly!";
  }

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const contextData = `
    MY PROFILE:
    Name: R Khushwith Kumar
    Role: Full Stack Software Engineering Intern
    Education: RNS Institute of Technology, Bengaluru (B.E. CSE - Data Science, Graduated May 2026)
    CGPA: 8.6/10.0
    
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
  } else if (persona === "resume-reviewer") {
    systemInstruction = `You are an expert Technical Resume Reviewer and ATS specialist. 
    The user will paste their resume text or bullet points. 
    Critique it based on: Impact metrics (X% increase), Action verbs, and Keyword matching for a Full Stack or Data Science role.
    Give 3 concrete improvements. Be constructive.
    Do NOT talk about Khushwith's profile in this mode unless asked. Focus on the USER'S resume.`;
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

  // Note: App Router might need systemInstruction passed differently depending on SDK version
  // For simplicity and compatibility with existing logic, we can prepend it to the first message if history is empty, 
  // or use the startChat options if supported.
  
  const result = await chat.sendMessage(message);
  const response = await result.response;
  return response.text();
}
