"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Mail, Github, Linkedin, ArrowUpRight, MapPin, Calendar } from "lucide-react";

/**
 * Epilogue: Narrative Closure
 * A calm, intentional ending that provides professional context and contact.
 */
export default function Epilogue() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[80vh] flex flex-col justify-center px-6 md:pl-56 md:pr-24 py-20 z-10"
    >
      <div className="max-w-7xl w-full mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 border-t border-white/5 pt-20">
          
          {/* Left: Philosophy & Availability */}
          <div className="space-y-12">
            <div className="space-y-4">
               <span className="text-[10px] uppercase tracking-[0.6em] text-white/20 font-black block">Status // Jan 2026 Cycle</span>
               <h3 className="text-4xl md:text-6xl font-light tracking-tighter leading-none text-white">
                 Building for <span className="text-white/20 italic font-serif">Resilience</span> and <span className="text-white/20 italic font-serif">Scale</span>.
               </h3>
            </div>
            
            <p className="text-xl text-white/40 font-light leading-relaxed max-w-md">
              Currently focused on architecting intelligent full-stack systems and exploring the boundaries of high-performance digital products.
            </p>

            <div className="flex gap-12">
               <div className="flex flex-col gap-2">
                  <span className="text-[8px] uppercase tracking-[0.4em] text-white/10 font-bold flex items-center gap-2">
                    <MapPin className="w-2.5 h-2.5" /> Location
                  </span>
                  <span className="text-xs text-white/40 tracking-widest">Bengaluru, India</span>
               </div>
               <div className="flex flex-col gap-2">
                  <span className="text-[8px] uppercase tracking-[0.4em] text-white/10 font-bold flex items-center gap-2">
                    <Calendar className="w-2.5 h-2.5" /> Availability
                  </span>
                  <span className="text-xs text-white/40 tracking-widest">Internships // Open</span>
               </div>
            </div>
          </div>

          {/* Right: Technical Extraction (Links) */}
          <div className="flex flex-col justify-between">
            <div className="space-y-8">
               <span className="text-[10px] uppercase tracking-[0.6em] text-white/20 font-black block underline underline-offset-8">Direct_Access</span>
               
               <div className="flex flex-col gap-6">
                  <a href="mailto:kushwith03@gmail.com" className="group flex items-center justify-between border-b border-white/5 pb-6 hover:border-white/20 transition-all">
                     <div className="flex items-center gap-6">
                        <Mail className="w-5 h-5 text-white/20 group-hover:text-white transition-colors" />
                        <span className="text-lg md:text-2xl text-white/40 group-hover:text-white transition-all font-light">Email</span>
                     </div>
                     <ArrowUpRight className="w-4 h-4 text-white/10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                  </a>
                  <a href="https://github.com/kushwith03" target="_blank" className="group flex items-center justify-between border-b border-white/5 pb-6 hover:border-white/20 transition-all">
                     <div className="flex items-center gap-6">
                        <Github className="w-5 h-5 text-white/20 group-hover:text-white transition-colors" />
                        <span className="text-lg md:text-2xl text-white/40 group-hover:text-white transition-all font-light">GitHub</span>
                     </div>
                     <ArrowUpRight className="w-4 h-4 text-white/10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                  </a>
                  <a href="https://linkedin.com/in/kushwith03" target="_blank" className="group flex items-center justify-between border-b border-white/5 pb-6 hover:border-white/20 transition-all">
                     <div className="flex items-center gap-6">
                        <Linkedin className="w-5 h-5 text-white/20 group-hover:text-white transition-colors" />
                        <span className="text-lg md:text-2xl text-white/40 group-hover:text-white transition-all font-light">LinkedIn</span>
                     </div>
                     <ArrowUpRight className="w-4 h-4 text-white/10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                  </a>
               </div>
            </div>

            <div className="pt-20 opacity-5 flex items-center gap-4">
               <div className="w-2 h-2 rounded-full bg-white" />
               <span className="text-[10px] uppercase tracking-[1.5em]">Identity_Synchronized</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
