import { useState, KeyboardEvent } from 'react';
import { useResume } from '@/context/ResumeContext';
import { X } from 'lucide-react';

const TagInput = ({ label, tags, onAdd, onRemove }: {
  label: string; tags: string[]; onAdd: (t: string) => void; onRemove: (i: number) => void;
}) => {
  const [input, setInput] = useState('');
  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && input.trim()) {
      e.preventDefault();
      onAdd(input.trim());
      setInput('');
    }
  };

  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-text-secondary">{label}</label>
      <div className="flex flex-wrap gap-1.5 rounded-input border border-input bg-surface-primary p-2">
        {tags.map((t, i) => (
          <span key={i} className="inline-flex items-center gap-1 rounded-pill bg-accent/15 px-2.5 py-1 text-xs font-medium text-accent">
            {t}
            <button onClick={() => onRemove(i)} className="hover:text-destructive"><X className="h-3 w-3" /></button>
          </span>
        ))}
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Type + Enter"
          className="min-w-[100px] flex-1 bg-transparent text-sm text-foreground placeholder:text-text-muted outline-none"
        />
      </div>
    </div>
  );
};

const SkillsSection = () => {
  const { data, updateData } = useResume();
  const s = data.skills;

  const addSkill = (type: keyof typeof s, skill: string) => {
    if (!s[type].includes(skill)) {
      updateData({ skills: { ...s, [type]: [...s[type], skill] } });
    }
  };

  const removeSkill = (type: keyof typeof s, index: number) => {
    updateData({ skills: { ...s, [type]: s[type].filter((_, i) => i !== index) } });
  };

  return (
    <div className="space-y-4">
      <h3 className="font-heading text-base font-bold text-foreground">Skills</h3>
      <div className="rounded-card bg-surface-tertiary p-5 space-y-4">
        <TagInput label="Technical Skills" tags={s.technical} onAdd={t => addSkill('technical', t)} onRemove={i => removeSkill('technical', i)} />
        <TagInput label="Soft Skills" tags={s.soft} onAdd={t => addSkill('soft', t)} onRemove={i => removeSkill('soft', i)} />
        <TagInput label="Tools & Technologies" tags={s.tools} onAdd={t => addSkill('tools', t)} onRemove={i => removeSkill('tools', i)} />
      </div>
    </div>
  );
};

export default SkillsSection;
