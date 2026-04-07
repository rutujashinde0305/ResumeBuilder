import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/types/resume';

const s = StyleSheet.create({
  page: { fontFamily: 'Helvetica', fontSize: 10, lineHeight: 1.5, color: '#1a1f36' },
  header: { backgroundColor: '#1a1f36', padding: '24 32', color: 'white' },
  name: { fontSize: 22, fontWeight: 'bold', fontFamily: 'Helvetica-Bold' },
  title: { fontSize: 13, color: '#6c63ff', marginTop: 4 },
  contact: { fontSize: 9, color: 'rgba(255,255,255,0.7)', marginTop: 8, flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  body: { padding: '20 32' },
  sectionTitle: { fontSize: 10, fontWeight: 'bold', fontFamily: 'Helvetica-Bold', letterSpacing: 2, color: '#6c63ff', borderBottom: '2 solid #6c63ff', paddingBottom: 4, marginBottom: 8 },
  section: { marginBottom: 16 },
  itemTitle: { fontSize: 11, fontWeight: 'bold', fontFamily: 'Helvetica-Bold' },
  itemSub: { fontSize: 10, color: '#718096' },
  itemDate: { fontSize: 9, color: '#a0aec0' },
  text: { fontSize: 10, color: '#4a5568' },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' },
  bullet: { fontSize: 10, color: '#4a5568', marginLeft: 16, marginBottom: 2 },
});

const ResumePDF = ({ data }: { data: ResumeData }) => {
  const p = data.personalInfo;
  return (
    <Document>
      <Page size="A4" style={s.page}>
        <View style={s.header}>
          <Text style={s.name}>{p.fullName || 'Your Name'}</Text>
          <Text style={s.title}>{p.professionalTitle || 'Professional Title'}</Text>
          <View style={s.contact}>
            {p.email && <Text>{p.email}</Text>}
            {p.phone && <Text>• {p.phone}</Text>}
            {p.location && <Text>• {p.location}</Text>}
            {p.linkedIn && <Text>• {p.linkedIn}</Text>}
          </View>
        </View>
        <View style={s.body}>
          {data.summary && (
            <View style={s.section}>
              <Text style={s.sectionTitle}>PROFESSIONAL SUMMARY</Text>
              <Text style={s.text}>{data.summary}</Text>
            </View>
          )}
          {data.experience.length > 0 && (
            <View style={s.section}>
              <Text style={s.sectionTitle}>WORK EXPERIENCE</Text>
              {data.experience.map(exp => (
                <View key={exp.id} style={{ marginBottom: 10 }}>
                  <View style={s.row}>
                    <Text style={s.itemTitle}>{exp.jobTitle}{exp.company ? ` — ${exp.company}` : ''}</Text>
                    <Text style={s.itemDate}>{exp.startDate}{exp.endDate ? ` – ${exp.endDate}` : ''}</Text>
                  </View>
                  {exp.location && <Text style={s.itemDate}>{exp.location}</Text>}
                  {exp.bullets.filter(b => b).map((b, i) => (
                    <Text key={i} style={s.bullet}>• {b}</Text>
                  ))}
                </View>
              ))}
            </View>
          )}
          {data.education.length > 0 && (
            <View style={s.section}>
              <Text style={s.sectionTitle}>EDUCATION</Text>
              {data.education.map(edu => (
                <View key={edu.id} style={{ marginBottom: 8 }}>
                  <View style={s.row}>
                    <Text style={s.itemTitle}>{edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</Text>
                    <Text style={s.itemDate}>{edu.startYear} – {edu.endYear}</Text>
                  </View>
                  <Text style={s.itemSub}>{edu.institution}</Text>
                  {edu.cgpa && <Text style={s.itemDate}>{edu.gradeType}: {edu.cgpa}</Text>}
                </View>
              ))}
            </View>
          )}
          {(data.skills.technical.length > 0 || data.skills.soft.length > 0 || data.skills.tools.length > 0) && (
            <View style={s.section}>
              <Text style={s.sectionTitle}>SKILLS</Text>
              {data.skills.technical.length > 0 && (
                <Text style={s.text}><Text style={{ fontFamily: 'Helvetica-Bold' }}>Technical: </Text>{data.skills.technical.join(', ')}</Text>
              )}
              {data.skills.soft.length > 0 && (
                <Text style={s.text}><Text style={{ fontFamily: 'Helvetica-Bold' }}>Soft Skills: </Text>{data.skills.soft.join(', ')}</Text>
              )}
              {data.skills.tools.length > 0 && (
                <Text style={s.text}><Text style={{ fontFamily: 'Helvetica-Bold' }}>Tools: </Text>{data.skills.tools.join(', ')}</Text>
              )}
            </View>
          )}
          {data.projects.length > 0 && (
            <View style={s.section}>
              <Text style={s.sectionTitle}>PROJECTS</Text>
              {data.projects.map(proj => (
                <View key={proj.id} style={{ marginBottom: 8 }}>
                  <Text style={s.itemTitle}>{proj.name}</Text>
                  {proj.description && <Text style={s.text}>{proj.description}</Text>}
                </View>
              ))}
            </View>
          )}
          {data.certifications.length > 0 && (
            <View style={s.section}>
              <Text style={s.sectionTitle}>CERTIFICATIONS</Text>
              {data.certifications.map(cert => (
                <View key={cert.id} style={{ marginBottom: 6, flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={s.text}><Text style={{ fontFamily: 'Helvetica-Bold' }}>{cert.name}</Text>{cert.organization ? ` — ${cert.organization}` : ''}</Text>
                  <Text style={s.itemDate}>{cert.issueDate}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
};

export default ResumePDF;
