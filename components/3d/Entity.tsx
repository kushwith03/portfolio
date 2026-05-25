"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { useStore } from "@/lib/store";

/**
 * Character System: The Architect Companion (Pass 3)
 * - Editorial Split: Positioned in the right third of the screen.
 * - Intelligent Attention: Independent eye-tracking with pupil system.
 * - Behavior: Eyes lead, head follows with heavy inertia.
 */
export default function Entity() {
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Mesh>(null);
  
  // Independent Eye References
  const eyeLeftGroup = useRef<THREE.Group>(null);
  const eyeRightGroup = useRef<THREE.Group>(null);
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
    const isArchive = activeScene === 1;

    // 1. Damped Mouse State
    mouseSmooth.current.lerp(mouse, 0.05);

    // 2. Editorial Composition (Right Third Positioning)
    // Desktop: Shifted to right (+2.5). Mobile: Subtle background centering.
    const xTarget = isHero ? 2.5 + mouse.x * 0.4 : -2.5 + mouse.x * 0.15;
    const yTarget = isHero ? 0.2 + mouse.y * 0.3 : 0.8 + mouse.y * 0.1;
    const zTarget = isHero ? -1 : -3 + scrollProgress * 5;

    targetPos.current.set(xTarget, yTarget, zTarget);
    currentPos.current.lerp(targetPos.current, 0.03);
    
    if (groupRef.current) {
      groupRef.current.position.copy(currentPos.current);
      
      // Intelligent Head Rotation (Delayed Follow)
      const headRotX = -mouseSmooth.current.y * 0.25;
      const headRotY = (mouseSmooth.current.x - 0.5) * 0.25; // Adjusted for right-side bias
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, headRotX, 0.03);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, headRotY, 0.03);
    }

    // 3. High-Fidelity Eye Tracking (Independent & Responsive)
    if (eyeLeftGroup.current && eyeRightGroup.current) {
      // Eyes lead the movement (Fast response)
      const lookX = mouse.x * 0.4;
      const lookY = mouse.y * 0.3;

      eyeLeftGroup.current.rotation.set(lookY, lookX, 0);
      eyeRightGroup.current.rotation.set(lookY, lookX, 0);

      // Procedural Blink & Gaze Drift
      const blink = Math.sin(t * 0.3) > 0.99 ? 0.05 : 1;
      const drift = Math.sin(t * 1.5) * 0.005;
      
      eyeLeftGroup.current.scale.y = THREE.MathUtils.lerp(eyeLeftGroup.current.scale.y, blink, 0.25);
      eyeRightGroup.current.scale.y = THREE.MathUtils.lerp(eyeRightGroup.current.scale.y, blink, 0.25);
      
      eyeLeftGroup.current.position.y = 0.15 + drift;
      eyeRightGroup.current.position.y = 0.15 + drift;
    }

    if (headRef.current) {
      // Gentle breathing
      const breathe = Math.sin(t * 0.6) * 0.01;
      headRef.current.scale.setScalar(1.2 + breathe);
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={0.4} rotationIntensity={0.02} floatIntensity={0.05}>
        <group>
          {/* 1. Main Head Structure */}
          <mesh ref={headRef} castShadow>
            <sphereGeometry args={[1, 64, 64]} />
            <meshStandardMaterial
              color="#ffffff"
              metalness={0.05}
              roughness={0.7}
              emissive="#ffffff"
              emissiveIntensity={0.02}
            />
          </mesh>

          {/* 2. Structured Eye Sockets */}
          <group position={[-0.35, 0.15, 0.85]}>
             <mesh scale={[0.3, 0.3, 0.1]}>
                <sphereGeometry args={[1, 16, 16]} />
                <meshStandardMaterial color="#000000" roughness={1} opacity={0.4} transparent />
             </mesh>
             {/* Independent Eye Ball (invisible, used for rotation) */}
             <group ref={eyeLeftGroup}>
                {/* Visual Pupil/Iris system */}
                <mesh position={[0, 0, 0.1]}>
                   <sphereGeometry args={[0.15, 16, 16]} />
                   <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} />
                </mesh>
                <mesh ref={pupilLeft} position={[0, 0, 0.18]}>
                   <sphereGeometry args={[0.06, 16, 16]} />
                   <meshStandardMaterial color="#000000" emissive="#44ccff" emissiveIntensity={1} />
                </mesh>
             </group>
          </group>

          <group position={[0.35, 0.15, 0.85]}>
             <mesh scale={[0.3, 0.3, 0.1]}>
                <sphereGeometry args={[1, 16, 16]} />
                <meshStandardMaterial color="#000000" roughness={1} opacity={0.4} transparent />
             </mesh>
             <group ref={eyeRightGroup}>
                <mesh position={[0, 0, 0.1]}>
                   <sphereGeometry args={[0.15, 16, 16]} />
                   <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} />
                </mesh>
                <mesh ref={pupilRight} position={[0, 0, 0.18]}>
                   <sphereGeometry args={[0.06, 16, 16]} />
                   <meshStandardMaterial color="#000000" emissive="#44ccff" emissiveIntensity={1} />
                </mesh>
             </group>
          </group>
          
          {/* 3. Defined Jaw/Chin silhouette */}
          <mesh position={[0, -0.6, 0.6]} rotation={[0.4, 0, 0]} scale={[0.6, 0.1, 0.2]}>
             <boxGeometry args={[1, 1, 1]} />
             <meshStandardMaterial color="#000000" opacity={0.15} transparent />
          </mesh>
        </group>
      </Float>

      {/* Narrative Lighting */}
      <pointLight position={[1, 1, 2]} intensity={0.5} color="#ffffff" />
      <pointLight position={[-4, 2, -2]} intensity={0.2} color="#3399ff" />
      <spotLight position={[5, 10, 5]} intensity={0.4} angle={0.2} penumbra={1} castShadow />
    </group>
  );
}
