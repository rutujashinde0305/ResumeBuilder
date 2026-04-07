import { useState } from 'react';
import { useResume } from '@/context/ResumeContext';
import { User, Briefcase, GraduationCap, Code, FolderOpen, Award } from 'lucide-react';
import PersonalSection from './sections/PersonalSection';
import SummarySection from './sections/SummarySection';
import ExperienceSection from './sections/ExperienceSection';
import EducationSection from './sections/EducationSection';
import SkillsSection from './sections/SkillsSection';
import ProjectsSection from './sections/ProjectsSection';
import CertificationsSection from './sections/CertificationsSection';

const tabs = [
  { id: 'personal', label: 'Personal', icon: User },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'skills', label: 'Skills', icon: Code },
  { id: 'projects', label: 'Projects', icon: FolderOpen },
  { id: 'certs', label: 'Certs', icon: Award },
];

const FormPanel = () => {
  const [activeTab, setActiveTab] = useState('personal');

  return (
    <div className="flex flex-col">
      {/* Tabs */}
      <div className="sticky top-0 z-10 flex gap-1 overflow-x-auto border-b border-border bg-surface-secondary p-2">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`flex shrink-0 items-center gap-1.5 rounded-md px-3 py-2 text-xs font-medium transition-all ${
              activeTab === t.id
                ? 'bg-accent text-accent-foreground'
                : 'text-text-muted hover:bg-surface-hover hover:text-text-secondary'
            }`}
          >
            <t.icon className="h-3.5 w-3.5" />
            {t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-4">
        {activeTab === 'personal' && (
          <>
            <PersonalSection />
            <SummarySection />
          </>
        )}
        {activeTab === 'experience' && <ExperienceSection />}
        {activeTab === 'education' && <EducationSection />}
        {activeTab === 'skills' && <SkillsSection />}
        {activeTab === 'projects' && <ProjectsSection />}
        {activeTab === 'certs' && <CertificationsSection />}
      </div>
    </div>
  );
};

export default FormPanel;
