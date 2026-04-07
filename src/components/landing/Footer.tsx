import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="border-t border-border bg-surface-primary py-16">
    <div className="mx-auto max-w-7xl px-6">
      <div className="grid gap-12 md:grid-cols-4">
        <div className="space-y-4">
          <Link to="/" className="flex items-center">
            <img src="/logo.png" alt="Analytics Career Connect" className="h-[36px] w-auto" />
          </Link>
          <p className="text-sm text-text-muted">AI-powered resume builder for Indian professionals. Free forever.</p>
        </div>
        {[
          { title: 'Features', links: ['AI Resume Builder', 'ATS Score Checker', 'JD Matcher', 'PDF Download'] },
          { title: 'Templates', links: ['IT Fresher', 'MBA', 'Naukri Style', 'Creative'] },
          { title: 'Resources', links: ['Resume Tips', 'Cover Letters', 'Interview Prep', 'Blog'] },
        ].map(col => (
          <div key={col.title}>
            <h4 className="mb-4 text-sm font-semibold text-foreground">{col.title}</h4>
            <ul className="space-y-2">
              {col.links.map(l => <li key={l}><span className="cursor-pointer text-sm text-text-muted transition-colors hover:text-foreground">{l}</span></li>)}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-12 border-t border-border pt-8 text-center text-sm text-text-muted">
        © 2025 Analytics Career Connect | Made with ❤️ in India
      </div>
    </div>
  </footer>
);

export default Footer;
