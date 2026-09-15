import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import {
  Download,
  Code,
  Briefcase,
  Globe,
  Mail,
  Phone,
  MapPin,
  Printer,
} from 'lucide-react';
import { GitHubIcon, LinkedInIcon } from '../../components/SocialIcons.jsx';
import { useLanguage } from '../../hooks/useLanguage';

import { skills, skillCategories } from '../../data/skills';
import { projects } from '../../data/projects';
import { experience, education } from '../../data/experience';
import { certificates } from '../../data/certificates';

const profile = {
  name: 'NGET MEAS',
  roleEn: 'Full Stack Developer',
  roleKh: 'អ្នកអភិវឌ្ឍន៍ Full Stack',
  locationEn: 'Phnom Penh, Cambodia',
  locationKh: 'ភ្នំពេញ កម្ពុជា',
  email: 'measm2519@gmail.com',
  phone: '096 669 8074',
  github: 'https://github.com/NgetMeas22',
  linkedin: 'https://linkedin.com',
};

const languages = [
  { nameEn: 'Khmer', nameKh: 'ភាសាខ្មែរ', levelEn: 'Native', levelKh: 'ភាសាមាតុភាសា' },
  { nameEn: 'English', nameKh: 'ភាសាអង់គ្លេស', levelEn: 'Intermediate (ACE Level 7A)', levelKh: 'កម្រិតមធ្យម (ACE កម្រិត 7A)' },
];

const levelPercent = (level) => {
  switch (level) {
    case 'comfortable': return 85;
    case 'familiar': return 60;
    case 'learning': return 35;
    default: return 50;
  }
};

