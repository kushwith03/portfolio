"use client";

import { useStore } from "@/lib/store";

const SECTIONS = [
  { id: 0, label: "00_INITIALIZE", title: "Identity Core" },
  { id: 1, label: "01_MINDSET", title: "Engineering Philosophy" },
  { id: 2, label: "02_PRODUCTION", title: "Experience Timeline" },
  { id: 3, label: "03_STACK", title: "System Architecture" },
  { id: 4, label: "04_ARTIFACTS", title: "Engineering Builds" },
  { id: 5, label: "05_RESEARCH", title: "Current Focus" },
  { id: 6, label: "06_TERMINATE", title: "Closure" },
];

export default function SystemIndex() {
  const activeScene = useStore((state) => state.activeScene);

  return (
    <div className="fixed left-6 md:left-12 top-1/2 -translate-y-1/2 z-50 pointer-events-none mix-blend-difference hidden md:flex flex-col gap-6">
      {SECTIONS.map((section) => (
        <div key={section.id} className="flex items-center gap-6 group">
          <div className="relative flex items-center justify-center w-4 h-4">
            <div 
              className={`w-1 h-1 rounded-full transition-all duration-700 ${
                activeScene === section.id ? 'bg-cyan-400 scale-[2.5] shadow-[0_0_10px_#22d3ee]' : 'bg-white/10'
              }`} 
            />
            {activeScene === section.id && (
              <div className="absolute inset-0 border border-cyan-400/20 rounded-full animate-ping" style={{ animationDuration: '4s' }} />
            )}
          </div>
          <div className="flex flex-col opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <span 
              className={`text-[8px] uppercase tracking-[0.5em] font-black transition-all duration-700 ${
                activeScene === section.id ? 'text-cyan-400' : 'text-white/40'
              }`}
            >
              {section.label}
            </span>
            <span className="text-[6px] uppercase tracking-[0.3em] text-white/20 font-bold">{section.title}</span>
          </div>
        </div>
      ))}
      <div className="absolute left-[7px] top-6 bottom-6 w-px bg-gradient-to-b from-transparent via-white/5 to-transparent -z-10" />
    </div>
  );
}
