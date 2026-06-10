# Personal Portfolio & AI Architectural Representative

A high-performance, responsive personal portfolio featuring a sophisticated AI-powered representative specialized in technical discourse.

## Overview

This project showcases an integrated engineering profile, project history, and a synthetic assistant. Recently consolidated into a standalone architecture, it emphasizes performance, maintainability, and high-fidelity UI/UX.

- **Live Demo:** [rkhushwith-portfolio.vercel.app](https://rkhushwith-portfolio.vercel.app)

## Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **AI Integration:** [Google Generative AI](https://ai.google.dev/) (Gemini 1.5 Flash)
- **Language:** [TypeScript](https://www.typescriptlang.org/)

## Key Features

- **Consolidated Architecture:** Standalone Next.js application with unified frontend and API routes for simplified deployment.
- **AI Representative:** Interactive chatbot with multiple personas (Recruiter, Mentor, Developer) trained on local project data.
- **Project Showcase:** Dynamic project cards synchronized with `resume.tex` source of truth.
- **Global Theme Engine:** Optimized dark/light mode transition with persistence and system preference detection.

## Project Structure

```text
.
├── app/                # Next.js App Router (Routes & API)
│   └── api/            # Integrated API endpoints (Chat, Contact, Stats)
├── components/         # Modular React components
├── lib/                
│   ├── ai/             # AI logic and persona configurations
│   └── data/           # Source of Truth JSON files (projects, skills)
├── public/             # Static assets (favicons, images)
└── resume.tex          # Canonical LaTeX source of truth
```

## Setup & Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/kushwith03/portfolio.git
   cd portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Configure Environment Variables:**
   Create a `.env.local` file in the root directory:
   ```env
   GEMINI_API_KEY=your_google_gemini_api_key
   ```

4. **Run development server:**
   ```bash
   npm run dev
   ```

## Author

**R Khushwith Kumar**  
Full Stack Software Engineer  
[GitHub](https://github.com/kushwith03) • [LinkedIn](https://www.linkedin.com/in/kushwith03/)
