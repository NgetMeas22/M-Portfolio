import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  ArrowRight, 
  ExternalLink, 
  Calendar, 
  CheckCircle, 
  AlertTriangle,
  Terminal,
  Activity,
  FolderGit2,
  Layers,
  FileCode,
  Radio,
  Cpu
} from 'lucide-react';
import { GitHubIcon } from '../../components/SocialIcons.jsx';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useLanguage } from '../../hooks/useLanguage';
import { useTheme } from '../../hooks/useTheme';
import { projects } from '../../data/projects';

export default function ProjectDetails() {
  const { id } = useParams();
  const { language, t } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    AOS.init({ duration: 800, once: true, easing: 'ease-out-cubic' });
  }, []);

  // Match by slug or id fallback
  const project = projects.find(p => p.slug === id || String(p.id) === String(id));

  if (!project) {
    return (
      <section
        className={`relative flex min-h-screen items-center justify-center px-4 pt-28 lg:pt-36 pb-24 font-mono transition-colors duration-300 ${
          isDark ? 'bg-[#030504] text-emerald-400' : 'bg-[#f4f7f5] text-slate-900'
        }`}
      >
        <div className="text-center max-w-md p-8 border rounded-2xl border-dashed border-emerald-500/40 bg-black/40">
          <span className="inline-flex items-center gap-2 border px-3 py-1 text-xs uppercase font-bold border-rose-500/40 bg-rose-950/40 text-rose-400 mb-4">
            <AlertTriangle className="h-3.5 w-3.5" />
            404 // TARGET_NOT_FOUND
          </span>
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight mb-3">
            &gt;&gt;_ NULL_ARCHIVE
          </h1>
          <p className="text-sm mb-6 text-slate-400 leading-relaxed">
            {language === 'kh'
              ? 'គម្រោងដែលអ្នកកំពុងស្វែងរកមិនមាន ឬត្រូវបានដកចេញពីប្រព័ន្ធ។'
              : 'The requested project repository does not exist or has been removed from the registry.'}
          </p>
          <Link
            to="/projects"
            className={`inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-xl transition-all ${
              isDark
                ? 'bg-emerald-500 text-black hover:bg-emerald-400'
                : 'bg-emerald-600 text-white hover:bg-emerald-700'
            }`}
          >
            <ArrowLeft size={16} />
            {t.projects.backToProjects}
          </Link>
        </div>
      </section>
    );
  }

  const isKh = language === 'kh';
  const description = isKh ? project.descriptionKh : project.description;
  const features = isKh ? project.featuresKh : project.features;

  const projectIndex = projects.findIndex(p => p.id === project.id || p.slug === project.slug);
  const prevProject = projectIndex > 0 ? projects[projectIndex - 1] : null;
  const nextProject = projectIndex < projects.length - 1 ? projects[projectIndex + 1] : null;

  const categoryLabel = (cat) => (cat === 'Team Project' ? t.projects.teamProject : cat);

  return (
    <section
      id="project-details"
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

        {/* BREADCRUMBS */}
        <nav data-aos="fade-down" className="mb-8 flex flex-wrap items-center gap-2 text-xs uppercase tracking-wider font-bold">
          <Link
            to="/projects"
            className={`inline-flex items-center gap-1.5 transition-colors hover:underline ${
              isDark ? 'text-emerald-400 hover:text-emerald-300' : 'text-emerald-700 hover:text-emerald-800'
            }`}
          >
            <ArrowLeft size={14} />
            {t.projects.backToProjects}
          </Link>
          <span className={isDark ? 'text-slate-600' : 'text-slate-400'}>//</span>
          <span className={`max-w-[60vw] truncate ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            {project.title}
          </span>
        </nav>

        {/* REPOSITORY HEADER */}
        <header data-aos="fade-up" className="mb-10">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span
              className={`inline-flex items-center gap-2 border px-3 py-1 text-xs uppercase tracking-wider font-bold ${
                isDark
                  ? 'border-emerald-500/40 bg-emerald-950/40 text-emerald-300'
                  : 'border-emerald-600/30 bg-emerald-100/60 text-emerald-900'
              }`}
            >
              <Terminal className="h-3.5 w-3.5" />
              {'>_ project.audit'}
            </span>
            <span
              className={`border px-2.5 py-1 text-xs font-bold uppercase rounded ${
                isDark ? 'border-emerald-900 bg-black/60 text-emerald-400' : 'border-emerald-200 bg-white text-emerald-800'
              }`}
            >
              ID: #{project.id}
            </span>
          </div>

          <h1
            className={`text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight mb-4 ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
            style={{
              textShadow: isDark
                ? '0 0 30px rgba(16, 185, 129, 0.45)'
                : '0 0 20px rgba(5, 150, 105, 0.15)',
            }}
          >
            {project.title}
          </h1>

          <p
            className={`text-base sm:text-lg max-w-3xl leading-relaxed mb-6 ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}
          >
            {description}
          </p>

          <div className="flex flex-wrap items-center gap-2 mb-6">
            {project.isTeamProject && (
              <span
                className={`text-xs uppercase font-bold tracking-wider px-3 py-1 rounded border ${
                  isDark
                    ? 'border-emerald-500/40 bg-emerald-950/50 text-emerald-300'
                    : 'border-emerald-200 bg-emerald-50 text-emerald-800'
                }`}
              >
                {t.projects.teamProject}
              </span>
            )}
            <span
              className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded border ${
                isDark ? 'border-emerald-900 bg-black text-slate-300' : 'border-emerald-200 bg-white text-slate-700'
              }`}
            >
              <Calendar className="h-3.5 w-3.5 text-emerald-500" />
              {project.year}
            </span>
            {project.category.map((cat) => (
              <span
                key={cat}
                className={`text-xs font-bold uppercase px-3 py-1 rounded border ${
                  isDark ? 'border-emerald-900/80 bg-emerald-950/20 text-emerald-400' : 'border-emerald-100 bg-emerald-50 text-emerald-800'
                }`}
              >
                {categoryLabel(cat)}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-4">
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 px-6 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl transition-all shadow-md ${
                  isDark
                    ? 'bg-emerald-500 text-black hover:bg-emerald-400 hover:shadow-[0_0_25px_rgba(16,185,129,0.5)]'
                    : 'bg-emerald-600 text-white hover:bg-emerald-700 hover:shadow-lg'
                }`}
              >
                {t.projects.viewLive}
                <ExternalLink size={16} />
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 px-6 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl border transition-all ${
                  isDark
                    ? 'border-emerald-500/50 bg-black text-emerald-400 hover:border-emerald-300 hover:bg-emerald-950/40'
                    : 'border-emerald-300 bg-white text-emerald-800 hover:border-emerald-500 hover:bg-emerald-50 shadow-xs'
                }`}
              >
                <GitHubIcon size={18} />
                {t.projects.viewGitHub}
              </a>
            )}
          </div>
        </header>

        {/* TELEMETRY HUD STRIP */}
        <div
          className={`mb-12 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 border p-4 sm:p-5 rounded-xl ${
            isDark
              ? 'border-emerald-500/30 bg-black/60 shadow-[0_0_20px_rgba(16,185,129,0.1)]'
              : 'border-emerald-200 bg-white shadow-xs'
          }`}
          data-aos="fade-up"
        >
          <div className="space-y-0.5">
            <span className={`text-[10px] uppercase tracking-wider font-bold ${isDark ? 'text-emerald-600' : 'text-emerald-700'}`}>
              DEPLOYED YEAR
            </span>
            <div className={`text-xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {project.year || '2024'}
            </div>
          </div>
          <div className="space-y-0.5">
            <span className={`text-[10px] uppercase tracking-wider font-bold ${isDark ? 'text-emerald-600' : 'text-emerald-700'}`}>
              SYSTEM TIER
            </span>
            <div className="text-xl font-black text-emerald-500 flex items-center gap-1.5">
              <Layers className="h-4 w-4" /> PRODUCTION
            </div>
          </div>
          <div className="space-y-0.5">
            <span className={`text-[10px] uppercase tracking-wider font-bold ${isDark ? 'text-emerald-600' : 'text-emerald-700'}`}>
              CORE MODULES
            </span>
            <div className={`text-xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {project.technologies?.length || 0} LIBS
            </div>
          </div>
          <div className="space-y-0.5">
            <span className={`text-[10px] uppercase tracking-wider font-bold ${isDark ? 'text-emerald-600' : 'text-emerald-700'}`}>
              SOURCE STATUS
            </span>
            <div className="text-xl font-black text-emerald-500 flex items-center gap-1.5">
              <Activity className="h-4 w-4 animate-spin" /> VERIFIED
            </div>
          </div>
        </div>

        {/* MAIN BODY: FEATURES & RUNTIME INFO */}
        <div className="grid gap-8 lg:grid-cols-12 items-start">
          
          {/* LEFT: FEATURES CHECKLIST */}
          <section
            data-aos="fade-right"
            className={`lg:col-span-7 relative overflow-hidden rounded-2xl border p-6 sm:p-8 transition-all ${
              isDark
                ? 'border-emerald-900/60 bg-black/90'
                : 'border-emerald-200 bg-white shadow-xs'
            }`}
          >
            {/* CORNER RETICLES */}
            <span className={`absolute top-2 left-2 h-2.5 w-2.5 border-t-2 border-l-2 ${isDark ? 'border-emerald-400' : 'border-emerald-600'}`} />
            <span className={`absolute top-2 right-2 h-2.5 w-2.5 border-t-2 border-r-2 ${isDark ? 'border-emerald-400' : 'border-emerald-600'}`} />
            <span className={`absolute bottom-2 left-2 h-2.5 w-2.5 border-b-2 border-l-2 ${isDark ? 'border-emerald-400' : 'border-emerald-600'}`} />
            <span className={`absolute bottom-2 right-2 h-2.5 w-2.5 border-b-2 border-r-2 ${isDark ? 'border-emerald-400' : 'border-emerald-600'}`} />

            <div className="flex items-center gap-3 mb-6">
              <span
                className={`inline-flex h-10 w-10 items-center justify-center rounded-lg border ${
                  isDark
                    ? 'border-emerald-500/30 bg-emerald-950/40 text-emerald-400'
                    : 'border-emerald-300 bg-emerald-50 text-emerald-700 shadow-xs'
                }`}
              >
                <CheckCircle className="h-5 w-5" />
              </span>
              <div>
                <span className={`text-[10px] uppercase font-bold tracking-widest ${isDark ? 'text-emerald-500' : 'text-emerald-700'}`}>
                  // SYSTEM_CAPABILITIES
                </span>
                <h2
                  className={`text-xl sm:text-2xl font-bold uppercase tracking-tight ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  {t.projects.features}
                </h2>
              </div>
            </div>

            {features && features.length > 0 ? (
              <ul className="grid gap-3 sm:grid-cols-2">
                {features.map((feature, i) => (
                  <li
                    key={i}
                    className={`flex items-start gap-3 rounded-xl border p-4 transition-all ${
                      isDark
                        ? 'border-emerald-950 bg-emerald-950/20 text-slate-300'
                        : 'border-emerald-100 bg-emerald-50/50 text-slate-700'
                    }`}
                  >
                    <CheckCircle className="h-4 w-4 shrink-0 text-emerald-500 mt-0.5" />
                    <span className="text-xs sm:text-sm leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className={`text-sm italic ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                No additional feature modules declared.
              </p>
            )}
          </section>

          {/* RIGHT: TECH STACK & RUNTIME TERMINAL */}
          <div className="lg:col-span-5 space-y-6" data-aos="fade-left">
            
            {/* TECHNOLOGIES CONTAINER */}
            <div
              className={`rounded-2xl border p-6 sm:p-7 ${
                isDark ? 'border-emerald-900/60 bg-black/90' : 'border-emerald-200 bg-white shadow-xs'
              }`}
            >
              <h3 className={`text-sm font-bold uppercase tracking-wider mb-4 flex items-center gap-2 ${isDark ? 'text-emerald-400' : 'text-emerald-800'}`}>
                <FileCode className="h-4 w-4" />
                {t.projects.technologies}
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className={`text-xs font-mono px-3 py-1 rounded border ${
                      isDark
                        ? 'border-emerald-900/80 bg-black text-emerald-400'
                        : 'border-emerald-200 bg-emerald-50 text-emerald-800'
                    }`}
                  >
                    #{tech}
                  </span>
                ))}
              </div>
              <div className={`mt-5 pt-4 border-t flex items-center justify-between text-xs ${isDark ? 'border-emerald-950 text-slate-400' : 'border-emerald-100 text-slate-600'}`}>
                <span>ROLE EXECUTION:</span>
                <span className="font-bold text-emerald-500">{t.hero.role}</span>
              </div>
            </div>

            {/* README CLI TERMINAL WINDOW */}
            <div
              className={`rounded-2xl border overflow-hidden shadow-xl ${
                isDark ? 'border-emerald-500/30 bg-black/95' : 'border-emerald-200 bg-white shadow-xs'
              }`}
            >
              <div
                className={`flex items-center justify-between border-b px-4 py-2.5 text-xs ${
                  isDark ? 'border-emerald-900/60 bg-emerald-950/40 text-slate-300' : 'border-emerald-100 bg-emerald-50 text-slate-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 font-mono text-[11px] font-bold">
                    ~/projects/{project.slug || project.id}.md
                  </span>
                </div>
                <span className="text-[10px] text-emerald-500 uppercase font-mono">BASH_5.2</span>
              </div>

              <div className="p-5 space-y-2 text-xs leading-relaxed overflow-x-auto">
                <p className={isDark ? 'text-slate-500' : 'text-slate-400'}>
                  <span className="text-emerald-500">$</span> cat README.md
                </p>
                <p className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  # <span className="text-emerald-400">{project.title}</span>
                </p>
                <p className={isDark ? 'text-slate-300' : 'text-slate-600'}>
                  &gt; {description}
                </p>
                <p className={isDark ? 'text-slate-500' : 'text-slate-400'}>
                  stack ......... <span className="text-emerald-500">{project.technologies?.join(' / ')}</span>
                </p>
                <p className={isDark ? 'text-slate-500' : 'text-slate-400'}>
                  category ...... <span className="text-emerald-500">{project.category?.join(' / ')}</span>
                </p>
                <p className={isDark ? 'text-slate-500' : 'text-slate-400'}>
                  year .......... <span className="text-emerald-500">{project.year}</span>
                </p>
                <p className={isDark ? 'text-slate-500' : 'text-slate-400'}>
                  status ........ <span className="text-emerald-400 font-bold">[ ACTIVE_ONLINE ]</span>
                  <span className="inline-block w-2 h-3.5 bg-emerald-400 ml-1 animate-pulse" />
                </p>
              </div>
            </div>

          </div>

        </div>

        {/* PREV / NEXT NAVIGATION */}
        <div data-aos="fade-up" className="mt-12 grid gap-4 sm:grid-cols-2 pt-8 border-t border-emerald-500/20">
          {prevProject ? (
            <Link
              to={`/projects/${prevProject.slug || prevProject.id}`}
              className={`group flex items-center justify-start gap-3 p-4 rounded-xl border transition-all ${
                isDark
                  ? 'border-emerald-900/60 bg-black/80 hover:border-emerald-400 hover:shadow-[0_0_15px_rgba(16,185,129,0.15)] text-slate-300'
                  : 'border-emerald-200 bg-white hover:border-emerald-500 hover:shadow-md text-slate-700'
              }`}
            >
              <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1 text-emerald-500" />
              <div className="flex flex-col items-start min-w-0">
                <span className={`text-[10px] uppercase tracking-widest font-bold ${isDark ? 'text-emerald-600' : 'text-emerald-700'}`}>
                  &lt; PREVIOUS_TARGET
                </span>
                <span className="truncate font-bold text-sm">{prevProject.title}</span>
              </div>
            </Link>
          ) : <div />}

          {nextProject ? (
            <Link
              to={`/projects/${nextProject.slug || nextProject.id}`}
              className={`group flex items-center justify-end gap-3 p-4 rounded-xl border text-right transition-all sm:justify-end ${
                isDark
                  ? 'border-emerald-900/60 bg-black/80 hover:border-emerald-400 hover:shadow-[0_0_15px_rgba(16,185,129,0.15)] text-slate-300'
                  : 'border-emerald-200 bg-white hover:border-emerald-500 hover:shadow-md text-slate-700'
              }`}
            >
              <div className="flex flex-col items-end min-w-0">
                <span className={`text-[10px] uppercase tracking-widest font-bold ${isDark ? 'text-emerald-600' : 'text-emerald-700'}`}>
                  NEXT_TARGET &gt;
                </span>
                <span className="truncate font-bold text-sm">{nextProject.title}</span>
              </div>
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1 text-emerald-500" />
            </Link>
          ) : <div />}
        </div>

      </div>
    </section>
  );
}