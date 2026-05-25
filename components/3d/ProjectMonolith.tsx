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
 * Re-engineered for Step 4 to focus on physical presence and depth.
 */
export default function ProjectMonolith({ project, index, position }: MonolithProps) {
  const meshRef = useRef<THREE.Group>(null);
  const contentRef = useRef<THREE.Group>(null);
  const lightRef = useRef<THREE.SpotLight>(null);
  const scrollProgress = useStore((state) => state.scrollProgress);
  const [hovered, setHovered] = useState(false);

  // Identity logic
  const colors = ["#ffffff", "#ffaa00", "#44ccff"];
  const themeColor = colors[index % colors.length];

  const sceneStart = 0.35;
  const sceneEnd = 0.7;
  const projectStep = (sceneEnd - sceneStart) / 3;
  const projectFocus = sceneStart + index * projectStep + projectStep / 2;

  useFrame((state) => {
    if (!meshRef.current || !contentRef.current) return;

    const dist = Math.abs(scrollProgress - projectFocus);
    // Artifact reveal: tighter window for more impact
    const opacity = THREE.MathUtils.smoothstep(dist, 0.18, 0.05);
    
    const t = state.clock.getElapsedTime();

    // 1. Viscous Reveal Animation
    contentRef.current.scale.setScalar(THREE.MathUtils.lerp(0.3, 1, opacity));
    contentRef.current.position.z = THREE.MathUtils.lerp(-5, 0, opacity);
    
    // 2. Artifact Stability
    // Subdued rotation that reacts to mouse but stays sculptural
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y, 
      (hovered ? 0.2 : 0) + (state.mouse.x * 0.05), 
      0.04
    );

    // 3. Environmental Light Sync
    if (lightRef.current) {
      lightRef.current.intensity = THREE.MathUtils.lerp(lightRef.current.intensity, opacity * 10, 0.1);
    }
  });

  return (
    <group ref={meshRef} position={position} onPointerEnter={() => setHovered(true)} onPointerLeave={() => setHovered(false)}>
      <group ref={contentRef}>
        <Float speed={0.5} rotationIntensity={0.1} floatIntensity={0.2}>
          
          {/* Main Visual Archetype */}
          <group>
            {/* Structural Core (Subtle contrast frame) */}
            <mesh position={[0, 0, -0.05]}>
              <planeGeometry args={[4.4, 2.6]} />
              <meshStandardMaterial color="#000000" metalness={0.8} roughness={0.1} transparent opacity={0.5} />
            </mesh>
            
            {/* The Projection (Content) */}
            <Image
              url={project.imageUrl}
              scale={[4.2, 2.4]}
              transparent
              opacity={0.95}
              toneMapped={false}
            />
          </group>

          {/* Technical Metadata Plates (Floating Layers) */}
          <group position={[-2.4, 1.4, 0.3]} rotation={[0, 0, 0]}>
             <mesh>
                <planeGeometry args={[0.8, 0.02]} />
                <meshBasicMaterial color={themeColor} transparent opacity={0.4} />
             </mesh>
             <Text
                position={[0.5, 0, 0]}
                fontSize={0.06}
                color="white"
                anchorX="left"
                fillOpacity={0.2}
              >
                {`EXTRACTED_ARCHIVE // 0${index + 1}`}
              </Text>
          </group>

          {/* Project Identity Tag */}
          <Text
            position={[-2.1, -1.6, 0.4]}
            fontSize={0.25}
            color="white"
            fillOpacity={0.1}
            anchorX="left"
            textAlign="left"
          >
            {project.title.split(' ')[0].toUpperCase()}
          </Text>

          {/* Environmental Glow Proxy */}
          <mesh position={[0, 0, -1.5]} scale={2}>
             <sphereGeometry args={[4, 16, 16]} />
             <meshBasicMaterial color={themeColor} transparent opacity={0.003} side={THREE.BackSide} />
          </mesh>
        </Float>
      </group>

      {/* Atmospheric World Light */}
      <spotLight
        ref={lightRef}
        position={[0, 12, 6]}
        angle={0.4}
        penumbra={1}
        intensity={0}
        color={themeColor}
        distance={30}
        castShadow
      />
    </group>
  );
}
