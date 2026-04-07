import { useResume } from '@/context/ResumeContext';

const SummarySection = () => {
  const { data, updateData } = useResume();

  return (
    <div className="mt-4 rounded-card bg-surface-tertiary p-5 space-y-3">
      <h3 className="font-heading text-base font-bold text-foreground">Professional Summary</h3>
      <textarea
        value={data.summary}
        onChange={e => updateData({ summary: e.target.value })}
        placeholder="A brief 2-3 sentence summary of your professional background..."
        rows={5}
        className="w-full rounded-input border border-input bg-surface-primary px-3 py-2.5 text-sm text-foreground placeholder:text-text-muted transition-all focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/15 resize-none"
      />
      <div className="flex items-center justify-between">
        <span className="text-xs text-text-muted">{data.summary.length}/400 characters</span>
      </div>
    </div>
  );
};

export default SummarySection;
