# Personal Portfolio & AI Chatbot

A cinematic, interactive portfolio built with Next.js, Framer Motion, and Three.js, featuring an AI-powered personal agent. This project showcases my professional identity through high-fidelity animations, real-time 3D rendering, and LLM-integrated conversational interfaces.

## ✨ Features

- **Cinematic Experience:** Immersive scroll-driven storytelling using Framer Motion and GSAP for scene transitions.
- **Neural Core (AI Chat):** An intelligent assistant powered by **Google Gemini 1.5 Flash**, featuring multiple personas (Recruiter, Mentor, Developer) to provide context-aware responses about my work.
- **3D Interactive Scene:** A custom Three.js environment with procedural particles and dynamic lighting that reacts to user navigation.
- **Dynamic Content:** Projects, skills, and stats are served from optimized JSON schemas, ensuring maintainable and type-safe data management.
- **Responsive HUD:** A futuristic, dark-themed UI/UX optimized for all devices with a focus on high-impact visual feedback.

## 🛠️ Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animation:** [Framer Motion](https://www.framer.com/motion/), [GSAP](https://greensock.com/gsap/)
- **3D Rendering:** [Three.js](https://threejs.org/) / [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- **AI Integration:** [@google/generative-ai](https://www.npmjs.com/package/@google/generative-ai)
- **State Management:** [Zustand](https://zustand-demo.pmnd.rs/)

## 🏗️ Project Structure

The project is architected as a modern Next.js monolith for optimized performance and simplified deployment:

```
.
├── app/                # App Router (Pages, API Routes, Layouts)
│   ├── api/            # Serverless functions (AI Chat, etc.)
│   └── ...
├── components/         # React Components
│   ├── 3d/             # Three.js / R3F Scenes and Entities
│   ├── motion/         # Animation & Cinematic Controllers
│   └── ...
├── lib/                # Shared Logic & Data
│   ├── ai/             # AI prompting & Gemini configuration
│   ├── data/           # JSON-based content sources
│   ├── store.ts        # Global state management
│   └── ...
└── public/             # Static Assets
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm / pnpm / yarn
- Google AI API Key (for the chatbot)

### Installation
1. **Clone the repo:**
   ```bash
   git clone https://github.com/kushwith03/portfolio.git
   cd portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment:**
   Create a `.env.local` file in the root:
   ```env
   GOOGLE_API_KEY=your_gemini_api_key_here
   ```

4. **Run Development Server:**
   ```bash
   npm run dev
   ```
   Access the site at `http://localhost:3000`.

## 👨‍💻 Developer
**R Khushwith Kumar**  
Full-Stack Software Engineer Intern  
[GitHub](https://github.com/kushwith03) • [LinkedIn](https://linkedin.com/in/kushwith03)

---
Built with passion for high-performance web experiences.
