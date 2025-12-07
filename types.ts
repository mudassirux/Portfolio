
export type ContentBlock = 
  | { type: 'image-grid'; images: string[] }
  | { type: 'split-text'; label: string; body: string }
  | { type: 'gallery'; images: string[] }
  | { type: 'image-full'; image: string };

export interface Project {
  // Existing fields required for Homepage
  title: string;
  category: string;
  year: string;
  imageDescription: string;
  imageUrl: string;
  link: string;

  // New fields for Detail Page
  id: string;
  slug: string;
  subtitle?: string;
  role: string;
  services: string;
  description: string;
  content: ContentBlock[];
}

export interface Experience {
  year: string;
  role: string;
  company: string;
}

export interface PhysicsItem {
  id: string;
  text?: string;
  type: 'text' | 'icon' | 'image';
  bgColor: string;
  textColor: string;
  width?: number; // Approximate width for physics body
  height?: number;
  rotation?: number;
  isCircle?: boolean;
  url?: string;
  imageUrl?: string;
}
