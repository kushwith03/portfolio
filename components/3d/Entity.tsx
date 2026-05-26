"use client";

import { useRef, useMemo, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Sphere } from "@react-three/drei";
import * as THREE from "three";
import { useStore } from "@/lib/store";

/**
 * Character System: The Architect Companion (ALIVE Interaction Pass)
 * - Aesthetic: Black Chrome / Deep Reflective Void.
 * - Interaction: High-inertia observation with intelligent eye-lead.
 * - Life: Organic breathing, micro-floating, and proximity awareness.
 */
export default function Entity() {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const eyeLeft = useRef<THREE.Group>(null);
  const eyeRight = useRef<THREE.Group>(null);
  const pupilLeft = useRef<THREE.Mesh>(null);
  const pupilRight = useRef<THREE.Mesh>(null);
  const innerGlowRef = useRef<THREE.PointLight>(null);
  
  const targetPos = useRef(new THREE.Vector3(0, 0, 0));
  const currentPos = useRef(new THREE.Vector3(0, 0, 0));
  const mouseSmooth = useRef(new THREE.Vector2(0, 0));
  const eyeSmooth = useRef(new THREE.Vector2(0, 0));
  const headSmooth = useRef(new THREE.Vector2(0, 0));
  
  // Interaction State
  const [isHovered, setIsHovered] = useState(false);
  const lastMouseMove = useRef(0);
  const proximity = useRef(0);
  
  const scrollProgress = useStore((state) => state.scrollProgress);
  const activeScene = useStore((state) => state.activeScene);

  useFrame((state) => {
    const { mouse, clock } = state;
    const t = clock.getElapsedTime();

    const isHero = activeScene === 0;

    // 1. DYNAMIC PROXIMITY & IDLE DETECTION
    const mouseMoved = Math.abs(mouse.x - mouseSmooth.current.x) > 0.001 || Math.abs(mouse.y - mouseSmooth.current.y) > 0.001;
    if (mouseMoved) lastMouseMove.current = t;
    const idleTime = t - lastMouseMove.current;
    const isIdle = idleTime > 4;

    // Calculate proximity (0 to 1)
    const distToCenter = Math.sqrt(mouse.x * mouse.x + mouse.y * mouse.y);
    proximity.current = THREE.MathUtils.lerp(proximity.current, isHovered ? 1 : Math.max(0, 1 - distToCenter * 1.5), 0.1);

    // 2. INTELLIGENT MOVEMENT (LEAD & FOLLOW)
    // Eyes lead movement (fast damping)
    eyeSmooth.current.lerp(mouse, 0.12);
    // Head follows with heavy inertia (slow damping)
    headSmooth.current.lerp(mouse, 0.025);
    mouseSmooth.current.copy(mouse);

    // 3. SPATIAL POSITIONING (SCROLL & PROXIMITY)
    const xBase = isHero ? 2.8 : -2.5;
    const yBase = isHero ? 0.6 : 0.8;
    const zBase = isHero ? -1 : -3 + scrollProgress * 5;

    // Subtle drift and proximity reaction
    const driftX = Math.sin(t * 0.5) * 0.05;
    const driftY = Math.cos(t * 0.4) * 0.05;
    const proximityTilt = proximity.current * 0.2;

    targetPos.current.set(
      xBase + mouse.x * (0.4 + proximity.current * 0.2) + driftX,
      yBase + mouse.y * (0.3 + proximity.current * 0.2) + driftY,
      zBase + proximity.current * 0.5
    );
    currentPos.current.lerp(targetPos.current, 0.03);
    
    if (groupRef.current) {
      groupRef.current.position.copy(currentPos.current);
      
      // Observational Rotation (Heavy Inertia)
      const rotX = -headSmooth.current.y * 0.3;
      const rotY = (headSmooth.current.x - (isHero ? 0.5 : 0)) * 0.4;
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, rotX, 0.04);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, rotY, 0.04);
    }

    // 4. EYE SYSTEM (CALM INTELLIGENCE)
    if (pupilLeft.current && pupilRight.current) {
      const pupilX = eyeSmooth.current.x * 0.15; 
      const pupilY = eyeSmooth.current.y * 0.12;

      pupilLeft.current.position.x = THREE.MathUtils.lerp(pupilLeft.current.position.x, pupilX, 0.15);
      pupilLeft.current.position.y = THREE.MathUtils.lerp(pupilLeft.current.position.y, pupilY, 0.15);
      pupilRight.current.position.x = THREE.MathUtils.lerp(pupilRight.current.position.x, pupilX, 0.15);
      pupilRight.current.position.y = THREE.MathUtils.lerp(pupilRight.current.position.y, pupilY, 0.15);

      // Organic Blinking
      const blink = Math.sin(t * 0.2 + Math.cos(t * 0.5)) > 0.99;
      const blinkScale = blink ? 0.05 : 1;
      if (eyeLeft.current && eyeRight.current) {
        eyeLeft.current.scale.y = THREE.MathUtils.lerp(eyeLeft.current.scale.y, blinkScale, 0.3);
        eyeRight.current.scale.y = THREE.MathUtils.lerp(eyeRight.current.scale.y, blinkScale, 0.3);
      }
    }

    // 5. CORE LIFE (BREATHING & GLOW)
    if (coreRef.current) {
      const breathe = Math.sin(t * 0.4) * 0.008;
      const hoverPulse = Math.sin(t * 2) * 0.01 * proximity.current;
      coreRef.current.scale.setScalar(1 + breathe + hoverPulse + proximity.current * 0.05);
    }

    if (innerGlowRef.current) {
      innerGlowRef.current.intensity = THREE.MathUtils.lerp(innerGlowRef.current.intensity, 1 + proximity.current * 2, 0.05);
    }
  });

  return (
    <group 
      ref={groupRef}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
    >
      <Float speed={1.2} rotationIntensity={0.05} floatIntensity={0.1}>
        <group>
          {/* 1. Main Orb - BLACK CHROME REFLECTIVE VOID */}
          <Sphere ref={coreRef} args={[1, 64, 64]}>
            <meshPhysicalMaterial
              color="#000000"
              metalness={1}
              roughness={0.05}
              clearcoat={1}
              clearcoatRoughness={0.02}
              envMapIntensity={1.5}
              reflectivity={1}
            />
          </Sphere>

          {/* 2. Inner Intelligence Glow */}
          <pointLight 
            ref={innerGlowRef} 
            position={[0, 0, 0.5]} 
            color="#00ffff" 
            intensity={1} 
            distance={5} 
          />

          {/* 3. Subtle Facial Interface (Recessed) */}
          <group position={[0, 0, 0.85]} scale={[0.8, 0.5, 0.2]}>
             <Sphere args={[1, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]}>
                <meshPhysicalMaterial 
                   color="#050505" 
                   roughness={0.1} 
                   metalness={0.9}
                   clearcoat={1}
                   transparent
                   opacity={0.8}
                />
             </Sphere>
          </group>

          {/* 4. Intelligent Eyes System */}
          <group position={[0, 0.08, 0.92]}>
             {/* Eye Left */}
             <group position={[-0.3, 0.05, 0]}>
                <group ref={eyeLeft}>
                   <Sphere args={[0.08, 32, 32]}>
                      <meshStandardMaterial 
                         color="#00ffff" 
                         emissive="#00ffff" 
                         emissiveIntensity={4} 
                         toneMapped={false}
                      />
                   </Sphere>
                   <mesh ref={pupilLeft} position={[0, 0, 0.05]}>
                      <sphereGeometry args={[0.03, 16, 16]} />
                      <meshStandardMaterial color="#000000" roughness={1} />
                   </mesh>
                </group>
             </group>

             {/* Eye Right */}
             <group position={[0.3, 0.05, 0]}>
                <group ref={eyeRight}>
                   <Sphere args={[0.08, 32, 32]}>
                      <meshStandardMaterial 
                         color="#00ffff" 
                         emissive="#00ffff" 
                         emissiveIntensity={4} 
                         toneMapped={false}
                      />
                   </Sphere>
                   <mesh ref={pupilRight} position={[0, 0, 0.05]}>
                      <sphereGeometry args={[0.03, 16, 16]} />
                      <meshStandardMaterial color="#000000" roughness={1} />
                   </mesh>
                </group>
             </group>
          </group>

          {/* 5. Minimal Technical Detail (Glass Ring) */}
          <mesh rotation={[0, 0, 0]} position={[0, 0, 0]}>
             <torusGeometry args={[1.02, 0.001, 16, 120]} />
             <meshStandardMaterial color="#ffffff" transparent opacity={0.1} />
          </mesh>
        </group>
      </Float>

      {/* 6. Interaction Lighting */}
      <spotLight
        position={[5, 5, 5]}
        angle={0.15}
        penumbra={1}
        intensity={2 * (1 + proximity.current)}
        color="#ffffff"
        castShadow
      />
      <pointLight position={[0, 0, -3]} intensity={5} color="#44ccff" distance={10} />
    </group>
  );
}



