"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { useStore } from "@/lib/store";

/**
 * Character System: The Architect Companion (Pass 9 - FORCED SILHOUETTE)
 * - Material: Lighter 'Engineered Gray' (#9A9A9A) for maximum background separation.
 * - Lighting: High-visibility rim lights (top/right/bottom) and frontal fill.
 * - Visibility Priority: Forcing head presence while keeping glowing cyan eyes focal.
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

    // 2. Spatial Positioning
    const xTarget = isHero ? 2.5 + mouse.x * 0.4 : -2.5 + mouse.x * 0.15;
    const yTarget = isHero ? 0.6 + mouse.y * 0.3 : 0.8 + mouse.y * 0.1;
    const zTarget = isHero ? -1 : -3 + scrollProgress * 5;

    targetPos.current.set(xTarget, yTarget, zTarget);
    currentPos.current.lerp(targetPos.current, 0.03);
    
    if (groupRef.current) {
      groupRef.current.position.copy(currentPos.current);
      
      // Intelligent Rotation
      const headRotX = -mouseSmooth.current.y * 0.25;
      const headRotY = (mouseSmooth.current.x - 0.5) * 0.25; 
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, headRotX, 0.03);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, headRotY, 0.03);
    }

    // 3. Pupil Tracking (Fast)
    if (pupilLeft.current && pupilRight.current) {
      const targetPupilX = mouse.x * 0.15; 
      const targetPupilY = mouse.y * 0.12;

      pupilLeft.current.position.x = THREE.MathUtils.lerp(pupilLeft.current.position.x, targetPupilX, 0.15);
      pupilLeft.current.position.y = THREE.MathUtils.lerp(pupilLeft.current.position.y, targetPupilY, 0.15);
      
      pupilRight.current.position.x = THREE.MathUtils.lerp(pupilRight.current.position.x, targetPupilX, 0.15);
      pupilRight.current.position.y = THREE.MathUtils.lerp(pupilRight.current.position.y, targetPupilY, 0.15);

      // Blink
      const blinkTrigger = Math.sin(t * 0.25 + Math.cos(t * 0.5)) > 0.98;
      const blinkScale = blinkTrigger ? 0.02 : 1;
      
      if (eyeLeft.current && eyeRight.current) {
        eyeLeft.current.scale.y = THREE.MathUtils.lerp(eyeLeft.current.scale.y, blinkScale, 0.25);
        eyeRight.current.scale.y = THREE.MathUtils.lerp(eyeRight.current.scale.y, blinkScale, 0.25);
      }
    }

    if (headRef.current) {
      const breathe = Math.sin(t * 0.6) * 0.01;
      headRef.current.scale.setScalar(1.1 + breathe);
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={0.4} rotationIntensity={0.02} floatIntensity={0.05}>
        <group>
          {/* 1. Main Head Structure - LIGHTER GRAY FORCED VISIBILITY */}
          <mesh ref={headRef} castShadow>
            <sphereGeometry args={[1, 64, 64]} />
            <meshStandardMaterial
              color="#9A9A9A" // Lighter Industrial Gray
              metalness={0.0}
              roughness={0.9} // Matte finish
              emissive="#222222"
              emissiveIntensity={0.01}
            />
          </mesh>

          {/* 2. Structured Eye Sockets */}
          <mesh position={[-0.35, 0.15, 0.92]} scale={[0.3, 0.3, 0.05]}>
             <sphereGeometry args={[1, 16, 16]} />
             <meshStandardMaterial color="#000000" roughness={1} />
          </mesh>
          <mesh position={[0.35, 0.15, 0.92]} scale={[0.3, 0.3, 0.05]}>
             <sphereGeometry args={[1, 16, 16]} />
             <meshStandardMaterial color="#000000" roughness={1} />
          </mesh>

          {/* 3. Eyes System - FORCED OFFSET FORWARD */}
          <group position={[-0.35, 0.15, 0.98]}>
             <group ref={eyeLeft}>
                <mesh>
                   <sphereGeometry args={[0.2, 32, 32]} />
                   <meshStandardMaterial 
                    color="#ffffff" 
                    emissive="#00ffff" 
                    emissiveIntensity={12} 
                    toneMapped={false}
                   />
                </mesh>
                <mesh ref={pupilLeft} position={[0, 0, 0.12]}>
                   <sphereGeometry args={[0.08, 16, 16]} />
                   <meshStandardMaterial color="#000000" roughness={1} />
                </mesh>
             </group>
          </group>

          <group position={[0.35, 0.15, 0.98]}>
             <group ref={eyeRight}>
                <mesh>
                   <sphereGeometry args={[0.2, 32, 32]} />
                   <meshStandardMaterial 
                    color="#ffffff" 
                    emissive="#00ffff" 
                    emissiveIntensity={12} 
                    toneMapped={false}
                   />
                </mesh>
                <mesh ref={pupilRight} position={[0, 0, 0.12]}>
                   <sphereGeometry args={[0.08, 16, 16]} />
                   <meshStandardMaterial color="#000000" roughness={1} />
                </mesh>
             </group>
          </group>
        </group>
      </Float>

      {/* 4. STRATEGIC LIGHTING PASS (FORCED VISIBILITY) */}
      
      {/* Front Fill: Camera Direction */}
      <pointLight position={[0, 0, 5]} intensity={0.5} color="#ffffff" distance={15} />
      
      {/* High-Visibility Rim Lights */}
      <pointLight position={[0, 5, 2]} intensity={1.5} color="#ffffff" distance={10} /> {/* Top Rim */}
      <pointLight position={[5, 0, 2]} intensity={1.5} color="#ffffff" distance={10} /> {/* Right Rim */}
      <pointLight position={[0, -5, 2]} intensity={1.0} color="#ffffff" distance={10} /> {/* Bottom Rim */}
      
      {/* Separation Back Rim */}
      <pointLight position={[0, 0, -3]} intensity={4.0} color="#ffffff" distance={20} />
      
      {/* Atmospheric Softness (No longer dark aura) */}
      <mesh position={[0, 0, -2]} scale={3}>
         <sphereGeometry args={[1, 32, 32]} />
         <meshBasicMaterial color="#3399ff" transparent opacity={0.003} side={THREE.BackSide} />
      </mesh>
    </group>
  );
}
