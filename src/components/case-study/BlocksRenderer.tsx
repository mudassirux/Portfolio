import React from 'react';

export const QuoteBlock = ({ block, accentColor }: { block: any, accentColor: string }) => {
    return (
        <div style={{ borderLeftColor: accentColor, backgroundColor: `${accentColor}1A` }} className="border-l-2 py-5 px-7 rounded-r-lg my-9">
            <p className="font-dm-serif text-xl italic leading-relaxed text-ink m-0">
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
        <div className="rounded-xl border border-ink/10 overflow-hidden my-9 bg-bg-card">
            <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm text-left">
                    <thead>
                        <tr className="bg-bg-page/50">
                            {columns.map((c: string, i: number) => (
                                <th key={i} className="font-medium tracking-wider uppercase text-ink-secondary p-4 border-b border-ink/10 text-[11px] whitespace-nowrap">
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
                                        let colorClass = "text-ink";
                                        if (cell.cls === 'yes') colorClass = "text-[#0A7A58] font-medium";
                                        if (cell.cls === 'no') colorClass = "text-[#B03030]";
                                        if (cell.cls === 'par') colorClass = "text-[#8A6000]";
                                        
                                        return (
                                            <td key={j} className={`p-4 border-b border-ink/10 last:border-b-0 align-middle ${colorClass}`}>
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
        </div>
    )
}

export const BeforeAfterBlock = ({ block }: { block: any }) => {
    const before = block.before || { label: 'Before', items: [] };
    const after = block.after || { label: 'After', items: [] };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[1px] rounded-xl overflow-hidden border border-ink/10 my-9 bg-ink/10">
            <div className="bg-[#FEF6F6] p-7 pt-9">
                <div className="text-[11px] font-semibold tracking-[0.15em] uppercase mb-6 flex items-center gap-2.5 text-[#B03030]">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#E05555]"></div>
                    {before.label}
                </div>
                <ul className="list-none m-0 p-0">
                    {(before.items || []).map((item: string, i: number) => (
                        <li key={i} className="text-[15px] text-zinc-700 py-3 pl-4 border-b border-black/5 last:border-0 relative leading-relaxed">
                            <span className="absolute left-0 top-[12px] text-[#C06060] text-[11px]">—</span>
                            {item}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="bg-[#F0FAF8] p-7 pt-9">
                <div className="text-[11px] font-semibold tracking-[0.15em] uppercase mb-6 flex items-center gap-2.5 text-[#0A7A58]">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#13BBAF]"></div>
                    {after.label}
                </div>
                <ul className="list-none m-0 p-0">
                    {(after.items || []).map((item: string, i: number) => (
                        <li key={i} className="text-[15px] text-zinc-700 py-3 pl-4 border-b border-black/5 last:border-0 relative leading-relaxed">
                            <span className="absolute left-0 top-[12px] text-[#0A7A58] text-[11px]">✓</span>
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
        <div className="my-9 bg-bg-card rounded-xl border border-ink/10 p-2">
            {steps.map((step: any, i: number) => (
                <div key={i} className={`grid grid-cols-[44px_1fr] gap-5 p-5 ${i > 0 ? 'border-t border-ink/5' : ''}`}>
                    <div 
                        className={`w-11 h-11 rounded-full border flex items-center justify-center text-[13.5px] font-semibold shrink-0 transition-all ${step.active ? 'text-white' : 'border-ink/10 bg-bg-page text-ink-secondary'}`}
                        style={step.active ? { backgroundColor: accentColor, borderColor: accentColor, boxShadow: `0 4px 12px ${accentColor}33` } : {}}
                    >
                        {i + 1}
                    </div>
                    <div className="pt-2">
                        <h4 className="text-[16px] font-semibold text-ink mb-1.5">{step.title}</h4>
                        <p className="text-[14.5px] text-ink-secondary leading-relaxed m-0">{step.desc}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export const TokensBlock = ({ block }: { block: any }) => {
    const items = block.items || [];
    
    return (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] gap-4 my-9">
            {items.map((t: any, i: number) => (
                <div key={i} className="rounded-xl overflow-hidden border border-ink/10 bg-bg-card shadow-sm transition-transform hover:translate-y-[-2px]">
                    <div className="h-14 w-full" style={{ backgroundColor: t.hex, borderBottom: t.border ? '1px solid rgba(0,0,0,0.05)' : 'none' }}></div>
                    <div className="p-3 px-4">
                        <span className="block text-[13px] font-semibold text-ink mb-0.5">{t.name}</span>
                        <span className="text-[11px] text-ink-secondary font-mono tracking-tight uppercase">{t.hex}</span>
                    </div>
                </div>
            ))}
        </div>
    )
}

export const MetricsBlock = ({ block }: { block: any }) => {
    const items = block.items || [];
    return (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-[1px] border border-ink/10 rounded-xl overflow-hidden my-9 bg-ink/10 shadow-sm">
            {items.map((m: any, i: number) => (
                <div key={i} className="p-8 bg-bg-card hover:opacity-90 transition-opacity">
                    <div className="font-dm-serif text-[2.8rem] text-ink leading-none mb-3">{m.value}</div>
                    <div className="text-[13px] font-medium tracking-wide uppercase text-ink-secondary">{m.label}</div>
                </div>
            ))}
        </div>
    )
}

export const LearningsBlock = ({ block }: { block: any }) => {
    const items = block.items || [];
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[1px] border border-ink/10 rounded-xl overflow-hidden my-9 bg-ink/10 shadow-sm">
            {items.map((l: any, i: number) => (
                <div key={i} className="p-8 bg-bg-card hover:opacity-90 transition-opacity">
                    <div className="font-dm-serif text-[4rem] text-ink-secondary opacity-30 leading-none mb-6 pointer-events-none select-none">{l.num}</div>
                    <h4 className="text-[17px] font-semibold text-ink mb-2.5">{l.title}</h4>
                    <p className="text-[14.5px] text-ink-secondary leading-relaxed m-0">{l.body}</p>
                </div>
            ))}
        </div>
    )
}

export const textFromPortableBlock = (block: any) => {
    if (block._type !== 'block') return '';
    return (block.children || []).map((child: any) => child.text || '').join('').trim();
};

export const CustomRichText = ({ content }: { content: any[] }) => {
    if (!content || !Array.isArray(content)) return null;

    return (
        <div className="rich-text-content">
            {content.map((block, i) => {
                if (block._type !== 'block') return null;
                
                const text = textFromPortableBlock(block);
                const style = block.style || 'normal';

                if (['h1', 'h2', 'h3', 'h4'].includes(style)) {
                    return <h3 key={i} className="font-dm-serif text-[1.4rem] font-normal text-ink mt-10 mb-4 first:mt-0">{text}</h3>;
                }

                if (style === 'normal' && text) {
                    return <p key={i} className="text-[16px] text-ink leading-[1.8] mb-6 last:mb-0">{text}</p>;
                }
                
                return null;
            })}
        </div>
    )
}
