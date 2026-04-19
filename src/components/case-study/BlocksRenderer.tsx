import React from 'react';
import { urlFor } from '../../client';

// Basic utility to resolve images, can be improved to match ProjectDetail exactly
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

export const QuoteBlock = ({ block, accentColor }: { block: any, accentColor: string }) => {
    return (
        <div style={{ borderLeftColor: accentColor, backgroundColor: `${accentColor}1A` }} className="border-l-2 py-5 px-7 rounded-r-lg my-9">
            <p className="font-dm-serif text-xl italic leading-relaxed text-zinc-900 m-0">
                {block.text}
            </p>
        </div>
    );
};

export const TableBlock = ({ block, accentColor }: { block: any, accentColor: string }) => {
    const columns = block.columns || [];
    const rows = block.rows || [];
    const highlightRow = block.highlightRow;

    return (
        <div className="rounded-xl border border-black/10 overflow-hidden my-9">
            <table className="w-full border-collapse text-sm text-left">
                <thead>
                    <tr className="bg-zinc-100">
                        {columns.map((c: string, i: number) => (
                            <th key={i} className="font-medium tracking-wider uppercase text-zinc-500 p-4 border-b border-black/10 text-[11px] whitespace-nowrap">
                                {c}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row: any, i: number) => {
                        const cells = row.cells || [];
                        const isHi = i === highlightRow;
                        return (
                            <tr key={i} className={isHi ? 'font-medium' : ''} style={isHi ? { backgroundColor: `${accentColor}08` } : {}}>
                                {cells.map((cell: any, j: number) => {
                                    let colorClass = "text-zinc-700";
                                    if (cell.cls === 'yes') colorClass = "text-[#0A7A58] font-medium";
                                    if (cell.cls === 'no') colorClass = "text-[#B03030]";
                                    if (cell.cls === 'par') colorClass = "text-[#8A6000]";
                                    
                                    return (
                                        <td key={j} className={`p-4 border-b border-black/10 last:border-b-0 align-middle ${colorClass}`}>
                                            {cell.text}
                                        </td>
                                    )
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    )
}

export const BeforeAfterBlock = ({ block }: { block: any }) => {
    const before = block.before || { label: 'Before', items: [] };
    const after = block.after || { label: 'After', items: [] };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[1px] rounded-2xl overflow-hidden border border-black/10 my-9 bg-black/5">
            <div className="bg-[#FEF6F6] p-7">
                <div className="text-[11px] font-medium tracking-wider uppercase mb-5 flex items-center gap-2 text-[#B03030]">
                    <div className="w-2 h-2 rounded-full bg-[#E05555]"></div>
                    {before.label}
                </div>
                <ul className="list-none m-0 p-0">
                    {(before.items || []).map((item: string, i: number) => (
                        <li key={i} className="text-sm text-zinc-700 py-2 pl-4 border-b border-black/5 last:border-0 relative leading-relaxed">
                            <span className="absolute left-0 top-[10px] text-[#C06060] text-[11px]">—</span>
                            {item}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="bg-[#F0FAF8] p-7">
                <div className="text-[11px] font-medium tracking-wider uppercase mb-5 flex items-center gap-2 text-[#0A7A58]">
                    <div className="w-2 h-2 rounded-full bg-[#13BBAF]"></div>
                    {after.label}
                </div>
                <ul className="list-none m-0 p-0">
                    {(after.items || []).map((item: string, i: number) => (
                        <li key={i} className="text-sm text-zinc-700 py-2 pl-4 border-b border-black/5 last:border-0 relative leading-relaxed">
                            <span className="absolute left-0 top-[10px] text-[#0A7A58] text-[11px]">✓</span>
                            {item}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export const FlowBlock = ({ block, accentColor }: { block: any, accentColor: string }) => {
    const steps = block.steps || [];

    return (
        <div className="my-9">
            {steps.map((step: any, i: number) => (
                <div key={i} className={`grid grid-cols-[44px_1fr] gap-4 py-4 ${i > 0 ? 'border-t border-black/10' : ''}`}>
                    <div 
                        className={`w-11 h-11 rounded-full border flex items-center justify-center text-[13px] font-medium shrink-0 transition-colors ${step.active ? 'text-white' : 'border-black/10 bg-white text-zinc-500'}`}
                        style={step.active ? { backgroundColor: accentColor, borderColor: accentColor } : {}}
                    >
                        {i + 1}
                    </div>
                    <div className="pt-2">
                        <h4 className="text-[15px] font-medium text-zinc-900 mb-1">{step.title}</h4>
                        <p className="text-sm text-zinc-500 leading-relaxed m-0">{step.desc}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export const TokensBlock = ({ block }: { block: any }) => {
    const items = block.items || [];
    
    return (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-3 my-8">
            {items.map((t: any, i: number) => (
                <div key={i} className="rounded-xl overflow-hidden border border-black/10 bg-white shadow-sm">
                    <div className="h-11 w-full" style={{ backgroundColor: t.hex, borderBottom: t.border ? '1px solid rgba(0,0,0,0.1)' : 'none' }}></div>
                    <div className="p-2 px-3">
                        <span className="block text-xs font-medium text-zinc-900">{t.name}</span>
                        <span className="text-[11px] text-zinc-500 font-mono">{t.hex}</span>
                    </div>
                </div>
            ))}
        </div>
    )
}

export const MetricsBlock = ({ block }: { block: any }) => {
    const items = block.items || [];
    return (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-[1px] border border-black/10 rounded-2xl overflow-hidden my-9 bg-black/10">
            {items.map((m: any, i: number) => (
                <div key={i} className="p-7 bg-white hover:bg-zinc-50 transition-colors">
                    <div className="font-dm-serif text-4xl text-zinc-900 leading-none mb-2">{m.value}</div>
                    <div className="text-[13px] text-zinc-500 leading-relaxed">{m.label}</div>
                </div>
            ))}
        </div>
    )
}

export const LearningsBlock = ({ block }: { block: any }) => {
    const items = block.items || [];
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[1px] border border-black/10 rounded-2xl overflow-hidden my-9 bg-black/10">
            {items.map((l: any, i: number) => (
                <div key={i} className="p-7 bg-white hover:bg-zinc-50 transition-colors">
                    <div className="font-dm-serif text-5xl text-zinc-200 leading-none mb-4">{l.num}</div>
                    <h4 className="text-[15px] font-medium text-zinc-900 mb-2">{l.title}</h4>
                    <p className="text-[13px] text-zinc-500 leading-relaxed m-0">{l.body}</p>
                </div>
            ))}
        </div>
    )
}

export const textFromPortableBlock = (block: any) => {
    if (block?._type !== 'block') return '';
    return (block.children || []).map((child: any) => child.text || '').join('').trim();
};

export const CustomRichText = ({ content }: { content: any[] }) => {
    if (!content || !Array.isArray(content)) return null;

    return (
        <>
            {content.map((block, i) => {
                const text = textFromPortableBlock(block);
                const style = block.style || 'normal';

                if (['h1', 'h2', 'h3', 'h4'].includes(style)) {
                    return <h3 key={i} className="text-[15px] font-medium text-zinc-900 mt-8 mb-2.5">{text}</h3>;
                }

                if (style === 'normal' && text) {
                    return <p key={i} className="text-base text-zinc-600 leading-[1.8] mb-5 last:mb-0">{text}</p>;
                }
                
                return null;
            })}
        </>
    )
}
