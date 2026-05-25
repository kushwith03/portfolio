"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { useStore } from "@/lib/store";

/**
 * The Entity: Interactive Identity Anchor
 * Acts as a guide through the cinematic universe.
 * Evolves its physical state and lighting based on the narrative context.
 */
export default function Entity() {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const coreLightRef = useRef<THREE.PointLight>(null);
  
  const targetPos = useRef(new THREE.Vector3(0, 0, 0));
  const currentPos = useRef(new THREE.Vector3(0, 0, 0));
  
  const scrollProgress = useStore((state) => state.scrollProgress);
  const activeScene = useStore((state) => state.activeScene);

  // Interaction State
  const mouseVel = useRef(new THREE.Vector2(0, 0));
  const prevMouse = useRef(new THREE.Vector2(0, 0));

  useFrame((state) => {
    const { mouse, clock } = state;
    const t = clock.getElapsedTime();

    // 1. Dynamic Presence Logic
    // The entity shifts its 'engagement' based on scroll depth
    const isHero = activeScene === 0;
    const isArchive = activeScene === 1;
    const isCore = activeScene === 2;

    // 2. Viscous Cursor Interaction
    // In the Hero, it's central and curious. In the Archive, it moves aside to guide.
    const xTarget = isHero ? mouse.x * 1.5 : isArchive ? -2 + mouse.x * 0.5 : mouse.x * 0.5;
    const yTarget = isHero ? mouse.y * 1.2 : isArchive ? 0.5 + mouse.y * 0.3 : mouse.y * 0.2;
    const zTarget = isHero ? 0 : isArchive ? -3 + scrollProgress * 5 : 2;

    targetPos.current.set(xTarget, yTarget, zTarget);
    currentPos.current.lerp(targetPos.current, 0.03);
    
    if (groupRef.current) {
      groupRef.current.position.copy(currentPos.current);
      
      // Intelligent Rotation (Looking at the discovery point)
      const rotX = -mouse.y * (isHero ? 0.4 : 0.1);
      const rotY = mouse.x * (isHero ? 0.4 : 0.1);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, rotX, 0.04);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, rotY, 0.04);
    }

    // 3. Physical State Evolution
    if (meshRef.current) {
      // Morph between 'curious' (elongated) and 'reflective' (compressed)
      const morphFactor = Math.sin(t * 0.5) * 0.02;
      const targetScale = isHero ? 1.4 : isArchive ? 0.8 : 1.1;
      
      meshRef.current.scale.set(
        targetScale + morphFactor,
        targetScale - morphFactor + (isArchive ? 0.2 : 0),
        targetScale + (isCore ? morphFactor : -morphFactor)
      );

      // Subtle pulse tied to 'consciousness'
      const pulse = Math.sin(t * 1.2) * 0.01;
      meshRef.current.position.y += pulse;
    }

    // 4. Atmospheric Lighting Sync
    if (coreLightRef.current) {
      const targetIntensity = isHero ? 1.5 : isArchive ? 0.5 : 2;
      coreLightRef.current.intensity = THREE.MathUtils.lerp(coreLightRef.current.intensity, targetIntensity, 0.05);
      
      // Color shifts based on narrative stage
      const heroCol = new THREE.Color("#ffffff");
      const archiveCol = new THREE.Color("#44ccff");
      const coreCol = new THREE.Color("#ffaa00");
      
      const targetCol = isHero ? heroCol : isArchive ? archiveCol : coreCol;
      coreLightRef.current.color.lerp(targetCol, 0.02);
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={0.6} rotationIntensity={0.1} floatIntensity={0.1}>
        <mesh ref={meshRef} castShadow>
          <icosahedronGeometry args={[1, 32]} /> 
          <meshStandardMaterial
            color="#f5f5f5"
            metalness={0.2}
            roughness={0.3}
            emissive="#ffffff"
            emissiveIntensity={0.02}
          />
        </mesh>
      </Float>

      {/* The Guiding Light */}
      <pointLight ref={coreLightRef} position={[0, 0, 1]} intensity={1} distance={8} />
      
      {/* Soft Environmental Rim */}
      <spotLight position={[5, 10, 5]} angle={0.15} penumbra={1} intensity={0.5} color="#ffffff" />
    </group>
  );
}
