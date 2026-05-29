"use client";

import Hero from '../components/Hero';
import Projects from '../components/Projects';
import Experience from '../components/Experience';
import Architecture from '../components/Architecture';
import NeuralCore from '../components/NeuralCore';
import Epilogue from '../components/Epilogue';
import CinematicController from '../components/motion/CinematicController';
import SystemIndex from '../components/SystemIndex';

/**
 * Root Page: Unified Narrative Stream
 * Pacing Pass 8: Continuous engineering journey with zero "void" screens.
 */
export default function Home() {
  return (
    <main className="relative">
      <CinematicController />
      <SystemIndex />

      <div 
        style={{ paddingLeft: 'var(--content-start)' }}
        className="relative"
      >
        {/* Scene 0: Home */}
        <div className="h-[100vh]">
          <Hero />
        </div>

        {/* Scene 1: Projects */}
        <div className="relative h-[180vh]">
           <Projects />
        </div>

        {/* Scene 2: Experience */}
        <div className="relative h-[100vh]">
           <Experience />
        </div>

        {/* Scene 3: Stack */}
        <div className="h-[120vh]">
           <Architecture />
        </div>

        {/* Scene 4: Contact */}
        <div className="h-[120vh]">
           <NeuralCore />
           <Epilogue />
        </div>
        
        {/* Terminal Buffer */}
        <div className="h-[80vh] bg-[#010101]" />
      </div>
    </main>
  );
}
