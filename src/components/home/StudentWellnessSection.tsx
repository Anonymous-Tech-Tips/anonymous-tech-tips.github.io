import React from 'react';
import { Heart, Moon, Brain, Zap, ExternalLink } from 'lucide-react';

const pillars = [
  {
    icon: Brain,
    color: 'text-purple-600',
    bg: 'bg-purple-50',
    border: 'border-purple-200',
    title: 'Focus & Attention',
    tips: [
      { title: 'Single-task ruthlessly', desc: 'Multitasking reduces performance by up to 40%. Close all tabs except the one you need. Phone in another room.' },
      { title: 'Pomodoro for ADHD brains', desc: '25 min work / 5 min break. After 4 cycles: 20–30 min long break. Set a real timer — don\'t rely on willpower.' },
      { title: 'Body doubling', desc: 'Study virtually with a friend on video call (camera on, mic off). The social presence dramatically increases focus even without conversation.' },
      { title: 'Background noise', desc: 'Brown noise or lo-fi music at 50–60% volume helps many students focus. Apps: myNoise, Brain.fm, Endel.' },
    ],
  },
  {
    icon: Moon,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    title: 'Sleep & Recovery',
    tips: [
      { title: 'Sleep IS studying', desc: 'Memory consolidation happens during sleep. Pulling an all-nighter before a test hurts more than it helps — you retain 40% less.' },
      { title: 'Consistent wake time', desc: 'Your wake time anchors your circadian rhythm more than your bedtime. Even on weekends, try to wake within 1 hour of your school wake time.' },
      { title: 'Phone out of the bedroom', desc: 'Blue light from screens suppresses melatonin for 3+ hours. At minimum, switch to Night Shift/Night Mode 2 hours before sleep.' },
      { title: 'Power naps (10–20 min)', desc: 'A 20-minute nap improves alertness for 2.5 hours. Set an alarm — sleeping past 30 minutes causes sleep inertia.' },
    ],
  },
  {
    icon: Heart,
    color: 'text-red-600',
    bg: 'bg-red-50',
    border: 'border-red-200',
    title: 'Stress & Anxiety',
    tips: [
      { title: 'Physiological sigh', desc: 'Double inhale through the nose (short sniff then full inhale), then long exhale through mouth. Instantly activates parasympathetic system. Takes 5 seconds.' },
      { title: 'Name the feeling', desc: 'Research shows that labeling an emotion ("I feel anxious right now") reduces its intensity by engaging the prefrontal cortex. Write it out.' },
      { title: 'Distinguish performance anxiety from test anxiety', desc: 'Performance anxiety (nerves before an event) is normal and can improve performance. Test anxiety (inability to retrieve information) often has specific cognitive patterns you can address.' },
      { title: 'Talk to your school counselor', desc: 'They are there for academic AND personal support. Many schools also have free telehealth access — ask your counselor.' },
    ],
  },
  {
    icon: Zap,
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    title: 'Burnout Prevention',
    tips: [
      { title: 'Recognize early signs', desc: 'Cynicism about school, difficulty starting tasks, lack of satisfaction even when you do well — these are burnout symptoms, not laziness.' },
      { title: 'Schedule recovery intentionally', desc: 'Rest is not wasted time. Schedule fun activities and protect them like you would a test. Unscheduled rest never happens.' },
      { title: 'Question your "shoulds"', desc: 'Burnout often comes from internalized pressure ("I should be doing more"). Write down the cost of each extra commitment, not just the benefit.' },
      { title: 'Quit something', desc: 'If you\'re overcommitted, dropping one activity often makes everything else better. Colleges prefer excellence in 3 things over mediocrity in 10.' },
    ],
  },
];

export const StudentWellnessSection: React.FC = () => {
  return (
    <section className="bg-white border-t border-slate-200 py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-sm font-bold border border-rose-200 mb-4">
            <Heart size={14} /> Student Wellness
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Take Care of the Student
          </h2>
          <p className="text-slate-600 mt-3 text-lg max-w-2xl mx-auto">
            Evidence-based strategies for focus, sleep, stress, and preventing burnout — because grades mean nothing if you're not okay.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {pillars.map(({ icon: Icon, color, bg, border, title, tips }) => (
            <div key={title} className={`${bg} ${border} border rounded-2xl p-6`}>
              <h3 className="font-black text-slate-900 text-lg mb-4 flex items-center gap-2">
                <Icon size={20} className={color} /> {title}
              </h3>
              <div className="space-y-4">
                {tips.map(({ title: t, desc }) => (
                  <div key={t}>
                    <div className="font-bold text-slate-900 text-sm">{t}</div>
                    <div className="text-slate-600 text-sm mt-0.5">{desc}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Crisis resources */}
        <div className="bg-slate-900 text-white rounded-2xl p-6">
          <h4 className="font-black text-white text-base mb-4">If You Need Help Now</h4>
          <div className="grid sm:grid-cols-3 gap-4 text-sm">
            {[
              { name: '988 Suicide & Crisis Lifeline', detail: 'Call or text 988 (US). Free, confidential, 24/7.', url: 'https://988lifeline.org/' },
              { name: 'Crisis Text Line', detail: 'Text HOME to 741741. Free text-based crisis counseling.', url: 'https://www.crisistextline.org/' },
              { name: 'Teen Line', detail: 'Call 1-800-852-8336 or text TEEN to 839863. Teens helping teens.', url: 'https://teenlineonline.org/' },
            ].map(r => (
              <a key={r.name} href={r.url} target="_blank" rel="noopener noreferrer" className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors group">
                <div className="font-bold text-white group-hover:text-blue-400 transition-colors flex items-center gap-1">{r.name} <ExternalLink size={11} /></div>
                <div className="text-slate-400 mt-1">{r.detail}</div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
