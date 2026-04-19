
import React, { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { EXPERIENCES, PROJECTS } from './constants';
import { client, urlFor } from './client';
import PhysicsHeader from './components/PhysicsHeader';
import ProjectCard from './components/ProjectCard';
import Footer from './components/Footer';
import { ArrowRight, Download, Moon, Sun } from 'lucide-react';

const ProjectDetail = lazy(() => import('./components/ProjectDetail'));
const StudioPage = lazy(() => import('./components/StudioPage'));

const Home: React.FC<{ isDarkMode: boolean; toggleTheme: () => void }> = ({ isDarkMode, toggleTheme }) => {
  const [projects, setProjects] = useState<any[]>([]);
  const layoutContainer = 'w-full px-4 md:px-10 xl:px-[64px]';
  const sectionSpacing = 'py-24 md:py-32';
  const metaLabelClass = 'font-secondary text-xs uppercase tracking-[0.18em] text-zinc-500 dark:text-[#71717A]';

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const query = `*[_type == "project"] | order(year desc)`;
        const data = await client.fetch(query);
        if (data && data.length > 0) {
          setProjects(data);
        } else {
          setProjects(PROJECTS);
        }
      } catch (error) {
        console.error("Error fetching projects, falling back to local data:", error);
        setProjects(PROJECTS);
      }
    };
    fetchProjects();
  }, []);


  return (
    <div className="min-h-screen bg-white dark:bg-[#18181B] text-zinc-900 dark:text-[#FFFFFF] selection:bg-zinc-900 selection:text-white dark:selection:bg-white dark:selection:text-zinc-900 font-sans relative transition-colors duration-300">

      {/* Navigation - Absolute positioning to scroll with page */}
      <nav className="absolute top-0 left-0 w-full z-50 pointer-events-none pt-6 md:pt-10 xl:pt-[64px] pb-5 md:pb-6">
        <div className={`${layoutContainer} flex justify-between items-center`}>
          <a
            href="mailto:ansarimudassir18@gmail.com"
            className="pointer-events-auto flex items-center justify-center w-16 h-16 rounded-full bg-zinc-900 dark:bg-[#FFFFFF] text-white dark:text-zinc-900 font-semibold text-2xl"
          >
            M
          </a>
          <button
            onClick={toggleTheme}
            className="pointer-events-auto cursor-pointer group p-2 rounded-full bg-zinc-100 dark:bg-[#27272A] hover:bg-zinc-200 dark:hover:bg-[#3f3f46] transition-colors"
            aria-label="Toggle Dark Mode"
          >
            {isDarkMode ? (
              <Sun size={20} className="text-[#FFFFFF]" />
            ) : (
              <Moon size={20} className="text-zinc-900" />
            )}
          </button>
        </div>
      </nav>

      <main className="w-full">
        {/* Physics Hero Section */}
        <section className="relative w-full h-[55vh] md:h-[75vh] flex flex-col justify-end overflow-hidden transition-all duration-300">

          {/* Large Static Text Layer - z-10 (Background) */}
          <div className="absolute bottom-0 left-0 w-full z-10 pt-[5px] pb-[30px] text-center select-none pointer-events-none">
            <div id="hero-text-container" className={`${layoutContainer} flex justify-center`}>
              <h1
                className="w-fit mx-auto text-[15vw] xl:text-[14.5vw] leading-[0.8] font-semibold tracking-tighter uppercase text-zinc-900 dark:text-[#FFFFFF] whitespace-nowrap transition-colors duration-300"
                style={{ fontFamily: '"Space Grotesk", sans-serif' }}
              >
                MD MUDASSIR
              </h1>
            </div>
          </div>

          {/* Physics Container Layer - z-20 (Foreground - Falling Over) */}
          <div className="absolute inset-0 z-20 pointer-events-none">
            {/* We pass pointer-events-auto inside the component to the canvas/div */}
            <PhysicsHeader isDarkMode={isDarkMode} />
          </div>
        </section>


        {/* Featured Images Section */}
        <section className="w-full mt-0 mb-16 md:mb-24">
          <div className={layoutContainer}>
            {projects.length > 0 && (
              <div className="w-full aspect-[16/10] bg-zinc-100 dark:bg-[#27272A] rounded-[5px] overflow-hidden hover:scale-[1.01] transition-transform duration-700 ease-out">
                {projects[0].mainImage && (
                  <img
                    src={urlFor(projects[0].mainImage).width(3840).quality(100).fit('max').auto('format').url()}
                    alt={projects[0].title || "Featured Project"}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            )}
          </div>
        </section>

        {/* Introduction Section */}
        <section id="about" className={`w-full pt-[120px] pb-[120px]`}>
          <div className={layoutContainer}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[40px] md:gap-x-[32px]">
              <div className="flex flex-col justify-start">
                <h2 className="text-4xl md:text-5xl lg:text-[56px] font-medium leading-[1.1] mb-8 tracking-tight max-w-[12em] text-zinc-900 dark:text-[#FFFFFF]">
                  Hi, I'm Mudassir. I turn "wild ideas" into things that actually work.
                </h2>
                {/* Divider line */}
                <div className="w-24 h-1 bg-zinc-900 dark:bg-[#FFFFFF] mb-0 lg:mb-8 transition-colors duration-300"></div>
              </div>
              <div className="flex flex-col justify-between pt-0">
                <p className="text-lg md:text-[24px] text-zinc-900 dark:text-[#E4E4E7] leading-relaxed font-light tracking-tight mb-10 transition-colors duration-300">
                  Product Designer just trying to make tech less confusing. I've taken startups from zero assets to investor-ready MVPs and built AI interfaces that cure "blank canvas paralysis".
                </p>
                <div className="flex flex-wrap gap-4">
                  <a href="#experiences" className="group flex items-center gap-2 px-6 py-3 bg-zinc-900 dark:bg-[#FFFFFF] text-white dark:text-[#18181B] rounded-full hover:bg-zinc-800 dark:hover:bg-[#E4E4E7] transition-all font-medium text-[15px]">
                    About Me
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/mudassirux/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 px-6 py-3 border border-zinc-200 dark:border-[#3f3f46] rounded-full hover:border-zinc-900 dark:hover:border-[#FFFFFF] transition-all font-medium bg-white dark:bg-[#18181B] dark:text-[#FFFFFF] text-[15px]"
                  >
                    Resume
                    <Download size={16} className="group-hover:translate-y-1 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Selected Works Section */}
        <section className={`w-full`}>
          <div className={layoutContainer}>
            <div className="pt-[90px] pb-[30px] mb-[64px] flex flex-col md:flex-row justify-between items-baseline transition-colors duration-300">
              <h2 className="text-4xl md:text-5xl lg:text-[56px] font-medium tracking-tight text-zinc-900 dark:text-[#FFFFFF]">Case Study</h2>
              <span className={`${metaLabelClass} mt-3 md:mt-0 font-medium`}>2021 — 2024</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[32px] gap-y-[64px]">
              {projects.map((project, index) => (
                <ProjectCard key={index} project={project} />
              ))}
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experiences" className={`w-full bg-white dark:bg-[#18181B] transition-colors duration-300`}>
          <div className={layoutContainer}>
            <div className="pt-[90px] pb-[30px] mb-[64px] flex flex-col md:flex-row justify-between items-baseline transition-colors duration-300">
              <h2 className="text-4xl md:text-5xl lg:text-[56px] font-medium tracking-tight text-zinc-900 dark:text-[#FFFFFF]">Experiences</h2>
            </div>
            <div className="flex flex-col">
              {EXPERIENCES.map((exp, index) => (
                <div key={index} className={`group flex flex-col ${index === 0 ? 'pb-10 md:pb-12 pt-0' : 'py-10 md:py-12'} transition-colors`}>
                  {/* Header Row */}
                  <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-6 md:mb-8">
                    <h3 className="text-[21px] md:text-2xl font-medium text-zinc-900 dark:text-[#FFFFFF] mb-2 md:mb-0">
                      {exp.role}, <span className="text-zinc-500 dark:text-[#A1A1AA] font-normal">{exp.company}</span>
                    </h3>
                    <span className={`${metaLabelClass} font-medium whitespace-nowrap`}>{exp.year}</span>
                  </div>

                  {/* Description List */}
                  <ul className="list-disc pl-5 space-y-3">
                    {exp.description && exp.description.map((point, i) => (
                      <li key={i} className="text-[15px] md:text-[17px] text-zinc-500 dark:text-[#A1A1AA] leading-relaxed pl-2 font-normal">
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};


const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window === 'undefined') return false;

    const storedTheme = window.localStorage.getItem('theme');
    if (storedTheme === 'dark') return true;
    if (storedTheme === 'light') return false;

    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    window.localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <BrowserRouter>
      <div className={isDarkMode ? 'dark' : ''}>
        <Suspense
          fallback={
            <div className="min-h-screen bg-white dark:bg-[#18181B] text-zinc-900 dark:text-[#FFFFFF] flex items-center justify-center font-sans transition-colors duration-300">
              <div className="text-sm font-secondary uppercase tracking-[0.18em] text-zinc-500 dark:text-[#71717A]">
                Loading
              </div>
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Home isDarkMode={isDarkMode} toggleTheme={toggleTheme} />} />
            <Route path="/works/:slug" element={<ProjectDetail />} />
            <Route path="/studio/*" element={<StudioPage />} />
          </Routes>
        </Suspense>
      </div>
    </BrowserRouter>
  );
};

export default App;
