"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial, Float } from "@react-three/drei";
import * as THREE from "three";

export default function Entity() {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  
  const targetPos = useRef(new THREE.Vector3(0, 0, 0));
  const currentPos = useRef(new THREE.Vector3(0, 0, 0));
  const mouseVel = useRef(new THREE.Vector2(0, 0));
  const prevMouse = useRef(new THREE.Vector2(0, 0));

  useFrame((state) => {
    const { mouse, clock } = state;
    const t = clock.getElapsedTime();

    // 1. Target Position Calculation
    targetPos.current.set(mouse.x * 2.5, mouse.y * 1.5, 0);

    // 2. Motion Inertia (Spring feel)
    currentPos.current.lerp(targetPos.current, 0.04);
    
    // 3. Mouse Velocity for Dynamic Distortion
    mouseVel.current.set(mouse.x - prevMouse.current.x, mouse.y - prevMouse.current.y);
    const speed = mouseVel.current.length();
    prevMouse.current.copy(mouse);

    if (groupRef.current) {
      groupRef.current.position.copy(currentPos.current);
      
      // Look towards mouse with inertia
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, mouse.x * 0.4, 0.05);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -mouse.y * 0.4, 0.05);
      
      // Dynamic tilt based on speed
      groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, -mouseVel.current.x * 2, 0.05);
    }

    if (meshRef.current) {
      const material = meshRef.current.material as any;
      
      // 4. Emotional Breathing & Velocity Distortion
      // Material-level "squish" when moving fast
      material.distortion = THREE.MathUtils.lerp(material.distortion, 0.2 + speed * 5, 0.05);
      material.thickness = THREE.MathUtils.lerp(material.thickness, 1 + speed * 2, 0.05);
      
      // Subtle pulse
      const pulse = Math.sin(t * 1.5) * 0.05;
      meshRef.current.scale.setScalar(1 + pulse);
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
        <mesh ref={meshRef} castShadow>
          <sphereGeometry args={[1.2, 64, 64]} />
          <MeshTransmissionMaterial
            backside
            backsideThickness={0.5}
            thickness={1}
            samples={16}
            transmission={0.95}
            clearcoat={1}
            clearcoatRoughness={0}
            roughness={0.15}
            chromaticAberration={0.06}
            anisotropy={0.2}
            distortion={0.2}
            distortionScale={0.4}
            temporalDistortion={0.1}
            color="#ffffff"
            attenuationDistance={0.5}
            attenuationColor="#ffffff"
          />
        </mesh>
      </Float>

      {/* Atmospheric internal glow */}
      <pointLight position={[0, 0, 0]} intensity={1.5} color="#00ffff" distance={3} />
      <pointLight position={[2, 2, 2]} intensity={0.8} color="#ffaa00" distance={5} />
    </group>
  );
}
