# Interactive Professional Portfolio

A modern, full-stack portfolio application featuring a Next.js frontend, Node.js backend, and integrated Gemini AI Chatbot.

## 📂 Final Project Structure

This project is organized for clarity and maintainability, separating concerns for a professional codebase.

```
project-root/
├── backend/                  # Node.js + Express API
│   ├── controllers/          # Business logic for API endpoints
│   ├── data/                 # Local JSON data sources
│   ├── routes/               # API endpoint definitions
│   ├── node_modules/         # Backend dependencies
│   ├── package-lock.json
│   ├── package.json
│   └── server.js             # Entry point for the backend server
├── frontend/                 # Next.js 14 (App Router)
│   ├── app/                  # Main Next.js App Router files (layout, pages, globals)
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── features/         # Self-contained, interactive features (e.g., Chatbot)
│   │   │   └── Chatbot.tsx
│   │   └── sections/         # Large, distinct UI sections of the main page
│   │       ├── About.tsx
│   │       ├── Contact.tsx
│   │       ├── Footer.tsx
│   │       ├── Hero.tsx
│   │       ├── Navbar.tsx
│   │       ├── Projects.tsx
│   │       └── Skills.tsx
│   ├── lib/                  # Shared utilities, helper functions, and type definitions
│   │   └── types.ts
│   ├── public/               # Static assets (images, fonts, resume)
│   │   ├── profile.jpg
│   │   └── resume.pdf
│   ├── .gitignore
│   ├── next-env.d.ts
│   ├── next.config.js
│   ├── package-json
│   ├── postcss.config.js
│   ├── tailwind.config.ts
│   └── tsconfig.json
└── README.md
```

**Note on Structure:**
The frontend component structure has been refined for better organization. Components are now categorized into `sections` (for major page blocks like Hero, About, Projects) and `features` (for self-contained, interactive functionalities like the Chatbot). Shared types have been moved to a `lib` directory, a common practice in Next.js projects for project-wide utilities. This approach enhances readability and makes it easier to locate specific parts of the UI.

## ⚠️ Important Setup Steps

### 1. Clean the Project

If you see files like `index.tsx`, `components/` or `app/` in the root, run:

```bash
node cleanup.js
```

### 2. Start Backend (Terminal 1)

```bash
cd backend
npm install
# Linux/Mac: export API_KEY="your_gemini_key"
# Windows: set API_KEY="your_gemini_key"
npm start
```

### 3. Start Frontend (Terminal 2)

```bash
cd frontend
npm install
npm run dev
```

## ✨ Features

- **AI Persona Chatbot**: Powered by Gemini 1.5 Flash.
- **Dynamic Content**: Data fetched from local JSON files.
- **Analytics**: Simple visitor counter.
- **Clean UI**: Tailwind CSS with Dark Mode.
