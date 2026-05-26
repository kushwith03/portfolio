"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, Image, Float, RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { useStore } from "@/lib/store";

interface MonolithProps {
  project: any;
  index: number;
  position: [number, number, number];
}

/**
 * Project Monolith: Immersive Spatial Artifact
 * Premium Refinement: Technical framing and viscous reveal pacing.
 */
export default function ProjectMonolith({ project, index, position }: MonolithProps) {
  const meshRef = useRef<THREE.Group>(null);
  const contentRef = useRef<THREE.Group>(null);
  const lightRef = useRef<THREE.SpotLight>(null);
  const scrollProgress = useStore((state) => state.scrollProgress);
  const [hovered, setHovered] = useState(false);

  const colors = ["#ffffff", "#ffaa00", "#44ccff"];
  const themeColor = colors[index % colors.length];

  // Refined project thresholds mapping to Scene 4 (0.61 to 0.88)
  const sceneStart = 0.61;
  const sceneEnd = 0.88;
  const projectStep = (sceneEnd - sceneStart) / 3;
  const projectFocus = sceneStart + index * projectStep + projectStep / 2;

  useFrame((state) => {
    if (!meshRef.current || !contentRef.current) return;

    const dist = Math.abs(scrollProgress - projectFocus);
    // Artifact reveal: smooth, viscous window
    const opacity = THREE.MathUtils.smoothstep(dist, 0.12, 0.02);
    const revealFactor = 1 - opacity; // 1 when focused, 0 when far
    
    // 1. Viscous Reveal Animation
    contentRef.current.scale.setScalar(THREE.MathUtils.lerp(0.8, 1, revealFactor));
    contentRef.current.position.z = THREE.MathUtils.lerp(-4, 0, revealFactor);
    
    // Asymmetrical alternating layout
    // If index is even (HTML on left), model settles on right (dir = 1).
    // If index is odd (HTML on right), model settles on left (dir = -1).
    const dir = index % 2 === 0 ? 1 : -1;
    
    // Starts far off-screen (dir * 4) and settles off-center (dir * 1.5)
    contentRef.current.position.x = THREE.MathUtils.lerp(dir * 4, dir * 1.5, revealFactor);
    
    contentRef.current.rotation.x = THREE.MathUtils.lerp(0.15, 0, revealFactor);
    contentRef.current.rotation.y = THREE.MathUtils.lerp(dir * 0.4, dir * 0.1, revealFactor);
    
    // 2. Artifact Stability & Hover Reactivity
    const targetRotY = (hovered ? 0.15 * dir : 0) + (state.mouse.x * 0.05);
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetRotY, 0.04);

    // 3. Environmental Light Sync
    if (lightRef.current) {
      lightRef.current.intensity = THREE.MathUtils.lerp(lightRef.current.intensity, revealFactor * 6, 0.1);
    }
  });

  return (
    <group ref={meshRef} position={position} onPointerEnter={() => setHovered(true)} onPointerLeave={() => setHovered(false)}>
      <group ref={contentRef}>
        <Float speed={0.6} rotationIntensity={0.1} floatIntensity={0.2}>
          
          {/* Main Artifact Frame - Engineering Identity */}
          <group>
            {/* Backplate */}
            <RoundedBox args={[4.6, 2.8, 0.1]} radius={0.05} smoothness={4} position={[0, 0, -0.1]}>
               <meshPhysicalMaterial 
                  color="#0a0a0a" 
                  metalness={0.8} 
                  roughness={0.2} 
                  clearcoat={1}
               />
            </RoundedBox>

            {/* Inner Technical Border */}
            <mesh position={[0, 0, 0]}>
               <planeGeometry args={[4.45, 2.65]} />
               <meshBasicMaterial color={themeColor} transparent opacity={0.1} />
            </mesh>
            
            <Image
              url={project.imageUrl}
              scale={[4.2, 2.4]}
              transparent
              opacity={0.8}
              toneMapped={false}
            />

            {/* Glass Overlay for Depth */}
            <mesh position={[0, 0, 0.05]}>
               <planeGeometry args={[4.2, 2.4]} />
               <meshPhysicalMaterial 
                  color="#ffffff" 
                  transparent 
                  opacity={0.02} 
                  roughness={0} 
                  metalness={0.1}
                  transmission={0.5}
               />
            </mesh>
          </group>

          {/* Narrative ID & Technical Metadata */}
          <group position={[-2.1, -1.8, 0.2]}>
            <Text
              fontSize={0.15}
              color="white"
              fillOpacity={0.2}
              anchorX="left"
              font="/fonts/Inter-Black.woff" // Assuming Inter is available or fallback
            >
              {project.title.toUpperCase()}
            </Text>
            <Text
              position={[0, -0.2, 0]}
              fontSize={0.08}
              color={themeColor}
              fillOpacity={0.4}
              anchorX="left"
              letterSpacing={0.5}
            >
              PROJECT_AUTH_0{index + 1}
            </Text>
          </group>

          {/* Environmental Glow */}
          <mesh position={[0, 0, -1]} scale={1.2}>
             <sphereGeometry args={[4, 16, 16]} />
             <meshBasicMaterial color={themeColor} transparent opacity={0.001} side={THREE.BackSide} />
          </mesh>
        </Float>
      </group>

      <spotLight
        ref={lightRef}
        position={[0, 5, 2]}
        angle={0.6}
        penumbra={1}
        intensity={0}
        color={themeColor}
        distance={20}
        castShadow
      />
    </group>
  );
}

