import { useEffect, useRef, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { FileText, ArrowLeft, Download, FileUp, Target, Trash2 } from 'lucide-react';
import { useResume } from '@/context/ResumeContext';
import FormPanel from '@/components/builder/FormPanel';
import PreviewPanel from '@/components/builder/PreviewPanel';
import ATSScoreBadge from '@/components/builder/ATSScoreBadge';

const Builder = () => {
  const [searchParams] = useSearchParams();
  const { updateData } = useResume();

  useEffect(() => {
    const t = searchParams.get('template');
    if (t) updateData({ templateId: t });
  }, [searchParams, updateData]);

  return (
    <div className="flex h-screen flex-col bg-surface-primary">
      {/* Header */}
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-border bg-surface-secondary px-4">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            <div className="flex h-7 w-7 items-center justify-center rounded-md gradient-bg">
              <FileText className="h-3.5 w-3.5 text-accent-foreground" />
            </div>
            <span className="font-heading font-bold text-foreground">Analytics Career Connect</span>
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <ATSScoreBadge />
          <ParseResumeButton />
          <JobMatchButton />
          <ClearButton />
          <DownloadButton />
        </div>
      </header>

      {/* Main */}
      <div className="flex flex-1 overflow-hidden">
        <div className="w-[400px] shrink-0 overflow-y-auto border-r border-border bg-surface-secondary">
          <FormPanel />
        </div>
        <div className="flex-1 overflow-auto bg-surface-hover">
          <PreviewPanel />
        </div>
      </div>
    </div>
  );
};

const DownloadButton = () => {
  const { data } = useResume();

  const handleDownload = async () => {
    const { pdf } = await import('@react-pdf/renderer');
    const { default: ResumePDF } = await import('@/components/pdf/ResumePDF');
    const blob = await pdf(<ResumePDF data={data} />).toBlob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const name = data.personalInfo.fullName?.replace(/\s+/g, '_') || 'Resume';
    a.href = url;
    a.download = `${name}_Resume.pdf`;
    a.click();
    URL.revokeObjectURL(url);
    
    const confetti = (await import('canvas-confetti')).default;
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    
    const { toast } = await import('sonner');
    toast.success('Resume downloaded successfully!');
  };

  return (
    <button onClick={handleDownload} className="inline-flex items-center gap-2 rounded-card px-4 py-2 text-sm font-semibold text-accent-foreground gradient-bg transition-all hover:scale-[1.02] hover:shadow-glow">
      <Download className="h-4 w-4" /> Download PDF
    </button>
  );
};

const ParseResumeButton = () => {
  const { parseResume, isLoading } = useResume();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      parseResume(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.doc,.docx,.txt"
        onChange={handleFileSelect}
        className="hidden"
      />
      <button
        onClick={handleClick}
        disabled={isLoading}
        className="inline-flex items-center gap-2 rounded-card px-3 py-2 text-sm font-semibold text-accent-foreground bg-orange-600 hover:bg-orange-700 transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <FileUp className="h-4 w-4" />
        {isLoading ? 'Parsing...' : 'Parse Resume'}
      </button>
    </>
  );
};

const JobMatchButton = () => {
  const { calculateJobMatch, isLoading } = useResume();
  const [showDialog, setShowDialog] = useState(false);
  const [jobDescription, setJobDescription] = useState('');
  const [matchResult, setMatchResult] = useState<any>(null);

  const handleCalculateMatch = async () => {
    if (!jobDescription.trim()) {
      const { toast } = await import('sonner');
      toast.error('Please enter a job description');
      return;
    }

    const result = await calculateJobMatch(jobDescription);
    if (result) {
      setMatchResult(result);
      const { toast } = await import('sonner');
      toast.success(`Job match score: ${result.score}%`);
    }
    setShowDialog(false);
  };

  return (
    <>
      <button
        onClick={() => setShowDialog(true)}
        disabled={isLoading}
        className="inline-flex items-center gap-2 rounded-card px-3 py-2 text-sm font-semibold text-accent-foreground bg-teal-600 hover:bg-teal-700 transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Target className="h-4 w-4" />
        Job Match
      </button>

      {showDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Calculate Job Match Score</h3>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the job description here..."
              className="w-full h-32 p-3 border border-gray-300 rounded-md resize-none mb-4"
            />
            <div className="flex gap-3">
              <button
                onClick={handleCalculateMatch}
                disabled={isLoading}
                className="flex-1 bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-700 disabled:opacity-50"
              >
                {isLoading ? 'Calculating...' : 'Calculate Match'}
              </button>
              <button
                onClick={() => setShowDialog(false)}
                className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {matchResult && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Job Match Results</h3>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-teal-600">{matchResult.score}%</div>
                <div className="text-sm text-gray-600">Match Score</div>
              </div>

              <div>
                <h4 className="font-semibold text-green-600">Matched Skills:</h4>
                <div className="flex flex-wrap gap-2 mt-2">
                  {matchResult.matched_skills?.map((skill: string, index: number) => (
                    <span key={index} className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-red-600">Missing Skills:</h4>
                <div className="flex flex-wrap gap-2 mt-2">
                  {matchResult.missing_skills?.map((skill: string, index: number) => (
                    <span key={index} className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-blue-600">Recommendations:</h4>
                <ul className="list-disc list-inside mt-2 text-sm">
                  {matchResult.recommendations?.map((rec: string, index: number) => (
                    <li key={index}>{rec}</li>
                  ))}
                </ul>
              </div>
            </div>

            <button
              onClick={() => setMatchResult(null)}
              className="w-full mt-4 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

const ClearButton = () => {
  const { clearData } = useResume();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleClear = async () => {
    clearData();
    setShowConfirm(false);
    const { toast } = await import('sonner');
    toast.success('All form data cleared!');
  };

  return (
    <>
      <button
        onClick={() => setShowConfirm(true)}
        title="Clear all form data"
        className="inline-flex items-center gap-2 rounded-card px-3 py-2 text-sm font-semibold text-accent-foreground bg-red-600 hover:bg-red-700 transition-all hover:scale-[1.02]"
      >
        <Trash2 className="h-4 w-4" />
        Clear
      </button>

      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
            <h3 className="text-lg font-semibold mb-2">Clear All Data?</h3>
            <p className="text-gray-600 mb-6">
              This will delete all your form data from this browser. This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleClear}
                className="flex-1 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 font-semibold"
              >
                Clear All
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 font-semibold"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Builder;
