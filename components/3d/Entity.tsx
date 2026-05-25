"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { useStore } from "@/lib/store";

/**
 * Character System: The Architect Companion (Pass 4)
 * - Fixed Eye Tracking: Real-time pupil movement constrained within sockets.
 * - Dynamic Attention: Pupil leads, head follows with heavy inertia.
 * - Enhanced Readability: Improved rim lighting and silhouette contrast.
 */
export default function Entity() {
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Mesh>(null);
  
  // Independent Eye Elements
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

    // 1. Damped Mouse State for head/body
    mouseSmooth.current.lerp(mouse, 0.05);

    // 2. Spatial Positioning (Editorial Right Split)
    const xTarget = isHero ? 2.5 + mouse.x * 0.4 : -2.5 + mouse.x * 0.15;
    const yTarget = isHero ? 0.2 + mouse.y * 0.3 : 0.8 + mouse.y * 0.1;
    const zTarget = isHero ? -1 : -3 + scrollProgress * 5;

    targetPos.current.set(xTarget, yTarget, zTarget);
    currentPos.current.lerp(targetPos.current, 0.03);
    
    if (groupRef.current) {
      groupRef.current.position.copy(currentPos.current);
      
      // Intelligent Head Rotation (Delayed Follow)
      const headRotX = -mouseSmooth.current.y * 0.25;
      const headRotY = (mouseSmooth.current.x - 0.5) * 0.25; 
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, headRotX, 0.03);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, headRotY, 0.03);
    }

    // 3. ACTUAL EYE TRACKING (Visible Pupil Movement)
    if (pupilLeft.current && pupilRight.current) {
      // Pupils react instantly to mouse within constrained sockets
      // Range is clamped to stay within the white of the eye
      const targetPupilX = mouse.x * 0.08;
      const targetPupilY = mouse.y * 0.06;

      pupilLeft.current.position.x = THREE.MathUtils.lerp(pupilLeft.current.position.x, targetPupilX, 0.1);
      pupilLeft.current.position.y = THREE.MathUtils.lerp(pupilLeft.current.position.y, targetPupilY, 0.1);
      
      pupilRight.current.position.x = THREE.MathUtils.lerp(pupilRight.current.position.x, targetPupilX, 0.1);
      pupilRight.current.position.y = THREE.MathUtils.lerp(pupilRight.current.position.y, targetPupilY, 0.1);

      // Procedural Blink
      const blinkTrigger = Math.sin(t * 0.25 + Math.cos(t * 0.5)) > 0.98;
      const blinkScale = blinkTrigger ? 0.05 : 1;
      
      if (eyeLeft.current && eyeRight.current) {
        eyeLeft.current.scale.y = THREE.MathUtils.lerp(eyeLeft.current.scale.y, blinkScale, 0.2);
        eyeRight.current.scale.y = THREE.MathUtils.lerp(eyeRight.current.scale.y, blinkScale, 0.2);
      }
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
              emissiveIntensity={0.01}
            />
          </mesh>

          {/* 2. Structured Eyes */}
          <group position={[-0.35, 0.15, 0.88]}>
             {/* Socket Depth */}
             <mesh scale={[0.25, 0.25, 0.05]}>
                <sphereGeometry args={[1, 16, 16]} />
                <meshStandardMaterial color="#000000" roughness={1} opacity={0.5} transparent />
             </mesh>
             {/* Eye Whites */}
             <group ref={eyeLeft}>
                <mesh position={[0, 0, 0.05]}>
                   <sphereGeometry args={[0.18, 16, 16]} />
                   <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.2} />
                </mesh>
                {/* Pupil - The moving element */}
                <mesh ref={pupilLeft} position={[0, 0, 0.15]}>
                   <sphereGeometry args={[0.07, 16, 16]} />
                   <meshStandardMaterial color="#000000" emissive="#00ffff" emissiveIntensity={2} />
                </mesh>
             </group>
          </group>

          <group position={[0.35, 0.15, 0.88]}>
             <mesh scale={[0.25, 0.25, 0.05]}>
                <sphereGeometry args={[1, 16, 16]} />
                <meshStandardMaterial color="#000000" roughness={1} opacity={0.5} transparent />
             </mesh>
             <group ref={eyeRight}>
                <mesh position={[0, 0, 0.05]}>
                   <sphereGeometry args={[0.18, 16, 16]} />
                   <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.2} />
                </mesh>
                <mesh ref={pupilRight} position={[0, 0, 0.15]}>
                   <sphereGeometry args={[0.07, 16, 16]} />
                   <meshStandardMaterial color="#000000" emissive="#00ffff" emissiveIntensity={2} />
                </mesh>
             </group>
          </group>
          
          {/* Subtle Shadow Planes for Face Definition */}
          <mesh position={[0, -0.4, 0.8]} rotation={[0.5, 0, 0]} scale={[0.6, 0.05, 0.1]}>
             <boxGeometry args={[1, 1, 1]} />
             <meshStandardMaterial color="#000000" opacity={0.1} transparent />
          </mesh>
        </group>
      </Float>

      {/* Narrative Lighting: Strategic Rim & Face Isolation */}
      <pointLight position={[1, 1, 2.5]} intensity={0.6} color="#ffffff" />
      <pointLight position={[-4, 2, 1]} intensity={0.4} color="#44ccff" />
      <spotLight position={[5, 10, 5]} intensity={0.8} angle={0.2} penumbra={1} castShadow />
      
      {/* High-Contrast Rim Light (Backside) */}
      <pointLight position={[0, 0, -2]} intensity={0.5} color="#ffffff" />
    </group>
  );
}
