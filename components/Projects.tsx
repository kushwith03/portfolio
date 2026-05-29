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
    // Calibrated project windows mapping to Scene 4 (0.47 to 0.72)
    const sceneStart = 0.47;
    const sceneEnd = 0.72;
    const projectStep = (sceneEnd - sceneStart) / projects.length;
    
    let found = null;
    projects.forEach((_, i) => {
      const pFocus = sceneStart + i * projectStep + projectStep / 2;
      if (Math.abs(scrollProgress - pFocus) < (projectStep / 2.2)) {
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

  if (activeScene !== 4 && activeProject === null) return null;

  const isEven = activeProject !== null && activeProject % 2 === 0;

  return (
    <div className="fixed inset-0 pointer-events-none z-20 flex items-center justify-center px-6 md:px-12">
      <div 
        ref={hudRef}
        className="max-w-7xl w-full opacity-0 pointer-events-auto"
      >
        {activeProject !== null && (
          <div className="relative group bg-black/40 backdrop-blur-3xl border border-white/10 overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]">
            {/* Engineering Header Decor */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500/50 via-blue-500/50 to-transparent" />
            <div className="absolute top-0 right-0 p-2 flex gap-1">
               <div className="w-1 h-1 bg-white/20" />
               <div className="w-1 h-1 bg-white/10" />
               <div className="w-1 h-1 bg-white/5" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              {/* Left Column: Technical Metadata */}
              <div className="lg:col-span-4 border-r border-white/5 p-8 md:p-12 flex flex-col justify-between bg-white/[0.02]">
                <div className="space-y-12">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-cyan-500 shadow-[0_0_10px_#06b6d4]" />
                      <span className="text-[10px] uppercase tracking-[0.5em] text-cyan-400/80 font-black">
                        Artifact_0{activeProject + 1}
                      </span>
                    </div>
                    <h3 className="text-4xl md:text-6xl font-black tracking-tighter uppercase text-white leading-none">
                      {projects[activeProject].title.split(' ').map((word, i) => (
                        <span key={i} className={i % 2 === 1 ? "text-white/30" : "text-white"}>
                          {word}{' '}
                        </span>
                      ))}
                    </h3>
                    <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-bold border-l border-white/20 pl-4">
                       {projects[activeProject].timeline}
                    </span>
                  </div>

                  <div className="space-y-6">
                    <div className="flex flex-col gap-2">
                       <span className="text-[8px] uppercase tracking-[0.4em] text-white/20 font-bold flex items-center gap-2">
                         <Code className="w-3 h-3" /> Tech_Stack
                       </span>
                       <div className="flex flex-wrap gap-2">
                         {projects[activeProject].tags.map((tag: string) => (
                           <span key={tag} className="text-[9px] uppercase tracking-wider px-2 py-1 bg-white/5 text-white/60 border border-white/10">
                             {tag}
                           </span>
                         ))}
                       </div>
                    </div>

                    <div className="flex flex-col gap-2">
                       <span className="text-[8px] uppercase tracking-[0.4em] text-white/20 font-bold flex items-center gap-2">
                         <Cpu className="w-3 h-3" /> System_Highlights
                       </span>
                       <ul className="space-y-2">
                          {(projects[activeProject] as any).highlights?.map((h: string, i: number) => (
                            <li key={i} className="text-[10px] uppercase tracking-widest text-white/50 flex items-center gap-3">
                               <div className="w-1 h-px bg-cyan-500/40" />
                               {h}
                            </li>
                          ))}
                       </ul>
                    </div>
                  </div>
                </div>

                <div className="pt-12">
                   <a 
                     href={projects[activeProject].link} 
                     target="_blank"
                     className="group inline-flex items-center gap-4 text-[10px] uppercase tracking-[0.5em] font-black text-white/40 hover:text-white transition-all"
                   >
                     <Github className="w-5 h-5 text-white/20 group-hover:text-cyan-400 transition-colors" />
                     Source_Commit_Access
                   </a>
                </div>
              </div>

              {/* Right Column: Visual & Description */}
              <div className="lg:col-span-8 p-8 md:p-12 flex flex-col justify-center relative overflow-hidden">
                {/* Background Decor */}
                <div className="absolute top-0 right-0 -mr-20 -mt-20 opacity-[0.03] pointer-events-none rotate-12">
                   <div className="text-[12rem] font-black tracking-tighter uppercase leading-none">
                     {activeProject + 1}
                   </div>
                </div>

                <div className="max-w-3xl relative z-10">
                   <div className="flex items-center gap-4 mb-8">
                      <div className="h-px w-12 bg-white/10" />
                      <span className="text-[9px] uppercase tracking-[0.4em] text-white/20 font-bold">Functional_Specs</span>
                   </div>
                   <p className="text-xl md:text-3xl text-white/70 font-light leading-relaxed tracking-tight mb-12">
                     {projects[activeProject].description}
                   </p>

                   <div className="grid grid-cols-2 md:grid-cols-4 gap-8 opacity-40 group-hover:opacity-100 transition-opacity duration-1000">
                      <div className="flex flex-col gap-1">
                        <span className="text-[7px] uppercase tracking-[0.3em] text-white/30 font-bold">Type</span>
                        <span className="text-[9px] uppercase tracking-widest text-white/60">System_Module</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-[7px] uppercase tracking-[0.3em] text-white/30 font-bold">Environment</span>
                        <span className="text-[9px] uppercase tracking-widest text-white/60">Production_Ready</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-[7px] uppercase tracking-[0.3em] text-white/30 font-bold">Latency</span>
                        <span className="text-[9px] uppercase tracking-widest text-white/60">Optimized</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-[7px] uppercase tracking-[0.3em] text-white/30 font-bold">Status</span>
                        <span className="text-[9px] uppercase tracking-widest text-cyan-400 font-black">Deployed</span>
                      </div>
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
