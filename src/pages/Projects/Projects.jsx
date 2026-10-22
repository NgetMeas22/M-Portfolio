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
  Activity,
  Sparkles,
  Users,
  Lock,
  PlayCircle,
} from 'lucide-react';
import { GitHubIcon } from '../../components/SocialIcons.jsx';
import ProjectCover from '../../components/ProjectCover/ProjectCover.jsx';
import VideoModal from '../../components/VideoModal/VideoModal.jsx';
import { projects } from '../../data/projects';
import { useLanguage } from '../../hooks/useLanguage';
import { useTheme } from '../../hooks/useTheme';
import PageBackground from '../../components/PageBackground/PageBackground.jsx';

const filterTabs = [
  { id: 'all', label: 'All', labelKh: 'ទាំងអស់' },
  { id: 'Full Stack', label: 'Full Stack', labelKh: 'Full Stack' },
  { id: 'Next.js', label: 'Next.js', labelKh: 'Next.js' },
  { id: 'Express', label: 'Express', labelKh: 'Express' },
  { id: 'PostgreSQL', label: 'PostgreSQL', labelKh: 'PostgreSQL' },
  { id: 'React', label: 'React', labelKh: 'React' },
  { id: 'Laravel', label: 'Laravel', labelKh: 'Laravel' },
  { id: 'Spring Boot', label: 'Spring Boot', labelKh: 'Spring Boot' },
  { id: 'Team Project', label: 'Team Project', labelKh: 'គម្រោងក្រុម' }
];

