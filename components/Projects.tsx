"use client";

import { useRef, useState, useEffect } from "react";
import projects from "@/lib/data/projects.json";
import { useStore } from "@/lib/store";
import gsap from "gsap";
import { Github, Code, Cpu, Database, Network } from "lucide-react";

/**
 * Projects HUD: Engineering System Architecture
 * Grounded in the builder's real technical decisions and architectural constraints.
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
          { y: 15, opacity: 0, filter: "blur(10px)" }, 
          { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.8, ease: "power4.out" }
        );
      } else {
        gsap.to(hudRef.current, { opacity: 0, duration: 0.5 });
      }
    }
  }, [scrollProgress, activeProject]);

  if (activeScene !== 1 && activeProject === null) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-20 flex items-center justify-end px-12 md:px-32">
      <div 
        ref={hudRef}
        className="max-w-2xl w-full opacity-0 pointer-events-auto"
      >
        {activeProject !== null && (
          <div className="flex flex-col gap-12 bg-black/40 backdrop-blur-2xl p-10 border border-white/5">
            {/* 1. System Metadata */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                   {activeProject === 0 && <Cpu className="w-3.5 h-3.5 text-cyan-400" />}
                   {activeProject === 1 && <Network className="w-3.5 h-3.5 text-yellow-400" />}
                   {activeProject === 2 && <Database className="w-3.5 h-3.5 text-pink-400" />}
                   <span className="text-[10px] uppercase tracking-[0.4em] text-white/40 font-black">
                     Project_Core_{activeProject + 1}
                   </span>
                </div>
                <div className="h-px w-12 bg-white/10" />
                <span className="text-[9px] uppercase tracking-[0.2em] text-white/20 font-bold">
                  {projects[activeProject].timeline}
                </span>
              </div>
              
              <h3 className="text-4xl md:text-6xl font-black tracking-tighter uppercase text-white leading-none">
                {projects[activeProject].title}
              </h3>
            </div>

            {/* 2. Engineering Architecture */}
            <div className="space-y-10">
               <div className="space-y-4">
                  <div className="flex items-center gap-3 text-[8px] uppercase tracking-[0.4em] text-white/20 font-bold">
                     <Code className="w-3 h-3" /> System_Architecture
                  </div>
                  <p className="text-lg md:text-xl text-white/60 font-light leading-relaxed">
                    {projects[activeProject].description}
                  </p>
               </div>

               <div className="grid grid-cols-2 gap-12 border-t border-white/5 pt-8">
                  <div className="space-y-3">
                     <span className="text-[8px] uppercase tracking-[0.4em] text-white/20 font-bold block">Key_Deliverable</span>
                     <ul className="space-y-2">
                        {projects[activeProject].highlights.map((h: string, idx: number) => (
                           <li key={idx} className="text-[10px] text-white/50 tracking-widest uppercase flex items-center gap-3">
                              <div className="w-1 h-1 rounded-full bg-white/10" />
                              {h}
                           </li>
                        ))}
                     </ul>
                  </div>
                  <div className="space-y-4">
                     <span className="text-[8px] uppercase tracking-[0.4em] text-white/20 font-bold block">Source_Control</span>
                     <a 
                       href={projects[activeProject].link} 
                       target="_blank"
                       className="group flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] font-black text-white/70 hover:text-white transition-all underline underline-offset-8"
                     >
                       <Github className="w-4 h-4 text-white/20 group-hover:text-white transition-colors" />
                       GitHub_Repository
                     </a>
                     <div className="pt-4 flex flex-wrap gap-2">
                        {projects[activeProject].tags.map((tag: string) => (
                          <span key={tag} className="text-[7px] uppercase tracking-[0.2em] px-2 py-0.5 bg-white/5 text-white/30 border border-white/5">
                            {tag}
                          </span>
                        ))}
                     </div>
                  </div>
               </div>
            </div>
          </div>
        )}
      </div>

      {/* Identification Plate */}
      <div className="absolute left-12 bottom-12 flex flex-col items-start gap-4 opacity-10">
         <span className="text-[7px] uppercase tracking-[1em] vertical-text">R_KHUSHWITH_KUMAR</span>
         <div className="w-px h-24 bg-white/20" />
      </div>
    </div>
  );
}
