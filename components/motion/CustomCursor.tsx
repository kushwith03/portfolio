"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

/**
 * Custom Cursor System: Premium Magnetic HUD
 * Features:
 * - Small soft white dot
 * - Subtle outer ring
 * - Smooth lerp motion
 * - Magnetic hover reactions for buttons/links
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      
      // Fast tracking for inner dot
      gsap.to(dotRef.current, {
        x: clientX,
        y: clientY,
        duration: 0,
      });

      // Lagging inertia for outer ring
      gsap.to(ringRef.current, {
        x: clientX,
        y: clientY,
        duration: 0.15,
        ease: "power2.out",
      });
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isSelectable = 
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.closest('button') || 
        target.closest('a') ||
        target.classList.contains('cursor-pointer');

      if (isSelectable) {
        setIsHovered(true);
        gsap.to(ringRef.current, {
          scale: 2,
          borderWidth: "1px",
          opacity: 0.6,
          duration: 0.3,
        });
        gsap.to(dotRef.current, {
          scale: 0.5,
          opacity: 0.3,
          duration: 0.3,
        });
      } else {
        setIsHovered(false);
        gsap.to(ringRef.current, {
          scale: 1,
          borderWidth: "1.5px",
          opacity: 0.2,
          duration: 0.3,
        });
        gsap.to(dotRef.current, {
          scale: 1,
          opacity: 1,
          duration: 0.3,
        });
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseover", onMouseOver);
    
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
    };
  }, []);

  return (
    <>
      <div 
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-white rounded-full z-[9999] pointer-events-none -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
      />
      <div 
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 border-[1.5px] border-white rounded-full z-[9998] pointer-events-none -translate-x-1/2 -translate-y-1/2 opacity-20 transition-opacity duration-300"
      />
    </>
  );
}
