"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useStore } from "@/lib/store";

/**
 * Camera Movement System
 * Orchestrates spatial Z-plunge and cinematic easing.
 */
export default function CameraRig() {
  const scrollProgress = useStore((state) => state.scrollProgress);
  const activeScene = useStore((state) => state.activeScene);
  
  // Internal state for smooth interpolation
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));

  useFrame((state) => {
    const { mouse, camera } = state;

    // 1. Z-Plunge Logic
    // Maps scroll 0-1 to camera distance 8 to -10
    const zPos = THREE.MathUtils.lerp(8, -10, scrollProgress);
    
    // 2. Spatial Inertia
    // Smoothly blend mouse parallax with scroll progression
    const xPos = mouse.x * 1.5;
    const yPos = mouse.y * 1.0;

    camera.position.lerp(new THREE.Vector3(xPos, yPos, zPos), 0.05);

    // 3. Dynamic Scene Focus
    // Adjust lookAt targets based on the active scene for cinematic framing
    if (activeScene === 0) targetLookAt.current.set(0, 0, 0);
    if (activeScene === 1) targetLookAt.current.set(mouse.x * 2, -1, zPos - 5);
    if (activeScene === 2) targetLookAt.current.set(0, 0, zPos - 10);

    currentLookAt.current.lerp(targetLookAt.current, 0.03);
    camera.lookAt(currentLookAt.current);
    
    // 4. Focal Length Modulation
    // Widen FOV slightly as we move deeper to increase sense of scale
    camera.fov = THREE.MathUtils.lerp(35, 45, scrollProgress);
    camera.updateProjectionMatrix();
  });
  
  return null;
}
