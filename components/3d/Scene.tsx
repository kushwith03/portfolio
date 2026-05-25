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
 */
function CameraRig() {
  const scrollProgress = useStore((state) => state.setScrollProgress);
  const activeScene = useStore((state) => state.activeScene);
  const { camera, mouse } = useThree();
  
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));

  useFrame(() => {
    const zPos = THREE.MathUtils.lerp(8, -10, useStore.getState().scrollProgress);
    const xPos = mouse.x * 1.0;
    const yPos = mouse.y * 0.6;

    camera.position.lerp(new THREE.Vector3(xPos, yPos, zPos), 0.035);

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
        dpr={[1, 1.25]}
        gl={{ 
          antialias: true,
          alpha: true,
          powerPreference: "high-performance"
        }}
      >
        <color attach="background" args={["#010101"]} />
        {/* Step 9: Lightened fog to prevent swallowing head silhouette */}
        <fogExp2 attach="fog" args={["#010101", 0.04]} />

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