export default function Resume() {
  const { t, language } = useLanguage();
  const isKh = language === 'kh';

  useEffect(() => {
    AOS.init({ duration: 800, once: true, easing: 'ease-out-cubic' });
  }, []);

  const featuredProjects = projects.filter((p) => p.featured).slice(0, 5);
  const groupedSkills = skillCategories
    .filter((c) => c.id !== 'all')
    .map((cat) => ({
      ...cat,
      items: skills.filter((s) => s.category === cat.id),
    }));

  return (
    <section
      id="resume"
      className="grid-bg grid-pattern relative min-h-screen overflow-hidden pt-28 lg:pt-32 pb-20 px-4 sm:px-6 lg:px-8"
    >
      <style>{`
        @media print {
          body * { visibility: hidden; }
          #resume, #resume * { visibility: visible; }
          #resume {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            background: white !important;
            color: #1e293b !important;
            padding: 20px;
          }
          #resume .no-print { display: none !important; }
          #resume .card {
            border: 1px solid #e2e8f0 !important;
            box-shadow: none !important;
            background: white !important;
            break-inside: avoid;
          }
          #resume h1, #resume h2, #resume h3 {
            color: #1e293b !important;
            background: none !important;
            -webkit-text-fill-color: #1e293b !important;
          }
          #resume p, #resume span, #resume li {
            color: #334155 !important;
          }
        }
      `}</style>

      <div className="mx-auto max-w-5xl">
        {/* Page Header */}
        <div className="mb-16 text-center" data-aos="fade-up">
          <span className="cyber-badge mb-4 inline-flex items-center gap-2">
            <Code className="h-3.5 w-3.5" />
            {`>_ resume.init`}
          </span>
          <h1 className="section-title font-mono text-3xl sm:text-4xl lg:text-5xl">
            {t.resume.title}
            <span className="text-primary"> // </span>
            <span className="animate-flicker text-emerald-400">&gt;_</span>
          </h1>
          <p className="section-subtitle mt-3 text-lg">{t.resume.subtitle}</p>

          <div className="no-print mt-6 flex flex-wrap items-center justify-center gap-3">
            <a
              href="/CV_NgetMeas.pdf"
              download="CV_NgetMeas.pdf"
              className="btn-primary inline-flex items-center gap-2 font-mono"
            >
              <Download size={16} />
              {t.resume.downloadCV}
            </a>
            <button
              type="button"
              onClick={() => window.print()}
              className="btn-outline inline-flex items-center gap-2 font-mono"
            >
              <Printer size={16} />
              Print
            </button>
          </div>
        </div>

        {/* Profile Section */}
        <div className="card glass mb-8 p-8" data-aos="fade-up" data-aos-delay="100">
          <h2 className="mb-6 font-mono text-lg font-bold uppercase tracking-wider text-emerald-400">
            <span className="text-slate-600">{`>_`}</span> {t.resume.profile}
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { icon: Code, label: 'Name', value: profile.name },
              { icon: Briefcase, label: 'Role', value: isKh ? profile.roleKh : profile.roleEn },
              { icon: MapPin, label: 'Location', value: isKh ? profile.locationKh : profile.locationEn },
              { icon: Mail, label: 'Email', value: profile.email },
              { icon: Phone, label: 'Phone', value: profile.phone },
              { icon: Globe, label: 'GitHub', value: '@NgetMeas22', href: profile.github },
              { icon: null, label: 'LinkedIn', value: 'NGET MEAS', href: profile.linkedin, isLinkedIn: true },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-3 rounded-lg border border-slate-800 bg-slate-900/30 p-3"
              >
                <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
                  {item.isLinkedIn ? (
                    <LinkedInIcon size={16} />
                  ) : item.icon ? (
                    <item.icon className="h-4 w-4" />
                  ) : null}
                </div>
                <div className="min-w-0">
                  <p className="font-mono text-[10px] uppercase tracking-wider text-slate-500">
                    {item.label}
                  </p>
                  {item.href ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-sm text-emerald-400 hover:underline"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="truncate font-mono text-sm text-slate-200">
                      {item.value}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education Section */}
        <div className="card glass mb-8 p-8" data-aos="fade-up" data-aos-delay="200">
          <h2 className="mb-6 font-mono text-lg font-bold uppercase tracking-wider text-emerald-400">
            <span className="text-slate-600">{`>_`}</span> {t.resume.education}
          </h2>
          <div className="space-y-5">
            {education.map((edu, index) => (
              <div
                key={edu.id}
                className="rounded-lg border border-slate-800 bg-slate-900/30 p-5"
                data-aos="fade-up"
                data-aos-delay={250 + index * 100}
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                  <h3 className="font-mono font-bold text-slate-200">
                    {isKh ? edu.degreeKh : edu.degree}
                  </h3>
                  {edu.expectedGraduation && (
                    <span className="tag mt-2 sm:mt-0 inline-block w-fit">
                      {t.education.expectedGraduation}: {edu.expectedGraduation}
                    </span>
                  )}
                </div>
                <p className="font-mono text-sm font-medium text-emerald-400">
                  {isKh ? edu.institutionKh : edu.institution}
                </p>
                <p className="mt-1 font-mono text-xs text-slate-500">
                  {isKh ? edu.statusKh : edu.status}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {(isKh ? edu.courseworkKh : edu.coursework).map((course, i) => (
                    <span key={i} className="tag text-xs">{course}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills Section */}
        <div className="card glass mb-8 p-8" data-aos="fade-up" data-aos-delay="300">
          <h2 className="mb-6 font-mono text-lg font-bold uppercase tracking-wider text-emerald-400">
            <span className="text-slate-600">{`>_`}</span> {t.resume.skills}
          </h2>
          <div className="space-y-6">
            {groupedSkills.map((group) => (
              <div key={group.id}>
                <h3 className="mb-3 font-mono text-xs font-semibold uppercase tracking-wider text-slate-500">
                  {isKh ? group.labelKh : group.label}
                </h3>
                <div className="space-y-2.5">
                  {group.items.map((skill) => (
                    <div key={skill.name}>
                      <div className="mb-1 flex items-center justify-between">
                        <span className="font-mono text-xs text-slate-300">
                          <span
                            className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full"
                            style={{ backgroundColor: skill.color }}
                          />
                          {skill.name}
                        </span>
                        <span className="font-mono text-[10px] text-slate-500">
                          {skill.level}
                        </span>
                      </div>
                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all duration-500"
                          style={{ width: `${levelPercent(skill.level)}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Experience Section */}
        <div className="card glass mb-8 p-8" data-aos="fade-up" data-aos-delay="400">
          <h2 className="mb-6 font-mono text-lg font-bold uppercase tracking-wider text-emerald-400">
            <span className="text-slate-600">{`>_`}</span> {t.resume.experience}
          </h2>
          <div className="space-y-5">
            {experience.map((exp) => (
              <div
                key={exp.id}
                className="rounded-lg border border-slate-800 bg-slate-900/30 p-5"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                  <h3 className="font-mono font-bold text-slate-200">
                    {isKh ? exp.titleKh : exp.title}
                  </h3>
                  <span className="tag mt-2 sm:mt-0 inline-block w-fit">
                    {isKh ? exp.periodKh : exp.period}
                  </span>
                </div>
                <p className="font-mono text-sm font-medium text-emerald-400">
                  {isKh ? exp.companyKh : exp.company} — {isKh ? exp.typeKh : exp.type}
                </p>
                <p className="mt-2 font-mono text-xs leading-relaxed text-slate-400">
                  {isKh ? exp.descriptionKh : exp.description}
                </p>
                <div className="mt-3">
                  <p className="mb-2 font-mono text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                    {t.experience.responsibilities}
                  </p>
                  <ul className="grid gap-1 sm:grid-cols-2">
                    {(isKh ? exp.responsibilitiesKh : exp.responsibilities).map((resp, i) => (
                      <li key={i} className="flex items-start gap-2 font-mono text-xs text-slate-400">
                        <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-500" />
                        {resp}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Projects Section */}
        <div className="card glass mb-8 p-8" data-aos="fade-up" data-aos-delay="500">
          <h2 className="mb-6 font-mono text-lg font-bold uppercase tracking-wider text-emerald-400">
            <span className="text-slate-600">{`>_`}</span> {t.resume.projects}
          </h2>
          <div className="space-y-3">
            {featuredProjects.map((project, index) => (
              <div
                key={project.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between rounded-lg border border-slate-800 bg-slate-900/30 p-4"
                data-aos="fade-up"
                data-aos-delay={550 + index * 80}
              >
                <div className="min-w-0 flex-1">
                  <h3 className="font-mono font-bold text-slate-200">
                    {project.title}
                  </h3>
                  <p className="mt-1 font-mono text-xs text-slate-400">
                    {isKh ? project.descriptionKh : project.description}
                  </p>
                </div>
                <div className="mt-2 flex flex-wrap gap-1.5 sm:ml-4 sm:mt-0">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="tag text-xs">{tech}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certificates Section */}
        <div className="card glass mb-8 p-8" data-aos="fade-up" data-aos-delay="600">
          <h2 className="mb-6 font-mono text-lg font-bold uppercase tracking-wider text-emerald-400">
            <span className="text-slate-600">{`>_`}</span> {t.resume.certificates}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {certificates.map((cert, index) => (
              <div
                key={cert.id}
                className="rounded-lg border border-slate-800 bg-slate-900/30 p-5"
                data-aos="zoom-in"
                data-aos-delay={650 + index * 80}
              >
                <h3 className="mb-1 font-mono font-bold text-slate-200">
                  {isKh ? cert.titleKh : cert.title}
                </h3>
                <p className="font-mono text-sm font-medium text-emerald-400">
                  {isKh ? cert.organizationKh : cert.organization}
                </p>
                <p className="mt-1 font-mono text-xs text-slate-500">
                  {cert.date}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Languages Section */}
        <div className="card glass mb-8 p-8" data-aos="fade-up" data-aos-delay="700">
          <h2 className="mb-6 font-mono text-lg font-bold uppercase tracking-wider text-emerald-400">
            <span className="text-slate-600">{`>_`}</span> {t.resume.languages}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {languages.map((lang, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-900/30 p-4"
              >
                <div>
                  <h3 className="font-mono font-bold text-slate-200">
                    {isKh ? lang.nameKh : lang.nameEn}
                  </h3>
                  <p className="mt-1 font-mono text-xs text-slate-500">
                    {isKh ? lang.levelKh : lang.levelEn}
                  </p>
                </div>
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
                  <Globe className="h-5 w-5" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="card glass mb-8 p-8 text-center" data-aos="fade-up" data-aos-delay="800">
          <h2 className="mb-6 font-mono text-lg font-bold uppercase tracking-wider text-emerald-400">
            <span className="text-slate-600">{`>_`}</span> {t.resume.contact}
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={`mailto:${profile.email}`}
              className="no-print btn-outline inline-flex items-center gap-2 font-mono"
            >
              <Mail size={16} />
              {profile.email}
            </a>
            <a
              href={`tel:${profile.phone}`}
              className="no-print btn-outline inline-flex items-center gap-2 font-mono"
            >
              <Phone size={16} />
              {profile.phone}
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="no-print btn-outline inline-flex items-center gap-2 font-mono"
            >
              <GitHubIcon size={16} />
              GitHub
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="no-print btn-outline inline-flex items-center gap-2 font-mono"
            >
              <LinkedInIcon size={16} />
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
