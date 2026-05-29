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
    const sceneStart = 0.19;
    const sceneEnd = 0.48;
    const totalProjects = projects.length;
    const projectStep = (sceneEnd - sceneStart) / totalProjects;
    
    let found: number | null = null;

    if (activeScene === 1) {
      projects.forEach((_, i) => {
        const pStart = sceneStart + i * projectStep;
        const pEnd = sceneStart + (i + 1) * projectStep;
        if (scrollProgress >= pStart - 0.01 && scrollProgress <= pEnd + 0.01) {
          found = i;
        }
      });
      if (found === null && scrollProgress < sceneStart + 0.05) found = 0;
      if (found === null && scrollProgress > sceneEnd - 0.05) found = projects.length - 1;
    }
    
    if (found !== activeProject) {
      const direction = (found ?? 0) > (activeProject ?? 0) ? 1 : -1;
      
      // Exit Animation for current project
      if (hudRef.current && activeProject !== null) {
        gsap.to(hudRef.current, {
          y: -20 * direction,
          opacity: 0,
          filter: "blur(10px)",
          duration: 0.4,
          ease: "power2.in",
          onComplete: () => {
             setActiveProject(found);
             // Enter Animation for next project
             if (found !== null) {
                gsap.fromTo(hudRef.current, 
                   { y: 30 * direction, opacity: 0, filter: "blur(12px)" }, 
                   { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.7, ease: "power3.out" }
                );
             }
          }
        });
      } else {
        setActiveProject(found);
        if (found !== null) {
          gsap.fromTo(hudRef.current, 
            { y: 30, opacity: 0, filter: "blur(12px)" }, 
            { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.8, ease: "power4.out" }
          );
        }
      }
    }
  }, [scrollProgress, activeProject, activeScene]);

  // Use visibility instead of null return to prevent component destruction during scene boundaries
  return (
    <div className={`fixed inset-0 pointer-events-none z-20 flex items-center md:pl-64 pr-6 md:pr-24 transition-opacity duration-1000 ${activeScene === 1 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div 
        ref={hudRef}
        className="w-full max-w-7xl opacity-0 pointer-events-auto"
      >
        {activeProject !== null && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            {/* LEFT: Project Blueprint (50%) */}
            <div className="flex flex-col gap-16 justify-center">
              <div className="flex flex-col gap-8">
                <div className="flex items-center gap-4">
                   <div className="flex items-center gap-4">
                      <div className="w-2.5 h-2.5 rounded-full bg-cyan-500 shadow-[0_0_10px_#06b6d4]" />
                      <span className="text-[12px] uppercase tracking-[0.6em] text-white/40 font-black">
                        Blueprint_0{activeProject + 1}
                      </span>
                   </div>
                   <div className="h-px w-16 bg-white/10" />
                   <span className="text-[10px] uppercase tracking-[0.4em] text-white/20 font-bold whitespace-nowrap">
                     {projects[activeProject].timeline}
                   </span>
                </div>
                <h3 className="text-5xl md:text-8xl font-black tracking-tighter uppercase text-white leading-none">
                  {projects[activeProject].title}
                </h3>
              </div>

              <div className="space-y-12">
                 <p className="text-xl text-white/50 font-light leading-relaxed max-w-xl">
                   {projects[activeProject].description}
                 </p>

                 <div className="flex flex-col gap-10 border-t border-white/5 pt-12">
                    <div className="flex flex-wrap gap-4">
                       {projects[activeProject].tags.map((tag: string) => (
                         <span key={tag} className="text-[10px] uppercase tracking-[0.2em] px-4 py-2 bg-white/[0.03] text-white/40 border border-white/10 font-bold">
                           {tag}
                         </span>
                       ))}
                    </div>
                    
                    <div className="flex items-center gap-10">
                       <a 
                          href={projects[activeProject].link} 
                          target="_blank"
                          className="group inline-flex items-center gap-6 text-[12px] uppercase tracking-[0.6em] font-black text-white/40 hover:text-cyan-400 transition-all underline underline-offset-[16px] decoration-white/10"
                       >
                          <Github className="w-6 h-6 text-white/20 group-hover:text-cyan-400 transition-colors" />
                          Codebase_Protocol_v3
                       </a>
                    </div>
                 </div>
              </div>
            </div>

            {/* RIGHT: System Architecture (50%) */}
            <div className="hidden lg:flex flex-col gap-12">
               <div className="flex items-center gap-4 mb-4">
                  <span className="text-[10px] uppercase tracking-[0.6em] text-white/20 font-black">Architecture_Logic</span>
                  <div className="h-px flex-1 bg-white/5" />
               </div>

               {/* Pipeline Visualization Area */}
               <div className="bg-white/[0.02] border border-white/5 p-16 flex flex-col gap-12 relative overflow-hidden shadow-2xl">
                  <div className="flex items-center justify-between relative">
                     <div className="absolute top-1/2 left-0 w-full h-px bg-cyan-500/10 -z-10" />
                     
                     {(activeProject === 0 ? [
                        { label: 'Dataset', sub: '8k+ Samples' },
                        { label: 'CNN', sub: 'PyTorch' },
                        { label: 'Latency', sub: '<50ms' },
                        { label: 'CARLA', sub: 'Sim' }
                     ] : activeProject === 1 ? [
                        { label: 'Input', sub: 'React' },
                        { label: 'Gemini', sub: 'AI Core' },
                        { label: 'ATS', sub: 'Optimize' },
                        { label: 'PDF', sub: 'Export' }
                     ] : [
                        { label: 'UI', sub: 'React' },
                        { label: 'API', sub: 'Node' },
                        { label: 'Auth', sub: 'JWT' },
                        { label: 'DB', sub: 'PG' }
                     ]).map((step, i) => (
                        <div key={i} className="flex flex-col items-center gap-6">
                           <div className="w-3 h-3 rounded-full bg-cyan-500 shadow-[0_0_20px_#06b6d4]" />
                           <div className="text-center">
                              <div className="text-[11px] text-white/80 font-black uppercase tracking-widest">{step.label}</div>
                              <div className="text-[9px] text-white/20 font-bold uppercase tracking-widest mt-1">{step.sub}</div>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>

               {/* Metric Grid */}
               <div className="grid grid-cols-2 gap-px bg-white/10 border border-white/10 shadow-2xl">
                  {activeProject === 0 && (
                     <>
                        <div className="bg-black/90 p-10 flex flex-col gap-5 group/metric">
                           <span className="text-[9px] uppercase tracking-[0.4em] text-white/20 font-black">Performance</span>
                           <span className="text-4xl font-black text-white tracking-tighter group-hover/metric:text-cyan-400 transition-colors">&lt;50MS</span>
                        </div>
                        <div className="bg-black/90 p-10 flex flex-col gap-5 group/metric">
                           <span className="text-[9px] uppercase tracking-[0.4em] text-white/20 font-black">Training</span>
                           <span className="text-4xl font-black text-white tracking-tighter group-hover/metric:text-cyan-400 transition-colors">8K+</span>
                        </div>
                     </>
                  )}
                  {activeProject === 1 && (
                     <>
                        <div className="bg-black/90 p-10 flex flex-col gap-5 group/metric">
                           <span className="text-[9px] uppercase tracking-[0.4em] text-white/20 font-black">Intelligence</span>
                           <span className="text-3xl font-black text-white tracking-tighter group-hover/metric:text-blue-400 transition-colors">GEMINI_PRO</span>
                        </div>
                        <div className="bg-black/90 p-10 flex flex-col gap-5 group/metric">
                           <span className="text-[9px] uppercase tracking-[0.4em] text-white/20 font-black">Status</span>
                           <span className="text-3xl font-black text-white tracking-tighter group-hover/metric:text-blue-400 transition-colors">ATS_SYNC</span>
                        </div>
                     </>
                  )}
                  {activeProject === 2 && (
                     <>
                        <div className="bg-black/90 p-10 flex flex-col gap-5 group/metric">
                           <span className="text-[9px] uppercase tracking-[0.4em] text-white/20 font-black">Database</span>
                           <span className="text-3xl font-black text-white tracking-tighter group-hover/metric:text-purple-400 transition-colors">POSTGRES</span>
                        </div>
                        <div className="bg-black/90 p-10 flex flex-col gap-5 group/metric">
                           <span className="text-[9px] uppercase tracking-[0.4em] text-white/20 font-black">Pattern</span>
                           <span className="text-3xl font-black text-white tracking-tighter group-hover/metric:text-purple-400 transition-colors">MVC_REST</span>
                        </div>
                     </>
                  )}
               </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
