import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { SanityProject } from '../types';
import { urlFor } from '../client';
import { 
    QuoteBlock, TableBlock, BeforeAfterBlock, FlowBlock, 
    TokensBlock, MetricsBlock, LearningsBlock, CustomRichText 
} from './case-study/BlocksRenderer';

const resolveImageSrc = (image: any, width: number = 2400) => {
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

const BlockSwitch = ({ block, accentColor }: { block: any, accentColor: string }) => {
    const type = getBlockType(block);
    
    switch(type) {
        case 'quoteBlock': return <QuoteBlock block={block} accentColor={accentColor} />;
        case 'tableBlock': return <TableBlock block={block} accentColor={accentColor} />;
        case 'beforeAfterBlock': return <BeforeAfterBlock block={block} />;
        case 'flowBlock': return <FlowBlock block={block} accentColor={accentColor} />;
        case 'tokensBlock': return <TokensBlock block={block} />;
        case 'metricsBlock': return <MetricsBlock block={block} />;
        case 'learningsBlock': return <LearningsBlock block={block} />;
        case 'richText': return <CustomRichText content={block.content || []} />;
        case 'image':
        case 'image-full': {
            const imgParams = block.image || block;
            const src = resolveImageSrc(imgParams, 2400);
            if (!src) return null;
            return (
                <div className="my-9 rounded-xl overflow-hidden border border-black/10 bg-[#F7F7F5]">
                    <img src={src} alt={imgParams.alt || 'Asset'} className="w-full h-auto block" />
                    {imgParams.caption && <div className="text-xs text-zinc-500 mt-2 text-center pb-4">{imgParams.caption}</div>}
                </div>
            );
        }
        case 'image-grid':
        case 'gallery': {
            const images = block.images || [];
            return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-[0.9rem] my-9">
                    {images.map((img: any, i: number) => {
                        const src = resolveImageSrc(img, 1200);
                        if (!src) return null;
                        return (
                            <div key={i} className="rounded-xl overflow-hidden border border-black/10 bg-[#EFEFEC]">
                                <img src={src} alt="Asset" className="w-full h-auto block" />
                            </div>
                        )
                    })}
                </div>
            )
        }
        default: return null;
    }
}

