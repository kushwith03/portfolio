"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial, Float } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";

export default function Entity() {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  
  // Spring-based target for cursor follow
  const targetPos = useRef(new THREE.Vector3(0, 0, 0));
  const currentPos = useRef(new THREE.Vector3(0, 0, 0));

  useFrame((state) => {
    const { mouse, clock } = state;
    const t = clock.getElapsedTime();

    // 1. Update Target Position (Cursor follow)
    // We map mouse (-1 to 1) to a reasonable 3D range
    targetPos.current.set(mouse.x * 2.5, mouse.y * 1.5, 0);

    // 2. Smooth Lerp/Inertia for Movement
    currentPos.current.lerp(targetPos.current, 0.04);
    
    if (groupRef.current) {
      groupRef.current.position.copy(currentPos.current);
      
      // 3. Subtle Rotation Based on Movement
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        mouse.x * 0.4,
        0.05
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        -mouse.y * 0.4,
        0.05
      );
    }

    // 4. Idle "Breathing" and Vertex Distortion
    if (meshRef.current) {
      const material = meshRef.current.material as any;
      if (material.distort !== undefined) {
        // Slow, organic pulse
        material.distort = THREE.MathUtils.lerp(material.distort, 0.3 + Math.sin(t * 0.5) * 0.1, 0.02);
      }
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
        <mesh ref={meshRef} castShadow>
          <sphereGeometry args={[1.2, 64, 64]} />
          {/* 
            Premium Refractive Material 
            Gives the "Soft Futuristic/Glass" feeling
          */}
          <MeshTransmissionMaterial
            backside
            backsideThickness={0.5}
            thickness={1}
            samples={16}
            transmission={0.95}
            clearcoat={1}
            clearcoatRoughness={0}
            roughness={0.1}
            chromaticAberration={0.05}
            anisotropy={0.1}
            distortion={0.2}
            distortionScale={0.5}
            temporalDistortion={0.1}
            color="#ffffff"
            attenuationDistance={0.5}
            attenuationColor="#ffffff"
          />
        </mesh>
      </Float>

      {/* Localized warm light attached to the entity */}
      <pointLight position={[2, 2, 2]} intensity={0.5} color="#ffcc88" />
    </group>
  );
}
