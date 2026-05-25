"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowRight } from "lucide-react";
import Parallax from "./motion/Parallax";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Cinematic Reveal Sequence
    const tl = gsap.timeline({ 
      defaults: { ease: "power4.inOut" } 
    });

    tl.fromTo(
      titleRef.current,
      { y: "100%", opacity: 0, skewY: 5 },
      { y: "0%", opacity: 1, skewY: 0, duration: 2, delay: 1 }
    )
      .fromTo(
        subtitleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.5 },
        "-=1.2"
      )
      .fromTo(
        ctaRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2 },
        "-=1"
      );
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-center px-6 md:px-24 py-20 z-10 overflow-hidden"
    >
      <div className="max-w-7xl w-full mx-auto">
        <div className="overflow-hidden mb-8">
          <h1
            ref={titleRef}
            className="text-[14vw] md:text-[10vw] font-black uppercase leading-[0.85] tracking-tighter"
          >
            <span className="block opacity-20">The Neural</span>
            <span className="block text-white">Architect</span>
          </h1>
        </div>

        <Parallax speed={0.15}>
          <div ref={subtitleRef} className="max-w-2xl mb-16">
            <p className="text-xl md:text-3xl text-gray-400 font-light leading-snug tracking-tight">
              A cinematic journey through the intersection of <br />
              <span className="text-white italic font-serif">Deep Logic</span> and <br />
              <span className="text-white italic font-serif">Atmospheric Motion</span>.
            </p>
          </div>
        </Parallax>

        <Parallax speed={0.3}>
          <div ref={ctaRef} className="flex flex-col md:flex-row gap-12 items-start md:items-center">
            <button className="group relative flex items-center gap-6 text-xs uppercase tracking-[0.5em] font-black hover:text-cyan-400 transition-colors">
              <span className="w-12 h-px bg-white group-hover:w-20 group-hover:bg-cyan-400 transition-all" />
              Initiate Discovery
              <ArrowRight className="w-4 h-4 -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all" />
            </button>
            
            <div className="flex gap-8 text-[10px] uppercase tracking-[0.4em] text-gray-500 font-bold border-l border-white/10 pl-8">
              <div className="flex flex-col gap-1">
                <span className="text-white/20">Status</span>
                <span>Active</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-white/20">Location</span>
                <span>Bengaluru</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-white/20">Cycle</span>
                <span>Jan 2026</span>
              </div>
            </div>
          </div>
        </Parallax>
      </div>
      
      {/* Cinematic Frame Labels */}
      <div className="absolute top-12 left-12 text-[10px] uppercase tracking-[0.6em] text-white/20 font-black">
        Protocol 01 // Arrival
      </div>
      <div className="absolute top-12 right-12 text-[10px] uppercase tracking-[0.6em] text-white/20 font-black">
        [ Neural_Interface ]
      </div>
      
      {/* Ambient Depth Indicator */}
      <div className="absolute bottom-12 right-12 flex flex-col items-end gap-2 opacity-20">
        <div className="w-24 h-px bg-white" />
        <span className="text-[8px] uppercase tracking-[0.4em]">Z-Axis Depth Synchronized</span>
      </div>
    </section>
  );
}
