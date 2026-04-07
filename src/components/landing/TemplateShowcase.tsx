import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { templates } from '@/types/resume';

const TemplateShowcase = () => (
  <section className="bg-surface-primary py-24">
    <div className="mx-auto max-w-7xl px-6">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16 text-center">
        <h2 className="font-heading text-4xl font-bold text-foreground">Choose your <span className="gradient-text">perfect template</span></h2>
      </motion.div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {templates.map((t, i) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="group relative overflow-hidden rounded-card-lg border border-border bg-surface-tertiary transition-all hover:-translate-y-1 hover:border-accent/30"
          >
            {/* Template preview skeleton */}
            <div className="aspect-[3/4] bg-surface-hover p-6">
              <div className="h-full rounded-sm bg-foreground/90 p-4">
                <div className="space-y-2">
                  <div className="h-3 w-2/3 rounded-sm bg-primary" />
                  <div className="h-1.5 w-1/3 rounded-sm bg-accent/40" />
                  <div className="mt-3 h-px bg-muted" />
                  <div className="space-y-1.5">
                    <div className="h-1.5 w-full rounded-sm bg-muted" />
                    <div className="h-1.5 w-4/5 rounded-sm bg-muted" />
                    <div className="h-1.5 w-3/5 rounded-sm bg-muted" />
                  </div>
                </div>
              </div>
            </div>
            {/* Hover overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-surface-primary/80 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
              <Link
                to={`/builder?template=${t.id}`}
                className="rounded-card px-6 py-3 text-sm font-semibold text-accent-foreground gradient-bg transition-all hover:scale-105"
              >
                Use Template →
              </Link>
            </div>
            {/* Info */}
            <div className="flex items-center justify-between p-4">
              <div>
                <h3 className="font-heading text-sm font-bold text-foreground">{t.name}</h3>
                <p className="text-xs text-text-muted">{t.category}</p>
              </div>
              <div className="flex gap-1.5">
                {t.tags.map(tag => (
                  <span key={tag} className="rounded-pill bg-success/15 px-2 py-0.5 text-xs font-medium text-success">{tag}</span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="mt-12 text-center">
        <Link to="/templates" className="text-sm font-semibold text-accent transition-colors hover:text-accent/80">
          View all 28 templates →
        </Link>
      </div>
    </div>
  </section>
);

export default TemplateShowcase;
