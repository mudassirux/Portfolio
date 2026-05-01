
import { Experience, PhysicsItem, Project } from './types';

export const HERO_PHYSICS_ITEMS: PhysicsItem[] = [
  { id: '1', text: 'I MAKE FUNCTIONAL DESIGN 🔭', type: 'text', bgColor: '#FFFFFF', textColor: '#000000', width: 200 },
  { id: '2', text: 'PRODUCT DESIGNER 🧑‍🎨', type: 'text', bgColor: '#FFFFFF', textColor: '#000000', rotation: 15, width: 220 },
  { id: '3', text: 'BLR 📍', type: 'text', bgColor: '#FFFFFF', textColor: '#000000', width: 100 },
  { id: '4', text: 'CO-FOUNDER @ MORPHIA ', type: 'text', bgColor: '#FFFFFF', textColor: '#000000', rotation: -10, width: 210 },
  { id: '5', type: 'icon', bgColor: '#18181b', textColor: '#FFFFFF', isCircle: true, width: 80, height: 80 },
  {
    id: '6',
    type: 'icon',
    bgColor: '#18181b',
    textColor: '#FFFFFF',
    isCircle: true,
    width: 80,
    height: 80,
    url: 'https://github.com/mudassirux',
    imageUrl: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA5OCA5NiI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik00OC44NTQgMEMyMS44MzkgMCAwIDIyIDAgNDkuMjE3YzAgMjEuNzU2IDEzLjk5MyA0MC4xNzIgMzMuNDA1IDQ2LjY5IDIuNDI3LjQ5IDMuMzE2LTEuMDU5IDMuMzE2LTIuMzYyIDAtMS4xNDEtLjA4LTUuMDUyLS4wOC05LjEyNy0xMy41OSAyLjkzNC0xNi40Mi01Ljg2Ny0xNi40Mi01Ljg2Ny0yLjE4NC01LjcwNC01LjQyLTcuMTctNS40Mi03LjE3LTQuNDQ4LTMuMDE1LjMyNC0zLjAxNS4zMjQtMy4wMTUgNC45MzQuMzI2IDcuNTIzIDUuMDUyIDcuNTIzIDUuMDUyIDQuMzY3IDcuNDk2IDExLjQwNCA1LjM3OCAxNC4yMzUgNC4wNzQuNDA0LTMuMTc4IDEuNjk5LTUuMzc4IDMuMDc0LTYuNi0xMC44MzktMS4xNDEtMjIuMjQzLTUuMzc4LTIyLjI0My0yNC4yODMgMC01LjM3OCAxLjk0LTkuNzc4IDUuMDE0LTEzLjJjLS44ODUtMS4yMjItMi4xODQtNi4yNzUuNDg2LTEzLjAzOCAwIDAgNC4xMjUtMS4zMDQgMTMuNDI2IDUuMDUyYTQ2Ljk3IDQ2Ljk3IDAgMCAxIDEyLjIxNC0xLjYzYzQuMTI1IDAgOC4zMzAuNTcxIDEyLjIxMyAxLjYzIDkuMzAyLTYuMzU2IDEzLjQyNy01LjA1MiAxMy4yNy01LjA1MiAyLjY3IDYuNzYzLjk3IDExLjgxNi40ODUgMTMuMDM4IDMuMTU1IDMuNDIyIDUuMDE1IDcuODIyIDUuMDE1IDEzLjIgMCAxOC45MDUtMTEuNDA0IDIzLjA2LTIyLjMyNCAyNC4yODMgMS43OCAxLjU0OCAzLjMxNiA0LjQ4MSAzLjMxNiA5LjEyNiAwIDYuNi0uMDggMTEuODk3LS4wOCAxMy41MjYgMCAxLjMwNC44OSAyLjg1MyAzLjMxNiAyLjM2NCAxOS40MTItNi41MiAzMy40MDUtMjQuOTM1IDMzLjQwNS00Ni42OTFDOTcuNzA3IDIyIDc1Ljc4OCAwIDQ4Ljg1NCAweiIgZmlsbD0iI2ZmZmZmZiIvPjwvc3ZnPg=='
  },
  {
    id: '7',
    type: 'icon',
    bgColor: '#0077b5',
    textColor: '#0077b5',
    isCircle: true,
    width: 80,
    height: 80,
    url: 'https://www.linkedin.com/in/mudassirux/',
    imageUrl: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0id2hpdGUiPjxwYXRoIGQ9Ik0xOSAwaC0xNGMtMi43NjEgMC01IDIuMjM5LTUgNXYxNGMwIDIuNzYxIDIuMjM5IDUgNSA1aDE0YzIuNzYyIDAgNS0yLjIzOSA1LTV2LTE0YzAtMi43NjEtMi4yMzgtNS01LTV6bS0xMSAxOWgtM3YtMTFoM3YxMXptLTEuNTc2LTEyLjcyYy0xLjA2NiAwLTEuOTM2LS44NjMtMS45MzYtMS45MjUgMC0xLjA2MS44Ny0xLjkyNiAxLjkzNi0xLjkyNiAxLjA3MyAwIDEuOTQ4Ljg2NSAxLjk0OCAxLjkyNiAwIDEuMDYyLS44NzUgMS45MjUtMS45NDggMS45MjV6bTEyLjU3NiAxMi43MmgtM3YtNS42MzVjMC0xLjM2MS0uMDI4LTMuMTEzLTEuODk1LTMuMTEzLTEuODk4IDAtMi4xODkgMS40ODUtMi4xODkgMy4wMjN2NS43MjVoLTN2LTExaDN2MS41NjFoLjA0MWMuNDE3LS43OSAxLjQzOC0xLjYyNSAyLjk2My0xLjYyNSAzLjE2OSAwIDMuNzU2IDIuMDg2IDMuNzU2IDQuNzk4djYuMjY2eiIvPjwvc3ZnPg=='
  },
];

