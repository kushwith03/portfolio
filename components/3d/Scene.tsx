"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Preload } from "@react-three/drei";

import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useStore } from "@/lib/store";
import Centerpiece from "./Centerpiece";
import Particles from "./Particles";

function CameraRig() {
  const scrollProgress = useStore((state) => state.scrollProgress);
  
  useFrame((state) => {
    state.camera.position.lerp(
      new THREE.Vector3(
        state.mouse.x * 2,
        state.mouse.y * 2,
        8 - scrollProgress * 5
      ),
      0.05
    );
    state.camera.lookAt(0, 0, 0);
  });
  
  return null;
}

export default function Scene() {
  return (
    <div className="fixed inset-0 -z-10 bg-[#050505]">
      <Canvas
        shadows
        camera={{ position: [0, 0, 8], fov: 35 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <CameraRig />
          <ambientLight intensity={0.2} />
          <Centerpiece />
          <Particles count={2000} />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}
