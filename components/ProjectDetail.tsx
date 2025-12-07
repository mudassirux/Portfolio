
import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { PROJECTS } from '../constants';
import { ArrowLeft } from 'lucide-react';

const ProjectDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const project = PROJECTS.find((p) => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!project) {
    return (
        <div className="min-h-screen bg-[#111111] text-white flex items-center justify-center">
            <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">Project not found</h2>
                <button onClick={() => navigate('/')} className="text-zinc-400 hover:text-white transition-colors">Go Back Home</button>
            </div>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#111111] text-white font-sans selection:bg-white selection:text-black">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full px-4 md:px-10 py-6 z-50 flex justify-between items-center mix-blend-difference">
         <Link to="/" className="group flex items-center gap-2 text-white hover:text-zinc-300 transition-colors">
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back to Home</span>
         </Link>
      </nav>

      <div className="max-w-screen-2xl mx-auto px-4 md:px-8 pt-32 pb-24">
        {/* Header Section */}
        <header className="mb-24 md:mb-32 animate-[fadeIn_0.6s_ease-out]">
            <h1 className="text-5xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-8 md:mb-12 uppercase leading-[0.9]">
                {project.title}
            </h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
                <div className="lg:col-span-8">
                    <p className="text-xl md:text-2xl lg:text-3xl font-light text-zinc-300 leading-relaxed">
                        {project.description}
                    </p>
                </div>
                <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-8 text-sm md:text-base border-t border-zinc-800 pt-8 lg:border-none lg:pt-0">
                    <div>
                        <span className="block text-zinc-500 mb-1 font-secondary uppercase tracking-widest text-xs">Year</span>
                        <span className="block font-medium">{project.year}</span>
                    </div>
                    <div>
                        <span className="block text-zinc-500 mb-1 font-secondary uppercase tracking-widest text-xs">Role</span>
                        <span className="block font-medium">{project.role}</span>
                    </div>
                    <div>
                        <span className="block text-zinc-500 mb-1 font-secondary uppercase tracking-widest text-xs">Services</span>
                        <span className="block font-medium">{project.services}</span>
                    </div>
                </div>
            </div>
        </header>

        {/* Content Loop */}
        <div className="flex flex-col gap-24 md:gap-40">
            {project.content.map((block, index) => {
                switch (block.type) {
                    case 'image-full':
                        return (
                            <div key={index} className="w-full">
                                <img src={block.image} alt="Project detail" className="w-full h-auto object-cover rounded-sm" />
                            </div>
                        );
                    
                    case 'image-grid':
                        return (
                            <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                                {block.images.map((img, i) => (
                                    <div key={i} className="aspect-[4/3] w-full overflow-hidden bg-zinc-900">
                                        <img src={img} alt={`Grid ${i}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                                    </div>
                                ))}
                            </div>
                        );

                    case 'split-text':
                        return (
                            <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 border-t border-zinc-800 pt-12">
                                <div className="md:col-span-4 lg:col-span-3">
                                    <h3 className="text-lg font-medium text-zinc-400 uppercase tracking-wide">{block.label}</h3>
                                </div>
                                <div className="md:col-span-8 lg:col-span-9">
                                    <p className="text-xl md:text-3xl font-light leading-relaxed text-zinc-100">
                                        {block.body}
                                    </p>
                                </div>
                            </div>
                        );

                    case 'gallery':
                        return (
                             <div key={index} className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {block.images.map((img, i) => (
                                    <div key={i} className={`aspect-square w-full overflow-hidden bg-zinc-900 ${i % 3 === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}>
                                        <img src={img} alt={`Gallery ${i}`} className="w-full h-full object-cover hover:opacity-80 transition-opacity duration-300" />
                                    </div>
                                ))}
                             </div>
                        );
                    default:
                        return null;
                }
            })}
        </div>

        {/* Footer Navigation */}
        <div className="mt-40 pt-20 border-t border-zinc-800 flex justify-between items-center">
            <Link to="/" className="text-4xl md:text-6xl font-bold hover:text-zinc-500 transition-colors tracking-tighter">
                Next Project
            </Link>
             <Link to="/" className="text-sm font-secondary text-zinc-500 hover:text-white transition-colors uppercase tracking-widest">
                Back to Home
            </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
