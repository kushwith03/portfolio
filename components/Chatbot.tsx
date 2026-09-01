"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  MessageCircle,
  X,
  Send,
  Bot,
  User,
  Trash2,
  Sparkles,
  Briefcase,
  Code2,
  GraduationCap,
  FileSearch,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
}

type Persona = "professional" | "recruiter" | "mentor" | "developer" | "resume-reviewer";

const personaMeta: Record<
  Persona,
  { label: string; icon: React.ElementType; description: string; color: string }
> = {
  professional: {
    label: "Professional",
    icon: Sparkles,
    description: "Overview of skills, experience, and projects",
    color: "from-sky-500 to-indigo-600",
  },
  recruiter: {
    label: "Recruiter Mode",
    icon: Briefcase,
    description: "ROI, ATS-match, production ownership & impact",
    color: "from-emerald-500 to-teal-600",
  },
  developer: {
    label: "Developer",
    icon: Code2,
    description: "Architecture, database schemas, and performance",
    color: "from-indigo-500 to-purple-600",
  },
  mentor: {
    label: "Tech Lead",
    icon: GraduationCap,
    description: "Engineering trade-offs & problem solving",
    color: "from-amber-500 to-orange-600",
  },
  "resume-reviewer": {
    label: "ATS Reviewer",
    icon: FileSearch,
    description: "Paste a resume snippet for instant critique",
    color: "from-purple-500 to-pink-600",
  },
};

const starterPrompts = [
  "What were Khushwith's contributions at ATSPL?",
  "Explain the Autonomous Vehicle AI architecture",
  "What is his core tech stack and DSA experience?",
  "How can I contact Khushwith for an interview?",
];