const PremiumProjectLayout: React.FC<{ project: any }> = ({ project }) => {
    const accentColor = project.accentColor || '#111110';
    const accentDark = '#111110';
    
    // Subtitle rendering with italic
    const rawSubtitle = project.subtitle || project.description || '';
    const subtitleParts = project.subtitleItalic 
        ? rawSubtitle.split(project.subtitleItalic) 
        : [rawSubtitle];

    const meta = project.heroMeta || [
        { label: 'Role', value: project.role },
        { label: 'Services', value: project.services },
        { label: 'Year', value: project.year },
    ].filter((m: any) => m.value);

    // Group blocks by section logic
    const sections: any[] = [];
    let currentSection: any = null;

    // Filter project content, parse split-text, or explicitly use section block
    const content = project.content || [];
    
    let secCounter = 1;

    content.forEach((block: any) => {
        const type = getBlockType(block);
        if (type === 'split-text') {
            if (currentSection) sections.push(currentSection);
            currentSection = {
                id: `sec-${secCounter}`,
                num: String(secCounter).padStart(2, '0'),
                title: block.label || `Section ${secCounter}`,
                blocks: []
            };
            secCounter++;
            
            if (block.body) {
                currentSection.blocks.push({
                    _type: 'richText',
                    content: [
                        {
                            _type: 'block',
                            style: 'normal',
                            children: [{ text: block.body }]
                        }
                    ]
                });
            }
        } else if (type === 'section') {
            // New native section type
            if (currentSection) sections.push(currentSection);
            
            // extract title from field, then left column, then default
            let sectionTitle = block.title || `Section ${secCounter}`;
            if (!block.title && block.leftColumn && block.leftColumn[0]?._type === 'split-text') {
                sectionTitle = block.leftColumn[0].label;
            }
            // Add custom fields to custom logic if they added 'title' to section schema (we didn't, we just added columns)
            // If they just use raw blocks 
            currentSection = {
                id: `sec-${secCounter}`,
                num: String(secCounter).padStart(2, '0'),
                title: sectionTitle, // We may need a better extractor if they use headings
                blocks: block.content || block.rightColumn || []
            };
            secCounter++;
        } else {
            if (!currentSection) {
                currentSection = {
                    id: `sec-0`,
                    num: '00',
                    title: 'Overview',
                    blocks: []
                };
            }
            if (type !== 'divider' && type !== 'padding') {
                 currentSection.blocks.push(block);
            }
        }
    });

    if (currentSection) sections.push(currentSection);

    return (
        <div className="min-h-screen bg-[#F7F7F5] text-[#111110] font-sans selection:bg-zinc-900 selection:text-white" style={{ '--accent': accentColor, fontFamily: 'var(--font-dm-sans, "DM Sans", sans-serif)' } as any}>
            
            {/* NAV */}
            <nav className="sticky top-0 z-50 px-4 md:px-10 xl:px-[64px] py-4 flex items-center justify-between bg-[#F7F7F5]/90 backdrop-blur-md border-b border-black/5">
                <Link to="/" className="inline-flex items-center gap-2 text-[13px] text-zinc-500 hover:text-zinc-900 transition-colors font-medium">
                    <ArrowLeft size={14} /> Back to Home
                </Link>
                <span className="text-[11px] font-medium tracking-[0.1em] uppercase text-zinc-400">Case Study</span>
            </nav>

            {/* HERO */}
            <header className="w-full px-4 md:px-10 xl:px-[64px] pt-14 md:pt-24 pb-10 md:pb-16 flex flex-col">
                <div className="max-w-[800px] mb-12 md:mb-16">
                    {project.eyebrow && <p className="text-[12px] font-medium tracking-[0.1em] uppercase mb-4" style={{ color: accentColor }}>{project.eyebrow}</p>}
                    <h1 className="font-dm-serif text-5xl md:text-[4.5rem] leading-[1.08] tracking-[-0.01em] mb-6 whitespace-pre-wrap font-normal">
                        {subtitleParts.length > 1 ? (
                            <>
                                {subtitleParts[0]}
                                <i className="text-zinc-600 font-dm-serif">{project.subtitleItalic}</i>
                                {subtitleParts[1]}
                            </>
                        ) : rawSubtitle}
                    </h1>
                    <p className="text-base md:text-[17px] text-zinc-600 max-w-[600px] leading-[1.78]">{project.description}</p>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 pt-8 md:pt-10 border-t border-black/10">
                    {meta.map((m: any, i: number) => (
                        <div key={i} className="flex flex-col">
                            <label className="block text-[11px] font-semibold tracking-[0.12em] uppercase text-zinc-400 mb-2">{m.label}</label>
                            <span className="text-[14.5px] text-zinc-800 leading-[1.4]">{m.value}</span>
                        </div>
                    ))}
                </div>
            </header>

            <hr className="w-full border-t border-black/5 mb-10" />

            {/* SECTIONS */}
            <main className="w-full pb-20">
                {sections.map((sec, idx) => (
                    <section key={sec.id} className="px-4 md:px-10 xl:px-[64px] py-16 md:py-24 border-t border-black/5 first:border-0">
                        <div className="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-4 md:gap-12 mb-12 items-start">
                            <span className="text-[11px] font-medium tracking-[0.12em] uppercase text-zinc-400 pt-2">
                                Section {sec.num}
                            </span>
                            <h2 className="font-dm-serif text-3xl md:text-[2.5rem] leading-[1.15] tracking-[-0.01em] font-normal">
                                {sec.title}
                            </h2>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-4 md:gap-12">
                            <div className="hidden md:block"></div>
                            <div>
                                {sec.blocks.map((block: any, bi: number) => (
                                    <BlockSwitch key={bi} block={block} accentColor={accentColor} />
                                ))}
                            </div>
                        </div>
                    </section>
                ))}
            </main>

            {/* FOOTER CTA */}
            <footer className="border-t border-black/5 px-4 md:px-10 xl:px-[64px] py-16 md:py-28 w-full grid grid-cols-1 md:grid-cols-[1fr_auto] items-center gap-8">
                <div>
                    <h2 className="font-dm-serif text-3xl md:text-[2.8rem] leading-[1.15] font-normal">
                        See it <i className="text-zinc-500 font-dm-serif">live</i>
                    </h2>
                    <p className="text-[0.95rem] text-zinc-500 mt-2">
                        The product is live. Try it yourself or reach out to discuss the design in depth.
                    </p>
                </div>
                <div className="flex flex-wrap gap-3">
                    {project.liveLink && (
                        <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#111110] text-white text-[14px] font-medium py-3 px-6 rounded-full hover:opacity-80 transition-opacity">
                            {project.liveLinkLabel || 'Visit site'} →
                        </a>
                    )}
                    <a href="mailto:ansarimudassir18@gmail.com" className="inline-flex items-center gap-2 bg-transparent text-[#111110] border border-black/10 text-[14px] font-medium py-3 px-6 rounded-full hover:bg-zinc-100 transition-colors">
                        Get in touch
                    </a>
                </div>
            </footer>
        </div>
    );
};

export default PremiumProjectLayout;
