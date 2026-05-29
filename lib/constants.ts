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
