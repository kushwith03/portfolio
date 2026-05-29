"use client";

import Hero from '../components/Hero';
import Projects from '../components/Projects';
import NeuralCore from '../components/NeuralCore';
import Epilogue from '../components/Epilogue';
import CinematicController from '../components/motion/CinematicController';
import SystemIndex from '../components/SystemIndex';
import Principles from '../components/Principles';
import Experience from '../components/Experience';
import Architecture from '../components/Architecture';
import CurrentFocus from '../components/CurrentFocus';

/**
 * Root Page: The Complete Engineering Journey
 * Spans ~900vh to accommodate the 7 narrative phases smoothly.
 */
export default function Home() {
  return (
    <main className="relative">
      <CinematicController />
      <SystemIndex />

      <div className="relative">
        {/* Scene 0: Identity Core (Hero) */}
        <div className="h-[100vh]">
          <Hero />
        </div>
        
        {/* Scene 1: Mindset (Principles) */}
        <div className="relative h-[150vh]">
          <Principles />
        </div>

        {/* Scene 2: Production Experience */}
        <div className="relative h-[150vh]">
          <Experience />
        </div>

        {/* Scene 3: System Architecture */}
        <div className="relative h-[150vh]">
          <Architecture />
        </div>
        
        {/* Scene 4: Artifacts / Projects */}
        <div className="relative h-[250vh]">
           <Projects />
        </div>

        {/* Scene 5: Current Focus / Active Research */}
        <div className="relative h-[150vh]">
           <CurrentFocus />
        </div>

        {/* Scene 6: Epilogue & Closure */}
        <div className="relative h-[100vh] bg-gradient-to-b from-transparent via-[#020202] to-[#010101]">
           <NeuralCore />
           <Epilogue />
        </div>
      </div>
    </main>
  );
}
