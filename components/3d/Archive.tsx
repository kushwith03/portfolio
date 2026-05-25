"use client";

import projects from "@/lib/data/projects.json";
import ProjectMonolith from "./ProjectMonolith";

export default function Archive() {
  return (
    <group>
      {projects.map((project: any, index: number) => (
        <ProjectMonolith
          key={project.id}
          project={project}
          index={index}
          // Position them along the Z-axis, deeper than the hero
          // Hero is at Z: 0. Archive is between Z: -2 and Z: -8
          position={[
            index % 2 === 0 ? -2 : 2, 
            0, 
            -2 - index * 3
          ]}
        />
      ))}
    </group>
  );
}