export const PROJECTS: Project[] = [
  {
    id: 'p1',
    slug: 'n1-widgets',
    title: 'Morphia',
    subtitle: 'UI/UX • System Design',
    category: 'Co-founder,Lead Designer',
    year: '2025',
    role: 'Lead Designer, Co-founder',
    services: 'UI Animation, Type Designer',
    imageDescription: 'UI minimalistic widgets interface',
    mainImage: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=2070&auto=format&fit=crop',
    description: 'It is an AI-powered image generator that creates ads, portraits, illustrations, icons and product visuals from simple text prompts. It gives you complete control over colors, styles, and aspect ratios, so every image fits your brand and your layout.',
    content: [
      {
        _type: 'image-grid',
        images: [
          'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000&auto=format&fit=crop'
        ]
      },
      {
        _type: 'split-text',
        label: 'About',
        body: 'This project is entirely independent. I deeply admire the teams at Nothing and their approach to technology. This concept explores how their design philosophy could extend into a wider widget ecosystem, focusing on raw functionality and dot-matrix aesthetics.'
      },
      {
        _type: 'gallery',
        images: [
          'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=800&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?q=80&w=800&auto=format&fit=crop'
        ]
      }
    ]
  },
  {
    id: 'p2',
    slug: 'h23',
    title: 'H23',
    subtitle: 'Branding',
    category: 'Branding',
    year: '2024',
    role: 'Lead Designer',
    services: 'Brand Identity',
    imageDescription: 'Laptop displaying H32 logo',
    mainImage: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=2070&auto=format&fit=crop',
    description: 'A bold new identity for H23.',
    content: []
  },
  {
    id: 'p3',
    slug: 'glod-water',
    title: 'Glod Water',
    subtitle: 'Packaging',
    category: 'Packaging design',
    year: '2024',
    role: 'Packaging Designer',
    services: '3D Modeling, Print Design',
    imageDescription: 'Packaging design for Glod Water',
    mainImage: 'https://images.unsplash.com/photo-1603565017255-e7d6928e4618?q=80&w=2069&auto=format&fit=crop',
    description: 'Luxury water packaging design.',
    content: []
  },
];

export const EXPERIENCES: Experience[] = [
  {
    year: '2026',
    role: 'Co-Founder/Lead Designer',
    company: 'Morphia',
    description: [
      'Designed and vibe coded (using figma, lovable and antigravity) a modular prompt composition interface that guides users through selecting styles, subjects, and actions, reducing "blank canvas paralysis" and enabling non-technical users to generate high-quality assets instantly.',
      'Implemented specialized styles for distinct user segments (Designers, Marketers, Casual), creating dedicated paths for generating vector art, icons, and product ads that decreased asset production time by an estimated 55%.',
      'Established a scalable design framework that allows for the seamless addition of new generative categories, ensuring the platform can expand to new use cases without disrupting the core user experience or visual consistency.'
    ]
  },
  {
    year: '2025',
    role: 'Product Designer',
    company: 'SurveyAgent',
    description: [
      'Translated the founder\'s "wild idea" into a tangible, investor-ready MVP, effectively moving the startup from zero assets to a production-ready product capable of securing seed funding.',
      'Clarified a complex technical vision (Twilio & ElevenLabs integration) into a user-friendly "Agent Builder" "Lead Management" interface, ensuring the product was not just functional, but intuitive enough to generate immediate intent-to-use from beta testers.',
      'Improved dashboard workflows, making navigation 60% faster for non-technical users and increasing overall platform adoption.',
      'Conducted usability testing with 5+ early users, reducing onboarding friction and improving task completion time by 35%.',
      'Worked with developers for a 100% consistent design-to-development handoff, ensuring smooth release cycles.'
    ]
  },
  {
    year: '2024',
    role: 'Freelance/Personal Project',
    company: 'Card Commune',
    description: [
      'Executed the complete design lifecycle (from research to high-fidelity UI) to solve the lack of transparency in finance, creating a prototype that explicitly highlights hidden charges and terms.',
      'Designed a "Lounge Finder" tool that connects cardholders to 50+ airport and partner lounges worldwide, turning complex benefit tables into a simple, location-based search feature.',
      'Validated the product logic by conducting usability testing with 5+ potential users, using their feedback to iterate on the design and ensure the financial data was easy to understand for non-experts.'
    ]
  },
];

export const SOCIAL_LINKS = [
  { name: 'EMAIL', url: 'mailto:ansarimudassir18@gmail.com' },
  { name: 'LINKEDIN', url: 'https://www.linkedin.com/in/mudassirux/' },
];
