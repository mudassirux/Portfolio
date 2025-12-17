
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { EXPERIENCES } from './constants';
import { client, urlFor } from './client';
import PhysicsHeader from './components/PhysicsHeader';
import ProjectCard from './components/ProjectCard';
import ProjectDetail from './components/ProjectDetail';
import Footer from './components/Footer';
import { ArrowRight, Download, MoveRight, Moon, Sun } from 'lucide-react';

const Home: React.FC<{ isDarkMode: boolean; toggleTheme: () => void }> = ({ isDarkMode, toggleTheme }) => {
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const query = `*[_type == "project"] | order(year desc)`;
        // console.log("Fetching projects...");
        const data = await client.fetch(query);
        console.log("Fetched data in App:", data);
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    fetchProjects();
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-[#18181B] text-zinc-900 dark:text-[#FFFFFF] selection:bg-zinc-900 selection:text-white dark:selection:bg-white dark:selection:text-zinc-900 font-sans relative transition-colors duration-300">

      {/* Navigation - Absolute positioning to scroll with page */}
      <nav className="absolute top-0 left-0 w-full flex justify-between items-center px-4 md:px-10 py-5 md:py-6 z-50 pointer-events-none">
        <a
          href="mailto:ansarimudassir18@gmail.com"
          className="pointer-events-auto font-light text-base text-zinc-400 dark:text-[#A1A1AA] hover:text-zinc-900 dark:hover:text-[#FFFFFF] transition-colors"
        >
          ansarimudassir18@gmail.com
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
      </nav>

      <main className="w-full">
        {/* Physics Hero Section */}
        <section className="relative w-full h-[55vh] md:h-screen flex flex-col justify-end overflow-hidden transition-all duration-300">

          {/* Large Static Text Layer - z-10 (Background) */}
          <div id="hero-text-container" className="absolute bottom-0 left-0 z-10 w-full px-[20px] md:px-10 pb-4 md:pb-10 text-center select-none pointer-events-none flex justify-center">
            <h1
              className="w-fit mx-auto text-[15vw] xl:text-[14.5vw] leading-[0.8] font-semibold tracking-tighter uppercase text-zinc-900 dark:text-[#FFFFFF] whitespace-nowrap transition-colors duration-300"
              style={{ fontFamily: '"Space Grotesk", sans-serif' }}
            >
              MD MUDASSIR
            </h1>
          </div>

          {/* Physics Container Layer - z-20 (Foreground - Falling Over) */}
          <div className="absolute inset-0 z-20 pointer-events-none">
            {/* We pass pointer-events-auto inside the component to the canvas/div */}
            <PhysicsHeader isDarkMode={isDarkMode} />
          </div>
        </section>


        {/* Featured Images Section */}
        <section className="w-full px-4 md:px-10 mt-4 md:mt-10 mb-12 md:mb-20 max-w-screen-2xl mx-auto">
          {projects.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
              <div className={`w-full aspect-[4/3] bg-zinc-100 dark:bg-[#27272A] rounded-lg md:rounded-2xl overflow-hidden hover:scale-[1.02] transition-transform duration-500 ${projects.length === 1 ? 'md:col-span-2' : ''}`}>
                {projects[0].mainImage && (
                  <img
                    src={urlFor(projects[0].mainImage).width(3840).quality(100).fit('max').auto('format').url()}
                    alt="Featured Project 1"
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              {projects.length >= 2 && (
                <div className="w-full aspect-[4/3] bg-zinc-100 dark:bg-[#27272A] rounded-lg md:rounded-2xl overflow-hidden hover:scale-[1.02] transition-transform duration-500">
                  {projects[1].mainImage && (
                    <img
                      src={urlFor(projects[1].mainImage).width(1600).quality(100).fit('max').auto('format').url()}
                      alt="Featured Project 2"
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              )}
            </div>
          )}
        </section>

        {/* Introduction Section */}
        <section className="px-4 md:px-8 py-24 md:py-32 max-w-screen-2xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-[40px] lg:gap-16">
            <div className="lg:col-span-7">
              <h2 className="text-4xl md:text-6xl font-medium leading-[1.1] mb-8 tracking-tight max-w-[11em]">
                Hi, I'm Mudassir. I turn "wild ideas" into things that actually work.
              </h2>
              {/* Divider line */}
              <div className="w-24 h-1.5 bg-zinc-900 dark:bg-[#FFFFFF] mb-0 lg:mb-8 transition-colors duration-300"></div>
            </div>
            <div className="lg:col-span-5 flex flex-col justify-between pt-0 lg:pt-2">
              <p className="text-xl text-zinc-500 dark:text-[#A1A1AA] leading-relaxed mb-10 transition-colors duration-300">
                Product Designer just trying to make tech less confusing. I've taken startups from zero assets to investor-ready MVPs and built AI interfaces that cure "blank canvas paralysis".
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="group flex items-center gap-2 px-8 py-4 bg-zinc-900 dark:bg-[#FFFFFF] text-white dark:text-[#18181B] rounded-full hover:bg-zinc-800 dark:hover:bg-[#E4E4E7] transition-all font-medium">
                  About Me
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="group flex items-center gap-2 px-8 py-4 border border-zinc-200 dark:border-[#3f3f46] rounded-full hover:border-zinc-900 dark:hover:border-[#FFFFFF] transition-all font-medium bg-white dark:bg-[#18181B] dark:text-[#FFFFFF]">
                  Resume
                  <Download size={18} className="group-hover:translate-y-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Selected Works Section */}
        <section className="px-4 md:px-8 py-20 max-w-screen-2xl mx-auto">
          <div className="border-t border-zinc-200 dark:border-[#3f3f46] pt-8 mb-16 flex flex-col md:flex-row justify-between items-baseline transition-colors duration-300">
            <h2 className="text-5xl md:text-6xl font-semibold tracking-tight">Selected Works</h2>
            <span className="text-zinc-400 dark:text-[#71717A] font-secondary text-lg mt-2 md:mt-0 transition-colors duration-300">2021 — 2024</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
            {projects.map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
          </div>


        </section>

        {/* Experience Section */}
        <section className="px-4 md:px-8 py-32 bg-white dark:bg-[#18181B] transition-colors duration-300">
          <div className="max-w-screen-2xl mx-auto">
            <h2 className="text-5xl md:text-7xl font-bold mb-24 tracking-tighter">Experiences</h2>
            <div className="flex flex-col">
              {EXPERIENCES.map((exp, index) => (
                <div key={index} className="group flex flex-col md:flex-row md:items-center justify-between border-t border-zinc-200 dark:border-[#3f3f46] py-12 hover:bg-zinc-50/50 dark:hover:bg-[#27272A]/50 transition-colors px-4 -mx-4">
                  <span className="text-zinc-400 dark:text-[#71717A] font-secondary text-lg mb-2 md:mb-0 w-32 transition-colors duration-300">{exp.year}</span>
                  <h3 className="text-3xl md:text-4xl font-semibold mb-2 md:mb-0 flex-1">{exp.role}</h3>
                  <p className="text-xl text-zinc-500 dark:text-[#A1A1AA] w-64 md:text-right transition-colors duration-300">{exp.company}</p>
                </div>
              ))}
              <div className="border-t border-zinc-200 dark:border-[#3f3f46] transition-colors duration-300"></div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};


const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <BrowserRouter>
      <div className={isDarkMode ? 'dark' : ''}>
        <Routes>
          <Route path="/" element={<Home isDarkMode={isDarkMode} toggleTheme={toggleTheme} />} />
          <Route path="/works/:slug" element={<ProjectDetail />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
