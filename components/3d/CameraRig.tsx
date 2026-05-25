"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useStore } from "@/lib/store";
import projects from "@/lib/data/projects.json";

/**
 * Camera Movement System
 * Refined for Pass 3:
 * - Implements 'Transition Corridor' easing.
 * - Dynamic framing for project artifacts.
 * - Smooth Z-Axis plunging with increased weight.
 */
export default function CameraRig() {
  const scrollProgress = useStore((state) => state.scrollProgress);
  const activeScene = useStore((state) => state.activeScene);
  const { camera, mouse } = useThree();
  
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));

  useFrame(() => {
    // 1. Z-Plunge Easing (Corridor Effect)
    // We use a smoother easing for the plunge to avoid 'section-jumping' feel
    const targetZ = THREE.MathUtils.lerp(8, -12, scrollProgress);
    
    // 2. Viscous Mouse Parallax
    const xPos = mouse.x * 1.5;
    const yPos = mouse.y * 1.0;

    camera.position.lerp(new THREE.Vector3(xPos, yPos, targetZ), 0.04);

    // 3. Dynamic Narrative Framing
    if (activeScene === 0) {
      // Hero Framing: Focus on central entity
      targetLookAt.current.set(0, 0, 0);
    } else if (activeScene === 1) {
      // Archive Framing: Lead the camera into the corridor
      const sceneStart = 0.22;
      const sceneEnd = 0.78;
      const projectStep = (sceneEnd - sceneStart) / projects.length;
      
      let found = false;
      projects.forEach((_, i) => {
        const pFocus = sceneStart + i * projectStep + projectStep / 2;
        const dist = Math.abs(scrollProgress - pFocus);
        if (dist < 0.1) {
          const sidestep = i % 2 === 0 ? -1.5 : 1.5;
          targetLookAt.current.set(sidestep * 1.5, -0.2, targetZ - 3);
          found = true;
        }
      });
      
      if (!found) {
        // Transition Space: Neutral corridor gaze
        targetLookAt.current.set(0, -0.5, targetZ - 10);
      }
    } else {
      // Core Framing: Centralized closure
      targetLookAt.current.set(0, 0, targetZ - 5);
    }

    currentLookAt.current.lerp(targetLookAt.current, 0.03);
    camera.lookAt(currentLookAt.current);
    
    // 4. Adaptive Lens (Cinematic Perspective)
    const targetFOV = THREE.MathUtils.lerp(32, 42, scrollProgress);
    const pCamera = camera as THREE.PerspectiveCamera;
    pCamera.fov = THREE.MathUtils.lerp(pCamera.fov, targetFOV, 0.05);
    pCamera.updateProjectionMatrix();
  });
  
  return null;
}
