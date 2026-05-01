import { Project } from '../types';

export const morphiaProjectData: Project = {
    id: "p1",
    title: "Morphia",
    slug: { current: "morphia" },
    subtitle: "AI assets without\nthe blank canvas",
    subtitleItalic: "blank canvas",
    eyebrow: "Product Design · 2025 – Present",
    description: "A live AI design asset platform that guides users from intent to output through structured, style-locked generation. No prompting expertise required.",
    liveLink: "https://themorphia.com",
    liveLinkLabel: "Visit Morphia",
    accentColor: "#13BBAF",
    heroMeta: [
        { label: "Role", value: "Founder & Lead Designer" },
        { label: "Services", value: "UI/UX · Design System · Frontend" },
        { label: "Output", value: "Icons & Illustrations" },
        { label: "Status", value: "Live · Real users" },
    ],
    content: [
        {
            _type: 'section',
            title: 'Overview',
            leftColumn: [{ _type: 'split-text', label: 'Overview' }],
            content: [
                {
                    _type: 'richText',
                    content: [
                        { _type: 'block', style: 'normal', children: [{ text: "Morphia is an AI-powered image generator that creates ads, portraits, illustrations, icons, and product visuals. Unlike general-purpose AI tools, Morphia is purpose-built around a single problem: giving non-designers a way to generate visually consistent assets without needing to know how to write a good prompt." }] },
                        { _type: 'block', style: 'normal', children: [{ text: "I built it entirely — product strategy, UX, visual design, a dual Figma-and-code design system, and the frontend using AI-assisted development. It is live, with real users generating assets." }] }
                    ]
                },
                {
                    _type: 'image-full',
                    alt: 'Product overview',
                    caption: 'Morphia Interface — Style Selection and Generation Preview',
                    image: '/morphia/Overview.png',
                }
            ]
        },
        {
            _type: 'section',
            title: 'The problem with existing tools',
            leftColumn: [{ _type: 'split-text', label: 'The problem with existing tools' }],
            content: [
                {
                    _type: 'richText',
                    content: [
                        { _type: 'block', style: 'normal', children: [{ text: "Digital creators, marketers, and product designers increasingly rely on compelling visuals to communicate ideas and run campaigns. Yet producing high-quality icons, illustrations, and UI-friendly graphics typically demands expensive tools, advanced skills, and long iteration cycles." }] },
                        { _type: 'block', style: 'normal', children: [{ text: "The problem started as a personal frustration. Using Midjourney or DALL-E to generate icons for a project, I kept hitting the same wall: the same prompt returned a completely different visual style every time. You couldn't build anything brand-consistent from output you couldn't reproduce." }] }
                    ]
                },
                {
                    _type: 'quoteBlock',
                    text: "The problem wasn't AI capability — it was the complete absence of style control. No tool gave you a way to stay in one visual language across multiple generations."
                },
                {
                    _type: 'richText',
                    content: [
                        { _type: 'block', style: 'normal', children: [{ text: "Competitor research confirmed the gap wasn't niche. Every major AI generation tool prioritised creative freedom over consistency. The tools that were consistent weren't generative at all." }] }
                    ]
                },
                {
                    _type: 'tableBlock',
                    columns: ["Tool", "Consistent output", "Non-designer friendly", "Icons & illustrations"],
                    highlightRow: 4,
                    rows: [
                        { cells: [{ text: "Midjourney" }, { text: "Partial", cls: "par" }, { text: "No — prompt-heavy", cls: "no" }, { text: "General only", cls: "par" }] },
                        { cells: [{ text: "DALL-E" }, { text: "No", cls: "no" }, { text: "Somewhat", cls: "par" }, { text: "General only", cls: "par" }] },
                        { cells: [{ text: "Stable Diffusion" }, { text: "Needs fine-tuning", cls: "no" }, { text: "No", cls: "no" }, { text: "Possible, complex", cls: "par" }] },
                        { cells: [{ text: "Iconify / Flaticon" }, { text: "Yes", cls: "yes" }, { text: "Yes", cls: "yes" }, { text: "No AI generation", cls: "no" }] },
                        { cells: [{ text: "Morphia" }, { text: "Yes — by design", cls: "yes" }, { text: "Yes — guided flow", cls: "yes" }, { text: "Core focus", cls: "yes" }] },
                    ]
                }
            ]
        },
        {
            _type: 'section',
            title: 'Design process',
            leftColumn: [{ _type: 'split-text', label: 'Design process' }],
            content: [
                {
                    _type: 'richText',
                    content: [
                        { _type: 'block', style: 'normal', children: [{ text: "My first version of Morphia had a single free-text prompt field. It felt fast to build and intuitively powerful. The problem was that it produced exactly what a blank canvas produces: paralysis and random output." }] },
                        { _type: 'block', style: 'normal', children: [{ text: "Non-designers didn't know what to type. And even when they did, the output varied wildly in visual style. The tool had no personality of its own — it was just a wrapper around a model." }] }
                    ]
                },
                {
                    _type: 'beforeAfterBlock',
                    before: {
                        label: "Version 1 — Free prompt",
                        items: [
                            "Users faced a blank input with no guidance",
                            "Output style changed on every generation",
                            "No way to reproduce a visual look across assets",
                            "Non-designers didn't know how to prompt",
                            "Every result felt accidental, not designed"
                        ]
                    },
                    after: {
                        label: "Version 2 — Structured flow",
                        items: [
                            "Style selection locks the aesthetic upfront",
                            "Subject + action narrows intent without prompting",
                            "Consistency enforced across every generation",
                            "Non-designers feel guided toward a good result",
                            "Output feels intentional, not random"
                        ]
                    }
                },
                {
                    _type: 'richText',
                    content: [
                        { _type: 'block', style: 'h3', children: [{ text: "The core insight: constraint creates freedom" }] },
                        { _type: 'block', style: 'normal', children: [{ text: "The pivot was realising that users didn't want an open prompt — they wanted a decision tree that reliably led to a good output. The design challenge shifted: how do you give users real creative control without exposing the complexity of prompting?" }] },
                        { _type: 'block', style: 'normal', children: [{ text: "The answer was a three-step structured flow. Each step progressively narrows the generation space just enough to ensure consistency, while still feeling fast and expressive." }] }
                    ]
                },
                {
                    _type: 'flowBlock',
                    steps: [
                        { active: true, title: "Pick a style", desc: "The most important constraint. Locks the visual aesthetic — flat, line, 3D, illustrated — ensuring every asset in a session feels cohesive." },
                        { active: false, title: "Define a subject", desc: "User picks or types what the asset should represent. Narrows the generation to a specific intent." },
                        { active: false, title: "Add an action or modifier", desc: "An optional layer for mood, context, or visual direction. Adds specificity without requiring any prompting knowledge." },
                        { active: false, title: "Generate and export", desc: "One click. Output is immediately exportable as PNG. Style persists across multiple generations in a session." },
                    ]
                },
                {
                    _type: 'image-grid',
                    images: [
                        { image: '/morphia/Subject_Selection.png', alt: 'Morphia Subject Selection' },
                        { image: '/morphia/Generation_Result.png', alt: 'Morphia Generation Result' },
                    ]
                }
            ]
        },
        {
            _type: 'section',
            title: 'Design system — built to scale',
            leftColumn: [{ _type: 'split-text', label: 'Design system — built to scale' }],
            content: [
                {
                    _type: 'richText',
                    content: [
                        { _type: 'block', style: 'normal', children: [{ text: "Morphia needed a design system from day one — not just for visual consistency, but because the product is designed to expand to new asset types over time. Every new category needs to plug in without disrupting the existing experience." }] },
                        { _type: 'block', style: 'normal', children: [{ text: "The system lives in both Figma (components and tokens) and code (CSS variables and component library), keeping design-to-development handoff tight and the UI in sync as the product grows." }] }
                    ]
                },
                {
                    _type: 'tokensBlock',
                    items: [
                        { name: "Brand", hex: "#13BBAF" },
                        { name: "Brand subtle", hex: "#E0F5F3" },
                        { name: "Brand dark", hex: "#0A847B" },
                        { name: "Ink", hex: "#111110" },
                        { name: "Surface", hex: "#F7F7F5", border: true },
                        { name: "Surface 2", hex: "#EFEFEC", border: true },
                    ]
                },
                {
                    _type: 'richText',
                    content: [
                        { _type: 'block', style: 'normal', children: [{ text: "Typography pairs DM Sans for all UI text with DM Serif Display for editorial moments — keeping the product feeling functional and fast while the brand retains character. Type scale, spacing, and border-radius are all tokenised, meaning any new screen automatically inherits the system." }] }
                    ]
                },
                {
                    _type: 'image-full',
                    alt: 'Design system',
                    caption: 'Morphia Design System — Tokens, Typography, and Components',
                    image: '/morphia/Design_System.png',
                }
            ]
        },
        {
            _type: 'section',
            title: 'What building Morphia taught me',
            leftColumn: [{ _type: 'split-text', label: 'What building Morphia taught me' }],
            content: [
                {
                    _type: 'learningsBlock',
                    items: [
                        { num: "01", title: "Ship the constrained version first", body: "The free-prompt flow felt more powerful on paper. But constraints are the product — users want a reliable path to a good result, not infinite possibility." },
                        { num: "02", title: "Design systems pay off faster than expected", body: "Building tokens in both Figma and code felt slow at first. Six weeks in, shipping new screens took a fraction of the time." },
                        { num: "03", title: "Real users expose assumptions immediately", body: "Patterns I thought were obvious turned out to need explanation. Watching real users reshaped both the onboarding flow and the generation sequence." },
                        { num: "04", title: "Founder thinking sharpens design decisions", body: "Every design choice carried a business constraint. That pressure forced cleaner prioritisation — and cut features that were interesting but not useful." },
                    ]
                }
            ]
        }
    ]
};
