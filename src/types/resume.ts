export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  targetRole: string;
  industry: string;
  yearsOfExperience: string;
  linkedIn: string;
  github: string;
  professionalTitle: string;
}

export interface Experience {
  id: string;
  company: string;
  jobTitle: string;
  startDate: string;
  endDate: string;
  currentlyWorking: boolean;
  location: string;
  bullets: string[];
}

export interface Education {
  id: string;
  degree: string;
  fieldOfStudy: string;
  institution: string;
  university: string;
  startYear: string;
  endYear: string;
  cgpa: string;
  gradeType: string;
  coursework: string;
}

export interface Project {
  id: string;
  name: string;
  techStack: string[];
  description: string;
  liveLink: string;
  githubLink: string;
}

export interface Certification {
  id: string;
  name: string;
  organization: string;
  issueDate: string;
  credentialId: string;
  url: string;
}

export interface Skills {
  technical: string[];
  soft: string[];
  tools: string[];
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: Skills;
  projects: Project[];
  certifications: Certification[];
  templateId: string;
}

export type TemplateCategory = 'all' | 'it-fresher' | 'mba' | 'experienced' | 'creative' | 'naukri' | 'government' | 'international';

export interface TemplateInfo {
  id: string;
  name: string;
  category: TemplateCategory;
  description: string;
  atsScore: number;
  tags: string[];
}

export const defaultResumeData: ResumeData = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    targetRole: '',
    industry: '',
    yearsOfExperience: '',
    linkedIn: '',
    github: '',
    professionalTitle: '',
  },
  summary: '',
  experience: [],
  education: [],
  skills: { technical: [], soft: [], tools: [] },
  projects: [],
  certifications: [],
  templateId: 'modern-it-fresher',
};

export const templates: TemplateInfo[] = [
  { id: 'modern-it-fresher', name: 'Modern IT Fresher', category: 'it-fresher', description: 'Clean single-column design perfect for IT freshers', atsScore: 92, tags: ['ATS Safe', 'Free'] },
  { id: 'executive-mba', name: 'Executive MBA', category: 'mba', description: 'Two-column layout with gold accents for MBA professionals', atsScore: 88, tags: ['Premium Look', 'Free'] },
  { id: 'naukri-classic', name: 'Naukri Classic', category: 'naukri', description: 'Pure black and white — maximum ATS compatibility', atsScore: 100, tags: ['ATS Max', 'Free'] },
  { id: 'creative-pro', name: 'Creative Pro', category: 'creative', description: 'Bold purple sidebar with coral accents', atsScore: 78, tags: ['Creative', 'Free'] },
  { id: 'senior-developer', name: 'Senior Developer', category: 'experienced', description: 'Technical layout with skills matrix and project showcase', atsScore: 90, tags: ['ATS Safe', 'Free'] },
  { id: 'international-clean', name: 'International Clean', category: 'international', description: 'Minimalist single column for MNC applications', atsScore: 98, tags: ['ATS Max', 'Free'] },
];
