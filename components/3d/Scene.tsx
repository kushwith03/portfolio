"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef, useEffect } from "react";
import { Preload, Environment, ContactShadows, usePerformanceMonitor } from "@react-three/drei";
import * as THREE from "three";
import { 
  EffectComposer, 
  Bloom, 
  Noise, 
  Vignette
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

import { useStore } from "@/lib/store";
import Entity from "./Entity";
import Particles from "./Particles";
import CameraRig from "./CameraRig";
import Archive from "./Archive";

function MovingLights() {
  const group = useRef<THREE.Group>(null);
  const tier = useStore((state) => state.performanceTier);
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (group.current) {
      group.current.rotation.z = t * 0.1;
      group.current.rotation.y = t * 0.05;
    }
  });

  return (
    <group ref={group}>
      <pointLight position={[10, 10, 10]} intensity={1} color="#44ccff" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ffaa00" />
      {tier !== 'low' && (
        <spotLight 
          position={[0, 15, 0]} 
          angle={0.3} 
          penumbra={1} 
          intensity={2} 
          castShadow 
          color="#ffffff"
        />
      )}
    </group>
  );
}

function PerformanceController() {
  const setTier = useStore((state) => state.setPerformanceTier);
  
  // Use Drei's performance monitor to scale down if FPS drops
  usePerformanceMonitor({
    onIncline: () => setTier('high'),
    onDecline: () => setTier('low'),
    // Initial dpr will be adjusted based on this
  });
  
  return null;
}

export default function Scene() {
  const tier = useStore((state) => state.performanceTier);

  return (
    <div className="fixed inset-0 -z-10 bg-[#020202]">
      <Canvas
        shadows={tier === 'high'}
        camera={{ position: [0, 0, 8], fov: 35 }}
        gl={{ 
          antialias: false,
          alpha: true,
          powerPreference: "high-performance",
          stencil: false,
          depth: true,
          // Tone mapping for cinematic highlights
          toneMapping: THREE.ACESFilmicToneMapping,
        }}
        // DPR Clamping: Never exceed 1.5 for performance, drop to 1 on low tier
        dpr={tier === 'low' ? 1 : [1, 1.5]}
      >
        <PerformanceController />
        <color attach="background" args={["#020202"]} />
        <fogExp2 attach="fog" args={["#020202", 0.05]} />

        <Suspense fallback={null}>
          <CameraRig />
          <Environment preset="night" />
          <ambientLight intensity={0.02} />
          
          <MovingLights />
          
          <Entity />
          <Archive />
          <Particles count={tier === 'low' ? 1000 : 3000} />

          {tier !== 'low' && (
            <ContactShadows
              position={[0, -4, 0]}
              opacity={0.4}
              scale={20}
              blur={2}
              far={4.5}
              color="#000000"
            />
          )}

          <EffectComposer multisampling={0} disableNormalPass>
            <Bloom 
              luminanceThreshold={1.2} 
              mipmapBlur 
              intensity={tier === 'low' ? 0.5 : 1} 
              radius={0.3} 
            />
            {tier === 'high' ? (
              <Noise 
                opacity={0.03} 
                blendFunction={BlendFunction.OVERLAY} 
              />
            ) : null}
            <Vignette offset={0.3} darkness={0.9} />
          </EffectComposer>
          
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}
