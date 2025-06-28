import React, { useState, useEffect } from 'react';

interface PersonalInfo {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  linkedIn: string;
  website: string;
}

interface EducationInfo {
  school: string;
  degree: string;
  years: string;
}

interface ExperienceInfo {
  company: string;
  role: string;
  duration: string;
  description: string;
}

interface ResumeData {
  personal: PersonalInfo;
  education: EducationInfo;
  experience: ExperienceInfo;
  skills: string;
  certifications: string;
  languages: string;
  custom: string;
  coverLetter: string;
}

const defaultData: ResumeData = {
  personal: {
    fullName: '',
    jobTitle: '',
    email: '',
    phone: '',
    linkedIn: '',
    website: '',
  },
  education: {
    school: '',
    degree: '',
    years: '',
  },
  experience: {
    company: '',
    role: '',
    duration: '',
    description: '',
  },
  skills: '',
  certifications: '',
  languages: '',
  custom: '',
  coverLetter: '',
};

const templates: Record<string, string> = {
  General: 'Dear Hiring Manager,\nI am excited to apply for the position...',
  Casual: 'Hello,\nI came across your job posting and would love to join...',
};

const fonts = [
  { label: 'Sans', value: 'sans-serif' },
  { label: 'Serif', value: 'serif' },
  { label: 'Mono', value: 'monospace' },
];

