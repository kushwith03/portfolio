"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowRight, Terminal, Cpu, Layout } from "lucide-react";
import Parallax from "./motion/Parallax";

/**
 * Identity Pass: Authenticity-First Hero
 * Grounded in the builder's real profile: R Khushwith Kumar.
 * Focuses on clarity, technical intent, and personal authorship.
 */
export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ 
      defaults: { ease: "power4.out" } 
    });

    tl.fromTo(
      titleRef.current,
      { y: 40, opacity: 0, filter: "blur(10px)" },
      { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.5, delay: 0.5 }
    )
      .fromTo(
        subtitleRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 0.6, duration: 1.2 },
        "-=1"
      )
      .fromTo(
        ctaRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.5 },
        "-=1"
      )
      .fromTo(
        infoRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 2 },
        "-=1.5"
      );
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-center px-6 md:px-24 py-20 z-10 overflow-hidden"
    >
      {/* Real Developer Context HUD */}
      <div ref={infoRef} className="absolute inset-0 pointer-events-none p-10 md:p-16 flex flex-col justify-between opacity-0">
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] uppercase tracking-[0.5em] font-black text-white/40">Full_Stack_Engineer</span>
            <div className="w-12 h-px bg-white/10" />
            <span className="text-[9px] uppercase tracking-[0.2em] text-white/20 italic">Shipping_End_to_End_Production</span>
          </div>
          <div className="text-[8px] uppercase tracking-[0.4em] text-right text-white/20 font-bold leading-relaxed">
            Bengaluru // RNSIT <br />
            Internship_Cycle_2026
          </div>
        </div>
        
        <div className="flex justify-between items-end">
          <div className="flex gap-16 text-[8px] uppercase tracking-[0.4em] text-white/10">
             <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500/20 animate-pulse" />
                <span>Node.js_Runtime_Nominal</span>
             </div>
             <div className="flex items-center gap-3">
                <Terminal className="w-3 h-3" />
                <span>React_State_Sync</span>
             </div>
          </div>
          <div className="flex flex-col items-end gap-3 opacity-30">
             <span className="text-[9px] uppercase tracking-[0.5em] text-white/30 italic">Explore Systems</span>
             <div className="w-px h-12 bg-white/10" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl w-full mx-auto relative">
        <div className="mb-8">
          <h1
            ref={titleRef}
            className="text-[12vw] md:text-[7vw] font-black uppercase leading-[0.9] tracking-tighter opacity-0"
          >
            <span className="text-white/20 block">R Khushwith</span>
            <span className="text-white block ml-[5vw]">Kumar.</span>
          </h1>
        </div>

        <Parallax speed={0.05}>
          <div ref={subtitleRef} className="max-w-2xl mb-14 opacity-0">
            <p className="text-xl md:text-2xl text-white/40 font-light leading-snug tracking-tight">
               Building <span className="text-white/80 font-medium italic">High-Performance</span> Digital Products and <br />
               <span className="text-white/80 font-medium italic">End-to-End</span> Scalable Systems with an <br />
               Engineering-First Mindset.
            </p>
          </div>
        </Parallax>

        <div ref={ctaRef} className="opacity-0">
          <div className="flex flex-col md:flex-row md:items-center gap-12">
            <button className="group relative flex items-center gap-6 text-[10px] uppercase tracking-[0.6em] font-black text-white/40 hover:text-white transition-all">
              <span className="w-12 h-px bg-white/10 group-hover:w-20 group-hover:bg-white/40 transition-all duration-700" />
              Analyze_Works
            </button>
            
            <div className="flex gap-10 border-l border-white/5 pl-10">
               <div className="flex flex-col gap-1">
                  <span className="text-[8px] uppercase tracking-[0.4em] text-white/10 font-bold">Focus</span>
                  <span className="text-[10px] text-white/40 tracking-widest uppercase">Intelligent Systems</span>
               </div>
               <div className="flex flex-col gap-1">
                  <span className="text-[8px] uppercase tracking-[0.4em] text-white/10 font-bold">Recent</span>
                  <span className="text-[10px] text-white/40 tracking-widest uppercase">Full_Stack @ ATSPL</span>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
