import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-surface-primary/80 backdrop-blur-xl">
    <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
      <Link to="/" className="flex items-center">
        <img src="/logo.png" alt="Analytics Career Connect" className="h-[44px] w-auto" />
      </Link>
      <div className="hidden items-center gap-8 md:flex">
        <Link to="/templates" className="text-sm text-text-secondary transition-colors hover:text-foreground">Templates</Link>
        <Link to="/builder" className="text-sm text-text-secondary transition-colors hover:text-foreground">Builder</Link>
      </div>
      <Link
        to="/builder"
        className="rounded-card px-5 py-2.5 text-sm font-semibold text-accent-foreground gradient-bg transition-all hover:scale-[1.02] hover:shadow-glow"
      >
        Build Free Resume
      </Link>
    </div>
  </nav>
);

export default Navbar;
