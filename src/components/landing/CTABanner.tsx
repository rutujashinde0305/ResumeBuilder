import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const CTABanner = () => (
  <section className="relative overflow-hidden py-24">
    <div className="absolute inset-0 gradient-bg-mixed opacity-90" />
    <div className="absolute inset-0 opacity-10" style={{
      backgroundImage: 'radial-gradient(circle at 20% 80%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)',
      backgroundSize: '60px 60px',
    }} />
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative z-10 mx-auto max-w-2xl px-6 text-center"
    >
      <h2 className="font-heading text-4xl font-bold text-foreground">Your dream job is one resume away</h2>
      <p className="mt-4 text-lg text-foreground/80">Start building for free. No account required.</p>
      <Link
        to="/builder"
        className="mt-8 inline-flex items-center gap-2 rounded-card bg-foreground px-8 py-4 text-base font-semibold text-primary transition-all hover:scale-[1.02] hover:shadow-lg"
      >
        Build My Resume Now <ArrowRight className="h-4 w-4" />
      </Link>
    </motion.div>
  </section>
);

export default CTABanner;
