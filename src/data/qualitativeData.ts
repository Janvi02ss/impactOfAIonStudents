export interface QualitativeQuote {
  id: string;
  theme: 'Accelerator' | 'Substitute' | 'Trust & Verification' | 'Skills & Identity' | 'Institutional Gap' | 'Unequal Access';
  studentProfile: string;
  major: string;
  year?: string;
  weeklyHours: string;
  quote: string;
  context: string;
  keyTakeaway: string;
  sentiment: 'positive' | 'warning' | 'mixed';
}

export const qualitativeQuotes: QualitativeQuote[] = [
  {
    id: "quote-1",
    theme: "Accelerator",
    studentProfile: "STEM Undergraduate, 3rd Year",
    major: "Computer Science",
    weeklyHours: "8 hrs/wk",
    quote: "When a compiler spits out an incomprehensible 40-line template error at 2 AM, AI acts like a patient teaching assistant who explains the stack trace in plain English instead of me bashing my head against StackOverflow for three hours.",
    context: "Primary student interview on code troubleshooting",
    keyTakeaway: "Unblocks momentum and clarifies dense documentation without writing the core algorithmic logic.",
    sentiment: "positive"
  },
  {
    id: "quote-2",
    theme: "Substitute",
    studentProfile: "Humanities Undergraduate, 2nd Year",
    major: "History & Literature",
    weeklyHours: "24 hrs/wk",
    quote: "I found myself asking the AI to outline the essay, draft each paragraph, and rewrite the conclusion. I got an A-, but walking into the exam room with pen and paper, my mind froze. I hadn't formed a single original thesis of my own in five months.",
    context: "Interview discussion on academic essay drafting and exam performance",
    keyTakeaway: "Short-term grading reward coexists with catastrophic atrophy of independent essay synthesis under exam conditions.",
    sentiment: "warning"
  },
  {
    id: "quote-3",
    theme: "Trust & Verification",
    studentProfile: "Medical / Health Sciences, 4th Year",
    major: "Biomedical Sciences",
    weeklyHours: "5 hrs/wk",
    quote: "AI once cited a completely fictitious paper in the Lancet with real-sounding author names and DOIs that led to a 404 page. It sounded 100% authoritative. If I hadn't manually verified every reference in PubMed, I would have submitted fabricated citations.",
    context: "Discussion on literature reviews and AI hallucination detection",
    keyTakeaway: "Hallucinations mimic rigorous academic rhetoric so closely that verification requires domain expertise.",
    sentiment: "warning"
  },
  {
    id: "quote-4",
    theme: "Accelerator",
    studentProfile: "Business Major, 1st Year",
    major: "Marketing & Strategy",
    weeklyHours: "4 hrs/wk",
    quote: "Starting with a blank page is where 80% of my procrastination happens. I use AI to generate 5 completely different angles or counterarguments to critique. Even when I reject four of them, having something to react against kicks my brain into gear.",
    context: "Survey response on brainstorming and task initiation",
    keyTakeaway: "Lowers cognitive friction for task initiation, transforming passive stalling into active editorial critique.",
    sentiment: "positive"
  },
  {
    id: "quote-5",
    theme: "Skills & Identity",
    studentProfile: "Design & Arts Student, Final Year",
    major: "Communication Design",
    weeklyHours: "14 hrs/wk",
    quote: "There is this creeping voice in your head: 'Is this my work, or did the machine write it better?' When every student hand-in starts sounding uniformly polished in that same robotic cadence, nobody knows what their authentic creative voice even sounds like anymore.",
    context: "Focus group participant discussing creative ownership and authenticity",
    keyTakeaway: "Homogenization of student voice generates impostor syndrome and anxiety about personal creative competence.",
    sentiment: "mixed"
  },
  {
    id: "quote-6",
    theme: "Institutional Gap",
    studentProfile: "Economics Graduate Student",
    major: "Applied Economics",
    weeklyHours: "10 hrs/wk",
    quote: "Our syllabus just says 'Unauthorised use of AI is prohibited', but in our econometrics lab, our professor uses Claude to generate Python scripts. What does 'unauthorised' mean? Nobody wants to ask because we're terrified of false-positive Turnitin flags.",
    context: "Primary survey response regarding institutional policy clarity",
    keyTakeaway: "Ambiguity breeds covert use and climate of paranoia rather than structured ethical pedagogy.",
    sentiment: "warning"
  },
  {
    id: "quote-7",
    theme: "Unequal Access",
    studentProfile: "STEM Undergraduate, 2nd Year",
    major: "Mechanical Engineering",
    weeklyHours: "16 hrs/wk",
    quote: "Classmates who pay $20 a month for high-reasoning models get accurate multi-step calculus solutions with code interpreter execution. Those on free tier get rate-limited or receive hallucinated formulas. We are grading wealth as much as intellect.",
    context: "Interview discussion regarding subscription status and equity",
    keyTakeaway: "Tiered access introduces economic disparity into assignment completion speed and analytical accuracy.",
    sentiment: "warning"
  },
  {
    id: "quote-8",
    theme: "Accelerator",
    studentProfile: "Humanities Undergraduate, 3rd Year",
    major: "Philosophy & Ethics",
    weeklyHours: "3 hrs/wk",
    quote: "I use AI as a Socratic sparring partner. I'll write: 'Here is my argument about Kant's categorical imperative. Adopt the perspective of a strict utilitarian and tear it apart.' It tests my logic before I ever raise my hand in seminar.",
    context: "Interview discussing deep conceptual learning and interactive tutoring",
    keyTakeaway: "Active Socratic dialoguing sharpens argumentation, demonstrating AI as a cognitive amplifier rather than a replacement.",
    sentiment: "positive"
  }
];

