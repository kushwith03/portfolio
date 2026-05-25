"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, Image, Float, MeshTransmissionMaterial, Gltf } from "@react-three/drei";
import * as THREE from "three";
import { useStore } from "@/lib/store";

interface MonolithProps {
  project: any;
  index: number;
  position: [number, number, number];
}

export default function ProjectMonolith({ project, index, position }: MonolithProps) {
  const meshRef = useRef<THREE.Group>(null);
  const contentRef = useRef<THREE.Group>(null);
  const lightRef = useRef<THREE.SpotLight>(null);
  const scrollProgress = useStore((state) => state.scrollProgress);
  const [hovered, setHovered] = useState(false);

  // 1. Emotional Identity Overrides based on Project ID
  // ID 1: Autonomous Vehicle -> Cold Simulation
  // ID 2: InstaResume -> Luminous AI Workspace
  // ID 3: BlogSpace -> Warm Editorial Archive
  const themes = [
    { color: "#2563eb", glow: "#0088ff", name: "OBSERVATORY_ALPHA" },
    { color: "#facc15", glow: "#ffaa00", name: "NEURAL_FORGE" },
    { color: "#ec4899", glow: "#ff0088", name: "EDITORIAL_CORE" }
  ];
  
  const theme = themes[index % themes.length];

  const sceneStart = 0.25;
  const sceneEnd = 0.6;
  const projectStep = (sceneEnd - sceneStart) / 3;
  const projectFocus = sceneStart + index * projectStep;

  useFrame((state) => {
    if (!meshRef.current || !contentRef.current) return;

    const dist = Math.abs(scrollProgress - projectFocus);
    const opacity = THREE.MathUtils.smoothstep(dist, 0.15, 0);
    
    const t = state.clock.getElapsedTime();

    // Reveal Animation
    contentRef.current.scale.setScalar(THREE.MathUtils.lerp(0.5, 1, opacity));
    contentRef.current.position.z = THREE.MathUtils.lerp(-2, 0, opacity);
    
    // Interaction Physics
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y, 
      (hovered ? 0.2 : 0) + (state.mouse.x * 0.1), 
      0.05
    );

    // Atmospheric Lighting
    if (lightRef.current) {
      lightRef.current.intensity = THREE.MathUtils.lerp(lightRef.current.intensity, opacity * 12, 0.1);
    }
  });

  return (
    <group ref={meshRef} position={position} onPointerEnter={() => setHovered(true)} onPointerLeave={() => setHovered(false)}>
      <group ref={contentRef}>
        <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.2}>
          
          {/* Main Visual Artifact (The "Screen") */}
          <group>
            <mesh position={[0, 0, -0.05]}>
              <planeGeometry args={[4.2, 2.6]} />
              <meshBasicMaterial color={theme.color} transparent opacity={0.05 * (hovered ? 2 : 1)} />
            </mesh>
            <Image
              url={project.imageUrl}
              scale={[4, 2.5]}
              transparent
              opacity={0.9}
              toneMapped={false}
            />
          </group>

          {/* Exploded UI Fragments (Architecture Visibility) */}
          <group position={[2.5, -0.5, 0.5]} rotation={[0, -0.2, 0.1]}>
             <mesh>
               <planeGeometry args={[1.2, 0.8]} />
               <MeshTransmissionMaterial
                 backside
                 samples={4}
                 thickness={0.2}
                 chromaticAberration={0.1}
                 transmission={1}
                 roughness={0.1}
                 color={theme.color}
               />
             </mesh>
             <Text
                position={[0, 0, 0.01]}
                fontSize={0.08}
                color="white"
                font="/fonts/GeistMono-Bold.woff"
                anchorX="center"
              >
                {`STACK // ${project.tags[0]}`}
              </Text>
          </group>

          {/* Technical Metadata Tags */}
          <Text
            position={[-2, 1.4, 0.2]}
            fontSize={0.1}
            color={theme.color}
            font="/fonts/GeistMono-Bold.woff"
            anchorX="left"
            opacity={0.6}
          >
            {`${theme.name} // 0${index + 1}`}
          </Text>

          {/* Monumental Title */}
          <Text
            position={[-2.2, -1.3, 0.4]}
            fontSize={0.45}
            color="white"
            maxWidth={4}
            lineHeight={0.8}
            font="/fonts/MonumentExtended-Regular.woff"
            anchorX="left"
            textAlign="left"
          >
            {project.title.toUpperCase()}
          </Text>

          {/* Environmental "Dust" for the World */}
          <mesh position={[0, 0, -1]}>
            <sphereGeometry args={[5, 32, 32]} />
            <meshBasicMaterial color={theme.glow} transparent opacity={0.01} side={THREE.BackSide} />
          </mesh>
        </Float>
      </group>

      {/* Atmospheric Spotlight */}
      <spotLight
        ref={lightRef}
        position={[0, 8, 4]}
        angle={0.4}
        penumbra={1}
        intensity={0}
        color={theme.color}
        distance={20}
        castShadow
      />
    </group>
  );
}
