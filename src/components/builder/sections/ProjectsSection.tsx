import { useResume } from '@/context/ResumeContext';
import { Plus, X } from 'lucide-react';
import { Project } from '@/types/resume';

const ProjectsSection = () => {
  const { data, updateData } = useResume();

  const addProject = () => {
    const p: Project = { id: crypto.randomUUID(), name: '', techStack: [], description: '', liveLink: '', githubLink: '' };
    updateData({ projects: [...data.projects, p] });
  };

  const updateProject = (id: string, field: string, value: any) => {
    updateData({ projects: data.projects.map(p => p.id === id ? { ...p, [field]: value } : p) });
  };

  const removeProject = (id: string) => {
    updateData({ projects: data.projects.filter(p => p.id !== id) });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-heading text-base font-bold text-foreground">Projects</h3>
        <button onClick={addProject} className="inline-flex items-center gap-1 rounded-md px-3 py-1.5 text-xs font-medium text-accent hover:bg-accent/10">
          <Plus className="h-3 w-3" /> Add
        </button>
      </div>
      {data.projects.length === 0 && (
        <div className="rounded-card border border-dashed border-border bg-surface-tertiary p-8 text-center">
          <p className="text-sm text-text-muted">No projects added yet</p>
          <button onClick={addProject} className="mt-2 text-sm font-medium text-accent hover:underline">Add your first project</button>
        </div>
      )}
      {data.projects.map(proj => (
        <div key={proj.id} className="relative rounded-card bg-surface-tertiary p-5 space-y-3">
          <button onClick={() => removeProject(proj.id)} className="absolute right-3 top-3 text-text-muted hover:text-destructive"><X className="h-4 w-4" /></button>
          <Input label="Project Name" value={proj.name} onChange={v => updateProject(proj.id, 'name', v)} placeholder="E-commerce Platform" />
          <div>
            <label className="mb-1.5 block text-xs font-medium text-text-secondary">Description</label>
            <textarea value={proj.description} onChange={e => updateProject(proj.id, 'description', e.target.value)}
              placeholder="Describe the project..." rows={3}
              className="w-full rounded-input border border-input bg-surface-primary px-3 py-2.5 text-sm text-foreground placeholder:text-text-muted resize-none focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/15" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Input label="Live Link" value={proj.liveLink} onChange={v => updateProject(proj.id, 'liveLink', v)} placeholder="https://..." />
            <Input label="GitHub Link" value={proj.githubLink} onChange={v => updateProject(proj.id, 'githubLink', v)} placeholder="github.com/..." />
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

export default ProjectsSection;
