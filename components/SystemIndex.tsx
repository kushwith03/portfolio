"use client";

import { useStore } from "@/lib/store";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const SECTIONS = [
  { id: 0, label: "HOME", title: "IDENTITY" },
  { id: 1, label: "PROJECTS", title: "ARTIFACTS" },
  { id: 2, label: "EXPERIENCE", title: "PRODUCTION" },
  { id: 3, label: "STACK", title: "ECOSYSTEM" },
  { id: 4, label: "CONTACT", title: "CLOSURE" },
];

export default function SystemIndex() {
  const activeScene = useStore((state) => state.activeScene);
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id: number) => {
    const sectionHeight = document.body.scrollHeight / SECTIONS.length;
    window.scrollTo({
      top: id * sectionHeight,
      behavior: "smooth",
    });
    setIsOpen(false);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="fixed left-8 md:left-12 top-1/2 -translate-y-1/2 z-50 pointer-events-none hidden md:flex flex-col gap-10">
        <div className="flex flex-col gap-8">
          {SECTIONS.map((section) => (
            <div 
              key={section.id} 
              className="flex items-center gap-8 group cursor-pointer pointer-events-auto py-2"
              onClick={() => scrollToSection(section.id)}
            >
              <div className="relative flex items-center justify-center w-6">
                <div 
                  className={`w-[3px] h-8 transition-all duration-500 ease-out ${
                    activeScene === section.id 
                      ? 'bg-cyan-400 shadow-[0_0_15px_#22d3ee]' 
                      : 'bg-white/20 group-hover:bg-white/40'
                  }`} 
                />
              </div>
              
              <div className={`flex flex-col gap-0.5 transition-all duration-500 transform ${
                activeScene === section.id ? 'opacity-100 translate-x-0' : 'opacity-40 group-hover:opacity-80 translate-x-[-10px] group-hover:translate-x-0'
              }`}>
                <span className={`text-[10px] uppercase tracking-[0.6em] font-black ${
                  activeScene === section.id ? 'text-white' : 'text-white/70'
                }`}>
                  {section.label}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="absolute left-[11px] top-0 bottom-0 w-[1px] bg-white/5 -z-10" />
      </nav>

      {/* Mobile Hamburger Button */}
      <button 
        className="fixed top-8 right-8 z-[60] md:hidden p-4 bg-black/40 backdrop-blur-2xl border border-white/10 rounded-sm"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Menu"
      >
        {isOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white/80" />}
      </button>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 z-50 bg-[#010101]/95 backdrop-blur-2xl md:hidden flex flex-col items-center justify-center gap-12 transition-all duration-500 ease-in-out ${
          isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'
        }`}
      >
        {SECTIONS.map((section) => (
          <button 
            key={section.id}
            className="flex flex-col items-center gap-2 group"
            onClick={() => scrollToSection(section.id)}
          >
            <span className={`text-xs uppercase tracking-[0.8em] font-black transition-all ${
              activeScene === section.id ? 'text-cyan-400' : 'text-white/40'
            }`}>
              {section.label}
            </span>
            <div className={`h-px transition-all duration-500 bg-cyan-400 ${
              activeScene === section.id ? 'w-full' : 'w-0'
            }`} />
          </button>
        ))}
      </div>
    </>
  );
}
