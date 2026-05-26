"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { Preload, Environment, ContactShadows } from "@react-three/drei";
import { useStore } from "@/lib/store";
import Particles from "./Particles";
import Entity from "./Entity";

/**
 * Step 4: Stabilized Camera Rig with Cinematic Pacing
 */
function CameraRig() {
  const scrollProgress = useStore((state) => state.scrollProgress);
  const activeScene = useStore((state) => state.activeScene);
  const { camera, mouse } = useThree();
  
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));

  useFrame(() => {
    // Smoother camera transitions based on scroll
    const zPos = THREE.MathUtils.lerp(8, -10, scrollProgress);
    const xPos = mouse.x * 0.8;
    const yPos = mouse.y * 0.4;

    camera.position.lerp(new THREE.Vector3(xPos, yPos, zPos), 0.03);

    if (activeScene === 0) targetLookAt.current.set(0, 0, 0);
    if (activeScene === 1) targetLookAt.current.set(mouse.x * 0.3, -0.2, zPos - 5);

    currentLookAt.current.lerp(targetLookAt.current, 0.02);
    camera.lookAt(currentLookAt.current);
  });
  
  return null;
}

export default function Scene() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="fixed inset-0 bg-[#010101]" />;

  return (
    <div className="fixed inset-0 -z-10 bg-[#010101]">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 32 }}
        dpr={[1, 1.5]}
        gl={{ 
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          stencil: false,
          depth: true
        }}
      >
        <color attach="background" args={["#010101"]} />
        
        {/* Layered Fog for Spatial Depth */}
        <fog attach="fog" args={["#010101", 5, 25]} />

        <Suspense fallback={null}>
          <ambientLight intensity={0.02} />
          
          {/* Natural reflections for the engineered character */}
          <Environment preset="city" />
          
          <CameraRig />
          <Particles />
          
          {/* Refined Background Gradient Plane for Separation */}
          <mesh position={[0, 0, -10]} scale={[40, 40, 1]}>
             <planeGeometry />
             <meshBasicMaterial color="#0a0a0a" transparent opacity={0.3} />
          </mesh>

          {/* Sublte ground shadow for presence */}
          <ContactShadows 
            position={[0, -4, 0]} 
            opacity={0.4} 
            scale={20} 
            blur={2} 
            far={4.5} 
          />

          <Entity />
          
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}

