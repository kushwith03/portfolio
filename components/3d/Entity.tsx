"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { useStore } from "@/lib/store";

/**
 * Character System: The Architect Companion (Pass 6 - FORCED READABILITY)
 * - Critical Fix: Eyes physically offset forward (sitting on surface) to prevent clipping.
 * - Contrast Pass: Darkened face material + ultra-high emissive eyes (10x intensity).
 * - Pupil System: Solid black pupils for extreme contrast against emissive iris.
 * - Eye Sockets: Recessed shadow planes for depth.
 */
export default function Entity() {
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Mesh>(null);
  
  // Eye Components
  const eyeLeft = useRef<THREE.Group>(null);
  const eyeRight = useRef<THREE.Group>(null);
  const pupilLeft = useRef<THREE.Mesh>(null);
  const pupilRight = useRef<THREE.Mesh>(null);
  
  const targetPos = useRef(new THREE.Vector3(0, 0, 0));
  const currentPos = useRef(new THREE.Vector3(0, 0, 0));
  const mouseSmooth = useRef(new THREE.Vector2(0, 0));
  
  const scrollProgress = useStore((state) => state.scrollProgress);
  const activeScene = useStore((state) => state.activeScene);

  useFrame((state) => {
    const { mouse, clock } = state;
    const t = clock.getElapsedTime();

    const isHero = activeScene === 0;

    // 1. Damped Mouse State
    mouseSmooth.current.lerp(mouse, 0.05);

    // 2. Spatial Positioning (Stay in the right third)
    const xTarget = isHero ? 2.5 + mouse.x * 0.4 : -2.5 + mouse.x * 0.15;
    const yTarget = isHero ? 0.2 + mouse.y * 0.3 : 0.8 + mouse.y * 0.1;
    const zTarget = isHero ? -1 : -3 + scrollProgress * 5;

    targetPos.current.set(xTarget, yTarget, zTarget);
    currentPos.current.lerp(targetPos.current, 0.03);
    
    if (groupRef.current) {
      groupRef.current.position.copy(currentPos.current);
      
      // Head Follow (Slower than eyes)
      const headRotX = -mouseSmooth.current.y * 0.2;
      const headRotY = (mouseSmooth.current.x - 0.5) * 0.2; 
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, headRotX, 0.03);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, headRotY, 0.03);
    }

    // 3. EYE TRACKING (Forced Visibility Range)
    if (pupilLeft.current && pupilRight.current) {
      // Increased tracking range for visible awareness
      const targetPupilX = mouse.x * 0.12; 
      const targetPupilY = mouse.y * 0.1;

      pupilLeft.current.position.x = THREE.MathUtils.lerp(pupilLeft.current.position.x, targetPupilX, 0.1);
      pupilLeft.current.position.y = THREE.MathUtils.lerp(pupilLeft.current.position.y, targetPupilY, 0.1);
      
      pupilRight.current.position.x = THREE.MathUtils.lerp(pupilRight.current.position.x, targetPupilX, 0.1);
      pupilRight.current.position.y = THREE.MathUtils.lerp(pupilRight.current.position.y, targetPupilY, 0.1);

      // Blink
      const blinkTrigger = Math.sin(t * 0.2) > 0.99;
      const blinkScale = blinkTrigger ? 0.02 : 1;
      
      if (eyeLeft.current && eyeRight.current) {
        eyeLeft.current.scale.y = THREE.MathUtils.lerp(eyeLeft.current.scale.y, blinkScale, 0.25);
        eyeRight.current.scale.y = THREE.MathUtils.lerp(eyeRight.current.scale.y, blinkScale, 0.25);
      }
    }

    if (headRef.current) {
      const breathe = Math.sin(t * 0.6) * 0.01;
      headRef.current.scale.setScalar(1.2 + breathe);
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={0.4} rotationIntensity={0.02} floatIntensity={0.05}>
        <group>
          {/* 1. Main Head Structure - DARKENED for contrast */}
          <mesh ref={headRef} castShadow>
            <sphereGeometry args={[1, 64, 64]} />
            <meshStandardMaterial
              color="#222222" 
              metalness={0.1}
              roughness={0.9}
              emissive="#111111"
              emissiveIntensity={0.01}
            />
          </mesh>

          {/* 2. Recessed Eye Sockets - Depth pass */}
          <mesh position={[-0.35, 0.15, 0.92]} scale={[0.32, 0.32, 0.02]}>
             <sphereGeometry args={[1, 16, 16]} />
             <meshStandardMaterial color="#000000" roughness={1} />
          </mesh>
          <mesh position={[0.35, 0.15, 0.92]} scale={[0.32, 0.32, 0.02]}>
             <sphereGeometry args={[1, 16, 16]} />
             <meshStandardMaterial color="#000000" roughness={1} />
          </mesh>

          {/* 3. Eyes System - FORCED OFFSET FORWARD */}
          <group position={[-0.35, 0.15, 0.96]}>
             <group ref={eyeLeft}>
                {/* High-Intensity Iris Glow */}
                <mesh>
                   <sphereGeometry args={[0.2, 32, 32]} />
                   <meshStandardMaterial 
                    color="#ffffff" 
                    emissive="#00ffff" 
                    emissiveIntensity={10} 
                    toneMapped={false}
                   />
                </mesh>
                {/* Pure Black Pupil */}
                <mesh ref={pupilLeft} position={[0, 0, 0.1]}>
                   <sphereGeometry args={[0.1, 16, 16]} />
                   <meshStandardMaterial color="#000000" roughness={1} />
                </mesh>
             </group>
          </group>

          <group position={[0.35, 0.15, 0.96]}>
             <group ref={eyeRight}>
                <mesh>
                   <sphereGeometry args={[0.2, 32, 32]} />
                   <meshStandardMaterial 
                    color="#ffffff" 
                    emissive="#00ffff" 
                    emissiveIntensity={10} 
                    toneMapped={false}
                   />
                </mesh>
                <mesh ref={pupilRight} position={[0, 0, 0.1]}>
                   <sphereGeometry args={[0.1, 16, 16]} />
                   <meshStandardMaterial color="#000000" roughness={1} />
                </mesh>
             </group>
          </group>
          
          {/* Subtle Eyelid Indentation */}
          <mesh position={[0, -0.4, 0.9]} rotation={[0.6, 0, 0]} scale={[0.6, 0.02, 0.1]}>
             <boxGeometry args={[1, 1, 1]} />
             <meshStandardMaterial color="#000000" opacity={0.3} transparent />
          </mesh>
        </group>
      </Float>

      {/* Point Lights: Direct Face Isolation */}
      <pointLight position={[0, 0, 4]} intensity={1.5} color="#ffffff" distance={8} />
      <spotLight position={[5, 10, 5]} intensity={2} angle={0.15} penumbra={1} castShadow />
      
      {/* Background Separation Rim */}
      <pointLight position={[0, 0, -4]} intensity={2} color="#ffffff" distance={12} />
    </group>
  );
}
