// Define TypeScript interfaces
export interface Project {
  id: number;
  title: string;
  description: string;
  team: string;
  tags: string[];
  image: string;
  contributors: Contributor[];
}

export interface Contributor {
  id: number;
  name: string;
  role: string;
  avatar: string;
  github?: string;
}

export interface Event {
  id: number;
  title: string;
  date: string;
  time?: string;
  location: string;
  description: string;
  image: string;
  type?: string;
  registrationUrl?: string;
}
