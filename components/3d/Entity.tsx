"use client";

import { useRef, useMemo, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Sphere } from "@react-three/drei";
import * as THREE from "three";
import { useStore } from "@/lib/store";

/**
 * Character System: The Architect Companion (Observed Intelligence Pass)
 * - Aesthetic: Black Chrome / Deep Reflective Void.
 * - Interaction: 
 *    - Shell: Slow, massive, heavy inertia.
 *    - Internal Optics: Responsive, embedded, anticipatory.
 * - Intelligence: Asymmetrical lead-follow with overshoot settle.
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
  
  // Velocity tracking for observational overshoot
  const eyeVelocity = useRef(new THREE.Vector2(0, 0));
  const eyeOvershoot = useRef(new THREE.Vector2(0, 0));
  
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
    headSmooth.current.lerp(mouse, 0.015); // Increased inertia for 'massive' feel
    
    // OPTICS: Responsive, Anticipatory with Overshoot
    const prevEyePos = eyeSmooth.current.clone();
    
    // Observational Lead: slower response to fast movement, sharper to hover
    const mouseVelocity = Math.abs(mouse.x - mouseSmooth.current.x) + Math.abs(mouse.y - mouseSmooth.current.y);
    const eyeSpeed = mouseVelocity > 0.05 ? 0.08 : 0.15; // Slower to fast, faster to slow/hover

    eyeSmooth.current.lerp(mouse, eyeSpeed);
    
    // Calculate overshoot settle
    eyeVelocity.current.subVectors(eyeSmooth.current, prevEyePos);
    eyeOvershoot.current.add(eyeVelocity.current.multiplyScalar(0.4));
    eyeOvershoot.current.lerp(new THREE.Vector2(0, 0), 0.1); // Settle
    
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
      // Asymmetrical offset (subtle timing/pos variation)
      const trackingX = eyeSmooth.current.x * 0.095 + eyeOvershoot.current.x;
      const trackingY = eyeSmooth.current.y * 0.07 + eyeOvershoot.current.y;

      // Subtle Asymmetry: left eye slightly leads right
      pupilLeft.current.position.x = THREE.MathUtils.lerp(pupilLeft.current.position.x, trackingX, 0.1);
      pupilLeft.current.position.y = THREE.MathUtils.lerp(pupilLeft.current.position.y, trackingY, 0.1);
      
      pupilRight.current.position.x = THREE.MathUtils.lerp(pupilRight.current.position.x, trackingX, 0.08); // Slower
      pupilRight.current.position.y = THREE.MathUtils.lerp(pupilRight.current.position.y, trackingY, 0.08);

      // Focus effect: pupil contraction on proximity
      const pupilSize = 0.035 - proximity.current * 0.012;
      pupilLeft.current.scale.setScalar(pupilSize / 0.035);
      pupilRight.current.scale.setScalar(pupilSize / 0.035);

      // Organic Blink
      const blink = Math.sin(t * 0.12 + Math.cos(t * 0.3)) > 0.993;
      const blinkScale = blink ? 0.01 : 1;
      if (eyeLeft.current && eyeRight.current) {
        eyeLeft.current.scale.y = THREE.MathUtils.lerp(eyeLeft.current.scale.y, blinkScale, 0.2);
        eyeRight.current.scale.y = THREE.MathUtils.lerp(eyeRight.current.scale.y, blinkScale, 0.2);
      }
    }

    // 5. CORE LIFE & RESPONSE
    if (coreRef.current) {
      const breathe = Math.sin(t * 0.4) * 0.005;
      coreRef.current.scale.setScalar(1 + breathe + proximity.current * 0.02);
    }

    if (innerGlowRef.current) {
       // Intelligence glow intensity response
       innerGlowRef.current.intensity = 0.6 + proximity.current * 2.8;
    }

    // Animate emissive materials per frame
    if (leftMat.current && rightMat.current) {
      // Subtle asymmetry in intensity pulse
      const pulseL = 0.015 * Math.sin(t * 0.8);
      const pulseR = 0.015 * Math.sin(t * 0.85 + 0.5);
      
      const targetIntensity = 0.6 + proximity.current * 1.8;
      const currentL = (leftMat.current.emissiveIntensity as number) || 0;
      const currentR = (rightMat.current.emissiveIntensity as number) || 0;

      leftMat.current.emissiveIntensity = THREE.MathUtils.lerp(currentL, targetIntensity + pulseL, 0.1);
      rightMat.current.emissiveIntensity = THREE.MathUtils.lerp(currentR, targetIntensity + pulseR, 0.1);

      const opacityBase = 0.2 + proximity.current * 0.12;
      leftMat.current.opacity = THREE.MathUtils.clamp(opacityBase + pulseL, 0.1, 0.35);
      rightMat.current.opacity = THREE.MathUtils.clamp(opacityBase + pulseR, 0.1, 0.35);
    }
  });

  return (
    <group 
      ref={groupRef}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
    >
      <Float speed={1} rotationIntensity={0.03} floatIntensity={0.06}>
        <group>
          {/* 1. Shell - BLACK CHROME (Massive, Reflective) */}
          <Sphere ref={coreRef} args={[1, 64, 64]}>
            <meshPhysicalMaterial
              color="#000000"
              metalness={1}
              roughness={0.03}
              clearcoat={1}
              clearcoatRoughness={0.01}
              envMapIntensity={1.1}
              reflectivity={1}
            />
          </Sphere>

          {/* 2. Embedded Optical Intelligence (Surface Alignment) */}
          <group position={[0, 0, 0.95]}>
             <pointLight 
               ref={innerGlowRef} 
               color="#0066ff" 
               intensity={1} 
               distance={4} 
             />
             
             {/* Optical System Container */}
             <group position={[0, 0.08, 0.06]}>
                 {/* Internal Glow Points */}
                  <group position={[-0.32, 0.04, 0]}>
                     <group ref={eyeLeft} renderOrder={30}>
                        <Sphere args={[0.065, 32, 32]}>
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
                        {/* Brighter center point (Sharper Core) */}
                        <Sphere args={[0.02, 16, 16]}>
                           <meshStandardMaterial
                              color="#00ffff"
                              emissive="#00ffff"
                              emissiveIntensity={10}
                              toneMapped={false}
                              transparent
                              opacity={0.8}
                              blending={THREE.AdditiveBlending}
                              depthWrite={false}
                           />
                        </Sphere>
                        <mesh ref={pupilLeft} position={[0, 0, 0.04]}>
                           <sphereGeometry args={[0.032, 16, 16]} />
                           <meshStandardMaterial color="#000000" roughness={1} />
                        </mesh>
                     </group>
                  </group>

                  <group position={[0.32, 0.04, 0]}>
                     <group ref={eyeRight} renderOrder={30}>
                        <Sphere args={[0.065, 32, 32]}>
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
                        {/* Brighter center point (Sharper Core) */}
                        <Sphere args={[0.02, 16, 16]}>
                           <meshStandardMaterial
                              color="#00ffff"
                              emissive="#00ffff"
                              emissiveIntensity={10}
                              toneMapped={false}
                              transparent
                              opacity={0.8}
                              blending={THREE.AdditiveBlending}
                              depthWrite={false}
                           />
                        </Sphere>
                        <mesh ref={pupilRight} position={[0, 0, 0.04]}>
                           <sphereGeometry args={[0.032, 16, 16]} />
                           <meshStandardMaterial color="#000000" roughness={1} />
                        </mesh>
                     </group>
                  </group>
             </group>
          </group>

          {/* 4. Glass Detail Ring */}
          <mesh rotation={[0, 0, 0]}>
             <torusGeometry args={[1.01, 0.0005, 16, 120]} />
             <meshStandardMaterial color="#ffffff" transparent opacity={0.03} />
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





