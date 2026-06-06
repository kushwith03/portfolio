"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useStore } from "@/lib/store";
import projects from "@/lib/data/projects.json";

/**
 * Camera Movement System
 * Refined for Pass 5:
 * - Accelerated Z-plunge for immediate engagement.
 * - Dynamic framing focused on systems.
 */
export default function CameraRig() {
  const scrollProgress = useStore((state) => state.scrollProgress);
  const activeScene = useStore((state) => state.activeScene);
  const { camera, mouse } = useThree();
  
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));

  useFrame(() => {
    // 1. Calibrated Z-Plunge (Hero ends at 0.15, project 1 focus at ~0.25)
    const targetZ = THREE.MathUtils.lerp(8, -12, scrollProgress);
    
    // 2. Viscous Parallax
    const xPos = mouse.x * 1.5;
    const yPos = mouse.y * 1.0;

    camera.position.lerp(new THREE.Vector3(xPos, yPos, targetZ), 0.05);

    // 3. Dynamic Narrative Framing
    if (activeScene === 0) {
      targetLookAt.current.set(0, 0, 0);
    } else if (activeScene === 1) {
      const sceneStart = 0.16;
      const sceneEnd = 0.85;
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
        targetLookAt.current.set(0, -0.5, targetZ - 8);
      }
    } else {
      targetLookAt.current.set(0, 0, targetZ - 5);
    }

    currentLookAt.current.lerp(targetLookAt.current, 0.04);
    camera.lookAt(currentLookAt.current);
    
    // 4. Adaptive Perspective
    const targetFOV = THREE.MathUtils.lerp(32, 42, scrollProgress);
    const pCamera = camera as THREE.PerspectiveCamera;
    pCamera.fov = THREE.MathUtils.lerp(pCamera.fov, targetFOV, 0.05);
    pCamera.updateProjectionMatrix();
  });
  
  return null;
}
