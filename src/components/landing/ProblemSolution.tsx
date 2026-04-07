import { motion } from 'framer-motion';
import { X, Check } from 'lucide-react';

const problems = [
  'Pay ₹2000+ to download your own resume',
  'Generic AI content that screams "ChatGPT wrote this"',
  'Templates built for US market, not Indian job market',
  'No ATS optimization — rejected before human reads it',
  'Rigid templates — can\'t change font or section order',
  'Hidden charges after you\'ve spent hours building',
];

const solutions = [
  '100% Free PDF download — always, forever, no tricks',
  'AI that learns YOUR story — sounds human, not robotic',
  '28 templates built for Indian job market',
  'Real-time ATS score — know before you apply',
  'Complete freedom — fonts, colors, sections, order',
  'No account needed — just build and download',
];

const ProblemSolution = () => (
  <section className="bg-surface-primary py-24">
    <div className="mx-auto max-w-7xl px-6">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16 text-center font-heading text-4xl font-bold text-foreground"
      >
        Other resume builders rob you. <span className="gradient-text">We don't.</span>
      </motion.h2>
      <div className="grid gap-8 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="rounded-card-lg border border-destructive/20 bg-destructive/5 p-8"
        >
          <h3 className="mb-6 font-heading text-xl font-bold text-destructive">The Problem</h3>
          <ul className="space-y-4">
            {problems.map((p, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-text-secondary">
                <X className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
                {p}
              </li>
            ))}
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="rounded-card-lg border border-accent/20 bg-accent/5 p-8"
        >
          <h3 className="mb-6 font-heading text-xl font-bold text-accent">Analytics Career Connect</h3>
          <ul className="space-y-4">
            {solutions.map((s, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-text-secondary">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                {s}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  </section>
);

export default ProblemSolution;
