"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { useStore } from "@/lib/store";

/**
 * Character System: The Architect Companion (Pass 1)
 * A procedural, lightweight assistant that humanizes the engineering identity.
 * Features: 
 * - Procedural head geometry
 * - Cursor-responsive eye tracking
 * - Heavy-inertia motion logic
 */
export default function Entity() {
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Mesh>(null);
  const eyeLeftRef = useRef<THREE.Mesh>(null);
  const eyeRightRef = useRef<THREE.Mesh>(null);
  
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

    // 2. Cursor Smoothing
    mouseSmooth.current.lerp(mouse, 0.05);

    // 3. Narrative Spatial Positioning
    const xTarget = isHero ? mouse.x * 0.8 : -2.5 + mouse.x * 0.2;
    const yTarget = isHero ? mouse.y * 0.6 : 0.8 + mouse.y * 0.1;
    const zTarget = isHero ? 0 : -2 + scrollProgress * 4;

    targetPos.current.set(xTarget, yTarget, zTarget);
    currentPos.current.lerp(targetPos.current, 0.025);
    
    if (groupRef.current) {
      groupRef.current.position.copy(currentPos.current);
      
      // Subtle head follow rotation
      const headRotX = -mouseSmooth.current.y * 0.2;
      const headRotY = mouseSmooth.current.x * 0.2;
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, headRotX, 0.05);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, headRotY, 0.05);
    }

    // 4. Eye Tracking & Life (Procedural)
    if (eyeLeftRef.current && eyeRightRef.current) {
      // Eyes follow cursor more sharply than the head
      const eyeX = mouseSmooth.current.x * 0.15;
      const eyeY = mouseSmooth.current.y * 0.15;
      
      // Limit eye movement to stay within 'socket' area
      eyeLeftRef.current.position.set(-0.35 + eyeX, 0.1 + eyeY, 0.8);
      eyeRightRef.current.position.set(0.35 + eyeX, 0.1 + eyeY, 0.8);

      // Subtle scaling for "focus"
      const eyeScale = 1 + Math.sin(t * 1.5) * 0.02;
      eyeLeftRef.current.scale.setScalar(eyeScale);
      eyeRightRef.current.scale.setScalar(eyeScale);
    }

    if (headRef.current) {
      // Gentle breathing
      const breathe = Math.sin(t * 0.8) * 0.01;
      headRef.current.scale.setScalar(1.2 + breathe);
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={0.4} rotationIntensity={0.05} floatIntensity={0.1}>
        <group>
          {/* Main Head Structure: Procedural & Lightweight */}
          <mesh ref={headRef} castShadow>
            <sphereGeometry args={[1, 64, 64]} />
            <meshStandardMaterial
              color="#ffffff"
              metalness={0.1}
              roughness={0.4}
              emissive="#ffffff"
              emissiveIntensity={0.02}
            />
          </mesh>

          {/* Intelligent Eyes: Emissive tracking points */}
          <mesh ref={eyeLeftRef} position={[-0.35, 0.1, 0.8]}>
             <sphereGeometry args={[0.08, 32, 32]} />
             <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={2} />
          </mesh>
          
          <mesh ref={eyeRightRef} position={[0.35, 0.1, 0.8]}>
             <sphereGeometry args={[0.08, 32, 32]} />
             <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={2} />
          </mesh>
          
          {/* Subtle neural halo */}
          <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -0.05, 0]}>
             <torusGeometry args={[1.05, 0.005, 16, 100]} />
             <meshBasicMaterial color="#ffffff" transparent opacity={0.05} />
          </mesh>
        </group>
      </Float>

      {/* Narrative Ambient Lights */}
      <pointLight position={[2, 2, 2]} intensity={0.5} />
      <pointLight position={[-2, -2, -2]} intensity={0.2} color="#3399ff" />
    </group>
  );
}
