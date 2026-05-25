"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowRight, Terminal, Fingerprint } from "lucide-react";
import Parallax from "./motion/Parallax";

/**
 * Identity Pass: Editorial Split Hero
 * - Left Aligned content for better hierarchy.
 * - Balanced whitespace for the Architect Companion on the right.
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
      { y: 30, opacity: 0, filter: "blur(15px)" },
      { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.5, delay: 0.5 }
    )
      .fromTo(
        subtitleRef.current,
        { y: 15, opacity: 0 },
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
      {/* System Interface HUD */}
      <div ref={infoRef} className="absolute inset-0 pointer-events-none p-10 md:p-16 flex flex-col justify-between opacity-0">
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-2">
            <span className="text-[9px] uppercase tracking-[0.6em] font-black text-white/30">System_Access</span>
            <div className="w-10 h-px bg-white/5" />
          </div>
          <div className="text-[7px] uppercase tracking-[0.4em] text-right text-white/10 font-bold leading-relaxed">
            Bengaluru_Node // <br />
            Architectural_Refinement_V.3
          </div>
        </div>
        
        <div className="flex justify-between items-end">
          <div className="flex gap-12 text-[7px] uppercase tracking-[0.5em] text-white/5 font-black">
             <div className="flex items-center gap-3">
                <Fingerprint className="w-3 h-3 text-white/20" />
                <span>R_Khushwith_Kumar</span>
             </div>
             <div className="flex items-center gap-3">
                <Terminal className="w-3 h-3 text-white/20" />
                <span>Runtime_Active</span>
             </div>
          </div>
          <div className="flex flex-col items-end gap-3 opacity-20">
             <div className="w-10 h-px bg-white/20" />
             <span className="text-[8px] uppercase tracking-[0.4em]">Scroll</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl w-full mx-auto relative flex">
        {/* Left Aligned Identity Core */}
        <div className="w-full md:w-3/5">
          <div className="mb-6">
            <h1
              ref={titleRef}
              className="text-[11vw] md:text-[6.5vw] font-black uppercase leading-[0.85] tracking-tighter opacity-0"
            >
              <span className="text-white/20 block">Engineering</span>
              <span className="text-white block">Identity.</span>
            </h1>
          </div>

          <Parallax speed={0.04}>
            <div ref={subtitleRef} className="max-w-xl mb-12 opacity-0">
              <p className="text-lg md:text-xl text-white/40 font-light leading-relaxed tracking-tight">
                 Building <span className="text-white/80 font-medium">Scalable Systems</span> through <br />
                 Intelligent Digital Products and <br />
                 <span className="text-white/80 font-medium">Authentic Engineering</span>.
              </p>
            </div>
          </Parallax>

          <div ref={ctaRef} className="opacity-0">
            <div className="flex items-center gap-10">
              <button className="group relative flex items-center gap-4 text-[9px] uppercase tracking-[0.6em] font-black text-white/40 hover:text-white transition-all">
                <span className="w-12 h-px bg-white/10 group-hover:w-20 group-hover:bg-white/40 transition-all duration-700" />
                Inspect_Works
              </button>
              <div className="h-4 w-px bg-white/5" />
              <span className="text-[8px] uppercase tracking-[0.4em] text-white/10 font-bold">2026_Cycle</span>
            </div>
          </div>
        </div>
        
        {/* Right side reserved for Architect Companion (WebGL) */}
        <div className="hidden md:block w-2/5 h-full pointer-events-none" />
      </div>
    </section>
  );
}
