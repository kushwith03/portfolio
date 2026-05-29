"use client";

import { useStore } from "@/lib/store";
import { useRef, useEffect } from "react";
import gsap from "gsap";

const PRINCIPLES = [
  {
    title: "Systems Over Features",
    desc: "Building isolated features scales linearly; architecting resilient systems scales exponentially. I prioritize state consistency, modular integration, and long-term maintainability over quick patches."
  },
  {
    title: "Production Resilience",
    desc: "A frontend is only as fast as its CDN, and a backend is only as reliable as its CI/CD. I build with deployment constraints, zero-downtime workflows, and database integrity in mind from commit zero."
  },
  {
    title: "Operational Latency",
    desc: "Sub-50ms latency isn't a luxury—it's a requirement for intelligent systems. Whether it's autonomous simulation steering or production API response, I optimize render cycles and state transitions relentlessly."
  }
];

export default function Principles() {
  const activeScene = useStore((state) => state.activeScene);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeScene === 1) {
      gsap.to(containerRef.current, { opacity: 1, filter: "blur(0px)", x: 0, duration: 1.2, ease: "power4.out" });
    } else {
      gsap.to(containerRef.current, { opacity: 0, filter: "blur(15px)", x: 30, duration: 0.6 });
    }
  }, [activeScene]);

  return (
    <section className="fixed inset-0 pointer-events-none z-10 flex items-center justify-end px-6 md:px-32">
      <div 
        ref={containerRef} 
        className="max-w-2xl w-full flex flex-col gap-16 opacity-0 translate-x-10 filter blur-xl"
      >
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <span className="text-[9px] uppercase tracking-[0.6em] text-cyan-400 font-black italic">Core_Engineering_Doctrine</span>
            <div className="h-px w-12 bg-cyan-400/20" />
          </div>
          <h2 className="text-5xl md:text-8xl font-black uppercase leading-[0.8] tracking-tighter text-white">
            Systems<br /><span className="text-white/20 italic font-light">Thinking.</span>
          </h2>
          <p className="text-[10px] uppercase tracking-[0.4em] text-white/30 font-bold max-w-sm">
            // My approach to building software isn't about code; it's about architecture and operational excellence.
          </p>
        </div>
        
        <div className="flex flex-col gap-12">
          {PRINCIPLES.map((p, i) => (
            <div key={i} className="flex gap-10 items-start group pointer-events-auto cursor-default">
              <div className="flex flex-col items-center pt-2">
                 <span className="text-[12px] font-black text-white/10 group-hover:text-cyan-400 transition-all duration-700">0{i+1}</span>
                 <div className="w-px h-0 group-hover:h-8 bg-cyan-400/30 transition-all duration-1000" />
              </div>
              <div className="flex flex-col gap-3">
                <h4 className="text-white font-black tracking-[0.3em] uppercase text-[11px] group-hover:text-cyan-400 transition-colors duration-500">{p.title}</h4>
                <p className="text-white/40 text-sm md:text-base leading-relaxed font-light max-w-md group-hover:text-white/60 transition-colors duration-700">
                  {p.desc}
                </p>
              </div>
            </div>
          ))}
          
          <div className="pt-8 border-t border-white/5 flex justify-between items-center">
             <p className="text-[8px] uppercase tracking-[0.4em] text-white/10 font-bold">
                Authored_by_R_Khushwith_Kumar
             </p>
             <div className="flex gap-1">
                <div className="w-1 h-1 bg-cyan-500/20" />
                <div className="w-1 h-1 bg-cyan-500/40" />
                <div className="w-1 h-1 bg-cyan-500/60" />
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
