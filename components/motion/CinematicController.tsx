"use client";

import { useEffect, useRef } from "react";
import { useStore } from "@/lib/store";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Global Cinematic Controller
 * Orchestrates scene transitions and spatial depth based on scroll progress.
 */
export default function CinematicController() {
  const scrollProgress = useStore((state) => state.scrollProgress);
  const setActiveScene = useStore((state) => state.setActiveScene);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Scene Threshold Definitions
    // We divide the journey into emotional milestones
    const scenes = [
      { id: 0, label: "Arrival", start: 0, end: 0.2 },
      { id: 1, label: "The Archive", start: 0.25, end: 0.6 },
      { id: 2, label: "The Neural Core", start: 0.65, end: 0.9 },
      { id: 3, label: "Synthesis", start: 0.95, end: 1.0 },
    ];

    const ctx = gsap.context(() => {
      scenes.forEach((scene) => {
        ScrollTrigger.create({
          trigger: document.body,
          start: `${scene.start * 100}% top`,
          end: `${scene.end * 100}% top`,
          onToggle: (self) => {
            if (self.isActive) {
              setActiveScene(scene.id);
            }
          },
        });
      });
    });

    return () => ctx.revert();
  }, [setActiveScene]);

  return (
    <div className="fixed top-24 left-12 z-50 pointer-events-none hidden md:block">
      {/* Cinematic Timeline HUD */}
      <div className="flex flex-col gap-8 opacity-20">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-4">
            <span className="text-[8px] font-black uppercase tracking-[0.4em]">
              0{i + 1}
            </span>
            <div 
              className={`h-px transition-all duration-700 ${
                i === useStore.getState().activeScene ? "w-12 bg-white opacity-100" : "w-4 bg-white/50"
              }`} 
            />
          </div>
        ))}
      </div>
    </div>
  );
}
