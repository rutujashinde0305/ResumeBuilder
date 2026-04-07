import { useResume } from '@/context/ResumeContext';
import { Plus, X } from 'lucide-react';
import { Education } from '@/types/resume';

const EducationSection = () => {
  const { data, updateData } = useResume();

  const addEdu = () => {
    const newEdu: Education = {
      id: crypto.randomUUID(), degree: '', fieldOfStudy: '', institution: '',
      university: '', startYear: '', endYear: '', cgpa: '', gradeType: 'CGPA', coursework: '',
    };
    updateData({ education: [...data.education, newEdu] });
  };

  const updateEdu = (id: string, field: string, value: string) => {
    updateData({ education: data.education.map(e => e.id === id ? { ...e, [field]: value } : e) });
  };

  const removeEdu = (id: string) => {
    updateData({ education: data.education.filter(e => e.id !== id) });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-heading text-base font-bold text-foreground">Education</h3>
        <button onClick={addEdu} className="inline-flex items-center gap-1 rounded-md px-3 py-1.5 text-xs font-medium text-accent hover:bg-accent/10">
          <Plus className="h-3 w-3" /> Add
        </button>
      </div>
      {data.education.length === 0 && (
        <div className="rounded-card border border-dashed border-border bg-surface-tertiary p-8 text-center">
          <p className="text-sm text-text-muted">No education added yet</p>
          <button onClick={addEdu} className="mt-2 text-sm font-medium text-accent hover:underline">Add your education</button>
        </div>
      )}
      {data.education.map(edu => (
        <div key={edu.id} className="relative rounded-card bg-surface-tertiary p-5 space-y-3">
          <button onClick={() => removeEdu(edu.id)} className="absolute right-3 top-3 text-text-muted hover:text-destructive"><X className="h-4 w-4" /></button>
          <div className="grid grid-cols-2 gap-3">
            <Input label="Degree" value={edu.degree} onChange={v => updateEdu(edu.id, 'degree', v)} placeholder="B.Tech" />
            <Input label="Field of Study" value={edu.fieldOfStudy} onChange={v => updateEdu(edu.id, 'fieldOfStudy', v)} placeholder="Computer Science" />
          </div>
          <Input label="Institution" value={edu.institution} onChange={v => updateEdu(edu.id, 'institution', v)} placeholder="IIT Mumbai" />
          <Input label="University / Board" value={edu.university} onChange={v => updateEdu(edu.id, 'university', v)} placeholder="IIT Mumbai" />
          <div className="grid grid-cols-2 gap-3">
            <Input label="Start Year" value={edu.startYear} onChange={v => updateEdu(edu.id, 'startYear', v)} placeholder="2019" />
            <Input label="End Year" value={edu.endYear} onChange={v => updateEdu(edu.id, 'endYear', v)} placeholder="2023" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Input label="CGPA / Percentage" value={edu.cgpa} onChange={v => updateEdu(edu.id, 'cgpa', v)} placeholder="8.5" />
            <div>
              <label className="mb-1.5 block text-xs font-medium text-text-secondary">Grade Type</label>
              <select value={edu.gradeType} onChange={e => updateEdu(edu.id, 'gradeType', e.target.value)}
                className="w-full rounded-input border border-input bg-surface-primary px-3 py-2.5 text-sm text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/15">
                <option value="CGPA">CGPA</option>
                <option value="Percentage">Percentage</option>
                <option value="GPA">GPA</option>
              </select>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const Input = ({ label, value, onChange, placeholder = '' }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string;
}) => (
  <div>
    <label className="mb-1.5 block text-xs font-medium text-text-secondary">{label}</label>
    <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
      className="w-full rounded-input border border-input bg-surface-primary px-3 py-2.5 text-sm text-foreground placeholder:text-text-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/15" />
  </div>
);

export default EducationSection;
