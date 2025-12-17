
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { client, urlFor } from '../client';
import { SanityProject } from '../types';

const BlockRenderer: React.FC<{ block: any }> = ({ block }) => {
    const blockType = block._type || block.type;

    switch (blockType) {
        case 'section': {
            const { layout, padding = {} } = block;
            const style = {
                paddingTop: padding.top ? `${padding.top}px` : undefined,
                paddingBottom: padding.bottom ? `${padding.bottom}px` : undefined,
                paddingLeft: padding.left ? `${padding.left}px` : undefined,
                paddingRight: padding.right ? `${padding.right}px` : undefined,
            };

            if (layout === '1-col') {
                return (
                    <div style={style} className="w-full">
                        {block.content?.map((child: any, i: number) => (
                            <BlockRenderer key={child._key || i} block={child} />
                        ))}
                    </div>
                );
            }

            // 2-Column Layouts
            let gridColsClass = 'grid-cols-1 md:grid-cols-2'; // Default 50/50
            if (layout === '2-col-40-60') gridColsClass = 'grid-cols-1 md:grid-cols-[2fr_3fr]';
            if (layout === '2-col-60-40') gridColsClass = 'grid-cols-1 md:grid-cols-[3fr_2fr]';

            return (
                <div style={style} className={`grid ${gridColsClass} gap-8 md:gap-16 w-full`}>
                    <div className="flex flex-col gap-8">
                        {block.leftColumn?.map((child: any, i: number) => (
                            <BlockRenderer key={child._key || i} block={child} />
                        ))}
                    </div>
                    <div className="flex flex-col gap-8">
                        {block.rightColumn?.map((child: any, i: number) => (
                            <BlockRenderer key={child._key || i} block={child} />
                        ))}
                    </div>
                </div>
            );
        }

        case 'richText':
            return (
                <div className="prose prose-invert max-w-none prose-lg">
                    {block.content?.map((b: any, i: number) => {
                        if (b._type === 'block') {
                            const Tag = b.style || 'p';
                            // Simple text rendering for now
                            return React.createElement(
                                ['h1', 'h2', 'h3', 'h4', 'blockquote'].includes(Tag) ? Tag : 'p',
                                { key: i, className: 'mb-4' },
                                b.children?.map((c: any) => c.text).join('')
                            );
                        }
                        return null;
                    })}
                </div>
            );

        case 'image': // Standard image in block content
        case 'image-full':
            const image = block.image || block; // Handle both wrapper and direct
            if (!image?.asset && !image?.url) return null;
            return (
                <div className="w-full mb-8 last:mb-0">
                    <img
                        src={urlFor(image).width(3840).quality(100).fit('max').auto('format').url()}
                        alt={block.alt || "Project Image"}
                        className="w-full h-auto object-cover rounded-sm"
                    />
                </div>
            );

        case 'video':
            return (
                <div className="w-full aspect-video bg-zinc-900 mb-8 last:mb-0">
                    {block.url ? (
                        <iframe
                            src={block.url.replace('watch?v=', 'embed/')}
                            className="w-full h-full"
                            allowFullScreen
                            title={block.caption || 'Video'}
                        />
                    ) : (
                        <div className="flex items-center justify-center h-full text-zinc-500">Video Placeholder</div>
                    )}
                    {block.caption && <p className="text-sm text-zinc-500 mt-2">{block.caption}</p>}
                </div>
            );

        case 'divider':
            const borderStyle = block.style || 'solid';
            return <div className="w-full my-8 border-t border-zinc-700" style={{ borderStyle }} />;

        case 'padding':
            return <div style={{ height: block.height ? `${block.height}px` : '50px' }} />;

        // --- Existing Legacy Blocks ---
        case 'image-grid':
            return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mb-12">
                    {block.images?.map((img: any, i: number) => (
                        <div key={i} className="aspect-[4/3] w-full overflow-hidden bg-zinc-900">
                            <img
                                src={urlFor(img).width(1600).quality(100).fit('max').auto('format').url()}
                                alt={`Grid ${i}`}
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                            />
                        </div>
                    ))}
                </div>
            );

        case 'split-text':
            return (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 border-t border-zinc-800 pt-12 mb-12">
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
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
                    {block.images?.map((img: any, i: number) => (
                        <div key={i} className={`aspect-square w-full overflow-hidden bg-zinc-900 ${i % 3 === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}>
                            <img
                                src={urlFor(img).width(1200).quality(100).fit('max').auto('format').url()}
                                alt={`Gallery ${i}`}
                                className="w-full h-full object-cover hover:opacity-80 transition-opacity duration-300"
                            />
                        </div>
                    ))}
                </div>
            );

        default:
            return null;
    }
};

const ProjectDetail: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const [project, setProject] = useState<SanityProject | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);

        const fetchProject = async () => {
            setIsLoading(true);
            try {
                const query = `*[_type == "project" && slug.current == $slug][0]`;
                const data = await client.fetch(query, { slug });

                if (data) {
                    setProject(data);
                } else {
                    // Handle specific 404 or just stay null
                }
            } catch (error) {
                console.error("Error fetching project:", error);
            } finally {
                setIsLoading(false);
            }
        };

        if (slug) {
            fetchProject();
        }
    }, [slug]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#111111] text-white flex items-center justify-center">
                <div className="animate-pulse">Loading...</div>
            </div>
        );
    }

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
                    {project.content?.map((block: any, index: number) => (
                        <BlockRenderer key={block._key || index} block={block} />
                    ))}
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
