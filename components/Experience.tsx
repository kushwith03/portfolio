"use client";

import { useStore } from "@/lib/store";
import { useRef, useEffect } from "react";
import gsap from "gsap";

const EXPERIENCES = [
  {
    role: "Full-Stack SWE Intern",
    company: "ATSPL",
    time: "Jan 2026 — Apr 2026",
    desc: "Shipped production React, Node, and PostgreSQL features. Designed optimized relational schemas, REST APIs, and automated CI/CD workflows using GitHub Actions. Managed AWS S3 deployment with CloudFront and Cloudflare CDN integration."
  },
  {
    role: "Autonomous Systems Builder",
    company: "CARLA / PyTorch",
    time: "Aug 2025 — Feb 2026",
    desc: "Built an end-to-end driving pipeline using 8,000+ images. Implemented behavioral cloning and CNN-based steering prediction, achieving sub-50ms inference latency."
  },
  {
    role: "CSE (Data Science)",
    company: "RNSIT",
    time: "Expected May 2026",
    desc: "8.41 CGPA. Focus on Data Structures, OOP, DBMS, and Systems Architecture. Building intelligent systems and production-ready digital products."
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
        className="max-w-2xl w-full flex flex-col gap-16 opacity-0 -translate-x-10 filter blur-xl"
      >
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <span className="text-[9px] uppercase tracking-[0.6em] text-cyan-400 font-black italic">Operational_Timeline</span>
            <div className="h-px w-12 bg-cyan-400/20" />
          </div>
          <h2 className="text-5xl md:text-7xl font-black uppercase leading-[0.85] tracking-tighter text-white">
            Engineering<br /><span className="text-white/20 italic font-light">Heritage.</span>
          </h2>
        </div>
        
        <div className="flex flex-col gap-10 relative before:absolute before:left-[3px] before:top-2 before:bottom-2 before:w-px before:bg-white/5">
          {EXPERIENCES.map((exp, i) => (
            <div key={i} className="relative pl-10 group pointer-events-auto cursor-default">
              <div className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-black border border-white/20 group-hover:border-cyan-400 group-hover:bg-cyan-400/20 group-hover:scale-125 transition-all duration-700" />
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-baseline gap-10">
                  <h4 className="text-white font-black tracking-widest uppercase text-xs">{exp.role}</h4>
                  <div className="h-px flex-1 bg-white/5" />
                  <span className="text-[9px] uppercase tracking-[0.2em] text-white/20 font-bold whitespace-nowrap">{exp.time}</span>
                </div>
                <span className="text-[11px] uppercase tracking-[0.4em] text-cyan-400/60 font-black italic mb-2">{exp.company}</span>
                <p className="text-white/40 text-sm md:text-base leading-relaxed font-light group-hover:text-white/60 transition-colors duration-700">
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
