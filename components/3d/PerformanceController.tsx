"use client";

import { usePerformanceMonitor } from "@react-three/drei";
import { useStore } from "@/lib/store";

export default function PerformanceController() {
  const setTier = useStore((state) => state.setPerformanceTier);
  
  usePerformanceMonitor({
    onIncline: () => setTier('high'),
    onDecline: () => setTier('low'),
  });
  
  return null;
}
