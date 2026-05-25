"use client";

import { useState, useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { EffectComposer, Bloom, Noise, Vignette } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

function HighTierEffects({ tier }: { tier: string }) {
  if (tier !== "high") return <></>;
  return (
    <Noise
      opacity={0.02}
      blendFunction={BlendFunction.OVERLAY}
    />
  );
}

export default function CinematicEffects({ tier }: { tier: string }) {
  const [ready, setReady] = useState(false);
  const gl = useThree((state) => state.gl);

  useEffect(() => {
    if (gl) {
      // Delay mounting to ensure renderer is completely stable
      const timeout = setTimeout(() => setReady(true), 1000);
      return () => clearTimeout(timeout);
    }
  }, [gl]);

  if (!ready) return null;

  return (
    <EffectComposer multisampling={0} enableNormalPass={false}>
      <Bloom
        luminanceThreshold={1.2}
        mipmapBlur
        intensity={tier === "low" ? 0.3 : 0.6}
        radius={0.3}
      />
      <HighTierEffects tier={tier} />
      <Vignette offset={0.5} darkness={0.7} />
    </EffectComposer>
  );
}
