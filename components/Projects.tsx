"use client";

import { useRef, useState, useEffect } from "react";
import projects from "@/lib/data/projects.json";
import { useStore } from "@/lib/store";
import gsap from "gsap";
import { Github, Fingerprint, Lock, Compass } from "lucide-react";

/**
 * Projects HUD: Engineering Narratives
 * Introduces 'Architect's Notes' and refined hierarchy to establish human presence.
 */
export default function Projects() {
  const scrollProgress = useStore((state) => state.scrollProgress);
  const activeScene = useStore((state) => state.activeScene);
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const hudRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sceneStart = 0.35;
    const sceneEnd = 0.7;
    const projectStep = (sceneEnd - sceneStart) / projects.length;
    
    let found = null;
    projects.forEach((_, i) => {
      const pFocus = sceneStart + i * projectStep + projectStep / 2;
      if (Math.abs(scrollProgress - pFocus) < 0.12) {
        found = i;
      }
    });
    
    if (found !== activeProject) {
      setActiveProject(found);
      if (found !== null) {
        gsap.fromTo(hudRef.current, 
          { y: 20, opacity: 0, filter: "blur(15px)" }, 
          { y: 0, opacity: 1, filter: "blur(0px)", duration: 1, ease: "power4.out" }
        );
      } else {
        gsap.to(hudRef.current, { opacity: 0, duration: 0.5 });
      }
    }
  }, [scrollProgress, activeProject]);

  if (activeScene !== 1 && activeProject === null) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-20 flex items-center justify-end px-12 md:px-40">
      <div 
        ref={hudRef}
        className="max-w-xl w-full opacity-0 pointer-events-auto"
      >
        {activeProject !== null && (
          <div className="flex flex-col gap-16">
            {/* 1. Signature Header */}
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <div className="w-1 h-1 bg-white/20 rounded-full" />
                <span className="text-[8px] uppercase tracking-[0.6em] text-white/30 font-black">
                  Case_Study // Engineering_Log_{activeProject + 1}
                </span>
              </div>
              
              <h3 className="text-5xl md:text-8xl font-light tracking-tighter leading-[0.8] text-white">
                {projects[activeProject].title.split(' ').map((word, i) => (
                   <span key={i} className={i === 0 ? "block" : "block ml-12 text-white/10 font-serif italic"}>
                     {word}
                   </span>
                ))}
              </h3>
            </div>

            {/* 2. Architect's Note (Human Presence) */}
            <div className="border-l border-white/10 pl-10 space-y-8">
               <div className="space-y-4">
                  <div className="flex items-center gap-3 text-[7px] uppercase tracking-[0.4em] text-white/20">
                     <Fingerprint className="w-3 h-3" /> Architect's_Note
                  </div>
                  <p className="text-xl md:text-2xl text-white/80 font-light leading-snug tracking-tight max-w-lg">
                    {activeProject === 0 && "Navigating complex state spaces with sub-50ms latency required a fundamental rethink of neural bottle-necks."}
                    {activeProject === 1 && "The challenge was translating professional hierarchy into a dynamic system that felt both intelligent and rigid."}
                    {activeProject === 2 && "Architecting a secure modular platform where data integrity is the primary design constraint."}
                  </p>
               </div>

               <div className="grid grid-cols-2 gap-12">
                  <div className="space-y-2">
                     <span className="text-[7px] uppercase tracking-[0.4em] text-white/10 font-bold block">Technical_Constraint</span>
                     <p className="text-[10px] text-white/40 tracking-widest leading-relaxed uppercase">
                        {projects[activeProject].highlights[1]}
                     </p>
                  </div>
                  <div className="space-y-2">
                     <span className="text-[7px] uppercase tracking-[0.4em] text-white/10 font-bold block">Extraction_Point</span>
                     <a 
                       href={projects[activeProject].link} 
                       target="_blank"
                       className="group flex items-center gap-2 text-[9px] uppercase tracking-[0.3em] font-black text-white/50 hover:text-white transition-all underline underline-offset-8"
                     >
                       GitHub_Repository
                     </a>
                  </div>
               </div>
            </div>

            {/* 3. Stack Metadata (Minimal) */}
            <div className="flex flex-wrap gap-4 pt-4">
               {projects[activeProject].tags.map((tag: string) => (
                 <span key={tag} className="text-[8px] uppercase tracking-[0.2em] text-white/10 border border-white/5 px-2 py-1">
                   {tag}
                 </span>
               ))}
            </div>
          </div>
        )}
      </div>

      {/* Signature Vertical Element */}
      <div className="absolute right-12 bottom-12 flex flex-col items-end gap-4 opacity-10">
         <span className="text-[7px] uppercase tracking-[0.8em]">System_Architected_By_K.Kumar</span>
         <div className="w-32 h-px bg-white/20" />
      </div>
    </div>
  );
}
