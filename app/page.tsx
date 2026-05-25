"use client";

import Hero from '../components/Hero';
import Projects from '../components/Projects';
import NeuralCore from '../components/NeuralCore';
import Epilogue from '../components/Epilogue';
import CinematicController from '../components/motion/CinematicController';

/**
 * Root Page: Unified Narrative Stream
 * Pacing Pass 5: Total compression of dead space and timeline synchronization.
 */
export default function Home() {
  return (
    <main className="relative">
      <CinematicController />

      <div className="relative">
        {/* Entry: Strict 100vh focus */}
        <Hero />
        
        {/* Discovery: Archive Review (Tight 120vh) */}
        <div className="relative">
           <Projects />
           <div className="h-[120vh]" /> 
        </div>

        {/* Reflection & Closure */}
        <div className="relative bg-gradient-to-b from-transparent via-[#020202] to-[#010101]">
           <NeuralCore />
           <Epilogue />
        </div>
      </div>
    </main>
  );
}
