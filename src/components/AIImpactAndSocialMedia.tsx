import React, { useState } from 'react';
import { 
  Share2, 
  Smartphone, 
  Brain, 
  ShieldAlert, 
  Sparkles, 
  Layers, 
  Clock, 
  HeartHandshake, 
  Eye, 
  AlertTriangle,
  CheckCircle2,
  TrendingDown,
  TrendingUp,
  Sliders,
  Filter
} from 'lucide-react';

export const AIImpactAndSocialMedia: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'social-media' | 'academic-impact' | 'ai-tech' | 'wellbeing'>('social-media');
  const [filterSeverity, setFilterSeverity] = useState<'all' | 'high' | 'moderate'>('all');

  const tabs = [
    {
      id: 'social-media',
      label: 'Social Media & Algorithmic Effects',
      icon: Smartphone,
      badge: 'Attention & Culture',
      description: 'How algorithmic feed loops, viral study trends, and synthetic content alter student attention spans and wellbeing.'
    },
    {
      id: 'academic-impact',
      label: 'AI Academic & Cognitive Impact',
      icon: Brain,
      badge: 'Learning Dynamics',
      description: 'Systematic comparison of student workflows with and without AI across core university tasks.'
    },
    {
      id: 'ai-tech',
      label: 'AI Technologies & Capabilities',
      icon: Layers,
      badge: 'Tool Architecture',
      description: 'Understanding LLMs, multimodal systems, and agentic workflows—their strengths, blindspots, and cognitive risks.'
    },
    {
      id: 'wellbeing',
      label: 'Digital Wellbeing & Action Matrix',
      icon: HeartHandshake,
      badge: 'Student Playbook',
      description: 'Concrete, high-leverage habits to maintain human agency, deep focus, and ethical peace of mind.'
    }
  ];

  // Tab 1 Data: Social Media & Algorithmic Impact on Students
  const socialMediaRows = [
    {
      id: 'attention-span',
      phenomenon: 'Short-Form Video Algorithms (TikTok / Reels / Shorts)',
      mechanism: 'Variable-ratio dopamine reinforcement loops personalized via real-time watch duration and micro-pauses.',
      studentImpact: 'Severe fragmentation of sustained attention. Students struggle to engage in uninterrupted deep reading (>20 min), experiencing constant urge for micro-stimulation.',
      symptoms: 'Phantom phone vibration, task-switching every 4–7 minutes, difficulty comprehending dense multi-page academic texts.',
      severity: 'high',
      copingStrategy: 'Implement "Airplane Focus Windows": Physical separation from smartphone during first 45 minutes of study sessions.'
    },
    {
      id: 'study-hacks',
      phenomenon: '"Viral Study Hacks" & AI Wrapper Tool Spam',
      mechanism: 'Algorithmic promotion of sensationalized "Get an A+ in 5 Seconds without Reading" videos designed to drive affiliate app installs.',
      studentImpact: 'Fosters an illusion of learning. Students accumulate dozens of chrome extensions and prompt hacks instead of actually engaging with the curriculum.',
      symptoms: 'Tool fatigue, superficial conceptual retention, panic when facing proctored in-person exams without device access.',
      severity: 'high',
      copingStrategy: 'Adopt the "Single Toolkit Rule": Restrict active academic tools to 2 verified platforms (e.g., institution-approved LLM + reference manager).'
    },
    {
      id: 'productivity-dysmorphia',
      phenomenon: 'Productivity Dysmorphia & Study Influencer Culture',
      mechanism: 'Highly stylized, staged "16-hour aesthetic study vlogs" and AI-assisted workflow reels pushed to student discovery feeds.',
      studentImpact: 'Chronic imposter syndrome and feelings of personal inadequacy. Normal fatigue or productive confusion is pathologized as failure.',
      symptoms: 'Guilt when taking healthy breaks, late-night sleep deprivation, compulsive checking of peers\' study progress.',
      severity: 'moderate',
      copingStrategy: 'Curate social feeds aggressively: Mute performative productivity accounts and track progress against personal learning goals, not influencer aesthetics.'
    },
    {
      id: 'epistemic-blur',
      phenomenon: 'Synthetic Information & Disinformation Overload',
      mechanism: 'Generative AI content flooding social platforms and search indexes with hallucinated or unverified "facts" masquerading as real research.',
      studentImpact: 'Erosion of epistemic discernment. Students uncritically cite fabricated case studies or AI-generated pseudo-historical narratives in coursework.',
      symptoms: 'Accepting top social search results as authoritative, declining verification reflexes, difficulty differentiating peer-reviewed vs synthetic claims.',
      severity: 'high',
      copingStrategy: 'The "Triangulation Reflex": Never accept any factual claim from social media or AI without tracing it to an indexed primary scholarly source.'
    },
    {
      id: 'peer-comparison',
      phenomenon: 'Algorithmic Peer Comparison & Silent Despair',
      mechanism: 'Social feeds showcase only frictionless, AI-polished student project submissions, concealing struggle, revisions, and human error.',
      studentImpact: 'Reluctance to ask professors or peers for help. Students assume "everyone else grasps the material instantly," leading to academic isolation.',
      symptoms: 'Classroom withdrawal, fear of asking questions during lectures, masking lack of comprehension by generating AI answers.',
      severity: 'moderate',
      copingStrategy: 'Foster in-person peer study circles where raw, unfinished drafting and live collaborative problem-solving are actively normalized.'
    },
    {
      id: 'echo-chambers',
      phenomenon: 'Algorithmic Polarization & Intellectual Siloing',
      mechanism: 'Recommendation algorithms curate content that reinforces preexisting biases, suppressing divergent perspectives and scholarly nuance.',
      studentImpact: 'Reduced tolerance for complex, multi-sided intellectual debates. Students struggle with essays requiring critique of competing philosophical frameworks.',
      symptoms: 'Binary thinking, dismissiveness toward unfamiliar academic viewpoints, reliance on simplistic ideological slogans.',
      severity: 'moderate',
      copingStrategy: 'Intentionally prompt AI to articulate the three strongest scholarly counterarguments against your own working thesis before writing.'
    }
  ];

  // Tab 2 Data: Academic & Cognitive Impact
  const academicRows = [
    {
      id: 'problem-solving',
      domain: 'Technical Problem Solving & Debugging',
      traditional: 'Tracing stack traces, reading API documentation, manual print-statement debugging.',
      aiWorkflow: 'Submitting error logs to AI for contextual explanation of why the bug occurred and review of edge cases.',
      studentEffect: 'Accelerates diagnostic learning. When students inspect explanations, skill retention peaks at 78.1% (highest in 50k dataset).',
      tradeOff: 'Minimal downside when code was originally authored by student; massive cognitive loss if student merely asks AI to write code from scratch.',
      severity: 'moderate',
      guardrail: 'Mandate "Explain It First": Write a comment explaining your solution architecture before pasting into AI.'
    },
    {
      id: 'essay-writing',
      domain: 'Essay Drafting & Thesis Development',
      traditional: 'Outlining, drafting messy first iterations, revising rhetoric, developing authentic voice over weeks.',
      aiWorkflow: 'Prompting AI with topic to generate paragraph blocks, transitions, or full essays with minimal human revisions.',
      studentEffect: 'Immediate reduction in blank-page anxiety, but causes homogenization of prose and loss of unique authorial voice.',
      tradeOff: 'High risk of cognitive offloading: 12% UK students submit AI text directly. Weakens capacity to construct long-form linear arguments.',
      severity: 'high',
      guardrail: 'The "Reverse Outline": Use AI only for brainstorming divergent perspectives; write all submitted paragraphs manually.'
    },
    {
      id: 'literature-reading',
      domain: 'Reading Academic Literature',
      traditional: 'Deep reading, highlighting, margin annotations, grappling with dense philosophical or technical syntax.',
      aiWorkflow: 'Pasting PDF into AI to generate 5 bullet points and executive summary.',
      studentEffect: 'Drastic time savings (summarizing in 30 seconds), but prevents the cognitive struggle necessary for deep epistemic synthesis.',
      tradeOff: 'Loss of close-reading stamina. Students miss methodology limitations, subtle caveats, and statistical nuances hidden in raw text.',
      severity: 'high',
      guardrail: 'Pre-reading Map: Use AI summary to understand structure BEFORE reading original paper, never as a replacement.'
    },
    {
      id: 'exam-prep',
      domain: 'Exam Revision & Concept Recall',
      traditional: 'Reviewing past exams, manual flashcards, group quizzing, self-testing with textbooks.',
      aiWorkflow: 'Generating custom Socratic quizzes, simulated mock exams with adaptive difficulty, and targeted flashcards.',
      studentEffect: 'Highly effective accelerator. Active retrieval practice through conversational testing improves exam performance.',
      tradeOff: 'False mastery: If students review AI flashcards passively rather than retrieving answers from memory, retention collapses.',
      severity: 'moderate',
      guardrail: 'Unassisted Retrieval First: Formulate answer in mind or on paper before asking AI for feedback.'
    },
    {
      id: 'direct-answers',
      domain: 'Homework & Problem Sets',
      traditional: 'Struggling through assignment questions, office hours with teaching assistants, trial-and-error.',
      aiWorkflow: 'Pasting homework prompts directly into AI and copying output into submission portal.',
      studentEffect: 'Catastrophic cognitive bypass. Correlates with lowest skill retention (73.7%) and severe panic during proctored midterms.',
      tradeOff: 'Student functions merely as a copy-paste courier. Zero synaptic reinforcement occurs.',
      severity: 'high',
      guardrail: 'Strict Boundary: Never paste a graded homework question directly into an LLM without attempting solution steps first.'
    }
  ];

  // Tab 3 Data: AI Technologies & Capabilities
  const techRows = [
    {
      id: 'llm-models',
      techName: 'Large Language Models (LLMs)',
      examples: 'GPT-4o, Claude 3.5, Gemini 1.5 Pro',
      capabilities: 'Autoregressive probabilistic token generation, high fluency in natural language, synthesis of diverse topics.',
      blindspots: 'Plausible hallucinations, sycophantic agreement with user premises, lack of grounded truth awareness, math calculation slips.',
      studentVulnerability: 'Mistaking conversational fluency for authoritative truth; accepting biased or fabricated citations.',
      bestPractice: 'Treat as an articulate collaborator who needs constant source verification; prompt with explicit skepticism constraints.'
    },
    {
      id: 'multimodal',
      techName: 'Multimodal Vision & Audio Models',
      examples: 'Voice assistants, diagram parsers, audio lecture transcribers',
      capabilities: 'Translating handwritten equations, whiteboard diagrams, and lecture recordings into structured markdown notes.',
      blindspots: 'Misinterpreting subscript notation, handwritten Greek letters, or context-specific engineering diagrams.',
      studentVulnerability: 'Skipping the physical act of drawing and sketching diagrams, which is critical for spatial and motor memory.',
      bestPractice: 'After AI analyzes a diagram, physically redraw it in your notebook with books closed to solidify conceptual pathways.'
    },
    {
      id: 'code-assistants',
      techName: 'Code Intelligence & Copilots',
      examples: 'GitHub Copilot, Cursor, Codeium',
      capabilities: 'Contextual code autocomplete, syntax error resolution, test generation, boilerplate assembly.',
      blindspots: 'Generating insecure code patterns, hallucinating deprecated library methods, lack of holistic system design awareness.',
      studentVulnerability: '"Tab-complete development": Accepting autocomplete suggestions without understanding control flow or complexity.',
      bestPractice: 'Disable auto-complete during early programming coursework; use only for explicit debugging queries after code is written.'
    },
    {
      id: 'agentic-ai',
      techName: 'Agentic Workflows & Multi-Step AI',
      examples: 'Autonomous research agents, web-browsing copilots',
      capabilities: 'Executing recursive multi-step plans, browsing live web sources, compiling annotated bibliographies automatically.',
      blindspots: 'Compounding errors across multi-step reasoning chains, citing low-quality search engine spam.',
      studentVulnerability: 'Total detachment from the exploratory discovery journey where unexpected scholarly insights typically happen.',
      bestPractice: 'Inspect the agent\'s complete execution log and individually evaluate every URL cited before accepting research findings.'
    }
  ];

  // Tab 4 Data: Digital Wellbeing & Action Matrix
  const wellbeingRows = [
    {
      id: 'screen-hygiene',
      dimension: 'Attention & Screen Hygiene',
      highRisk: 'Studying in multi-window split screens with TikTok, Instagram DMs, and Discord active alongside course materials.',
      healthyPractice: 'The "Single Monastic Tab": Full-screen document focus, phone placed in another room during 45-minute blocks.',
      outcome: '64% reduction in perceived mental fatigue; doubled rate of deep reading comprehension.'
    },
    {
      id: 'the-60-20-rule',
      dimension: 'The 60/20 Hybrid Study Protocol',
      highRisk: 'Querying AI immediately upon reading an assignment prompt, bypassing independent thought entirely.',
      healthyPractice: 'Spend 60 minutes wrestling with the problem unassisted; use the final 20 minutes with AI to critique and check edge cases.',
      outcome: 'Preserves productive cognitive struggle while still benefiting from AI as a diagnostic tutor.'
    },
    {
      id: 'social-detox',
      dimension: 'Social Media Comparison Antidote',
      highRisk: 'Doomscrolling study influencers and competitive peer LinkedIn / TikTok posts before sleeping.',
      healthyPractice: 'Digital Sunset: No algorithmic feeds 60 minutes before bedtime; maintain a private handwritten learning journal.',
      outcome: 'Improved REM sleep quality, diminished academic imposter syndrome, and reduced baseline anxiety.'
    },
    {
      id: 'ethical-transparency',
      dimension: 'Ethical Attribution & Pride',
      highRisk: 'Living in fear of AI plagiarism detection by submitting covertly edited synthetic text.',
      healthyPractice: 'Keep a clear "AI Collaboration Log": Document prompt rationale, verified sources, and human edits openly.',
      outcome: 'Eliminates cheating anxiety, earns faculty respect, and builds genuine intellectual integrity.'
    }
  ];

  const getFilteredRows = (rows: any[]) => {
    if (filterSeverity === 'all') return rows;
    return rows.filter((r) => r.severity === filterSeverity || !r.severity);
  };

  return (
    <section id="impact-matrix-section" className="py-16 border-b border-[#DCCEFF] bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center space-x-2 text-xs font-mono-stat uppercase tracking-wider text-[#24113F] mb-2 font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#6C3BFF]"></span>
            <span>Comprehensive Reference Matrix &bull; Realities &amp; Social Dynamics</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl font-normal text-[#24113F] tracking-tight mb-4">
            AI &amp; Social Media: The Student Impact Matrix
          </h2>
          <p className="text-[#29252F] text-base sm:text-lg leading-relaxed">
            Beyond academic metrics lies the everyday reality of modern student life. 
            Explore how generative AI models and algorithmic social media feeds interact to reshape 
            attention spans, cognitive stamina, peer culture, and mental wellness.
          </p>
        </div>

        {/* Top Quantitative Overview Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-10">
          <div className="p-4 rounded-xl bg-[#F8F6FC] border border-[#DCCEFF]">
            <div className="flex items-center space-x-2 text-[#6C3BFF] text-xs font-mono-stat uppercase font-semibold mb-1">
              <Smartphone className="w-3.5 h-3.5" />
              <span>Attention Metric</span>
            </div>
            <div className="font-editorial text-2xl sm:text-3xl font-bold text-[#24113F]">
              4.6 hrs
            </div>
            <p className="text-xs text-[#29252F]/80 mt-1">
              Average daily non-academic screen &amp; social media usage reported by undergraduates
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#F8F6FC] border border-[#DCCEFF]">
            <div className="flex items-center space-x-2 text-[#6C3BFF] text-xs font-mono-stat uppercase font-semibold mb-1">
              <Eye className="w-3.5 h-3.5" />
              <span>Focus Fragmentation</span>
            </div>
            <div className="font-editorial text-2xl sm:text-3xl font-bold text-[#24113F]">
              6 min
            </div>
            <p className="text-xs text-[#29252F]/80 mt-1">
              Average interval before a student switches between studying and notifications
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#F8F6FC] border border-[#DCCEFF]">
            <div className="flex items-center space-x-2 text-[#6C3BFF] text-xs font-mono-stat uppercase font-semibold mb-1">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
              <span>Productivity FOMO</span>
            </div>
            <div className="font-editorial text-2xl sm:text-3xl font-bold text-[#24113F]">
              68%
            </div>
            <p className="text-xs text-[#29252F]/80 mt-1">
              Students reporting anxiety that peers possess superior AI tools and study secret hacks
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#24113F] text-white border border-[#24113F]">
            <div className="flex items-center space-x-2 text-[#C7F36B] text-xs font-mono-stat uppercase font-semibold mb-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Cognitive Agency</span>
            </div>
            <div className="font-editorial text-2xl sm:text-3xl font-bold text-[#C7F36B]">
              +78%
            </div>
            <p className="text-xs text-[#DCCEFF]/80 mt-1">
              Retention rate achieved when AI is constrained to diagnostic inquiry vs answers
            </p>
          </div>
        </div>

        {/* Interactive Tab Switcher */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-2 border-b border-[#DCCEFF]">
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  id={`impact-tab-${tab.id}`}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#24113F] text-[#C7F36B] shadow-sm'
                      : 'bg-[#F8F6FC] text-[#29252F] hover:bg-[#DCCEFF]/50 border border-[#DCCEFF]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#C7F36B]' : 'text-[#6C3BFF]'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Severity Filter (For relevant tabs) */}
          {(activeTab === 'social-media' || activeTab === 'academic-impact') && (
            <div className="flex items-center space-x-1.5 text-xs text-[#29252F]">
              <Filter className="w-3.5 h-3.5 text-[#6C3BFF]" />
              <span className="font-medium text-[#24113F]">Filter Risk:</span>
              <button
                onClick={() => setFilterSeverity('all')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors cursor-pointer ${
                  filterSeverity === 'all'
                    ? 'bg-[#6C3BFF] text-white'
                    : 'bg-[#F8F6FC] text-[#29252F] hover:bg-[#DCCEFF]'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilterSeverity('high')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors cursor-pointer ${
                  filterSeverity === 'high'
                    ? 'bg-rose-100 text-rose-900 border border-rose-300'
                    : 'bg-[#F8F6FC] text-[#29252F] hover:bg-[#DCCEFF]'
                }`}
              >
                High Risk
              </button>
            </div>
          )}
        </div>

        {/* Tab Description Banner */}
        <div className="p-4 rounded-xl bg-[#F8F6FC] border border-[#DCCEFF] mb-6 flex items-start space-x-3">
          <div className="p-2 rounded-lg bg-[#DCCEFF]/60 text-[#24113F] shrink-0 mt-0.5">
            {activeTab === 'social-media' && <Smartphone className="w-4 h-4 text-[#6C3BFF]" />}
            {activeTab === 'academic-impact' && <Brain className="w-4 h-4 text-[#6C3BFF]" />}
            {activeTab === 'ai-tech' && <Layers className="w-4 h-4 text-[#6C3BFF]" />}
            {activeTab === 'wellbeing' && <HeartHandshake className="w-4 h-4 text-[#6C3BFF]" />}
          </div>
          <div>
            <h4 className="font-bold text-[#24113F] text-sm mb-1">
              {tabs.find((t) => t.id === activeTab)?.label}
            </h4>
            <p className="text-xs text-[#29252F] leading-relaxed">
              {tabs.find((t) => t.id === activeTab)?.description}
            </p>
          </div>
        </div>

        {/* TAB 1: SOCIAL MEDIA & ALGORITHMIC EFFECTS (TABLE) */}
        {activeTab === 'social-media' && (
          <div className="overflow-x-auto rounded-xl border border-[#DCCEFF] shadow-2xs">
            <table className="w-full text-left text-xs border-collapse min-w-[760px]">
              <thead>
                <tr className="bg-[#24113F] text-white">
                  <th className="p-3.5 font-semibold text-xs tracking-wider uppercase">Social Phenomenon</th>
                  <th className="p-3.5 font-semibold text-xs tracking-wider uppercase">Algorithmic Mechanism</th>
                  <th className="p-3.5 font-semibold text-xs tracking-wider uppercase">Direct Impact on Students</th>
                  <th className="p-3.5 font-semibold text-xs tracking-wider uppercase">Observable Symptoms</th>
                  <th className="p-3.5 font-semibold text-xs tracking-wider uppercase">Recommended Guardrail</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DCCEFF] bg-white">
                {getFilteredRows(socialMediaRows).map((row, idx) => (
                  <tr key={row.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-[#FAF8FE]'}>
                    <td className="p-3.5 font-bold text-[#24113F] align-top max-w-[180px]">
                      <div className="flex items-center space-x-1.5 mb-1">
                        <span className={`w-2 h-2 rounded-full ${row.severity === 'high' ? 'bg-rose-500' : 'bg-amber-500'}`} />
                        <span className="text-[11px] font-mono-stat uppercase font-semibold text-[#6C3BFF]">
                          {row.severity === 'high' ? 'High Impact' : 'Moderate'}
                        </span>
                      </div>
                      <span className="text-sm font-editorial">{row.phenomenon}</span>
                    </td>
                    <td className="p-3.5 text-[#29252F] align-top max-w-[200px] leading-relaxed">
                      {row.mechanism}
                    </td>
                    <td className="p-3.5 text-[#29252F] align-top max-w-[220px] leading-relaxed">
                      {row.studentImpact}
                    </td>
                    <td className="p-3.5 text-[#24113F] align-top max-w-[180px] leading-relaxed font-medium">
                      <span className="inline-block px-2 py-1 rounded bg-[#F8F6FC] border border-[#DCCEFF] text-[11px]">
                        {row.symptoms}
                      </span>
                    </td>
                    <td className="p-3.5 text-[#24113F] align-top max-w-[200px] leading-relaxed bg-[#C7F36B]/10 font-medium">
                      <span className="text-[11px] text-[#24113F]">{row.copingStrategy}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* TAB 2: ACADEMIC & COGNITIVE IMPACT MATRIX (TABLE) */}
        {activeTab === 'academic-impact' && (
          <div className="overflow-x-auto rounded-xl border border-[#DCCEFF] shadow-2xs">
            <table className="w-full text-left text-xs border-collapse min-w-[760px]">
              <thead>
                <tr className="bg-[#24113F] text-white">
                  <th className="p-3.5 font-semibold text-xs tracking-wider uppercase">Academic Domain</th>
                  <th className="p-3.5 font-semibold text-xs tracking-wider uppercase">Traditional Workflow</th>
                  <th className="p-3.5 font-semibold text-xs tracking-wider uppercase">AI-Assisted Workflow</th>
                  <th className="p-3.5 font-semibold text-xs tracking-wider uppercase">Cognitive Trade-Off</th>
                  <th className="p-3.5 font-semibold text-xs tracking-wider uppercase">Healthy Study Protocol</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DCCEFF] bg-white">
                {getFilteredRows(academicRows).map((row, idx) => (
                  <tr key={row.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-[#FAF8FE]'}>
                    <td className="p-3.5 font-bold text-[#24113F] align-top max-w-[170px]">
                      <span className="text-sm font-editorial">{row.domain}</span>
                    </td>
                    <td className="p-3.5 text-[#29252F] align-top max-w-[190px] leading-relaxed">
                      {row.traditional}
                    </td>
                    <td className="p-3.5 text-[#29252F] align-top max-w-[200px] leading-relaxed">
                      {row.aiWorkflow}
                    </td>
                    <td className="p-3.5 text-[#24113F] align-top max-w-[210px] leading-relaxed">
                      <div className="p-2 rounded bg-[#FFE4E8] text-[#881337] border border-[#FECDD3] text-[11px]">
                        {row.tradeOff}
                      </div>
                    </td>
                    <td className="p-3.5 text-[#24113F] align-top max-w-[190px] leading-relaxed bg-[#C7F36B]/10 font-medium">
                      <span className="text-[11px] text-[#24113F]">{row.guardrail}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* TAB 3: AI TECHNOLOGY CAPABILITIES & ARCHITECTURES (TABLE) */}
        {activeTab === 'ai-tech' && (
          <div className="overflow-x-auto rounded-xl border border-[#DCCEFF] shadow-2xs">
            <table className="w-full text-left text-xs border-collapse min-w-[760px]">
              <thead>
                <tr className="bg-[#24113F] text-white">
                  <th className="p-3.5 font-semibold text-xs tracking-wider uppercase">Technology Class</th>
                  <th className="p-3.5 font-semibold text-xs tracking-wider uppercase">Core Strengths</th>
                  <th className="p-3.5 font-semibold text-xs tracking-wider uppercase">Inherent Blindspots</th>
                  <th className="p-3.5 font-semibold text-xs tracking-wider uppercase">Student Risk Factor</th>
                  <th className="p-3.5 font-semibold text-xs tracking-wider uppercase">Optimal Student Practice</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DCCEFF] bg-white">
                {techRows.map((row, idx) => (
                  <tr key={row.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-[#FAF8FE]'}>
                    <td className="p-3.5 font-bold text-[#24113F] align-top max-w-[180px]">
                      <span className="text-sm font-editorial block">{row.techName}</span>
                      <span className="text-[10px] font-mono-stat text-[#6C3BFF] font-semibold">{row.examples}</span>
                    </td>
                    <td className="p-3.5 text-[#29252F] align-top max-w-[200px] leading-relaxed">
                      {row.capabilities}
                    </td>
                    <td className="p-3.5 text-[#881337] align-top max-w-[200px] leading-relaxed bg-[#FFF1F3]">
                      {row.blindspots}
                    </td>
                    <td className="p-3.5 text-[#29252F] align-top max-w-[200px] leading-relaxed">
                      {row.studentVulnerability}
                    </td>
                    <td className="p-3.5 text-[#24113F] align-top max-w-[200px] leading-relaxed bg-[#C7F36B]/15 font-medium">
                      {row.bestPractice}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* TAB 4: DIGITAL WELLBEING & ACTION MATRIX (TABLE) */}
        {activeTab === 'wellbeing' && (
          <div className="overflow-x-auto rounded-xl border border-[#DCCEFF] shadow-2xs">
            <table className="w-full text-left text-xs border-collapse min-w-[760px]">
              <thead>
                <tr className="bg-[#24113F] text-white">
                  <th className="p-3.5 font-semibold text-xs tracking-wider uppercase">Life &amp; Study Area</th>
                  <th className="p-3.5 font-semibold text-xs tracking-wider uppercase">High-Risk Vulnerability Pattern</th>
                  <th className="p-3.5 font-semibold text-xs tracking-wider uppercase">Conscious Sustainable Practice</th>
                  <th className="p-3.5 font-semibold text-xs tracking-wider uppercase">Measurable Student Benefit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DCCEFF] bg-white">
                {wellbeingRows.map((row, idx) => (
                  <tr key={row.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-[#FAF8FE]'}>
                    <td className="p-3.5 font-bold text-[#24113F] align-top max-w-[180px]">
                      <span className="text-sm font-editorial">{row.dimension}</span>
                    </td>
                    <td className="p-3.5 text-[#881337] align-top max-w-[240px] leading-relaxed bg-[#FFF1F3]">
                      <div className="flex items-start space-x-1.5">
                        <TrendingDown className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
                        <span>{row.highRisk}</span>
                      </div>
                    </td>
                    <td className="p-3.5 text-[#24113F] align-top max-w-[260px] leading-relaxed bg-[#C7F36B]/15 font-medium">
                      <div className="flex items-start space-x-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#24113F] shrink-0 mt-0.5" />
                        <span>{row.healthyPractice}</span>
                      </div>
                    </td>
                    <td className="p-3.5 text-[#29252F] align-top max-w-[200px] leading-relaxed font-semibold text-[#6C3BFF]">
                      <div className="flex items-start space-x-1.5">
                        <TrendingUp className="w-3.5 h-3.5 text-[#6C3BFF] shrink-0 mt-0.5" />
                        <span>{row.outcome}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Bottom Synthesis Callout */}
        <div className="mt-8 p-6 rounded-2xl bg-[#F8F6FC] border border-[#DCCEFF] flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1">
            <h4 className="font-editorial text-lg font-bold text-[#24113F]">
              The Core Takeaway for Students
            </h4>
            <p className="text-xs text-[#29252F] max-w-2xl leading-relaxed">
              Neither generative AI nor social algorithms are inherently detrimental. The critical factor is <strong>intentionality</strong>: 
              when students employ AI as a conversational sparring partner for diagnostic inquiry while enforcing disciplined attention boundaries, 
              both retention and mental clarity flourish.
            </p>
          </div>
          <div className="shrink-0">
            <a
              href="#conclusion-section"
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-[#24113F] text-[#C7F36B] font-bold text-xs hover:bg-[#6C3BFF] hover:text-white transition-all shadow-xs"
            >
              <span>Read The Concluding Synthesis</span>
              <span>&rarr;</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
