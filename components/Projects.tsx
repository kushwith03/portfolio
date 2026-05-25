"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import projects from "@/lib/data/projects.json";
import Parallax from "./motion/Parallax";

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={containerRef} className="relative py-40 px-6 md:px-24">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-black uppercase mb-32 tracking-tighter">
          Archive of <br /> Realities
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-24 md:gap-40">
          {projects.map((project: any, index: number) => (
            <Parallax key={project.id} speed={index % 2 === 0 ? 0.1 : 0.3}>
              <div className="group relative aspect-[16/10] bg-gray-900 overflow-hidden border border-white/10 hover:border-white/30 transition-colors">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                
                <div className="absolute bottom-8 left-8 z-20">
                  <span className="text-xs uppercase tracking-widest text-gray-400 mb-2 block">
                    0{index + 1} / Project
                  </span>
                  <h3 className="text-3xl font-bold uppercase tracking-tighter group-hover:translate-x-2 transition-transform">
                    {project.title}
                  </h3>
                </div>
                
                {/* Project Image Placeholder with Hover Distortion */}
                <div className="absolute inset-0 scale-110 group-hover:scale-100 transition-transform duration-1000">
                  <img
                    src={`https://picsum.photos/seed/${project.id}/800/500`}
                    alt={project.title}
                    className="w-full h-full object-cover opacity-50 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                  />
                </div>
              </div>
            </Parallax>
          ))}
        </div>
      </div>
    </section>
  );
}
