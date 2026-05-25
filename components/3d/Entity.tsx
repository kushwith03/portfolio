"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { useStore } from "@/lib/store";

/**
 * Step 3: Premium Sculptural Entity
 * Uses MeshStandardMaterial for production stability.
 * Focuses on silhouette and restrained motion.
 */
export default function Entity() {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  
  const targetPos = useRef(new THREE.Vector3(0, 0, 0));
  const currentPos = useRef(new THREE.Vector3(0, 0, 0));
  
  const scrollProgress = useStore((state) => state.scrollProgress);

  useFrame((state) => {
    const { mouse, clock } = state;
    const t = clock.getElapsedTime();

    // 1. Position Sync (Viscous follow)
    targetPos.current.set(mouse.x * 2, mouse.y * 1.5, scrollProgress * 2);
    currentPos.current.lerp(targetPos.current, 0.04);
    
    if (groupRef.current) {
      groupRef.current.position.copy(currentPos.current);
      
      // Subdued Rotation
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, mouse.x * 0.3, 0.05);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -mouse.y * 0.3, 0.05);
    }

    if (meshRef.current) {
      // 2. Gentle Breathing Scale
      const breathe = Math.sin(t * 0.8) * 0.02;
      meshRef.current.scale.setScalar(1.2 + breathe);
      
      // 3. Constant Sculptural Drift
      meshRef.current.rotation.z = t * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={1} rotationIntensity={0.2} floatIntensity={0.2}>
        <mesh ref={meshRef} castShadow>
          {/* Using Icosahedron for premium sculptural geometry */}
          <icosahedronGeometry args={[1, 15]} /> 
          <meshStandardMaterial
            color="#f0f0f0"
            metalness={0.15}
            roughness={0.35}
            emissive="#ffffff"
            emissiveIntensity={0.05}
          />
        </mesh>
      </Float>

      {/* Local Lighting: 1 Key, 1 Rim */}
      <pointLight position={[2, 2, 2]} intensity={0.8} />
      <pointLight position={[-2, -2, -2]} intensity={0.4} color="#44ccff" />
    </group>
  );
}
