import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

interface ChatMessage {
  role: string;
  text: string;
}

const comprehensiveKnowledge = `
FULL PROFILE OF R KHUSHWITH KUMAR:
- Name: R Khushwith Kumar
- Role: Full-Stack Software Engineer & Distributed Systems Builder
- Location: Bengaluru, Karnataka, India
- Email: kushwith03@gmail.com
- GitHub: https://github.com/kushwith03 (Key Repos: Autonomous-Vehicle, ai-resume-builder, blogspace, gharpayy, gigflow, DSA-Java)
- LinkedIn: https://www.linkedin.com/in/kushwith03/
- Status: Available for Full-Stack, Backend, and Software Engineering Roles

EDUCATION:
- Degree: Bachelor of Engineering (B.E.) in Computer Science & Engineering (Data Science)
- Institution: RNS Institute of Technology (RNSIT), Bengaluru, India
- Graduation: May 2026
- Academic Performance: CGPA 8.6 / 10.0

PROFESSIONAL EXPERIENCE:
- Role: Software Engineering Intern — Full Stack
- Company: ATSPL (Angadi Technological Solution Private Limited), Bengaluru (Remote)
- Timeline: Jan 2026 -- May 2026
- Key Impact & Deliverables:
  1. Architected and deployed production web applications using React.js, Next.js, and Node.js/Express.
  2. Engineered performant RESTful APIs and designed relational database schemas in PostgreSQL with indexes and connection pooling.
  3. Built automated CI/CD deployment pipelines using GitHub Actions, ensuring zero-downtime releases.
  4. Optimized asset delivery and frontend latency using AWS S3, CloudFront CDN, and Cloudflare.
  5. Implemented transactional email delivery pipelines via Zoho ZeptoMail integration with automated delivery tracking.
  6. Ported core web workflows into cross-platform desktop applications using Electron.js.

KEY PROJECTS & ARCHITECTURES:
1. Autonomous Vehicle Simulation (Aug 2025 - Feb 2026):
   - Tech: Python, PyTorch, CARLA Simulator, OpenCV, Convolutional Neural Networks.
   - Built an end-to-end autonomous driving perception pipeline.
   - Trained a deep autoencoder on ~8,000 frames from Cityscapes and CARLA datasets.
   - Achieved sub-50ms inference latency for real-time steering and throttle predictions via behavioral cloning.
   
2. InstaResume / AI Resume Builder (Mar 2025 - Jul 2025):
   - Tech: React.js, Node.js, Tailwind CSS, Google Gemini AI API, @react-pdf/renderer.
   - Built a dynamic live-preview resume generator with debounced state sync and instant PDF export.

3. BlogSpace (Nov 2024 - Jan 2025):
   - Tech: Node.js, Express.js, PostgreSQL, JWT Authentication, Bootstrap.
   - Robust REST APIs following MVC architecture with authorization middlewares and relational CRUD.

TECHNICAL ARSENAL:
- Languages: Java, JavaScript (ES6+), TypeScript, Python, SQL, C++
- Frontend: React.js, Next.js 14 (App Router), Tailwind CSS, Framer Motion, HTML5/CSS3
- Backend: Node.js, Express.js, RESTful APIs, JWT Auth, MVC Pattern, Microservices
- Databases & Cloud: PostgreSQL, MongoDB, MySQL, AWS S3, CloudFront, Cloudflare CDN, Vercel, Render, GitHub Actions (CI/CD)
- Tools: Git, Postman, Linux CLI, Docker, VS Code

CERTIFICATIONS & MILESTONES:
- 250+ LeetCode DSA Problems Solved in Java/Python (Strong data structures, graphs, dynamic programming, trees).
- Microsoft Certified: Azure AI Fundamentals (AI-900).
- Microsoft Certified: Azure Data Fundamentals (DP-900).
- State-Level Athlete: Powerlifting and Kabaddi competitor representing RNSIT.
`;