export interface StoryDirectionEvaluation {
  id: string;
  name: string;
  question: string;
  audienceRelevance: string;
  evidenceStrength: 'Strong' | 'Very Strong' | 'Moderate';
  visualForm: string;
  keyCaution: string;
  score: number; // out of 100
  selectedStatus: 'Primary Selected Direction' | 'Supporting Module';
}

export const candidateStoryDirections: StoryDirectionEvaluation[] = [
  {
    id: "dir-1",
    name: "The AI Study Intensity Spectrum",
    question: "What changes as students transition from light assistance (0–2h) to heavy dependence (>20h)?",
    audienceRelevance: "High — immediately relatable to students reflecting on their own weekly usage.",
    evidenceStrength: "Very Strong",
    visualForm: "Multi-band distribution slope, threshold inflection comparison, and correlational bands.",
    keyCaution: "Must emphasize association over causation; GPA is anchor-weighted by baseline GPA.",
    score: 94,
    selectedStatus: "Primary Selected Direction"
  },
  {
    id: "dir-2",
    name: "Tutor or Shortcut: The Use-Case Divide",
    question: "How do distinct academic use cases (debugging vs direct answers) shape retention and anxiety?",
    audienceRelevance: "High — empowers students to diagnose whether their specific habits are cognitive boosters or crutches.",
    evidenceStrength: "Very Strong",
    visualForm: "Bivariate scatter & radar profile of 5 primary use cases.",
    keyCaution: "Students frequently blend multiple use cases across different course types.",
    score: 92,
    selectedStatus: "Supporting Module"
  },
  {
    id: "dir-3",
    name: "Faster, But What Gets Replaced?",
    question: "Does GenAI time displacement substitute for traditional reading and deliberate cognitive practice?",
    audienceRelevance: "High — addresses faculty concerns about declining reading stamina and retention.",
    evidenceStrength: "Strong",
    visualForm: "Trade-off matrices, correlation heatmap, and paired time-budget bars.",
    keyCaution: "Traditional study hours are self-reported; correlation (-0.157) is modest, not absolute displacement.",
    score: 88,
    selectedStatus: "Supporting Module"
  },
  {
    id: "dir-4",
    name: "The Institutional Support Gap",
    question: "Why does institutional policy lag so dramatically behind student adoption (57% policies vs 95% use)?",
    audienceRelevance: "Moderate-High — critical for higher-ed administrators, educators, and curriculum designers.",
    evidenceStrength: "Strong",
    visualForm: "Adoption vs Institutional Guidance divergence chart.",
    keyCaution: "Requires bridging UK (HEPI), Jisc, and Indian (EY-Parthenon) policy data carefully.",
    score: 86,
    selectedStatus: "Supporting Module"
  },
  {
    id: "dir-5",
    name: "Student Archetypes & Unequal Experiences",
    question: "Do different student profiles (by major, prompt skill, and tool diversity) experience AI differently?",
    audienceRelevance: "High — shows that AI impact is heterogeneous across STEM, Humanities, and Arts.",
    evidenceStrength: "Strong",
    visualForm: "Cluster profiles & persona cards.",
    keyCaution: "Archetypes are descriptive analytical constructs, not rigid psychological labels.",
    score: 85,
    selectedStatus: "Supporting Module"
  },
  {
    id: "dir-6",
    name: "AI: Better Experience, Mixed Consequences",
    question: "How can 49% of students report improved experience while 16% report worsening and skill erosion?",
    audienceRelevance: "Very High — directly targets the central philosophical paradox of modern AI in learning.",
    evidenceStrength: "Very Strong",
    visualForm: "Two-sided divergence scale balancing perceived advantages against quantified cognitive risks.",
    keyCaution: "Avoid moral panic or uncritical evangelism; frame as an active trade-off decision.",
    score: 91,
    selectedStatus: "Supporting Module"
  }
];

