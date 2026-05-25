"use client";

import { useRef, useState, useEffect } from "react";
import projects from "@/lib/data/projects.json";
import { useStore } from "@/lib/store";
import gsap from "gsap";
import { ExternalLink, Github, ChevronRight } from "lucide-react";

export default function Projects() {
  const scrollProgress = useStore((state) => state.scrollProgress);
  const activeScene = useStore((state) => state.activeScene);
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const hudRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sceneStart = 0.25;
    const sceneEnd = 0.6;
    const projectStep = (sceneEnd - sceneStart) / 3;
    
    let found = null;
    projects.forEach((_, i) => {
      const pFocus = sceneStart + i * projectStep;
      if (Math.abs(scrollProgress - pFocus) < 0.1) {
        found = i;
      }
    });
    
    if (found !== activeProject) {
      setActiveProject(found);
      if (found !== null) {
        gsap.fromTo(hudRef.current, 
          { x: 100, opacity: 0, filter: "blur(10px)" }, 
          { x: 0, opacity: 1, filter: "blur(0px)", duration: 1.2, ease: "power4.out" }
        );
      } else {
        gsap.to(hudRef.current, { x: -50, opacity: 0, filter: "blur(5px)", duration: 0.8 });
      }
    }
  }, [scrollProgress, activeProject]);

  if (activeScene !== 1 && activeProject === null) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-20 flex items-center justify-end px-6 md:px-32">
      <div 
        ref={hudRef}
        className="max-w-xl w-full opacity-0 pointer-events-auto"
      >
        {activeProject !== null && (
          <div className="space-y-12">
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-[10px] uppercase tracking-[0.5em] text-white/40 font-bold">
                <span className="w-12 h-px bg-white/20" />
                Artifact Access // 0{activeProject + 1}
              </div>
              <h3 className="text-5xl md:text-8xl font-black uppercase leading-[0.85] tracking-tighter">
                {projects[activeProject].title.split(' ').map((word, i) => (
                   <span key={i} className={i % 2 === 0 ? "text-white" : "text-white/20 block"}>{word} </span>
                ))}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-y border-white/10 py-10">
               <div className="col-span-2">
                  <p className="text-xl text-gray-400 font-light leading-relaxed">
                    {projects[activeProject].description}
                  </p>
               </div>
               <div className="space-y-6">
                  <div className="space-y-2">
                     <span className="text-[8px] uppercase tracking-[0.4em] text-white/20 font-bold">Timeline</span>
                     <p className="text-xs uppercase tracking-widest text-white/60">{projects[activeProject].timeline}</p>
                  </div>
                  <div className="space-y-2">
                     <span className="text-[8px] uppercase tracking-[0.4em] text-white/20 font-bold">Core Stack</span>
                     <div className="flex flex-wrap gap-2">
                        {projects[activeProject].tags.slice(0, 3).map((tag: string) => (
                          <span key={tag} className="text-[9px] uppercase tracking-widest text-white/80">{tag}</span>
                        ))}
                     </div>
                  </div>
               </div>
            </div>

            <div className="flex gap-12 pt-4">
              <a 
                href={projects[activeProject].link} 
                target="_blank" 
                className="group flex items-center gap-4 text-[10px] uppercase tracking-[0.4em] font-black hover:text-cyan-400 transition-colors"
              >
                <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:border-cyan-400/50 transition-colors">
                   <Github className="w-3 h-3" />
                </div>
                Decentralized Source
              </a>
              <button className="group flex items-center gap-4 text-[10px] uppercase tracking-[0.4em] font-black text-white/30 cursor-not-allowed">
                 <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center">
                    <ExternalLink className="w-3 h-3" />
                 </div>
                 Live Projection
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Dynamic Vertical Scroll Tracker */}
      <div className="absolute left-12 top-1/2 -translate-y-1/2 flex flex-col items-center gap-6 opacity-20">
         <span className="text-[8px] uppercase tracking-[0.6em] vertical-text">Journey_Depth</span>
         <div className="w-px h-32 bg-white relative">
            <div 
              className="absolute top-0 left-0 w-full bg-cyan-400 transition-all duration-300"
              style={{ height: `${scrollProgress * 100}%` }}
            />
         </div>
      </div>
    </div>
  );
}
