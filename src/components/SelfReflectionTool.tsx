import React, { useState } from 'react';
import { HelpCircle, CheckCircle2, AlertTriangle, ArrowRight, RotateCcw, Award } from 'lucide-react';

export const SelfReflectionTool: React.FC = () => {
  const [weeklyHours, setWeeklyHours] = useState<number>(6);
  const [useCase, setUseCase] = useState<string>('Ideation');
  const [verification, setVerification] = useState<'always' | 'sometimes' | 'rarely' | 'never'>('sometimes');
  const [policy, setPolicy] = useState<string>('Allowed_With_Citation');
  const [promptSkill, setPromptSkill] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Intermediate');
  const [submitted, setSubmitted] = useState<boolean>(false);

  // Calculate profile archetype
  const calculateArchetype = () => {
    let score = 50; // 0 = Pure Substitute, 100 = Pure Accelerator

    // Hours impact
    if (weeklyHours <= 2) score += 5;
    else if (weeklyHours <= 10) score += 15; // Sweet spot
    else if (weeklyHours <= 20) score -= 10;
    else score -= 25; // >20h inflection risk

    // Use case impact
    if (useCase === 'Debugging/Troubleshooting') score += 15;
    else if (useCase === 'Ideation') score += 10;
    else if (useCase === 'Summarizing_Reading') score += 5;
    else if (useCase === 'Copywriting/Drafting') score -= 5;
    else if (useCase === 'Direct_Answer_Generation') score -= 25;

    // Verification impact
    if (verification === 'always') score += 20;
    else if (verification === 'sometimes') score += 5;
    else if (verification === 'rarely') score -= 15;
    else score -= 25;

    // Prompt skill impact
    if (promptSkill === 'Advanced') score += 10;
    else if (promptSkill === 'Intermediate') score += 5;
    else score -= 5;

    score = Math.max(5, Math.min(95, score));

    let title = 'Balanced Hybrid Learner';
    let summary = 'You use AI to smooth friction points while preserving core critical thinking.';
    let recommendations: string[] = [];

    if (score >= 75) {
      title = 'The Strategic Learning Accelerator';
      summary = 'You treat AI as an intellectual sparring partner and diagnostic assistant. You actively critique its outputs, maintain independent problem-solving habits, and avoid direct answer outsourcing.';
      recommendations = [
        'Continue using AI for concept exploration and error diagnosis.',
        'Actively share prompt verification strategies with peers who struggle with hallucination detection.',
        'Ensure you practice closed-book exam problems periodically to keep recall razor-sharp.'
      ];
    } else if (score >= 50) {
      title = 'The Productive but Vulnerable Integrator';
      summary = 'AI saves you significant time, but you are approaching the threshold where passive acceptance can subtly displace your own deep thinking.';
      recommendations = [
        'Before asking AI for an answer, spend at least 10 minutes writing down your own preliminary thoughts.',
        'Adopt a strict verification protocol: never submit a citation without confirming its existence in real academic indices.',
        'Monitor your weekly hours: try to keep AI interactions under 10 hours/week to prevent dependency creep.'
      ];
    } else {
      title = 'The High-Exposure Cognitive Substitute';
      summary = 'Your current usage patterns strongly mirror the >20h cohort in our 50,000-student dataset: heavy answer outsourcing, low verification, and high risk of sudden exam anxiety.';
      recommendations = [
        'Immediate intervention: stop using AI for direct answer generation. Switch to asking for explanations of concepts.',
        'Re-introduce unassisted study: dedicate 5–8 hours a week to completely screen-free, pencil-and-paper problem solving.',
        'Practice writing essay thesis statements and code outlines independently before prompting.'
      ];
    }

    return { score, title, summary, recommendations };
  };

  const result = calculateArchetype();

  return (
    <section id="self-test-section" className="py-16 border-b border-[#DCCEFF] bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center space-x-2 text-xs font-mono-stat uppercase tracking-wider text-[#24113F] mb-2 font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#6C3BFF]"></span>
            <span>Interactive Assessment &bull; Diagnostic Reflection</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl font-normal text-[#24113F] tracking-tight mb-4">
            Where Do You Sit on the Student-AI Spectrum?
          </h2>
          <p className="text-[#29252F] text-base sm:text-lg leading-relaxed">
            Derived from the Primary Student Survey instrument (Assignment 1 Research Plan), 
            this self-reflection tool benchmarks your personal habits against the 50,000-student dataset to diagnose whether AI is accelerating or substituting your learning.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Form Column */}
          <div className="lg:col-span-6 bg-[#F8F6FC] p-6 rounded-xl border border-[#DCCEFF] space-y-6 shadow-2xs">
            <h3 className="font-editorial text-xl font-bold text-[#24113F] border-b border-[#DCCEFF] pb-3">
              Your Study Habits Input
            </h3>

            {/* Q1: Weekly Hours */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-bold text-[#24113F]">
                  1. Weekly GenAI Study Time:
                </label>
                <span className="font-mono-stat font-bold text-sm text-[#6C3BFF]">
                  {weeklyHours} hrs/week
                </span>
              </div>
              <input
                id="input-weekly-hours"
                type="range"
                min={0}
                max={35}
                value={weeklyHours}
                onChange={(e) => setWeeklyHours(Number(e.target.value))}
                className="w-full h-2 bg-[#DCCEFF] rounded-lg appearance-none cursor-pointer accent-[#6C3BFF]"
              />
              <div className="flex justify-between text-[10px] text-[#29252F]/70 mt-1 font-mono-stat">
                <span>0h (Minimalist)</span>
                <span className="text-[#6C3BFF] font-semibold">5–10h (Optimal Window)</span>
                <span>20h+ (Inflection Zone)</span>
              </div>
            </div>

            {/* Q2: Primary Use Case */}
            <div>
              <label className="text-xs font-bold text-[#24113F] block mb-2">
                2. What do you mainly use AI for?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {[
                  { id: 'Debugging/Troubleshooting', label: 'Debugging / Troubleshooting' },
                  { id: 'Ideation', label: 'Ideation & Brainstorming' },
                  { id: 'Summarizing_Reading', label: 'Summarizing & Reading' },
                  { id: 'Copywriting/Drafting', label: 'Writing & Drafting' },
                  { id: 'Direct_Answer_Generation', label: 'Direct Homework Answers' },
                ].map((item) => (
                  <button
                    key={item.id}
                    id={`self-test-uc-${item.id}`}
                    type="button"
                    onClick={() => setUseCase(item.id)}
                    className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                      useCase === item.id
                        ? 'bg-[#24113F] text-[#C7F36B] border-[#24113F] font-semibold shadow-xs'
                        : 'bg-white text-[#29252F] border-[#DCCEFF] hover:bg-[#DCCEFF]/20'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Q3: Verification Habit */}
            <div>
              <label className="text-xs font-bold text-[#24113F] block mb-2">
                3. How often do you verify AI claims against textbooks or papers?
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                {[
                  { id: 'always', label: 'Always' },
                  { id: 'sometimes', label: 'Sometimes' },
                  { id: 'rarely', label: 'Rarely' },
                  { id: 'never', label: 'Never' },
                ].map((item) => (
                  <button
                    key={item.id}
                    id={`self-test-verify-${item.id}`}
                    type="button"
                    onClick={() => setVerification(item.id as any)}
                    className={`p-2 rounded-lg border text-center transition-all cursor-pointer ${
                      verification === item.id
                        ? 'bg-[#24113F] text-[#C7F36B] border-[#24113F] font-semibold shadow-xs'
                        : 'bg-white text-[#29252F] border-[#DCCEFF] hover:bg-[#DCCEFF]/20'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Q4: Prompting Skill */}
            <div>
              <label className="text-xs font-bold text-[#24113F] block mb-2">
                4. Self-rated Prompting Expertise:
              </label>
              <div className="grid grid-cols-3 gap-2 text-xs">
                {['Beginner', 'Intermediate', 'Advanced'].map((lvl) => (
                  <button
                    key={lvl}
                    id={`self-test-skill-${lvl}`}
                    type="button"
                    onClick={() => setPromptSkill(lvl as any)}
                    className={`p-2 rounded-lg border text-center transition-all cursor-pointer ${
                      promptSkill === lvl
                        ? 'bg-[#24113F] text-[#C7F36B] border-[#24113F] font-semibold shadow-xs'
                        : 'bg-white text-[#29252F] border-[#DCCEFF] hover:bg-[#DCCEFF]/20'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Results Column */}
          <div className="lg:col-span-6 bg-white p-6 rounded-xl border border-[#DCCEFF] shadow-2xs space-y-5">
            <div className="flex items-center justify-between border-b border-[#DCCEFF] pb-3">
              <span className="text-xs font-mono-stat uppercase tracking-wider text-[#6C3BFF] font-semibold">
                Diagnostic Assessment
              </span>
              <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-[#C7F36B] text-[#24113F]">
                Live Calculation
              </span>
            </div>

            <div>
              <span className="text-xs text-[#29252F]/70 block mb-1">Your Diagnostic Archetype</span>
              <h4 className="font-editorial text-2xl font-bold text-[#24113F]">
                {result.title}
              </h4>
              <p className="text-sm text-[#29252F] mt-2 leading-relaxed">
                {result.summary}
              </p>
            </div>

            {/* Spectrum Score Bar */}
            <div className="pt-2">
              <div className="flex justify-between text-xs mb-1.5 font-medium">
                <span className="text-rose-700 font-semibold">Substitute Hazard</span>
                <span className="font-mono-stat text-[#24113F] font-bold text-sm bg-[#DCCEFF]/50 px-2 py-0.5 rounded">{result.score}/100</span>
                <span className="text-[#6C3BFF] font-semibold">Learning Accelerator</span>
              </div>
              <div className="w-full h-3 bg-[#F8F6FC] border border-[#DCCEFF] rounded-full overflow-hidden flex">
                <div
                  className="h-full bg-linear-to-r from-rose-500 via-[#6C3BFF] to-[#C7F36B] transition-all duration-300 rounded-full"
                  style={{ width: `${result.score}%` }}
                ></div>
              </div>
            </div>

            {/* Benchmark vs 50k dataset */}
            <div className="p-4 bg-[#F8F6FC] rounded-xl border border-[#DCCEFF] text-xs space-y-2">
              <strong className="block text-[#24113F] font-bold uppercase tracking-wider text-[11px]">
                How You Compare to the 50,000-Student Dataset
              </strong>
              <div className="flex justify-between py-1 border-b border-[#DCCEFF]/60">
                <span className="text-[#29252F]">Your AI Study Time:</span>
                <span className="font-mono-stat font-semibold text-[#24113F]">
                  {weeklyHours} hrs/wk ({weeklyHours > 10 ? 'Above Average' : weeklyHours >= 5 ? 'At Average' : 'Below Average'})
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#DCCEFF]/60">
                <span className="text-[#29252F]">Dataset Average Weekly Hours:</span>
                <span className="font-mono-stat text-[#24113F]">8.39 hrs/wk</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-[#29252F]">Cognitive Risk Status:</span>
                <span className={`font-mono-stat font-bold ${result.score > 60 ? 'text-[#24113F] bg-[#C7F36B] px-1.5 py-0.5 rounded' : result.score > 40 ? 'text-[#6C3BFF]' : 'text-rose-600'}`}>
                  {result.score > 60 ? 'Low Dependency Risk' : result.score > 40 ? 'Moderate Vigilance Required' : 'Elevated Substitution Risk'}
                </span>
              </div>
            </div>

            {/* Actionable Recommendations */}
            <div className="space-y-2 pt-2">
              <strong className="text-xs font-bold text-[#24113F] uppercase tracking-wider block">
                Responsible Study Recommendations
              </strong>
              <ul className="text-xs text-[#29252F] space-y-2 pl-5 list-disc">
                {result.recommendations.map((rec, i) => (
                  <li key={i}>{rec}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
