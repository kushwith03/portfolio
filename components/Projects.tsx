"use client";

import { useRef, useState, useEffect } from "react";
import projects from "@/lib/data/projects.json";
import { useStore } from "@/lib/store";
import gsap from "gsap";
import { Github, Code, Cpu, Database, Network } from "lucide-react";

import { SCENES } from "@/lib/constants";

/**
 * Projects HUD: Re-calibrated for immediate entry.
 */
export default function Projects() {
  const scrollProgress = useStore((state) => state.scrollProgress);
  const activeScene = useStore((state) => state.activeScene);
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const hudRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Synchronized with CinematicController scene 1 (0.20 to 0.49)
    const sceneStart = 0.20;
    const sceneEnd = 0.49;
    const totalProjects = projects.length;
    const projectStep = (sceneEnd - sceneStart) / totalProjects;
    
    let found: number | null = null;

    if (activeScene === SCENES.PROJECTS) {
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
    <div className={`fixed inset-0 pointer-events-none z-20 flex items-center md:pl-64 pr-6 md:pr-24 transition-opacity duration-1000 ${activeScene === SCENES.PROJECTS ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div 
        ref={hudRef}
        className="w-full max-w-7xl opacity-0 pointer-events-auto"
      >
        {activeProject !== null && (
          <div className="grid grid-cols-1 lg:grid-cols-10 gap-20 items-center">
            {/* LEFT: Project Blueprint (45%) */}
            <div className="lg:col-span-4 flex flex-col gap-10 justify-center">
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                   <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-cyan-500 shadow-[0_0_8px_#06b6d4]" />
                      <span className="text-[10px] uppercase tracking-[0.6em] text-white/30 font-black">
                        Blueprint_0{activeProject + 1}
                      </span>
                   </div>
                   <div className="h-px w-10 bg-white/5" />
                   <span className="text-[9px] uppercase tracking-[0.4em] text-white/20 font-bold whitespace-nowrap">
                     {projects[activeProject].timeline}
                   </span>
                </div>
                <h3 className="text-4xl md:text-6xl font-black tracking-tighter uppercase text-white leading-[0.9] max-w-[15ch]">
                  {projects[activeProject].title}
                </h3>
              </div>

              <div className="space-y-8">
                 <p className="text-lg text-white/40 font-light leading-relaxed max-w-[50ch]">
                   {projects[activeProject].description}
                 </p>

                 <div className="flex flex-col gap-8 border-t border-white/5 pt-10">
                    <div className="flex flex-wrap gap-2.5">
                       {projects[activeProject].tags.map((tag: string) => (
                         <span key={tag} className="text-[9px] uppercase tracking-[0.15em] px-3 py-1 bg-white/[0.02] text-white/30 border border-white/5 font-bold">
                           {tag}
                         </span>
                       ))}
                    </div>
                    
                    <a 
                       href={projects[activeProject].link} 
                       target="_blank"
                       className="group inline-flex items-center gap-4 text-[10px] uppercase tracking-[0.5em] font-black text-white/30 hover:text-cyan-400 transition-all underline underline-offset-[10px] decoration-white/10"
                    >
                       <Github className="w-5 h-5 text-white/10 group-hover:text-cyan-400 transition-colors" />
                       Source_Context
                    </a>
                 </div>
              </div>
            </div>

            {/* RIGHT: System Architecture (55%) */}
            <div className="lg:col-span-6 hidden lg:flex flex-col gap-10">
               <div className="flex items-center gap-4 mb-2">
                  <span className="text-[9px] uppercase tracking-[0.5em] text-white/15 font-black">Technical_Logic</span>
                  <div className="h-px flex-1 bg-white/5" />
               </div>

               {/* Pipeline Visualization Area */}
               <div className="bg-white/[0.01] border border-white/5 p-12 flex flex-col gap-10 relative overflow-hidden shadow-2xl">
                  <div className="flex items-center justify-between relative">
                     <div className="absolute top-1/2 left-0 w-full h-px bg-cyan-500/5 -z-10" />
                     
                     {(activeProject === 0 ? [
                        { label: 'Dataset', sub: '8k Samples' },
                        { label: 'CNN', sub: 'PyTorch' },
                        { label: 'Latency', sub: '<50ms' },
                        { label: 'CARLA', sub: 'Simulator' }
                     ] : activeProject === 1 ? [
                        { label: 'Input', sub: 'React Form' },
                        { label: 'Gemini', sub: 'AI Logic' },
                        { label: 'ATS', sub: 'Optimizer' },
                        { label: 'PDF', sub: 'Generation' }
                     ] : [
                        { label: 'Frontend', sub: 'React.js' },
                        { label: 'API Layer', sub: 'Node/Exp' },
                        { label: 'Auth', sub: 'JWT/Sec' },
                        { label: 'Database', sub: 'Postgres' }
                     ]).map((step, i) => (
                        <div key={i} className="flex flex-col items-center gap-4">
                           <div className="w-2.5 h-2.5 rounded-full bg-cyan-500/40 shadow-[0_0_10px_#06b6d4]" />
                           <div className="text-center">
                              <div className="text-[9px] text-white/60 font-black uppercase tracking-widest">{step.label}</div>
                              <div className="text-[7px] text-white/10 font-bold uppercase tracking-widest mt-1">{step.sub}</div>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>

               {/* Metric Grid */}
               <div className="grid grid-cols-2 gap-px bg-white/5 border border-white/5 shadow-2xl">
                  {activeProject === 0 && (
                     <>
                        <div className="bg-black/80 p-8 flex flex-col gap-4 group/metric">
                           <span className="text-[8px] uppercase tracking-[0.4em] text-white/15 font-black">Performance</span>
                           <span className="text-2xl font-black text-white/60 tracking-tighter group-hover/metric:text-cyan-400 transition-colors">&lt;50MS</span>
                        </div>
                        <div className="bg-black/80 p-8 flex flex-col gap-4 group/metric">
                           <span className="text-[8px] uppercase tracking-[0.4em] text-white/15 font-black">Training</span>
                           <span className="text-2xl font-black text-white/60 tracking-tighter group-hover/metric:text-cyan-400 transition-colors">8,000+</span>
                        </div>
                     </>
                  )}
                  {activeProject === 1 && (
                     <>
                        <div className="bg-black/80 p-8 flex flex-col gap-4 group/metric">
                           <span className="text-[8px] uppercase tracking-[0.4em] text-white/15 font-black">Intelligence</span>
                           <span className="text-2xl font-black text-white/60 tracking-tighter group-hover/metric:text-blue-400 transition-colors">GEMINI_PRO</span>
                        </div>
                        <div className="bg-black/80 p-8 flex flex-col gap-4 group/metric">
                           <span className="text-[8px] uppercase tracking-[0.4em] text-white/15 font-black">Optimization</span>
                           <span className="text-2xl font-black text-white/60 tracking-tighter group-hover/metric:text-blue-400 transition-colors">ATS_SYNC</span>
                        </div>
                     </>
                  )}
                  {activeProject === 2 && (
                     <>
                        <div className="bg-black/80 p-8 flex flex-col gap-4 group/metric">
                           <span className="text-[8px] uppercase tracking-[0.4em] text-white/15 font-black">Persistence</span>
                           <span className="text-2xl font-black text-white/60 tracking-tighter group-hover/metric:text-purple-400 transition-colors">POSTGRES</span>
                        </div>
                        <div className="bg-black/80 p-8 flex flex-col gap-4 group/metric">
                           <span className="text-[8px] uppercase tracking-[0.4em] text-white/15 font-black">Design</span>
                           <span className="text-2xl font-black text-white/60 tracking-tighter group-hover/metric:text-purple-400 transition-colors">MVC_REST</span>
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
