import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { ResumeData, defaultResumeData } from '@/types/resume';

interface ResumeContextType {
  data: ResumeData;
  updateData: (updater: Partial<ResumeData> | ((prev: ResumeData) => ResumeData)) => void;
  atsScore: number;
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

  useEffect(() => {
    const t = setTimeout(() => setAtsScore(calcAtsScore(data)), 500);
    return () => clearTimeout(t);
  }, [data]);

  useEffect(() => {
    const t = setTimeout(() => {
      localStorage.setItem('resumeai-data', JSON.stringify(data));
    }, 1000);
    return () => clearTimeout(t);
  }, [data]);

  const updateData = useCallback((updater: Partial<ResumeData> | ((prev: ResumeData) => ResumeData)) => {
    setData(prev => typeof updater === 'function' ? updater(prev) : { ...prev, ...updater });
  }, []);

  return (
    <ResumeContext.Provider value={{ data, updateData, atsScore }}>
      {children}
    </ResumeContext.Provider>
  );
};
