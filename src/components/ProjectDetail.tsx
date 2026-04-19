import React, { useEffect, useMemo, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { client, urlFor } from '../client';
import { SanityProject } from '../types';
import PremiumProjectLayout from './PremiumProjectLayout';

type MediaKind = 'image' | 'video';

interface CaseStudyMedia {
    id: string;
    kind: MediaKind;
    src?: string;
    alt?: string;
    caption?: string;
    videoUrl?: string;
}

interface CaseStudySection {
    id: string;
    index: number;
    title: string;
    body: string;
    media: CaseStudyMedia;
}

const resolveImageSrc = (image: any, width: number) => {
    if (!image) return '';
    if (typeof image === 'string') return image;
    if (image.url) return image.url;

    try {
        return urlFor(image).width(width).quality(95).fit('max').auto('format').url();
    } catch {
        return '';
    }
};

const getBlockType = (block: any) => block?._type || block?.type;

const flattenContentBlocks = (blocks: any[] = []): any[] => {
    const flattened: any[] = [];

    blocks.forEach((block) => {
        if (!block) return;

        if (getBlockType(block) === 'section') {
            const nestedBlocks = [
                ...(Array.isArray(block.content) ? block.content : []),
                ...(Array.isArray(block.leftColumn) ? block.leftColumn : []),
                ...(Array.isArray(block.rightColumn) ? block.rightColumn : []),
            ];
            flattened.push(...flattenContentBlocks(nestedBlocks));
            return;
        }

        flattened.push(block);
    });

    return flattened;
};

const textFromPortableBlock = (block: any) => {
    if (block?._type !== 'block') return '';
    return (block.children || []).map((child: any) => child.text || '').join('').trim();
};

const extractNarrativeFromRichText = (block: any) => {
    const portableBlocks = Array.isArray(block.content) ? block.content : [];
    let title = '';
    const bodyLines: string[] = [];

    portableBlocks.forEach((portableBlock: any) => {
        const text = textFromPortableBlock(portableBlock);
        if (!text) return;

        const style = portableBlock.style || 'normal';
        if (!title && ['h1', 'h2', 'h3', 'h4'].includes(style)) {
            title = text;
            return;
        }

        bodyLines.push(text);
    });

    return {
        title,
        body: bodyLines.join(' '),
    };
};

const toEmbeddedVideoUrl = (url: string) => {
    if (!url) return '';
    if (url.includes('watch?v=')) return url.replace('watch?v=', 'embed/');
    return url;
};

const buildCaseStudySections = (project: SanityProject): CaseStudySection[] => {
    const sections: CaseStudySection[] = [];
    const flattenedBlocks = flattenContentBlocks(Array.isArray(project.content) ? project.content : []);

    let activeTitle = 'Context';
    let activeBody = '';
    let sectionCounter = 1;

    const pushMediaSection = (media: CaseStudyMedia) => {
        const sectionNumber = String(sectionCounter).padStart(2, '0');
        const sectionTitle = activeTitle.trim() || `Section ${sectionNumber}`;

        sections.push({
            id: `section-${sectionCounter}-${media.id}`,
            index: sectionCounter,
            title: sectionTitle,
            body: activeBody.trim(),
            media,
        });

        sectionCounter += 1;
        activeBody = '';
    };

    flattenedBlocks.forEach((block: any, blockIndex: number) => {
        const blockType = getBlockType(block);

        if (blockType === 'split-text') {
            activeTitle = (block.label || '').trim() || `Section ${String(sectionCounter).padStart(2, '0')}`;
            activeBody = (block.body || '').trim();
            return;
        }

        if (blockType === 'richText') {
            const narrative = extractNarrativeFromRichText(block);
            if (narrative.title) activeTitle = narrative.title;
            if (narrative.body) activeBody = narrative.body;
            return;
        }

        if (blockType === 'image' || blockType === 'image-full') {
            const image = block.image || block;
            const src = resolveImageSrc(image, 3200);
            if (!src) return;

            pushMediaSection({
                id: `image-${block._key || blockIndex}`,
                kind: 'image',
                src,
                alt: block.alt || activeTitle || project.title,
                caption: block.caption || '',
            });
            return;
        }

        if (blockType === 'image-grid' || blockType === 'gallery') {
            const images = Array.isArray(block.images) ? block.images : [];
            images.forEach((image: any, imageIndex: number) => {
                const src = resolveImageSrc(image, 2400);
                if (!src) return;

                pushMediaSection({
                    id: `${blockType}-${block._key || blockIndex}-${imageIndex}`,
                    kind: 'image',
                    src,
                    alt: activeTitle || project.title,
                    caption: '',
                });
            });
            return;
        }

        if (blockType === 'video') {
            const videoUrl = toEmbeddedVideoUrl(block.url || '');
            if (!videoUrl) return;

            pushMediaSection({
                id: `video-${block._key || blockIndex}`,
                kind: 'video',
                videoUrl,
                caption: block.caption || '',
            });
        }
    });

    const heroImageSrc = resolveImageSrc(project.mainImage, 3600);

    if (heroImageSrc) {
        sections.unshift({
            id: 'section-hero',
            index: 0,
            title: 'Overview',
            body: (project.description || '').trim(),
            media: {
                id: 'hero-image',
                kind: 'image',
                src: heroImageSrc,
                alt: project.mainImage?.alt || project.title,
                caption: '',
            },
        });
    }

    if (sections.length === 0 && heroImageSrc) {
        sections.push({
            id: 'section-fallback',
            index: 1,
            title: 'Overview',
            body: (project.description || '').trim(),
            media: {
                id: 'fallback-image',
                kind: 'image',
                src: heroImageSrc,
                alt: project.mainImage?.alt || project.title,
                caption: '',
            },
        });
    }

    return sections.map((section, index) => ({
        ...section,
        index: index + 1,
    }));
};

const SectionMedia: React.FC<{ media: CaseStudyMedia }> = ({ media }) => {
    return (
        <figure className="w-full aspect-[16/10] bg-zinc-200 overflow-hidden">
            {media.kind === 'video' && media.videoUrl ? (
                <iframe
                    src={media.videoUrl}
                    className="w-full h-full"
                    allowFullScreen
                    title={media.caption || 'Project video'}
                />
            ) : (
                <img
                    src={media.src || ''}
                    alt={media.alt || 'Project visual'}
                    className="w-full h-full object-cover"
                />
            )}
            {media.caption && (
                <figcaption className="mt-3 text-sm text-zinc-500">{media.caption}</figcaption>
            )}
        </figure>
    );
};

const ProjectDetail: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const [project, setProject] = useState<SanityProject | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const layoutContainer = 'w-full px-4 md:px-10 xl:px-[64px]';
    const metaLabelClass = 'block text-zinc-500 mb-1 font-secondary uppercase tracking-[0.2em] text-xs';

    useEffect(() => {
        window.scrollTo(0, 0);

        const fetchProject = async () => {
            setIsLoading(true);
            try {
                const query = `*[_type == "project" && slug.current == $slug][0]`;
                const data = await client.fetch(query, { slug });
                setProject(data || null);
            } catch (error) {
                console.error('Error fetching project:', error);
            } finally {
                setIsLoading(false);
            }
        };

        if (slug) fetchProject();
    }, [slug]);

    const sections = useMemo(() => {
        if (!project) return [];
        return buildCaseStudySections(project);
    }, [project]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-zinc-100 text-zinc-900 flex items-center justify-center">
                <div className="text-sm font-secondary uppercase tracking-[0.18em] text-zinc-500">Loading</div>
            </div>
        );
    }

    if (!project) {
        return (
            <div className="min-h-screen bg-zinc-100 text-zinc-900 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-semibold mb-4">Project not found</h2>
                    <button onClick={() => navigate('/')} className="text-zinc-600 hover:text-zinc-900 transition-colors">
                        Go Back Home
                    </button>
                </div>
            </div>
        );
    }

    const isPremiumLayout = slug === 'morphia' || slug === 'survey-agent' || !!((project as any).accentColor || (project as any).eyebrow || (project as any).heroMeta);

    if (isPremiumLayout) {
        return <PremiumProjectLayout project={project} />;
    }

    return (
        <div className="min-h-screen bg-zinc-100 text-zinc-900 font-sans selection:bg-zinc-900 selection:text-zinc-100">
            <nav className="fixed top-0 left-0 w-full py-5 z-50 bg-zinc-100/90 backdrop-blur-sm border-b border-zinc-200">
                <div className={`${layoutContainer} flex justify-between items-center`}>
                    <Link to="/" className="group flex items-center gap-2 text-zinc-900 hover:text-zinc-600 transition-colors">
                        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="font-medium">Back to Home</span>
                    </Link>
                </div>
            </nav>

            <main className={`${layoutContainer} pt-28 md:pt-32 pb-20 md:pb-28`}>
                <header className="pb-14 md:pb-16 border-b border-zinc-300">
                    <span className="text-xs font-secondary uppercase tracking-[0.18em] text-zinc-500">Case Study</span>
                    <h1 className="mt-4 text-4xl md:text-6xl lg:text-7xl font-medium tracking-[-0.03em] uppercase leading-[0.95]">
                        {project.title}
                    </h1>

                    <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-12">
                        <p className="lg:col-span-8 text-lg md:text-2xl leading-[1.3] text-zinc-800 max-w-[32ch]">
                            {project.description}
                        </p>
                        <aside className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
                            <div>
                                <span className={metaLabelClass}>Year</span>
                                <span className="block text-lg md:text-xl font-medium">{project.year || 'N/A'}</span>
                            </div>
                            <div>
                                <span className={metaLabelClass}>Role</span>
                                <span className="block text-lg md:text-xl font-medium">{project.role || 'N/A'}</span>
                            </div>
                            <div>
                                <span className={metaLabelClass}>Services</span>
                                <span className="block text-lg md:text-xl font-medium">{project.services || 'N/A'}</span>
                            </div>
                        </aside>
                    </div>
                </header>

                <div className="mt-14 md:mt-16">
                    {sections.map((section) => (
                        <section key={section.id} className="mb-16 md:mb-20">
                            <div className="border-t border-zinc-300 pt-6 md:pt-8 mb-6 md:mb-8 grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-8">
                                <div className="md:col-span-2">
                                    <span className="text-xs font-secondary uppercase tracking-[0.18em] text-zinc-500">
                                        Section {String(section.index).padStart(2, '0')}
                                    </span>
                                </div>
                                <div className="md:col-span-10">
                                    <h2 className="text-2xl md:text-4xl font-medium tracking-[-0.02em] text-zinc-900">
                                        {section.title}
                                    </h2>
                                    {section.body && (
                                        <p className="mt-3 md:mt-4 text-base md:text-lg leading-relaxed text-zinc-700 max-w-[72ch]">
                                            {section.body}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <SectionMedia media={section.media} />
                        </section>
                    ))}
                </div>

                <section className="mt-20 md:mt-24 border-t border-zinc-300 pt-12 md:pt-16 pb-4">
                    <div className="max-w-3xl">
                        <h2 className="text-3xl md:text-5xl font-medium tracking-[-0.02em] leading-[1]">
                            Have a project in mind?
                        </h2>
                        <p className="mt-5 text-lg md:text-xl text-zinc-700 leading-relaxed">
                            Let&apos;s build something clear, useful, and memorable.
                        </p>
                        <a
                            href="mailto:ansarimudassir18@gmail.com"
                            className="inline-flex items-center justify-center mt-8 px-8 py-3 border border-zinc-400 rounded-full text-sm md:text-base uppercase tracking-[0.14em] hover:bg-zinc-900 hover:text-zinc-100 transition-colors"
                        >
                            Contact
                        </a>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default ProjectDetail;
