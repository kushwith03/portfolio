"use client";

import { useStore } from "@/lib/store";
import { useRef, useEffect } from "react";
import gsap from "gsap";

const EXPERIENCES = [
  {
    role: "Full-Stack SWE Intern",
    company: "ATSPL (Angadi Technological Solutions)",
    time: "Jan 2026 — Apr 2026",
    desc: "Shipped production-grade features using React.js and Node.js. Architected optimized relational schemas in PostgreSQL and automated CI/CD workflows using GitHub Actions. Migrated production web platforms to Electron.js desktop applications with shared frontend architecture."
  },
  {
    role: "Autonomous Systems Lead",
    company: "CARLA / PyTorch Research",
    time: "Aug 2025 — Feb 2026",
    desc: "Engineered end-to-end autonomous driving pipelines. Trained behavioral cloning models on 8,000+ simulation samples, achieving sub-50ms inference latency for real-time steering control."
  },
  {
    role: "CSE (Data Science)",
    company: "RNSIT",
    time: "Expected May 2026",
    desc: "Specializing in High-Performance Computing, DBMS, and Systems Design. Core focus on building scalable backend infrastructure and intelligent data processing units."
  }
];

export default function Experience() {
  const activeScene = useStore((state) => state.activeScene);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeScene === 2) {
      gsap.to(containerRef.current, { opacity: 1, filter: "blur(0px)", x: 0, duration: 1.2, ease: "power4.out" });
    } else {
      gsap.to(containerRef.current, { opacity: 0, filter: "blur(15px)", x: -30, duration: 0.6 });
    }
  }, [activeScene]);

  return (
    <section className="fixed inset-0 pointer-events-none z-10 flex items-center justify-start px-6 md:px-32">
      <div 
        ref={containerRef} 
        className="max-w-3xl w-full flex flex-col gap-16 opacity-0 -translate-x-10 filter blur-xl"
      >
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <span className="text-[9px] uppercase tracking-[0.6em] text-cyan-400 font-black italic">Operational_Timeline</span>
            <div className="h-px w-12 bg-cyan-400/20" />
          </div>
          <h2 className="text-5xl md:text-8xl font-black uppercase leading-[0.8] tracking-tighter text-white">
            Production<br /><span className="text-white/20 italic font-light">Experience.</span>
          </h2>
          <p className="text-[10px] uppercase tracking-[0.4em] text-white/30 font-bold max-w-sm">
            // From internship sprints to autonomous research, every line of code is built for scale.
          </p>
        </div>
        
        <div className="flex flex-col gap-10 relative before:absolute before:left-[3px] before:top-2 before:bottom-2 before:w-px before:bg-white/5">
          {EXPERIENCES.map((exp, i) => (
            <div key={i} className="relative pl-10 group pointer-events-auto cursor-default">
              <div className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-black border border-white/20 group-hover:border-cyan-400 group-hover:bg-cyan-400/20 group-hover:scale-125 transition-all duration-700" />
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-baseline gap-10">
                  <h4 className="text-white font-black tracking-[0.2em] uppercase text-[11px] group-hover:text-cyan-400 transition-colors duration-500">{exp.role}</h4>
                  <div className="h-px flex-1 bg-white/5" />
                  <span className="text-[9px] uppercase tracking-[0.2em] text-white/20 font-bold whitespace-nowrap">{exp.time}</span>
                </div>
                <span className="text-[10px] uppercase tracking-[0.4em] text-white/40 font-black italic mb-2">{exp.company}</span>
                <p className="text-white/40 text-sm md:text-base leading-relaxed font-light group-hover:text-white/70 transition-colors duration-700 border-l border-white/5 pl-6">
                  {exp.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
