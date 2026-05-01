import React, { useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowLeft02Icon } from '@hugeicons/core-free-icons';
import { PROJECTS } from '../data/projects';
import { Project } from '../types';
import PremiumProjectLayout from './PremiumProjectLayout';

const ProjectDetail: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    const project = useMemo(() => {
        return PROJECTS.find(p => (typeof p.slug === 'string' ? p.slug : p.slug.current) === slug);
    }, [slug]);

    const layoutContainer = 'w-full px-4 md:px-10 xl:px-[64px]';
    const metaLabelClass = 'block text-ink-secondary mb-1 uppercase tracking-[0.15em] font-mono text-[11px]';

    if (!project) {
        return (
            <div className="min-h-screen bg-bg-page text-ink flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-semibold mb-4">Project not found</h2>
                    <button onClick={() => navigate('/')} className="text-ink-secondary hover:text-ink transition-colors">
                        Go Back Home
                    </button>
                </div>
            </div>
        );
    }

    return <PremiumProjectLayout project={project} />;
};

export default ProjectDetail;
