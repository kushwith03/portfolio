"use client";

import { useStore } from "@/lib/store";

const SECTIONS = [
  { id: 0, label: "00", title: "IDENTITY", chapter: "CORE" },
  { id: 1, label: "01", title: "PHILOSOPHY", chapter: "MINDSET" },
  { id: 2, label: "02", title: "PRODUCTION", chapter: "EXPERIENCE" },
  { id: 3, label: "03", title: "ECOSYSTEM", chapter: "STACK" },
  { id: 4, label: "04", title: "ARTIFACTS", chapter: "BUILD" },
  { id: 5, label: "05", title: "CLOSURE", chapter: "EPILOGUE" },
];

export default function SystemIndex() {
  const activeScene = useStore((state) => state.activeScene);

  return (
    <div className="fixed left-8 md:left-12 top-1/2 -translate-y-1/2 z-50 pointer-events-none hidden md:flex flex-col gap-10">
      {/* Chapter Indicator */}
      <div className="flex flex-col gap-1 mb-4 border-l border-white/10 pl-4 py-2">
         <span className="text-[7px] uppercase tracking-[0.4em] text-white/20 font-black">Current_Chapter</span>
         <span className="text-[10px] uppercase tracking-[0.2em] text-cyan-400 font-bold">
            {SECTIONS[activeScene]?.chapter || "INITIALIZE"}
         </span>
      </div>

      <div className="flex flex-col gap-6">
        {SECTIONS.map((section) => (
          <div key={section.id} className="flex items-center gap-6 group cursor-pointer pointer-events-auto">
            <div className="relative flex items-center justify-center">
              <div 
                className={`w-[2px] h-6 transition-all duration-700 ease-out ${
                  activeScene === section.id 
                    ? 'bg-cyan-400 shadow-[0_0_15px_#22d3ee]' 
                    : 'bg-white/5 group-hover:bg-white/20'
                }`} 
              />
            </div>
            
            <div className="flex flex-col gap-0.5 opacity-20 group-hover:opacity-100 transition-all duration-500 transform translate-x-[-10px] group-hover:translate-x-0">
              <span className={`text-[8px] uppercase tracking-[0.4em] font-black ${
                activeScene === section.id ? 'text-white' : 'text-white/40'
              }`}>
                {section.label}_{section.title}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Vertical Progress Bar */}
      <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-white/5 -z-10" />
    </div>
  );
}
