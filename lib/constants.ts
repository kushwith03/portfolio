export const SCENES = {
  HOME: 0,
  PROJECTS: 1,
  EXPERIENCE: 2,
  STACK: 3,
  CONTACT: 4,
} as const;

export type SceneId = typeof SCENES[keyof typeof SCENES];

export const SCENE_ORDER: SceneId[] = [
  SCENES.HOME,
  SCENES.PROJECTS,
  SCENES.EXPERIENCE,
  SCENES.STACK,
  SCENES.CONTACT,
];

export const SCENE_THRESHOLDS = {
  [SCENES.HOME]: { start: 0, end: 0.19 },
  [SCENES.PROJECTS]: { start: 0.20, end: 0.49 },
  [SCENES.EXPERIENCE]: { start: 0.50, end: 0.69 },
  [SCENES.STACK]: { start: 0.70, end: 0.84 },
  [SCENES.CONTACT]: { start: 0.85, end: 1.0 },
} as const;
