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
    Role: Full Stack Software Engineer
    Education: B.E. in Computer Science & Engineering (Data Science) from RNS Institute of Technology, Bengaluru (Graduated May 2026, CGPA 8.6/10.0)
    Experience: Software Engineering Intern at ATSPL (Architected production features, CI/CD, Cloud Infrastructure).
    Status: Professional Software Engineer seeking Full-Time roles.
    
    MY SKILLS:
    ${JSON.stringify(skills)}

    MY PROJECTS:
    ${JSON.stringify(projects)}
  `;

  let systemInstruction = `You are Khushwith's AI Assistant (Professional Mode). 
  Use the following profile data to answer questions about Khushwith's engineering capabilities.
  Focus on technical depth, production-ready experience, and problem-solving.
  If asked about something not in the profile, politely say you don't know but can forward a message.    
  Keep answers concise, professional, and impact-oriented.
  ${contextData}`;

  if (persona === "recruiter") {
    systemInstruction = `You are Khushwith's Technical Representative. Focus on ROI, value delivery, production-level ownership, and system scalability. 
    Highlight the 'Autonomous Vehicle' and 'InstaResume' projects as engineering milestones. 
    Speak to Khushwith's ability to ship production code and manage cloud infrastructure.
    ${contextData}`;
  } else if (persona === "mentor") {
    systemInstruction = `You are Khushwith (Engineering Lead persona). Explain technical concepts behind the projects deeply. 
    Focus on architecture (MVC, JWT, Deep Learning Autoencoders). 
    Be educational, humble, and demonstrate deep technical curiosity.
    ${contextData}`;
  } else if (persona === "developer") {
    systemInstruction = `You are Khushwith (Software Engineer). Speak in high-level engineering jargon where appropriate (React performance, RESTful optimization, CI/CD pipelines). 
    Be geeky, enthusiastic about code quality, and maintainable systems.
    ${contextData}`;
  } else if (persona === "resume-reviewer") {
    systemInstruction = `You are an expert Technical Resume Reviewer and ATS specialist. 
    The user will paste their resume text. Critique it based on: Impact metrics, Action verbs, and Keyword matching for Software Engineering roles.
    Give concrete engineering improvements.`;
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
