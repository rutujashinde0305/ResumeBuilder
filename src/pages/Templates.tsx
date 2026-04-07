import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import { templates, TemplateCategory } from '@/types/resume';

const categories: { label: string; value: TemplateCategory }[] = [
  { label: 'All', value: 'all' },
  { label: 'IT Fresher', value: 'it-fresher' },
  { label: 'MBA', value: 'mba' },
  { label: 'Experienced', value: 'experienced' },
  { label: 'Creative', value: 'creative' },
  { label: 'Naukri Style', value: 'naukri' },
  { label: 'International', value: 'international' },
];

const Templates = () => {
  const [filter, setFilter] = useState<TemplateCategory>('all');
  const filtered = filter === 'all' ? templates : templates.filter(t => t.category === filter);

  return (
    <div className="min-h-screen bg-surface-primary">
      <Navbar />
      <div className="mx-auto max-w-7xl px-6 pb-24 pt-32">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12 text-center">
          <h1 className="font-heading text-5xl font-bold text-foreground">Professional <span className="gradient-text">Templates</span></h1>
          <p className="mt-4 text-text-secondary">Designed for every Indian professional — fresher to executive</p>
        </motion.div>

        {/* Filter pills */}
        <div className="mb-12 flex flex-wrap justify-center gap-2">
          {categories.map(c => (
            <button
              key={c.value}
              onClick={() => setFilter(c.value)}
              className={`rounded-pill px-4 py-2 text-sm font-medium transition-all ${
                filter === c.value
                  ? 'gradient-bg text-accent-foreground shadow-glow'
                  : 'border border-border text-text-secondary hover:bg-surface-hover'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="group relative overflow-hidden rounded-card-lg border border-border bg-surface-tertiary transition-all hover:-translate-y-1 hover:border-accent/30"
            >
              <div className="aspect-[3/4] bg-surface-hover p-6">
                <div className="h-full rounded-sm bg-foreground/90 p-4">
                  <div className="space-y-2">
                    <div className="h-3 w-2/3 rounded-sm bg-primary" />
                    <div className="h-1.5 w-1/3 rounded-sm bg-accent/40" />
                    <div className="mt-3 h-px bg-muted" />
                    <div className="space-y-1.5">
                      <div className="h-1.5 w-full rounded-sm bg-muted" />
                      <div className="h-1.5 w-4/5 rounded-sm bg-muted" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center gap-3 bg-surface-primary/80 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
                <Link to={`/builder?template=${t.id}`} className="rounded-card px-6 py-3 text-sm font-semibold text-accent-foreground gradient-bg">
                  Use Template →
                </Link>
              </div>
              <div className="flex items-center justify-between p-4">
                <div>
                  <h3 className="font-heading text-sm font-bold text-foreground">{t.name}</h3>
                  <p className="text-xs text-text-muted">ATS Score: {t.atsScore}</p>
                </div>
                <span className="rounded-pill bg-success/15 px-2 py-0.5 text-xs font-medium text-success">Free</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Templates;