function getOfflineSmartReply(message: string, persona: string): string {
  const msg = message.toLowerCase();

  if (msg.includes("atspl") || msg.includes("experience") || msg.includes("intern")) {
    return `At **ATSPL (Angadi Technological Solution)**, Khushwith served as a **Full-Stack Software Engineering Intern** from Jan 2026 to May 2026:\n\n- 🚀 **Full-Stack Features**: Shipped production features with React.js, Next.js, and Node.js.\n- 🗄️ **Backend & Database**: Engineered high-throughput REST APIs and optimized PostgreSQL schemas.\n- ⚙️ **CI/CD & Cloud**: Configured automated GitHub Actions workflows, AWS S3 asset delivery, and Cloudflare CDN caching.\n- 🖥️ **Desktop Porting**: Successfully ported core web features to Electron.js desktop applications.\n- 📬 **Reliability**: Implemented transactional email systems using Zoho ZeptoMail.`;
  }

  if (msg.includes("autonomous") || msg.includes("carla") || msg.includes("pytorch") || msg.includes("ai")) {
    return `Khushwith built an **Autonomous Vehicle Simulation** using **PyTorch** and the **CARLA Simulator**:\n\n- 🧠 **Perception Model**: Trained a deep autoencoder on ~8,000 frames from Cityscapes and CARLA datasets.\n- ⚡ **Real-Time Performance**: Achieved sub-50ms inference latency for real-time closed-loop steering and throttle control.\n- 🎯 **Behavioral Cloning**: Applied deep CNN architectures to learn optimal human driving behaviors directly from sensory camera input.`;
  }

  if (msg.includes("skill") || msg.includes("stack") || msg.includes("technolog")) {
    return `Khushwith's core engineering arsenal includes:\n\n- **Languages**: JavaScript/TypeScript, Python, Java (250+ DSA), SQL, C++\n- **Frontend**: React.js, Next.js 14, Tailwind CSS, Framer Motion\n- **Backend**: Node.js, Express.js, REST APIs, Microservices, JWT Auth\n- **Databases & Cloud**: PostgreSQL, MongoDB, AWS S3, Cloudflare CDN, GitHub Actions CI/CD\n- **AI & Tools**: PyTorch, CARLA, Git, Docker, Postman, Linux CLI`;
  }

  if (msg.includes("education") || msg.includes("college") || msg.includes("rnsit") || msg.includes("cgpa") || msg.includes("gpa")) {
    return `Khushwith holds a **B.E. in Computer Science & Engineering (Data Science)** from **RNS Institute of Technology (RNSIT), Bengaluru**, graduating with an **8.6 / 10.0 CGPA** in May 2026.`;
  }

  if (msg.includes("contact") || msg.includes("email") || msg.includes("hire") || msg.includes("reach")) {
    return `You can reach Khushwith directly via:\n\n- 📧 **Email**: [kushwith03@gmail.com](mailto:kushwith03@gmail.com)\n- 💼 **LinkedIn**: [linkedin.com/in/kushwith03](https://www.linkedin.com/in/kushwith03/)\n- 🐙 **GitHub**: [github.com/kushwith03](https://github.com/kushwith03)\n- 📍 **Location**: Bengaluru, India (Open to full-time on-site, hybrid, & remote roles).`;
  }

  if (persona === "recruiter") {
    return `As Khushwith's Technical Representative, I'd highlight that he brings:\n\n1. **Proven Production Impact**: Shipped full-stack code and automated CI/CD at ATSPL.\n2. **Algorithmic Rigor**: 250+ DSA problems solved with strong CS fundamentals (8.6 CGPA from RNSIT).\n3. **Modern Stack Ownership**: Next.js 14, TypeScript, Node.js, PostgreSQL, and PyTorch.\n\nWould you like to review his resume or discuss scheduling an interview?`;
  }

  return `Khushwith is a Full-Stack Software Engineer with proven production experience at ATSPL, a strong background in computer science & data science from RNSIT (8.6 CGPA), and deep hands-on expertise in Next.js, Node.js, PostgreSQL, and PyTorch AI pipelines.\n\nFeel free to ask about his **ATSPL production work**, **Autonomous Vehicle AI simulation**, **tech stack**, or **how to get in touch**!`;
}

export async function getChatReply(
  message: string,
  history: ChatMessage[],
  persona: string = "professional"
): Promise<string> {
  if (!genAI) {
    return getOfflineSmartReply(message, persona);
  }

  let personaInstruction = `You are Khushwith's AI Assistant (Professional Mode). Speak as Khushwith's knowledgeable technical representative. Keep responses crisp, accurate, and markdown-formatted.`;

  if (persona === "recruiter") {
    personaInstruction = `You are Khushwith's Executive Technical Representative. Focus on business value, fast onboarding, production ownership at ATSPL, clean architecture, and ROI. Offer to share his contact info for interviews.`;
  } else if (persona === "mentor") {
    personaInstruction = `You are Khushwith in Tech Lead / Architect Persona. Explain engineering trade-offs, database indexing, REST vs GraphQL, PyTorch autoencoder latent representations, and clean code principles with enthusiasm.`;
  } else if (persona === "developer") {
    personaInstruction = `You are Khushwith in Senior Developer persona. Speak fluent software engineering jargon (TypeScript type-safety, PostgreSQL connection pooling, Next.js server components, CI/CD pipelines, Docker).`;
  } else if (persona === "resume-reviewer") {
    personaInstruction = `You are an expert Technical Resume Reviewer and ATS specialist. Critique any resume snippet based on: XYZ format metrics (Accomplished [X] as measured by [Y], by doing [Z]), strong action verbs, and keyword alignment.`;
  }

  const fullSystemInstruction = `${personaInstruction}\n\n${comprehensiveKnowledge}`;
  const delays = [1500, 3000];

  for (let attempt = 0; attempt <= 2; attempt++) {
    try {
      const modelName = attempt === 2 ? "gemini-1.5-flash-8b" : "gemini-1.5-flash";
      const model = genAI.getGenerativeModel({
        model: modelName,
        systemInstruction: fullSystemInstruction,
      });

      const chat = model.startChat({
        history: history.map((msg) => ({
          role: msg.role === "user" ? "user" : "model",
          parts: [{ text: msg.text }],
        })),
        generationConfig: {
          maxOutputTokens: 600,
          temperature: 0.7,
        },
      });

      const result = await chat.sendMessage(message);
      const response = await result.response;
      return response.text();
    } catch (error: unknown) {
      const err = error as { status?: number; response?: { status?: number }; message?: string };
      const status = err?.status || err?.response?.status;

      if (attempt < 2 && (status === 429 || status === 503)) {
        await wait(delays[attempt]);
        continue;
      }

      console.warn("Gemini API falling back to local intelligence:", error);
      return getOfflineSmartReply(message, persona);
    }
  }

  return getOfflineSmartReply(message, persona);
}

