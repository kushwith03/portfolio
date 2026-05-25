import Hero from '../components/Hero';
import Projects from '../components/Projects';
import AIAssistant from '../components/Chatbot';
import CinematicController from '../components/motion/CinematicController';

export default function Home() {
  return (
    <main className="relative">
      <CinematicController />

      <div className="relative z-10">
        <Hero />
        <Projects />
      </div>

      <AIAssistant />
    </main>
  );
}