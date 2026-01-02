# Interactive Professional Portfolio

A modern, full-stack portfolio application featuring a Next.js frontend, Node.js backend, and integrated Gemini AI Chatbot.

## 📂 Final Project Structure
After running `node cleanup.js`, your folder should look exactly like this:

```
project-root/
├── frontend/         # Next.js 14 (App Router)
│   ├── app/
│   ├── components/
│   └── package.json
├── backend/          # Express + Node.js
│   ├── data/
│   ├── routes/
│   ├── controllers/
│   └── package.json
├── cleanup.js        # Maintenance script
└── README.md
```

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
