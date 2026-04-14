import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { ResumeData, defaultResumeData } from '@/types/resume';
import { resumeApi, testApiConnection, ParsedResume, JobMatchScore } from '@/lib/api';

interface ResumeContextType {
  data: ResumeData;
  updateData: (updater: Partial<ResumeData> | ((prev: ResumeData) => ResumeData)) => void;
  atsScore: number;
  isLoading: boolean;
  error: string | null;
  saveResume: (userId?: string) => Promise<void>;
  loadResume: (userId?: string) => Promise<void>;
  parseResume: (file: File) => Promise<void>;
  parseResumeText: (text: string) => Promise<void>;
  calculateJobMatch: (jobDescription: string) => Promise<JobMatchScore | null>;
  clearError: () => void;
  clearData: () => void;
  togglePersistence: () => void;
  persistenceEnabled: boolean;
}

const ResumeContext = createContext<ResumeContextType | null>(null);

export const useResume = () => {
  const ctx = useContext(ResumeContext);
  if (!ctx) throw new Error('useResume must be used within ResumeProvider');
  return ctx;
};

const calcAtsScore = (d: ResumeData): number => {
  let score = 0;
  const p = d.personalInfo;
  if (p.fullName) score += 8;
  if (p.email) score += 7;
  if (p.phone) score += 7;
  if (p.location) score += 3;
  if (p.professionalTitle) score += 5;
  if (p.linkedIn) score += 3;
  if (d.summary && d.summary.length > 50) score += 12;
  else if (d.summary) score += 5;
  if (d.experience.length > 0) score += 15;
  if (d.experience.length > 1) score += 5;
  if (d.experience.some(e => e.bullets.length > 0)) score += 5;
  if (d.education.length > 0) score += 10;
  if (d.skills.technical.length >= 3) score += 8;
  else if (d.skills.technical.length > 0) score += 4;
  if (d.skills.soft.length >= 2) score += 4;
  if (d.projects.length > 0) score += 5;
  if (d.certifications.length > 0) score += 3;
  return Math.min(score, 100);
};

