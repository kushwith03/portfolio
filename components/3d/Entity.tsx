"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { useStore } from "@/lib/store";

/**
 * Character System: The Architect Companion (Pass 5)
 * - Restored Face Readability: High-intensity emissive eyes and clear pupil visibility.
 * - Strong Contrast: Improved rim lighting and facial plane separation.
 * - Reactive Attention: Pupils lead, head follows with heavy weight.
 */
export default function Entity() {
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Mesh>(null);
  
  // Independent Eye References
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

    // 2. Spatial Positioning
    const xTarget = isHero ? 2.5 + mouse.x * 0.4 : -2.5 + mouse.x * 0.15;
    const yTarget = isHero ? 0.2 + mouse.y * 0.3 : 0.8 + mouse.y * 0.1;
    const zTarget = isHero ? -1 : -3 + scrollProgress * 5;

    targetPos.current.set(xTarget, yTarget, zTarget);
    currentPos.current.lerp(targetPos.current, 0.03);
    
    if (groupRef.current) {
      groupRef.current.position.copy(currentPos.current);
      
      // Intelligent Head Rotation
      const headRotX = -mouseSmooth.current.y * 0.25;
      const headRotY = (mouseSmooth.current.x - 0.5) * 0.25; 
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, headRotX, 0.03);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, headRotY, 0.03);
    }

    // 3. EYE TRACKING RE-STABILIZATION (High Visibility)
    if (pupilLeft.current && pupilRight.current) {
      // Direct tracking within socket bounds
      const targetPupilX = mouse.x * 0.1;
      const targetPupilY = mouse.y * 0.08;

      pupilLeft.current.position.x = THREE.MathUtils.lerp(pupilLeft.current.position.x, targetPupilX, 0.1);
      pupilLeft.current.position.y = THREE.MathUtils.lerp(pupilLeft.current.position.y, targetPupilY, 0.1);
      
      pupilRight.current.position.x = THREE.MathUtils.lerp(pupilRight.current.position.x, targetPupilX, 0.1);
      pupilRight.current.position.y = THREE.MathUtils.lerp(pupilRight.current.position.y, targetPupilY, 0.1);

      // Blink Timing
      const blinkTrigger = Math.sin(t * 0.25 + Math.cos(t * 0.5)) > 0.98;
      const blinkScale = blinkTrigger ? 0.02 : 1;
      
      if (eyeLeft.current && eyeRight.current) {
        eyeLeft.current.scale.y = THREE.MathUtils.lerp(eyeLeft.current.scale.y, blinkScale, 0.2);
        eyeRight.current.scale.y = THREE.MathUtils.lerp(eyeRight.current.scale.y, blinkScale, 0.2);
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
          {/* 1. Main Head Structure: Bright front facing */}
          <mesh ref={headRef} castShadow>
            <sphereGeometry args={[1, 64, 64]} />
            <meshStandardMaterial
              color="#ffffff"
              metalness={0.0}
              roughness={0.8}
              emissive="#ffffff"
              emissiveIntensity={0.05}
            />
          </mesh>

          {/* 2. Defined Eyes: High Readability Pass */}
          <group position={[-0.35, 0.15, 0.9]}>
             <mesh scale={[0.25, 0.25, 0.02]}>
                <sphereGeometry args={[1, 16, 16]} />
                <meshStandardMaterial color="#000000" roughness={1} />
             </mesh>
             <group ref={eyeLeft} position={[0, 0, 0.02]}>
                {/* Glowing Base */}
                <mesh>
                   <sphereGeometry args={[0.18, 16, 16]} />
                   <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={5} />
                </mesh>
                {/* Pupil - High Contrast */}
                <mesh ref={pupilLeft} position={[0, 0, 0.12]}>
                   <sphereGeometry args={[0.08, 16, 16]} />
                   <meshStandardMaterial color="#000000" />
                </mesh>
             </group>
          </group>

          <group position={[0.35, 0.15, 0.9]}>
             <mesh scale={[0.25, 0.25, 0.02]}>
                <sphereGeometry args={[1, 16, 16]} />
                <meshStandardMaterial color="#000000" roughness={1} />
             </mesh>
             <group ref={eyeRight} position={[0, 0, 0.02]}>
                <mesh>
                   <sphereGeometry args={[0.18, 16, 16]} />
                   <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={5} />
                </mesh>
                <mesh ref={pupilRight} position={[0, 0, 0.12]}>
                   <sphereGeometry args={[0.08, 16, 16]} />
                   <meshStandardMaterial color="#000000" />
                </mesh>
             </group>
          </group>
          
          {/* Facial Shadow Plane */}
          <mesh position={[0, -0.4, 0.8]} rotation={[0.6, 0, 0]} scale={[0.5, 0.05, 0.1]}>
             <boxGeometry args={[1, 1, 1]} />
             <meshStandardMaterial color="#000000" opacity={0.2} transparent />
          </mesh>
        </group>
      </Float>

      {/* Narrative Lighting: Strategic Face Exposure */}
      <pointLight position={[0, 0, 3]} intensity={1.2} color="#ffffff" distance={6} />
      <pointLight position={[-5, 5, 2]} intensity={0.5} color="#44ccff" />
      <spotLight position={[5, 10, 5]} intensity={1.5} angle={0.15} penumbra={1} castShadow />
      
      {/* Separation Rim Light */}
      <pointLight position={[0, 0, -3]} intensity={1} color="#ffffff" distance={10} />
    </group>
  );
}
