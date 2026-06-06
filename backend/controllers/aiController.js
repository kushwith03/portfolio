const { GoogleGenAI } = require('@google/genai');
const fs = require('fs');
const path = require('path');

// Initialize AI
const ai = process.env.API_KEY 
  ? new GoogleGenAI({ apiKey: process.env.API_KEY }) 
  : null;

const projectsPath = path.join(__dirname, '..', 'data', 'projects.json');
const skillsPath = path.join(__dirname, '..', 'data', 'skills.json');

const readData = (filePath) => {
  try {
    if (!fs.existsSync(filePath)) return null;
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (err) {
    return null;
  }
};

exports.chat = async (req, res) => {
  if (!ai) {
    return res.json({ 
      success: false, 
      reply: "I'm currently offline (API Key missing). Please contact Khushwith directly!" 
    });
  }

  const { message, history, persona } = req.body;
  const projects = readData(projectsPath);
  const skills = readData(skillsPath);

  // Construct Context
  const contextData = `
    MY PROFILE:
    Name: R Khushwith Kumar
    Role: Full Stack Developer / Data Science Student
    Education: RNS Institute of Technology, Bengaluru (Final Year)
    CGPA: 8.41/10.0
    Availability: Internship starting Jan 2026
    
    MY SKILLS:
    ${JSON.stringify(skills)}
    
    MY PROJECTS:
    ${JSON.stringify(projects)}
  `;

  // Define Persona Prompts
  let systemInstruction = `You are Khushwith's AI Assistant. Use the following profile data to answer questions.
  If asked about something not in the profile, politely say you don't know but can forward a message.
  Keep answers concise and professional.
  ${contextData}`;

  if (persona === 'recruiter') {
    systemInstruction = `You are Khushwith's Agent talking to a Recruiter. Focus on ROI, value delivery, and technical proficiency. Highlight the 'Autonomous Vehicle' and 'InstaResume' projects as key achievements. Be persuasive but professional.
    ${contextData}`;
  } else if (persona === 'mentor') {
    systemInstruction = `You are Khushwith (in Mentor Mode). Explain technical concepts behind the projects deeply. Focus on architecture (MVC, JWT, CNNs). Be educational and humble.
    ${contextData}`;
  } else if (persona === 'developer') {
    systemInstruction = `You are Khushwith (Developer Mode). Speak in tech-savvy language. Use jargon correctly (React hooks, PyTorch tensors, RESTful endpoints). Be geeky and enthusiastic.
    ${contextData}`;
  } else if (persona === 'resume-reviewer') {
    systemInstruction = `You are an expert Technical Resume Reviewer and ATS specialist. 
    The user will paste their resume text or bullet points. 
    Critique it based on: Impact metrics (X% increase), Action verbs, and Keyword matching for a Full Stack or Data Science role.
    Give 3 concrete improvements. Be constructive.
    Do NOT talk about Khushwith's profile in this mode unless asked. Focus on the USER'S resume.`;
  }

  try {
    const contents = history.map(msg => ({
      role: msg.role,
      parts: [{ text: msg.text }]
    }));

    contents.push({
      role: 'user',
      parts: [{ text: message }]
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      }
    });

    res.json({ success: true, reply: response.text });

  } catch (error) {
    console.error("AI Error:", error);
    res.status(500).json({ success: false, reply: "I encountered a temporary error. Please try again." });
  }
};