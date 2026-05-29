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

            {/* RIGHT: Engineering Architecture & Pipeline (50%) */}
            <div className="hidden lg:flex flex-col gap-12 w-full">
               {/* 1. System Pipeline Visualization */}
               <div className="bg-white/[0.02] border border-white/10 p-10 flex flex-col gap-10 relative overflow-hidden">
                  <span className="text-[10px] uppercase tracking-[0.5em] text-white/30 font-black">System_Flow_Architecture</span>
                  
                  <div className="flex items-center justify-between relative">
                     {/* Horizontal Flow Line */}
                     <div className="absolute top-1/2 left-0 w-full h-px bg-white/5 -z-10" />
                     
                     {activeProject === 0 && ( // Autonomous Vehicle
                        <>
                           {[
                              { label: 'Dataset', sub: '8k+ Images' },
                              { label: 'CNN Model', sub: 'PyTorch' },
                              { label: 'Inference', sub: '<50ms Latency' },
                              { label: 'Simulator', sub: 'CARLA' },
                              { label: 'Steering', sub: 'Output' }
                           ].map((step, i) => (
                              <div key={i} className="flex flex-col items-center gap-3">
                                 <div className="w-3 h-3 rounded-full bg-cyan-500 shadow-[0_0_10px_#06b6d4]" />
                                 <div className="text-center">
                                    <div className="text-[10px] text-white font-black uppercase tracking-widest">{step.label}</div>
                                    <div className="text-[8px] text-white/30 font-bold uppercase tracking-widest">{step.sub}</div>
                                 </div>
                              </div>
                           ))}
                        </>
                     )}

                     {activeProject === 1 && ( // InstaResume
                        <>
                           {[
                              { label: 'User Input', sub: 'React Form' },
                              { label: 'Gemini AI', sub: 'LLM Processing' },
                              { label: 'Generation', sub: 'ATS Optimized' },
                              { label: 'PDF Export', sub: 'Client Side' }
                           ].map((step, i) => (
                              <div key={i} className="flex flex-col items-center gap-3">
                                 <div className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_10px_#3b82f6]" />
                                 <div className="text-center">
                                    <div className="text-[10px] text-white font-black uppercase tracking-widest">{step.label}</div>
                                    <div className="text-[8px] text-white/30 font-bold uppercase tracking-widest">{step.sub}</div>
                                 </div>
                              </div>
                           ))}
                        </>
                     )}

                     {activeProject === 2 && ( // BlogSpace
                        <>
                           {[
                              { label: 'Frontend', sub: 'React.js' },
                              { label: 'API Layer', sub: 'Node/Express' },
                              { label: 'Auth', sub: 'JWT/Security' },
                              { label: 'Database', sub: 'PostgreSQL' },
                              { label: 'Deploy', sub: 'Render' }
                           ].map((step, i) => (
                              <div key={i} className="flex flex-col items-center gap-3">
                                 <div className="w-3 h-3 rounded-full bg-purple-500 shadow-[0_0_10px_#a855f7]" />
                                 <div className="text-center">
                                    <div className="text-[10px] text-white font-black uppercase tracking-widest">{step.label}</div>
                                    <div className="text-[8px] text-white/30 font-bold uppercase tracking-widest">{step.sub}</div>
                                 </div>
                              </div>
                           ))}
                        </>
                     )}
                  </div>
               </div>

               {/* 2. Technical Specification Blocks */}
               <div className="grid grid-cols-2 gap-8">
                  {activeProject === 0 && ( // Autonomous Vehicle Metrics
                     <>
                        <div className="bg-white/[0.02] border border-white/5 p-8 flex flex-col gap-4">
                           <span className="text-[8px] uppercase tracking-[0.4em] text-white/20 font-black">Performance_Threshold</span>
                           <span className="text-3xl font-black text-white tracking-tighter">&lt;50MS <span className="text-cyan-500/50 text-sm">INFERENCE</span></span>
                        </div>
                        <div className="bg-white/[0.02] border border-white/5 p-8 flex flex-col gap-4">
                           <span className="text-[8px] uppercase tracking-[0.4em] text-white/20 font-black">Training_Volume</span>
                           <span className="text-3xl font-black text-white tracking-tighter">8,000+ <span className="text-cyan-500/50 text-sm">SAMPLES</span></span>
                        </div>
                        <div className="bg-white/[0.02] border border-white/5 p-8 flex flex-col gap-4">
                           <span className="text-[8px] uppercase tracking-[0.4em] text-white/20 font-black">Environment</span>
                           <span className="text-xl font-black text-white/80 uppercase tracking-widest">CARLA_SIMULATOR</span>
                        </div>
                        <div className="bg-white/[0.02] border border-white/5 p-8 flex flex-col gap-4">
                           <span className="text-[8px] uppercase tracking-[0.4em] text-white/20 font-black">Methodology</span>
                           <span className="text-xl font-black text-white/80 uppercase tracking-widest">BEHAVIORAL_CLONING</span>
                        </div>
                     </>
                  )}

                  {activeProject === 1 && ( // InstaResume Features
                     <>
                        <div className="bg-white/[0.02] border border-white/5 p-8 flex flex-col gap-4">
                           <span className="text-[8px] uppercase tracking-[0.4em] text-white/20 font-black">Intelligence_Core</span>
                           <span className="text-xl font-black text-white/80 uppercase tracking-widest text-blue-400">GEMINI_PRO_API</span>
                        </div>
                        <div className="bg-white/[0.02] border border-white/5 p-8 flex flex-col gap-4">
                           <span className="text-[8px] uppercase tracking-[0.4em] text-white/20 font-black">State_Management</span>
                           <span className="text-xl font-black text-white/80 uppercase tracking-widest">REAL-TIME_SYNC</span>
                        </div>
                        <div className="bg-white/[0.02] border border-white/5 p-8 flex flex-col gap-4">
                           <span className="text-[8px] uppercase tracking-[0.4em] text-white/20 font-black">Optimization</span>
                           <span className="text-xl font-black text-white/80 uppercase tracking-widest">ATS_ENGINE_PASS</span>
                        </div>
                        <div className="bg-white/[0.02] border border-white/5 p-8 flex flex-col gap-4">
                           <span className="text-[8px] uppercase tracking-[0.4em] text-white/20 font-black">Output_Format</span>
                           <span className="text-xl font-black text-white/80 uppercase tracking-widest">CLIENT_SIDE_PDF</span>
                        </div>
                     </>
                  )}

                  {activeProject === 2 && ( // BlogSpace Stack
                     <>
                        <div className="bg-white/[0.02] border border-white/5 p-8 flex flex-col gap-4">
                           <span className="text-[8px] uppercase tracking-[0.4em] text-white/20 font-black">Persistence_Layer</span>
                           <span className="text-xl font-black text-white/80 uppercase tracking-widest text-purple-400">POSTGRESQL_RELATIONAL</span>
                        </div>
                        <div className="bg-white/[0.02] border border-white/5 p-8 flex flex-col gap-4">
                           <span className="text-[8px] uppercase tracking-[0.4em] text-white/20 font-black">Security_Protocol</span>
                           <span className="text-xl font-black text-white/80 uppercase tracking-widest">JWT_AUTHENTICATION</span>
                        </div>
                        <div className="bg-white/[0.02] border border-white/5 p-8 flex flex-col gap-4">
                           <span className="text-[8px] uppercase tracking-[0.4em] text-white/20 font-black">Architecture</span>
                           <span className="text-xl font-black text-white/80 uppercase tracking-widest">MVC_PATTERN_REST</span>
                        </div>
                        <div className="bg-white/[0.02] border border-white/5 p-8 flex flex-col gap-4">
                           <span className="text-[8px] uppercase tracking-[0.4em] text-white/20 font-black">Infrastructure</span>
                           <span className="text-xl font-black text-white/80 uppercase tracking-widest">RENDER_MANAGED_OPS</span>
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
