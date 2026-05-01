import React from 'react';
import { Link } from 'react-router-dom';
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowLeft02Icon } from '@hugeicons/core-free-icons';
import { 
    QuoteBlock, TableBlock, BeforeAfterBlock, FlowBlock, 
    TokensBlock, MetricsBlock, LearningsBlock, CustomRichText 
} from './case-study/BlocksRenderer';

const resolveImageSrc = (image: any) => {
    if (!image) return '';
    if (typeof image === 'string') return image;
    if (image.asset?._ref) return ''; // Sanity ref - ignoring for now as we want hardcoded
    return image.url || '';
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
            const src = resolveImageSrc(imgParams);
            if (!src) return null;
            return (
                <div className="my-9 rounded-xl overflow-hidden border border-black/10 bg-[#F7F7F5]">
                    <img src={src} alt={block.alt || imgParams.alt || 'Asset'} className="w-full h-auto block" />
                    {block.caption || imgParams.caption ? (
                        <div className="text-xs text-zinc-500 mt-2 text-center pb-4">{block.caption || imgParams.caption}</div>
                    ) : null}
                </div>
            );
        }
        case 'image-grid':
        case 'gallery': {
            const images = block.images || [];
            return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-[0.9rem] my-9">
                    {images.map((img: any, i: number) => {
                        const src = resolveImageSrc(img);
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

    const content = project.content || [];
    let secCounter = 1;

    content.forEach((block: any) => {
        const type = getBlockType(block);
        if (type === 'section') {
            if (currentSection) sections.push(currentSection);
            
            let sectionTitle = block.title || `Section ${secCounter}`;
            if (!block.title && block.leftColumn && block.leftColumn[0]?._type === 'split-text') {
                sectionTitle = block.leftColumn[0].label;
            }
            
            currentSection = {
                id: `sec-${secCounter}`,
                num: String(secCounter).padStart(2, '0'),
                title: sectionTitle,
                blocks: block.content || block.rightColumn || []
            };
            secCounter++;
        } else if (type === 'split-text') {
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
        <div className="min-h-screen bg-bg-page text-ink font-sans selection:bg-ink selection:text-bg-page" style={{ '--accent': accentColor } as any}>
            
            {/* NAV */}
            <nav className="sticky top-0 z-50 px-4 md:px-10 xl:px-[64px] py-4 flex items-center justify-between bg-bg-page/90 backdrop-blur-md border-b border-ink/5">
                <Link to="/" className="flex items-center justify-center w-10 h-10 rounded-full bg-ink text-bg-page hover:scale-105 transition-transform">
                    <HugeiconsIcon icon={ArrowLeft02Icon} size={20} />
                </Link>
                <span className="text-[0.688rem] font-mono tracking-[0.15em] uppercase text-ink-secondary">Case Study</span>
            </nav>

            {/* HERO */}
            <header className="w-full px-4 md:px-10 xl:px-[64px] pt-14 md:pt-24 pb-8 md:pb-10 flex flex-col">
                <div className="max-w-[800px] mb-10 md:mb-12">
                    <div className="flex flex-col mb-4">
                        <h2 className="text-[14px] font-bold tracking-[0.2em] uppercase mb-1 text-ink">{project.title}</h2>
                        {project.eyebrow && <p className="text-[0.688rem] font-mono tracking-[0.15em] uppercase opacity-50">{project.eyebrow}</p>}
                    </div>
                    <h1 className="font-dm-serif text-5xl md:text-[4.5rem] leading-[1.08] tracking-[-0.01em] mb-6 whitespace-pre-wrap font-normal">
                        {subtitleParts.length > 1 ? (
                            <>
                                {subtitleParts[0]}
                                <i className="text-ink-secondary font-dm-serif">{project.subtitleItalic}</i>
                                {subtitleParts[1]}
                            </>
                        ) : rawSubtitle}
                    </h1>
                    <p className="text-[1.125rem] font-sans font-light text-ink-secondary max-w-[600px] leading-[1.78]">{project.description}</p>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 py-8 border-y border-ink/10">
                    {meta.map((m: any, i: number) => (
                        <div key={i} className="flex flex-col">
                            <label className="block text-[0.688rem] font-mono tracking-[0.15em] uppercase text-ink-secondary mb-2">{m.label}</label>
                            <span className="text-[14.5px] text-ink leading-[1.4]">{m.value}</span>
                        </div>
                    ))}
                </div>
            </header>

            {/* SECTIONS */}
            <main className="w-full pb-20">
                {sections.map((sec, idx) => (
                    <section key={sec.id} className="px-4 md:px-10 xl:px-[64px] py-16 md:py-24 border-t border-ink/5 first:border-0">
                        <div className="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-4 md:gap-12 mb-12 items-start">
                            <span className="text-[0.688rem] font-mono tracking-[0.15em] uppercase text-ink-secondary pt-2">
                                Section {sec.num}
                            </span>
                            <h2 className="text-4xl md:text-[3rem] font-dm-serif font-normal leading-[1.15] tracking-[-0.01em]">
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
            <footer className="border-t border-ink/5 px-4 md:px-10 xl:px-[64px] py-16 md:py-28 w-full grid grid-cols-1 md:grid-cols-[1fr_auto] items-center gap-8">
                <div>
                    <h2 className="text-4xl md:text-[3rem] font-dm-serif font-normal leading-[1.15]">
                        See it <i className="text-ink-secondary font-dm-serif">live</i>
                    </h2>
                    <p className="text-[0.95rem] text-ink-secondary mt-2">
                        {project.liveFooterText || "The product is live. Try it yourself or reach out to discuss the design in depth."}
                    </p>
                </div>
                <div className="flex flex-wrap gap-3">
                    {project.liveLink && (
                        <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-ink text-bg-page text-[14px] font-medium py-3 px-6 rounded-full hover:opacity-80 transition-opacity">
                            {project.liveLinkLabel || 'Visit site'} →
                        </a>
                    )}
                    <a href="mailto:ansarimudassir18@gmail.com" className="inline-flex items-center gap-2 bg-transparent text-ink border border-ink/10 text-[14px] font-medium py-3 px-6 rounded-full hover:bg-bg-card transition-colors">
                        Get in touch
                    </a>
                </div>
            </footer>
        </div>
    );
};

export default PremiumProjectLayout;
