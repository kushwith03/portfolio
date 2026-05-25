"use client";

import Hero from '../components/Hero';
import Projects from '../components/Projects';
import NeuralCore from '../components/NeuralCore';
import Epilogue from '../components/Epilogue';
import CinematicController from '../components/motion/CinematicController';

/**
 * Root Page: Narrative Stream Optimization
 * Pass 4: Total elimination of dead space and timeline calibration.
 * We move away from large spacers to a focused, continuous flow.
 */
export default function Home() {
  return (
    <main className="relative">
      <CinematicController />

      <div className="relative">
        {/* 1. Hero: Strict 100vh */}
        <Hero />
        
        {/* 2. Archive Zone: Projects are fixed, so we just need enough scroll length */}
        {/* We use a single container to drive the 'Archive' progression timeline */}
        <div className="relative">
           <Projects />
           {/* 150vh is sufficient for 3 projects to transition at the speed of a high-end product page */}
           <div className="h-[150vh]" /> 
        </div>

        {/* 3. Closure: Immediate transition to Epilogue */}
        <div className="relative bg-gradient-to-b from-transparent via-[#020202] to-[#050505]">
           <NeuralCore />
           <Epilogue />
        </div>
      </div>
    </main>
  );
}
