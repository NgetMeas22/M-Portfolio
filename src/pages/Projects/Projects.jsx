import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Search, ExternalLink, Eye, Calendar, Users } from 'lucide-react';
import { GitHubIcon } from '../../components/SocialIcons.jsx';
import { projects } from '../../data/projects';
import { useLanguage } from '../../hooks/useLanguage';
import { useTheme } from '../../hooks/useTheme';

const filterTabs = [
  { id: 'all', label: 'All', labelKh: 'ទាំងអស់' },
  { id: 'React', label: 'React', labelKh: 'React' },
  { id: 'Vue', label: 'Vue', labelKh: 'Vue' },
  { id: 'Laravel', label: 'Laravel', labelKh: 'Laravel' },
  { id: 'PHP', label: 'PHP', labelKh: 'PHP' },
  { id: 'Spring Boot', label: 'Spring Boot', labelKh: 'Spring Boot' },
  { id: 'Java', label: 'Java', labelKh: 'Java' },
  { id: 'MySQL', label: 'MySQL', labelKh: 'MySQL' },
  { id: 'Frontend', label: 'Frontend', labelKh: 'Frontend' },
  { id: 'Backend', label: 'Backend', labelKh: 'Backend' },
  { id: 'Full Stack', label: 'Full Stack', labelKh: 'Full Stack' },
  { id: 'Team Project', label: 'Team Project', labelKh: 'គម្រោងក្រុម' }
];

const gradients = [
  'from-primary to-emerald-600',
  'from-purple-500 to-pink-600',
  'from-emerald-500 to-teal-600',
  'from-orange-500 to-red-600',
  'from-indigo-500 to-purple-600',
  'from-pink-500 to-rose-600',
  'from-amber-500 to-orange-600',
  'from-teal-500 to-primary'
];

function getGradient(index) {
  return gradients[index % gradients.length];
}

