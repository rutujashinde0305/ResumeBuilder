import { motion } from 'framer-motion';

const companies = ['TCS', 'Infosys', 'Wipro', 'HCL', 'Accenture', 'Google India', 'Amazon'];

const SocialProof = () => (
  <section className="border-y border-border bg-surface-secondary py-8">
    <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-4 px-6">
      <span className="text-sm text-text-muted">Trusted by professionals from</span>
      {companies.map((c, i) => (
        <motion.span
          key={c}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: i * 0.05 }}
          viewport={{ once: true }}
          className="text-sm font-semibold text-text-secondary"
        >
          {c}
        </motion.span>
      ))}
    </div>
  </section>
);

export default SocialProof;
