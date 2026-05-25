"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { useStore } from "@/lib/store";

/**
 * Character System: The Architect Companion (Pass 2)
 * Refined for high readability and subtle emotional presence.
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

    const isHero = activeScene === 0;
    const isArchive = activeScene === 1;

    mouseSmooth.current.lerp(mouse, 0.06);

    // 1. Narrative Spatial Positioning
    const xTarget = isHero ? mouse.x * 0.6 : -2.5 + mouse.x * 0.15;
    const yTarget = isHero ? 0.2 + mouse.y * 0.4 : 0.8 + mouse.y * 0.1;
    const zTarget = isHero ? 0 : -2 + scrollProgress * 4;

    targetPos.current.set(xTarget, yTarget, zTarget);
    currentPos.current.lerp(targetPos.current, 0.03);
    
    if (groupRef.current) {
      groupRef.current.position.copy(currentPos.current);
      
      // Intelligent leaning (Facing cursor)
      const headRotX = -mouseSmooth.current.y * 0.3;
      const headRotY = mouseSmooth.current.x * 0.3;
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, headRotX, 0.05);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, headRotY, 0.05);
    }

    // 2. Eye Intelligence (Readability Pass)
    if (eyeLeftRef.current && eyeRightRef.current) {
      const eyeX = mouseSmooth.current.x * 0.2;
      const eyeY = mouseSmooth.current.y * 0.15;
      
      // Tighter, more expressive tracking
      eyeLeftRef.current.position.set(-0.3 + eyeX, 0.1 + eyeY, 0.95);
      eyeRightRef.current.position.set(0.3 + eyeX, 0.1 + eyeY, 0.95);

      // Procedural Blink System
      const blink = Math.sin(t * 0.2) > 0.98 ? 0.1 : 1;
      eyeLeftRef.current.scale.y = THREE.MathUtils.lerp(eyeLeftRef.current.scale.y, blink, 0.2);
      eyeRightRef.current.scale.y = THREE.MathUtils.lerp(eyeRightRef.current.scale.y, blink, 0.2);
    }

    if (headRef.current) {
      // Gentle breathing scale
      const breathe = Math.sin(t * 0.8) * 0.015;
      headRef.current.scale.setScalar(1.1 + breathe);
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={0.5} rotationIntensity={0.05} floatIntensity={0.1}>
        <group>
          {/* Main Face Structure (Humanized Silhouette) */}
          <mesh ref={headRef} castShadow>
            <sphereGeometry args={[1, 64, 64]} />
            <meshStandardMaterial
              color="#ffffff"
              metalness={0.05}
              roughness={0.6}
              emissive="#ffffff"
              emissiveIntensity={0.05}
            />
          </mesh>

          {/* Procedural Eye Sockets (Shadow Depth) */}
          <mesh position={[-0.3, 0.1, 0.9]} scale={[0.25, 0.25, 0.1]}>
             <sphereGeometry args={[1, 16, 16]} />
             <meshStandardMaterial color="#000000" roughness={1} opacity={0.2} transparent />
          </mesh>
          <mesh position={[0.3, 0.1, 0.9]} scale={[0.25, 0.25, 0.1]}>
             <sphereGeometry args={[1, 16, 16]} />
             <meshStandardMaterial color="#000000" roughness={1} opacity={0.2} transparent />
          </mesh>

          {/* Prominent High-Visibility Eyes */}
          <mesh ref={eyeLeftRef} position={[-0.3, 0.1, 0.95]}>
             <sphereGeometry args={[0.12, 32, 32]} />
             <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={3} />
          </mesh>
          
          <mesh ref={eyeRightRef} position={[0.3, 0.1, 0.95]}>
             <sphereGeometry args={[0.12, 32, 32]} />
             <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={3} />
          </mesh>
          
          {/* Subtle Jaw Line Plane */}
          <mesh position={[0, -0.4, 0.85]} rotation={[0.2, 0, 0]} scale={[0.8, 0.1, 0.1]}>
             <boxGeometry args={[1, 1, 1]} />
             <meshStandardMaterial color="#000000" opacity={0.1} transparent />
          </mesh>
        </group>
      </Float>

      {/* Narrative Lighting: Focused Face Readability */}
      <pointLight position={[0, 0, 2]} intensity={0.6} color="#ffffff" distance={5} />
      <spotLight position={[5, 5, 5]} intensity={0.8} angle={0.3} penumbra={1} castShadow />
      <pointLight position={[-3, 2, -2]} intensity={0.3} color="#44ccff" />
    </group>
  );
}
