"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowRight } from "lucide-react";
import Parallax from "./motion/Parallax";

/**
 * Step 4: Refined Editorial Hero
 * Reduced scale and contrast to elevate the sculptural Entity.
 * Focuses on cinematic framing over text volume.
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
      { y: 30, opacity: 0, filter: "blur(15px)" },
      { y: 0, opacity: 0.7, filter: "blur(0px)", duration: 2.2, delay: 0.5 }
    )
      .fromTo(
        subtitleRef.current,
        { y: 15, opacity: 0 },
        { y: 0, opacity: 0.5, duration: 2 },
        "-=1.8"
      )
      .fromTo(
        ctaRef.current,
        { y: 10, opacity: 0 },
        { y: 0, opacity: 0.8, duration: 1.5 },
        "-=1.5"
      )
      .fromTo(
        frameRef.current,
        { opacity: 0 },
        { opacity: 0.6, duration: 3 },
        "-=2"
      );
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-end md:justify-center px-6 md:px-24 pb-24 md:pb-20 z-10 overflow-hidden"
    >
      {/* Refined Frame Interface (Lower Contrast) */}
      <div ref={frameRef} className="absolute inset-0 pointer-events-none p-8 md:p-12 flex flex-col justify-between opacity-0">
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-1">
            <span className="text-[9px] uppercase tracking-[0.7em] font-black text-white/30">Protocol_Neural</span>
            <div className="w-8 h-px bg-white/5" />
          </div>
          <div className="text-[7px] uppercase tracking-[0.3em] text-right text-white/10 font-bold">
            Environmental_Depth_Sync // <br />
            Status: Nominal
          </div>
        </div>
        
        <div className="flex justify-between items-end">
          <div className="flex gap-10 text-[7px] uppercase tracking-[0.4em] text-white/10">
            <span>[ Core_Stabilized ]</span>
            <span>[ 60_FPS_TARGET ]</span>
          </div>
          <div className="flex flex-col items-end gap-3">
             <span className="text-[9px] uppercase tracking-[0.5em] text-white/30 italic">Explore</span>
             <div className="w-px h-12 bg-gradient-to-b from-white/10 to-transparent" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl w-full mx-auto relative">
        <div className="overflow-hidden mb-5">
          <h1
            ref={titleRef}
            className="text-[9vw] md:text-[5vw] font-black uppercase leading-[0.95] tracking-tighter opacity-0"
          >
            <span className="text-white/30 italic font-serif lowercase tracking-normal mr-3">the</span>
            Neural <br />
            <span className="ml-[8vw]">Architect</span>
          </h1>
        </div>

        <Parallax speed={0.08}>
          <div ref={subtitleRef} className="max-w-xl mb-10 opacity-0">
            <p className="text-base md:text-lg text-white/30 font-light leading-relaxed tracking-wide">
              Establishing high-fidelity spatial identities where <br />
              <span className="text-white/60 font-medium">Digital Artistry</span> intersects <br />
              <span className="text-white/60 font-medium">Technical Depth</span>.
            </p>
          </div>
        </Parallax>

        <div ref={ctaRef} className="opacity-0">
          <button className="group relative flex items-center gap-5 text-[9px] uppercase tracking-[0.5em] font-black text-white/50 hover:text-white transition-all">
            <div className="w-8 h-8 rounded-full border border-white/5 flex items-center justify-center group-hover:scale-105 group-hover:border-white/20 transition-all duration-700">
               <ArrowRight className="w-2.5 h-2.5" />
            </div>
            Begin Discovery
          </button>
        </div>
      </div>
    </section>
  );
}
