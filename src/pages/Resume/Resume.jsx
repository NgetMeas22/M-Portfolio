import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import {
  Download,
  GraduationCap,
  Code,
  Briefcase,
  Folder,
  Award,
  Globe,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react';
import { GitHubIcon, LinkedInIcon } from '../../components/SocialIcons.jsx';
import { useLanguage } from '../../hooks/useLanguage';
import { useTheme } from '../../hooks/useTheme';
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

export default function Resume() {
  const { t, language } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
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

  const sectionCard = (extra = '') =>
    `rounded-2xl p-8 mb-8 transition-all duration-300 ${
      isDark
        ? `bg-white/5 backdrop-blur-lg border border-white/10 hover:border-primary/30 hover:shadow-[0_0_15px_rgba(0,255,65,0.15)] ${extra}`
        : `bg-gray-50 shadow-lg hover:shadow-xl border border-gray-100 ${extra}`
    }`;

  const sectionIcon = (gradient) =>
    `w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center`;

  return (
    <section
      id="resume"
      className={`min-h-screen py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
        isDark ? 'bg-[#0a0a0a]' : 'bg-white'
      }`}
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
          #resume .rounded-2xl {
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

      <div className="max-w-5xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <h1
            className={`text-4xl sm:text-5xl font-bold mb-4 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}
          >
            {t.resume.title}
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-6 rounded-full" />
          <p
            className={`text-lg max-w-2xl mx-auto mb-8 ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            {t.resume.subtitle}
          </p>
          <a
            href="/NgetMeas_CV.pdf"
            download
            className={`no-print btn-primary inline-flex items-center gap-2`}
          >
            <Download size={18} />
            {t.resume.downloadCV}
          </a>
        </div>

        {/* Profile Section */}
        <div className={sectionCard()} data-aos="fade-up" data-aos-delay="100">
          <div className="flex items-center gap-3 mb-6">
            <div className={sectionIcon('from-primary to-accent')}>
              <Code className="w-6 h-6 text-white" />
            </div>
            <h2
              className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}
            >
              {t.resume.profile}
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className={`flex items-center gap-3 p-3 rounded-xl ${isDark ? 'bg-white/5' : 'bg-white'}`}>
              <Code className={`w-5 h-5 ${isDark ? 'text-primary' : 'text-green-600'}`} />
              <div>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Name</p>
                <p className={`font-semibold ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>{profile.name}</p>
              </div>
            </div>
            <div className={`flex items-center gap-3 p-3 rounded-xl ${isDark ? 'bg-white/5' : 'bg-white'}`}>
              <Briefcase className={`w-5 h-5 ${isDark ? 'text-primary' : 'text-green-600'}`} />
              <div>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Role</p>
                <p className={`font-semibold ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>{isKh ? profile.roleKh : profile.roleEn}</p>
              </div>
            </div>
            <div className={`flex items-center gap-3 p-3 rounded-xl ${isDark ? 'bg-white/5' : 'bg-white'}`}>
              <MapPin className={`w-5 h-5 ${isDark ? 'text-primary' : 'text-green-600'}`} />
              <div>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Location</p>
                <p className={`font-semibold ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>{isKh ? profile.locationKh : profile.locationEn}</p>
              </div>
            </div>
            <div className={`flex items-center gap-3 p-3 rounded-xl ${isDark ? 'bg-white/5' : 'bg-white'}`}>
              <Mail className={`w-5 h-5 ${isDark ? 'text-primary' : 'text-green-600'}`} />
              <div>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Email</p>
                <p className={`font-semibold ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>{profile.email}</p>
              </div>
            </div>
            <div className={`flex items-center gap-3 p-3 rounded-xl ${isDark ? 'bg-white/5' : 'bg-white'}`}>
              <Phone className={`w-5 h-5 ${isDark ? 'text-primary' : 'text-green-600'}`} />
              <div>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Phone</p>
                <p className={`font-semibold ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>{profile.phone}</p>
              </div>
            </div>
            <div className={`flex items-center gap-3 p-3 rounded-xl ${isDark ? 'bg-white/5' : 'bg-white'}`}>
              <Globe className={`w-5 h-5 ${isDark ? 'text-primary' : 'text-green-600'}`} />
              <div>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>GitHub</p>
                <a href={profile.github} target="_blank" rel="noopener noreferrer" className={`font-semibold hover:underline ${isDark ? 'text-primary' : 'text-green-600'}`}>@NgetMeas22</a>
              </div>
            </div>
            <div className={`flex items-center gap-3 p-3 rounded-xl sm:col-span-2 ${isDark ? 'bg-white/5' : 'bg-white'}`}>
              <LinkedInIcon size={20} className={`${isDark ? 'text-primary' : 'text-green-600'}`} />
              <div>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>LinkedIn</p>
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className={`font-semibold hover:underline ${isDark ? 'text-primary' : 'text-green-600'}`}>NGET MEAS</a>
              </div>
            </div>
          </div>
        </div>

        {/* Education Section */}
        <div className={sectionCard()} data-aos="fade-up" data-aos-delay="200">
          <div className="flex items-center gap-3 mb-6">
            <div className={sectionIcon('from-emerald-400 to-green-500')}>
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <h2
              className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}
            >
              {t.resume.education}
            </h2>
          </div>
          <div className="space-y-6">
            {education.map((edu, index) => (
              <div
                key={edu.id}
                className={`p-5 rounded-xl transition-all duration-300 ${
                  isDark ? 'bg-white/5 hover:bg-white/8' : 'bg-white hover:bg-white shadow-sm'
                }`}
                data-aos="fade-up"
                data-aos-delay={250 + index * 100}
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                  <h3 className={`text-lg font-bold ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                    {isKh ? edu.degreeKh : edu.degree}
                  </h3>
                  {edu.expectedGraduation && (
                    <span className={`text-sm px-3 py-1 rounded-full mt-2 sm:mt-0 inline-block w-fit ${
                      isDark ? 'bg-primary/10 border border-primary/30 text-primary' : 'bg-green-100 text-green-700'
                    }`}>
                      {t.education.expectedGraduation}: {edu.expectedGraduation}
                    </span>
                  )}
                </div>
                <p className={`font-medium ${isDark ? 'text-primary' : 'text-green-600'}`}>
                  {isKh ? edu.institutionKh : edu.institution}
                </p>
                <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {isKh ? edu.statusKh : edu.status}
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {(isKh ? edu.courseworkKh : edu.coursework).map((course, i) => (
                    <span key={i} className="tag text-xs">{course}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills Section */}
        <div className={sectionCard()} data-aos="fade-up" data-aos-delay="300">
          <div className="flex items-center gap-3 mb-6">
            <div className={sectionIcon('from-green-400 to-primary')}>
              <Code className="w-6 h-6 text-white" />
            </div>
            <h2
              className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}
            >
              {t.resume.skills}
            </h2>
          </div>
          <div className="space-y-6">
            {groupedSkills.map((group) => (
              <div key={group.id}>
                <h3
                  className={`text-sm font-semibold uppercase tracking-wider mb-3 ${
                    isDark ? 'text-gray-400' : 'text-gray-500'
                  }`}
                >
                  {isKh ? group.labelKh : group.label}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <span
                      key={skill.name}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 ${
                        isDark
                          ? 'bg-white/5 border border-white/10 text-gray-300 hover:border-primary/30 hover:shadow-[0_0_15px_rgba(0,255,65,0.15)]'
                          : 'bg-white border border-gray-200 text-gray-700 hover:border-green-400/30 shadow-sm'
                      }`}
                    >
                      <span
                        className="inline-block w-2 h-2 rounded-full mr-2"
                        style={{ backgroundColor: skill.color }}
                      />
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Experience Section */}
        <div className={sectionCard()} data-aos="fade-up" data-aos-delay="400">
          <div className="flex items-center gap-3 mb-6">
            <div className={sectionIcon('from-emerald-500 to-green-500')}>
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <h2
              className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}
            >
              {t.resume.experience}
            </h2>
          </div>
          {experience.map((exp) => (
            <div
              key={exp.id}
              className={`p-5 rounded-xl transition-all duration-300 ${
                isDark ? 'bg-white/5 hover:bg-white/8' : 'bg-white hover:bg-white shadow-sm'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                <h3 className={`text-lg font-bold ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                  {isKh ? exp.titleKh : exp.title}
                </h3>
                <span className={`text-sm px-3 py-1 rounded-full mt-2 sm:mt-0 inline-block w-fit ${
                  isDark ? 'bg-primary/10 border border-primary/30 text-primary' : 'bg-green-100 text-green-700'
                }`}>
                  {isKh ? exp.periodKh : exp.period}
                </span>
              </div>
              <p className={`font-medium ${isDark ? 'text-primary' : 'text-green-600'}`}>
                {isKh ? exp.companyKh : exp.company} — {isKh ? exp.typeKh : exp.type}
              </p>
              <p className={`text-sm mt-2 leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {isKh ? exp.descriptionKh : exp.description}
              </p>
              <div className="mt-3">
                <p className={`text-xs font-semibold uppercase tracking-wider mb-2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                  {t.experience.responsibilities}
                </p>
                <ul className="grid sm:grid-cols-2 gap-1">
                  {(isKh ? exp.responsibilitiesKh : exp.responsibilities).map((resp, i) => (
                    <li key={i} className={`text-sm flex items-start gap-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${isDark ? 'bg-primary' : 'bg-green-500'}`} />
                      {resp}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Projects Section */}
        <div className={sectionCard()} data-aos="fade-up" data-aos-delay="500">
          <div className="flex items-center gap-3 mb-6">
            <div className={sectionIcon('from-primary to-emerald-500')}>
              <Folder className="w-6 h-6 text-white" />
            </div>
            <h2
              className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}
            >
              {t.resume.projects}
            </h2>
          </div>
          <div className="space-y-4">
            {featuredProjects.map((project, index) => (
              <div
                key={project.id}
                className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl transition-all duration-300 ${
                  isDark ? 'bg-white/5 hover:bg-white/8' : 'bg-white hover:bg-white shadow-sm'
                }`}
                data-aos="fade-up"
                data-aos-delay={550 + index * 80}
              >
                <div>
                  <h3 className={`font-bold ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                    {project.title}
                  </h3>
                  <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {isKh ? project.descriptionKh : project.description}
                  </p>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-3 sm:mt-0 sm:ml-4">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="tag text-xs">{tech}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certificates Section */}
        <div className={sectionCard()} data-aos="fade-up" data-aos-delay="600">
          <div className="flex items-center gap-3 mb-6">
            <div className={sectionIcon('from-amber-500 to-yellow-500')}>
              <Award className="w-6 h-6 text-white" />
            </div>
            <h2
              className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}
            >
              {t.resume.certificates}
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {certificates.map((cert, index) => (
              <div
                key={cert.id}
                className={`p-5 rounded-xl transition-all duration-300 ${
                  isDark ? 'bg-white/5 hover:bg-white/8' : 'bg-white hover:bg-white shadow-sm'
                }`}
                data-aos="zoom-in"
                data-aos-delay={650 + index * 80}
              >
                <h3 className={`font-bold mb-1 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                  {isKh ? cert.titleKh : cert.title}
                </h3>
                <p className={`text-sm font-medium ${isDark ? 'text-primary' : 'text-green-600'}`}>
                  {isKh ? cert.organizationKh : cert.organization}
                </p>
                <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {cert.date}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Languages Section */}
        <div className={sectionCard()} data-aos="fade-up" data-aos-delay="700">
          <div className="flex items-center gap-3 mb-6">
            <div className={sectionIcon('from-emerald-400 to-green-400')}>
              <Globe className="w-6 h-6 text-white" />
            </div>
            <h2
              className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}
            >
              {t.resume.languages}
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {languages.map((lang, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-4 rounded-xl transition-all duration-300 ${
                  isDark ? 'bg-white/5 hover:bg-white/8' : 'bg-white hover:bg-white shadow-sm'
                }`}
              >
                <div>
                  <h3 className={`font-bold ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                    {isKh ? lang.nameKh : lang.nameEn}
                  </h3>
                  <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {isKh ? lang.levelKh : lang.levelEn}
                  </p>
                </div>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  isDark ? 'bg-primary/10' : 'bg-green-100'
                }`}>
                  <Globe className={`w-6 h-6 ${isDark ? 'text-primary' : 'text-green-600'}`} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className={`${sectionCard()} text-center`} data-aos="fade-up" data-aos-delay="800">
          <div className="flex items-center gap-3 mb-6 justify-center">
            <div className={sectionIcon('from-primary to-accent')}>
              <Mail className="w-6 h-6 text-white" />
            </div>
            <h2
              className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}
            >
              {t.resume.contact}
            </h2>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            <a
              href={`mailto:${profile.email}`}
              className={`no-print flex items-center gap-2 px-5 py-3 rounded-xl transition-all duration-300 ${
                isDark
                  ? 'bg-white/5 border border-white/10 hover:border-primary/30 text-gray-300 hover:text-primary hover:shadow-[0_0_15px_rgba(0,255,65,0.15)]'
                  : 'bg-white border border-gray-200 hover:border-green-400/30 text-gray-700 hover:text-green-600 shadow-sm'
              }`}
            >
              <Mail size={18} />
              {profile.email}
            </a>
            <a
              href={`tel:${profile.phone}`}
              className={`no-print flex items-center gap-2 px-5 py-3 rounded-xl transition-all duration-300 ${
                isDark
                  ? 'bg-white/5 border border-white/10 hover:border-primary/30 text-gray-300 hover:text-primary hover:shadow-[0_0_15px_rgba(0,255,65,0.15)]'
                  : 'bg-white border border-gray-200 hover:border-green-400/30 text-gray-700 hover:text-green-600 shadow-sm'
              }`}
            >
              <Phone size={18} />
              {profile.phone}
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className={`no-print flex items-center gap-2 px-5 py-3 rounded-xl transition-all duration-300 ${
                isDark
                  ? 'bg-white/5 border border-white/10 hover:border-primary/30 text-gray-300 hover:text-primary hover:shadow-[0_0_15px_rgba(0,255,65,0.15)]'
                  : 'bg-white border border-gray-200 hover:border-green-400/30 text-gray-700 hover:text-green-600 shadow-sm'
              }`}
            >
              <GitHubIcon size={18} />
              GitHub
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={`no-print flex items-center gap-2 px-5 py-3 rounded-xl transition-all duration-300 ${
                isDark
                  ? 'bg-white/5 border border-white/10 hover:border-primary/30 text-gray-300 hover:text-primary hover:shadow-[0_0_15px_rgba(0,255,65,0.15)]'
                  : 'bg-white border border-gray-200 hover:border-green-400/30 text-gray-700 hover:text-green-600 shadow-sm'
              }`}
            >
              <LinkedInIcon size={18} />
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}