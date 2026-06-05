import React, { useState } from 'react';
import { PenLine, Quote, Search, FileText, ExternalLink } from 'lucide-react';

const tabs = ['Essay Writing', 'Citations', 'Research Skills', 'Free Tools'] as const;
type Tab = typeof tabs[number];

export const WritingResearchSection: React.FC = () => {
  const [tab, setTab] = useState<Tab>('Essay Writing');

  return (
    <section className="bg-white border-t border-slate-200 py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-sm font-bold border border-indigo-200 mb-4">
            <PenLine size={14} /> Writing & Research
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Write Better. Research Smarter.
          </h2>
          <p className="text-slate-600 mt-3 text-lg max-w-2xl mx-auto">
            Concrete frameworks for academic writing, citing sources correctly, and finding credible research.
          </p>
        </div>

        {/* Tab bar */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-1">
          {tabs.map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-colors ${
                tab === t
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Essay Writing */}
        {tab === 'Essay Writing' && (
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-6">
                <h3 className="font-black text-slate-900 text-lg mb-4 flex items-center gap-2"><FileText size={18} className="text-indigo-600" /> The 5-Step Essay Framework</h3>
                <ol className="space-y-3">
                  {[
                    ['Brainstorm & Outline (10%)', 'Map your argument before writing. A strong outline makes writing 3x faster. Use bullet points, not full sentences.'],
                    ['Write the Thesis First (5%)', 'A good thesis makes a specific, arguable claim. Not "World War I had many causes" but "The alliance system, not nationalism, was the primary cause of WWI."'],
                    ['Draft Body Paragraphs (60%)', 'Each paragraph = one claim + evidence + analysis. The evidence should take up 30% of the paragraph; your analysis should take 70%.'],
                    ['Draft Introduction & Conclusion Last (15%)', 'Write the intro AFTER the body so you know what you\'re introducing. Conclusion = restate + synthesize + broader significance.'],
                    ['Revise for Clarity (10%)', 'Read aloud. Every sentence you stumble on is a sentence that needs rewriting. Cut any sentence that doesn\'t advance your argument.'],
                  ].map(([title, desc], i) => (
                    <li key={i} className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-black flex items-center justify-center">{i + 1}</span>
                      <div>
                        <div className="font-bold text-slate-900 text-sm">{title}</div>
                        <div className="text-slate-600 text-sm mt-0.5">{desc}</div>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
                <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2"><Quote size={16} className="text-amber-600" /> Thesis Formula</h4>
                <div className="bg-white border border-amber-200 rounded-xl p-4 text-sm font-mono text-slate-700 leading-relaxed">
                  [Although / While / Despite] [counterargument], [your topic] [did/is/was] [claim] because [reason 1], [reason 2], and [reason 3].
                </div>
                <p className="text-xs text-amber-800 mt-3 font-medium">Always acknowledge the other side — it makes your argument stronger, not weaker.</p>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
                <h4 className="font-bold text-slate-900 mb-3">Evidence Sandwich</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex gap-2"><span className="font-bold text-indigo-600 w-24 flex-shrink-0">Claim:</span><span className="text-slate-700">State your point clearly.</span></div>
                  <div className="flex gap-2"><span className="font-bold text-indigo-600 w-24 flex-shrink-0">Evidence:</span><span className="text-slate-700">Quote, statistic, or paraphrase. Introduce it: "According to…" / "X argues…"</span></div>
                  <div className="flex gap-2"><span className="font-bold text-indigo-600 w-24 flex-shrink-0">Analysis:</span><span className="text-slate-700">Explain how/why this proves your claim. Never let evidence speak for itself.</span></div>
                  <div className="flex gap-2"><span className="font-bold text-indigo-600 w-24 flex-shrink-0">Link:</span><span className="text-slate-700">Connect back to your thesis or transition to next point.</span></div>
                </div>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-2xl p-5">
                <h4 className="font-bold text-slate-900 mb-2">Common Mistakes That Tank Grades</h4>
                <ul className="space-y-1.5 text-sm text-slate-700">
                  {['Starting a sentence with "I think" or "I believe" (weakens your argument)', 'Ending with "In conclusion, I have shown that…" (circular)', 'Using "very," "really," "things," and "aspects" (vague)', 'Block-quoting more than 2 lines without analysis', 'Changing tense mid-paragraph'].map(m => (
                    <li key={m} className="flex gap-2"><span className="text-red-500 flex-shrink-0">✗</span>{m}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Citations */}
        {tab === 'Citations' && (
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-5">
              <h3 className="font-black text-slate-900 text-lg">MLA 9 Quick Reference</h3>
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4">
                {[
                  { type: 'Book', format: 'Last, First. Title of Book. Publisher, Year.' },
                  { type: 'Website', format: 'Last, First. "Page Title." Site Name, Date, URL.' },
                  { type: 'Journal Article', format: 'Last, First. "Article Title." Journal, vol. #, no. #, Year, pp. ##–##.' },
                  { type: 'In-Text (Quote)', format: '(Author Last Name page#) → (Smith 42)' },
                  { type: 'In-Text (Paraphrase)', format: '(Author Last Name page#) — same format, no quotation marks' },
                ].map(c => (
                  <div key={c.type} className="border-b border-slate-200 pb-3 last:border-0 last:pb-0">
                    <div className="text-xs font-black uppercase tracking-wide text-indigo-700 mb-1">{c.type}</div>
                    <div className="text-sm font-mono text-slate-700 bg-white border border-slate-200 rounded-lg px-3 py-2">{c.format}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-5">
              <h3 className="font-black text-slate-900 text-lg">APA 7 Quick Reference</h3>
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4">
                {[
                  { type: 'Book', format: 'Last, F. M. (Year). Title of work. Publisher.' },
                  { type: 'Website', format: 'Last, F. M. (Year, Month Day). Page title. Site Name. URL' },
                  { type: 'Journal Article', format: 'Last, F. M. (Year). Article title. Journal, Volume(Issue), pp–pp. DOI' },
                  { type: 'In-Text (Quote)', format: '(Author, Year, p. #) → (Smith, 2023, p. 42)' },
                  { type: 'In-Text (Paraphrase)', format: '(Author, Year) → (Smith, 2023)' },
                ].map(c => (
                  <div key={c.type} className="border-b border-slate-200 pb-3 last:border-0 last:pb-0">
                    <div className="text-xs font-black uppercase tracking-wide text-purple-700 mb-1">{c.type}</div>
                    <div className="text-sm font-mono text-slate-700 bg-white border border-slate-200 rounded-lg px-3 py-2">{c.format}</div>
                  </div>
                ))}
              </div>
              <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-4">
                <p className="text-sm font-medium text-indigo-900">
                  <strong>Quick rule:</strong> Use MLA for humanities (English, History, Arts). Use APA for social sciences (Psychology, Sociology, Education). Ask your teacher when unsure.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Research Skills */}
        {tab === 'Research Skills' && (
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-5">
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6">
                <h3 className="font-black text-slate-900 text-lg mb-4 flex items-center gap-2"><Search size={18} className="text-emerald-600" /> Finding Credible Sources</h3>
                <div className="space-y-4">
                  {[
                    { label: 'CRAAP Test', desc: 'Currency (When?), Relevance (For whom?), Authority (Who wrote it?), Accuracy (Cited? Peer-reviewed?), Purpose (Why was it written?). Run every source through this.' },
                    { label: 'Use Google Scholar', desc: 'scholar.google.com filters for academic papers. Add "filetype:pdf" to find free full texts.' },
                    { label: 'Check .edu and .gov', desc: 'Government (.gov) and university (.edu) sites are generally reliable for data and statistics.' },
                    { label: 'Beware Wikipedia', desc: 'Great starting point for overview and finding primary sources via footnotes — NEVER cite it directly.' },
                    { label: 'Database > Google', desc: 'For serious research: JSTOR, PubMed, ProQuest. Most are free through your school library.' },
                  ].map(({ label, desc }) => (
                    <div key={label} className="flex gap-3">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0 mt-1.5" />
                      <div>
                        <div className="font-bold text-slate-900 text-sm">{label}</div>
                        <div className="text-slate-600 text-sm">{desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
                <h4 className="font-bold text-slate-900 mb-3">Google Search Operators</h4>
                <div className="space-y-2 text-sm font-mono">
                  {[
                    ['"exact phrase"', 'Find this exact phrase'],
                    ['site:edu climate change', 'Search only .edu sites'],
                    ['filetype:pdf biology notes', 'Find PDF files only'],
                    ['after:2020 AI research', 'Results after a date'],
                    ['photosynthesis -simple', 'Exclude a word'],
                  ].map(([op, desc]) => (
                    <div key={op} className="flex gap-3 items-start">
                      <code className="bg-white border border-slate-200 px-2 py-0.5 rounded text-indigo-700 flex-shrink-0 text-xs">{op}</code>
                      <span className="text-slate-600 text-xs">{desc}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5">
                <h4 className="font-bold text-slate-900 mb-3">Taking Research Notes</h4>
                <ul className="space-y-2 text-sm text-slate-700">
                  {['Write the citation BEFORE taking notes — you\'ll thank yourself later', 'Paraphrase in your own words immediately; don\'t copy-paste (it leads to accidental plagiarism)', 'Note page numbers for every quote', 'Mark each note: D = direct quote, P = paraphrase, I = your idea', 'Cornell Notes work best for research: key terms left, notes right, summary at bottom'].map(t => (
                    <li key={t} className="flex gap-2"><span className="text-blue-500">→</span>{t}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Free Tools */}
        {tab === 'Free Tools' && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: 'Purdue OWL', desc: 'The definitive guide to MLA, APA, Chicago citation formats. Every style question answered.', url: 'https://owl.purdue.edu/owl/research_and_citation/resources.html', badge: 'Citations', color: 'bg-indigo-100 text-indigo-800' },
              { name: 'Google Scholar', desc: 'Search academic papers, journals, and court opinions. Use the "Cite" button for instant references.', url: 'https://scholar.google.com/', badge: 'Research', color: 'bg-blue-100 text-blue-800' },
              { name: 'JSTOR Daily', desc: 'Free access to thousands of academic articles. Sign up for 100 free articles/month.', url: 'https://www.jstor.org/', badge: 'Research', color: 'bg-blue-100 text-blue-800' },
              { name: 'Hemingway Editor', desc: 'Paste your essay to see readability score and highlights overly complex sentences in real time.', url: 'https://hemingwayapp.com/', badge: 'Writing', color: 'bg-amber-100 text-amber-800' },
              { name: 'Grammarly (Free)', desc: 'Grammar and spelling checker. The free version catches most errors — more than Word\'s spell check.', url: 'https://www.grammarly.com/', badge: 'Writing', color: 'bg-amber-100 text-amber-800' },
              { name: 'Zotero', desc: 'Free citation manager. Save sources from any website and auto-generate bibliographies in any format.', url: 'https://www.zotero.org/', badge: 'Citations', color: 'bg-indigo-100 text-indigo-800' },
              { name: 'ProQuest (via library)', desc: 'Ask your school librarian for free access. Millions of full-text articles, newspapers, and dissertations.', url: 'https://www.proquest.com/', badge: 'Research', color: 'bg-blue-100 text-blue-800' },
              { name: 'Readable', desc: 'Scores your writing for readability. Academic writing should aim for grade 10–12 level.', url: 'https://readable.com/', badge: 'Writing', color: 'bg-amber-100 text-amber-800' },
              { name: 'Connected Papers', desc: 'Visual graph of how research papers relate. Great for finding related sources you didn\'t know existed.', url: 'https://www.connectedpapers.com/', badge: 'Research', color: 'bg-blue-100 text-blue-800' },
            ].map(tool => (
              <a key={tool.name} href={tool.url} target="_blank" rel="noopener noreferrer" className="bg-slate-50 border border-slate-200 rounded-2xl p-5 hover:border-indigo-300 hover:shadow-md transition-all group">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-bold text-slate-900 group-hover:text-indigo-700 transition-colors">{tool.name}</h4>
                  <ExternalLink size={14} className="text-slate-400 flex-shrink-0 mt-0.5" />
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${tool.color}`}>{tool.badge}</span>
                <p className="text-sm text-slate-600 mt-2">{tool.desc}</p>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
