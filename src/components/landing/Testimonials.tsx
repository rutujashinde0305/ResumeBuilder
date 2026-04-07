import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  { quote: 'Got my Infosys offer after using ResumeAI India. The JD matching feature is insane — it told me exactly what keywords to add.', name: 'Priya Sharma', role: 'Software Engineer, Infosys' },
  { quote: 'Finally a resume builder that understands the Indian market. The Naukri format template was perfect for my job search.', name: 'Rahul Verma', role: 'Data Analyst, TCS' },
  { quote: 'Free PDF download is the real deal. No hidden charges. Spent 20 minutes, downloaded my resume, got 3 interview calls in a week.', name: 'Ananya Singh', role: 'MBA, Deloitte' },
];

const Testimonials = () => (
  <section className="bg-surface-primary py-24">
    <div className="mx-auto max-w-7xl px-6">
      <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16 text-center font-heading text-4xl font-bold text-foreground">
        Join 50,000+ professionals who <span className="gradient-text">got hired</span>
      </motion.h2>
      <div className="grid gap-6 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="rounded-card-lg border border-border bg-surface-tertiary p-6"
          >
            <div className="mb-4 flex gap-1">
              {[...Array(5)].map((_, j) => <Star key={j} className="h-4 w-4 fill-warning text-warning" />)}
            </div>
            <p className="mb-6 text-sm leading-relaxed text-text-secondary">"{t.quote}"</p>
            <div>
              <p className="text-sm font-semibold text-foreground">{t.name}</p>
              <p className="text-xs text-text-muted">{t.role}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;
