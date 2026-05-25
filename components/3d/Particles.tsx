"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Step 2: Layered Atmospheric Particles
 * Strict 200 count limit across 3 depth layers.
 * Increased visibility and slow cinematic drift.
 */
export default function Particles() {
  const count = 200;
  
  const [positions, sizes, opacities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sz = new Float32Array(count);
    const op = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      // Wide spatial distribution for depth layering
      pos[i * 3] = (Math.random() - 0.5) * 25;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 25;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20 - 5;
      
      // Variable sizes for parallax depth feeling
      sz[i] = Math.random() * 0.1 + 0.05;
      
      // Brighter base opacity for better visibility
      op[i] = Math.random() * 0.4 + 0.2;
    }
    return [pos, sz, op];
  }, []);

  const nearRef = useRef<THREE.Points>(null);
  const midRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const { mouse } = state;

    if (nearRef.current) {
      // Near layer reacts more to mouse
      nearRef.current.position.x = THREE.MathUtils.lerp(nearRef.current.position.x, mouse.x * 0.5, 0.02);
      nearRef.current.position.y = THREE.MathUtils.lerp(nearRef.current.position.y, mouse.y * 0.5, 0.02);
      nearRef.current.rotation.y = t * 0.02;
    }

    if (midRef.current) {
      // Deep drift
      midRef.current.rotation.y = t * 0.01;
      midRef.current.position.y = Math.sin(t * 0.5) * 0.2;
    }
  });

  return (
    <group>
      {/* 1. Near Layer (Active) */}
      <points ref={nearRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={count / 2}
            array={positions.slice(0, (count / 2) * 3)}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.08}
          color="#ffffff"
          transparent
          opacity={0.4}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* 2. Mid/Far Layer (Ambient) */}
      <points ref={midRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={count / 2}
            array={positions.slice((count / 2) * 3)}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.04}
          color="#44ccff"
          transparent
          opacity={0.2}
          sizeAttenuation
          depthWrite={false}
        />
      </points>
    </group>
  );
}
