import { Project } from '../types';

export const surveyAgentProjectData: Project = {
    id: "p4",
    title: "SurveyAgent AI",
    slug: { current: "survey-agent" },
    subtitle: "Enterprise voice agents\nwithout the engineering barrier",
    subtitleItalic: "without the engineering barrier",
    eyebrow: "Product Design · 2024 – 2025",
    description: "Designing an AI-powered voice agent platform that enables businesses to deploy intelligent calling agents for sales, support, and automated outreach — without technical expertise.",
    accentColor: "#4F46E5",
    heroMeta: [
        { label: "Role", value: "Lead Product Designer" },
        { label: "Services", value: "UI/UX · Design System · Frontend" },
        { label: "Output", value: "Agent Builder · Lead Management · Analytics" },
        { label: "Status", value: "Live · Investor-Ready MVP" },
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
                        { _type: 'block', style: 'normal', children: [{ text: "SurveyAgent AI is an enterprise voice agent platform that enables businesses to deploy intelligent AI agents for sales campaigns, customer support, and automated outreach. Similar to Retell AI, it leverages advanced voice synthesis (ElevenLabs) and telephony infrastructure (Twilio) to handle high-volume calling operations with human-like conversations." }] },
                        { _type: 'block', style: 'normal', children: [{ text: "Over 8 weeks of research and a year of iterative refinement, I owned the end-to-end design of the core product suite — taking both the Agent Builder and Lead Management system from zero to an investor-ready MVP that positioned the startup for seed funding." }] },
                    ]
                },
                {
                    _type: 'image-full',
                    alt: 'SurveyAgent AI Dashboard',
                    caption: 'SurveyAgent AI — main analytics dashboard',
                    image: '/survey-agent/Dashboard.png',
                }
            ]
        },
        {
            _type: 'section',
            title: 'The challenge',
            leftColumn: [{ _type: 'split-text', label: 'The challenge' }],
            content: [
                {
                    _type: 'richText',
                    content: [
                        { _type: 'block', style: 'normal', children: [{ text: "Building a platform for non-technical users to configure complex AI voice agents and manage thousands of leads required solving three critical design problems:" }] },
                    ]
                },
                {
                    _type: 'beforeAfterBlock',
                    before: {
                        label: "Problems to solve",
                        items: [
                            "Technical Translation — converting Twilio webhooks & ElevenLabs models into an interface sales managers could use without engineering support",
                            "Power vs. Simplicity — giving full automation control without overwhelming users during onboarding",
                            "Actionable Analytics — surfacing real-time insights from high-volume calling data for rapid decision-making",
                        ]
                    },
                    after: {
                        label: "Design outcomes",
                        items: [
                            "Node-based visual builder that abstracts infrastructure complexity entirely",
                            "Progressive disclosure — capabilities are organised and discoverable, never overwhelming",
                            "Dashboard hierarchy that surfaces the most critical metrics first, every time",
                        ]
                    }
                },
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
                        { _type: 'block', style: 'h3', children: [{ text: "Research foundation — 8 weeks" }] },
                        { _type: 'block', style: 'normal', children: [{ text: "I began with extensive competitive analysis of existing voice agent platforms and automation tools, mapping feature sets, pricing models, and interaction patterns." }] },
                    ]
                },
                {
                    _type: 'tableBlock',
                    columns: ["Platform", "Voice AI", "No-code config", "Lead management"],
                    highlightRow: 3,
                    rows: [
                        { cells: [{ text: "Retell AI" }, { text: "Yes", cls: "yes" }, { text: "Partial", cls: "par" }, { text: "No", cls: "no" }] },
                        { cells: [{ text: "Bland AI" }, { text: "Yes", cls: "yes" }, { text: "No", cls: "no" }, { text: "No", cls: "no" }] },
                        { cells: [{ text: "Traditional telephony" }, { text: "No", cls: "no" }, { text: "No", cls: "no" }, { text: "Partial", cls: "par" }] },
                        { cells: [{ text: "SurveyAgent AI" }, { text: "Yes — ElevenLabs", cls: "yes" }, { text: "Yes — visual builder", cls: "yes" }, { text: "Yes — full CRM", cls: "yes" }] },
                    ]
                },
                {
                    _type: 'richText',
                    content: [
                        { _type: 'block', style: 'normal', children: [{ text: "User interviews with sales teams uncovered the real pain: manual calling was slow, inconsistent, and unscalable — but existing AI tools required engineering knowledge to configure. The gap was clear." }] },
                        { _type: 'block', style: 'h3', children: [{ text: "Iterative development — year-long refinement" }] },
                        { _type: 'block', style: 'normal', children: [{ text: "Following the research phase, I worked in continuous cycles of design, testing, and refinement. Each feature went through multiple iterations based on real user feedback — evolving from wireframes to high-fidelity prototypes to production-ready interfaces. This allowed the platform to mature from internal tooling to an investor-ready product." }] },
                    ]
                },
                {
                    _type: 'image-full',
                    alt: 'Research Process',
                    caption: 'UX Research Process — Discovery, Analysis, Wireframing, and Testing',
                    image: '/survey-agent/Research_Process.png',
                }
            ]
        },
        {
            _type: 'section',
            title: 'Node-based automation builder',
            leftColumn: [{ _type: 'split-text', label: 'Node-based automation builder' }],
            content: [
                {
                    _type: 'richText',
                    content: [
                        { _type: 'block', style: 'normal', children: [{ text: "The automation builder is the heart of the platform — allowing users to construct complex multi-step workflows without writing code. I chose a node-based visual programming interface for three strategic reasons." }] },
                    ]
                },
                {
                    _type: 'quoteBlock',
                    text: "Unlike template-based builders, the node system empowers advanced users to create sophisticated branching logic, delays, and multi-channel sequences — all without touching a line of code."
                },
                {
                    _type: 'flowBlock',
                    steps: [
                        { active: true, title: "Pick a trigger node", desc: "The entry point for any automation. Defines what event starts the calling sequence — new lead, scheduled time, or external webhook." },
                        { active: false, title: "Add action & logic nodes", desc: "Left panel organises nodes by category: Core, Action, Logic, Data, Integration — making capabilities discoverable without overwhelming the canvas." },
                        { active: false, title: "Configure via the context panel", desc: "Selecting any node reveals its specific settings in the right panel: WhatsApp number, message type, recipient phone — no hunting through menus." },
                        { active: false, title: "Connect and deploy", desc: "Bezier connections maintain visual hierarchy. One-click deploy sends the workflow live with full monitoring in the dashboard." },
                    ]
                },
                {
                    _type: 'image-full',
                    alt: 'Automation Builder interface',
                    caption: 'Node-based automation builder — visual workflow configuration',
                    image: '/survey-agent/Automation_Builder.png',
                }
            ]
        },
        {
            _type: 'section',
            title: 'Dashboard — visual hierarchy by design',
            leftColumn: [{ _type: 'split-text', label: 'Dashboard — visual hierarchy by design' }],
            content: [
                {
                    _type: 'richText',
                    content: [
                        { _type: 'block', style: 'normal', children: [{ text: "The dashboard's most distinctive element is the dark agent status card. This intentional contrast serves a clear purpose: drawing immediate attention to the most critical real-time metric — how many AI agents are currently active versus inactive." }] },
                        { _type: 'block', style: 'normal', children: [{ text: "In a platform where uptime and agent availability directly impact revenue, this information needs to be impossible to miss." }] },
                    ]
                },
                {
                    _type: 'quoteBlock',
                    text: "Visual hierarchy isn't decoration — it's functional information architecture. The most critical metrics must command attention immediately. Every design decision should serve this hierarchy: what needs to be seen first, second, third?"
                },
                {
                    _type: 'richText',
                    content: [
                        { _type: 'block', style: 'normal', children: [{ text: "Supporting metrics — conversion rate (24.5%), campaign list, and real-time call insights — sit in lighter cards to establish clear hierarchy. A dual-axis bar chart shows call volume vs. lead generation over 30 days. A recent calls feed provides real-time status at a glance." }] },
                    ]
                },
            ]
        },
        {
            _type: 'section',
            title: 'Lead management — progressive status system',
            leftColumn: [{ _type: 'split-text', label: 'Lead management — progressive status system' }],
            content: [
                {
                    _type: 'richText',
                    content: [
                        { _type: 'block', style: 'normal', children: [{ text: "The lead management interface uses a carefully designed color progression to communicate deal stages at a glance. The color sequence maps to the emotional journey of a sales pipeline — from neutral (New) to urgent (Negotiation) to resolved (Won/Lost)." }] },
                    ]
                },
                {
                    _type: 'tableBlock',
                    columns: ["Status", "Color signal", "Design rationale"],
                    rows: [
                        { cells: [{ text: "New" }, { text: "Purple", cls: "par" }, { text: "Neutral, untouched — no action yet" }] },
                        { cells: [{ text: "Contacted" }, { text: "Yellow", cls: "par" }, { text: "In progress — attention required" }] },
                        { cells: [{ text: "Qualified" }, { text: "Teal" }, { text: "Positive signal — moving forward" }] },
                        { cells: [{ text: "Proposal" }, { text: "Light Purple", cls: "par" }, { text: "High intent — awaiting decision" }] },
                        { cells: [{ text: "Negotiation" }, { text: "Orange", cls: "par" }, { text: "Active deal — requires immediate focus" }] },
                        { cells: [{ text: "Closed Won" }, { text: "Green", cls: "yes" }, { text: "Success — deal closed" }] },
                        { cells: [{ text: "Closed Lost" }, { text: "Red", cls: "no" }, { text: "Terminal state — learn and move on" }] },
                    ]
                },
                {
                    _type: 'richText',
                    content: [
                        { _type: 'block', style: 'normal', children: [{ text: "This color system provides instant status recognition across hundreds of leads. Users scanning the table can immediately identify high-priority deals (orange Negotiation) versus completed business (green Closed Won) without reading text labels." }] },
                    ]
                },
                {
                    _type: 'image-full',
                    alt: 'Lead Management interface',
                    caption: 'Lead management — progressive status system with table, Kanban, and Analytics views',
                    image: '/survey-agent/Leads_Management.png',
                }
            ]
        },
        {
            _type: 'section',
            title: 'Design system & visual language',
            leftColumn: [{ _type: 'split-text', label: 'Design system & visual language' }],
            content: [
                {
                    _type: 'richText',
                    content: [
                        { _type: 'block', style: 'normal', children: [{ text: "Throughout the year-long development process, I established and refined a cohesive design system that balances enterprise credibility with modern usability. The system was built to scale — every new feature plugs in without disrupting the existing experience." }] },
                    ]
                },
                {
                    _type: 'tokensBlock',
                    items: [
                        { name: "Brand", hex: "#4F46E5" },
                        { name: "Brand subtle", hex: "#EDE9FE" },
                        { name: "Brand dark", hex: "#3730A3" },
                        { name: "Ink", hex: "#111110" },
                        { name: "Surface", hex: "#F7F7F5", border: true },
                        { name: "Surface 2", hex: "#EFEFEC", border: true },
                    ]
                },
                {
                    _type: 'richText',
                    content: [
                        { _type: 'block', style: 'normal', children: [{ text: "Semantic colors handle status communication consistently: teal for progress, green for success, red for errors, yellow for warnings. Neutral grays maintain WCAG AA contrast throughout. Reusable data tables, status badges, card hierarchy, and form controls all live in a shared component library — meaning any new screen automatically inherits the system." }] },
                    ]
                },
                {
                    _type: 'image-full',
                    alt: 'Design System',
                    caption: 'SurveyAgent AI Design System — Tokens, Components, and Patterns',
                    image: '/survey-agent/Design_System.png',
                }
            ]
        },
        {
            _type: 'section',
            title: 'Impact & results',
            leftColumn: [{ _type: 'split-text', label: 'Impact & results' }],
            content: [
                {
                    _type: 'richText',
                    content: [
                        { _type: 'block', style: 'normal', children: [{ text: "The design work directly contributed to SurveyAgent's transition from internal tooling to investor-ready product." }] },
                    ]
                },
                {
                    _type: 'metricsBlock',
                    items: [
                        { value: "~60%", label: "Reduced navigation time via dashboard redesign" },
                        { value: "~35%", label: "Improved task completion via usability iteration" },
                        { value: "100%", label: "Intent-to-use from beta testers" },
                    ]
                },
                {
                    _type: 'richText',
                    content: [
                        { _type: 'block', style: 'normal', children: [{ text: "Positioned the startup for seed funding by delivering a polished, investor-ready MVP that demonstrated both technical capability and design sophistication. Maintained pixel-perfect design-to-development handoff through close collaboration with engineers, ensuring consistent execution across all releases." }] },
                    ]
                },
            ]
        },
        {
            _type: 'section',
            title: 'What building SurveyAgent taught me',
            leftColumn: [{ _type: 'split-text', label: 'What building SurveyAgent taught me' }],
            content: [
                {
                    _type: 'learningsBlock',
                    items: [
                        { num: "01", title: "Abstraction without oversimplification", body: "The automation builder proves that complex systems can be made accessible without dumbing them down. Visual nodes expose capability while hiding infrastructure — users build sophisticated workflows without engineering support." },
                        { num: "02", title: "Visual hierarchy drives comprehension", body: "The dark agent card isn't aesthetic — it's functional. In enterprise dashboards, the most critical metrics must command attention immediately. Every decision should serve the hierarchy: first, second, third." },
                        { num: "03", title: "Color as communication, not decoration", body: "The lead status progression — Purple → Yellow → Teal → Orange → Green/Red — is a visual language users internalize quickly, reducing cognitive load and enabling faster decisions at scale." },
                        { num: "04", title: "Iteration is design", body: "The year-long refinement wasn't just polish — it was fundamental design work. Features that seemed complete revealed new problems when users hit them with real data. Continuous testing separates a functional MVP from an investor-ready product." },
                        { num: "05", title: "Design systems enable velocity", body: "Building a cohesive component library felt slow at first. Six weeks in, shipping new screens took a fraction of the time — with guaranteed consistency, freeing mental energy for harder problems." },
                    ]
                }
            ]
        }
    ]
};
