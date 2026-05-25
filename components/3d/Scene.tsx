"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useRef, useState, useEffect } from "react";
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
      {tier !== 'low' ? (
        <spotLight 
          position={[0, 15, 0]} 
          angle={0.3} 
          penumbra={1} 
          intensity={2} 
          castShadow 
          color="#ffffff"
        />
      ) : null}
    </group>
  );
}

function PerformanceController() {
  const setTier = useStore((state) => state.setPerformanceTier);
  usePerformanceMonitor({
    onIncline: () => setTier('high'),
    onDecline: () => setTier('low'),
  });
  return null;
}

function HighTierEffects({ tier }: { tier: string }) {
  if (tier !== 'high') return <></>;
  return (
    <Noise 
      opacity={0.02} 
      blendFunction={BlendFunction.OVERLAY} 
    />
  );
}

/**
 * Defensive PostProcessing Layer
 * Prevents "Cannot read properties of null (reading 'subscribe')" by delaying mounting
 * until the Three.js renderer and scene are fully initialized.
 */
function CinematicEffects({ tier }: { tier: string }) {
  const [ready, setReady] = useState(false);
  const gl = useThree((state) => state.gl);

  useEffect(() => {
    if (gl) {
      const timeout = setTimeout(() => setReady(true), 500);
      return () => clearTimeout(timeout);
    }
  }, [gl]);

  if (!ready) return null;

  return (
    <EffectComposer multisampling={0} enableNormalPass={false}>
      <Bloom 
        luminanceThreshold={1.2} 
        mipmapBlur 
        intensity={tier === 'low' ? 0.3 : 0.6} 
        radius={0.3} 
      />
      <HighTierEffects tier={tier} />
      <Vignette offset={0.5} darkness={0.7} />
    </EffectComposer>
  );
}

export default function Scene() {
  const tier = useStore((state) => state.performanceTier);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return <div className="fixed inset-0 bg-[#020202]" />;

  return (
    <div className="fixed inset-0 -z-10 bg-[#020202]">
      <Canvas
        shadows={tier === 'high'}
        camera={{ position: [0, 0, 8], fov: 35 }}
        gl={{ 
          antialias: false,
          alpha: true,
          stencil: false,
          depth: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          failIfMajorPerformanceCaveat: true
        }}
        dpr={tier === 'low' ? 1 : [1, 1.5]}
        onCreated={(state) => {
          state.gl.setClearColor("#020202");
        }}
      >
        <PerformanceController />
        <color attach="background" args={["#020202"]} />
        <fogExp2 attach="fog" args={["#020202", 0.04]} />

        <Suspense fallback={null}>
          <CameraRig />
          <Environment preset="night" />
          <ambientLight intensity={0.02} />
          
          <MovingLights />
          
          <Entity />
          <Archive />
          <Particles count={tier === 'low' ? 500 : 1500} />

          {tier !== 'low' ? (
            <ContactShadows
              position={[0, -4, 0]}
              opacity={0.3}
              scale={20}
              blur={3}
              far={4.5}
              color="#000000"
            />
          ) : null}

          <CinematicEffects tier={tier} />
          
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}
