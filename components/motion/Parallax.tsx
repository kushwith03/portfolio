"use client";

import { useRef, useEffect, ReactNode } from "react";
import gsap from "gsap";
import { useStore } from "@/lib/store";

interface ParallaxProps {
  children: ReactNode;
  speed?: number;
  className?: string;
}

export default function Parallax({ children, speed = 0.5, className = "" }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const scrollProgress = useStore((state) => state.scrollProgress);

  useEffect(() => {
    if (ref.current) {
      gsap.to(ref.current, {
        y: scrollProgress * 500 * speed,
        ease: "none",
        duration: 0.1,
      });
    }
  }, [scrollProgress, speed]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
