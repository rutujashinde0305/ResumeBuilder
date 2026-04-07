import { motion } from 'framer-motion';

const steps = [
  { num: '01', title: 'Choose Template', desc: 'Pick from 28 templates designed for Indian professionals' },
  { num: '02', title: 'Add Your Details + AI', desc: 'Fill in your info and let AI enhance every section' },
  { num: '03', title: 'Download & Apply', desc: 'Download your ATS-optimized PDF and start applying' },
];

const HowItWorks = () => (
  <section className="bg-surface-secondary py-24">
    <div className="mx-auto max-w-7xl px-6">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16 text-center font-heading text-4xl font-bold text-foreground"
      >
        From blank to hired in <span className="gradient-text">10 minutes</span>
      </motion.h2>
      <div className="grid gap-8 md:grid-cols-3">
        {steps.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="relative text-center"
          >
            <span className="font-heading text-6xl font-extrabold gradient-text opacity-30">{s.num}</span>
            <h3 className="mt-2 font-heading text-xl font-bold text-foreground">{s.title}</h3>
            <p className="mt-2 text-sm text-text-secondary">{s.desc}</p>
            {i < 2 && (
              <div className="absolute right-0 top-10 hidden h-px w-full translate-x-1/2 border-t-2 border-dashed border-accent/20 md:block" />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;
