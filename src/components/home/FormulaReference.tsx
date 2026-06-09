import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

const sections = [
  {
    label: 'Algebra',
    color: 'bg-blue-600',
    formulas: [
      { name: 'Quadratic Formula', formula: 'x = (−b ± √(b²−4ac)) / 2a', note: 'For ax² + bx + c = 0' },
      { name: 'Slope', formula: 'm = (y₂−y₁) / (x₂−x₁)', note: 'Rise over run between two points' },
      { name: 'Slope-Intercept', formula: 'y = mx + b', note: 'm = slope, b = y-intercept' },
      { name: 'Point-Slope', formula: 'y−y₁ = m(x−x₁)', note: 'Line through point (x₁, y₁)' },
      { name: 'Distance Formula', formula: 'd = √((x₂−x₁)² + (y₂−y₁)²)', note: 'Distance between two points' },
      { name: 'Midpoint', formula: 'M = ((x₁+x₂)/2, (y₁+y₂)/2)', note: 'Midpoint between two points' },
      { name: 'Exponent Rules', formula: 'aᵐ·aⁿ = aᵐ⁺ⁿ · aᵐ/aⁿ = aᵐ⁻ⁿ · (aᵐ)ⁿ = aᵐⁿ', note: 'a⁰ = 1 · a⁻ⁿ = 1/aⁿ' },
    ],
  },
  {
    label: 'Geometry',
    color: 'bg-emerald-600',
    formulas: [
      { name: 'Circle Area', formula: 'A = πr²', note: 'r = radius' },
      { name: 'Circle Circumference', formula: 'C = 2πr = πd', note: 'd = diameter' },
      { name: 'Triangle Area', formula: 'A = ½bh', note: 'b = base, h = perpendicular height' },
      { name: 'Pythagorean Theorem', formula: 'a² + b² = c²', note: 'c = hypotenuse (right triangles)' },
      { name: 'Rectangle Area', formula: 'A = lw · P = 2(l+w)', note: 'l = length, w = width' },
      { name: 'Sphere Volume', formula: 'V = (4/3)πr³', note: '' },
      { name: 'Cylinder Volume', formula: 'V = πr²h', note: 'h = height' },
      { name: 'SOHCAHTOA', formula: 'sin θ = O/H · cos θ = A/H · tan θ = O/A', note: 'Opposite, Adjacent, Hypotenuse' },
    ],
  },
  {
    label: 'Physics',
    color: 'bg-purple-600',
    formulas: [
      { name: "Newton's 2nd Law", formula: 'F = ma', note: 'F = force (N), m = mass (kg), a = acceleration (m/s²)' },
      { name: 'Kinematic — Velocity', formula: 'v = v₀ + at', note: 'v₀ = initial velocity, t = time' },
      { name: 'Kinematic — Position', formula: 'x = x₀ + v₀t + ½at²', note: '' },
      { name: 'Kinematic — No Time', formula: 'v² = v₀² + 2aΔx', note: '' },
      { name: 'Momentum', formula: 'p = mv', note: 'Conservation: p₁ = p₂ (closed system)' },
      { name: "Ohm's Law", formula: 'V = IR', note: 'V = volts, I = current (A), R = resistance (Ω)' },
      { name: 'Work & Energy', formula: 'W = Fd cos θ · KE = ½mv² · PE = mgh', note: '' },
      { name: 'Wave Speed', formula: 'v = fλ', note: 'f = frequency (Hz), λ = wavelength (m)' },
    ],
  },
  {
    label: 'Chemistry',
    color: 'bg-amber-600',
    formulas: [
      { name: 'Ideal Gas Law', formula: 'PV = nRT', note: 'R = 8.314 J/mol·K or 0.0821 L·atm/mol·K' },
      { name: 'Molarity', formula: 'M = mol solute / L solution', note: 'M = moles per liter' },
      { name: 'Percent Yield', formula: '% yield = (actual / theoretical) × 100', note: '' },
      { name: 'Percent Composition', formula: '% = (mass of element / molar mass) × 100', note: '' },
      { name: 'pH and pOH', formula: 'pH = −log[H⁺] · pOH = −log[OH⁻] · pH + pOH = 14', note: '' },
      { name: 'Dilution', formula: 'M₁V₁ = M₂V₂', note: 'For diluting a solution' },
      { name: 'Avogadro', formula: '1 mol = 6.022 × 10²³ particles', note: "Avogadro's number" },
    ],
  },
  {
    label: 'Calculus',
    color: 'bg-rose-600',
    formulas: [
      { name: 'Power Rule (Derivative)', formula: "d/dx [xⁿ] = nxⁿ⁻¹", note: '' },
      { name: 'Product Rule', formula: "(fg)' = f'g + fg'", note: '' },
      { name: 'Quotient Rule', formula: "(f/g)' = (f'g − fg') / g²", note: '' },
      { name: 'Chain Rule', formula: "(f(g(x)))' = f'(g(x)) · g'(x)", note: '' },
      { name: 'Power Rule (Integral)', formula: '∫xⁿ dx = xⁿ⁺¹/(n+1) + C', note: 'n ≠ −1' },
      { name: 'FTC', formula: '∫ₐᵇ f(x)dx = F(b) − F(a)', note: "Fundamental Theorem of Calculus" },
      { name: 'Common Derivatives', formula: "d/dx[sin x] = cos x · d/dx[cos x] = −sin x · d/dx[eˣ] = eˣ · d/dx[ln x] = 1/x", note: '' },
    ],
  },
];

export const FormulaReference: React.FC = () => {
  const [active, setActive] = useState('Algebra');
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const section = sections.find(s => s.label === active)!;

  const copyFormula = (formula: string, idx: number) => {
    navigator.clipboard.writeText(formula).catch(() => {});
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 1500);
  };

  return (
    <section id="formulas" className="bg-slate-50 border-t border-slate-200 py-16 px-6" style={{ scrollMarginTop: '72px' }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200 text-slate-700 text-sm font-bold border border-slate-300 mb-4">
            📐 Formula Reference
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Quick Formula Sheet
          </h2>
          <p className="text-slate-600 mt-3 text-base max-w-2xl mx-auto">
            Common formulas for Algebra, Geometry, Physics, Chemistry, and Calculus. Click any formula to copy.
          </p>
        </div>

        {/* Subject tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-1 justify-center flex-wrap">
          {sections.map(s => (
            <button
              key={s.label}
              onClick={() => setActive(s.label)}
              className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-colors ${
                active === s.label ? `${s.color} text-white` : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Formula grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {section.formulas.map((f, i) => (
            <button
              key={i}
              onClick={() => copyFormula(f.formula, i)}
              className="bg-white border border-slate-200 rounded-xl p-4 text-left hover:border-slate-400 hover:shadow-md transition-all group relative"
            >
              <div className="text-xs font-black uppercase tracking-wide text-slate-500 mb-1.5">{f.name}</div>
              <div className="font-mono text-slate-900 text-sm leading-relaxed font-bold">{f.formula}</div>
              {f.note && <div className="text-xs text-slate-500 mt-1.5">{f.note}</div>}
              <div className="absolute top-3 right-3 text-slate-300 group-hover:text-slate-500 transition-colors">
                {copiedIdx === i ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
              </div>
            </button>
          ))}
        </div>
        <p className="text-center text-xs text-slate-400 mt-4">Click any formula card to copy it to clipboard</p>
      </div>
    </section>
  );
};
