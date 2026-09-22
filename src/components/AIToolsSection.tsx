import React, { useState, useMemo } from 'react';
import { 
  Wrench, 
  Palette, 
  Code, 
  Search, 
  Zap, 
  Sparkles, 
  Layers, 
  ExternalLink, 
  CheckCircle2, 
  AlertCircle, 
  SlidersHorizontal, 
  BookOpen, 
  Box, 
  Cpu, 
  GraduationCap, 
  Layout, 
  FileCode2,
  Table
} from 'lucide-react';

interface ToolItem {
  id: string;
  name: string;
  category: 'design' | 'coding' | 'research';
  categoryLabel: string;
  tagline: string;
  speedMultiplier: string;
  studentPricing: string;
  bestFor: string;
  keyFeatures: string[];
  cognitiveGuardrail: string;
  externalUrl: string;
  badgeColor: string;
}

export const AIToolsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'design' | 'coding' | 'research'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');

  const tools: ToolItem[] = [
    // DESIGN TOOLS
    {
      id: 'figma-ai',
      name: 'Figma AI & FigJam',
      category: 'design',
      categoryLabel: 'UI/UX & Systems',
      tagline: 'Prompt-to-wireframe, auto-layout cleanup, and design system token organization.',
      speedMultiplier: '3x Faster Layouts',
      studentPricing: '100% Free via Figma Education Plan',
      bestFor: 'Design students building mobile app prototypes, design tokens, and user flow wireframes.',
      keyFeatures: [
        'Instant wireframe generation from textual product descriptions',
        'Automatic layer naming and responsive auto-layout refactoring',
        'Generative copywriting and realistic sample user data injection'
      ],
      cognitiveGuardrail: 'Never accept generated components without auditing visual hierarchy, accessibility contrast, and typography scales manually.',
      externalUrl: 'https://www.figma.com/education/',
      badgeColor: 'bg-[#6C3BFF] text-white'
    },
    {
      id: 'v0-vercel',
      name: 'v0 by Vercel',
      category: 'design',
      categoryLabel: 'UI to Code',
      tagline: 'Generates clean, production-ready React and Tailwind CSS components from natural language.',
      speedMultiplier: '4x Faster Prototyping',
      studentPricing: 'Generous Free Tier (Credits monthly)',
      bestFor: 'Design and front-end students bridging the gap between Figma mockups and interactive live code.',
      keyFeatures: [
        'Text-to-component code in React, Tailwind, and Shadcn/ui',
        'Live interactive iframe canvas to tweak styling on the fly',
        'Direct export to GitHub repositories or Next.js codebases'
      ],
      cognitiveGuardrail: 'Inspect every generated CSS utility class. Use it to learn modern flex/grid composition rather than treating it as a black box.',
      externalUrl: 'https://v0.dev/',
      badgeColor: 'bg-[#24113F] text-[#C7F36B]'
    },
    {
      id: 'recraft',
      name: 'Recraft.ai',
      category: 'design',
      categoryLabel: 'Vector & 3D Art',
      tagline: 'AI design engine specialized in creating clean, editable SVG vectors, 3D icons, and brand palettes.',
      speedMultiplier: '5x Vector Asset Speed',
      studentPricing: 'Free Tier with Daily Vector Exports',
      bestFor: 'Graphic design and UI students needing crisp, infinitely scalable SVG icons without raster pixelation.',
      keyFeatures: [
        'Pure SVG vector file generation with clean node points and paths',
        'Custom color palette lock ensuring assets strictly match project brand',
        'Diverse illustration styles: 3D render, flat minimalism, hand-drawn vector'
      ],
      cognitiveGuardrail: 'Open exported SVGs in Illustrator or Figma to refine anchor points and practice fundamental vector curve pen control.',
      externalUrl: 'https://www.recraft.ai/',
      badgeColor: 'bg-[#6C3BFF] text-white'
    },
    {
      id: 'spline-ai',
      name: 'Spline AI',
      category: 'design',
      categoryLabel: '3D Web Design',
      tagline: 'Generate 3D objects, animations, and interactive web canvases using natural language prompts.',
      speedMultiplier: '3x Faster 3D Concepts',
      studentPricing: 'Free Tier with WebGL Embedding',
      bestFor: 'Interactive designers wanting to add responsive, interactive 3D assets to portfolios and web projects.',
      keyFeatures: [
        'Prompt-driven 3D mesh creation, texture baking, and lighting rigs',
        'Real-time browser-based interactive physics and mouse-follow events',
        'Direct React and WebGL embed codes for frontend applications'
      ],
      cognitiveGuardrail: 'Study foundational 3D lighting principles (key, fill, rim) to understand why generated lighting setups work or fail.',
      externalUrl: 'https://spline.design/ai',
      badgeColor: 'bg-[#24113F] text-[#C7F36B]'
    },
    {
      id: 'uizard',
      name: 'Uizard',
      category: 'design',
      categoryLabel: 'Sketch to Wireframe',
      tagline: 'Converts hand-drawn paper sketches and whiteboard drawings into editable digital wireframes in seconds.',
      speedMultiplier: '6x Faster Ideation',
      studentPricing: 'Free Tier Available (Student discounts)',
      bestFor: 'Design students conducting design sprint ideation and transitioning notebook sketches to Figma.',
      keyFeatures: [
        'Camera capture of notebook wireframes converted to editable vector UI',
        'Screenshot-to-mockup style transfer to analyze competitor app UX',
        'Clickable prototype generation with instant user testing heatmaps'
      ],
      cognitiveGuardrail: 'Keep paper sketching as your primary brainstorming tool. The physical hand-eye feedback loop remains essential for creative thinking.',
      externalUrl: 'https://uizard.io/',
      badgeColor: 'bg-[#6C3BFF] text-white'
    },
    {
      id: 'adobe-firefly',
      name: 'Adobe Firefly',
      category: 'design',
      categoryLabel: 'Generative Imagery',
      tagline: 'Commercially safe generative imaging, texture expansion, and text-effect styling directly inside Photoshop.',
      speedMultiplier: '3x Faster Asset Iteration',
      studentPricing: 'Included in Adobe Creative Cloud Student',
      bestFor: 'Visual designers creating mockups, marketing materials, and backdrop concept art.',
      keyFeatures: [
        'Trained exclusively on Adobe Stock—ethically cleared for student portfolios',
        'Generative Fill to seamlessly expand canvas borders or swap elements',
        'Text-to-vector pattern generation and typographic texture rendering'
      ],
      cognitiveGuardrail: 'Use generated imagery as conceptual moodboard material; avoid relying on synthetic photos where authentic photography is needed.',
      externalUrl: 'https://www.adobe.com/products/firefly.html',
      badgeColor: 'bg-[#24113F] text-[#C7F36B]'
    },

    // AI & CODING TOOLS
    {
      id: 'cursor-ide',
      name: 'Cursor (AI Code Editor)',
      category: 'coding',
      categoryLabel: 'Code & Software Dev',
      tagline: 'Next-generation VS Code fork with deep codebase context indexing and multi-file code transformations.',
      speedMultiplier: '3.5x Coding Speed',
      studentPricing: 'Free Hobby Tier / Pro discounts',
      bestFor: 'Computer science & AI students managing large multi-file repositories, refactoring code, and debugging bugs.',
      keyFeatures: [
        'Full repository indexing: asks questions across your entire codebase',
        'Cmd+K inline code rewriting and terminal command generation',
        'Direct stack-trace explanation and one-click bug resolution'
      ],
      cognitiveGuardrail: 'Never tab-complete complex algorithms without verifying Big-O time and space complexity. Write pseudocode first!',
      externalUrl: 'https://www.cursor.com/',
      badgeColor: 'bg-[#24113F] text-[#C7F36B]'
    },
    {
      id: 'github-copilot',
      name: 'GitHub Copilot',
      category: 'coding',
      categoryLabel: 'AI Pair Programmer',
      tagline: 'Context-aware code completion, unit test generation, and CLI terminal assistance inside any major IDE.',
      speedMultiplier: '2.5x Faster Boilerplate',
      studentPricing: '100% Free via GitHub Student Developer Pack',
      bestFor: 'Students learning software engineering, writing API tests, and navigating new programming language syntax.',
      keyFeatures: [
        'Auto-completion of repetitive syntax, boilerplate, and database schemas',
        'Generates comprehensive test suites for edge cases you might overlook',
        'Copilot Chat explains cryptic compiler errors in conversational English'
      ],
      cognitiveGuardrail: 'Disable autocomplete during early-stage programming coursework. Build neural pathways by typing core syntax manually.',
      externalUrl: 'https://education.github.com/pack',
      badgeColor: 'bg-[#6C3BFF] text-white'
    },
    {
      id: 'claude-artifacts',
      name: 'Claude 3.5 & Artifacts',
      category: 'coding',
      categoryLabel: 'Interactive Prototyping',
      tagline: 'Best-in-class reasoning engine that compiles and renders live interactive diagrams, React apps, and SVGs.',
      speedMultiplier: '4x Faster Visualization',
      studentPricing: 'Free Tier on Claude.ai (Pro available)',
      bestFor: 'AI students exploring machine learning math, algorithmic proofs, and generating interactive data visualizers.',
      keyFeatures: [
        'Side-by-side interactive Artifacts panel rendering code and visual apps',
        'Superior performance in complex logic, refactoring, and nuance',
        'Transforms mathematical equations into runnable simulations'
      ],
      cognitiveGuardrail: 'Ask Claude to act as a Socratic sparring partner: "Critique my architecture and tell me what could fail."',
      externalUrl: 'https://claude.ai/',
      badgeColor: 'bg-[#6C3BFF] text-white'
    },
    {
      id: 'google-colab',
      name: 'Google Colab with AI Assist',
      category: 'coding',
      categoryLabel: 'ML & Cloud GPUs',
      tagline: 'Cloud-hosted Jupyter notebook environment with free T4 GPU access and integrated AI code autocomplete.',
      speedMultiplier: '3x Faster ML Prototyping',
      studentPricing: 'Free Access to Cloud GPUs & Notebooks',
      bestFor: 'AI & Data Science students training PyTorch/TensorFlow models, running Hugging Face transformers, and plotting data.',
      keyFeatures: [
        'Zero setup: instant GPU/TPU environments in your browser',
        'Inline Gemini assistance to explain complex matrix reshaping errors',
        'Seamless integration with Google Drive and Kaggle datasets'
      ],
      cognitiveGuardrail: 'Understand tensor dimensions and gradient flow manually before accepting automatic layer transformations.',
      externalUrl: 'https://colab.research.google.com/',
      badgeColor: 'bg-[#24113F] text-[#C7F36B]'
    },
    {
      id: 'ollama',
      name: 'Ollama & LM Studio',
      category: 'coding',
      categoryLabel: 'Local Offline AI',
      tagline: 'Run powerful open-weight LLMs (Llama 3, DeepSeek, Mistral) 100% locally on your laptop with zero internet.',
      speedMultiplier: 'Zero-Latency Offline Dev',
      studentPricing: '100% Free & Open Source',
      bestFor: 'Students working with sensitive data, building offline RAG pipelines, or studying model weights locally.',
      keyFeatures: [
        'Complete data privacy: zero API tokens sent over the internet',
        'Local REST API endpoint compatible with OpenAI client libraries',
        'Enables hands-on experimentation with quantization (4-bit, 8-bit)'
      ],
      cognitiveGuardrail: 'Great for learning systems architecture: monitor local RAM, VRAM, and tokens-per-second throughput to understand hardware demands.',
      externalUrl: 'https://ollama.com/',
      badgeColor: 'bg-[#6C3BFF] text-white'
    },

    // RESEARCH & PRODUCTIVITY TOOLS
    {
      id: 'perplexity-pro',
      name: 'Perplexity AI',
      category: 'research',
      categoryLabel: 'Grounded Research',
      tagline: 'Conversational answer engine with real-time academic paper citations, DOIs, and transparent bibliography references.',
      speedMultiplier: '4x Literature Search',
      studentPricing: 'Free Tier with Daily Pro Searches',
      bestFor: 'Students conducting literature reviews, fact-checking claims, and discovering peer-reviewed papers.',
      keyFeatures: [
        'Academic filter mode searching strictly arXiv, PubMed, and JSTOR',
        'Every factual sentence is anchored to an indexed footnote link',
        'Upload lecture slides or research PDFs to extract key methodologies'
      ],
      cognitiveGuardrail: 'Always click through to read the primary paper abstract. Never cite an article based solely on Perplexity\'s summary!',
      externalUrl: 'https://www.perplexity.ai/',
      badgeColor: 'bg-[#24113F] text-[#C7F36B]'
    },
    {
      id: 'elicit',
      name: 'Elicit (AI Research Assistant)',
      category: 'research',
      categoryLabel: 'Systematic Reviews',
      tagline: 'Analyzes 200M+ academic papers to extract sample sizes, methodologies, and statistical findings into a structured table.',
      speedMultiplier: '5x Paper Synthesis',
      studentPricing: 'Free Tier with 5,000 Research Credits',
      bestFor: 'Graduate and undergraduate researchers writing thesis reviews and comparing conflicting academic findings.',
      keyFeatures: [
        'Generates automated matrix comparing 10+ papers across custom criteria',
        'Extracts exact quotes and confidence intervals from study results',
        'Identifies consensus and contradictions across published literature'
      ],
      cognitiveGuardrail: 'Check the publication venue and peer-review status of cited journals. Filter out predatory or unindexed publications.',
      externalUrl: 'https://elicit.com/',
      badgeColor: 'bg-[#6C3BFF] text-white'
    },
    {
      id: 'wolfram-alpha',
      name: 'Wolfram Alpha Intelligence',
      category: 'research',
      categoryLabel: 'Computational Math',
      tagline: 'Curated symbolic mathematics engine for exact step-by-step calculus, linear algebra, and data science proofs.',
      speedMultiplier: '3x Math Verification',
      studentPricing: 'Free Web Tier (Student Pro discounts)',
      bestFor: 'AI/CS students learning vector spaces, matrix decomposition, eigenvalues, and multivariable calculus.',
      keyFeatures: [
        'Symbolic step-by-step calculus and differential equation solutions',
        'Deterministic calculations with 0% chance of probabilistic hallucination',
        'Visualizes 3D vector fields, eigenvectors, and statistical distributions'
      ],
      cognitiveGuardrail: 'Solve the problem on paper first. Use Wolfram strictly to diagnose where your algebraic step went astray.',
      externalUrl: 'https://www.wolframalpha.com/',
      badgeColor: 'bg-[#6C3BFF] text-white'
    }
  ];

  const filteredTools = useMemo(() => {
    return tools.filter((tool) => {
      const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = 
        query === '' ||
        tool.name.toLowerCase().includes(query) ||
        tool.tagline.toLowerCase().includes(query) ||
        tool.bestFor.toLowerCase().includes(query) ||
        tool.categoryLabel.toLowerCase().includes(query) ||
        tool.speedMultiplier.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section id="tools-section" className="py-16 sm:py-20 border-b border-[#DCCEFF] bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center space-x-2 text-xs font-mono-stat uppercase tracking-wider text-[#24113F] mb-2 font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#6C3BFF]"></span>
            <span>Practical Acceleration &bull; The Modern Student Toolkit</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-normal text-[#24113F] tracking-tight mb-4">
            Curated AI Tools for Design &amp; AI Students
          </h2>
          <p className="text-[#29252F] text-base sm:text-lg leading-relaxed">
            High-leverage artificial intelligence tools curated specifically for <strong>UI/UX designers</strong>, 
            <strong> computer science learners</strong>, and <strong>AI students</strong>. 
            Use these platforms to eliminate tedious boilerplate, accelerate visual prototyping, and study complex technical concepts faster—while 
            preserving your critical thinking.
          </p>
        </div>

        {/* Quick Highlights / Value Props Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="p-4 rounded-xl bg-[#F8F6FC] border border-[#DCCEFF] flex items-start space-x-3">
            <div className="p-2 rounded-lg bg-[#24113F] text-[#C7F36B] shrink-0 mt-0.5">
              <Palette className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-bold text-[#24113F] text-sm">For Design Students</h4>
              <p className="text-xs text-[#29252F] mt-1 leading-relaxed">
                Generate clean vector SVGs, rapid interactive wireframes, and production-ready component code in minutes.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#F8F6FC] border border-[#DCCEFF] flex items-start space-x-3">
            <div className="p-2 rounded-lg bg-[#6C3BFF] text-white shrink-0 mt-0.5">
              <Code className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-bold text-[#24113F] text-sm">For AI &amp; Tech Students</h4>
              <p className="text-xs text-[#29252F] mt-1 leading-relaxed">
                Multi-file codebase indexing, cloud GPUs, step-by-step math verification, and local private models.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#24113F] text-white border border-[#24113F] flex items-start space-x-3">
            <div className="p-2 rounded-lg bg-white/10 text-[#C7F36B] shrink-0 mt-0.5">
              <GraduationCap className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Student-Budget Verified</h4>
              <p className="text-xs text-[#DCCEFF] mt-1 leading-relaxed">
                Every tool featured either offers a 100% free education tier, GitHub Student Pack access, or a generous free tier.
              </p>
            </div>
          </div>
        </div>

        {/* Controls Bar: Category Tabs, Search Bar & View Mode Toggle */}
        <div className="p-4 rounded-2xl bg-[#F8F6FC] border border-[#DCCEFF] mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-[#24113F] text-[#C7F36B] shadow-xs'
                  : 'bg-white text-[#29252F] hover:bg-[#DCCEFF]/60 border border-[#DCCEFF]'
              }`}
            >
              All Tools ({tools.length})
            </button>
            <button
              onClick={() => setSelectedCategory('design')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center space-x-1.5 ${
                selectedCategory === 'design'
                  ? 'bg-[#24113F] text-[#C7F36B] shadow-xs'
                  : 'bg-white text-[#29252F] hover:bg-[#DCCEFF]/60 border border-[#DCCEFF]'
              }`}
            >
              <Palette className="w-3.5 h-3.5 text-[#6C3BFF]" />
              <span>Design &amp; UI/UX</span>
            </button>
            <button
              onClick={() => setSelectedCategory('coding')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center space-x-1.5 ${
                selectedCategory === 'coding'
                  ? 'bg-[#24113F] text-[#C7F36B] shadow-xs'
                  : 'bg-white text-[#29252F] hover:bg-[#DCCEFF]/60 border border-[#DCCEFF]'
              }`}
            >
              <Code className="w-3.5 h-3.5 text-[#6C3BFF]" />
              <span>AI Coding &amp; ML</span>
            </button>
            <button
              onClick={() => setSelectedCategory('research')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center space-x-1.5 ${
                selectedCategory === 'research'
                  ? 'bg-[#24113F] text-[#C7F36B] shadow-xs'
                  : 'bg-white text-[#29252F] hover:bg-[#DCCEFF]/60 border border-[#DCCEFF]'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-[#6C3BFF]" />
              <span>Research &amp; Math</span>
            </button>
          </div>

          {/* Search Input & View Toggle */}
          <div className="flex items-center space-x-2.5 w-full md:w-auto justify-end">
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-[#29252F]/50 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tools, tags, features..."
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-[#DCCEFF] bg-white text-[#24113F] focus:outline-hidden focus:ring-2 focus:ring-[#6C3BFF]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-[#29252F]/60 hover:text-[#24113F]"
                >
                  &times;
                </button>
              )}
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center bg-white rounded-lg border border-[#DCCEFF] p-0.5 shrink-0">
              <button
                onClick={() => setViewMode('cards')}
                className={`p-1.5 rounded-md text-xs font-medium cursor-pointer transition-colors ${
                  viewMode === 'cards' ? 'bg-[#24113F] text-[#C7F36B]' : 'text-[#29252F] hover:text-[#24113F]'
                }`}
                title="Grid Card View"
              >
                <Layers className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-md text-xs font-medium cursor-pointer transition-colors ${
                  viewMode === 'table' ? 'bg-[#24113F] text-[#C7F36B]' : 'text-[#29252F] hover:text-[#24113F]'
                }`}
                title="Comparative Table View"
              >
                <Table className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Display: CARDS VIEW */}
        {viewMode === 'cards' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map((tool) => (
              <div 
                key={tool.id}
                className="bg-[#F8F6FC] rounded-2xl border border-[#DCCEFF] p-6 flex flex-col justify-between hover:border-[#6C3BFF]/50 transition-all shadow-2xs hover:shadow-sm"
              >
                <div>
                  {/* Top Badges & Tags */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="font-mono-stat text-[11px] font-bold px-2 py-0.5 rounded-md bg-[#24113F] text-[#C7F36B]">
                      {tool.categoryLabel}
                    </span>
                    <span className="font-mono-stat text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#C7F36B] text-[#24113F] flex items-center space-x-1">
                      <Zap className="w-3 h-3 text-[#24113F]" />
                      <span>{tool.speedMultiplier}</span>
                    </span>
                  </div>

                  {/* Tool Title & Tagline */}
                  <h3 className="font-editorial text-xl font-bold text-[#24113F] mb-1.5">
                    {tool.name}
                  </h3>
                  <p className="text-xs text-[#29252F] leading-relaxed mb-4">
                    {tool.tagline}
                  </p>

                  {/* Best For Section */}
                  <div className="p-3 rounded-xl bg-white border border-[#DCCEFF] mb-4">
                    <span className="text-[10px] font-mono-stat uppercase tracking-wider text-[#6C3BFF] font-bold block mb-1">
                      Best Academic Use Case:
                    </span>
                    <p className="text-xs text-[#24113F] font-medium leading-snug">
                      {tool.bestFor}
                    </p>
                  </div>

                  {/* Key Capabilities List */}
                  <div className="space-y-1.5 mb-4">
                    <span className="text-[10px] font-mono-stat uppercase tracking-wider text-[#29252F]/70 font-semibold block">
                      Speed Capabilities:
                    </span>
                    {tool.keyFeatures.map((feat, idx) => (
                      <div key={idx} className="flex items-start space-x-1.5 text-xs text-[#29252F]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#6C3BFF] shrink-0 mt-0.5" />
                        <span className="leading-tight">{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Student Pricing Badge */}
                  <div className="text-[11px] font-mono-stat text-[#24113F] font-semibold bg-[#DCCEFF]/50 px-2.5 py-1.5 rounded-lg border border-[#DCCEFF] mb-4 flex items-center space-x-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-[#6C3BFF]" />
                    <span>{tool.studentPricing}</span>
                  </div>
                </div>

                {/* Cognitive Guardrail Footer */}
                <div className="pt-3 border-t border-[#DCCEFF]">
                  <div className="flex items-start space-x-1.5 text-[11px] text-[#24113F] mb-3">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-[#24113F]">Guardrail: </span>
                      <span className="text-[#29252F]/90 leading-tight">{tool.cognitiveGuardrail}</span>
                    </div>
                  </div>

                  <a
                    href={tool.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center space-x-1.5 w-full py-2 rounded-xl bg-white border border-[#DCCEFF] text-xs font-semibold text-[#24113F] hover:bg-[#24113F] hover:text-[#C7F36B] hover:border-[#24113F] transition-colors cursor-pointer"
                  >
                    <span>Visit Platform</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Display: COMPARATIVE TABLE VIEW */}
        {viewMode === 'table' && (
          <div className="overflow-x-auto rounded-xl border border-[#DCCEFF] shadow-2xs">
            <table className="w-full text-left text-xs border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-[#24113F] text-white">
                  <th className="p-3.5 font-semibold text-xs tracking-wider uppercase">Tool &amp; Domain</th>
                  <th className="p-3.5 font-semibold text-xs tracking-wider uppercase">Speed Multiplier</th>
                  <th className="p-3.5 font-semibold text-xs tracking-wider uppercase">Primary Academic Benefit</th>
                  <th className="p-3.5 font-semibold text-xs tracking-wider uppercase">Student Pricing</th>
                  <th className="p-3.5 font-semibold text-xs tracking-wider uppercase">Essential Guardrail</th>
                  <th className="p-3.5 font-semibold text-xs tracking-wider uppercase">Link</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DCCEFF] bg-white">
                {filteredTools.map((tool, idx) => (
                  <tr key={tool.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-[#FAF8FE]'}>
                    <td className="p-3.5 font-bold text-[#24113F] align-top max-w-[180px]">
                      <span className="font-editorial text-sm block">{tool.name}</span>
                      <span className="text-[10px] font-mono-stat font-semibold text-[#6C3BFF] uppercase">
                        {tool.categoryLabel}
                      </span>
                    </td>
                    <td className="p-3.5 align-top">
                      <span className="font-mono-stat font-bold text-[11px] px-2 py-0.5 rounded bg-[#C7F36B] text-[#24113F] whitespace-nowrap">
                        {tool.speedMultiplier}
                      </span>
                    </td>
                    <td className="p-3.5 text-[#29252F] align-top max-w-[240px] leading-relaxed">
                      {tool.bestFor}
                    </td>
                    <td className="p-3.5 text-[#24113F] align-top max-w-[160px] font-mono-stat text-[11px] font-semibold">
                      {tool.studentPricing}
                    </td>
                    <td className="p-3.5 text-[#29252F] align-top max-w-[220px] leading-relaxed bg-[#FFFBEB] text-amber-900 border-l border-amber-200">
                      {tool.cognitiveGuardrail}
                    </td>
                    <td className="p-3.5 align-top">
                      <a
                        href={tool.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-1 text-[#6C3BFF] hover:underline font-semibold"
                      >
                        <span>Open</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Empty State */}
        {filteredTools.length === 0 && (
          <div className="text-center py-12 bg-[#F8F6FC] rounded-2xl border border-dashed border-[#DCCEFF]">
            <Search className="w-8 h-8 text-[#29252F]/40 mx-auto mb-2" />
            <h4 className="font-editorial text-lg font-bold text-[#24113F]">No tools found matching &ldquo;{searchQuery}&rdquo;</h4>
            <p className="text-xs text-[#29252F] mt-1">Try clearing your search query or selecting a different category tab.</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
              className="mt-3 px-4 py-1.5 rounded-lg bg-[#24113F] text-[#C7F36B] text-xs font-semibold cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Practical Student Protocol Callout */}
        <div className="mt-10 p-6 rounded-2xl bg-[#F8F6FC] border border-[#DCCEFF] flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] font-mono-stat uppercase tracking-wider text-[#6C3BFF] font-bold">
              The 80/20 AI Tool Adoption Rule
            </span>
            <h4 className="font-editorial text-lg font-bold text-[#24113F]">
              Speed Up Execution &bull; Never Outsource Comprehension
            </h4>
            <p className="text-xs text-[#29252F] max-w-2xl leading-relaxed">
              The highest-performing students do not use 50 different AI wrappers. They master 2–3 foundational tools 
              (such as Cursor for coding, Figma for visual design, and Perplexity for literature synthesis) to compress mechanical overhead, 
              spending the saved hours on deeper human mastery.
            </p>
          </div>
          <div className="shrink-0">
            <a
              href="#overview-section"
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-[#24113F] text-[#C7F36B] font-bold text-xs hover:bg-[#6C3BFF] hover:text-white transition-all shadow-xs"
            >
              <span>Back to Top Story</span>
              <span>&uarr;</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
