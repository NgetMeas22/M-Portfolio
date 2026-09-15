import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Eye, Search, ExternalLink } from 'lucide-react';
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

function Projects() {
  const { t, language } = useLanguage();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const isDark = theme === 'dark';

  useEffect(() => {
    AOS.init({ duration: 800, easing: 'ease-out-cubic', once: true, offset: 60 });
  }, []);

  useEffect(() => {
    AOS.refresh();
  }, [activeFilter, searchQuery]);

  const categoryLabel = (cat) => (cat === 'Team Project' ? t.projects.teamProject : cat);

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
    <section className="grid-bg grid-pattern relative min-h-screen overflow-hidden pt-28 lg:pt-32 pb-20">
      <div className="mx-auto w-full max-w-7xl px-6">

        <div className="mb-14 text-center" data-aos="fade-up">
          <span className="cyber-badge mb-4 inline-flex items-center gap-2">
            <Eye className="h-3.5 w-3.5" />
            {`>_ projects.init`}
          </span>
          <h1 className="section-title font-mono text-3xl sm:text-4xl lg:text-5xl">
            {t.projects.title}
          </h1>
          <p className="section-subtitle mt-3 text-lg">{t.projects.subtitle}</p>
        </div>

        <div
          className="mx-auto mb-10 max-w-xl"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <div
            className={`relative flex items-center rounded-lg border transition-all duration-300 focus-within:ring-2 ${
              isDark
                ? 'border-slate-800 bg-dark-800/60 focus-within:border-primary/50 focus-within:ring-primary/20'
                : 'border-slate-300 bg-white/80 focus-within:border-emerald-600/50 focus-within:ring-emerald-600/20'
            }`}
          >
            <Search
              className={`pointer-events-none ml-4 h-4 w-4 ${
                isDark ? 'text-secondary' : 'text-slate-400'
              }`}
            />
            <input
              type="text"
              placeholder={t.projects.search}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full bg-transparent px-4 py-3 font-mono text-sm outline-none ${
                isDark
                  ? 'text-slate-200 placeholder-slate-500'
                  : 'text-slate-800 placeholder-slate-400'
              }`}
            />
            <span className={`terminal-cursor mr-4 ${isDark ? '' : 'bg-green-600'}`} />
          </div>
        </div>

        <div
          className="mb-12 flex flex-wrap items-center justify-center gap-2"
          data-aos="fade-up"
          data-aos-delay="150"
        >
          {filterTabs.map((tab) => {
            const active = activeFilter === tab.id;
            const label =
              tab.id === 'all'
                ? t.projects.all
                : tab.id === 'Team Project'
                  ? t.projects.teamProject
                  : language === 'kh'
                    ? tab.labelKh
                    : tab.label;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveFilter(tab.id)}
                className={`btn-outline cursor-pointer rounded-full px-4 py-1.5 font-mono text-xs font-medium tracking-wide transition-all duration-300 active:scale-95 ${
                  active ? 'btn-primary' : ''
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        <div
          key={`${activeFilter}-${searchQuery}`}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filteredProjects.map((project, index) => (
            <article
              key={project.id}
              data-aos="fade-up"
              data-aos-delay={Math.min(index * 50, 300)}
              className="card glass glass-sm card-hover glow-sm group relative flex flex-col overflow-hidden"
            >
              <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-emerald-400/60 to-transparent" />

              <div className="relative flex flex-1 flex-col gap-4 p-6">
                <div className="flex flex-wrap items-center gap-1.5">
                  {project.category.map((cat) => (
                    <span key={cat} className="tag font-mono">
                      {categoryLabel(cat)}
                    </span>
                  ))}
                </div>

                <h3 className="font-mono text-lg font-bold tracking-tight text-slate-100 transition-colors group-hover:text-emerald-400">
                  {project.title}
                </h3>

                <p className="text-sm leading-relaxed text-secondary line-clamp-3">
                  {language === 'kh' ? project.descriptionKh : project.description}
                </p>

                <div className="mt-auto flex flex-wrap gap-1.5">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="tag font-mono text-[11px]">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-2 flex items-center justify-between gap-2 border-t border-white/10 pt-4">
                  <button
                    type="button"
                    onClick={() => navigate(`/projects/${project.id}`)}
                    className="underline-glow inline-flex items-center gap-2 font-mono text-sm text-emerald-400 transition-colors hover:text-emerald-300 hover:underline"
                  >
                    {t.projects.viewDetails}
                    <span aria-hidden="true">&rarr;</span>
                  </button>
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="tag inline-flex items-center gap-1.5 font-mono"
                      title={t.projects.viewLive}
                    >
                      <ExternalLink className="h-3 w-3" />
                      {t.projects.viewLive}
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="py-20 text-center" data-aos="fade-up">
            <p className="font-mono text-lg text-slate-500">
              {`>_ 0_results.matched`}
              <span className="terminal-cursor" />
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default Projects;