'use client';

import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, Settings2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}

type Persona = 'professional' | 'recruiter' | 'mentor' | 'developer' | 'resume-reviewer';

const welcomeMessages: Record<Persona, string> = {
  professional: "Hi! I'm Khushwith's AI Assistant. How can I help you today?",
  recruiter: "Hello! I can provide data on Khushwith's ROI and project impact. What are you looking for?",
  mentor: "Greetings. I'm ready to dive into the architecture and code decisions of my projects.",
  developer: "Hey! Let's talk tech stacks, APIs, and algorithms.",
  'resume-reviewer': "Paste your resume below for ATS-focused feedback."
};

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [persona, setPersona] = useState<Persona>('professional');
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: welcomeMessages.professional, sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen, loading]);

  // Update welcome message when persona changes
  useEffect(() => {
    setMessages([{ id: Date.now(), text: welcomeMessages[persona], sender: 'bot' }]);
  }, [persona]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { id: Date.now(), text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      // Exclude the initial welcome message from history
      const history = messages.slice(1).map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'model',
        text: msg.text
      }));

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage.text, history, persona }),
      });

      const data = await response.json();
      const reply = data.success ? data.reply : "Apologies, I'm currently offline.";
      setMessages(prev => [...prev, { id: Date.now() + 1, text: reply, sender: 'bot' }]);
    } catch (error) {
      console.error("Chat API error:", error);
      setMessages(prev => [...prev, { id: Date.now() + 1, text: "Sorry, I couldn't connect to the server.", sender: 'bot' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-end font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="w-[90vw] sm:w-96 h-[550px] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 flex flex-col overflow-hidden mb-4"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-blue-600 p-4 text-white shadow-md">
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center space-x-2">
                  <div className="p-1.5 bg-white/20 rounded-full backdrop-blur-sm">
                    <Bot className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm">AI Assistant</h3>
                    <div className="flex items-center text-xs text-blue-100 space-x-1">
                      <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                      <span>Online • Powered by Gemini</span>
                    </div>
                  </div>
                </div>
                <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1.5 rounded-full transition">
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <div className="flex items-center space-x-2 bg-black/20 rounded-lg p-2 border border-white/10">
                <Settings2 className="h-4 w-4 text-blue-200" />
                <select 
                  value={persona} 
                  onChange={(e) => setPersona(e.target.value as Persona)}
                  className="bg-transparent text-xs text-white focus:outline-none w-full cursor-pointer appearance-none font-medium"
                >
                  <option value="professional" className="text-gray-900">Professional (Default)</option>
                  <option value="recruiter" className="text-gray-900">Recruiter Mode</option>
                  <option value="mentor" className="text-gray-900">Tech Mentor</option>
                  <option value="developer" className="text-gray-900">Developer Mode</option>
                  <option value="resume-reviewer" className="text-gray-900">Resume Reviewer</option>
                </select>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto bg-gray-50 dark:bg-gray-950 space-y-4">
              {messages.map((msg) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={msg.id} 
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.sender === 'bot' && (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white mr-2 flex-shrink-0 shadow-sm">
                      <Bot className="h-4 w-4" />
                    </div>
                  )}
                  <div className={`max-w-[80%] p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
                    msg.sender === 'user' 
                      ? 'bg-primary text-white rounded-br-none' 
                      : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-100 dark:border-gray-700 rounded-bl-none'
                  }`}>
                    <div className="whitespace-pre-wrap">{msg.text}</div>
                  </div>
                </motion.div>
              ))}
              {loading && (
                 <div className="flex justify-start">
                   <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white mr-2 shadow-sm">
                      <Bot className="h-4 w-4" />
                   </div>
                   <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-4 rounded-2xl rounded-bl-none shadow-sm flex items-center space-x-1.5">
                     <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                     <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                     <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                   </div>
                 </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSendMessage} className="p-4 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 flex items-center space-x-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 bg-gray-50 dark:bg-gray-800 border-transparent focus:bg-white dark:focus:bg-gray-900 border focus:border-primary dark:focus:border-primary rounded-full px-4 py-2.5 text-sm outline-none transition-all dark:text-white"
              />
              <button 
                type="submit" 
                disabled={loading || !input.trim()}
                className="bg-primary text-white p-2.5 rounded-full hover:bg-blue-700 hover:scale-105 transition-all disabled:opacity-50 disabled:scale-100 shadow-md"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="h-14 w-14 rounded-full bg-gradient-to-r from-primary to-blue-600 text-white shadow-xl shadow-primary/30 flex items-center justify-center z-50 group relative"
      >
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white dark:border-gray-900 animate-pulse" />
        )}
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-7 w-7 group-hover:rotate-12 transition-transform" />}
      </motion.button>
    </div>
  );
};

export default Chatbot;