import { motion } from 'framer-motion';
import { Zap, Target, FileText, BarChart, Layout, Shield } from 'lucide-react';

const features = [
  { icon: Zap, color: 'bg-accent/20 text-accent', title: 'AI-Powered Content', desc: 'Generate human-sounding summaries and bullet points. Results so good, recruiters can\'t tell it\'s AI.' },
  { icon: Target, color: 'bg-accent-secondary/20 text-accent-secondary', title: 'Job Description Matching', desc: 'Paste any JD and get instant match analysis. See missing keywords, get suggestions, increase your ATS score.' },
  { icon: FileText, color: 'bg-success/20 text-success', title: '100% Free PDF', desc: 'Download your resume as a beautiful PDF instantly. No login. No payment. No watermark. Free forever.' },
  { icon: BarChart, color: 'bg-blue-500/20 text-blue-400', title: 'Live ATS Score', desc: 'Real-time score as you type. Know what\'s missing and fix it before applying.' },
  { icon: Layout, color: 'bg-warning/20 text-warning', title: '28 Indian Templates', desc: 'Naukri format, IT fresher, MBA, government jobs, creative — designed specifically for the Indian job market.' },
  { icon: Shield, color: 'bg-teal-500/20 text-teal-400', title: 'No Account Needed', desc: 'Just open the builder and start. Your data stays in your browser. We never see your personal information.' },
];

const Features = () => (
  <section className="bg-surface-secondary py-24">
    <div className="mx-auto max-w-7xl px-6">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16 text-center">
        <h2 className="font-heading text-4xl font-bold text-foreground">Everything you need to land your <span className="gradient-text">dream job</span></h2>
        <p className="mt-4 text-text-secondary">Built for Indian professionals, from freshers to executives</p>
      </motion.div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {features.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="group rounded-card-lg border border-border bg-surface-tertiary p-6 transition-all hover:-translate-y-1 hover:shadow-glow"
          >
            <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-card ${f.color}`}>
              <f.icon className="h-5 w-5" />
            </div>
            <h3 className="mb-2 font-heading text-lg font-bold text-foreground">{f.title}</h3>
            <p className="text-sm leading-relaxed text-text-secondary">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Features;
