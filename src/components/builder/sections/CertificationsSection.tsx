import { useResume } from '@/context/ResumeContext';
import { Plus, X } from 'lucide-react';
import { Certification } from '@/types/resume';

const CertificationsSection = () => {
  const { data, updateData } = useResume();

  const addCert = () => {
    const c: Certification = { id: crypto.randomUUID(), name: '', organization: '', issueDate: '', credentialId: '', url: '' };
    updateData({ certifications: [...data.certifications, c] });
  };

  const updateCert = (id: string, field: string, value: string) => {
    updateData({ certifications: data.certifications.map(c => c.id === id ? { ...c, [field]: value } : c) });
  };

  const removeCert = (id: string) => {
    updateData({ certifications: data.certifications.filter(c => c.id !== id) });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-heading text-base font-bold text-foreground">Certifications</h3>
        <button onClick={addCert} className="inline-flex items-center gap-1 rounded-md px-3 py-1.5 text-xs font-medium text-accent hover:bg-accent/10">
          <Plus className="h-3 w-3" /> Add
        </button>
      </div>
      {data.certifications.length === 0 && (
        <div className="rounded-card border border-dashed border-border bg-surface-tertiary p-8 text-center">
          <p className="text-sm text-text-muted">No certifications added yet</p>
          <button onClick={addCert} className="mt-2 text-sm font-medium text-accent hover:underline">Add a certification</button>
        </div>
      )}
      {data.certifications.map(cert => (
        <div key={cert.id} className="relative rounded-card bg-surface-tertiary p-5 space-y-3">
          <button onClick={() => removeCert(cert.id)} className="absolute right-3 top-3 text-text-muted hover:text-destructive"><X className="h-4 w-4" /></button>
          <div className="grid grid-cols-2 gap-3">
            <Input label="Certificate Name" value={cert.name} onChange={v => updateCert(cert.id, 'name', v)} placeholder="AWS Solutions Architect" />
            <Input label="Organization" value={cert.organization} onChange={v => updateCert(cert.id, 'organization', v)} placeholder="Amazon" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Input label="Issue Date" value={cert.issueDate} onChange={v => updateCert(cert.id, 'issueDate', v)} placeholder="Jan 2024" />
            <Input label="Credential ID" value={cert.credentialId} onChange={v => updateCert(cert.id, 'credentialId', v)} placeholder="ABC123" />
          </div>
          <Input label="Certificate URL" value={cert.url} onChange={v => updateCert(cert.id, 'url', v)} placeholder="https://..." />
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

export default CertificationsSection;
