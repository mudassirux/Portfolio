
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
    ? urlFor((project as any).mainImage).width(1920).quality(100).fit('max').auto('format').url()
    : (project as any).imageUrl;

  // Parse services for display
  const categories = project.services || "";

  return (
    <Link to={`/works/${slug}`} className="block w-full cursor-pointer group">
      <div className="w-full flex flex-col">
        {/* Image Container */}
        <div className="relative w-full aspect-[16/10] overflow-hidden rounded-[5px] mb-4 bg-zinc-100 dark:bg-[#27272A]">
          {imageUrl && (
            <img
              src={imageUrl}
              alt={(project as any).imageDescription || project.title}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
            />
          )}
        </div>

        {/* Content */}
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-1">
            <h3 className="text-[17px] md:text-lg font-medium text-zinc-900 dark:text-[#FFFFFF] leading-tight">
              {project.title}
            </h3>
            <p className="text-[15px] md:text-[16px] text-zinc-400 dark:text-[#71717A] leading-tight">
              {categories}
            </p>
          </div>
          <span className="text-[15px] md:text-[16px] text-zinc-400 dark:text-[#71717A] font-normal pt-0.5">
            {project.year}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
