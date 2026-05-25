"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowRight, ChevronDown } from "lucide-react";
import Parallax from "./motion/Parallax";

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
      { y: 40, opacity: 0, filter: "blur(20px)" },
      { y: 0, opacity: 0.8, filter: "blur(0px)", duration: 2.5, delay: 0.5 }
    )
      .fromTo(
        subtitleRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 0.6, duration: 2 },
        "-=2"
      )
      .fromTo(
        ctaRef.current,
        { y: 10, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.5 },
        "-=1.5"
      )
      .fromTo(
        frameRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 3 },
        "-=2"
      );
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-end md:justify-center px-6 md:px-24 pb-24 md:pb-20 z-10 overflow-hidden"
    >
      {/* Cinematic Frame Interface */}
      <div ref={frameRef} className="absolute inset-0 pointer-events-none p-8 md:p-12 flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] uppercase tracking-[0.8em] font-black text-white/40">Neural_Interface_V.1</span>
            <div className="w-12 h-px bg-white/10" />
          </div>
          <div className="text-[8px] uppercase tracking-[0.4em] text-right text-white/20 font-bold leading-relaxed">
            Atmospheric_Luxury // <br />
            Spatial_Computation_Active
          </div>
        </div>
        
        <div className="flex justify-between items-end">
          <div className="flex gap-12 text-[8px] uppercase tracking-[0.5em] text-white/20">
            <span>[ System_Nominal ]</span>
            <span>[ Depth_Sync_Locked ]</span>
          </div>
          <div className="flex flex-col items-end gap-4">
             <span className="text-[10px] uppercase tracking-[0.6em] text-white/40">Scroll_To_Plunge</span>
             <div className="w-px h-16 bg-gradient-to-b from-white/20 to-transparent" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl w-full mx-auto relative">
        <div className="overflow-hidden mb-6">
          <h1
            ref={titleRef}
            className="text-[10vw] md:text-[6vw] font-black uppercase leading-[0.9] tracking-tighter opacity-0"
          >
            <span className="text-white/40 italic font-serif lowercase tracking-normal mr-4">the</span>
            Neural <br />
            <span className="ml-[10vw]">Architect</span>
          </h1>
        </div>

        <Parallax speed={0.1}>
          <div ref={subtitleRef} className="max-w-xl mb-12 opacity-0">
            <p className="text-lg md:text-xl text-white/40 font-light leading-relaxed tracking-wide">
              Crafting high-fidelity digital worlds where <br />
              <span className="text-white/80 font-medium">Authentic Engineering</span> meets <br />
              <span className="text-white/80 font-medium">Cinematic Discovery</span>.
            </p>
          </div>
        </Parallax>

        <div ref={ctaRef} className="opacity-0">
          <button className="group relative flex items-center gap-6 text-[10px] uppercase tracking-[0.6em] font-black text-white/60 hover:text-white transition-all">
            <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:border-white/30 transition-all duration-500">
               <ArrowRight className="w-3 h-3" />
            </div>
            Begin Discovery
          </button>
        </div>
      </div>
    </section>
  );
}
