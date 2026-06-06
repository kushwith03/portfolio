"use client";

import { useStore } from "@/lib/store";
import { useRef, useEffect } from "react";
import gsap from "gsap";

const EXPERIENCES = [
  {
    role: "Full-Stack SWE Intern",
    company: "ATSPL",
    time: "Jan 2026 — Apr 2026",
    desc: "Shipped production React, Node, and PostgreSQL features. Designed optimized relational schemas, REST APIs, and automated CI/CD workflows."
  },
  {
    role: "CSE (Data Science)",
    company: "RNSIT",
    time: "Expected May 2026",
    desc: "Focus on Systems Architecture, DBMS, and Machine Learning. Building a foundation in production-ready digital products."
  }
];

export default function Experience() {
  const activeScene = useStore((state) => state.activeScene);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeScene === 2) {
      gsap.to(containerRef.current, { opacity: 1, filter: "blur(0px)", y: 0, duration: 1, ease: "power3.out" });
    } else {
      gsap.to(containerRef.current, { opacity: 0, filter: "blur(10px)", y: 20, duration: 0.5 });
    }
  }, [activeScene]);

  return (
    <section 
      style={{ paddingLeft: 'var(--nav-safe-area)' }}
      className={`fixed inset-0 pointer-events-none z-10 flex items-center justify-start pr-6 md:pr-24 transition-opacity duration-700 ${activeScene === 2 ? 'opacity-100' : 'opacity-0'}`}
    >
      <div 
        ref={containerRef} 
        className="max-w-4xl w-full flex flex-col gap-10 md:gap-12 opacity-0 translate-y-5 filter blur-md"
      >
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <span className="text-[clamp(8px,0.7vw,10px)] uppercase tracking-[0.6em] text-cyan-400 font-black">Professional_Heritage</span>
            <div className="h-px w-12 bg-cyan-400/20" />
          </div>
          <h2 className="text-[clamp(2.5rem,6vw,4.5rem)] font-black uppercase leading-none tracking-tighter text-white">
            Experience.
          </h2>
        </div>
        
        <div className="flex flex-col gap-10 relative pl-8 border-l border-white/5">
          {EXPERIENCES.map((exp, i) => (
            <div key={i} className="flex flex-col gap-3 group pointer-events-auto cursor-default relative">
              {/* Timeline Node */}
              <div className="absolute -left-[37px] top-1.5 w-4 h-4 bg-black border-2 border-white/10 group-hover:border-cyan-400/50 transition-colors rounded-full" />
              
              <div className="flex items-baseline justify-between gap-10">
                <h4 className="text-white font-black tracking-widest uppercase text-base group-hover:text-cyan-400 transition-colors">
                  {exp.role}
                </h4>
                <span className="text-[10px] uppercase tracking-[0.4em] text-white/20 font-bold whitespace-nowrap">
                  {exp.time}
                </span>
              </div>
              
              <div className="flex flex-col gap-4">
                <span className="text-[11px] uppercase tracking-[0.5em] text-white/40 font-black italic">
                  {exp.company}
                </span>
                <p className="text-white/30 text-sm leading-relaxed font-light group-hover:text-white/60 transition-colors max-w-2xl">
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
