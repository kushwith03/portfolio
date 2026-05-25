"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, Image, Float, MeshTransmissionMaterial } from "@react-three/drei";
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

  // Distinct Color Palette for each project
  const colors = ["#2563eb", "#ffaa00", "#00ffff"];
  const themeColor = colors[index % colors.length];

  const sceneStart = 0.25;
  const sceneEnd = 0.6;
  const projectStep = (sceneEnd - sceneStart) / 3;
  const projectFocus = sceneStart + index * projectStep;

  useFrame((state) => {
    if (!meshRef.current || !contentRef.current) return;

    const dist = Math.abs(scrollProgress - projectFocus);
    const opacity = THREE.MathUtils.smoothstep(dist, 0.15, 0);
    
    const t = state.clock.getElapsedTime();

    // 1. Reveal Scale & Opacity
    contentRef.current.scale.setScalar(THREE.MathUtils.lerp(0.8, 1, opacity));
    
    // 2. Parallax Fragments
    // Elements slightly shift based on mouse & scroll
    const parallaxX = state.mouse.x * 0.2;
    const parallaxY = state.mouse.y * 0.2;
    
    meshRef.current.position.y = position[1] + Math.sin(t + index) * 0.05;
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, (hovered ? 0.3 : 0) + parallaxX, 0.05);

    // 3. Lighting Intensity
    if (lightRef.current) {
      lightRef.current.intensity = THREE.MathUtils.lerp(lightRef.current.intensity, opacity * 8, 0.1);
    }
  });

  return (
    <group ref={meshRef} position={position} onPointerEnter={() => setHovered(true)} onPointerLeave={() => setHovered(false)}>
      <group ref={contentRef}>
        <Float speed={2} rotationIntensity={0.1} floatIntensity={0.3}>
          {/* Holographic Backing */}
          <mesh position={[0, 0, -0.2]}>
            <planeGeometry args={[4.5, 2.8]} />
            <meshBasicMaterial color={themeColor} transparent opacity={0.03} />
          </mesh>

          {/* Main Visual Artifact */}
          <Image
            url={project.imageUrl}
            scale={[4, 2.5]}
            transparent
            opacity={0.9}
            toneMapped={false}
          />

          {/* Depth Fragments (UI Layers) */}
          <mesh position={[0.5, -0.8, 0.3]} rotation={[0, 0, 0.1]}>
            <planeGeometry args={[1.5, 0.8]} />
            <meshBasicMaterial color={themeColor} transparent opacity={0.1} />
          </mesh>
          
          <Text
            position={[-2, 1.2, 0.4]}
            fontSize={0.12}
            color={themeColor}
            font="/fonts/GeistMono-Bold.woff"
            anchorX="left"
          >
            {`RELIC_0${index + 1} // ARCHIVE_SYSTEM`}
          </Text>

          <Text
            position={[-2.2, -1.2, 0.5]}
            fontSize={0.5}
            color="white"
            maxWidth={4}
            lineHeight={0.8}
            font="/fonts/MonumentExtended-Regular.woff"
            anchorX="left"
            textAlign="left"
          >
            {project.title.toUpperCase()}
          </Text>
          
          {/* Glass Distortion Plate */}
          <mesh position={[2, 1, 0.6]} rotation={[0, 0.4, 0]}>
            <boxGeometry args={[1.2, 0.6, 0.02]} />
            <MeshTransmissionMaterial
              backside
              samples={4}
              thickness={0.5}
              chromaticAberration={0.2}
              transmission={1}
              roughness={0.1}
            />
          </mesh>
        </Float>
      </group>

      {/* Dedicated Atmospheric Light */}
      <spotLight
        ref={lightRef}
        position={[2, 5, 2]}
        angle={0.6}
        penumbra={1}
        intensity={0}
        color={themeColor}
        castShadow
      />
    </group>
  );
}
