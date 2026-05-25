"use client";

import { useRef, useState, useEffect } from "react";
import projects from "@/lib/data/projects.json";
import { useStore } from "@/lib/store";
import gsap from "gsap";
import { ExternalLink, Github } from "lucide-react";

export default function Projects() {
  const scrollProgress = useStore((state) => state.scrollProgress);
  const activeScene = useStore((state) => state.activeScene);
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const hudRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Determine which project is in focus based on scroll
    const sceneStart = 0.25;
    const sceneEnd = 0.6;
    const projectStep = (sceneEnd - sceneStart) / 3;
    
    let found = null;
    projects.forEach((_, i) => {
      const pFocus = sceneStart + i * projectStep;
      if (Math.abs(scrollProgress - pFocus) < 0.08) {
        found = i;
      }
    });
    
    if (found !== activeProject) {
      setActiveProject(found);
      
      // Animate HUD reveal
      if (found !== null) {
        gsap.fromTo(hudRef.current, 
          { x: 50, opacity: 0 }, 
          { x: 0, opacity: 1, duration: 0.8, ease: "power4.out" }
        );
      } else {
        gsap.to(hudRef.current, { opacity: 0, duration: 0.5 });
      }
    }
  }, [scrollProgress, activeProject]);

  if (activeScene !== 1 && activeProject === null) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-20 flex items-center justify-end px-6 md:px-24">
      <div 
        ref={hudRef}
        className="max-w-md w-full opacity-0 pointer-events-auto"
      >
        {activeProject !== null && (
          <div className="space-y-8">
            <div className="space-y-2">
              <span className="text-[10px] uppercase tracking-[0.4em] text-cyan-400 font-bold">
                Project Archive // 0{activeProject + 1}
              </span>
              <h3 className="text-4xl md:text-6xl font-black uppercase leading-tight tracking-tighter">
                {projects[activeProject].title}
              </h3>
            </div>

            <p className="text-lg text-gray-400 font-light leading-relaxed">
              {projects[activeProject].description}
            </p>

            <div className="flex flex-wrap gap-4">
              {projects[activeProject].tags.map((tag: string) => (
                <span key={tag} className="px-3 py-1 text-[10px] uppercase tracking-widest bg-white/5 border border-white/10 text-gray-400">
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex gap-8 pt-4">
              <a 
                href={projects[activeProject].link} 
                target="_blank" 
                className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-black hover:text-cyan-400 transition-colors"
              >
                <Github className="w-4 h-4" /> Source Code
              </a>
              {/* If there's a live link, we could add it here */}
            </div>
          </div>
        )}
      </div>
      
      {/* Background Section Title (Persistent during Archive) */}
      <div className="absolute top-24 right-12 text-[10px] uppercase tracking-[0.6em] text-white/10 font-black rotate-90 origin-right">
        Archive_Relics // Spatial_Exhibition
      </div>
    </div>
  );
}
