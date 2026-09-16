import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { 
  Search, 
  ExternalLink, 
  Terminal, 
  ArrowUpRight, 
  FolderGit2, 
  Activity 
} from 'lucide-react';
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

export default function Projects() {
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
          project.description?.toLowerCase().includes(query) ||
          project.descriptionKh?.toLowerCase().includes(query) ||
          project.technologies?.some((tech) => tech.toLowerCase().includes(query))
      );
    }

    return result;
  }, [activeFilter, searchQuery]);

  return (
    <section
      id="projects"
      className={`relative min-h-screen pt-28 lg:pt-36 pb-24 font-mono transition-colors duration-300 overflow-hidden ${
        isDark ? 'bg-[#030504] text-emerald-400' : 'bg-[#f4f7f5] text-slate-900'
      }`}
    >
      {/* AMBIENT GLOW BACKDROPS */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div
          className="absolute -left-20 top-24 h-96 w-96 rounded-full blur-3xl animate-blob"
          style={{
            background: isDark
              ? 'radial-gradient(circle, rgba(16,185,129,0.08), transparent 70%)'
              : 'radial-gradient(circle, rgba(16,185,129,0.12), transparent 70%)',
          }}
        />
        <div
          className="absolute bottom-12 right-0 h-96 w-96 rounded-full blur-3xl animate-flicker"
          style={{
            background: isDark
              ? 'radial-gradient(circle, rgba(45,212,191,0.06), transparent 70%)'
              : 'radial-gradient(circle, rgba(20,184,166,0.1), transparent 70%)',
          }}
        />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* HEADER */}
        <div className="mb-12 text-center" data-aos="fade-up">
          <span
            className={`mb-4 inline-flex items-center gap-2 border px-3.5 py-1 text-xs uppercase tracking-wider font-bold ${
              isDark
                ? 'border-emerald-500/40 bg-emerald-950/40 text-emerald-300'
                : 'border-emerald-600/30 bg-emerald-100/60 text-emerald-900'
            }`}
          >
            <Terminal className="h-3.5 w-3.5" />
            {'>_ projects.archive'}
          </span>
          <h1
            className={`text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
            style={{
              textShadow: isDark
                ? '0 0 30px rgba(16, 185, 129, 0.45)'
                : '0 0 20px rgba(5, 150, 105, 0.15)',
            }}
          >
            {t.projects.title}
          </h1>
          <p
            className={`mx-auto mt-3 max-w-2xl text-base sm:text-lg ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}
          >
            {t.projects.subtitle}
          </p>
        </div>

        {/* REPO TELEMETRY STATUS BAR */}
        <div
          className={`mb-10 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 border p-4 sm:p-5 rounded-xl ${
            isDark
              ? 'border-emerald-500/30 bg-black/60 shadow-[0_0_20px_rgba(16,185,129,0.1)]'
              : 'border-emerald-200 bg-white shadow-xs'
          }`}
          data-aos="fade-up"
        >
          <div className="space-y-0.5">
            <span className={`text-[10px] uppercase tracking-wider font-bold ${isDark ? 'text-emerald-600' : 'text-emerald-700'}`}>
              TOTAL ARCHIVES
            </span>
            <div className={`text-xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {projects.length} REPOSITORIES
            </div>
          </div>
          <div className="space-y-0.5">
            <span className={`text-[10px] uppercase tracking-wider font-bold ${isDark ? 'text-emerald-600' : 'text-emerald-700'}`}>
              MATCHED TARGETS
            </span>
            <div className="text-xl font-black text-emerald-500 flex items-center gap-1.5">
              <FolderGit2 className="h-4 w-4" /> {filteredProjects.length} AVAILABLE
            </div>
          </div>
          <div className="space-y-0.5">
            <span className={`text-[10px] uppercase tracking-wider font-bold ${isDark ? 'text-emerald-600' : 'text-emerald-700'}`}>
              INDEX RUNTIME
            </span>
            <div className={`text-xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
              V2.4_ONLINE
            </div>
          </div>
          <div className="space-y-0.5">
            <span className={`text-[10px] uppercase tracking-wider font-bold ${isDark ? 'text-emerald-600' : 'text-emerald-700'}`}>
              INTEGRITY
            </span>
            <div className="text-xl font-black text-emerald-500 flex items-center gap-1.5">
              <Activity className="h-4 w-4 animate-spin" /> VERIFIED
            </div>
          </div>
        </div>

        {/* SEARCH CONSOLE BAR */}
        <div
          className="mx-auto mb-8 max-w-2xl"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <div
            className={`relative flex items-center rounded-xl border transition-all duration-300 focus-within:ring-2 ${
              isDark
                ? 'border-emerald-500/40 bg-black/80 focus-within:border-emerald-400 focus-within:ring-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.1)]'
                : 'border-emerald-200 bg-white focus-within:border-emerald-600 focus-within:ring-emerald-600/15 shadow-xs'
            }`}
          >
            <Search
              className={`pointer-events-none ml-4 h-4 w-4 shrink-0 ${
                isDark ? 'text-emerald-500' : 'text-emerald-700'
              }`}
            />
            <input
              type="text"
              placeholder={t.projects.search}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full bg-transparent px-4 py-3.5 font-mono text-sm outline-none ${
                isDark
                  ? 'text-slate-200 placeholder-slate-500'
                  : 'text-slate-800 placeholder-slate-400'
              }`}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className={`mr-3 text-xs uppercase font-bold px-2 py-1 rounded transition-colors ${
                  isDark ? 'text-emerald-400 hover:bg-emerald-950' : 'text-slate-500 hover:bg-slate-100'
                }`}
              >
                CLEAR
              </button>
            )}
            <span className={`h-4 w-2 mr-4 animate-pulse ${isDark ? 'bg-emerald-400' : 'bg-emerald-600'}`} />
          </div>
        </div>

        {/* CATEGORY FILTER SWITCHES */}
        <div
          className="mb-12 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5"
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
                className={`cursor-pointer rounded-lg border px-3.5 py-1.5 font-mono text-xs font-bold uppercase tracking-wider transition-all duration-200 active:scale-95 ${
                  active
                    ? isDark
                      ? 'border-emerald-400 bg-emerald-500/20 text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.3)]'
                      : 'border-emerald-600 bg-emerald-600 text-white shadow-sm'
                    : isDark
                      ? 'border-emerald-900/60 bg-black/60 text-slate-400 hover:border-emerald-500/40 hover:text-emerald-400'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-emerald-400 hover:bg-emerald-50/50'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* PROJECTS CARDS GRID */}
        <div
          key={`${activeFilter}-${searchQuery}`}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filteredProjects.map((project, index) => (
            <article
              key={project.id}
              data-aos="fade-up"
              data-aos-delay={Math.min(index * 50, 300)}
              className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border transition-all duration-300 p-6 sm:p-7 ${
                isDark
                  ? 'border-emerald-900/60 bg-black/90 hover:border-emerald-400 hover:shadow-[0_0_30px_rgba(16,185,129,0.15)]'
                  : 'border-emerald-200 bg-white hover:border-emerald-500 hover:shadow-lg shadow-xs'
              }`}
            >
              {/* RETICLES */}
              <span className={`absolute top-2 left-2 h-2.5 w-2.5 border-t-2 border-l-2 ${isDark ? 'border-emerald-500/40 group-hover:border-emerald-400' : 'border-emerald-300 group-hover:border-emerald-600'}`} />
              <span className={`absolute top-2 right-2 h-2.5 w-2.5 border-t-2 border-r-2 ${isDark ? 'border-emerald-500/40 group-hover:border-emerald-400' : 'border-emerald-300 group-hover:border-emerald-600'}`} />
              <span className={`absolute bottom-2 left-2 h-2.5 w-2.5 border-b-2 border-l-2 ${isDark ? 'border-emerald-500/40 group-hover:border-emerald-400' : 'border-emerald-300 group-hover:border-emerald-600'}`} />
              <span className={`absolute bottom-2 right-2 h-2.5 w-2.5 border-b-2 border-r-2 ${isDark ? 'border-emerald-500/40 group-hover:border-emerald-400' : 'border-emerald-300 group-hover:border-emerald-600'}`} />

              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap items-center gap-1.5">
                  {project.category.map((cat) => (
                    <span
                      key={cat}
                      className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded border ${
                        isDark
                          ? 'bg-emerald-950/50 border-emerald-800/60 text-emerald-400'
                          : 'bg-emerald-50 border-emerald-200 text-emerald-800'
                      }`}
                    >
                      {categoryLabel(cat)}
                    </span>
                  ))}
                </div>

                <h3
                  className={`text-lg sm:text-xl font-bold uppercase tracking-tight transition-colors ${
                    isDark
                      ? 'text-white group-hover:text-emerald-400'
                      : 'text-slate-900 group-hover:text-emerald-700'
                  }`}
                >
                  {project.title}
                </h3>

                <p
                  className={`text-xs sm:text-sm leading-relaxed line-clamp-3 ${
                    isDark ? 'text-slate-400' : 'text-slate-600'
                  }`}
                >
                  {language === 'kh' ? project.descriptionKh : project.description}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className={`text-[10px] font-mono px-2 py-0.5 border ${
                        isDark
                          ? 'border-emerald-950 text-emerald-600 bg-black/60'
                          : 'border-emerald-100 text-emerald-700 bg-emerald-50/50'
                      }`}
                    >
                      #{tech}
                    </span>
                  ))}
                </div>
              </div>

              <div
                className={`mt-6 pt-4 border-t flex items-center justify-between gap-3 ${
                  isDark ? 'border-emerald-950' : 'border-emerald-100'
                }`}
              >
                <button
                  type="button"
                  onClick={() => navigate(`/projects/${project.slug || project.id}`)}
                  className={`cursor-pointer inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider transition-all ${
                    isDark
                      ? 'text-emerald-400 hover:text-emerald-300 hover:underline'
                      : 'text-emerald-700 hover:text-emerald-800 hover:underline'
                  }`}
                >
                  {t.projects.viewDetails}
                  <ArrowUpRight className="h-4 w-4" />
                </button>

                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded border transition-all ${
                      isDark
                        ? 'border-emerald-900 bg-black text-emerald-400 hover:border-emerald-500'
                        : 'border-emerald-200 bg-emerald-50 text-emerald-800 hover:border-emerald-400 shadow-xs'
                    }`}
                    title={t.projects.viewLive}
                  >
                    <ExternalLink className="h-3 w-3" />
                    {t.projects.viewLive}
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>

        {/* EMPTY STATE */}
        {filteredProjects.length === 0 && (
          <div
            className={`mt-12 p-12 text-center rounded-2xl border ${
              isDark ? 'border-emerald-950 bg-black/60' : 'border-slate-200 bg-white'
            }`}
            data-aos="fade-up"
          >
            <p className="font-mono text-base sm:text-lg text-emerald-500">
              {`>_ 0_results.matched: `}
              <span className={isDark ? 'text-slate-400' : 'text-slate-600'}>
                "{searchQuery}"
              </span>
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setActiveFilter('all');
              }}
              className={`mt-4 px-4 py-2 text-xs font-bold uppercase border cursor-pointer rounded-lg transition-colors ${
                isDark
                  ? 'border-emerald-500 text-emerald-400 hover:bg-emerald-950/40'
                  : 'border-emerald-600 text-emerald-700 hover:bg-emerald-50'
              }`}
            >
              RESET_QUERY_FILTERS
            </button>
          </div>
        )}
      </div>
    </section>
  );
}