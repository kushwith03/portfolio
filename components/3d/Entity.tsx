"use client";

import { useRef, useMemo, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Sphere } from "@react-three/drei";
import * as THREE from "three";
import { useStore } from "@/lib/store";

/**
 * Character System: The Architect Companion (Embedded Intelligence Pass)
 * - Aesthetic: Black Chrome / Deep Reflective Void.
 * - Interaction: 
 *    - Shell: Slow, massive, heavy inertia.
 *    - Internal Optics: Responsive, embedded, anticipatory.
 * - Intelligence: Cognitive lead-follow with overshoot settle.
 */
export default function Entity() {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const eyeLeft = useRef<THREE.Group>(null);
  const eyeRight = useRef<THREE.Group>(null);
  const pupilLeft = useRef<THREE.Mesh>(null);
  const pupilRight = useRef<THREE.Mesh>(null);
  const innerGlowRef = useRef<THREE.PointLight>(null);
  const leftMat = useRef<THREE.MeshStandardMaterial>(null);
  const rightMat = useRef<THREE.MeshStandardMaterial>(null);

  const targetPos = useRef(new THREE.Vector3(0, 0, 0));
  const currentPos = useRef(new THREE.Vector3(0, 0, 0));
  
  const mouseSmooth = useRef(new THREE.Vector2(0, 0));
  const eyeSmooth = useRef(new THREE.Vector2(0, 0));
  const headSmooth = useRef(new THREE.Vector2(0, 0));
  
  // Velocity tracking for overshoot
  const eyeVelocity = useRef(new THREE.Vector2(0, 0));
  
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

    // 1. PROXIMITY & IDLE DETECTION
    const mouseMoved = Math.abs(mouse.x - mouseSmooth.current.x) > 0.001 || Math.abs(mouse.y - mouseSmooth.current.y) > 0.001;
    if (mouseMoved) lastMouseMove.current = t;
    
    // Calculate proximity (0 to 1) - used for focus/glow
    const distToCenter = Math.sqrt(mouse.x * mouse.x + mouse.y * mouse.y);
    proximity.current = THREE.MathUtils.lerp(proximity.current, isHovered ? 1 : Math.max(0, 1 - distToCenter * 1.5), 0.08);

    // 2. INTELLIGENT MOTION DYNAMICS
    
    // SHELL: Heavy, Slow, Damped
    headSmooth.current.lerp(mouse, 0.02); // Slower for 'massive' feel
    
    // OPTICS: Responsive, Anticipatory with Overshoot
    const prevEyePos = eyeSmooth.current.clone();
    
    // Target with lead focus
    const eyeTarget = new THREE.Vector2(mouse.x, mouse.y);
    eyeSmooth.current.lerp(eyeTarget, 0.15); // Fast lead
    
    // Calculate eye velocity for overshoot settle
    eyeVelocity.current.subVectors(eyeSmooth.current, prevEyePos);
    
    mouseSmooth.current.copy(mouse);

    // 3. SPATIAL POSITIONING
    const xBase = isHero ? 2.8 : -2.5;
    const yBase = isHero ? 0.6 : 0.8;
    const zBase = isHero ? -1 : -3 + scrollProgress * 5;

    // Organic micro-floating
    const driftX = Math.sin(t * 0.4) * 0.04;
    const driftY = Math.cos(t * 0.3) * 0.04;

    targetPos.current.set(
      xBase + mouse.x * (0.35 + proximity.current * 0.1) + driftX,
      yBase + mouse.y * (0.25 + proximity.current * 0.1) + driftY,
      zBase + proximity.current * 0.4
    );
    currentPos.current.lerp(targetPos.current, 0.03);
    
    if (groupRef.current) {
      groupRef.current.position.copy(currentPos.current);
      
      // Shell Rotation (Heavy, Slow)
      const rotX = -headSmooth.current.y * 0.25;
      const rotY = (headSmooth.current.x - (isHero ? 0.5 : 0)) * 0.35;
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, rotX, 0.03);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, rotY, 0.03);
    }

    // 4. EMBEDDED OPTICAL SYSTEM (INTERNAL TRACKING)
    if (pupilLeft.current && pupilRight.current) {
      // Tiny range (5-8% of radius) for internal mechanics feel
      // Velocity influence for the 'overshoot then settle' feel
      const trackingX = eyeSmooth.current.x * 0.095 + eyeVelocity.current.x * 0.2;
      const trackingY = eyeSmooth.current.y * 0.07 + eyeVelocity.current.y * 0.2;

      pupilLeft.current.position.x = THREE.MathUtils.lerp(pupilLeft.current.position.x, trackingX, 0.1);
      pupilLeft.current.position.y = THREE.MathUtils.lerp(pupilLeft.current.position.y, trackingY, 0.1);
      pupilRight.current.position.x = THREE.MathUtils.lerp(pupilRight.current.position.x, trackingX, 0.1);
      pupilRight.current.position.y = THREE.MathUtils.lerp(pupilRight.current.position.y, trackingY, 0.1);

      // Focus effect: pupil contraction on proximity
      const pupilSize = 0.035 - proximity.current * 0.01;
      pupilLeft.current.scale.setScalar(pupilSize / 0.035);
      pupilRight.current.scale.setScalar(pupilSize / 0.035);

      // Organic Blink
      const blink = Math.sin(t * 0.15 + Math.cos(t * 0.4)) > 0.992;
      const blinkScale = blink ? 0.02 : 1;
      if (eyeLeft.current && eyeRight.current) {
        eyeLeft.current.scale.y = THREE.MathUtils.lerp(eyeLeft.current.scale.y, blinkScale, 0.25);
        eyeRight.current.scale.y = THREE.MathUtils.lerp(eyeRight.current.scale.y, blinkScale, 0.25);
      }
    }

    // 5. CORE LIFE & RESPONSE
    if (coreRef.current) {
      const breathe = Math.sin(t * 0.4) * 0.006;
      coreRef.current.scale.setScalar(1 + breathe + proximity.current * 0.02);
    }

    if (innerGlowRef.current) {
       // Intelligence glow intensity response
       innerGlowRef.current.intensity = 0.5 + proximity.current * 2.5;
    }

    // Animate emissive materials per frame
    if (leftMat.current && rightMat.current) {
      const targetIntensity = 0.55 + proximity.current * 1.6;
      const currentL = (leftMat.current.emissiveIntensity as number) || 0;
      const currentR = (rightMat.current.emissiveIntensity as number) || 0;

      leftMat.current.emissiveIntensity = THREE.MathUtils.lerp(currentL, targetIntensity, 0.12);
      rightMat.current.emissiveIntensity = THREE.MathUtils.lerp(currentR, targetIntensity, 0.12);

      const pulse = 0.02 * Math.sin(t * 0.9 + eyeSmooth.current.x * 4);
      leftMat.current.opacity = THREE.MathUtils.clamp(0.18 + proximity.current * 0.10 + pulse, 0.12, 0.32);
      rightMat.current.opacity = THREE.MathUtils.clamp(0.18 + proximity.current * 0.10 - pulse, 0.12, 0.32);
    }
  });

  return (
    <group 
      ref={groupRef}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
    >
      <Float speed={1} rotationIntensity={0.04} floatIntensity={0.08}>
        <group>
          {/* 1. Shell - BLACK CHROME (Massive, Reflective) */}
          <Sphere ref={coreRef} args={[1, 64, 64]}>
            <meshPhysicalMaterial
              color="#000000"
              metalness={1}
              roughness={0.04}
              clearcoat={1}
              clearcoatRoughness={0.01}
              envMapIntensity={1.2}
              reflectivity={1}
            />
          </Sphere>

          {/* 2. Embedded Optical Intelligence (Surface Alignment) */}
          <group position={[0, 0, 0.95]}> {/* Positioned near the shell surface (R=1) */}
             <pointLight 
               ref={innerGlowRef} 
               color="#0066ff" 
               intensity={1} 
               distance={4} 
             />
             
             {/* Optical System Container */}
             <group position={[0, 0.08, 0.06]}> {/* Total Z ~ 1.01 */}
                 {/* Internal Glow Points */}
                  <group position={[-0.32, 0.04, 0]}>
                     <group ref={eyeLeft} renderOrder={30}>
                        <Sphere args={[0.07, 32, 32]}>
                           <meshStandardMaterial
                              ref={leftMat}
                              color="#0044ff"
                              emissive="#0044ff"
                              toneMapped={false}
                              transparent
                              opacity={0.18}
                              blending={THREE.AdditiveBlending}
                              depthWrite={false}
                              depthTest={true}
                           />
                        </Sphere>
                        {/* Inner core glow - brighter center */}
                        <Sphere args={[0.038, 16, 16]}>
                           <meshStandardMaterial
                              color="#0088ff"
                              emissive="#0088ff"
                              emissiveIntensity={0.8}
                              toneMapped={false}
                              transparent
                              opacity={0.24}
                              blending={THREE.AdditiveBlending}
                              depthWrite={false}
                              depthTest={true}
                           />
                        </Sphere>
                        <mesh ref={pupilLeft} position={[0, 0, 0.04]}>
                           <sphereGeometry args={[0.035, 16, 16]} />
                           <meshStandardMaterial color="#000000" roughness={1} />
                        </mesh>
                     </group>
                  </group>

                  <group position={[0.32, 0.04, 0]}>
                     <group ref={eyeRight} renderOrder={30}>
                        <Sphere args={[0.07, 32, 32]}>
                           <meshStandardMaterial
                              ref={rightMat}
                              color="#0044ff"
                              emissive="#0044ff"
                              toneMapped={false}
                              transparent
                              opacity={0.18}
                              blending={THREE.AdditiveBlending}
                              depthWrite={false}
                              depthTest={true}
                           />
                        </Sphere>
                        {/* Inner core glow - brighter center */}
                        <Sphere args={[0.038, 16, 16]}>
                           <meshStandardMaterial
                              color="#0088ff"
                              emissive="#0088ff"
                              emissiveIntensity={0.8}
                              toneMapped={false}
                              transparent
                              opacity={0.24}
                              blending={THREE.AdditiveBlending}
                              depthWrite={false}
                              depthTest={true}
                           />
                        </Sphere>
                        <mesh ref={pupilRight} position={[0, 0, 0.04]}>
                           <sphereGeometry args={[0.035, 16, 16]} />
                           <meshStandardMaterial color="#000000" roughness={1} />
                        </mesh>
                     </group>
                  </group>
             </group>
          </group>



          {/* 4. Glass Detail Ring */}
          <mesh rotation={[0, 0, 0]}>
             <torusGeometry args={[1.01, 0.001, 16, 120]} />
             <meshStandardMaterial color="#ffffff" transparent opacity={0.05} />
          </mesh>
        </group>
      </Float>

      {/* 5. Interaction Focus Light */}
      <spotLight
        position={[4, 4, 6]}
        angle={0.2}
        penumbra={1}
        intensity={1.5 + proximity.current}
        color="#ffffff"
      />
    </group>
  );
}




