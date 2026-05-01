
export type ContentBlock =
  | { _type: 'section'; title?: string; leftColumn?: any[]; content?: any[]; rightColumn?: any[] }
  | { _type: 'split-text'; label: string; body?: string }
  | { _type: 'richText'; content: any[] }
  | { _type: 'quoteBlock'; text: string }
  | { _type: 'tableBlock'; columns: string[]; rows: any[]; highlightRow?: number }
  | { _type: 'beforeAfterBlock'; before: { label: string; items: string[] }; after: { label: string; items: string[] } }
  | { _type: 'flowBlock'; steps: { title: string; desc: string; active?: boolean }[] }
  | { _type: 'tokensBlock'; items: { name: string; hex: string; border?: boolean }[] }
  | { _type: 'metricsBlock'; items: { value: string; label: string }[] }
  | { _type: 'learningsBlock'; items: { num: string; title: string; body: string }[] }
  | { _type: 'image'; image: any; alt?: string; caption?: string }
  | { _type: 'image-full'; image: any; alt?: string; caption?: string }
  | { _type: 'image-grid'; images: any[] }
  | { _type: 'gallery'; images: any[] }
  | { _type: 'divider' }
  | { _type: 'padding' };

export interface MetaItem {
  label: string;
  value: string;
}

export interface Project {
  id: string;
  slug: { current: string } | string;
  title: string;
  subtitle?: string;
  subtitleItalic?: string;
  eyebrow?: string;
  category?: string;
  year?: string;
  role?: string;
  services?: string;
  description: string;
  mainImage?: any;
  imageDescription?: string;
  accentColor?: string;
  heroMeta?: MetaItem[];
  liveLink?: string;
  liveLinkLabel?: string;
  content: ContentBlock[];
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
  width?: number;
  height?: number;
  rotation?: number;
  isCircle?: boolean;
  url?: string;
  imageUrl?: string;
}
