"use client";

import { useRef, useState, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useStore } from "@/lib/store";

/**
 * The Entity: Signature Identity System
 * A living architectural construct that evolves through three primary states:
 * 1. ORIENTATION (Hero): Soft, breathing, inquisitive sphere.
 * 2. CLASSIFICATION (Archive): Precise, technical octahedron shards.
 * 3. SYNTHESIS (Core): A single points of light, reflective and still.
 */
export default function Entity() {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const coreLightRef = useRef<THREE.PointLight>(null);
  
  const targetPos = useRef(new THREE.Vector3(0, 0, 0));
  const currentPos = useRef(new THREE.Vector3(0, 0, 0));
  
  const scrollProgress = useStore((state) => state.scrollProgress);
  const activeScene = useStore((state) => state.activeScene);

  // States: 0 = Hero, 1 = Archive, 2 = Core
  useFrame((state) => {
    const { mouse, clock } = state;
    const t = clock.getElapsedTime();

    const isHero = activeScene === 0;
    const isArchive = activeScene === 1;
    const isCore = activeScene === 2;

    // 1. Intentional Positioning
    // Hero: Intimate center. Archive: Technical observer. Core: Abstract focus.
    const xTarget = isHero ? mouse.x * 0.8 : isArchive ? -3 + mouse.x * 0.2 : 0;
    const yTarget = isHero ? mouse.y * 0.5 : isArchive ? 1 + mouse.y * 0.1 : 0;
    const zTarget = isHero ? 0 : isArchive ? -2 + scrollProgress * 3 : 4;

    targetPos.current.set(xTarget, yTarget, zTarget);
    currentPos.current.lerp(targetPos.current, 0.02); // Luxurious, slow inertia
    
    if (groupRef.current) {
      groupRef.current.position.copy(currentPos.current);
      
      // Systematic Rotation
      const rotSpeed = isHero ? 0.05 : isArchive ? 0.2 : 0.01;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, mouse.x * rotSpeed, 0.03);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -mouse.y * rotSpeed, 0.03);
    }

    if (meshRef.current) {
      // 2. Geometry Evolution (Visual Surprise)
      // We use scale and rotation to simulate a "locked" or "unlocked" state
      const targetScale = isHero ? 1.5 : isArchive ? 0.6 : 0.05;
      meshRef.current.scale.setScalar(THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale + Math.sin(t * 0.5) * 0.02, 0.05));
      
      // Constant technical drift
      meshRef.current.rotation.z += 0.005;
      
      // 3. Material Response
      const mat = meshRef.current.material as THREE.MeshStandardMaterial;
      mat.roughness = THREE.MathUtils.lerp(mat.roughness, isArchive ? 0.1 : 0.4, 0.05);
      mat.metalness = THREE.MathUtils.lerp(mat.metalness, isArchive ? 0.8 : 0.2, 0.05);
    }

    // 4. Intelligence Pulse (Warmth vs Precision)
    if (coreLightRef.current) {
      const targetIntensity = isHero ? 1.2 : isArchive ? 0.3 : 0.8;
      coreLightRef.current.intensity = THREE.MathUtils.lerp(coreLightRef.current.intensity, targetIntensity + Math.sin(t * 2) * 0.1, 0.05);
      
      const heroCol = new THREE.Color("#ffffff");
      const archiveCol = new THREE.Color("#3399ff");
      const coreCol = new THREE.Color("#ffaa00");
      
      const targetCol = isHero ? heroCol : isArchive ? archiveCol : coreCol;
      coreLightRef.current.color.lerp(targetCol, 0.01);
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={0.4} rotationIntensity={0.1} floatIntensity={0.15}>
        <mesh ref={meshRef} castShadow>
          {/* A high-detail Icosahedron remains our base sculptural primitive */}
          <icosahedronGeometry args={[1, 32]} /> 
          <meshStandardMaterial
            color="#ffffff"
            metalness={0.2}
            roughness={0.4}
            emissive="#ffffff"
            emissiveIntensity={0.01}
          />
        </mesh>
      </Float>

      {/* The Core Intelligence */}
      <pointLight ref={coreLightRef} position={[0, 0, 1.2]} intensity={1} distance={10} />
      
      {/* Precision Rim Lighting */}
      <spotLight position={[5, 10, 5]} angle={0.2} penumbra={1} intensity={0.6} color="#ffffff" castShadow />
      
      {/* Subtle Shadow Floor Proxy */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -4, 0]} receiveShadow>
         <planeGeometry args={[20, 20]} />
         <meshStandardMaterial color="#000000" transparent opacity={0.05} />
      </mesh>
    </group>
  );
}
