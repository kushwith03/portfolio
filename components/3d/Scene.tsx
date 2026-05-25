"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Preload } from "@react-three/drei";

import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useStore } from "@/lib/store";
import Entity from "./Entity";
import Particles from "./Particles";
import CameraRig from "./CameraRig";
import { Environment, ContactShadows } from "@react-three/drei";

export default function Scene() {
  return (
    <div className="fixed inset-0 -z-10 bg-[#050505]">
      <Canvas
        shadows
        camera={{ position: [0, 0, 8], fov: 35 }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance"
        }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          {/* Orchestration System */}
          <CameraRig />
          
          {/* Global Lighting Atmosphere */}
          <Environment preset="city" />
          <ambientLight intensity={0.1} />
          
          {/* Spatial Inhabitants */}
          <Entity />
          <Particles count={2500} />
          
          <ContactShadows
            position={[0, -3.5, 0]}
            opacity={0.3}
            scale={20}
            blur={2.5}
            far={4}
          />
          
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}
