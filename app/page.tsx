"use client";

import Hero from '../components/Hero';
import Projects from '../components/Projects';
import NeuralCore from '../components/NeuralCore';
import Epilogue from '../components/Epilogue';
import CinematicController from '../components/motion/CinematicController';

/**
 * Root Page: Unified Narrative Stream
 * Pacing Pass 3: Tighter spacers and transition corridor integration.
 */
export default function Home() {
  return (
    <main className="relative">
      <CinematicController />

      <div className="relative">
        {/* Entry Phase */}
        <Hero />
        
        {/* Transition Corridor (Hero -> Archive) */}
        <div className="h-[40vh]" />

        {/* Discovery Phase (Archive) */}
        <div className="relative">
           <Projects />
           <div className="h-[220vh]" /> {/* Compressed for more efficient technical review */}
        </div>

        {/* Transition Corridor (Archive -> Core) */}
        <div className="h-[20vh]" />

        {/* Reflection Phase (Core & Epilogue) */}
        <div className="relative bg-gradient-to-b from-transparent via-[#020202] to-[#050505]">
           <NeuralCore />
           <Epilogue />
        </div>
      </div>
    </main>
  );
}
