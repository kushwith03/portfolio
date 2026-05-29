"use client";

import { useStore } from "@/lib/store";
import { useRef, useEffect } from "react";
import gsap from "gsap";

const DOMAINS = [
  {
    name: "Full-Stack Core",
    tech: ["React.js", "Node.js", "Express", "PostgreSQL", "TailwindCSS"]
  },
  {
    name: "Infrastructure & Ops",
    tech: ["AWS S3", "CloudFront", "Cloudflare", "GitHub Actions", "Vercel"]
  },
  {
    name: "AI & Autonomous",
    tech: ["Python", "PyTorch", "CARLA Simulator", "Gemini AI", "Computer Vision"]
  },
  {
    name: "Systems & Desktop",
    tech: ["Java", "C++", "SQL", "Linux CLI", "Electron.js"]
  }
];

export default function Architecture() {
  const activeScene = useStore((state) => state.activeScene);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeScene === 3) {
      gsap.to(containerRef.current, { 
        opacity: 1, 
        y: 0, 
        filter: "blur(0px)", 
        duration: 0.8, 
        ease: "power3.out" 
      });
    } else {
      gsap.to(containerRef.current, { 
        opacity: 0, 
        y: 30, 
        filter: "blur(12px)", 
        duration: 0.4 
      });
    }
  }, [activeScene]);

  return (
    <section className={`fixed inset-0 pointer-events-none z-10 flex items-center justify-center px-6 md:px-24 transition-opacity duration-700 ${activeScene === 3 ? 'opacity-100' : 'opacity-0'}`}>
      <div 
        ref={containerRef} 
        className="max-w-6xl w-full flex flex-col gap-10 opacity-0 translate-y-10 filter blur-md"
      >
        <div className="flex flex-col gap-3 items-center text-center">
          <div className="flex items-center gap-4">
            <span className="text-[clamp(8px,0.7vw,10px)] uppercase tracking-[0.8em] text-cyan-400 font-black">Ecosystem_Map</span>
          </div>
          <h2 className="text-[clamp(2.5rem,6vw,4rem)] font-black uppercase leading-none tracking-tighter text-white">
            Architecture.
          </h2>
          <p className="text-white/20 text-[clamp(7px,0.6vw,9px)] uppercase tracking-[0.4em] font-bold">
            // Production-ready stack optimized for scalability.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-white/5 border border-white/5 max-h-[60vh] overflow-hidden">
          {DOMAINS.map((domain, i) => (
            <div key={i} className="bg-black/60 p-8 flex flex-col gap-6 group pointer-events-auto cursor-default hover:bg-white/[0.02] transition-colors duration-500">
              <div className="flex flex-col gap-1">
                 <span className="text-[7px] font-black text-white/20 uppercase tracking-[0.4em]">Node_0{i+1}</span>
                 <h4 className="text-[10px] uppercase tracking-[0.2em] font-black text-cyan-400/80 group-hover:text-cyan-400 transition-colors">{domain.name}</h4>
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-2">
                {domain.tech.map((t) => (
                  <span key={t} className="text-[9px] font-bold text-white/20 group-hover:text-white/60 transition-colors duration-500 whitespace-nowrap">
                    {t.toUpperCase()}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
