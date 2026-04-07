import { useResume } from '@/context/ResumeContext';
import { Plus, X } from 'lucide-react';
import { Experience } from '@/types/resume';

const ExperienceSection = () => {
  const { data, updateData } = useResume();

  const addExp = () => {
    const newExp: Experience = {
      id: crypto.randomUUID(), company: '', jobTitle: '', startDate: '', endDate: '',
      currentlyWorking: false, location: '', bullets: [''],
    };
    updateData({ experience: [...data.experience, newExp] });
  };

  const updateExp = (id: string, field: string, value: any) => {
    updateData({
      experience: data.experience.map(e => e.id === id ? { ...e, [field]: value } : e),
    });
  };

  const removeExp = (id: string) => {
    updateData({ experience: data.experience.filter(e => e.id !== id) });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-heading text-base font-bold text-foreground">Work Experience</h3>
        <button onClick={addExp} className="inline-flex items-center gap-1 rounded-md px-3 py-1.5 text-xs font-medium text-accent transition-colors hover:bg-accent/10">
          <Plus className="h-3 w-3" /> Add
        </button>
      </div>
      {data.experience.length === 0 && (
        <div className="rounded-card border border-dashed border-border bg-surface-tertiary p-8 text-center">
          <p className="text-sm text-text-muted">No experience added yet</p>
          <button onClick={addExp} className="mt-2 text-sm font-medium text-accent hover:underline">Add your first experience</button>
        </div>
      )}
      {data.experience.map(exp => (
        <div key={exp.id} className="relative rounded-card bg-surface-tertiary p-5 space-y-3">
          <button onClick={() => removeExp(exp.id)} className="absolute right-3 top-3 text-text-muted hover:text-destructive">
            <X className="h-4 w-4" />
          </button>
          <div className="grid grid-cols-2 gap-3">
            <Input label="Company" value={exp.company} onChange={v => updateExp(exp.id, 'company', v)} />
            <Input label="Job Title" value={exp.jobTitle} onChange={v => updateExp(exp.id, 'jobTitle', v)} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Input label="Start Date" value={exp.startDate} onChange={v => updateExp(exp.id, 'startDate', v)} placeholder="Jan 2023" />
            <Input label="End Date" value={exp.endDate} onChange={v => updateExp(exp.id, 'endDate', v)} placeholder="Present" />
          </div>
          <Input label="Location" value={exp.location} onChange={v => updateExp(exp.id, 'location', v)} placeholder="Mumbai, India" />
          <div>
            <label className="mb-1.5 block text-xs font-medium text-text-secondary">Key Achievements</label>
            {exp.bullets.map((b, bi) => (
              <div key={bi} className="mb-2 flex gap-2">
                <input
                  value={b}
                  onChange={e => {
                    const bullets = [...exp.bullets];
                    bullets[bi] = e.target.value;
                    updateExp(exp.id, 'bullets', bullets);
                  }}
                  placeholder="Describe an achievement..."
                  className="flex-1 rounded-input border border-input bg-surface-primary px-3 py-2 text-sm text-foreground placeholder:text-text-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/15"
                />
                <button onClick={() => {
                  const bullets = exp.bullets.filter((_, i) => i !== bi);
                  updateExp(exp.id, 'bullets', bullets.length ? bullets : ['']);
                }} className="text-text-muted hover:text-destructive"><X className="h-3.5 w-3.5" /></button>
              </div>
            ))}
            <button onClick={() => updateExp(exp.id, 'bullets', [...exp.bullets, ''])} className="text-xs font-medium text-accent hover:underline">
              + Add bullet
            </button>
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

export default ExperienceSection;
