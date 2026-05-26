"use client";

import { useRef, useMemo, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { useStore } from "@/lib/store";

/**
 * Character System: The Architect Companion (Premium Refinement)
 * - Aesthetic: Industrial Ceramic / Matte Technical Finish.
 * - Structure: Engineered rounded core with recessed facial interface.
 * - Interaction: Eye-lead movement with delayed head inertia.
 * - Intelligence: Idle curiosity scanning.
 */
export default function Entity() {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const eyeLeft = useRef<THREE.Group>(null);
  const eyeRight = useRef<THREE.Group>(null);
  const pupilLeft = useRef<THREE.Mesh>(null);
  const pupilRight = useRef<THREE.Mesh>(null);
  
  const targetPos = useRef(new THREE.Vector3(0, 0, 0));
  const currentPos = useRef(new THREE.Vector3(0, 0, 0));
  const mouseSmooth = useRef(new THREE.Vector2(0, 0));
  const eyeSmooth = useRef(new THREE.Vector2(0, 0));
  const headSmooth = useRef(new THREE.Vector2(0, 0));
  
  // Idle state tracking
  const lastMouseMove = useRef(0);
  const idlePos = useRef(new THREE.Vector2(0, 0));
  
  const scrollProgress = useStore((state) => state.scrollProgress);
  const activeScene = useStore((state) => state.activeScene);

  useFrame((state) => {
    const { mouse, clock } = state;
    const t = clock.getElapsedTime();

    const isHero = activeScene === 0;

    // Detect Mouse Movement
    if (Math.abs(mouse.x - mouseSmooth.current.x) > 0.01 || Math.abs(mouse.y - mouseSmooth.current.y) > 0.01) {
      lastMouseMove.current = t;
    }

    const isIdle = t - lastMouseMove.current > 3; // Idle after 3 seconds
    
    if (isIdle) {
      // Subtle curiosity scan
      idlePos.current.x = Math.sin(t * 0.3) * 0.2;
      idlePos.current.y = Math.cos(t * 0.4) * 0.1;
    } else {
      idlePos.current.lerp(mouse, 0.1);
    }

    // 1. Damped Mouse & Intelligent Movement
    // Eye lead: eyes react faster than the head
    eyeSmooth.current.lerp(isIdle ? idlePos.current : mouse, 0.1);
    headSmooth.current.lerp(isIdle ? idlePos.current : mouse, 0.03);
    mouseSmooth.current.copy(mouse);

    // 2. Spatial Positioning
    const xTarget = isHero ? 2.8 + mouse.x * 0.4 : -2.5 + mouse.x * 0.15;
    const yTarget = isHero ? 0.6 + mouse.y * 0.3 : 0.8 + mouse.y * 0.1;
    const zTarget = isHero ? -1 : -3 + scrollProgress * 5;

    targetPos.current.set(xTarget, yTarget, zTarget);
    currentPos.current.lerp(targetPos.current, 0.03);
    
    if (groupRef.current) {
      groupRef.current.position.copy(currentPos.current);
      
      // Deliberate Head Rotation with inertia
      const headRotX = -headSmooth.current.y * 0.15;
      const headRotY = (headSmooth.current.x - (isIdle ? 0 : 0.5)) * 0.2; 
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, headRotX, 0.05);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, headRotY, 0.05);
    }

    // 3. EYE TRACKING (Intelligent Lead)
    if (pupilLeft.current && pupilRight.current) {
      const targetPupilX = eyeSmooth.current.x * 0.1; 
      const targetPupilY = eyeSmooth.current.y * 0.08;

      pupilLeft.current.position.x = THREE.MathUtils.lerp(pupilLeft.current.position.x, targetPupilX, 0.1);
      pupilLeft.current.position.y = THREE.MathUtils.lerp(pupilLeft.current.position.y, targetPupilY, 0.1);
      
      pupilRight.current.position.x = THREE.MathUtils.lerp(pupilRight.current.position.x, targetPupilX, 0.1);
      pupilRight.current.position.y = THREE.MathUtils.lerp(pupilRight.current.position.y, targetPupilY, 0.1);

      // Blink logic
      const blinkTrigger = Math.sin(t * 0.25 + Math.cos(t * 0.5)) > 0.985;
      const blinkScale = blinkTrigger ? 0.01 : 1;
      
      if (eyeLeft.current && eyeRight.current) {
        eyeLeft.current.scale.y = THREE.MathUtils.lerp(eyeLeft.current.scale.y, blinkScale, 0.25);
        eyeRight.current.scale.y = THREE.MathUtils.lerp(eyeRight.current.scale.y, blinkScale, 0.25);
      }
    }

    if (coreRef.current) {
      const breathe = Math.sin(t * 0.4) * 0.004;
      coreRef.current.scale.setScalar(1 + breathe);
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={0.4} rotationIntensity={0.02} floatIntensity={0.05}>
        <group>
          {/* 1. Main Engineered Core - Refined Rounded Geometry */}
          <RoundedBox
            ref={coreRef}
            args={[1.8, 1.8, 1.6]} 
            radius={0.8} 
            smoothness={10}
            castShadow
          >
            <meshPhysicalMaterial
              color="#121212"
              metalness={0.2}
              roughness={0.3}
              clearcoat={1}
              clearcoatRoughness={0.2}
              envMapIntensity={0.8}
            />
          </RoundedBox>

          {/* 2. Recessed Face Shield / Interface */}
          <mesh position={[0, 0, 0.5]} scale={[0.85, 0.6, 0.5]}>
             <sphereGeometry args={[1, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
             <meshPhysicalMaterial 
                color="#050505" 
                roughness={0.05} 
                metalness={0.9}
                clearcoat={1}
             />
          </mesh>

          {/* 3. Refined Eye Sockets */}
          <group position={[0, 0.05, 0.75]}>
            <mesh position={[-0.32, 0.1, 0.02]} scale={[0.22, 0.22, 0.01]}>
               <sphereGeometry args={[1, 32, 32]} />
               <meshStandardMaterial color="#000000" roughness={1} />
            </mesh>
            <mesh position={[0.32, 0.1, 0.02]} scale={[0.22, 0.22, 0.01]}>
               <sphereGeometry args={[1, 32, 32]} />
               <meshStandardMaterial color="#000000" roughness={1} />
            </mesh>

            {/* 4. Eyes - Intelligent Glow */}
            <group position={[-0.32, 0.1, 0.05]}>
               <group ref={eyeLeft}>
                  <mesh>
                     <sphereGeometry args={[0.1, 32, 32]} />
                     <meshStandardMaterial 
                      color="#00ffff" 
                      emissive="#00ffff" 
                      emissiveIntensity={3} 
                      toneMapped={false}
                     />
                  </mesh>
                  <mesh ref={pupilLeft} position={[0, 0, 0.06]}>
                     <sphereGeometry args={[0.035, 16, 16]} />
                     <meshStandardMaterial color="#000000" roughness={1} />
                  </mesh>
               </group>
            </group>

            <group position={[0.32, 0.1, 0.05]}>
               <group ref={eyeRight}>
                  <mesh>
                     <sphereGeometry args={[0.1, 32, 32]} />
                     <meshStandardMaterial 
                      color="#00ffff" 
                      emissive="#00ffff" 
                      emissiveIntensity={3} 
                      toneMapped={false}
                     />
                  </mesh>
                  <mesh ref={pupilRight} position={[0, 0, 0.06]}>
                     <sphereGeometry args={[0.035, 16, 16]} />
                     <meshStandardMaterial color="#000000" roughness={1} />
                  </mesh>
               </group>
            </group>
          </group>

          {/* 5. Minimal Technical Detail */}
          <mesh rotation={[0, 0, 0]} position={[0, 0, 0]}>
             <torusGeometry args={[0.9, 0.001, 16, 100]} />
             <meshStandardMaterial color="#ffffff" transparent opacity={0.1} />
          </mesh>
        </group>
      </Float>

      {/* 6. CINEMATIC LIGHTING REFINEMENT */}
      <rectAreaLight
        position={[0, 5, 10]}
        width={10}
        height={10}
        intensity={0.4}
        color="#ffffff"
      />
      
      <spotLight
        position={[5, 5, 2]}
        angle={0.3}
        penumbra={1}
        intensity={2.5}
        castShadow
        color="#ffffff"
      />
      <spotLight
        position={[-5, 2, -2]}
        angle={0.3}
        penumbra={1}
        intensity={4}
        color="#44ccff"
      />

      <pointLight position={[0, 0, -5]} intensity={3} color="#ffffff" distance={15} />
    </group>
  );
}


