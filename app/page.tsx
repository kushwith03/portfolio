"use client";

import Hero from '../components/Hero';
import Projects from '../components/Projects';
import NeuralCore from '../components/NeuralCore';
import Epilogue from '../components/Epilogue';
import CinematicController from '../components/motion/CinematicController';

/**
 * Root Page: Unified Narrative Stream
 * Compressed layout pass: Reduced vertical spacers and tightened section flow.
 */
export default function Home() {
  return (
    <main className="relative">
      <CinematicController />

      <div className="relative">
        <Hero />
        
        {/* Compressed Archive Zone */}
        <div className="relative">
           <Projects />
           <div className="h-[250vh]" /> {/* Compressed from 300vh+ total cumulative */}
        </div>

        {/* Narrative Closure */}
        <div className="relative bg-gradient-to-b from-transparent to-[#020202]">
           <NeuralCore />
           <Epilogue />
        </div>
      </div>
    </main>
  );
}
