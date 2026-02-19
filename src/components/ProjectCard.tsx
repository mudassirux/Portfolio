
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

  // Parse services for tags
  const tags = project.services ? project.services.split(',').map(s => s.trim()) : [];

  return (
    <Link to={`/works/${slug}`} className="block w-full cursor-pointer h-full">
      <div className="w-full h-full bg-zinc-50 dark:bg-zinc-800/50 rounded-[32px] p-4 group hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors duration-300 flex flex-col">
        {/* Image Container */}
        <div className="relative w-full aspect-[1.4] overflow-hidden rounded-[24px] mb-6 bg-zinc-200 dark:bg-zinc-700">
          {imageUrl && (
            <img
              src={imageUrl}
              alt={(project as any).imageDescription || project.title}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1">
          <div className="flex justify-between items-start mb-10">
            <h3 className="text-xl md:text-2xl font-semibold text-zinc-900 dark:text-[#FFFFFF] uppercase tracking-wide">
              {project.title}
            </h3>
            <span className="text-zinc-500 dark:text-[#A1A1AA] font-mono text-sm">{project.year}</span>
          </div>

          <div className="mt-auto flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-zinc-200/50 dark:bg-zinc-700/50 rounded-full text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
