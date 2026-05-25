"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowRight, Fingerprint } from "lucide-react";
import Parallax from "./motion/Parallax";

/**
 * Step 5: Signature Hero Experience
 * Unifies the 'Architect' persona with the environment.
 * Focuses on minimal, confident authorship.
 */
export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ 
      defaults: { ease: "expo.out" } 
    });

    tl.fromTo(
      titleRef.current,
      { y: 20, opacity: 0, filter: "blur(20px)" },
      { y: 0, opacity: 1, filter: "blur(0px)", duration: 2, delay: 0.8 }
    )
      .fromTo(
        subtitleRef.current,
        { y: 10, opacity: 0 },
        { y: 0, opacity: 0.4, duration: 2 },
        "-=1.5"
      )
      .fromTo(
        ctaRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 2 },
        "-=1.5"
      )
      .fromTo(
        frameRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 4 },
        "-=2"
      );
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-center px-6 md:px-24 py-20 z-10 overflow-hidden"
    >
      {/* Precision System HUD */}
      <div ref={frameRef} className="absolute inset-0 pointer-events-none p-10 md:p-16 flex flex-col justify-between opacity-0">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-4">
            <Fingerprint className="w-4 h-4 text-white/10" />
            <span className="text-[9px] uppercase tracking-[0.8em] font-black text-white/20 underline underline-offset-8">R.K.Kumar</span>
          </div>
          <div className="text-[7px] uppercase tracking-[0.5em] text-right text-white/10 font-bold leading-relaxed">
            Bengaluru_Node // <br />
            System_Architecture_V.2
          </div>
        </div>
        
        <div className="flex justify-between items-end">
          <div className="flex gap-16 text-[7px] uppercase tracking-[0.6em] text-white/5 font-black">
            <span>[ Synchronized ]</span>
            <span>[ Low_Latency_UI ]</span>
          </div>
          <div className="flex flex-col items-end gap-3 opacity-30 animate-pulse">
             <div className="w-12 h-px bg-white/20" />
             <span className="text-[8px] uppercase tracking-[0.4em]">Plunge</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl w-full mx-auto relative">
        <div className="overflow-hidden mb-6">
          <h1
            ref={titleRef}
            className="text-[10vw] md:text-[6vw] font-black uppercase leading-[0.85] tracking-tighter opacity-0"
          >
            <span className="text-white/40 block">Neural</span>
            <span className="text-white block ml-[5vw]">Architect</span>
          </h1>
        </div>

        <Parallax speed={0.05}>
          <div ref={subtitleRef} className="max-w-2xl mb-12 opacity-0">
            <p className="text-xl md:text-2xl text-white/20 font-light leading-snug tracking-tight">
               Establishing high-fidelity digital systems through <br />
               <span className="text-white/40 font-medium">Systematic Discovery</span> and <br />
               <span className="text-white/40 font-medium">Emotional Precision</span>.
            </p>
          </div>
        </Parallax>

        <div ref={ctaRef} className="opacity-0">
          <div className="flex items-center gap-8">
            <button className="group relative flex items-center gap-4 text-[9px] uppercase tracking-[0.6em] font-black text-white/40 hover:text-white transition-all">
              <span className="w-12 h-px bg-white/10 group-hover:w-20 group-hover:bg-white/40 transition-all duration-700" />
              Start_Sequence
            </button>
            <div className="h-px w-px bg-white/10" />
            <span className="text-[8px] uppercase tracking-[0.4em] text-white/10 font-bold">2026_Cycle</span>
          </div>
        </div>
      </div>
    </section>
  );
}
