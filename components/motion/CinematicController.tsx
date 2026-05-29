"use client";

import { useEffect, useRef } from "react";
import { useStore } from "@/lib/store";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

import { SCENES, SCENE_THRESHOLDS } from "@/lib/constants";

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
    // 1. Narrative Milestone Thresholds synchronized with SCENE_THRESHOLDS
    const ctx = gsap.context(() => {
      // 1. Narrative Milestone Triggering
      Object.entries(SCENE_THRESHOLDS).forEach(([id, threshold]) => {
        ScrollTrigger.create({
          trigger: document.body,
          start: `${threshold.start * 100}% top`,
          end: `${threshold.end * 100}% top`,
          onToggle: (self) => {
            if (self.isActive) setActiveScene(Number(id) as any);
          },
        });
      });
    });

    return () => ctx.revert();
  }, [setActiveScene, setScrollProgress]);

  return null;
}
