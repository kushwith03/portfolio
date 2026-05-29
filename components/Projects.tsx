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
    // Recalibrated project windows for absolute visibility (0.19 to 0.45)
    const sceneStart = 0.19;
    const sceneEnd = 0.45;
    const totalProjects = projects.length;
    const projectStep = (sceneEnd - sceneStart) / totalProjects;
    
    let found = null;
    projects.forEach((_, i) => {
      const pStart = sceneStart + i * projectStep;
      const pEnd = sceneStart + (i + 1) * projectStep;
      
      // Wider buffer for better reachability
      if (scrollProgress >= pStart - 0.02 && scrollProgress <= pEnd + 0.02) {
        found = i;
      }
    });
    
    if (found !== activeProject) {
      setActiveProject(found);
      if (found !== null) {
        gsap.fromTo(hudRef.current, 
          { y: 10, opacity: 0, filter: "blur(8px)" }, 
          { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.5, ease: "power2.out" }
        );
      }
    }
  }, [scrollProgress, activeProject]);

  if (activeScene !== 1) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-20 flex items-center px-6 md:pl-56 md:pr-24">
      <div 
        ref={hudRef}
        className="w-full max-w-7xl opacity-0 pointer-events-auto"
      >
        {activeProject !== null && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            {/* LEFT: Project Blueprint (50%) */}
            <div className="flex flex-col gap-10 pt-4">
              <div className="flex flex-col gap-5">
                <div className="flex items-center gap-4">
                   <div className="flex items-center gap-2.5">
                      <Cpu className="w-5 h-5 text-cyan-400" />
                      <span className="text-[11px] uppercase tracking-[0.6em] text-white/50 font-black">
                        Blueprint_0{activeProject + 1}
                      </span>
                   </div>
                   <div className="h-px w-10 bg-white/10" />
                   <span className="text-[9px] uppercase tracking-[0.3em] text-white/30 font-bold">
                     {projects[activeProject].timeline}
                   </span>
                </div>
                <h3 className="text-4xl md:text-6xl font-black tracking-tighter uppercase text-white leading-[0.9] max-w-xl">
                  {projects[activeProject].title}
                </h3>
              </div>

              <div className="space-y-12">
                 <p className="text-lg text-white/60 font-light leading-relaxed max-w-lg">
                   {projects[activeProject].description}
                 </p>

                 <div className="flex flex-col gap-8 border-t border-white/5 pt-10">
                    <div className="flex flex-wrap gap-3">
                       {projects[activeProject].tags.map((tag: string) => (
                         <span key={tag} className="text-[9px] uppercase tracking-[0.2em] px-3 py-1.5 bg-white/[0.03] text-white/50 border border-white/10 font-bold hover:text-cyan-400 hover:border-cyan-500/30 transition-colors cursor-default">
                           {tag}
                         </span>
                       ))}
                    </div>
                    
                    <div className="flex items-center gap-10">
                       <a 
                          href={projects[activeProject].link} 
                          target="_blank"
                          className="group inline-flex items-center gap-4 text-[11px] uppercase tracking-[0.6em] font-black text-white/40 hover:text-white transition-all underline underline-offset-[12px] decoration-white/10"
                       >
                          <Github className="w-5 h-5 text-white/20 group-hover:text-cyan-400 transition-colors" />
                          Repository_Access
                       </a>
                    </div>
                 </div>
              </div>
            </div>

            {/* RIGHT: System Architecture & Context (50%) */}
            <div className="hidden lg:flex flex-col gap-6">
               <div className="flex items-center gap-4 mb-4">
                  <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse shadow-[0_0_10px_#06b6d4]" />
                  <span className="text-[10px] uppercase tracking-[0.4em] text-white/30 font-bold">System_Architecture_V.2.0</span>
               </div>
               
               <div className="grid grid-cols-1 gap-px bg-white/5 border border-white/10 shadow-2xl">
                  {/* High-Fidelity Technical Stats */}
                  <div className="bg-black/60 p-10 flex flex-col gap-8">
                     <div className="flex flex-col gap-6">
                        <span className="text-[9px] uppercase tracking-[0.5em] text-white/20 font-black">Performance_Metrics</span>
                        <div className="grid grid-cols-2 gap-10">
                           {(projects[activeProject] as any).highlights?.map((h: string, i: number) => {
                              const [label, value] = h.includes(':') ? h.split(':') : [h, 'ACTIVE'];
                              return (
                                <div key={i} className="flex flex-col gap-2 group/metric">
                                   <span className="text-[8px] uppercase tracking-[0.3em] text-white/40 group-hover/metric:text-cyan-400 transition-colors">{label.trim()}</span>
                                   <span className="text-2xl font-black uppercase text-white/80">{value.trim()}</span>
                                   <div className="w-full h-px bg-white/5" />
                                </div>
                              );
                           })}
                        </div>
                     </div>

                     <div className="flex flex-col gap-4 pt-4 border-t border-white/5">
                        <span className="text-[9px] uppercase tracking-[0.5em] text-white/20 font-black">Production_Workflow</span>
                        <div className="flex flex-col gap-3">
                           <div className="flex items-center gap-4 text-[10px] uppercase tracking-[0.2em] text-white/40 font-medium">
                              <div className="w-1.5 h-1.5 rounded-full border border-cyan-500/50" />
                              CI/CD Pipelines: <span className="text-white/70 ml-auto">Verified</span>
                           </div>
                           <div className="flex items-center gap-4 text-[10px] uppercase tracking-[0.2em] text-white/40 font-medium">
                              <div className="w-1.5 h-1.5 rounded-full border border-cyan-500/50" />
                              Scalability Class: <span className="text-white/70 ml-auto">Modular</span>
                           </div>
                           <div className="flex items-center gap-4 text-[10px] uppercase tracking-[0.2em] text-white/40 font-medium">
                              <div className="w-1.5 h-1.5 rounded-full border border-cyan-500/50" />
                              Data Integrity: <span className="text-white/70 ml-auto">100%</span>
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* Architecture Diagram Placeholder / Mock-UI */}
                  <div className="bg-white/[0.02] p-8 border-t border-white/5 flex items-center justify-center relative overflow-hidden h-[120px]">
                     <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
                        <div className="text-[10rem] font-black tracking-tighter uppercase leading-none italic">
                          {projects[activeProject].title.split(' ')[0]}
                        </div>
                     </div>
                     <div className="relative z-10 flex gap-12 items-center">
                        <div className="flex flex-col items-center gap-2">
                           <div className="w-12 h-px bg-cyan-500/20" />
                           <span className="text-[7px] uppercase tracking-widest text-white/20 font-black">Input_Node</span>
                        </div>
                        <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center">
                           <div className="w-2 h-2 bg-cyan-500/40 rounded-full" />
                        </div>
                        <div className="flex flex-col items-center gap-2">
                           <div className="w-12 h-px bg-cyan-500/20" />
                           <span className="text-[7px] uppercase tracking-widest text-white/20 font-black">Output_Node</span>
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