const welcomeMessages: Record<Persona, string> = {
  professional:
    "Hi there! 👋 I'm **Khushwith's AI Technical Representative**.\n\nAsk me anything about his full-stack engineering at **ATSPL**, his **Autonomous Vehicle AI simulation**, tech stack, or background at **RNSIT (8.6 CGPA)**!",
  recruiter:
    "Hello! 💼 As Khushwith's Technical Representative, I'm ready to discuss **production deliverables**, **system scalability**, and how he can deliver immediate value to your engineering team. What role are you hiring for?",
  mentor:
    "Greetings! 🛠️ Let's discuss system architecture, API optimization, or deep learning autoencoders in the CARLA simulation.",
  developer:
    "Hey dev! 💻 Let's talk Next.js 14 server components, PostgreSQL indexing, PyTorch computer vision, and CI/CD pipelines.",
  "resume-reviewer":
    "Welcome! 📝 Paste your resume bullet or bio below and I'll analyze it for ATS keywords, action verbs, and impact metrics.",
};

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [persona, setPersona] = useState<Persona>("professional");
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: welcomeMessages.professional, sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen, loading]);

  useEffect(() => {
    setMessages([{ id: Date.now(), text: welcomeMessages[persona], sender: "bot" }]);
  }, [persona]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim()) return;

    const userMessage: Message = { id: Date.now(), text, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInput("");
    setLoading(true);

    try {
      const history = messages.slice(1).map((msg) => ({
        role: msg.sender === "user" ? "user" : "model",
        text: msg.text,
      }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage.text, history, persona }),
      });

      const data = await response.json();
      const reply = data.reply || "Apologies, I encountered an issue. Please try again.";
      setMessages((prev) => [...prev, { id: Date.now() + 1, text: reply, sender: "bot" }]);
    } catch (error) {
      console.error("Chat API error:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: "I am having trouble reaching the network right now. Please try again shortly!",
          sender: "bot",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([{ id: Date.now(), text: welcomeMessages[persona], sender: "bot" }]);
  };

  // Helper to render basic markdown bold and bullet points
  const renderFormattedText = (text: string) => {
    const lines = text.split("\n");
    return lines.map((line, idx) => {
      // Bold replacer: **bold text**
      const parts = line.split(/(\*\*[^*]+\*\*)/g);
      const formattedLine = parts.map((part, pIdx) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={pIdx} className="font-semibold text-slate-900 dark:text-white">
              {part.slice(2, -2)}
            </strong>
          );
        }
        return part;
      });

      if (line.startsWith("- ") || line.startsWith("• ")) {
        return (
          <div key={idx} className="flex items-start gap-2 my-1 pl-1">
            <span className="text-sky-500 dark:text-sky-400 font-bold">•</span>
            <span>{formattedLine}</span>
          </div>
        );
      }

      return (
        <p key={idx} className={line === "" ? "h-2" : "my-0.5"}>
          {formattedLine}
        </p>
      );
    });
  };

  const CurrentIcon = personaMeta[persona].icon;

  return (
    <div className="fixed bottom-5 left-5 sm:bottom-6 sm:left-6 z-50 flex flex-col items-start font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.92 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="w-[94vw] sm:w-[420px] h-[580px] max-h-[85vh] bg-white/95 dark:bg-[#070e20]/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-slate-200/90 dark:border-white/[0.12] flex flex-col overflow-hidden mb-3.5"
          >
            {/* Top Header */}
            <div className="p-4 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 dark:from-[#050914] dark:to-[#0b142b] border-b border-white/[0.08] text-white">
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-3">
                  <div className="relative flex items-center justify-center w-9 h-9 rounded-2xl bg-gradient-to-tr from-sky-500 to-indigo-600 text-white shadow-md shadow-sky-500/20 border border-white/20">
                    <Bot className="h-5 w-5" />
                    <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-slate-900" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-white tracking-tight">
                      Khushwith AI
                    </h3>
                    <p className="text-[11px] font-mono text-slate-300">
                      Powered by Google Gemini
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={clearChat}
                    className="p-2 rounded-xl hover:bg-white/[0.1] text-slate-400 hover:text-white transition-all text-xs"
                    title="Clear conversation"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-xl hover:bg-white/[0.1] text-slate-400 hover:text-white transition-all"
                    title="Close Chat"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Persona Selector Strip */}
              <div className="flex gap-1.5 overflow-x-auto pb-1 pt-1 scrollbar-none">
                {(Object.keys(personaMeta) as Persona[]).map((pKey) => {
                  const item = personaMeta[pKey];
                  const Icon = item.icon;
                  const isSelected = persona === pKey;
                  return (
                    <button
                      key={pKey}
                      onClick={() => setPersona(pKey)}
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-mono whitespace-nowrap transition-all ${
                        isSelected
                          ? "bg-sky-500 text-white font-semibold shadow-sm border border-sky-400"
                          : "bg-white/[0.06] text-slate-300 hover:bg-white/[0.12] border border-white/[0.05]"
                      }`}
                    >
                      <Icon className="h-3 w-3" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Chat Messages Body */}
            <div className="flex-1 p-4 overflow-y-auto bg-slate-50/70 dark:bg-[#040814]/70 space-y-4">
              {messages.map((msg) => (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={msg.id}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.sender === "bot" && (
                    <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white mr-2.5 flex-shrink-0 mt-0.5 shadow-sm">
                      <CurrentIcon className="h-3.5 w-3.5" />
                    </div>
                  )}

                  <div
                    className={`max-w-[84%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-sm ${
                      msg.sender === "user"
                        ? "bg-gradient-to-r from-sky-500 to-indigo-600 text-white rounded-br-none font-medium"
                        : "bg-white dark:bg-[#091024] text-slate-700 dark:text-slate-200 border border-slate-200/90 dark:border-white/[0.09] rounded-bl-none font-normal"
                    }`}
                  >
                    <div>{renderFormattedText(msg.text)}</div>
                  </div>

                  {msg.sender === "user" && (
                    <div className="w-7 h-7 rounded-xl bg-slate-200 dark:bg-white/[0.08] flex items-center justify-center text-slate-700 dark:text-slate-300 ml-2.5 flex-shrink-0 mt-0.5">
                      <User className="h-3.5 w-3.5" />
                    </div>
                  )}
                </motion.div>
              ))}

              {loading && (
                <div className="flex justify-start items-center">
                  <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white mr-2.5 shadow-sm">
                    <CurrentIcon className="h-3.5 w-3.5" />
                  </div>
                  <div className="bg-white dark:bg-[#091024] border border-slate-200/90 dark:border-white/[0.09] p-3.5 rounded-2xl rounded-bl-none shadow-sm flex items-center space-x-1.5">
                    <div className="w-2 h-2 bg-sky-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}

              {/* Starter Prompts (shown when conversation is new) */}
              {messages.length === 1 && !loading && (
                <div className="pt-2">
                  <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider">
                    Suggested Prompts:
                  </p>
                  <div className="flex flex-col gap-1.5">
                    {starterPrompts.map((prompt, pIdx) => (
                      <button
                        key={pIdx}
                        onClick={() => handleSendMessage(prompt)}
                        className="text-left px-3 py-2 rounded-xl bg-white dark:bg-white/[0.04] hover:bg-sky-500/10 dark:hover:bg-sky-500/15 border border-slate-200/80 dark:border-white/[0.07] hover:border-sky-400/40 text-xs text-slate-700 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-300 transition-all font-mono"
                      >
                        → {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-3 sm:p-3.5 bg-white dark:bg-[#070e20] border-t border-slate-200/80 dark:border-white/[0.08] flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={`Ask Khushwith's AI (${personaMeta[persona].label})...`}
                className="flex-1 bg-slate-100 dark:bg-white/[0.05] border border-slate-200/80 dark:border-white/[0.08] focus:border-sky-400 focus:outline-none rounded-2xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white transition-all placeholder:text-slate-400"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white p-2.5 rounded-2xl transition-all disabled:opacity-40 shadow-md shadow-sky-500/20 flex-shrink-0"
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Launcher Trigger */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        onClick={() => setIsOpen(!isOpen)}
        className="relative h-14 w-14 rounded-full bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 text-white shadow-xl shadow-sky-500/30 flex items-center justify-center z-50 group border border-white/20"
        aria-label="Toggle AI Chat"
      >
        {!isOpen && (
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white dark:border-slate-900"></span>
          </span>
        )}
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageCircle className="h-6 w-6 group-hover:scale-110 transition-transform" />
        )}
      </motion.button>
    </div>
  );
};

export default Chatbot;