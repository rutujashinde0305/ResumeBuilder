import { useResume } from '@/context/ResumeContext';

const Input = ({ label, value, onChange, placeholder = '', type = 'text', className = '' }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string; className?: string;
}) => (
  <div className={className}>
    <label className="mb-1.5 block text-xs font-medium text-text-secondary">{label}</label>
    <input
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full rounded-input border border-input bg-surface-primary px-3 py-2.5 text-sm text-foreground placeholder:text-text-muted transition-all focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/15"
    />
  </div>
);

const PersonalSection = () => {
  const { data, updateData } = useResume();
  const p = data.personalInfo;
  const set = (field: string, value: string) =>
    updateData({ personalInfo: { ...p, [field]: value } });

  return (
    <div className="rounded-card bg-surface-tertiary p-5 space-y-4">
      <h3 className="font-heading text-base font-bold text-foreground">Personal Information</h3>
      <Input label="Full Name" value={p.fullName} onChange={v => set('fullName', v)} placeholder="e.g. Priya Sharma" />
      <div className="grid grid-cols-2 gap-3">
        <Input label="Email" value={p.email} onChange={v => set('email', v)} placeholder="priya@email.com" type="email" />
        <Input label="Phone" value={p.phone} onChange={v => set('phone', v)} placeholder="+91 98765 43210" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Input label="Location" value={p.location} onChange={v => set('location', v)} placeholder="Mumbai, India" />
        <Input label="Target Role" value={p.targetRole} onChange={v => set('targetRole', v)} placeholder="Software Engineer" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Input label="Industry" value={p.industry} onChange={v => set('industry', v)} placeholder="Information Technology" />
        <Input label="Years of Experience" value={p.yearsOfExperience} onChange={v => set('yearsOfExperience', v)} placeholder="2" />
      </div>
      <Input label="Professional Title" value={p.professionalTitle} onChange={v => set('professionalTitle', v)} placeholder="Full Stack Developer" />
      <Input label="LinkedIn URL" value={p.linkedIn} onChange={v => set('linkedIn', v)} placeholder="linkedin.com/in/priya" />
      <Input label="GitHub / Portfolio URL" value={p.github} onChange={v => set('github', v)} placeholder="github.com/priya" />
    </div>
  );
};

export default PersonalSection;
