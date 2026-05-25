import Hero from '../components/Hero';
import Projects from '../components/Projects';
import AIAssistant from '../components/Chatbot';

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <Projects />
      <AIAssistant />

      {/* 
        Future Sections:
        <About />
        <Skills />
        <Contact />
        <Footer />
        <Chatbot /> 
      */}
    </main>
  );
}