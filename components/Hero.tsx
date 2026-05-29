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
      {/* System Interface HUD - Authored Context */}
      <div ref={infoRef} className="absolute inset-0 pointer-events-none p-10 md:p-16 flex flex-col justify-between opacity-0">
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-2">
            <span className="text-[9px] uppercase tracking-[0.6em] font-black text-white/30">Engineering_Auth</span>
            <div className="w-10 h-px bg-white/5" />
            <span className="text-[7px] uppercase tracking-[0.4em] text-white/10 font-bold">V.2026.CSE.DS</span>
          </div>
          <div className="text-[7px] uppercase tracking-[0.4em] text-right text-white/10 font-bold leading-relaxed">
            Bengaluru_Node // <br />
            ATSPL_Hybrid_Ops
          </div>
        </div>
        
        <div className="flex justify-between items-end">
          <div className="flex gap-12 text-[7px] uppercase tracking-[0.5em] text-white/5 font-black">
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
             <span className="text-[8px] uppercase tracking-[0.4em]">Scroll_Artifacts</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl w-full mx-auto relative flex">
        {/* Left Aligned Identity Core */}
        <div className="w-full md:w-4/5">
          <div className="mb-8">
            <h1
              ref={titleRef}
              className="text-[10vw] md:text-[8vw] font-black uppercase leading-[0.82] tracking-tighter opacity-0"
            >
              <span className="text-white/20 block mb-2 text-[0.3em] tracking-[0.4em]">System_Architect // 2026</span>
              <span className="text-white block italic">R_Khushwith</span>
              <span className="text-white block tracking-widest text-cyan-500">Kumar.</span>
            </h1>
          </div>

          <Parallax speed={0.04}>
            <div ref={subtitleRef} className="max-w-3xl mb-12 opacity-0">
              <p className="text-xl md:text-3xl text-white/50 font-light leading-snug tracking-tight">
                 Full-stack + AI Systems Engineer based in <span className="text-white/90 font-medium italic underline underline-offset-8 decoration-white/10">Bangalore</span>. <br />
                 Currently shipping production features at <span className="text-white/90 font-medium italic">ATSPL</span> and <br />
                 evolving <span className="text-white/90 font-medium italic">Autonomous Intelligence</span>.
              </p>
            </div>
          </Parallax>

          <div ref={ctaRef} className="opacity-0">
            <div className="flex flex-wrap items-center gap-x-12 gap-y-8">
              <button className="group relative flex items-center gap-4 text-[9px] uppercase tracking-[0.6em] font-black text-white/40 hover:text-white transition-all">
                <span className="w-12 h-px bg-cyan-500/30 group-hover:w-20 group-hover:bg-cyan-500 transition-all duration-700" />
                Initiate_System_Tour
              </button>
              
              <div className="flex gap-8">
                <div className="flex flex-col gap-1">
                  <span className="text-[7px] uppercase tracking-[0.4em] text-white/20 font-bold">Base_Location</span>
                  <span className="text-[9px] uppercase tracking-[0.2em] text-white/70 font-black">Bengaluru, IN</span>
                </div>
                <div className="w-px h-8 bg-white/5" />
                <div className="flex flex-col gap-1">
                  <span className="text-[7px] uppercase tracking-[0.4em] text-white/20 font-bold">Current_Ops</span>
                  <span className="text-[9px] uppercase tracking-[0.2em] text-white/70 font-black">Intern @ ATSPL</span>
                </div>
                <div className="w-px h-8 bg-white/5" />
                <div className="flex flex-col gap-1">
                  <span className="text-[7px] uppercase tracking-[0.4em] text-white/20 font-bold">Academy</span>
                  <span className="text-[9px] uppercase tracking-[0.2em] text-white/70 font-black">RNSIT // CSE DS</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