export default function Projects() {
  const { t, language } = useLanguage();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [videoProject, setVideoProject] = useState(null);

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
      className={`grid-bg grid-pattern relative min-h-screen pt-20 sm:pt-28 lg:pt-36 pb-12 sm:pb-24 font-mono transition-colors duration-300 overflow-hidden ${
        isDark
          ? 'bg-[#030504] text-emerald-400 selection:bg-emerald-500 selection:text-black'
          : 'bg-[#f4f7f5] text-slate-900 selection:bg-emerald-600 selection:text-white'
      }`}
    >
      <PageBackground isDark={isDark} />

      <div className="relative mx-auto w-full max-w-7xl px-3.5 sm:px-6 lg:px-8">
        {/* HEADER */}
        <div className="mb-6 sm:mb-12 text-center" data-aos="fade-up">
          <span
            className={`mb-2 sm:mb-4 inline-flex items-center gap-1.5 sm:gap-2 border px-2.5 sm:px-3.5 py-1 text-[11px] sm:text-xs uppercase tracking-wider font-bold rounded ${
              isDark
                ? 'border-emerald-500/40 bg-emerald-950/40 text-emerald-300'
                : 'border-emerald-600/30 bg-emerald-100/60 text-emerald-900'
            }`}
          >
            <Terminal className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
            {'>_ projects.archive'}
          </span>
          <h1
            className={`text-2xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight ${
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
            className={`mx-auto mt-2 sm:mt-3 max-w-2xl text-xs sm:text-base ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}
          >
            {t.projects.subtitle}
          </p>
        </div>

        {/* REPO TELEMETRY STATUS BAR */}
        <div
          className={`mb-6 sm:mb-10 grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 border p-3 sm:p-5 rounded-xl ${
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
          className="mb-8 sm:mb-12 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2.5"
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
                className={`cursor-pointer rounded-lg border px-2.5 sm:px-3.5 py-1 sm:py-1.5 font-mono text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-200 active:scale-95 ${
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
          {filteredProjects.map((project, index) => {
            const visibleTech = project.technologies.slice(0, 3);
            const hiddenTech = project.technologies.length - visibleTech.length;
            const openDetails = () => navigate(`/projects/${project.slug || project.id}`);
            return (
              <article
                key={project.id}
                data-aos="fade-up"
                data-aos-delay={Math.min(index * 50, 300)}
                className={`group relative flex flex-col overflow-hidden rounded-2xl border transition-all duration-300 hover:-translate-y-1 ${
                  isDark
                    ? 'border-emerald-900/60 bg-black/90 hover:border-emerald-500/70 hover:shadow-[0_0_30px_rgba(16,185,129,0.15)]'
                    : 'border-emerald-200 bg-white hover:border-emerald-500 hover:shadow-lg shadow-xs'
                }`}
              >
                {/* COVER */}
                <button
                  type="button"
                  onClick={openDetails}
                  className="relative block w-full cursor-pointer text-left"
                  aria-label={`${t.projects.viewDetails}: ${project.title}`}
                >
                  <ProjectCover project={project} isDark={isDark} />

                  {/* BADGES OVER COVER */}
                  <div className="absolute bottom-2.5 left-3 right-3 flex flex-wrap items-center gap-1.5">
                    <span className="rounded border border-white/20 bg-black/70 px-1.5 py-0.5 text-[10px] font-bold text-white backdrop-blur-sm">
                      {project.year}
                    </span>
                    {project.isTeamProject && (
                      <span className="inline-flex items-center gap-1 rounded border border-emerald-400/40 bg-emerald-950/80 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-300 backdrop-blur-sm">
                        <Users className="h-3 w-3" />
                        {t.projects.teamProject}
                      </span>
                    )}
                    {project.builtWith && (
                      <span className="inline-flex items-center gap-1 rounded border border-orange-300/40 bg-black/70 px-1.5 py-0.5 text-[10px] font-bold text-orange-200 backdrop-blur-sm">
                        <Sparkles className="h-3 w-3" />
                        {language === 'kh' ? `បង្កើតជាមួយ ${project.builtWith}` : `Built with ${project.builtWith}`}
                      </span>
                    )}
                    {project.live && (
                      <span className="ml-auto inline-flex items-center gap-1 rounded border border-emerald-400/40 bg-black/70 px-1.5 py-0.5 text-[10px] font-bold uppercase text-emerald-300 backdrop-blur-sm">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                        Live
                      </span>
                    )}
                    {!project.live && project.video && (
                      <span className="ml-auto inline-flex items-center gap-1 rounded border border-sky-300/40 bg-black/70 px-1.5 py-0.5 text-[10px] font-bold uppercase text-sky-200 backdrop-blur-sm">
                        <PlayCircle className="h-3 w-3" />
                        Video
                      </span>
                    )}
                    {!project.live && !project.video && project.privateDemo && (
                      <span className="ml-auto inline-flex items-center gap-1 rounded border border-slate-400/40 bg-black/70 px-1.5 py-0.5 text-[10px] font-bold uppercase text-slate-200 backdrop-blur-sm">
                        <Lock className="h-3 w-3" />
                        {t.projects.privateDemo}
                      </span>
                    )}
                  </div>
                </button>

                {/* BODY */}
                <div className="flex flex-1 flex-col gap-2.5 p-5">
                  <h3
                    className={`line-clamp-2 text-base sm:text-lg font-bold uppercase leading-snug tracking-tight transition-colors ${
                      isDark
                        ? 'text-white group-hover:text-emerald-400'
                        : 'text-slate-900 group-hover:text-emerald-700'
                    }`}
                  >
                    {project.title}
                  </h3>

                  <p
                    className={`text-xs sm:text-[13px] leading-relaxed line-clamp-2 ${
                      isDark ? 'text-slate-400' : 'text-slate-600'
                    }`}
                  >
                    {language === 'kh' ? project.descriptionKh : project.description}
                  </p>

                  <div className="mt-auto flex flex-wrap gap-1.5 pt-1">
                    {visibleTech.map((tech) => (
                      <span
                        key={tech}
                        className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                          isDark
                            ? 'border-emerald-900/60 text-emerald-400 bg-black/60'
                            : 'border-emerald-200 text-emerald-800 bg-emerald-50/60'
                        }`}
                      >
                        #{tech}
                      </span>
                    ))}
                    {hiddenTech > 0 && (
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded border border-dashed ${
                          isDark ? 'border-emerald-900/60 text-slate-500' : 'border-slate-300 text-slate-500'
                        }`}
                        title={project.technologies.slice(3).join(', ')}
                      >
                        +{hiddenTech}
                      </span>
                    )}
                  </div>
                </div>

                {/* FOOTER */}
                <div
                  className={`flex items-center justify-between gap-2 border-t px-5 py-3 ${
                    isDark ? 'border-emerald-950' : 'border-emerald-100'
                  }`}
                >
                  <button
                    type="button"
                    onClick={openDetails}
                    className={`cursor-pointer inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider transition-all ${
                      isDark
                        ? 'text-emerald-400 hover:text-emerald-300'
                        : 'text-emerald-700 hover:text-emerald-800'
                    }`}
                  >
                    {t.projects.viewDetails}
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>

                  <div className="flex items-center gap-1.5">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex h-8 w-8 items-center justify-center rounded-lg border transition-all ${
                          isDark
                            ? 'border-emerald-900 bg-black text-slate-400 hover:border-emerald-500 hover:text-emerald-300'
                            : 'border-emerald-200 bg-white text-slate-600 hover:border-emerald-400 hover:text-emerald-800'
                        }`}
                        title={t.projects.viewGitHub}
                        aria-label={`${t.projects.viewGitHub}: ${project.title}`}
                      >
                        <GitHubIcon size={15} />
                      </a>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex h-8 items-center gap-1.5 rounded-lg border px-2.5 text-[11px] font-bold uppercase tracking-wider transition-all ${
                          isDark
                            ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500 hover:text-black'
                            : 'border-emerald-500 bg-emerald-600 text-white hover:bg-emerald-700'
                        }`}
                        title={t.projects.viewLive}
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                        {t.projects.viewLive}
                      </a>
                    )}
                    {project.video && (
                      <button
                        type="button"
                        onClick={() => setVideoProject(project)}
                        className={`inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-lg border px-2.5 text-[11px] font-bold uppercase tracking-wider transition-all ${
                          isDark
                            ? 'border-sky-400/50 bg-sky-500/10 text-sky-300 hover:bg-sky-500 hover:text-black'
                            : 'border-sky-500 bg-sky-600 text-white hover:bg-sky-700'
                        }`}
                      >
                        <PlayCircle className="h-3.5 w-3.5" />
                        {t.projects.watchDemo}
                      </button>
                    )}
                    {!project.live && !project.video && project.privateDemo && (
                      <span
                        className={`inline-flex h-8 items-center gap-1.5 rounded-lg border border-dashed px-2.5 text-[11px] font-bold uppercase tracking-wider ${
                          isDark ? 'border-slate-600 text-slate-500' : 'border-slate-300 text-slate-500'
                        }`}
                        title={t.projects.privateNote}
                      >
                        <PlayCircle className="h-3.5 w-3.5" />
                        {t.projects.videoSoon}
                      </span>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
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

      <VideoModal
        open={Boolean(videoProject)}
        onClose={() => setVideoProject(null)}
        src={videoProject?.video}
        title={videoProject?.title}
        isDark={isDark}
      />
    </section>
  );
}