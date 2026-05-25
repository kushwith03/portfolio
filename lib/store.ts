import { create } from "zustand";

interface AppState {
  scrollProgress: number;
  setScrollProgress: (progress: number) => void;
  isMobile: boolean;
  setIsMobile: (isMobile: boolean) => void;
  activeScene: number;
  setActiveScene: (scene: number) => void;
}

export const useStore = create<AppState>((set) => ({
  scrollProgress: 0,
  setScrollProgress: (progress) => set({ scrollProgress: progress }),
  isMobile: false,
  setIsMobile: (isMobile) => set({ isMobile }),
  activeScene: 0,
  setActiveScene: (scene) => set({ activeScene: scene }),
}));
