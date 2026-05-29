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
          <div className="grid grid-cols-1 lg:grid-cols-10 gap-16 items-start">
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

            {/* RIGHT: Engineering Dashboard (55%) */}
            <div className="lg:col-span-6 hidden lg:grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 border border-white/10 shadow-2xl relative group overflow-hidden">
               {/* Dashboard Header */}
               <div className="col-span-full bg-black/40 backdrop-blur-xl border-b border-white/5 p-6 flex justify-between items-center">
                  <div className="flex items-center gap-4">
                     <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" />
                     <span className="text-[9px] uppercase tracking-[0.4em] text-white/40 font-bold italic">Active_System_Scan // V.2.0</span>
                  </div>
                  <div className="flex gap-2">
                     <div className="w-8 h-1 bg-white/10" />
                     <div className="w-8 h-1 bg-white/5" />
                  </div>
               </div>

               {/* Metric Cards */}
               {(projects[activeProject] as any).highlights?.map((highlight: string, i: number) => {
                  const [label, ...valParts] = highlight.includes(':') ? highlight.split(':') : [highlight, 'Enabled'];
                  const value = valParts.join(':').trim();
                  
                  return (
                    <div key={i} className="bg-black/60 p-8 flex flex-col gap-6 group/item hover:bg-white/[0.02] transition-colors">
                       <div className="flex justify-between items-start">
                          <span className="text-[8px] uppercase tracking-[0.4em] text-white/20 font-black">
                            {label.replace(/ /g, '_').toUpperCase()}
                          </span>
                          <div className="p-2 bg-white/5 border border-white/5 opacity-0 group-hover/item:opacity-100 transition-opacity">
                             <Database className="w-3 h-3 text-cyan-500/40" />
                          </div>
                       </div>
                       <div className="flex flex-col gap-1">
                          <span className="text-xl font-black uppercase text-white tracking-tighter">
                            {value}
                          </span>
                          <div className="w-full h-0.5 bg-white/5 relative overflow-hidden">
                             <div className="absolute inset-y-0 left-0 w-1/3 bg-cyan-500/20 group-hover/item:translate-x-[200%] transition-transform duration-1000" />
                          </div>
                       </div>
                    </div>
                  );
               })}

               {/* Functional Specs Row */}
               <div className="col-span-full bg-white/[0.02] p-6 border-t border-white/5 flex justify-between items-center opacity-40 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="flex gap-8">
                     <div className="flex flex-col gap-1">
                        <span className="text-[7px] uppercase tracking-[0.3em] text-white/30 font-bold">Status</span>
                        <span className="text-[9px] uppercase tracking-widest text-cyan-400 font-black">Production_Ready</span>
                     </div>
                     <div className="flex flex-col gap-1 border-l border-white/5 pl-8">
                        <span className="text-[7px] uppercase tracking-[0.3em] text-white/30 font-bold">Latency</span>
                        <span className="text-[9px] uppercase tracking-widest text-white/60">Optimized</span>
                     </div>
                  </div>
                  <div className="flex items-center gap-4">
                     <span className="text-[8px] uppercase tracking-[0.4em] text-white/10 font-bold">Engineering_Spec_v2.0</span>
                  </div>
               </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
