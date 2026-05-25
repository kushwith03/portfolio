"use client";

import { useState, useRef, useEffect } from "react";
import { Send, User, Bot, X, Sparkles } from "lucide-react";
import gsap from "gsap";

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "bot", text: "Welcome to the Neural Interface. I am Khushwith's synthetic double. How can I assist your inquiry?" },
  ]);
  const [input, setInput] = useState("");
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(
        terminalRef.current,
        { scale: 0.9, opacity: 0, y: 20 },
        { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: "power4.out" }
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
      setMessages([...newMessages, { role: "bot", text: "Transmission error. Please re-synchronize." }]);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative w-16 h-16 bg-white text-black rounded-full flex items-center justify-center transition-transform hover:scale-110 active:scale-95 shadow-2xl overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity" />
          <Sparkles className="w-6 h-6" />
        </button>
      ) : (
        <div
          ref={terminalRef}
          className="w-[90vw] md:w-[400px] h-[600px] bg-black/40 backdrop-blur-3xl border border-white/20 flex flex-col shadow-2xl"
        >
          <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" />
              <span className="text-xs font-black uppercase tracking-[0.3em]">Neural Interface</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-white transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] p-4 ${msg.role === "user" ? "bg-white text-black" : "bg-white/5 border border-white/10 text-gray-200"}`}>
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-6 border-t border-white/10 bg-white/5">
            <div className="flex gap-4">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Synchronize query..."
                className="flex-1 bg-transparent border-b border-white/20 focus:border-white outline-none text-sm py-2 transition-colors"
              />
              <button onClick={handleSend} className="text-white hover:text-cyan-400 transition-colors">
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
