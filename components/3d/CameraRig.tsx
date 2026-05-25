"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useStore } from "@/lib/store";
import projects from "@/lib/data/projects.json";

export default function CameraRig() {
  const scrollProgress = useStore((state) => state.scrollProgress);
  const activeScene = useStore((state) => state.activeScene);
  
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));

  useFrame((state) => {
    const { mouse, camera } = state;

    // 1. Core Z-Plunge
    const zPos = THREE.MathUtils.lerp(8, -12, scrollProgress);
    
    // 2. Scene-Specific Logic
    let xTarget = mouse.x * 1.5;
    let yTarget = mouse.y * 1.0;
    
    if (activeScene === 1) {
      // Archive Phase: Sidestep to frame monoliths
      const sceneStart = 0.25;
      const sceneEnd = 0.6;
      const projectStep = (sceneEnd - sceneStart) / 3;
      
      projects.forEach((_, i) => {
        const pFocus = sceneStart + i * projectStep;
        const dist = Math.abs(scrollProgress - pFocus);
        if (dist < 0.1) {
          // Sidestep camera based on monolith position (alternating -2, 2)
          const sidestep = i % 2 === 0 ? -1.5 : 1.5;
          const focusWeight = 1 - (dist / 0.1);
          xTarget += sidestep * focusWeight;
          targetLookAt.current.set(sidestep * 2, 0, zPos - 2);
        }
      });
    } else if (activeScene === 0) {
      targetLookAt.current.set(0, 0, 0);
    } else {
      targetLookAt.current.set(0, 0, zPos - 10);
    }

    camera.position.lerp(new THREE.Vector3(xTarget, yTarget, zPos), 0.05);
    currentLookAt.current.lerp(targetLookAt.current, 0.04);
    camera.lookAt(currentLookAt.current);
    
    const pCamera = camera as THREE.PerspectiveCamera;
    pCamera.fov = THREE.MathUtils.lerp(35, 45, scrollProgress);
    pCamera.updateProjectionMatrix();
  });
  
  return null;
}
