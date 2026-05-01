import React from 'react';
import { Link } from 'react-router-dom';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const slug = typeof project.slug === 'string' ? project.slug : project.slug.current;
  
  const imageUrl = project.mainImage 
    ? (typeof project.mainImage === 'string' ? project.mainImage : (project.mainImage.url || ''))
    : (project as any).imageUrl;

  const categories = project.services || "";

  return (
    <Link to={`/works/${slug}`} className="block w-full cursor-pointer group">
      <div className="w-full flex flex-col">
        {/* Image Container */}
        <div className="relative w-full aspect-[16/10] overflow-hidden rounded-xl mb-4 bg-bg-card">
          {imageUrl && (
            <img
              src={imageUrl}
              alt={project.imageDescription || project.title}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
            />
          )}
        </div>

        {/* Content */}
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-1">
            <h3 className="text-[17px] md:text-lg font-medium text-ink leading-tight">
              {project.title}
            </h3>
            <p className="text-[15px] md:text-[16px] text-ink-secondary leading-tight">
              {categories}
            </p>
          </div>
          <span className="text-[15px] md:text-[16px] text-ink-secondary font-normal pt-0.5">
            {project.year}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