export const ResumeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<ResumeData>(() => {
    try {
      const saved = localStorage.getItem('resumeai-data');
      return saved ? JSON.parse(saved) : defaultResumeData;
    } catch { return defaultResumeData; }
  });

  const [atsScore, setAtsScore] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [persistenceEnabled, setPersistenceEnabled] = useState(() => {
    try {
      const saved = localStorage.getItem('resumeai-persistence');
      return saved ? JSON.parse(saved) : true;
    } catch { return true; }
  });

  useEffect(() => {
    const t = setTimeout(() => setAtsScore(calcAtsScore(data)), 500);
    return () => clearTimeout(t);
  }, [data]);

  useEffect(() => {
    const t = setTimeout(() => {
      if (persistenceEnabled) {
        localStorage.setItem('resumeai-data', JSON.stringify(data));
      }
    }, 1000);
    return () => clearTimeout(t);
  }, [data, persistenceEnabled]);

  const updateData = useCallback((updater: Partial<ResumeData> | ((prev: ResumeData) => ResumeData)) => {
    setData(prev => typeof updater === 'function' ? updater(prev) : { ...prev, ...updater });
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const clearData = useCallback(() => {
    setData(defaultResumeData);
    localStorage.removeItem('resumeai-data');
  }, []);

  const togglePersistence = useCallback(() => {
    setPersistenceEnabled(prev => {
      const newValue = !prev;
      localStorage.setItem('resumeai-persistence', JSON.stringify(newValue));
      return newValue;
    });
  }, []);

  const saveResume = useCallback(async (userId: string = 'demo-user') => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await resumeApi.saveResume(data, userId);
      console.log('Resume saved successfully:', response.data);
      // You could store the returned ID for future updates
      // setSavedResumeId(response.data.id);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to save resume';
      setError(errorMessage);
      console.error('Error saving resume:', err);
    } finally {
      setIsLoading(false);
    }
  }, [data]);

  const loadResume = useCallback(async (userId: string = 'demo-user') => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await resumeApi.loadResumes(userId);

      if (response.data && response.data.length > 0) {
        // Load the most recent resume
        const latestResume = response.data[0];
        if (latestResume.data) {
          setData(latestResume.data);
        }
      } else {
        // No resumes found, keep default data
        console.log('No saved resumes found');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load resume';
      setError(errorMessage);
      console.error('Error loading resume:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const calculateJobMatch = useCallback(async (jobDescription: string): Promise<JobMatchScore | null> => {
    setIsLoading(true);
    setError(null);
    try {
      // Convert resume data to text for API
      const resumeText = `
Name: ${data.personalInfo.fullName}
Email: ${data.personalInfo.email}
Phone: ${data.personalInfo.phone}
Location: ${data.personalInfo.location}

Professional Summary:
${data.summary}

Experience:
${data.experience.map(exp => `
${exp.jobTitle} at ${exp.company}
${exp.startDate} - ${exp.endDate}
${exp.bullets.join('\n')}
`).join('\n')}

Education:
${data.education.map(edu => `
${edu.degree} in ${edu.fieldOfStudy}
${edu.institution}, ${edu.endYear}
`).join('\n')}

Skills:
Technical: ${data.skills.technical.join(', ')}
Soft: ${data.skills.soft.join(', ')}
Tools: ${data.skills.tools.join(', ')}
      `.trim();

      const response = await resumeApi.calculateJobMatch(resumeText, jobDescription);
      return response.data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to calculate job match';
      setError(errorMessage);
      console.error('Error calculating job match:', err);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [data]);

  const parseResume = useCallback(async (file: File) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await resumeApi.parseResume(file);
      const parsedData = response.data;

      // Convert parsed data to our ResumeData format
      const resumeData: ResumeData = {
        ...defaultResumeData,
        personalInfo: {
          fullName: parsedData.personal_info?.name || '',
          email: parsedData.personal_info?.email || '',
          phone: parsedData.personal_info?.phone || '',
          location: parsedData.personal_info?.location || '',
          targetRole: '',
          industry: '',
          yearsOfExperience: '',
          linkedIn: '',
          github: '',
          professionalTitle: '',
        },
        summary: '',
        experience: parsedData.experience?.map(exp => ({
          id: Math.random().toString(36).substr(2, 9),
          company: exp.company || '',
          jobTitle: exp.position || '',
          startDate: exp.duration?.split(' - ')[0] || '',
          endDate: exp.duration?.split(' - ')[1] || '',
          currentlyWorking: false,
          location: '',
          bullets: exp.description ? [exp.description] : [],
        })) || [],
        education: parsedData.education?.map(edu => ({
          id: Math.random().toString(36).substr(2, 9),
          degree: edu.degree || '',
          fieldOfStudy: '',
          institution: edu.institution || '',
          university: edu.institution || '',
          startYear: '',
          endYear: edu.year || '',
          cgpa: '',
          gradeType: 'percentage',
          coursework: '',
        })) || [],
        skills: {
          technical: parsedData.skills || [],
          soft: [],
          tools: [],
        },
        projects: [],
        certifications: [],
        templateId: 'default',
      };

      setData(resumeData);
      console.log('Resume parsed successfully:', parsedData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to parse resume';
      setError(errorMessage);
      console.error('Error parsing resume:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const parseResumeText = useCallback(async (text: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await resumeApi.parseResumeText(text);
      const parsedData = response.data;

      // Similar conversion logic as parseResume
      const resumeData: ResumeData = {
        ...defaultResumeData,
        personalInfo: {
          fullName: parsedData.personal_info?.name || '',
          email: parsedData.personal_info?.email || '',
          phone: parsedData.personal_info?.phone || '',
          location: parsedData.personal_info?.location || '',
          targetRole: '',
          industry: '',
          yearsOfExperience: '',
          linkedIn: '',
          github: '',
          professionalTitle: '',
        },
        summary: '',
        experience: parsedData.experience?.map(exp => ({
          id: Math.random().toString(36).substr(2, 9),
          company: exp.company || '',
          jobTitle: exp.position || '',
          startDate: exp.duration?.split(' - ')[0] || '',
          endDate: exp.duration?.split(' - ')[1] || '',
          currentlyWorking: false,
          location: '',
          bullets: exp.description ? [exp.description] : [],
        })) || [],
        education: parsedData.education?.map(edu => ({
          id: Math.random().toString(36).substr(2, 9),
          degree: edu.degree || '',
          fieldOfStudy: '',
          institution: edu.institution || '',
          university: edu.institution || '',
          startYear: '',
          endYear: edu.year || '',
          cgpa: '',
          gradeType: 'percentage',
          coursework: '',
        })) || [],
        skills: {
          technical: parsedData.skills || [],
          soft: [],
          tools: [],
        },
        projects: [],
        certifications: [],
        templateId: 'default',
      };

      setData(resumeData);
      console.log('Resume text parsed successfully:', parsedData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to parse resume text';
      setError(errorMessage);
      console.error('Error parsing resume text:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <ResumeContext.Provider value={{
      data,
      updateData,
      atsScore,
      isLoading,
      error,
      saveResume,
      loadResume,
      parseResume,
      parseResumeText,
      calculateJobMatch,
      clearError,
      clearData,
      togglePersistence,
      persistenceEnabled
    }}>
      {children}
    </ResumeContext.Provider>
  );
};
