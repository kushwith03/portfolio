"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { Preload } from "@react-three/drei";
import { useStore } from "@/lib/store";
import Particles from "./Particles";
import Entity from "./Entity";

/**
 * Step 4: Stabilized Camera Rig
 * Refined for "heavier" motion and better framing.
 */
function CameraRig() {
  const scrollProgress = useStore((state) => state.setScrollProgress);
  const activeScene = useStore((state) => state.activeScene);
  const { camera, mouse } = useThree();
  
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));

  useFrame(() => {
    // 1. Heavier Z-Plunge (Decreased interpolation speed)
    const zPos = THREE.MathUtils.lerp(8, -10, useStore.getState().scrollProgress);
    
    // 2. Viscous Mouse Parallax
    const xPos = mouse.x * 1.0;
    const yPos = mouse.y * 0.6;

    camera.position.lerp(new THREE.Vector3(xPos, yPos, zPos), 0.035);

    // 3. Narrative Focus Points
    if (activeScene === 0) targetLookAt.current.set(0, 0, 0);
    if (activeScene === 1) targetLookAt.current.set(mouse.x * 0.5, -0.2, zPos - 5);

    currentLookAt.current.lerp(targetLookAt.current, 0.02);
    camera.lookAt(currentLookAt.current);
  });
  
  return null;
}

export default function Scene() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="fixed inset-0 bg-[#010101]" />;

  return (
    <div className="fixed inset-0 -z-10 bg-[#010101]">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 32 }}
        // Tight DPR clamp for production consistency
        dpr={[1, 1.25]}
        gl={{ 
          antialias: true,
          alpha: true,
          powerPreference: "high-performance"
        }}
      >
        <color attach="background" args={["#010101"]} />
        {/* Step 4: Atmospheric Fog for Depth */}
        <fogExp2 attach="fog" args={["#010101", 0.06]} />

        <Suspense fallback={null}>
          <ambientLight intensity={0.05} />
          
          <CameraRig />
          <Particles />
          <Entity />
          
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}
