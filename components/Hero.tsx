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
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    tl.fromTo(
      titleRef.current,
      { y: 100, opacity: 0, skewY: 7 },
      { y: 0, opacity: 1, skewY: 0, duration: 1.5, delay: 0.5 }
    )
      .fromTo(
        subtitleRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 },
        "-=1"
      )
      .fromTo(
        ctaRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1 },
        "-=0.8"
      );
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-center px-6 md:px-24 py-20 z-10 overflow-hidden"
    >
      <div className="max-w-7xl w-full mx-auto">
        <div className="overflow-hidden mb-4">
          <h1
            ref={titleRef}
            className="text-[12vw] md:text-[8vw] font-black uppercase leading-[0.9] tracking-tighter mix-blend-difference"
          >
            Neural <br />
            Architect
          </h1>
        </div>

        <Parallax speed={0.2}>
          <div ref={subtitleRef} className="max-w-xl mb-12">
            <p className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed">
              Crafting immersive digital universes at the intersection of{" "}
              <span className="text-white font-medium">Full Stack Engineering</span> and{" "}
              <span className="text-white font-medium">Cinematic Motion</span>.
            </p>
          </div>
        </Parallax>

        <Parallax speed={0.4}>
          <div ref={ctaRef} className="flex flex-wrap gap-6 items-center">
            <button className="group relative px-8 py-4 bg-white text-black font-bold uppercase tracking-widest text-sm overflow-hidden transition-transform hover:scale-105 active:scale-95">
              <span className="relative z-10 flex items-center gap-2">
                Explore Works <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            
            <div className="flex gap-4 text-xs uppercase tracking-[0.3em] text-gray-500 font-bold">
              <span>Available for Internships</span>
              <span className="text-white">•</span>
              <span>Jan 2026</span>
            </div>
          </div>
        </Parallax>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-30 animate-pulse">
        <span className="text-[10px] uppercase tracking-[0.5em] vertical-text">Scroll</span>
        <div className="w-px h-12 bg-white" />
      </div>
    </section>
  );
}
