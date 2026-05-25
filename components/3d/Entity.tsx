"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { useStore } from "@/lib/store";

/**
 * The Entity: Intelligent Architectural Presence
 * Refined for Pass 3:
 * - Adds 'Cursor Awareness': Hotspot tracking and geometric leaning.
 * - States: Dormant (slow) vs Attentive (responsive).
 * - Narrative Evolution: Changes state/position based on scroll depth.
 */
export default function Entity() {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const internalLightRef = useRef<THREE.PointLight>(null);
  const hotspotRef = useRef<THREE.Mesh>(null);
  
  const targetPos = useRef(new THREE.Vector3(0, 0, 0));
  const currentPos = useRef(new THREE.Vector3(0, 0, 0));
  const mouseSmooth = useRef(new THREE.Vector2(0, 0));
  
  const scrollProgress = useStore((state) => state.scrollProgress);
  const activeScene = useStore((state) => state.activeScene);

  useFrame((state) => {
    const { mouse, clock } = state;
    const t = clock.getElapsedTime();

    // 1. Scene State Logic
    const isHero = activeScene === 0;
    const isArchive = activeScene === 1;
    const isCore = activeScene === 2;

    // 2. Cursor Awareness (Attentive State)
    mouseSmooth.current.lerp(mouse, 0.05);
    const mouseActive = mouse.length() > 0.05;

    // 3. Dynamic Spatial Position
    // Improved Hero -> Archive Relocation
    const xTarget = isHero ? mouse.x * 1.2 : isArchive ? -2.5 + mouse.x * 0.3 : 0;
    const yTarget = isHero ? mouse.y * 1.0 : isArchive ? 0.8 + mouse.y * 0.2 : 0;
    const zTarget = isHero ? 0 : isArchive ? -2 + scrollProgress * 4 : 3;

    targetPos.current.set(xTarget, yTarget, zTarget);
    currentPos.current.lerp(targetPos.current, 0.025);
    
    if (groupRef.current) {
      groupRef.current.position.copy(currentPos.current);
      
      // Intelligent Leaning: Object 'faces' the cursor slightly
      const leanX = -mouseSmooth.current.y * (isHero ? 0.3 : 0.1);
      const leanY = mouseSmooth.current.x * (isHero ? 0.3 : 0.1);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, leanX, 0.05);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, leanY, 0.05);
    }

    // 4. Physical "Life" Simulation
    if (meshRef.current) {
      // Dormant vs Attentive Breathing
      const breatheSpeed = mouseActive ? 1.2 : 0.6;
      const breatheIntensity = mouseActive ? 0.02 : 0.01;
      const breathe = Math.sin(t * breatheSpeed) * breatheIntensity;
      
      const baseScale = isHero ? 1.5 : isArchive ? 0.7 : 0.1;
      meshRef.current.scale.setScalar(THREE.MathUtils.lerp(meshRef.current.scale.x, baseScale + breathe, 0.05));
      
      // Reflective Hotspot tracking
      if (hotspotRef.current) {
        hotspotRef.current.position.set(
          mouseSmooth.current.x * 0.5,
          mouseSmooth.current.y * 0.5,
          0.8
        );
      }

      // Material Reaction
      const mat = meshRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = THREE.MathUtils.lerp(mat.emissiveIntensity, mouseActive ? 0.1 : 0.02, 0.05);
    }

    // 5. Internal Pulse
    if (internalLightRef.current) {
      const pulse = Math.sin(t * 2) * 0.1;
      const targetIntensity = isHero ? 1.5 : isArchive ? 0.4 : 1.0;
      internalLightRef.current.intensity = THREE.MathUtils.lerp(
        internalLightRef.current.intensity, 
        targetIntensity + (mouseActive ? 0.5 : 0) + pulse, 
        0.05
      );
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={0.5} rotationIntensity={0.05} floatIntensity={0.1}>
        <mesh ref={meshRef} castShadow>
          <icosahedronGeometry args={[1, 32]} /> 
          <meshStandardMaterial
            color="#ffffff"
            metalness={0.2}
            roughness={0.4}
            emissive="#ffffff"
            emissiveIntensity={0.02}
          />
          
          {/* Subtle Reflective Hotspot (The 'Glance') */}
          <mesh ref={hotspotRef} scale={0.15}>
             <sphereGeometry args={[1, 16, 16]} />
             <meshBasicMaterial color="#ffffff" transparent opacity={0.3} />
          </mesh>
        </mesh>
      </Float>

      {/* Primary Neural Light */}
      <pointLight ref={internalLightRef} position={[0, 0, 1]} intensity={1} distance={8} color="#ffffff" />
      
      {/* Narrative Ambient Lights */}
      <pointLight position={[-3, 2, -2]} intensity={0.2} color="#3399ff" />
      <pointLight position={[3, -2, -2]} intensity={0.1} color="#ffaa00" />
    </group>
  );
}
