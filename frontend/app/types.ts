export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  link?: string;
  github?: string;
  imageUrl?: string;
}

export interface SkillCategory {
  languages: string[];
  frontend: string[];
  backend: string[];
  db_cloud: string[];
  tools: string[];
}

export interface Achievement {
  title: string;
  desc: string;
}

export interface SkillsData {
  technical: SkillCategory;
  achievements: Achievement[];
}