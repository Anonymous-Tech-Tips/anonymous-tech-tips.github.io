import React, { useState } from 'react';
import { Target, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';

const exams = [
  {
    name: 'SAT',
    color: 'blue',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    badge: 'bg-blue-100 text-blue-800',
    icon: '📝',
    score: '400–1600',
    sections: ['Reading & Writing (200–800)', 'Math (200–800)'],
    tips: [
      'Take at least 3 full-length practice tests under timed conditions',
      'Use Khan Academy\'s free SAT prep — it\'s officially endorsed by College Board',
      'On Reading, eliminate two wrong answers before choosing; the remaining two often reveal the right one',
      'Math: skip and return on hard questions — each question is worth the same points',
      'Grammar rules tested repeatedly: subject-verb agreement, pronoun reference, transition words',
    ],
    resources: [
      { label: 'Khan Academy SAT Prep (Free)', url: 'https://www.khanacademy.org/sat' },
      { label: 'College Board Official Practice', url: 'https://satsuite.collegeboard.org/sat/practice-preparation' },
      { label: 'SAT Score Calculator', url: 'https://www.prepscholar.com/sat/s/resources/sat-score-calculator' },
    ],
  },
  {
    name: 'ACT',
    color: 'red',
    bg: 'bg-red-50',
    border: 'border-red-200',
    badge: 'bg-red-100 text-red-800',
    icon: '🎯',
    score: '1–36 composite',
    sections: ['English (75 Q / 45 min)', 'Math (60 Q / 60 min)', 'Reading (40 Q / 35 min)', 'Science (40 Q / 35 min)'],
    tips: [
      'Science section is NOT about memorizing facts — it tests data interpretation and graph reading',
      'English: read the sentence before AND after the underlined portion, not just the underlined part',
      'Math allows a calculator on all questions; use it on every computation to avoid errors',
      'Reading: answer questions in order but skip ones taking too long and return',
      'Aim to finish each section 2–3 minutes early to review flagged answers',
    ],
    resources: [
      { label: 'ACT Academy (Free)', url: 'https://academy.act.org/' },
      { label: 'Official ACT Practice Tests', url: 'https://www.act.org/content/act/en/products-and-services/the-act/test-preparation/free-act-test-prep.html' },
      { label: 'PrepScholar ACT Guide', url: 'https://blog.prepscholar.com/act-prep' },
    ],
  },
  {
    name: 'AP Exams',
    color: 'green',
    bg: 'bg-green-50',
    border: 'border-green-200',
    badge: 'bg-green-100 text-green-800',
    icon: '🏆',
    score: '1–5 (3+ earns college credit at most schools)',
    sections: ['Multiple Choice (~50%)', 'Free Response (~50%)'],
    tips: [
      'Use College Board\'s released FRQs from past years — these are the single best prep resource',
      'For AP essays, write a thesis that makes a specific, defensible historical/analytical claim',
      'Multiple choice: if you finish early, go back — AP penalizes no wrong answers (guess freely)',
      'Start FRQ prep in February; don\'t cram it into the last week',
      'Score a 3+ by mastering ~60–65% of content — you don\'t need perfection',
    ],
    resources: [
      { label: 'AP Classroom (Official CB)', url: 'https://myap.collegeboard.org/' },
      { label: 'Marco Learning YouTube', url: 'https://www.youtube.com/@MarcoLearning' },
      { label: 'Heimler\'s History (AP History)', url: 'https://www.youtube.com/@HeimlersHistory' },
      { label: 'Fiveable AP Study Guides', url: 'https://fiveable.me/' },
    ],
  },
  {
    name: 'IB Diploma',
    color: 'purple',
    bg: 'bg-purple-50',
    border: 'border-purple-200',
    badge: 'bg-purple-100 text-purple-800',
    icon: '🌐',
    score: '24–45 total points',
    sections: ['6 Subject Groups', 'Extended Essay (EE)', 'Theory of Knowledge (TOK)', 'CAS (Creativity/Activity/Service)'],
    tips: [
      'Extended Essay: pick a topic you genuinely care about — you\'ll spend months on it',
      'TOK: connect your personal experience to knowledge questions — vague philosophy won\'t score',
      'Internal Assessments (IAs) count 20–30% of your grade; start them by November',
      'IB examiners reward analysis and evaluation over description — always "so what?"',
      'Join r/IBO on Reddit for exam-specific advice and past papers from real students',
    ],
    resources: [
      { label: 'r/IBO Subreddit', url: 'https://www.reddit.com/r/IBO/' },
      { label: 'OSC IB Revision (Free Notes)', url: 'https://www.osc-ib.com/' },
      { label: 'Lanterna IB Resources', url: 'https://lanternaeducation.com/ib-resources/' },
    ],
  },
];

export const TestPrepSection: React.FC = () => {
  const [open, setOpen] = useState<string | null>('SAT');

  return (
    <section className="bg-slate-50 py-20 px-6 border-t border-slate-200">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-bold border border-blue-200 mb-4">
            <Target size={14} /> Test Prep Hub
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Ace Your Standardized Tests
          </h2>
          <p className="text-slate-600 mt-3 text-lg max-w-2xl mx-auto">
            Concrete, actionable strategies for SAT, ACT, AP, and IB — from people who scored in the top percentiles.
          </p>
        </div>

        <div className="space-y-3">
          {exams.map(exam => (
            <div key={exam.name} className={`rounded-2xl border ${exam.border} ${exam.bg} overflow-hidden`}>
              <button
                onClick={() => setOpen(open === exam.name ? null : exam.name)}
                className="w-full flex items-center justify-between px-6 py-5 text-left"
              >
                <div className="flex items-center gap-4">
                  <span className="text-2xl">{exam.icon}</span>
                  <div>
                    <h3 className="text-xl font-black text-slate-900">{exam.name}</h3>
                    <p className="text-sm text-slate-600 mt-0.5">Score range: <span className="font-semibold">{exam.score}</span></p>
                  </div>
                </div>
                {open === exam.name ? <ChevronUp size={20} className="text-slate-500" /> : <ChevronDown size={20} className="text-slate-500" />}
              </button>

              {open === exam.name && (
                <div className="px-6 pb-6 border-t border-slate-200/60 pt-5 grid md:grid-cols-2 gap-8">
                  {/* Tips */}
                  <div>
                    <h4 className="font-bold text-slate-900 mb-3 text-sm uppercase tracking-wide">Top Strategies</h4>
                    <ul className="space-y-2.5">
                      {exam.tips.map((tip, i) => (
                        <li key={i} className="flex gap-2.5 text-sm text-slate-700">
                          <span className={`font-black text-${exam.color}-600 flex-shrink-0`}>{i + 1}.</span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Sections + Resources */}
                  <div className="space-y-5">
                    <div>
                      <h4 className="font-bold text-slate-900 mb-3 text-sm uppercase tracking-wide">Test Structure</h4>
                      <div className="flex flex-wrap gap-2">
                        {exam.sections.map(s => (
                          <span key={s} className={`text-xs px-2.5 py-1 rounded-full font-medium ${exam.badge}`}>{s}</span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-3 text-sm uppercase tracking-wide">Free Resources</h4>
                      <ul className="space-y-2">
                        {exam.resources.map(r => (
                          <li key={r.label}>
                            <a href={r.url} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-1.5 text-sm text-${exam.color}-700 hover:underline font-medium`}>
                              <ExternalLink size={12} /> {r.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
