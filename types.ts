
export interface Technology {
  name: string;
  colorClass: string;
}

export interface MainProject {
  id: string;
  title: string;
  description: string;
  simpleDescription?: string;
  fullDescription: string;
  responsibilities?: string[];
  screenshots: string[];
  icon: string;
  iconBg: string;
  technologies: Technology[];
  heroImage?: string;
  storeUrl?: string;
  githubUrl?: string;
  demoUrl?: string;
  documentUrl?: string;
  techStack?: string[];
  troubleshooting?: string[];
  implementation?: string[];
  learnings?: string[];
  performanceResults?: {
    label: string;
    value: string;
    delta: string;
  }[];
}

export interface Skill {
  id: string;
  title: string;
  icon: string;
}

export interface OtherProject {
  id: string;
  title: string;
  description: string;
  icon: string;
  tags: string[];
  heroImage?: string;
  externalUrl?: string;
  githubUrl?: string;
  screenshots?: string[];
  simpleDescription?: string;
  fullDescription?: string;
  keyFeatures?: string[];
}
