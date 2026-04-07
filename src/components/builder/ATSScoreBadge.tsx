import { useResume } from '@/context/ResumeContext';

const ATSScoreBadge = () => {
  const { atsScore } = useResume();
  const color = atsScore >= 80 ? 'text-success' : atsScore >= 50 ? 'text-warning' : 'text-destructive';
  const stroke = atsScore >= 80 ? '#00c896' : atsScore >= 50 ? '#ffb547' : '#ff5757';
  const circumference = 2 * Math.PI * 18;
  const offset = circumference - (atsScore / 100) * circumference;

  return (
    <div className="flex items-center gap-2">
      <svg width="44" height="44" viewBox="0 0 44 44">
        <circle cx="22" cy="22" r="18" fill="none" stroke="currentColor" strokeWidth="3" className="text-border" />
        <circle
          cx="22" cy="22" r="18" fill="none" stroke={stroke} strokeWidth="3"
          strokeDasharray={circumference} strokeDashoffset={offset}
          strokeLinecap="round" transform="rotate(-90 22 22)"
          className="transition-all duration-700"
        />
        <text x="22" y="24" textAnchor="middle" className={`fill-current text-xs font-bold ${color}`} fontSize="12">
          {atsScore}
        </text>
      </svg>
      <span className="hidden text-xs text-text-muted lg:block">ATS</span>
    </div>
  );
};

export default ATSScoreBadge;
