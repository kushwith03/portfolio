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
  const targetCamPos = useRef(new THREE.Vector3(0, 0, 8));

  useFrame(() => {
    // 1. Dynamic Camera Positioning based on Narrative Phase
    let zPos = 8;
    let xOffset = 0;
    let yOffset = 0;

    if (activeScene === 0) { // Hero
      zPos = THREE.MathUtils.lerp(8, 7, scrollProgress * 10);
      targetLookAt.current.set(0, 0, 0);
    } else if (activeScene === 1) { // Principles
      zPos = 6;
      xOffset = -2.5; 
      targetLookAt.current.set(1.5, 0, 0);
    } else if (activeScene === 2) { // Experience
      zPos = 7;
      xOffset = 2.5; 
      targetLookAt.current.set(-1.5, 0, 0);
    } else if (activeScene === 3) { // Architecture
      zPos = 5; 
      yOffset = 1.5;
      targetLookAt.current.set(0, -0.8, 0);
    } else if (activeScene === 4) { // Artifacts
      zPos = THREE.MathUtils.lerp(8, -12, (scrollProgress - 0.47) / 0.25);
      xOffset = mouse.x * 0.8;
      yOffset = mouse.y * 0.4;
      targetLookAt.current.set(mouse.x * 0.3, -0.2, zPos - 6);
    } else if (activeScene === 5) { // Current Focus
      zPos = 6;
      yOffset = 0.5;
      targetLookAt.current.set(0, 0, 0);
    } else { // Epilogue
      zPos = -14;
      targetLookAt.current.set(0, 0, zPos - 2);
    }

    targetCamPos.current.set(xOffset + mouse.x * 0.5, yOffset + mouse.y * 0.2, zPos);
    camera.position.lerp(targetCamPos.current, 0.04);

    currentLookAt.current.lerp(targetLookAt.current, 0.03);
    camera.lookAt(currentLookAt.current);
  });
  
  return null;
}

export default function Scene() {
  const [mounted, setMounted] = useState(false);
  const activeScene = useStore((state) => state.activeScene);
  const scrollProgress = useStore((state) => state.scrollProgress);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="fixed inset-0 bg-[#010101]" />;

  // Atmospheric Progression Mapping
  const getAtmosphere = () => {
    switch(activeScene) {
      case 0: return { color: "#010101", fogNear: 5, fogFar: 25, ambient: 0.02 };
      case 1: return { color: "#020408", fogNear: 2, fogFar: 15, ambient: 0.04 }; // Deeper blue/gray
      case 2: return { color: "#050301", fogNear: 3, fogFar: 18, ambient: 0.03 }; // Warmer industrial
      case 3: return { color: "#020202", fogNear: 1, fogFar: 12, ambient: 0.05 }; // High contrast
      case 4: return { color: "#000000", fogNear: 5, fogFar: 30, ambient: 0.02 }; // Void
      default: return { color: "#010101", fogNear: 5, fogFar: 25, ambient: 0.02 };
    }
  };

  const atmos = getAtmosphere();

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
        <color attach="background" args={[atmos.color]} />
        
        {/* Layered Fog for Spatial Depth */}
        <fog attach="fog" args={[atmos.color, atmos.fogNear, atmos.fogFar]} />

        <Suspense fallback={null}>
          <ambientLight intensity={atmos.ambient} />
          
          <Environment preset="city" />
          
          <CameraRig />
          <Particles />
          
          {/* Refined Background Gradient Plane for Separation */}
          <mesh position={[0, 0, -10]} scale={[40, 40, 1]}>
             <planeGeometry />
             <meshBasicMaterial color={atmos.color} transparent opacity={0.5} />
          </mesh>

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


