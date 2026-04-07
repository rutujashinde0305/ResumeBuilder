import { useResume } from '@/context/ResumeContext';
import { ResumeData } from '@/types/resume';

const PreviewPanel = () => {
  const { data } = useResume();

  return (
    <div className="flex justify-center p-8">
      <div className="w-[595px] min-h-[842px] bg-foreground shadow-lg rounded-sm overflow-hidden">
        <ResumePreview data={data} />
      </div>
    </div>
  );
};

const ResumePreview = ({ data }: { data: ResumeData }) => {
  const p = data.personalInfo;

  return (
    <div className="text-primary" style={{ fontFamily: 'Inter, sans-serif', fontSize: '10px', lineHeight: 1.5 }}>
      {/* Header */}
      <div style={{ backgroundColor: '#1a1f36', padding: '24px 32px', color: 'white' }}>
        <div style={{ fontSize: '22px', fontWeight: 700, fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
          {p.fullName || 'Your Name'}
        </div>
        <div style={{ fontSize: '13px', color: '#6c63ff', marginTop: '4px' }}>
          {p.professionalTitle || 'Professional Title'}
        </div>
        <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.7)', marginTop: '8px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {p.email && <span>{p.email}</span>}
          {p.phone && <span>• {p.phone}</span>}
          {p.location && <span>• {p.location}</span>}
          {p.linkedIn && <span>• {p.linkedIn}</span>}
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: '20px 32px' }}>
        {/* Summary */}
        {data.summary && (
          <Section title="PROFESSIONAL SUMMARY">
            <p style={{ fontSize: '10px', color: '#4a5568' }}>{data.summary}</p>
          </Section>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <Section title="WORK EXPERIENCE">
            {data.experience.map(exp => (
              <div key={exp.id} style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <div>
                    <span style={{ fontWeight: 600, fontSize: '11px', color: '#1a1f36' }}>{exp.jobTitle}</span>
                    {exp.company && <span style={{ color: '#718096' }}> — {exp.company}</span>}
                  </div>
                  <span style={{ fontSize: '9px', color: '#a0aec0' }}>
                    {exp.startDate}{exp.endDate ? ` – ${exp.endDate}` : ''}
                  </span>
                </div>
                {exp.location && <div style={{ fontSize: '9px', color: '#a0aec0' }}>{exp.location}</div>}
                <ul style={{ margin: '4px 0 0 16px', listStyleType: 'disc' }}>
                  {exp.bullets.filter(b => b).map((b, i) => (
                    <li key={i} style={{ fontSize: '10px', color: '#4a5568', marginBottom: '2px' }}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </Section>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <Section title="EDUCATION">
            {data.education.map(edu => (
              <div key={edu.id} style={{ marginBottom: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div>
                    <span style={{ fontWeight: 600, fontSize: '11px', color: '#1a1f36' }}>{edu.degree} {edu.fieldOfStudy && `in ${edu.fieldOfStudy}`}</span>
                  </div>
                  <span style={{ fontSize: '9px', color: '#a0aec0' }}>{edu.startYear} – {edu.endYear}</span>
                </div>
                <div style={{ fontSize: '10px', color: '#718096' }}>{edu.institution}</div>
                {edu.cgpa && <div style={{ fontSize: '9px', color: '#a0aec0' }}>{edu.gradeType}: {edu.cgpa}</div>}
              </div>
            ))}
          </Section>
        )}

        {/* Skills */}
        {(data.skills.technical.length > 0 || data.skills.soft.length > 0 || data.skills.tools.length > 0) && (
          <Section title="SKILLS">
            {data.skills.technical.length > 0 && (
              <div style={{ marginBottom: '6px' }}>
                <span style={{ fontWeight: 600, fontSize: '10px', color: '#1a1f36' }}>Technical: </span>
                <span style={{ color: '#4a5568' }}>{data.skills.technical.join(', ')}</span>
              </div>
            )}
            {data.skills.soft.length > 0 && (
              <div style={{ marginBottom: '6px' }}>
                <span style={{ fontWeight: 600, fontSize: '10px', color: '#1a1f36' }}>Soft Skills: </span>
                <span style={{ color: '#4a5568' }}>{data.skills.soft.join(', ')}</span>
              </div>
            )}
            {data.skills.tools.length > 0 && (
              <div>
                <span style={{ fontWeight: 600, fontSize: '10px', color: '#1a1f36' }}>Tools: </span>
                <span style={{ color: '#4a5568' }}>{data.skills.tools.join(', ')}</span>
              </div>
            )}
          </Section>
        )}

        {/* Projects */}
        {data.projects.length > 0 && (
          <Section title="PROJECTS">
            {data.projects.map(proj => (
              <div key={proj.id} style={{ marginBottom: '8px' }}>
                <div style={{ fontWeight: 600, fontSize: '11px', color: '#1a1f36' }}>{proj.name}</div>
                {proj.description && <p style={{ fontSize: '10px', color: '#4a5568', marginTop: '2px' }}>{proj.description}</p>}
              </div>
            ))}
          </Section>
        )}

        {/* Certifications */}
        {data.certifications.length > 0 && (
          <Section title="CERTIFICATIONS">
            {data.certifications.map(cert => (
              <div key={cert.id} style={{ marginBottom: '6px', display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <span style={{ fontWeight: 600, fontSize: '10px', color: '#1a1f36' }}>{cert.name}</span>
                  {cert.organization && <span style={{ color: '#718096' }}> — {cert.organization}</span>}
                </div>
                <span style={{ fontSize: '9px', color: '#a0aec0' }}>{cert.issueDate}</span>
              </div>
            ))}
          </Section>
        )}
      </div>
    </div>
  );
};

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div style={{ marginBottom: '16px' }}>
    <div style={{
      fontSize: '10px', fontWeight: 700, letterSpacing: '2px', color: '#6c63ff',
      borderBottom: '2px solid #6c63ff', paddingBottom: '4px', marginBottom: '8px',
      fontFamily: '"Plus Jakarta Sans", sans-serif',
    }}>
      {title}
    </div>
    {children}
  </div>
);

export default PreviewPanel;
