"use client";

import { useRef, useState, useEffect } from "react";
import projects from "@/lib/data/projects.json";
import { useStore } from "@/lib/store";
import gsap from "gsap";
import { Github, Code, Cpu, Database, Network } from "lucide-react";

/**
 * Projects HUD: Re-calibrated for immediate entry.
 */
export default function Projects() {
  const scrollProgress = useStore((state) => state.scrollProgress);
  const activeScene = useStore((state) => state.activeScene);
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const hudRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Calibrated project windows (0.25 to 0.85)
    const sceneStart = 0.25;
    const sceneEnd = 0.85;
    const projectStep = (sceneEnd - sceneStart) / projects.length;
    
    let found = null;
    projects.forEach((_, i) => {
      const pFocus = sceneStart + i * projectStep + projectStep / 2;
      // Closer check window for tighter flow
      if (Math.abs(scrollProgress - pFocus) < 0.1) {
        found = i;
      }
    });
    
    if (found !== activeProject) {
      setActiveProject(found);
      if (found !== null) {
        gsap.fromTo(hudRef.current, 
          { y: 15, opacity: 0, filter: "blur(10px)" }, 
          { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.6, ease: "power2.out" }
        );
      } else {
        gsap.to(hudRef.current, { opacity: 0, duration: 0.4 });
      }
    }
  }, [scrollProgress, activeProject]);

  if (activeScene !== 1 && activeProject === null) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-20 flex items-center px-6 md:pl-56 md:pr-24">
      <div 
        ref={hudRef}
        className="w-full max-w-6xl opacity-0 pointer-events-auto"
      >
        {activeProject !== null && (
          <div className="grid grid-cols-1 lg:grid-cols-10 gap-16 items-center">
            {/* LEFT: Project Intel (45%) */}
            <div className="lg:col-span-4 flex flex-col gap-10">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                   <div className="flex items-center gap-2">
                      {activeProject === 0 && <Cpu className="w-4 h-4 text-cyan-400" />}
                      {activeProject === 1 && <Network className="w-4 h-4 text-yellow-400" />}
                      {activeProject === 2 && <Database className="w-4 h-4 text-pink-400" />}
                      <span className="text-[10px] uppercase tracking-[0.5em] text-white/40 font-black">
                        Artifact_0{activeProject + 1}
                      </span>
                   </div>
                   <div className="h-px w-8 bg-white/10" />
                   <span className="text-[8px] uppercase tracking-[0.2em] text-white/20 font-bold">
                     {projects[activeProject].timeline}
                   </span>
                </div>
                <h3 className="text-4xl md:text-5xl font-black tracking-tighter uppercase text-white leading-[0.95] max-w-md">
                  {projects[activeProject].title}
                </h3>
              </div>

              <div className="space-y-10">
                 <p className="text-base text-white/60 font-light leading-relaxed max-w-sm">
                   {projects[activeProject].description}
                 </p>

                 <div className="flex flex-col gap-6 border-t border-white/5 pt-8">
                    <div className="flex flex-wrap gap-2">
                       {projects[activeProject].tags.map((tag: string) => (
                         <span key={tag} className="text-[8px] uppercase tracking-[0.1em] px-2 py-1 bg-white/5 text-white/30 border border-white/5 font-bold">
                           {tag}
                         </span>
                       ))}
                    </div>
                    <a 
                       href={projects[activeProject].link} 
                       target="_blank"
                       className="group inline-flex items-center gap-4 text-[10px] uppercase tracking-[0.5em] font-black text-white/70 hover:text-white transition-all underline underline-offset-8 decoration-white/10"
                    >
                       <Github className="w-5 h-5 text-white/20 group-hover:text-cyan-400 transition-colors" />
                       View_Repository
                    </a>
                 </div>
              </div>
            </div>

            {/* RIGHT: Visual Artifact (55%) */}
            <div className="lg:col-span-6 hidden lg:block h-[420px] bg-black/40 backdrop-blur-3xl border border-white/5 shadow-2xl relative group overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500/30 to-transparent" />
               
               <div className="absolute inset-0 flex items-center justify-center opacity-10 grayscale group-hover:grayscale-0 group-hover:opacity-40 transition-all duration-1000">
                  <div className="text-[7rem] font-black tracking-tighter uppercase leading-none select-none italic">
                    {projects[activeProject].title.split(' ')[0]}
                  </div>
               </div>

               {/* Systematic Detail Decor */}
               <div className="absolute bottom-8 right-8 flex flex-col items-end gap-1">
                  <span className="text-[7px] uppercase tracking-[0.4em] text-white/10 font-bold">Production_Node</span>
                  <div className="flex gap-1">
                     <div className="w-1 h-1 bg-white/20" />
                     <div className="w-1 h-1 bg-white/10" />
                     <div className="w-1 h-1 bg-white/5" />
                  </div>
               </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
