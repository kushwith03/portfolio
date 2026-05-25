"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { useStore } from "@/lib/store";

/**
 * Step 4: Refined Sculptural Entity
 * Introduces asymmetrical geometry and organic procedural drift.
 * Maintains MeshStandardMaterial for absolute stability.
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

    // 1. Heavier Position Sync (Viscous follow)
    // Decreased lerp speed for "expensive" weight
    targetPos.current.set(mouse.x * 1.8, mouse.y * 1.2, scrollProgress * 3);
    currentPos.current.lerp(targetPos.current, 0.025); 
    
    if (groupRef.current) {
      groupRef.current.position.copy(currentPos.current);
      
      // Deliberate Rotation
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, mouse.x * 0.25, 0.03);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -mouse.y * 0.25, 0.03);
    }

    if (meshRef.current) {
      // 2. Procedural Organic Wobble (Low frequency)
      const wobble = Math.sin(t * 0.4) * 0.015;
      meshRef.current.scale.set(
        1.1 + wobble, 
        1.25 - wobble, 
        1.15 + Math.cos(t * 0.3) * 0.01
      );
      
      // 3. Luxurious Drift
      meshRef.current.rotation.z = t * 0.05;
      meshRef.current.rotation.x = Math.sin(t * 0.2) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={0.8} rotationIntensity={0.15} floatIntensity={0.15}>
        <mesh ref={meshRef} castShadow>
          {/* Using higher detail for smoother lighting falloff */}
          <icosahedronGeometry args={[1, 32]} /> 
          <meshStandardMaterial
            color="#e0e0e0"
            metalness={0.2}
            roughness={0.4}
            emissive="#ffffff"
            emissiveIntensity={0.03}
          />
        </mesh>
      </Float>

      {/* Strategic Lighting: Precise Rim and Key */}
      <spotLight 
        position={[5, 5, 5]} 
        intensity={1.2} 
        angle={0.3} 
        penumbra={1} 
        castShadow 
      />
      <pointLight 
        position={[-8, 2, -5]} 
        intensity={0.6} 
        color="#3399ff" 
      />
      <pointLight 
        position={[0, -5, 2]} 
        intensity={0.2} 
        color="#ffffff" 
      />
    </group>
  );
}