function Projects() {
  const { t, language } = useLanguage();
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const isDark = theme === 'dark';

  useEffect(() => {
    AOS.init({ duration: 800, easing: 'ease-out-cubic', once: true, offset: 60 });
  }, []);

  useEffect(() => {
    AOS.refresh();
  }, [activeFilter, searchQuery]);

  const filteredProjects = useMemo(() => {
    let result = projects;

    if (activeFilter !== 'all') {
      result = result.filter((project) =>
        project.category.some(
          (cat) => cat.toLowerCase() === activeFilter.toLowerCase()
        )
      );
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (project) =>
          project.title.toLowerCase().includes(query) ||
          project.description.toLowerCase().includes(query) ||
          project.descriptionKh.toLowerCase().includes(query)
      );
    }

    return result;
  }, [activeFilter, searchQuery]);

  return (
    <>
      <style>
        {`
          @keyframes cardIn {
            from { opacity: 0; transform: translateY(24px) scale(0.96); }
            to { opacity: 1; transform: translateY(0) scale(1); }
          }
        `}
      </style>

      <section className="grid-bg relative min-h-screen pt-24 pb-20">
        <div className="mx-auto w-full max-w-7xl px-6">
          <div className="mb-12 text-center" data-aos="fade-up">
            <div
              className={`mb-3 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold tracking-wide ${
                isDark
                  ? 'border-primary/30 bg-primary/10 text-primary'
                  : 'border-green-500/30 bg-green-500/10 text-green-600'
              }`}
            >
              <Eye className="h-3.5 w-3.5" />
              {t.nav.projects}
            </div>
            <h1 className="section-title text-3xl sm:text-4xl lg:text-5xl">
              {t.projects.title}
            </h1>
            <p className="section-subtitle text-lg">{t.projects.subtitle}</p>
          </div>

          <div
            className="mx-auto mb-10 max-w-xl"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <div
              className={`relative flex items-center rounded-xl border transition-all duration-300 focus-within:ring-2 ${
                isDark
                  ? 'border-slate-700 bg-slate-900/50 focus-within:border-primary/50 focus-within:ring-primary/20'
                  : 'border-slate-200 bg-white focus-within:border-green-500/50 focus-within:ring-green-500/20'
              }`}
            >
              <Search
                className={`pointer-events-none ml-4 h-5 w-5 ${
                  isDark ? 'text-slate-500' : 'text-slate-400'
                }`}
              />
              <input
                type="text"
                placeholder={t.projects.search}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full bg-transparent px-4 py-3.5 text-sm outline-none ${
                  isDark
                    ? 'text-slate-200 placeholder-slate-500'
                    : 'text-slate-800 placeholder-slate-400'
                }`}
              />
            </div>
          </div>

          <div
            className="mb-12 flex flex-wrap items-center justify-center gap-2"
            data-aos="fade-up"
            data-aos-delay="150"
          >
            {filterTabs.map((tab) => {
              const active = activeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveFilter(tab.id)}
                  className={`cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300 active:scale-95 ${
                    active
                      ? isDark
                        ? 'border-primary/40 bg-primary/10 text-primary shadow-[0_0_15px_rgba(0,255,65,0.15)]'
                        : 'border-green-500/40 bg-green-500/10 text-green-600 shadow-[0_0_15px_rgba(0,200,65,0.1)]'
                      : isDark
                        ? 'border-slate-700 text-slate-400 hover:border-primary/40 hover:text-primary'
                        : 'border-slate-200 text-slate-500 hover:border-green-500/40 hover:text-green-600'
                  }`}
                >
                  {language === 'kh' ? tab.labelKh : tab.label}
                </button>
              );
            })}
          </div>

          <div key={`${activeFilter}-${searchQuery}`} className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project, index) => (
              <article
                key={project.id}
                data-aos="fade-up"
                data-aos-delay={Math.min(index * 50, 300)}
                className={`card group flex flex-col overflow-hidden transition-all duration-300 ${
                  isDark
                    ? 'border-slate-800 bg-slate-900/50 hover:border-primary/30 hover:shadow-[0_0_30px_rgba(0,255,65,0.08)]'
                    : 'border-slate-200 bg-white shadow-md hover:shadow-xl hover:border-green-200'
                }`}
                style={{ animation: `cardIn 0.45s ease ${index * 0.05}s both` }}
              >
                <div
                  className={`relative flex h-44 items-center justify-center bg-gradient-to-br ${getGradient(index)} overflow-hidden`}
                >
                  <span className="text-4xl font-bold text-white/20 select-none">
                    {project.title.charAt(0)}
                  </span>
                  <div
                    className={`absolute right-3 top-3 flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold backdrop-blur-md ${
                      isDark
                        ? 'bg-slate-900/70 text-slate-200'
                        : 'bg-white/80 text-slate-700'
                    }`}
                  >
                    <Calendar className="h-3 w-3" />
                    {project.year}
                  </div>
                  {project.isTeamProject && (
                    <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-amber-500/90 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-md">
                      <Users className="h-3 w-3" />
                      {t.projects.teamProject}
                    </div>
                  )}
                </div>

                <div className="flex flex-1 flex-col gap-3 p-5">
                  <h3
                    className={`text-lg font-bold transition-colors ${
                      isDark ? 'text-slate-100' : 'text-slate-800'
                    }`}
                  >
                    {project.title}
                  </h3>

                  <p
                    className={`text-sm leading-relaxed line-clamp-2 ${
                      isDark ? 'text-slate-400' : 'text-slate-500'
                    }`}
                  >
                    {language === 'kh' ? project.descriptionKh : project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className={`rounded-md border px-2 py-0.5 text-xs font-medium ${
                          isDark
                            ? 'border-slate-700 bg-slate-800 text-slate-300'
                            : 'border-slate-200 bg-slate-100 text-slate-600'
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto flex items-center gap-2 pt-3">
                    <Link
                      to={`/projects/${project.slug}`}
                      className={`inline-flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-300 ${
                        isDark
                          ? 'bg-primary/10 text-primary hover:bg-primary/20'
                          : 'bg-green-500/10 text-green-600 hover:bg-green-500/20'
                      }`}
                    >
                      <Eye className="h-4 w-4" />
                      {t.projects.viewDetails}
                    </Link>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center justify-center rounded-lg p-2.5 transition-all duration-300 ${
                        isDark
                          ? 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200'
                          : 'bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-700'
                      }`}
                      title={t.projects.viewGitHub}
                    >
                      <GitHubIcon size={16} />
                    </a>
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center justify-center rounded-lg p-2.5 transition-all duration-300 ${
                          isDark
                            ? 'bg-slate-800 text-slate-400 hover:bg-emerald-500/20 hover:text-emerald-400'
                            : 'bg-slate-100 text-slate-500 hover:bg-emerald-50 hover:text-emerald-600'
                        }`}
                        title={t.projects.viewLive}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div
              className="py-20 text-center"
              data-aos="fade-up"
            >
              <p
                className={`text-lg ${
                  isDark ? 'text-slate-500' : 'text-slate-400'
                }`}
              >
                {language === 'kh'
                  ? 'រកមិនឃើញគម្រោងទេ...'
                  : 'No projects found...'}
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default Projects;
