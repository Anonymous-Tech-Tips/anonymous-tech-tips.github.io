import React, { useState } from 'react';
import { GraduationCap, Briefcase, DollarSign, ExternalLink } from 'lucide-react';

const tabs = ['College Prep', 'Scholarships', 'Career Exploration'] as const;
type Tab = typeof tabs[number];

export const CollegeCareerSection: React.FC = () => {
  const [tab, setTab] = useState<Tab>('College Prep');

  return (
    <section className="bg-gradient-to-br from-slate-900 to-slate-800 py-20 px-6 text-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-sm font-bold border border-white/20 mb-4">
            <GraduationCap size={14} /> College & Career
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Plan Your Future
          </h2>
          <p className="text-slate-400 mt-3 text-lg max-w-2xl mx-auto">
            Timelines, resources, and strategies for college applications, financial aid, and career discovery.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-1">
          {tabs.map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-colors ${
                tab === t ? 'bg-white text-slate-900' : 'bg-white/10 text-slate-300 hover:bg-white/20'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* College Prep */}
        {tab === 'College Prep' && (
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-black text-white text-lg mb-4">Application Timeline</h3>
              <div className="space-y-3">
                {[
                  { period: 'Grade 9–10', color: 'bg-green-500', tasks: ['Take challenging courses (Honors/AP when possible)', 'Explore extracurriculars — depth matters more than breadth', 'Volunteer/intern to build a consistent narrative', 'Start a list of potential majors or career interests'] },
                  { period: 'Grade 11', color: 'bg-blue-500', tasks: ['Take PSAT (October) — qualifies you for National Merit', 'Research 10–15 colleges; visit if possible', 'Take SAT/ACT (spring)', 'Ask a teacher for a recommendation letter (June)'] },
                  { period: 'Grade 12 — Fall', color: 'bg-purple-500', tasks: ['Submit Early Decision/Action apps (Nov 1 or Nov 15)', 'Submit FAFSA as soon as October 1', 'Write Common App personal statement over summer', 'Apply to 8–12 schools: 2–3 safety, 4–5 match, 2–3 reach'] },
                  { period: 'Grade 12 — Spring', color: 'bg-orange-500', tasks: ['Compare financial aid offers — don\'t just compare sticker prices', 'Visit accepted schools before committing', 'File for additional scholarships', 'Commit by May 1 (National Decision Day)'] },
                ].map(({ period, color, tasks }) => (
                  <div key={period} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-3 h-3 rounded-full ${color} flex-shrink-0 mt-1`} />
                      <div className="w-0.5 bg-white/10 flex-1 mt-1" />
                    </div>
                    <div className="pb-4">
                      <div className="font-bold text-white text-sm mb-1.5">{period}</div>
                      <ul className="space-y-1">
                        {tasks.map(t => <li key={t} className="text-slate-400 text-sm flex gap-2"><span className="text-slate-500">•</span>{t}</li>)}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-5">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                <h4 className="font-bold text-white mb-3 flex items-center gap-2"><DollarSign size={16} className="text-green-400" /> Understanding Financial Aid</h4>
                <div className="space-y-3 text-sm">
                  {[
                    ['Expected Family Contribution (EFC)', 'What FAFSA calculates your family can pay. Lower EFC = more aid eligibility.'],
                    ['Grants', 'Free money — Pell Grant (federal) + institutional grants. Never needs repayment.'],
                    ['Subsidized Loans', 'Government pays interest while you\'re in school. Better than unsubsidized.'],
                    ['Work-Study', 'Part-time campus jobs funded by financial aid. Good for resume building too.'],
                    ['Net Price Calculator', 'Every college website has one. Use it before applying — it predicts your actual cost.'],
                  ].map(([term, def]) => (
                    <div key={term} className="border-b border-white/5 pb-3 last:border-0 last:pb-0">
                      <div className="font-semibold text-green-400 mb-0.5">{term}</div>
                      <div className="text-slate-400">{def}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                <h4 className="font-bold text-white mb-3">Essential Links</h4>
                <ul className="space-y-2">
                  {[
                    { label: 'Common App (Apply to 900+ colleges)', url: 'https://www.commonapp.org/' },
                    { label: 'FAFSA (Free Federal Aid)', url: 'https://studentaid.gov/h/apply-for-aid/fafsa' },
                    { label: 'College Board BigFuture', url: 'https://bigfuture.collegeboard.org/' },
                    { label: 'Naviance (School-based planning)', url: 'https://www.naviance.com/' },
                    { label: 'Coalition App (Alternative to Common App)', url: 'https://www.coalitionforcollegeaccess.org/' },
                  ].map(r => (
                    <li key={r.label}>
                      <a href={r.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-blue-400 hover:text-blue-300 transition-colors">
                        <ExternalLink size={11} /> {r.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Scholarships */}
        {tab === 'Scholarships' && (
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-5">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                <h3 className="font-bold text-white text-lg mb-4">Where to Find Scholarships</h3>
                <ul className="space-y-3">
                  {[
                    { name: 'Fastweb', desc: 'Largest free scholarship database. Matches you based on profile.', url: 'https://www.fastweb.com/' },
                    { name: 'Scholarships.com', desc: '3.7M+ scholarships. Filter by GPA, major, state, and demographics.', url: 'https://www.scholarships.com/' },
                    { name: 'College Greenlight', desc: 'Find scholarships from colleges themselves — often less competitive.', url: 'https://www.collegegreenlight.com/' },
                    { name: 'Local Community Foundations', desc: 'Google "[your county] community foundation scholarships" — these are least competitive and most overlooked.', url: '#' },
                    { name: 'Your Employer / Parents\' Employer', desc: 'Many corporations offer scholarships for employees\' children. HR department is the contact.', url: '#' },
                  ].map(s => (
                    <li key={s.name} className="flex gap-3">
                      <span className="w-2 h-2 rounded-full bg-yellow-400 flex-shrink-0 mt-1.5" />
                      <div>
                        {s.url !== '#' ? (
                          <a href={s.url} target="_blank" rel="noopener noreferrer" className="font-bold text-yellow-400 hover:underline text-sm flex items-center gap-1">
                            {s.name} <ExternalLink size={11} />
                          </a>
                        ) : (
                          <div className="font-bold text-yellow-400 text-sm">{s.name}</div>
                        )}
                        <div className="text-slate-400 text-sm">{s.desc}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="space-y-5">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                <h4 className="font-bold text-white mb-4">Writing Winning Scholarship Essays</h4>
                <div className="space-y-3 text-sm">
                  {[
                    ['Be Specific', 'Don\'t write "I want to help people." Write "I want to develop diagnostic algorithms that catch late-stage pancreatic cancer earlier."'],
                    ['Answer the Actual Question', 'Judges disqualify essays that reuse generic content. Tailor every essay to the specific prompt.'],
                    ['Lead with a Scene', 'Start with a specific moment, not a definition or a quote. "It was 2 AM when the server went down…" beats "Leadership means…"'],
                    ['Show, Don\'t Tell', '"I am passionate about science" vs. "I ran 200 reactions over three summers trying to prove my hypothesis wrong."'],
                    ['Apply to Many, Apply Early', 'Small scholarships ($500–$2,000) are less competitive and add up fast. Treat applying as a part-time job.'],
                  ].map(([title, desc]) => (
                    <div key={title} className="border-b border-white/5 pb-3 last:border-0 last:pb-0">
                      <div className="font-semibold text-yellow-400 mb-0.5">{title}</div>
                      <div className="text-slate-400">{desc}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-4">
                <p className="text-sm text-yellow-200 font-medium">
                  <strong>Stat:</strong> The average scholarship applicant applies to 7 scholarships. Students who apply to 30+ win an average of $7,400 more per year. Volume matters.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Career Exploration */}
        {tab === 'Career Exploration' && (
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-5">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                <h3 className="font-bold text-white text-lg mb-4 flex items-center gap-2"><Briefcase size={16} className="text-blue-400" /> Explore Without Committing</h3>
                <div className="space-y-3 text-sm">
                  {[
                    ['Shadow a Professional', 'Most adults are happy to let a student shadow them for a day. A cold email with a specific ask has a ~30% response rate.'],
                    ['Virtual Internships', 'Programs like USAJOBS Pathways, Forage (free virtual work experience), and Civic Futures let you explore careers from home.'],
                    ['LinkedIn for Students', 'Connect with alumni from your high school doing careers you\'re interested in. Ask for a 15-minute call.'],
                    ['Online Courses', 'Try coursework in a field before committing. Coursera, edX, and MIT OpenCourseWare offer free college-level content.'],
                    ['Aptitude Assessments', 'O*NET Interest Profiler (free, from the U.S. Dept. of Labor) maps your interests to 800+ career pathways.'],
                  ].map(([title, desc]) => (
                    <div key={title} className="flex gap-3">
                      <span className="w-2 h-2 rounded-full bg-blue-400 flex-shrink-0 mt-1.5" />
                      <div>
                        <div className="font-semibold text-white">{title}</div>
                        <div className="text-slate-400">{desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                <h4 className="font-bold text-white mb-3">High-Impact Extracurriculars</h4>
                <div className="space-y-2 text-sm">
                  {[
                    { activity: 'Research with a Professor', impact: 'Top-tier differentiator. Email 20 professors at local universities with a specific project idea.' },
                    { activity: 'Start a Club or Non-Profit', impact: 'Shows initiative. Even small organizations demonstrate leadership better than membership.' },
                    { activity: 'Compete in Academic Competitions', impact: 'Science Olympiad, DECA, FBLA, MathCounts, Model UN, Mock Trial — pick one and go deep.' },
                    { activity: 'Build Something Public', impact: 'App, website, YouTube channel, published writing. Real output beats another club membership.' },
                    { activity: 'Part-Time Work', impact: 'Shows responsibility and work ethic. Admissions officers respect students who work, especially in challenging fields.' },
                  ].map(e => (
                    <div key={e.activity} className="border-b border-white/5 pb-2 last:border-0 last:pb-0">
                      <div className="font-semibold text-blue-400">{e.activity}</div>
                      <div className="text-slate-400">{e.impact}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                <h4 className="font-bold text-white mb-3">Career Exploration Links</h4>
                <ul className="space-y-2">
                  {[
                    { label: 'O*NET Interest Profiler (Free)', url: 'https://www.mynextmove.org/explore/ip' },
                    { label: 'Forage Virtual Work Experience', url: 'https://www.theforage.com/' },
                    { label: 'LinkedIn Students Hub', url: 'https://www.linkedin.com/students/' },
                    { label: 'Bureau of Labor Statistics OOH', url: 'https://www.bls.gov/ooh/' },
                    { label: 'MIT OpenCourseWare (Free)', url: 'https://ocw.mit.edu/' },
                  ].map(r => (
                    <li key={r.label}>
                      <a href={r.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-blue-400 hover:text-blue-300 transition-colors">
                        <ExternalLink size={11} /> {r.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
