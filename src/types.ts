
export type ContentBlock =
  | { type: 'image-grid'; images: any[] } // Sanity images
  | { type: 'split-text'; label: string; body: string }
  | { type: 'gallery'; images: any[] }
  | { type: 'image-full'; image: any; alt?: string };

export interface Project {
  // Legacy/Frontend fields
  title: string;
  category: string;
  year: string;
  imageDescription: string;
  imageUrl: string;
  link: string; // Legacy
  id: string;
  slug: string;
  subtitle?: string;
  role: string;
  services: string;
  description: string;
  content: ContentBlock[];
}

export interface SanityProject {
  _id: string;
  title: string;
  slug: { current: string };
  subtitle?: string;
  category?: string;
  year?: string;
  role?: string;
  services?: string;
  description?: string;
  mainImage?: any;
  imageDescription?: string; // Add to schema if needed
  link?: string;
  content?: ContentBlock[];
}

export interface Experience {
  year: string;
  role: string;
  company: string;
  description: string[];
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
