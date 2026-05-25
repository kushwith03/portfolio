"use client";

import { useEffect, useRef } from "react";
import { useStore } from "@/lib/store";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Global Cinematic Controller
 * Tighter timeline calibration for Pass 4.
 * Projects now begin immediately after Hero (0.25 threshold).
 */
export default function CinematicController() {
  const activeScene = useStore((state) => state.activeScene);
  const setActiveScene = useStore((state) => state.setActiveScene);
  const setScrollProgress = useStore((state) => state.setScrollProgress);

  useEffect(() => {
    // Calibrated Narrative Milestones
    // 0.0 - 0.25: Hero Discovery
    // 0.25 - 0.85: Archive Review
    // 0.85 - 1.0: Reflection & Closure
    const scenes = [
      { id: 0, start: 0, end: 0.25 },
      { id: 1, start: 0.26, end: 0.85 },
      { id: 2, start: 0.86, end: 1.0 },
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

  return null; // HUD removed for maximum focus during stabilization
}
