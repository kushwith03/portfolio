export interface Project {
  id: string;
  title: string;
  timeline?: string;
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

export interface Experience {
  role: string;
  company: string;
  period: string;
  location: string;
  details: string[];
}

export interface Education {
  institution: string;
  location: string;
  degree: string;
  timeline: string;
  cgpa: string;
}

export interface SkillsData {
  technical: SkillCategory;
  achievements: Achievement[];
  experience?: Experience[];
  education?: Education;
}
