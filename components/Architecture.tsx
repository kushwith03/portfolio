"use client";

import { useStore } from "@/lib/store";
import { useRef, useEffect } from "react";
import gsap from "gsap";

const DOMAINS = [
  {
    name: "Full-Stack Core",
    tech: ["React.js", "Node.js", "Express", "PostgreSQL", "Next.js"]
  },
  {
    name: "Infrastructure & DevOps",
    tech: ["AWS S3", "CloudFront", "GitHub Actions", "Docker", "Vercel"]
  },
  {
    name: "AI & Autonomous",
    tech: ["Python", "PyTorch", "CARLA Simulator", "Gemini API", "OpenCV"]
  },
  {
    name: "Systems & Languages",
    tech: ["Java", "C++", "SQL", "Linux CLI", "Electron.js"]
  }
];

export default function Architecture() {
  const activeScene = useStore((state) => state.activeScene);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeScene === 3) {
      gsap.to(containerRef.current, { opacity: 1, filter: "blur(0px)", scale: 1, y: 0, duration: 1.2, ease: "power4.out" });
    } else {
      gsap.to(containerRef.current, { opacity: 0, filter: "blur(15px)", scale: 0.9, y: 20, duration: 0.6 });
    }
  }, [activeScene]);

  return (
    <section className="fixed inset-0 pointer-events-none z-10 flex items-start justify-center pt-32 px-6 md:px-24">
      <div 
        ref={containerRef} 
        className="max-w-6xl w-full flex flex-col gap-20 opacity-0 scale-90 translate-y-10 filter blur-xl"
      >
        <div className="flex flex-col gap-4 items-center text-center">
          <div className="flex items-center gap-6">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-cyan-400/20" />
            <span className="text-[10px] uppercase tracking-[0.8em] text-cyan-400 font-black">Ecosystem_Map</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-cyan-400/20" />
          </div>
          <h2 className="text-5xl md:text-8xl font-black uppercase leading-[0.8] tracking-tighter text-white">
            System Architecture.
          </h2>
          <p className="text-white/30 text-xs md:text-sm mt-4 font-black uppercase tracking-[0.3em] max-w-2xl">
            A production-ready stack optimized for scalability, <br />
            resilience, and machine intelligence.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-white/5 border border-white/5">
          {DOMAINS.map((domain, i) => (
            <div key={i} className="bg-black p-10 flex flex-col gap-8 group pointer-events-auto cursor-default hover:bg-white/[0.02] transition-colors duration-700">
              <div className="flex flex-col gap-2">
                 <span className="text-[8px] font-black text-white/20 uppercase tracking-[0.4em]">Node_0{i+1}</span>
                 <h4 className="text-[11px] uppercase tracking-[0.2em] font-black text-cyan-400/80 group-hover:text-cyan-400 transition-colors">{domain.name}</h4>
              </div>
              <div className="flex flex-wrap gap-x-6 gap-y-3">
                {domain.tech.map((t) => (
                  <span key={t} className="text-[10px] font-bold text-white/20 group-hover:text-white/60 transition-colors duration-500 whitespace-nowrap">
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
