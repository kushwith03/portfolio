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
    // Expanded for full Engineering Journey (0.0 to 1.0)
    const scenes = [
      { id: 0, start: 0, end: 0.10 },       // Hero
      { id: 1, start: 0.11, end: 0.22 },    // Principles
      { id: 2, start: 0.23, end: 0.34 },    // Experience
      { id: 3, start: 0.35, end: 0.46 },    // Architecture
      { id: 4, start: 0.47, end: 0.72 },    // Projects/Artifacts
      { id: 5, start: 0.73, end: 0.88 },    // Current Focus
      { id: 6, start: 0.89, end: 1.0 },     // Epilogue
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
