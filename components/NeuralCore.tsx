"use client";

import { useState, useRef, useEffect } from "react";
import { Send, X, Sparkles, MessageSquare } from "lucide-react";
import gsap from "gsap";
import { useStore } from "@/lib/store";

export default function NeuralCore() {
  const activeScene = useStore((state) => state.activeScene);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "bot", text: "You've reached the core. How can I help you reflect on the journey through this digital architecture?" },
  ]);
  const [input, setInput] = useState("");
  const terminalRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Sync opening with the final scene transition for emotional impact
  useEffect(() => {
    if (activeScene === 2 && !isOpen) {
      // Subtle auto-reveal or hint could go here, but restraint is key.
    }
  }, [activeScene, isOpen]);

  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(
        terminalRef.current,
        { scale: 0.95, opacity: 0, filter: "blur(10px)", y: 10 },
        { scale: 1, opacity: 1, filter: "blur(0px)", y: 0, duration: 1.2, ease: "power4.out" }
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
        body: JSON.stringify({ message: input, history: messages }),
      });
      const data = await res.json();
      setMessages([...newMessages, { role: "bot", text: data.reply }]);
    } catch (error) {
      setMessages([...newMessages, { role: "bot", text: "The core is currently stabilizing. Please try again shortly." }]);
    }
  };

  // Only show activation prompt in the final stages of the journey
  if (activeScene < 2 && !isOpen) return null;

  return (
    <div className="fixed bottom-12 right-12 z-[100]">
      {!isOpen ? (
        <button
          ref={buttonRef}
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-4 text-[10px] uppercase tracking-[0.4em] font-black transition-all hover:text-cyan-400"
        >
          <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center bg-white/5 backdrop-blur-xl group-hover:border-cyan-400/50 group-hover:scale-110 transition-all duration-500">
            <MessageSquare className="w-4 h-4" />
          </div>
          <span className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-500">
            Interface_Core
          </span>
        </button>
      ) : (
        <div
          ref={terminalRef}
          className="w-[90vw] md:w-[450px] h-[550px] bg-[#050505]/60 backdrop-blur-[40px] border border-white/10 flex flex-col shadow-2xl"
        >
          {/* Subtle Neural Header */}
          <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
            <div className="flex items-center gap-4">
              <div className="w-1 h-1 bg-cyan-400 rounded-full shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
              <span className="text-[9px] font-black uppercase tracking-[0.5em] text-white/40">
                Neural_Core // Reflection_Sanctuary
              </span>
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              className="p-2 hover:bg-white/5 transition-colors rounded-full"
            >
              <X className="w-3 h-3 text-white/40" />
            </button>
          </div>

          {/* Emotional Conversation Flow */}
          <div className="flex-1 overflow-y-auto p-8 space-y-10 scrollbar-hide">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] space-y-2 ${msg.role === "user" ? "text-right" : "text-left"}`}>
                  <span className="text-[8px] uppercase tracking-[0.3em] text-white/20 font-bold">
                    {msg.role === "user" ? "Observer" : "Neural_Presence"}
                  </span>
                  <p className={`text-base font-light leading-relaxed ${msg.role === "user" ? "text-white" : "text-gray-400"}`}>
                    {msg.text}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Minimal Interaction Input */}
          <div className="p-8 border-t border-white/5 bg-white/[0.01]">
            <div className="flex gap-6 items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Synchronize reflective query..."
                className="flex-1 bg-transparent outline-none text-sm font-light placeholder:text-white/10 text-white transition-all"
              />
              <button 
                onClick={handleSend} 
                className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/5 transition-all group"
              >
                <Send className="w-4 h-4 text-white/20 group-hover:text-cyan-400 transition-colors" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
