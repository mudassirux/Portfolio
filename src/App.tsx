
import React, { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { EXPERIENCES } from './constants';
import { PROJECTS } from './data/projects';
import PhysicsHeader from './components/PhysicsHeader';
import ProjectCard from './components/ProjectCard';
import Footer from './components/Footer';
import { ArrowRight, Download, Moon, Sun } from 'lucide-react';

const ProjectDetail = lazy(() => import('./components/ProjectDetail'));

const Home: React.FC<{ isDarkMode: boolean; toggleTheme: () => void }> = ({ isDarkMode, toggleTheme }) => {
  const projects = PROJECTS;
  const layoutContainer = 'w-full px-4 md:px-10 xl:px-[64px]';
  const metaLabelClass = 'text-[11px] font-mono uppercase tracking-[0.15em] text-ink-secondary';


  return (
    <div className="min-h-screen bg-bg-page text-ink selection:bg-ink selection:text-bg-page font-sans relative transition-colors duration-300">

      {/* Navigation - Sticky positioning with backdrop blur */}
      <nav className="sticky top-0 left-0 w-full z-50 bg-bg-page/85 backdrop-blur-md border-b border-ink/5 py-4 transition-colors duration-300">
        <div className={`${layoutContainer} flex justify-between items-center`}>
          <a
            href="/"
            className="pointer-events-auto flex items-center justify-center w-10 h-10 rounded-full bg-ink text-bg-page font-normal text-lg"
          >
            M
          </a>
          <button
            onClick={toggleTheme}
            className="pointer-events-auto cursor-pointer group p-2 rounded-full bg-bg-card hover:opacity-80 transition-opacity"
            aria-label="Toggle Dark Mode"
          >
            {isDarkMode ? (
              <Sun size={20} className="text-ink" />
            ) : (
              <Moon size={20} className="text-ink" />
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
                className="w-fit mx-auto text-[15vw] xl:text-[14.5vw] leading-[0.8] font-semibold tracking-tighter uppercase text-ink whitespace-nowrap transition-colors duration-300 font-grotesk"
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
              <div className="w-full aspect-[16/10] bg-bg-card rounded-[5px] overflow-hidden hover:scale-[1.01] transition-transform duration-700 ease-out">
                {projects[0].mainImage && (
                  <img
                    src={typeof projects[0].mainImage === 'string' ? projects[0].mainImage : (projects[0].mainImage?.url || '')}
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
                <h2 className="text-4xl md:text-[3rem] font-dm-serif font-normal leading-[1.15] mb-8 tracking-tight max-w-[12em] text-ink">
                  Hi, I'm Mudassir. I turn "wild ideas" into things that actually work.
                </h2>
              </div>
              <div className="flex flex-col justify-between pt-0">
                <p className="text-[1.125rem] font-sans font-light text-ink leading-relaxed tracking-tight mb-10 transition-colors duration-300">
                  Product Designer just trying to make tech less confusing. I've taken startups from zero assets to investor-ready MVPs and built AI interfaces that cure "blank canvas paralysis".
                </p>
                <div className="flex flex-wrap gap-4">
                  <a href="#experiences" className="group flex items-center gap-2 px-6 py-3 bg-ink text-bg-page rounded-full hover:opacity-80 transition-all font-medium text-[15px]">
                    About Me
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/mudassirux/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 px-6 py-3 border border-ink/20 hover:border-ink rounded-full transition-all font-medium bg-bg-card text-ink text-[15px]"
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
              <h2 className="text-4xl md:text-[3rem] font-dm-serif font-normal tracking-tight text-ink">Selected Work</h2>
              <span className={`${metaLabelClass} mt-3 md:mt-0 font-medium`}>2024 — 2025</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[32px] gap-y-[64px]">
              {projects.map((project, index) => (
                <ProjectCard key={index} project={project} />
              ))}
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experiences" className={`w-full bg-bg-page transition-colors duration-300`}>
          <div className={layoutContainer}>
            <div className="pt-[90px] pb-[30px] mb-[64px] flex flex-col md:flex-row justify-between items-baseline transition-colors duration-300">
              <h2 className="text-4xl md:text-[3rem] font-dm-serif font-normal tracking-tight text-ink">Experiences</h2>
            </div>
            <div className="flex flex-col">
              {EXPERIENCES.map((exp, index) => (
                <div key={index} className={`group flex flex-col ${index === 0 ? 'pb-10 md:pb-12 pt-0' : 'py-10 md:py-12'} transition-colors`}>
                  {/* Header Row */}
                  <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-6 md:mb-8">
                    <h3 className="text-[21px] md:text-2xl font-medium text-ink mb-2 md:mb-0">
                      {exp.role}, <span className="text-ink-secondary font-normal">{exp.company}</span>
                    </h3>
                    <span className={`${metaLabelClass} font-medium whitespace-nowrap`}>{exp.year}</span>
                  </div>

                  {/* Description List */}
                  <ul className="space-y-3 pl-0">
                    {exp.description && exp.description.map((point, i) => (
                      <li key={i} className="flex items-start text-[15px] md:text-[17px] text-ink-secondary leading-relaxed font-normal">
                        <span className="mr-3 shrink-0 text-ink-secondary/60 select-none">—</span>
                        <span>{point}</span>
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
            <div className="min-h-screen bg-bg-page text-ink flex items-center justify-center font-sans transition-colors duration-300">
              <div className="text-sm uppercase tracking-[0.18em] text-ink-secondary">
                Loading
              </div>
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Home isDarkMode={isDarkMode} toggleTheme={toggleTheme} />} />
            <Route path="/works/:slug" element={<ProjectDetail />} />
          </Routes>
        </Suspense>
      </div>
    </BrowserRouter>
  );
};

export default App;
