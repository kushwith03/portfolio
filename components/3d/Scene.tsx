"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Preload } from "@react-three/drei";

import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useStore } from "@/lib/store";
import Entity from "./Entity";
import Particles from "./Particles";
import { Environment, ContactShadows } from "@react-three/drei";

function CameraRig() {
  const scrollProgress = useStore((state) => state.scrollProgress);
  
  useFrame((state) => {
    // Smoother camera inertia
    state.camera.position.lerp(
      new THREE.Vector3(
        state.mouse.x * 1,
        state.mouse.y * 1,
        8 - scrollProgress * 5
      ),
      0.03
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
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance"
        }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <CameraRig />
          
          {/* Environmental Lighting for Refractive Materials */}
          <Environment preset="city" />
          <ambientLight intensity={0.1} />
          
          {/* Main Entity */}
          <Entity />
          
          <Particles count={2000} />
          
          <ContactShadows
            position={[0, -3.5, 0]}
            opacity={0.4}
            scale={20}
            blur={2}
            far={4.5}
          />
          
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}
