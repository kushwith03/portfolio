"use client";

import { useStore } from "@/lib/store";
import { useState } from "react";
import { Menu, X } from "lucide-react";

import { SCENES } from "@/lib/constants";

const SECTIONS = [
  { id: SCENES.HOME, label: "HOME", target: "home" },
  { id: SCENES.PROJECTS, label: "PROJECTS", target: "projects" },
  { id: SCENES.EXPERIENCE, label: "EXPERIENCE", target: "experience" },
  { id: SCENES.STACK, label: "STACK", target: "stack" },
  { id: SCENES.CONTACT, label: "CONTACT", target: "contact" },
];

export default function SystemIndex() {
  const activeScene = useStore((state) => state.activeScene);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Desktop Narrative Rail - Cinematic Indicator */}
      <nav 
        style={{ left: 'var(--nav-offset)', width: 'var(--nav-width)' }}
        className="fixed top-1/2 -translate-y-1/2 z-50 pointer-events-none hidden md:flex flex-col gap-12"
      >
        <div className="flex flex-col gap-10 relative">
          {/* Narrative Pipeline (Continuous track) */}
          <div className="absolute left-[11px] top-0 bottom-0 w-[1px] bg-white/5 -z-10" />
          
          {SECTIONS.map((section, idx) => {
            const isActive = activeScene === section.id;
            const isPassed = activeScene > section.id;

            return (
              <div 
                key={section.id} 
                className="flex items-center gap-6 py-4 px-2 group transition-all duration-700"
              >
                {/* Visual Node */}
                <div className="relative flex items-center justify-center w-6">
                  {/* Node Connector Bar */}
                  <div 
                    className={`w-[2px] md:w-[3px] transition-all duration-700 ease-out origin-top ${
                      isActive 
                        ? 'h-10 bg-cyan-400 shadow-[0_0_20px_#22d3ee] scale-y-125' 
                        : isPassed 
                          ? 'h-8 bg-white/40' 
                          : 'h-8 bg-white/10'
                    }`} 
                  />
                  
                  {/* Active Pulse (Subtle) */}
                  {isActive && (
                    <div className="absolute inset-0 w-full h-full bg-cyan-400/20 blur-md animate-pulse -z-10" />
                  )}
                </div>
                
                {/* Chapter Label */}
                <div className={`flex flex-col gap-1 transition-all duration-700 transform ${
                  isActive 
                    ? 'opacity-100 translate-x-2' 
                    : isPassed 
                      ? 'opacity-30 translate-x-0' 
                      : 'opacity-10 -translate-x-2'
                }`}>
                  <span className={`text-[8px] uppercase tracking-[0.5em] font-bold text-white/20`}>
                    0{idx + 1}
                  </span>
                  <span className={`text-[10px] md:text-[12px] uppercase tracking-[0.8em] font-black transition-colors ${
                    isActive ? 'text-white' : 'text-white/40'
                  }`}>
                    {section.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </nav>

      {/* Mobile Narrative Status (Minimal Footer/Top Bar Replacement) */}
      <div className="fixed bottom-8 left-8 right-8 z-[60] md:hidden flex justify-between items-end pointer-events-none">
        <div className="flex flex-col gap-2">
           <span className="text-[8px] uppercase tracking-[0.6em] text-white/20 font-black">Current_Chapter</span>
           <div className="flex items-center gap-4">
              <div className="w-1 h-6 bg-cyan-400 shadow-[0_0_15px_#22d3ee]" />
              <span className="text-xs uppercase tracking-[0.8em] font-black text-white">
                {SECTIONS.find(s => s.id === activeScene)?.label}
              </span>
           </div>
        </div>

        <button 
          className="pointer-events-auto p-4 bg-black/60 backdrop-blur-3xl border border-white/10 rounded-full"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Narrative Index"
        >
          {isOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
        </button>
      </div>

      {/* Mobile Narrative Index Overlay (Visual Only) */}
      <div 
        className={`fixed inset-0 z-50 bg-[#010101]/98 backdrop-blur-2xl md:hidden flex flex-col items-center justify-center gap-10 transition-all duration-700 ease-in-out ${
          isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center gap-8">
          {SECTIONS.map((section, idx) => (
            <div 
              key={section.id}
              className={`flex flex-col items-center gap-3 transition-all duration-700 ${
                activeScene === section.id ? 'scale-110' : 'scale-90 opacity-40'
              }`}
            >
              <span className="text-[8px] uppercase tracking-[0.8em] text-cyan-400/40 font-black">Phase_0{idx + 1}</span>
              <span className={`text-sm uppercase tracking-[1em] font-black ${
                activeScene === section.id ? 'text-white' : 'text-white/20'
              }`}>
                {section.label}
              </span>
              <div className={`h-[2px] transition-all duration-700 bg-cyan-400 ${
                activeScene === section.id ? 'w-12 shadow-[0_0_15px_#22d3ee]' : 'w-0'
              }`} />
            </div>
          ))}
        </div>
        
        <button 
          onClick={() => setIsOpen(false)}
          className="mt-20 text-[9px] uppercase tracking-[0.6em] text-white/10 font-black hover:text-white/40 transition-colors pointer-events-auto"
        >
          Exit_Narrative_Map
        </button>
      </div>
    </>
  );
}