export interface AiPromptLogItem {
  id: string;
  step: string;
  purpose: string;
  promptExtract: string;
  aiOutputSummary: string;
  humanVerificationAction: string;
  verdict: 'Accepted with Qualification' | 'Rejected / Refined' | 'Accepted';
}

export const aiInteractionLogs: AiPromptLogItem[] = [
  {
    id: "log-1",
    step: "Exploratory Analysis",
    purpose: "Testing correlation between weekly GenAI hours and student outcomes",
    promptExtract: "Analyze the 50,000-row dataset and determine if high GenAI hours degrade student skill retention and GPA.",
    aiOutputSummary: "AI claimed: 'Spending over 20 hours a week on AI causes students to lose critical thinking skills and causes severe exam panic.'",
    humanVerificationAction: "Rejected causal phrasing. Recomputed Pearson r (-0.118 for skill retention, 0.269 for anxiety). Rewrote to emphasize statistical association and noted baseline GPA confounds.",
    verdict: "Rejected / Refined"
  },
  {
    id: "log-2",
    step: "Use-Case Categorization",
    purpose: "Validating primary use cases across academic majors",
    promptExtract: "Identify whether Direct Answer Generation is prevalent across STEM vs Humanities.",
    aiOutputSummary: "AI suggested Direct Answer Generation is mostly used in Humanities for essay writing.",
    humanVerificationAction: "Checked cross-tabulation in cleaned CSV: Direct Answer Generation spans 12.7% of all students, with notable usage in STEM and Business for homework completion.",
    verdict: "Accepted with Qualification"
  },
  {
    id: "log-3",
    step: "Qualitative Coding",
    purpose: "Clustering 33 survey responses into thematic categories",
    promptExtract: "Group open-ended student responses into 6 emergent themes reflecting benefits and detriments.",
    aiOutputSummary: "AI suggested themes: Accelerator, Substitute, Trust & Verification, Skills & Identity, Institutional Gap, Unequal Access.",
    humanVerificationAction: "Cross-checked against Jisc 2025 and HEPI 2026 qualitative findings. Ensured both positive and cautionary cases are balanced without confirmation bias.",
    verdict: "Accepted"
  },
  {
    id: "log-4",
    step: "Visual Form Selection",
    purpose: "Evaluating candidate visualization methods for the 5 hours bands",
    promptExtract: "Suggest the best chart to represent the trade-off between GPA change and perceived dependency.",
    aiOutputSummary: "AI recommended a dual-axis line chart.",
    humanVerificationAction: "Rejected dual-axis chart due to optical scale distortion risks. Implemented synchronized multi-metric card grid and unified normalized comparison bars with clear baseline labels.",
    verdict: "Rejected / Refined"
  }
];
