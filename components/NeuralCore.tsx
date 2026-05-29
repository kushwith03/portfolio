"use client";

import { useState, useRef, useEffect } from "react";
import { Send, X, MessageSquare, Info } from "lucide-react";
import gsap from "gsap";
import { useStore } from "@/lib/store";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Neural Core: Engineering Reflection Sanctuary
 * Re-aligned to act as a personal architectural consultation layer.
 * Focuses on professional maturity and authentic technical discourse.
 */
export default function NeuralCore() {
  const activeScene = useStore((state) => state.activeScene);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "bot", text: "Systems stabilized. I am Khushwith's synthetic architectural double. How can I assist your technical inquiry?" },
  ]);
  const [input, setInput] = useState("");
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(
        terminalRef.current,
        { scale: 0.95, opacity: 0, y: 20, filter: "blur(15px)" },
        { scale: 1, opacity: 1, y: 0, filter: "blur(0px)", duration: 0.6, ease: "power3.out" }
      );
    }
  }, [isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { role: "user", text: input }];
    setMessages(newMessages);
    setInput("");
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        body: JSON.stringify({ 
          message: input, 
          history: messages, 
          persona: "High-performance software engineer, specialized in Data Science, AI Integration, and Full-Stack systems. Professional, concise, and technically rigorous." 
        }),
      });
      const data = await res.json();
      setMessages([...newMessages, { role: "bot", text: data.reply }]);
    } catch (error) {
      setMessages([...newMessages, { role: "bot", text: "Communication timeout. Redirecting to primary GitHub channel..." }]);
    }
  };

  if (activeScene < 1 && !isOpen) return null;

  return (
    <div className="fixed bottom-16 right-16 z-[100] flex flex-col items-end gap-6">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={terminalRef}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="w-[90vw] md:w-[420px] h-[500px] bg-black/80 backdrop-blur-3xl border border-cyan-500/20 flex flex-col shadow-[0_0_50px_rgba(0,0,0,0.8),0_0_20px_rgba(6,182,212,0.1)] mb-4 origin-bottom-right overflow-hidden"
          >
            {/* Terminal Header */}
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/[0.03]">
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.6em] text-white/40">
                  Engineering_Console // V.2.8
                </span>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 transition-colors rounded-full">
                <X className="w-4 h-4 text-white/40" />
              </button>
            </div>

            {/* Terminal Log */}
            <div className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-hide">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] space-y-2 ${msg.role === "user" ? "text-right" : "text-left"}`}>
                    <span className="text-[7px] uppercase tracking-[0.4em] text-cyan-400/40 font-black">
                      {msg.role === "user" ? "INQUIRY_INPUT" : "SYSTEM_RESPONSE"}
                    </span>
                    <p className={`text-[13px] font-light leading-relaxed ${msg.role === "user" ? "text-white/90" : "text-white/60 font-serif italic"}`}>
                      {msg.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Terminal Input */}
            <div className="p-6 bg-white/[0.01] border-t border-white/5">
              <div className="flex gap-4 items-center">
                <span className="text-cyan-500/50 text-xs font-black select-none">&gt;</span>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Execute technical query..."
                  className="flex-1 bg-transparent outline-none text-[13px] font-light placeholder:text-white/5 text-white/90"
                />
                <button onClick={handleSend} className="group p-2">
                  <Send className="w-4 h-4 text-white/20 group-hover:text-cyan-400 transition-colors" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Module Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`group relative flex items-center justify-center w-16 h-16 rounded-full border transition-all duration-700 ${
          isOpen 
            ? 'bg-cyan-500 border-cyan-400 shadow-[0_0_30px_#06b6d4]' 
            : 'bg-black/80 border-white/20 hover:border-cyan-500/50 shadow-2xl backdrop-blur-xl'
        }`}
      >
        <div className={`absolute inset-0 rounded-full border border-cyan-500/20 animate-ping opacity-0 group-hover:opacity-100`} style={{ animationDuration: '3s' }} />
        {isOpen ? (
          <X className="w-6 h-6 text-black" />
        ) : (
          <MessageSquare className="w-6 h-6 text-white/60 group-hover:text-cyan-400 transition-colors" />
        )}
        
        {/* Module Label */}
        {!isOpen && (
          <span className="absolute right-20 text-[9px] uppercase tracking-[0.6em] font-black text-white/20 opacity-0 group-hover:opacity-100 transition-all duration-700 whitespace-nowrap translate-x-4 group-hover:translate-x-0">
            Access_Core
          </span>
        )}
      </button>
    </div>
  );
}
