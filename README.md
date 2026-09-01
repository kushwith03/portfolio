# Personal Portfolio & Engineering Showcase

[![CI - Build & Test](https://github.com/kushwith03/portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/kushwith03/portfolio/actions/workflows/ci.yml)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fkushwith03%2Fportfolio&env=GEMINI_API_KEY&envDescription=Google%20Gemini%20API%20Key%20for%20the%20AI%20Chatbot)

A high-performance, responsive personal portfolio featuring obsidian/glassmorphism design engineering, interactive developer terminal bento, project showcase, and an AI-powered portfolio assistant.

- **Live Demo:** [rkhushwith-portfolio.vercel.app](https://rkhushwith-portfolio.vercel.app)
- **Repository:** [github.com/kushwith03/portfolio](https://github.com/kushwith03/portfolio)

---

## ⚡ Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) & Glassmorphism Design Tokens
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **AI Integration:** [Google Generative AI](https://ai.google.dev/) (Gemini 1.5 Flash)
- **Icons:** [Lucide Icons](https://lucide.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **CI/CD:** [GitHub Actions](https://github.com/features/actions) & [Vercel](https://vercel.com/)

---

## 🚀 Key Features

- **Obsidian Design System:** Raycast & Linear-inspired aesthetics, floating island navigation dock, and specular glass cards.
- **Interactive Developer Bento:** Real-time code and profile tab switching, live stats, and production highlight metrics.
- **Project Filter System:** Dynamic categorization (`Full Stack`, `AI / ML`, `Backend & APIs`) linked to verified GitHub repositories.
- **Automated CI/CD Pipeline:** GitHub Actions workflow running automated linting and build verification on every push and PR to `main`.
- **Vercel Production Optimization:** `vercel.json` headers, strict security policies, and zero-config deployment.

---

## 🛠️ Local Development

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
   ```bash
   cp .env.example .env.local
   ```
   Add your Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey):
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Run development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🚢 Deployment on Vercel

1. Push your changes to `main` on GitHub.
2. Go to [Vercel Dashboard](https://vercel.com/dashboard) and click **"Add New Project"**.
3. Import `kushwith03/portfolio`.
4. Add the Environment Variable:
   - `GEMINI_API_KEY`: Your Google Gemini API Key.
5. Click **Deploy**. Vercel will automatically build and deploy every commit pushed to `main`.

---

## 👨‍💻 Author

**R Khushwith Kumar**  
Full Stack Software Engineer • Bengaluru, India  
[GitHub](https://github.com/kushwith03) • [LinkedIn](https://www.linkedin.com/in/kushwith03/)

