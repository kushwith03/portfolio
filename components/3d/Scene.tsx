"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef, useState, useEffect } from "react";
import * as THREE from "three";

/**
 * Step 1: Base Test Component
 * Purely local state, no store, no external assets.
 */
function TestBox() {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta;
      meshRef.current.rotation.y += delta;
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="white" />
    </mesh>
  );
}

export default function Scene() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="fixed inset-0 bg-[#020202]" />;

  return (
    <div className="fixed inset-0 -z-10 bg-[#020202]">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 35 }}
        gl={{ antialias: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <TestBox />
        </Suspense>
      </Canvas>
    </div>
  );
}
