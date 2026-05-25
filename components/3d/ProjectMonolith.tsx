"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, Image, Float } from "@react-three/drei";
import * as THREE from "three";
import { useStore } from "@/lib/store";

interface MonolithProps {
  project: any;
  index: number;
  position: [number, number, number];
}

/**
 * Project Monolith: Immersive Spatial Artifact
 * Compressed pacing pass: Tighter Z-axis positioning and more efficient reveal windows.
 */
export default function ProjectMonolith({ project, index, position }: MonolithProps) {
  const meshRef = useRef<THREE.Group>(null);
  const contentRef = useRef<THREE.Group>(null);
  const lightRef = useRef<THREE.SpotLight>(null);
  const scrollProgress = useStore((state) => state.scrollProgress);
  const [hovered, setHovered] = useState(false);

  const colors = ["#ffffff", "#ffaa00", "#44ccff"];
  const themeColor = colors[index % colors.length];

  // Compressed project thresholds
  const sceneStart = 0.3;
  const sceneEnd = 0.75;
  const projectStep = (sceneEnd - sceneStart) / 3;
  const projectFocus = sceneStart + index * projectStep + projectStep / 2;

  useFrame((state) => {
    if (!meshRef.current || !contentRef.current) return;

    const dist = Math.abs(scrollProgress - projectFocus);
    // Artifact reveal: tighter window (0.15) for denser pacing
    const opacity = THREE.MathUtils.smoothstep(dist, 0.15, 0.02);
    
    const t = state.clock.getElapsedTime();

    // 1. Viscous Reveal Animation
    contentRef.current.scale.setScalar(THREE.MathUtils.lerp(0.2, 1, opacity));
    contentRef.current.position.z = THREE.MathUtils.lerp(-3, 0, opacity);
    
    // 2. Artifact Stability
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y, 
      (hovered ? 0.2 : 0) + (state.mouse.x * 0.05), 
      0.04
    );

    // 3. Environmental Light Sync
    if (lightRef.current) {
      lightRef.current.intensity = THREE.MathUtils.lerp(lightRef.current.intensity, opacity * 8, 0.1);
    }
  });

  return (
    <group ref={meshRef} position={position} onPointerEnter={() => setHovered(true)} onPointerLeave={() => setHovered(false)}>
      <group ref={contentRef}>
        <Float speed={0.4} rotationIntensity={0.05} floatIntensity={0.1}>
          
          {/* Main Visual Archetype */}
          <group>
            <mesh position={[0, 0, -0.05]}>
              <planeGeometry args={[4.4, 2.6]} />
              <meshStandardMaterial color="#000000" metalness={0.8} roughness={0.1} transparent opacity={0.4} />
            </mesh>
            
            <Image
              url={project.imageUrl}
              scale={[4.2, 2.4]}
              transparent
              opacity={0.9}
              toneMapped={false}
            />
          </group>

          {/* Narrative ID Tag */}
          <Text
            position={[-2.1, -1.6, 0.3]}
            fontSize={0.2}
            color="white"
            fillOpacity={0.05}
            anchorX="left"
          >
            {project.title.split(' ')[0].toUpperCase()}
          </Text>

          {/* Environmental Glow */}
          <mesh position={[0, 0, -1]} scale={1.5}>
             <sphereGeometry args={[4, 16, 16]} />
             <meshBasicMaterial color={themeColor} transparent opacity={0.002} side={THREE.BackSide} />
          </mesh>
        </Float>
      </group>

      <spotLight
        ref={lightRef}
        position={[0, 10, 5]}
        angle={0.4}
        penumbra={1}
        intensity={0}
        color={themeColor}
        distance={25}
        castShadow
      />
    </group>
  );
}
