"use client";

import { useEffect, useRef } from "react";
import { useStore } from "@/lib/store";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

import { SCENES } from "@/lib/constants";

const SCENE_MAP = [
  { id: SCENES.HOME, target: "#home" },
  { id: SCENES.PROJECTS, target: "#projects" },
  { id: SCENES.EXPERIENCE, target: "#experience" },
  { id: SCENES.STACK, target: "#stack" },
  { id: SCENES.CONTACT, target: "#contact" },
];

/**
 * Global Cinematic Controller
 * Tighter narrative pacing Pass 6.
 * Unified Physical Mapping: Sections now activate exactly when their DOM containers enter the viewport.
 */
export default function CinematicController() {
  const setActiveScene = useStore((state) => state.setActiveScene);

  useEffect(() => {
    const ctx = gsap.context(() => {
      SCENE_MAP.forEach((scene) => {
        ScrollTrigger.create({
          trigger: scene.target,
          start: "top center",
          end: "bottom center",
          onToggle: (self) => {
            if (self.isActive) setActiveScene(scene.id);
          },
        });
      });
    });

    return () => ctx.revert();
  }, [setActiveScene]);

  return null;
}
