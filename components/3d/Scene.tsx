"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { useStore } from "@/lib/store";

function CameraRig() {
  const scrollProgress = useStore((state) => state.scrollProgress);
  const activeScene = useStore((state) => state.activeScene);
  const { camera, mouse } = useThree();
  
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));

  useFrame(() => {
    // 1. Z-Plunge logic (Verified safe range)
    const zPos = THREE.MathUtils.lerp(8, -8, scrollProgress);
    
    // 2. Spatial Inertia
    const xPos = mouse.x * 1.2;
    const yPos = mouse.y * 0.8;

    camera.position.lerp(new THREE.Vector3(xPos, yPos, zPos), 0.05);

    // 3. Dynamic Scene Focus
    if (activeScene === 0) targetLookAt.current.set(0, 0, 0);
    if (activeScene === 1) targetLookAt.current.set(mouse.x * 1, -0.5, zPos - 4);

    currentLookAt.current.lerp(targetLookAt.current, 0.03);
    camera.lookAt(currentLookAt.current);
  });
  
  return null;
}

function TestBox() {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.5;
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="white" />
    </mesh>
  );
}

import Particles from "./Particles";

export default function Scene() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="fixed inset-0 bg-[#020202]" />;

  return (
    <div className="fixed inset-0 -z-10 bg-[#020202]">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 35 }}
        // Tight DPR clamp for production safety
        dpr={[1, 1.25]}
        gl={{ antialias: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <CameraRig />
          <Particles />
          <TestBox />
        </Suspense>
      </Canvas>
    </div>
  );
}
}
