"use client";

import { useStore } from "@/lib/store";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { Zap, Target, Binary } from "lucide-react";

const FOCUS_ITEMS = [
  {
    icon: <Target className="w-5 h-5 text-cyan-400" />,
    label: "Scalable_Architectures",
    title: "Distributed Systems",
    desc: "Currently exploring high-concurrency patterns and cloud-native resilience for large-scale production environments."
  },
  {
    icon: <Binary className="w-5 h-5 text-blue-400" />,
    label: "Machine_Intelligence",
    title: "AI Infrastructure",
    desc: "Optimizing inference pipelines and building specialized LLM-integrated workflows for engineering productivity."
  },
  {
    icon: <Zap className="w-5 h-5 text-yellow-400" />,
    label: "Performance_Ops",
    title: "Zero-Downtime Deployment",
    desc: "Refining CI/CD automation and infrastructure-as-code to sustain 99.9% availability for mission-critical apps."
  }
];

export default function CurrentFocus() {
  const activeScene = useStore((state) => state.activeScene);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeScene === 5) {
      gsap.to(containerRef.current, { opacity: 1, filter: "blur(0px)", y: 0, duration: 1.2, ease: "power4.out" });
    } else {
      gsap.to(containerRef.current, { opacity: 0, filter: "blur(15px)", y: 20, duration: 0.6 });
    }
  }, [activeScene]);

  return (
    <section className="fixed inset-0 pointer-events-none z-10 flex items-center justify-center px-6 md:px-24">
      <div 
        ref={containerRef} 
        className="max-w-5xl w-full flex flex-col gap-16 opacity-0 translate-y-10 filter blur-xl"
      >
        <div className="flex flex-col gap-4 items-center text-center">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" />
            <span className="text-[10px] uppercase tracking-[0.6em] text-white/40 font-black">Active_Research // 2026</span>
          </div>
          <h2 className="text-5xl md:text-8xl font-black uppercase leading-none tracking-tighter text-white">
            Current Focus.
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {FOCUS_ITEMS.map((item, i) => (
            <div key={i} className="bg-white/[0.02] border border-white/5 p-8 flex flex-col gap-6 group pointer-events-auto cursor-default hover:bg-white/[0.05] transition-all duration-700">
               <div className="flex justify-between items-start">
                  <div className="p-3 bg-white/5 border border-white/10 group-hover:border-cyan-500/30 transition-colors">
                     {item.icon}
                  </div>
                  <span className="text-[8px] uppercase tracking-[0.4em] text-white/10 font-bold group-hover:text-cyan-400/40 transition-colors">
                    {item.label}
                  </span>
               </div>
               <div className="flex flex-col gap-2">
                  <h4 className="text-sm uppercase tracking-widest font-black text-white/80 group-hover:text-white transition-colors">{item.title}</h4>
                  <p className="text-xs text-white/30 leading-relaxed font-light group-hover:text-white/50 transition-colors">
                    {item.desc}
                  </p>
               </div>
               <div className="pt-4 mt-auto">
                  <div className="w-full h-px bg-white/5 relative overflow-hidden">
                     <div className="absolute inset-y-0 left-0 w-1/3 bg-cyan-500/50 group-hover:translate-x-[200%] transition-transform duration-1000" />
                  </div>
               </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
