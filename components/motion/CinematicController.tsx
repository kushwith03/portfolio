"use client";

import { useEffect, useRef } from "react";
import { useStore } from "@/lib/store";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Global Cinematic Controller
 * Tighter narrative pacing Pass 5.
 * Calibrated for immediate Hero -> Archive engagement.
 */
export default function CinematicController() {
  const activeScene = useStore((state) => state.activeScene);
  const setActiveScene = useStore((state) => state.setActiveScene);
  const setScrollProgress = useStore((state) => state.setScrollProgress);

  useEffect(() => {
    // 1. Narrative Milestone Thresholds
    // Calibrated for a fast, continuous flow (0.0 to 1.0)
    const scenes = [
      { id: 0, start: 0, end: 0.18 },       // Home
      { id: 1, start: 0.19, end: 0.45 },    // Projects
      { id: 2, start: 0.46, end: 0.65 },    // Experience
      { id: 3, start: 0.66, end: 0.85 },    // Stack
      { id: 4, start: 0.86, end: 1.0 },     // Contact
    ];

    const ctx = gsap.context(() => {
      // 2. Linear Scroll Synchronization
      ScrollTrigger.create({
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          setScrollProgress(self.progress);
        }
      });

      // 3. Narrative Milestone Triggering
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

  return null;
}
