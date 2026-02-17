
import React from 'react';
import { Link } from 'react-router-dom';
import { Project } from '../types';
import { urlFor } from '../client';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  // Handle both Sanity and Legacy structures for migration safety
  const slug = (project as any).slug?.current || project.slug;
  const imageUrl = (project as any).mainImage
    ? urlFor((project as any).mainImage).width(3840).quality(100).fit('max').auto('format').url()
    : (project as any).imageUrl;

  return (
    <Link to={`/works/${slug}`} className="group block w-full cursor-pointer">
      <div className="relative w-full h-[396.5px] overflow-hidden bg-zinc-100 dark:bg-[#27272A] mb-8 transition-colors duration-300">
        {imageUrl && (
          <img
            src={imageUrl}
            alt={(project as any).imageDescription || project.title}
            className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110 filter grayscale group-hover:grayscale-0"
          />
        )}
      </div>
      <div className="flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-2xl font-bold text-zinc-900 dark:text-[#FFFFFF] group-hover:underline decoration-2 underline-offset-4 decoration-zinc-900 dark:decoration-white transition-colors duration-300">
            {project.title}
          </h3>
          <span className="text-zinc-400 dark:text-[#71717A] font-secondary text-sm pt-1 transition-colors duration-300">{project.year}</span>
        </div>
        <p className="text-zinc-500 dark:text-[#A1A1AA] font-secondary text-base transition-colors duration-300">{project.category}</p>
      </div>
    </Link>
  );
};

export default ProjectCard;
