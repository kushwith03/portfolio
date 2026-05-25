"use client";

import { useRef, useState, useEffect } from "react";
import projects from "@/lib/data/projects.json";
import { useStore } from "@/lib/store";
import gsap from "gsap";
import { Github, MoveRight, ExternalLink } from "lucide-react";

/**
 * Projects HUD: Immersive Narrative Interface
 * Redesigned for asymmetric elegance and professional hierarchy.
 */
export default function Projects() {
  const scrollProgress = useStore((state) => state.scrollProgress);
  const activeScene = useStore((state) => state.activeScene);
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const hudRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Project activation thresholds in Archive scene
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
          { x: 40, opacity: 0, filter: "blur(10px)" }, 
          { x: 0, opacity: 1, filter: "blur(0px)", duration: 1.2, ease: "power4.out" }
        );
      } else {
        gsap.to(hudRef.current, { x: -20, opacity: 0, filter: "blur(5px)", duration: 0.8 });
      }
    }
  }, [scrollProgress, activeProject]);

  if (activeScene !== 1 && activeProject === null) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-20 flex items-center justify-end px-12 md:px-40">
      <div 
        ref={hudRef}
        className="max-w-2xl w-full opacity-0 pointer-events-auto"
      >
        {activeProject !== null && (
          <div className="flex flex-col gap-12">
            {/* 1. Technical Metadata Header */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-6">
                <span className="text-[10px] uppercase tracking-[0.6em] text-white/20 font-black">
                  Entry_0{activeProject + 1}
                </span>
                <div className="h-px w-20 bg-white/10" />
                <span className="text-[9px] uppercase tracking-[0.4em] text-cyan-500/60 font-bold">
                  Technical_Artifact
                </span>
              </div>
              
              <h3 className="text-4xl md:text-7xl font-light tracking-tighter leading-none">
                {projects[activeProject].title.split(' ').map((word, i) => (
                   <span key={i} className={i % 2 === 0 ? "text-white" : "text-white/10 italic font-serif block ml-8"}>
                     {word}{' '}
                   </span>
                ))}
              </h3>
            </div>

            {/* 2. Narrative Grid */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-12 border-l border-white/5 pl-12 py-4">
              <div className="col-span-3 space-y-6">
                <p className="text-lg text-white/50 font-light leading-relaxed">
                  {projects[activeProject].description}
                </p>
                
                <div className="flex flex-wrap gap-x-8 gap-y-3">
                  {projects[activeProject].tags.map((tag: string) => (
                    <span key={tag} className="text-[10px] uppercase tracking-[0.3em] text-white/30 hover:text-white/80 transition-colors cursor-default">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="col-span-2 flex flex-col justify-between py-1">
                <div className="space-y-8">
                  <div className="space-y-1">
                    <span className="text-[8px] uppercase tracking-[0.5em] text-white/10 font-bold block">Temporal_Range</span>
                    <p className="text-[11px] text-white/40 tracking-widest">{projects[activeProject].timeline}</p>
                  </div>
                  <div className="space-y-3">
                    <span className="text-[8px] uppercase tracking-[0.5em] text-white/10 font-bold block">Access_Protocol</span>
                    <a 
                      href={projects[activeProject].link} 
                      target="_blank"
                      className="group flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] font-black text-white/70 hover:text-cyan-400 transition-all"
                    >
                      <Github className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform" />
                      View_Source
                    </a>
                  </div>
                </div>

                <div className="pt-8 opacity-20">
                   <div className="flex items-center gap-4">
                      <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      <span className="text-[8px] uppercase tracking-[1em]">Synchronized</span>
                   </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Persistent Scene Identity */}
      <div className="absolute top-1/2 right-12 -translate-y-1/2 flex flex-col items-center gap-12 opacity-5">
         <span className="text-[9px] uppercase tracking-[1.5em] vertical-text">ARCHIVE_SYSTEM</span>
         <div className="w-px h-64 bg-gradient-to-b from-transparent via-white to-transparent" />
      </div>
    </div>
  );
}
