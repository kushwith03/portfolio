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
      {/* Desktop Navigation - Fixed Left Rail (Indicator Only) */}
      <nav 
        style={{ left: 'var(--nav-offset)', width: 'var(--nav-width)' }}
        className="fixed top-1/2 -translate-y-1/2 z-50 pointer-events-none hidden md:flex flex-col gap-12"
      >
        <div className="flex flex-col gap-10">
          {SECTIONS.map((section) => (
            <div 
              key={section.id} 
              className="flex items-center gap-6 group py-3 px-2"
            >
              <div className="relative flex items-center justify-center w-4 md:w-6">
                <div 
                  className={`w-[2px] md:w-[3px] h-8 md:h-10 transition-all duration-500 ease-out ${
                    activeScene === section.id 
                      ? 'bg-cyan-400 shadow-[0_0_20px_#22d3ee]' 
                      : 'bg-white/30'
                  }`} 
                />
              </div>
              
              <div className={`flex flex-col gap-0.5 transition-all duration-500 transform ${
                activeScene === section.id ? 'opacity-100 translate-x-0' : 'opacity-60 translate-x-[-8px]'
              }`}>
                <span className={`text-[9px] md:text-[11px] uppercase tracking-[0.7em] font-black ${
                  activeScene === section.id ? 'text-white' : 'text-white/80'
                }`}>
                  {section.label}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="absolute left-[11px] top-0 bottom-0 w-[1px] bg-white/10 -z-10" />
      </nav>

      {/* Mobile Hamburger Button */}
      <button 
        className="fixed top-8 right-8 z-[60] md:hidden p-4 bg-black/60 backdrop-blur-3xl border border-white/10 rounded-sm"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Menu"
      >
        {isOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
      </button>

      {/* Mobile Menu Overlay (Indicator Only) */}
      <div 
        className={`fixed inset-0 z-50 bg-[#010101]/95 backdrop-blur-2xl md:hidden flex flex-col items-center justify-center gap-12 transition-all duration-500 ease-in-out ${
          isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'
        }`}
      >
        {SECTIONS.map((section) => (
          <div 
            key={section.id}
            className="flex flex-col items-center gap-2 group"
          >
            <span className={`text-xs uppercase tracking-[0.8em] font-black transition-all ${
              activeScene === section.id ? 'text-cyan-400' : 'text-white/40'
            }`}>
              {section.label}
            </span>
            <div className={`h-px transition-all duration-500 bg-cyan-400 ${
              activeScene === section.id ? 'w-full' : 'w-0'
            }`} />
          </div>
        ))}
        
        {/* Mobile Close Signal */}
        <button 
          onClick={() => setIsOpen(false)}
          className="mt-12 text-[9px] uppercase tracking-[0.5em] text-white/20 font-black hover:text-white transition-colors"
        >
          Close_Artifact
        </button>
      </div>
    </>
  );
}
