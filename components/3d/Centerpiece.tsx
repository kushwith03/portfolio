"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Float, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

import { useStore } from "@/lib/store";

export default function Centerpiece() {
  const meshRef = useRef<THREE.Mesh>(null);
  const scrollProgress = useStore((state) => state.scrollProgress);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.cos(t / 4) / 8 + scrollProgress * 2;
      meshRef.current.rotation.y = Math.sin(t / 4) / 8 + scrollProgress * 5;
      meshRef.current.position.y = Math.sin(t / 2) / 10 - scrollProgress * 2;
      meshRef.current.position.z = scrollProgress * 3;
    }
  });

  return (
    <group>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh ref={meshRef}>
          <octahedronGeometry args={[2, 0]} />
          <MeshDistortMaterial
            color="#222"
            speed={2}
            distort={0.4}
            radius={1}
            roughness={0.1}
            metalness={0.8}
          />
        </mesh>
      </Float>
      
      {/* Warm Environmental Lighting */}
      <pointLight position={[5, 5, 5]} intensity={2} color="#ffaa00" />
      <pointLight position={[-5, -5, -5]} intensity={1} color="#0088ff" />
      <spotLight
        position={[0, 10, 0]}
        angle={0.15}
        penumbra={1}
        intensity={2}
        castShadow
      />
    </group>
  );
}
