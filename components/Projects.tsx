"use client";

import { useRef, useState, useEffect } from "react";
import projects from "@/lib/data/projects.json";
import { useStore } from "@/lib/store";
import gsap from "gsap";
import { Github, Code, Cpu, Database, Network } from "lucide-react";

/**
 * Projects HUD: Engineering System Architecture
 * Compressed pacing pass: Tighter activation windows and reduced vertical separation.
 */
export default function Projects() {
  const scrollProgress = useStore((state) => state.scrollProgress);
  const activeScene = useStore((state) => state.activeScene);
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const hudRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Compressed project activation in Archive scene
    const sceneStart = 0.3;
    const sceneEnd = 0.75;
    const projectStep = (sceneEnd - sceneStart) / projects.length;
    
    let found = null;
    projects.forEach((_, i) => {
      const pFocus = sceneStart + i * projectStep + projectStep / 2;
      if (Math.abs(scrollProgress - pFocus) < 0.1) {
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
          <div className="flex flex-col gap-8 bg-black/60 backdrop-blur-2xl p-8 md:p-12 border border-white/5 shadow-2xl">
            {/* 1. System Metadata */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                   {activeProject === 0 && <Cpu className="w-3.5 h-3.5 text-cyan-400" />}
                   {activeProject === 1 && <Network className="w-3.5 h-3.5 text-yellow-400" />}
                   {activeProject === 2 && <Database className="w-3.5 h-3.5 text-pink-400" />}
                   <span className="text-[9px] uppercase tracking-[0.4em] text-white/30 font-black">
                     Project_Core // 0{activeProject + 1}
                   </span>
                </div>
                <div className="h-px w-10 bg-white/5" />
                <span className="text-[8px] uppercase tracking-[0.2em] text-white/10 font-bold">
                  {projects[activeProject].timeline}
                </span>
              </div>
              
              <h3 className="text-3xl md:text-5xl font-black tracking-tighter uppercase text-white leading-none">
                {projects[activeProject].title}
              </h3>
            </div>

            {/* 2. Engineering Architecture */}
            <div className="space-y-8">
               <div className="space-y-3">
                  <div className="flex items-center gap-3 text-[7px] uppercase tracking-[0.4em] text-white/20 font-bold">
                     <Code className="w-3 h-3" /> System_Architecture
                  </div>
                  <p className="text-base md:text-lg text-white/50 font-light leading-relaxed">
                    {projects[activeProject].description}
                  </p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-white/5 pt-6">
                  <div className="space-y-2">
                     <span className="text-[7px] uppercase tracking-[0.4em] text-white/10 font-bold block">Key_Deliverable</span>
                     <ul className="space-y-1.5">
                        {projects[activeProject].highlights.map((h: string, idx: number) => (
                           <li key={idx} className="text-[9px] text-white/40 tracking-widest uppercase flex items-center gap-3">
                              <div className="w-1 h-1 rounded-full bg-white/10" />
                              {h}
                           </li>
                        ))}
                     </ul>
                  </div>
                  <div className="space-y-4">
                     <span className="text-[7px] uppercase tracking-[0.4em] text-white/10 font-bold block">Extraction_Point</span>
                     <a 
                       href={projects[activeProject].link} 
                       target="_blank"
                       className="group flex items-center gap-3 text-[9px] uppercase tracking-[0.3em] font-black text-white/60 hover:text-white transition-all underline underline-offset-4 decoration-white/10 hover:decoration-white/30"
                     >
                       <Github className="w-3.5 h-3.5 text-white/20 group-hover:text-white transition-colors" />
                       GitHub_Repository
                     </a>
                     <div className="pt-2 flex flex-wrap gap-2">
                        {projects[activeProject].tags.map((tag: string) => (
                          <span key={tag} className="text-[7px] uppercase tracking-[0.1em] px-1.5 py-0.5 bg-white/5 text-white/20 border border-white/5">
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
    </div>
  );
}
