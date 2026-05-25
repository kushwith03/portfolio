"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial, Float, useCursor } from "@react-three/drei";
import * as THREE from "three";
import { useStore } from "@/lib/store";

export default function Entity() {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const internalLightRef = useRef<THREE.PointLight>(null);
  
  const targetPos = useRef(new THREE.Vector3(0, 0, 0));
  const currentPos = useRef(new THREE.Vector3(0, 0, 0));
  const mouseVel = useRef(new THREE.Vector2(0, 0));
  const prevMouse = useRef(new THREE.Vector2(0, 0));
  
  const scrollProgress = useStore((state) => state.scrollProgress);
  const activeScene = useStore((state) => state.activeScene);

  useFrame((state) => {
    const { mouse, clock } = state;
    const t = clock.getElapsedTime();

    // 1. Viscous Cursor Tracking
    targetPos.current.set(mouse.x * 3, mouse.y * 2, scrollProgress * 2);
    currentPos.current.lerp(targetPos.current, 0.035); // Heavy inertia
    
    // 2. Velocity Sensing
    mouseVel.current.set(mouse.x - prevMouse.current.x, mouse.y - prevMouse.current.y);
    const speed = mouseVel.current.length();
    prevMouse.current.copy(mouse);

    if (groupRef.current) {
      groupRef.current.position.copy(currentPos.current);
      
      // Luxurious Rotation
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, mouse.x * 0.5, 0.04);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -mouse.y * 0.5, 0.04);
      groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, -mouseVel.current.x * 4, 0.04);
    }

    // 4. Emotional Breathing & Scene Reaction
    const isCore = activeScene === 2;
    const breatheSpeed = isCore ? 0.4 : 0.8;
    const breatheIntensity = isCore ? 0.01 : 0.03;
    const breathe = Math.sin(t * breatheSpeed) * breatheIntensity; 
    
    if (meshRef.current) {
      const material = meshRef.current.material as any;
      material.distortion = THREE.MathUtils.lerp(material.distortion, (isCore ? 0.05 : 0.15) + speed * 8, 0.06);
      meshRef.current.scale.setScalar(THREE.MathUtils.lerp(meshRef.current.scale.x, (isCore ? 0.8 : 1.2) + breathe + speed * 0.5, 0.05));

      // 5. Reactive Internal Glow
      if (internalLightRef.current) {
        internalLightRef.current.intensity = THREE.MathUtils.lerp(
          internalLightRef.current.intensity,
          (isCore ? 0.5 : 1.5) + speed * 15,
          0.1
        );
        internalLightRef.current.color.lerp(new THREE.Color(isCore ? "#ffffff" : "#44ccff"), 0.05);
      }
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={1} rotationIntensity={0.1} floatIntensity={0.2}>
        <mesh ref={meshRef} castShadow>
          <sphereGeometry args={[1, 128, 128]} />
          <MeshTransmissionMaterial
            backside
            backsideThickness={0.2}
            thickness={0.8}
            samples={12} // Balanced for fluidity
            transmission={1}
            clearcoat={1}
            clearcoatRoughness={0}
            roughness={0.1}
            chromaticAberration={0.08}
            anisotropy={0.3}
            distortion={0.15}
            distortionScale={0.3}
            temporalDistortion={0.05}
            color="#ffffff"
            attenuationDistance={0.4}
            attenuationColor="#ffffff"
          />
        </mesh>
      </Float>

      {/* The Entity's "Soul" */}
      <pointLight ref={internalLightRef} position={[0, 0, 0]} intensity={1.5} color="#44ccff" distance={4} />
      <pointLight position={[1, 1, 1]} intensity={0.5} color="#ffaa00" distance={6} />
      
      {/* Subtle Halo */}
      <mesh scale={1.05}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color="#44ccff" transparent opacity={0.02} side={THREE.BackSide} />
      </mesh>
    </group>
  );
}
