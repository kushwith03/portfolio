import Hero from '../components/Hero';
import Projects from '../components/Projects';
import NeuralCore from '../components/NeuralCore';
import CinematicController from '../components/motion/CinematicController';

export default function Home() {
  return (
    <main className="relative">
      {/* <CinematicController /> */}

      <div className="relative">
        <Hero />
        <Projects />
        <div className="h-[200vh]" /> 
      </div>

      <NeuralCore />
    </main>
  );
}