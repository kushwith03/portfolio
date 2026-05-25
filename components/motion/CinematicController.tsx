"use client";

import { useEffect, useRef } from "react";
import { useStore } from "@/lib/store";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Global Cinematic Controller
 * Tighter narrative pacing Pass 3.
 * Bridges the Hero -> Archive gap with an intentional transition corridor.
 */
export default function CinematicController() {
  const activeScene = useStore((state) => state.activeScene);
  const setActiveScene = useStore((state) => state.setActiveScene);
  const setScrollProgress = useStore((state) => state.setScrollProgress);

  useEffect(() => {
    // 1. Narrative Milestone Thresholds
    // Pass 3: Tighter thresholds to eliminate dead space.
    const scenes = [
      { id: 0, start: 0, end: 0.18 },    // Arrival (Earlier exit for faster reveal)
      { id: 1, start: 0.22, end: 0.78 },   // Archive (Expanded archive window)
      { id: 2, start: 0.85, end: 1.0 },    // Core & Closure
    ];

    const ctx = gsap.context(() => {
      // 2. Continuous Scroll Sync
      ScrollTrigger.create({
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          setScrollProgress(self.progress);
        }
      });

      // 3. Narrative Step Triggering
      scenes.forEach((scene) => {
        ScrollTrigger.create({
          trigger: document.body,
          start: `${scene.start * 100}% top`,
          end: `${scene.end * 100}% top`,
          onToggle: (self) => {
            if (self.isActive) setActiveScene(scene.id);
          },
        });
      });
    });

    return () => ctx.revert();
  }, [setActiveScene, setScrollProgress]);

  return (
    <div className="fixed top-1/2 left-10 -translate-y-1/2 z-50 pointer-events-none hidden md:block">
      <div className="flex flex-col gap-5 opacity-10">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex items-center gap-3">
            <span className="text-[7px] font-black tracking-[0.4em] text-white/50 uppercase">
              {i === 0 ? "Entry" : i === 1 ? "Archive" : "Core"}
            </span>
            <div 
              className={`h-px transition-all duration-1000 ${
                i === activeScene ? "w-8 bg-white opacity-100" : "w-2 bg-white/20"
              }`} 
            />
          </div>
        ))}
      </div>
    </div>
  );
}
