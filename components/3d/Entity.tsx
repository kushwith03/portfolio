"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial, Float } from "@react-three/drei";
import * as THREE from "three";
import { useStore } from "@/lib/store";

export default function Entity() {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const internalLightRef = useRef<THREE.PointLight>(null);
  const rimLightRef = useRef<THREE.SpotLight>(null);
  
  const targetPos = useRef(new THREE.Vector3(0, 0, 0));
  const currentPos = useRef(new THREE.Vector3(0, 0, 0));
  const mouseVel = useRef(new THREE.Vector2(0, 0));
  const prevMouse = useRef(new THREE.Vector2(0, 0));
  
  const scrollProgress = useStore((state) => state.scrollProgress);
  const activeScene = useStore((state) => state.activeScene);

  useFrame((state) => {
    const { mouse, clock } = state;
    const t = clock.getElapsedTime();

    // 1. Cinematic Viscous Tracking
    // Larger range and deeper Z involvement
    targetPos.current.set(mouse.x * 4, mouse.y * 3, Math.sin(t * 0.2) * 0.5 + scrollProgress * 5);
    currentPos.current.lerp(targetPos.current, 0.03); // Heavy, luxurious inertia
    
    // 2. Velocity Sensing for Physical Reaction
    mouseVel.current.set(mouse.x - prevMouse.current.x, mouse.y - prevMouse.current.y);
    const speed = mouseVel.current.length();
    prevMouse.current.copy(mouse);

    if (groupRef.current) {
      groupRef.current.position.copy(currentPos.current);
      
      // Luxurious Spatial Rotation
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, mouse.x * 0.8, 0.03);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -mouse.y * 0.8, 0.03);
      groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, -mouseVel.current.x * 6, 0.03);
    }

    // 3. Emotional State Logic
    const isCore = activeScene === 2;
    const isArchive = activeScene === 1;
    
    const breatheSpeed = isCore ? 0.3 : 1.2;
    const breatheIntensity = isCore ? 0.02 : 0.05;
    const breathe = Math.sin(t * breatheSpeed) * breatheIntensity; 

    if (meshRef.current) {
      const material = meshRef.current.material as any;
      
      // Physical "Squish" and Distortion
      const targetDistortion = (isCore ? 0.05 : 0.2) + speed * 12;
      material.distortion = THREE.MathUtils.lerp(material.distortion, targetDistortion, 0.05);
      material.thickness = THREE.MathUtils.lerp(material.thickness, 1.5 + speed * 5, 0.05);
      
      // Cinematic Scaling (Entity becomes more prominent in Hero)
      const baseScale = isCore ? 1.2 : isArchive ? 1.5 : 2.2;
      meshRef.current.scale.setScalar(THREE.MathUtils.lerp(meshRef.current.scale.x, baseScale + breathe + speed * 0.8, 0.05));

      // 4. Intelligence Pulse (Light System)
      if (internalLightRef.current) {
        internalLightRef.current.intensity = THREE.MathUtils.lerp(
          internalLightRef.current.intensity,
          (isCore ? 1 : 2.5) + speed * 25 + Math.sin(t * 4) * 0.2,
          0.1
        );
        const targetColor = isCore ? "#ffffff" : isArchive ? "#ffaa00" : "#44ccff";
        internalLightRef.current.color.lerp(new THREE.Color(targetColor), 0.05);
      }

      if (rimLightRef.current) {
        rimLightRef.current.position.set(mouse.x * 10, mouse.y * 10, 5);
        rimLightRef.current.intensity = 2 + speed * 10;
      }
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.3}>
        <mesh ref={meshRef} castShadow>
          <sphereGeometry args={[1, 256, 256]} /> {/* High detail for smoothness */}
          <MeshTransmissionMaterial
            backside
            backsideThickness={0.3}
            thickness={1.5}
            samples={16}
            transmission={1}
            clearcoat={1}
            clearcoatRoughness={0}
            roughness={0.05}
            chromaticAberration={0.12}
            anisotropy={0.5}
            distortion={0.2}
            distortionScale={0.4}
            temporalDistortion={0.08}
            color="#ffffff"
            attenuationDistance={0.6}
            attenuationColor="#ffffff"
            transparent
          />
        </mesh>
      </Float>

      {/* Internal Intelligence Core */}
      <pointLight ref={internalLightRef} position={[0, 0, 0]} intensity={2} color="#44ccff" distance={6} />
      
      {/* Cinematic Rim Lighting */}
      <spotLight 
        ref={rimLightRef} 
        position={[5, 5, 5]} 
        intensity={2} 
        angle={0.5} 
        penumbra={1} 
        color="#ffffff" 
      />
      
      {/* Subtle Spatial Bloom Proxy */}
      <mesh scale={1.1}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial color="#44ccff" transparent opacity={0.01} side={THREE.BackSide} />
      </mesh>
    </group>
  );
}
