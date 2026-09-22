import React from 'react';
import { 
  Sparkles, 
  Compass, 
  Brain, 
  ShieldCheck, 
  Lightbulb, 
  CheckCircle, 
  ArrowUpRight, 
  BookOpen, 
  Zap, 
  Users 
} from 'lucide-react';

export const ConcludingSection: React.FC = () => {
  const pillars = [
    {
      number: '01',
      title: 'Embrace Productive Cognitive Struggle',
      icon: Brain,
      summary: 'True learning occurs in the friction of figuring things out.',
      description: 'Generative AI can eliminate friction with a single prompt, but cognitive science shows that long-term neural encoding requires working through confusion. Treat AI as a mirror to test your reasoning against—never as an intellectual surrogate to do your thinking.'
    },
    {
      number: '02',
      title: 'Protect Your Focus as a Sacred Asset',
      icon: Zap,
      summary: 'In an era of hyper-stimulating feeds, deep focus is your superpower.',
      description: 'Short-form algorithmic video feeds and constant notifications fracture working memory into 5-minute slivers. Deliberate unassisted focus—even for 45 uninterrupted minutes a day—yields disproportionate academic depth and lowers baseline exam anxiety.'
    },
    {
      number: '03',
      title: 'Exercise Epistemic Skepticism',
      icon: ShieldCheck,
      summary: 'Never mistake conversational fluency for grounded factual truth.',
      description: 'AI models generate convincing prose through statistical token probability, not comprehension. Cultivate the non-negotiable habit of verifying citations, checking primary sources, and looking for methodological weaknesses in every AI summary.'
    },
    {
      number: '04',
      title: 'Preserve Your Unique Human Voice',
      icon: Users,
      summary: 'Originality, nuance, and lived experience cannot be synthetically generated.',
      description: 'Over-reliance on AI drafting leads to homogenized, soulless writing. Use AI to challenge your hypotheses and explore counterarguments, but ensure your essays and creative expressions carry your authentic authorial rhythm.'
    }
  ];

  const studentRules = [
    {
      rule: 'The 15-Minute Struggle Rule',
      detail: 'Before opening an AI tool for any problem, spend 15 minutes drafting your own hypotheses, rough outline, or attempt on paper.'
    },
    {
      rule: 'The Socratic Prompt Mandate',
      detail: 'Instruct your AI assistant: "Do not give me the answer. Ask me guiding questions step-by-step so I can solve it myself."'
    },
    {
      rule: 'Digital Study Sanctuaries',
      detail: 'Establish distraction-free zones: keep smartphones in another room or in airplane mode while reading and synthesizing.'
    },
    {
      rule: 'Radical Ethical Transparency',
      detail: 'Maintain an honest audit log of how tools were used, building a reputation for integrity and authentic mastery.'
    }
  ];

  return (
    <section id="conclusion-section" className="py-20 border-b border-[#DCCEFF] bg-[#F8F6FC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center space-x-2 text-xs font-mono-stat uppercase tracking-wider text-[#24113F] mb-2 font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#6C3BFF]"></span>
            <span>Synthesis &bull; Concluding Perspective</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-normal text-[#24113F] tracking-tight mb-4">
            The Path Forward: Human Agency in an Algorithmic Age
          </h2>
          <p className="text-[#29252F] text-base sm:text-lg leading-relaxed">
            The definitive question of modern education is not whether artificial intelligence will replace teachers or students, 
            but whether students will use technology to <strong>expand their intellectual autonomy</strong> or surrender it to convenient algorithms.
          </p>
        </div>

        {/* 4 Pillars Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div 
                key={pillar.number}
                className="bg-white p-6 sm:p-8 rounded-2xl border border-[#DCCEFF] shadow-xs flex flex-col justify-between hover:border-[#6C3BFF]/50 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono-stat text-xs font-bold text-[#6C3BFF] bg-[#DCCEFF]/40 px-2.5 py-1 rounded-md">
                      Pillar {pillar.number}
                    </span>
                    <div className="p-2 rounded-xl bg-[#24113F] text-[#C7F36B]">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <h3 className="font-editorial text-xl sm:text-2xl font-bold text-[#24113F] mb-2">
                    {pillar.title}
                  </h3>
                  <div className="text-xs font-semibold text-[#6C3BFF] uppercase tracking-wide mb-3">
                    {pillar.summary}
                  </div>
                  <p className="text-xs sm:text-sm text-[#29252F] leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Actionable Blueprint Box */}
        <div className="bg-[#24113F] text-white rounded-2xl p-6 sm:p-10 border border-[#24113F] shadow-lg mb-12">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-mono-stat uppercase tracking-wider text-[#C7F36B] font-bold block mb-2">
              Actionable Framework
            </span>
            <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-white mb-3">
              The Conscious Student Protocol
            </h3>
            <p className="text-xs sm:text-sm text-[#DCCEFF] leading-relaxed">
              Four concrete commitments to transform AI from a seductive shortcut into an empowering cognitive multiplier.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {studentRules.map((r, idx) => (
              <div 
                key={idx}
                className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center space-x-2 text-[#C7F36B] font-bold text-xs font-mono-stat mb-1.5">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Rule {idx + 1}: {r.rule}</span>
                </div>
                <p className="text-xs text-[#DCCEFF]/90 leading-relaxed">
                  {r.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Final Reflective Takeaway */}
        <div className="text-center max-w-3xl mx-auto py-6">
          <blockquote className="font-editorial text-xl sm:text-2xl italic text-[#24113F] leading-relaxed mb-4">
            &ldquo;Artificial intelligence cannot care about what you learn; only you can. 
            The real mastery is not in asking an algorithm to do your thinking, 
            but in using it to expand the horizon of what you are capable of understanding.&rdquo;
          </blockquote>
          <div className="text-xs font-mono-stat uppercase tracking-wider text-[#6C3BFF] font-semibold">
            The Student-AI Spectrum &bull; Core Philosophy
          </div>
        </div>

      </div>
    </section>
  );
};
