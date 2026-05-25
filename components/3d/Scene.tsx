"use client";

import dynamic from "next/dynamic";
import { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { useStore } from "@/lib/store";

// Dynamically import heavy 3D components with SSR disabled to prevent hydration mismatches
const CameraRig = dynamic(() => import("./CameraRig"), { ssr: false });
const Entity = dynamic(() => import("./Entity"), { ssr: false });
const Archive = dynamic(() => import("./Archive"), { ssr: false });
const Particles = dynamic(() => import("./Particles"), { ssr: false });
const CinematicEffects = dynamic(() => import("./CinematicEffects"), { ssr: false });

// Helper components that don't need separate files
const PerformanceController = dynamic(() => import("@/components/3d/PerformanceController"), { ssr: false });

export default function Scene() {
  const tier = useStore((state) => state.performanceTier);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="fixed inset-0 bg-[#020202]" />;

  return (
    <div className="fixed inset-0 -z-10 bg-[#020202]">
      <Canvas
        shadows={tier === "high"}
        camera={{ position: [0, 0, 8], fov: 35 }}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "high-performance",
          stencil: false,
          depth: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          failIfMajorPerformanceCaveat: true,
        }}
        dpr={tier === "low" ? 1 : [1, 1.5]}
        onCreated={(state) => {
          state.gl.setClearColor("#020202");
        }}
      >
        <Suspense fallback={null}>
          <PerformanceController />
          <color attach="background" args={["#020202"]} />
          <fogExp2 attach="fog" args={["#020202", 0.04]} />

          <ambientLight intensity={0.02} />
          
          <CameraRig />
          <Entity />
          <Archive />
          <Particles count={tier === "low" ? 500 : 1500} />

          {/* TEMPORARILY DISABLED FOR STABILIZATION ISOLATION */}
          {/* <CinematicEffects tier={tier} /> */}
        </Suspense>
      </Canvas>
    </div>
  );
}
