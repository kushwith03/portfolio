"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import EngineeringStats from '../components/EngineeringStats';
import Projects from '../components/Projects';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import Chatbot from '../components/Chatbot';
import ResumeModal from '../components/ResumeModal';

export default function Home() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  useEffect(() => {
    const handleOpenResume = () => setIsResumeOpen(true);
    window.addEventListener('open-resume-modal', handleOpenResume);
    return () => window.removeEventListener('open-resume-modal', handleOpenResume);
  }, []);

  return (
    <main className="min-h-screen bg-white relative">
      <Navbar onOpenResume={() => setIsResumeOpen(true)} />
      <Hero onOpenResume={() => setIsResumeOpen(true)} />
      <About />
      <Skills />
      <EngineeringStats />
      <Projects />
      <Contact />
      <Footer />
      <Chatbot />
      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
    </main>
  );
}