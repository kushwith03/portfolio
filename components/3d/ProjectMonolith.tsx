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
    const opacity = THREE.MathUtils.smoothstep(dist, 0.2, 0);
    
    const t = state.clock.getElapsedTime();

    contentRef.current.scale.setScalar(THREE.MathUtils.lerp(0.4, 1.2, opacity));
    contentRef.current.position.z = THREE.MathUtils.lerp(-4, 0, opacity);
    contentRef.current.position.y = Math.sin(t * 0.5 + index) * 0.2;
    
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y, 
      (hovered ? 0.3 : 0) + (state.mouse.x * 0.15), 
      0.04
    );

    if (lightRef.current) {
      lightRef.current.intensity = THREE.MathUtils.lerp(lightRef.current.intensity, opacity * 15, 0.1);
      lightRef.current.target.position.set(position[0], position[1], position[2]);
    }
  });

  return (
    <group ref={meshRef} position={position} onPointerEnter={() => setHovered(true)} onPointerLeave={() => setHovered(false)}>
      <group ref={contentRef}>
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
          <group>
            <mesh position={[0, 0, -0.1]}>
              <boxGeometry args={[4.8, 2.8, 0.05]} />
              <MeshTransmissionMaterial
                backside
                thickness={0.5}
                samples={8}
                chromaticAberration={0.2}
                transmission={1}
                roughness={0}
                color={theme.color}
                opacity={0.1}
              />
            </mesh>
            <Image
              url={project.imageUrl}
              scale={[4.5, 2.7]}
              transparent
              opacity={0.8}
              toneMapped={false}
            />
          </group>

          <group position={[2.8, 1, 0.8]} rotation={[0, -0.3, 0]}>
             <mesh>
                <planeGeometry args={[1.5, 0.05]} />
                <meshBasicMaterial color={theme.color} />
             </mesh>
             <Text
                position={[0, 0.15, 0]}
                fontSize={0.07}
                color={theme.color}
                anchorX="center"
              >
                {`SYSTEM_NOMINAL // STACK_ACTIVE`}
              </Text>
          </group>

          <group position={[-2.8, -1.2, 1.2]} rotation={[0, 0.4, 0.2]}>
             <mesh>
               <boxGeometry args={[1.8, 1, 0.02]} />
               <MeshTransmissionMaterial
                 thickness={1}
                 chromaticAberration={0.5}
                 transmission={1}
                 roughness={0.05}
                 color={theme.color}
               />
             </mesh>
             <Text
                position={[0, 0, 0.02]}
                fontSize={0.1}
                color="white"
                anchorX="center"
                maxWidth={1.5}
              >
                {project.tags.join(" • ")}
              </Text>
          </group>

          <Text
            position={[-2.4, 1.6, 0.2]}
            fontSize={0.08}
            color="white"
            fillOpacity={0.2}
            anchorX="left"
          >
            {`AUTHENTIC_DATA_EXTRACTED // [ ${theme.name} ]`}
          </Text>

          <mesh position={[0, 0, -2]} scale={1.5}>
             <sphereGeometry args={[5, 32, 32]} />
             <meshBasicMaterial color={theme.glow} transparent opacity={0.005} side={THREE.BackSide} />
          </mesh>
        </Float>
      </group>

      <spotLight
        ref={lightRef}
        position={[2, 10, 5]}
        angle={0.4}
        penumbra={1}
        intensity={0}
        color={theme.color}
        distance={25}
        castShadow
      />
    </group>
  );
}
