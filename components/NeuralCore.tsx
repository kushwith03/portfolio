"use client";

import { useState, useRef, useEffect } from "react";
import { Send, X, MessageSquare, Info } from "lucide-react";
import gsap from "gsap";
import { useStore } from "@/lib/store";

/**
 * Neural Core: Engineering Reflection Sanctuary
 * Re-aligned to act as a personal architectural consultation layer.
 * Focuses on professional maturity and authentic technical discourse.
 */
export default function NeuralCore() {
  const activeScene = useStore((state) => state.activeScene);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "bot", text: "Systems stabilized. I am Khushwith's synthetic architectural double. How can I assist your technical inquiry regarding these builds?" },
  ]);
  const [input, setInput] = useState("");
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(
        terminalRef.current,
        { scale: 0.98, opacity: 0, filter: "blur(10px)" },
        { scale: 1, opacity: 1, filter: "blur(0px)", duration: 0.8, ease: "power4.out" }
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
        body: JSON.stringify({ message: input, history: messages, persona: "developer" }),
      });
      const data = await res.json();
      setMessages([...newMessages, { role: "bot", text: data.reply }]);
    } catch (error) {
      setMessages([...newMessages, { role: "bot", text: "Communication timeout. Please contact Khushwith directly via GitHub." }]);
    }
  };

  if (activeScene < 2 && !isOpen) return null;

  return (
    <div className="fixed bottom-12 right-12 z-[100]">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-5 text-[9px] uppercase tracking-[0.4em] font-black transition-all hover:text-white"
        >
          <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center bg-black/80 backdrop-blur-xl group-hover:border-white/30 group-hover:scale-110 transition-all duration-700">
            <MessageSquare className="w-3.5 h-3.5 text-white/40" />
          </div>
          <span className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-700 text-white/40">
            Technical_Access
          </span>
        </button>
      ) : (
        <div
          ref={terminalRef}
          className="w-[90vw] md:w-[450px] h-[550px] bg-black/60 backdrop-blur-[60px] border border-white/10 flex flex-col shadow-2xl"
        >
          <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
            <div className="flex items-center gap-4">
              <Info className="w-3 h-3 text-white/20" />
              <span className="text-[9px] font-black uppercase tracking-[0.5em] text-white/30">
                Architectural_Sanctuary // V.2.6
              </span>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/5 transition-colors rounded-full">
              <X className="w-3 h-3 text-white/40" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-8 space-y-10 scrollbar-hide">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] space-y-2 ${msg.role === "user" ? "text-right" : "text-left"}`}>
                  <span className="text-[7px] uppercase tracking-[0.3em] text-white/10 font-bold">
                    {msg.role === "user" ? "Inquiry_Observer" : "Technical_Presence"}
                  </span>
                  <p className={`text-sm font-light leading-relaxed ${msg.role === "user" ? "text-white/80" : "text-white/50"}`}>
                    {msg.text}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-8 border-t border-white/5">
            <div className="flex gap-4 items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Submit technical inquiry..."
                className="flex-1 bg-transparent outline-none text-xs font-light placeholder:text-white/5 text-white/80 transition-all border-b border-white/5 pb-2 focus:border-white/20"
              />
              <button onClick={handleSend} className="group">
                <Send className="w-3.5 h-3.5 text-white/20 group-hover:text-white transition-colors" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
