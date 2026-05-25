"use client";

import { useEffect, useRef } from "react";
import { useStore } from "@/lib/store";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Global Cinematic Controller
 * Compressed pacing for Pass 2 to reduce excessive dead space.
 * Maps narrative milestones to a tighter scroll timeline.
 */
export default function CinematicController() {
  const activeScene = useStore((state) => state.activeScene);
  const setActiveScene = useStore((state) => state.setActiveScene);
  const setScrollProgress = useStore((state) => state.setScrollProgress);

  useEffect(() => {
    // Compressed Scene Thresholds
    const scenes = [
      { id: 0, start: 0, end: 0.25 },   // Arrival (Compressed from 0.3)
      { id: 1, start: 0.3, end: 0.75 },  // Archive (Dense technical focus)
      { id: 2, start: 0.8, end: 1.0 },   // Core & Epilogue
    ];

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          setScrollProgress(self.progress);
        }
      });

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
      <div className="flex flex-col gap-6 opacity-10">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex items-center gap-3">
            <span className="text-[6px] font-black tracking-[0.4em] text-white/50">
              {i + 1}
            </span>
            <div 
              className={`h-px transition-all duration-1000 ${
                i === activeScene ? "w-6 bg-white opacity-100" : "w-2 bg-white/20"
              }`} 
            />
          </div>
        ))}
      </div>
    </div>
  );
}
