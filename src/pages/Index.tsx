import Navbar from '@/components/landing/Navbar';
import Hero from '@/components/landing/Hero';
import SocialProof from '@/components/landing/SocialProof';
import ProblemSolution from '@/components/landing/ProblemSolution';
import Features from '@/components/landing/Features';
import TemplateShowcase from '@/components/landing/TemplateShowcase';
import HowItWorks from '@/components/landing/HowItWorks';

import CTABanner from '@/components/landing/CTABanner';
import Footer from '@/components/landing/Footer';

const Index = () => (
  <div className="min-h-screen bg-surface-primary">
    <Navbar />
    <Hero />
    <SocialProof />
    <ProblemSolution />
    <Features />
    <TemplateShowcase />
    <HowItWorks />
    
    <CTABanner />
    <Footer />
  </div>
);

export default Index;
