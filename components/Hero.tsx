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
      style={{ paddingLeft: 'var(--content-start)' }}
      className="relative min-h-screen flex flex-col justify-center pr-6 md:pr-24 py-20 z-10 overflow-hidden"
    >
      {/* System Interface HUD - Authored Context */}
      <div 
        ref={infoRef} 
        style={{ paddingLeft: 'var(--content-start)' }}
        className="absolute inset-0 pointer-events-none p-10 md:p-16 flex flex-col justify-between opacity-0"
      >
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-2">
            <span className="text-[clamp(7px,0.6vw,9px)] uppercase tracking-[0.6em] font-black text-white/30">Engineering_Auth</span>
            <div className="w-10 h-px bg-white/5" />
            <span className="text-[clamp(6px,0.5vw,7px)] uppercase tracking-[0.4em] text-white/10 font-bold">V.2026.CSE.DS</span>
          </div>
          <div className="text-[clamp(6px,0.5vw,7px)] uppercase tracking-[0.4em] text-right text-white/10 font-bold leading-relaxed">
            Bengaluru_Node // <br />
            ATSPL_Hybrid_Ops
          </div>
        </div>
        
        <div className="flex justify-between items-end">
          <div className="flex gap-12 text-[clamp(6px,0.5vw,7px)] uppercase tracking-[0.5em] text-white/5 font-black">
             <div className="flex items-center gap-3">
                <Fingerprint className="w-3 h-3 text-white/20" />
                <span>R_KHUSHWITH_KUMAR</span>
             </div>
             <div className="flex items-center gap-3">
                <Terminal className="w-3 h-3 text-white/20" />
                <span>SYST_ARCH_ACTIVE</span>
             </div>
          </div>
          <div className="flex flex-col items-end gap-3 opacity-20">
             <div className="w-10 h-px bg-white/20" />
             <span className="text-[clamp(7px,0.5vw,8px)] uppercase tracking-[0.4em]">Scroll_Artifacts</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl w-full mx-auto relative flex">
        {/* Left Aligned Identity Core */}
        <div className="w-full md:w-4/5">
          <div className="mb-8">
            <h1
              ref={titleRef}
              className="text-[clamp(3rem,8vw,6.5rem)] font-black uppercase leading-[0.82] tracking-tighter opacity-0"
            >
              <span className="text-white/20 block mb-2 text-[0.4em] tracking-[0.4em]">Personal_Builds_v3</span>
              <span className="text-white block italic">R_Khushwith</span>
              <span className="text-white block tracking-widest">Kumar.</span>
            </h1>
          </div>

          <Parallax speed={0.04}>
            <div ref={subtitleRef} className="max-w-2xl mb-12 opacity-0">
              <p className="text-[clamp(1rem,1.5vw,1.25rem)] text-white/40 font-light leading-relaxed tracking-tight">
                 Full Stack Software Engineer & AI Systems Builder <br />
                 Architecting <span className="text-white/80 font-medium italic">intelligent systems</span>, <span className="text-white/80 font-medium italic">scalable products</span>, and <br />
                 production-ready software.
              </p>
            </div>
          </Parallax>

          <div ref={ctaRef} className="opacity-0">
            <div className="flex items-center gap-10">
              <button className="group relative flex items-center gap-4 text-[clamp(8px,0.7vw,10px)] uppercase tracking-[0.6em] font-black text-white/40 hover:text-white transition-all">
                <span className="w-12 h-px bg-white/10 group-hover:w-20 group-hover:bg-white/40 transition-all duration-700" />
                Observe_Builds
              </button>
              <div className="h-4 w-px bg-white/5" />
              <div className="flex flex-col">
                <span className="text-[clamp(7px,0.6vw,8px)] uppercase tracking-[0.4em] text-white/10 font-bold">CSE_Data_Science</span>
                <span className="text-[clamp(6px,0.5vw,7px)] uppercase tracking-[0.4em] text-white/5 font-black">RNSIT_NODE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