const ResumeBuilder: React.FC = () => {
  const [data, setData] = useState<ResumeData>(defaultData);
  const [font, setFont] = useState('serif');
  const [color, setColor] = useState('#000000');
  const [spacing, setSpacing] = useState('normal');
  const [template, setTemplate] = useState('General');

  useEffect(() => {
    const saved = localStorage.getItem('resumeData');
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as ResumeData;
        setData(parsed);
      } catch {
        // ignore parsing errors
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('resumeData', JSON.stringify(data));
  }, [data]);

  const handleExport = async () => {
    if (!(window as any).html2pdf) {
      await new Promise<void>((resolve, reject) => {
        const script = document.createElement('script');
        script.src =
          'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Failed to load html2pdf'));
        document.body.appendChild(script);
      });
    }

    const element = document.getElementById('resume-preview');
    const html2pdf = (window as any).html2pdf;
    if (element && typeof html2pdf === 'function') {
      html2pdf()
        .set({
          filename: 'resume.pdf',
          html2canvas: { useCORS: true, scale: 2 },
          jsPDF: { format: 'a4' },
        })
        .from(element)
        .save();
    }
  };

  const previewStyle: React.CSSProperties = {
    fontFamily: font,
    color,
    lineHeight: spacing === 'tight' ? 1.2 : spacing === 'wide' ? 1.8 : 1.5,
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <section className="space-y-2">
          <h2 className="text-xl font-bold">Personal Information</h2>
          <input
            type="text"
            placeholder="Full Name"
            value={data.personal.fullName}
            onChange={(e) =>
              setData({ ...data, personal: { ...data.personal, fullName: e.target.value } })
            }
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Job Title"
            value={data.personal.jobTitle}
            onChange={(e) =>
              setData({ ...data, personal: { ...data.personal, jobTitle: e.target.value } })
            }
            className="w-full p-2 border rounded"
          />
          <input
            type="email"
            placeholder="Email"
            value={data.personal.email}
            onChange={(e) =>
              setData({ ...data, personal: { ...data.personal, email: e.target.value } })
            }
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Phone"
            value={data.personal.phone}
            onChange={(e) =>
              setData({ ...data, personal: { ...data.personal, phone: e.target.value } })
            }
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            placeholder="LinkedIn"
            value={data.personal.linkedIn}
            onChange={(e) =>
              setData({ ...data, personal: { ...data.personal, linkedIn: e.target.value } })
            }
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Website"
            value={data.personal.website}
            onChange={(e) =>
              setData({ ...data, personal: { ...data.personal, website: e.target.value } })
            }
            className="w-full p-2 border rounded"
          />
        </section>
        <section className="space-y-2">
          <h2 className="text-xl font-bold">Education</h2>
          <input
            type="text"
            placeholder="School"
            value={data.education.school}
            onChange={(e) =>
              setData({ ...data, education: { ...data.education, school: e.target.value } })
            }
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Degree"
            value={data.education.degree}
            onChange={(e) =>
              setData({ ...data, education: { ...data.education, degree: e.target.value } })
            }
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Years"
            value={data.education.years}
            onChange={(e) =>
              setData({ ...data, education: { ...data.education, years: e.target.value } })
            }
            className="w-full p-2 border rounded"
          />
        </section>
        <section className="space-y-2">
          <h2 className="text-xl font-bold">Work Experience</h2>
          <input
            type="text"
            placeholder="Company"
            value={data.experience.company}
            onChange={(e) =>
              setData({ ...data, experience: { ...data.experience, company: e.target.value } })
            }
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Role"
            value={data.experience.role}
            onChange={(e) =>
              setData({ ...data, experience: { ...data.experience, role: e.target.value } })
            }
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Duration"
            value={data.experience.duration}
            onChange={(e) =>
              setData({ ...data, experience: { ...data.experience, duration: e.target.value } })
            }
            className="w-full p-2 border rounded"
          />
          <textarea
            placeholder="Description"
            value={data.experience.description}
            onChange={(e) =>
              setData({ ...data, experience: { ...data.experience, description: e.target.value } })
            }
            className="w-full p-2 border rounded"
          />
        </section>
        <section className="space-y-2">
          <h2 className="text-xl font-bold">Skills</h2>
          <textarea
            placeholder="Skills"
            value={data.skills}
            onChange={(e) => setData({ ...data, skills: e.target.value })}
            className="w-full p-2 border rounded"
          />
        </section>
        <section className="space-y-2">
          <h2 className="text-xl font-bold">Certifications</h2>
          <textarea
            placeholder="Certifications"
            value={data.certifications}
            onChange={(e) => setData({ ...data, certifications: e.target.value })}
            className="w-full p-2 border rounded"
          />
        </section>
        <section className="space-y-2">
          <h2 className="text-xl font-bold">Languages</h2>
          <textarea
            placeholder="Languages"
            value={data.languages}
            onChange={(e) => setData({ ...data, languages: e.target.value })}
            className="w-full p-2 border rounded"
          />
        </section>
        <section className="space-y-2">
          <h2 className="text-xl font-bold">Custom Section</h2>
          <textarea
            placeholder="Any additional information"
            value={data.custom}
            onChange={(e) => setData({ ...data, custom: e.target.value })}
            className="w-full p-2 border rounded"
          />
        </section>
        <section className="space-y-2">
          <h2 className="text-xl font-bold">Cover Letter</h2>
          <div className="flex items-center space-x-2">
            <select
              value={template}
              onChange={(e) => setTemplate(e.target.value)}
              className="p-2 border rounded"
            >
              {Object.keys(templates).map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <button
              className="px-3 py-1 bg-gray-200 rounded"
              onClick={() => setData({ ...data, coverLetter: templates[template] })}
            >
              Load Template
            </button>
          </div>
          <textarea
            placeholder="Cover Letter"
            value={data.coverLetter}
            onChange={(e) => setData({ ...data, coverLetter: e.target.value })}
            className="w-full p-2 border rounded h-32"
          />
        </section>
        <section className="space-y-2">
          <h2 className="text-xl font-bold">Formatting</h2>
          <select
            value={font}
            onChange={(e) => setFont(e.target.value)}
            className="p-2 border rounded w-full"
          >
            {fonts.map((f) => (
              <option key={f.value} value={f.value}>
                {f.label}
              </option>
            ))}
          </select>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-full h-10 p-1 border rounded"
          />
          <select
            value={spacing}
            onChange={(e) => setSpacing(e.target.value)}
            className="p-2 border rounded w-full"
          >
            <option value="tight">Tight</option>
            <option value="normal">Normal</option>
            <option value="wide">Wide</option>
          </select>
        </section>
        <button
          onClick={handleExport}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded"
        >
          Export as PDF
        </button>
      </div>
      <div
        id="resume-preview"
        className="bg-white dark:bg-gray-800 p-6 rounded space-y-4 border"
        style={previewStyle}
      >
        <div>
          <h1 className="text-2xl font-bold">{data.personal.fullName}</h1>
          <p className="italic">{data.personal.jobTitle}</p>
          <p>{data.personal.email} | {data.personal.phone}</p>
          <p>{data.personal.linkedIn} | {data.personal.website}</p>
        </div>
        <div>
          <h2 className="font-semibold text-lg">Education</h2>
          <p>
            {data.education.degree} - {data.education.school} ({data.education.years})
          </p>
        </div>
        <div>
          <h2 className="font-semibold text-lg">Experience</h2>
          <p className="font-semibold">{data.experience.role} - {data.experience.company}</p>
          <p className="text-sm">{data.experience.duration}</p>
          <p>{data.experience.description}</p>
        </div>
        {data.skills && (
          <div>
            <h2 className="font-semibold text-lg">Skills</h2>
            <p>{data.skills}</p>
          </div>
        )}
        {data.certifications && (
          <div>
            <h2 className="font-semibold text-lg">Certifications</h2>
            <p>{data.certifications}</p>
          </div>
        )}
        {data.languages && (
          <div>
            <h2 className="font-semibold text-lg">Languages</h2>
            <p>{data.languages}</p>
          </div>
        )}
        {data.custom && (
          <div>
            <h2 className="font-semibold text-lg">Additional Information</h2>
            <p>{data.custom}</p>
          </div>
        )}
        {data.coverLetter && (
          <div>
            <h2 className="font-semibold text-lg">Cover Letter</h2>
            <pre className="whitespace-pre-wrap font-sans">
              {data.coverLetter}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeBuilder;
