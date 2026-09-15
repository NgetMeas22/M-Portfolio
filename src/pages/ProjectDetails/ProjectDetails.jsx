import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ExternalLink, Calendar, CheckCircle, Lightbulb, AlertTriangle } from 'lucide-react';
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
    AOS.init({ duration: 800, once: true });
  }, []);

  const project = projects.find(p => p.slug === id);

  if (!project) {
    return (
      <section className="grid-bg grid-pattern relative flex min-h-screen items-center justify-center px-4 pt-28 lg:pt-32 pb-20">
        <div className="text-center">
          <span className="cyber-badge mb-4 inline-flex items-center gap-2">
            <AlertTriangle className="h-3.5 w-3.5" />
            {`>_ 404`}
          </span>
          <h1 className="section-title font-mono text-4xl sm:text-5xl">
            {`>>_ project.not_found`}
          </h1>
          <p className="section-subtitle mt-3 mb-8 text-lg">
            {language === 'kh'
              ? 'គម្រោងដែលអ្នកកំពុងស្វែងរកមិនមាន ឬត្រូវបានដកចេញទេ។'
              : 'The project you are looking for does not exist or has been removed.'}
          </p>
          <Link to="/projects" className="btn-primary inline-flex items-center gap-2">
            <ArrowLeft size={18} />
            {t.projects.backToProjects}
          </Link>
        </div>
      </section>
    );
  }

  const isKh = language === 'kh';
  const description = isKh ? project.descriptionKh : project.description;
  const features = isKh ? project.featuresKh : project.features;

  const sectionCard = 'card glass glass-sm p-6 sm:p-8';

  const projectIndex = projects.findIndex(p => p.slug === id);
  const prevProject = projectIndex > 0 ? projects[projectIndex - 1] : null;
  const nextProject = projectIndex < projects.length - 1 ? projects[projectIndex + 1] : null;

  const categoryLabel = (cat) => (cat === 'Team Project' ? t.projects.teamProject : cat);

  return (
    <div className="min-h-screen">
      <section className="grid-bg grid-pattern relative min-h-screen overflow-hidden pt-28 lg:pt-32 pb-20">
        <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">

          <nav data-aos="fade-down" className="mb-10 flex flex-wrap items-center gap-2 font-mono text-sm">
            <Link
              to="/projects"
              className={`underline-glow inline-flex items-center gap-2 transition-colors hover:underline ${
                isDark ? 'text-primary hover:text-emerald-300' : 'text-emerald-700 hover:text-emerald-600'
              }`}
            >
              <ArrowLeft size={16} />
              {t.projects.backToProjects}
            </Link>
            <span className="text-slate-500">/</span>
            <span className="max-w-[50vw] truncate text-secondary">{project.title}</span>
          </nav>

          <header data-aos="fade-up" className="mb-10">
            <span className="cyber-badge mb-4 inline-flex items-center gap-2">
              <Lightbulb className="h-3.5 w-3.5" />
              {`>_ project.log`}
            </span>
            <h1 className="section-title font-mono text-4xl sm:text-5xl lg:text-6xl">
              {project.title}
            </h1>
            <p className="section-subtitle mt-4 text-lg">{description}</p>

            <div className="mt-6 flex flex-wrap items-center gap-2">
              {project.isTeamProject && (
                <span className="cyber-badge font-mono text-xs">
                  {t.projects.teamProject}
                </span>
              )}
              <span className="cyber-badge font-mono text-xs">
                <Calendar className="mr-1 inline h-3.5 w-3.5" />
                {project.year}
              </span>
              {project.category.map((cat) => (
                <span key={cat} className="tag font-mono">{categoryLabel(cat)}</span>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex items-center gap-2"
                >
                  {t.projects.viewLive}
                  <ExternalLink size={18} />
                </a>
              )}
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline inline-flex items-center gap-2"
              >
                <GitHubIcon size={18} />
                {t.projects.viewGitHub}
              </a>
            </div>
          </header>

          <div className="my-10 grid gap-6 lg:grid-cols-5">
            <section data-aos="fade-right" className={`${sectionCard} lg:col-span-3`}>
              <h2 className="mb-6 flex items-center gap-3 font-mono text-xl font-bold sm:text-2xl">
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 glow-sm">
                  <CheckCircle size={18} />
                </span>
                {t.projects.features}
              </h2>
              <ul className="grid gap-3 sm:grid-cols-2">
                {features.map((feature, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 rounded-lg border border-white/5 bg-dark-800/60 p-3"
                  >
                    <CheckCircle size={18} className="shrink-0 text-emerald-400" />
                    <span className="font-mono text-sm text-slate-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </section>

            <div className="space-y-6 lg:col-span-2">
              <section data-aos="fade-left" className={sectionCard}>
                <h2 className="mb-6 flex items-center gap-3 font-mono text-xl font-bold sm:text-2xl">
                  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 glow-sm">
                    <ExternalLink size={18} />
                  </span>
                  {t.projects.technologies}
                </h2>
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="tag font-mono">{tech}</span>
                  ))}
                </div>
                <p className="mt-6 font-mono text-sm text-slate-500">
                  role .......... <span className="text-emerald-400">{t.hero.role}</span>
                </p>
              </section>

              <div data-aos="fade-left" className="card glass glass-md overflow-hidden glow-sm">
                <div className="flex items-center gap-2 border-b border-white/5 px-4 py-3">
                  <span className={`h-2.5 w-2.5 rounded-full ${isDark ? 'bg-slate-700' : 'bg-slate-300'}`} />
                  <span className={`h-2.5 w-2.5 rounded-full ${isDark ? 'bg-slate-700' : 'bg-slate-300'}`} />
                  <span className={`h-2.5 w-2.5 rounded-full ${isDark ? 'bg-emerald-500' : 'bg-emerald-600'}`} />
                  <span className="ml-2 font-mono text-xs text-slate-500">
                    {`~/projects/${project.slug} [readme] — zsh`}
                  </span>
                </div>
                <div className="space-y-1.5 p-5 font-mono text-sm">
                  <p className="text-slate-500">
                    <span className="text-primary">$</span> cat README.md
                  </p>
                  <p className="font-bold text-slate-200">
                    # <span className="text-primary">{project.title}</span>
                  </p>
                  <p className="text-secondary">&gt; {description}</p>
                  <p className="text-slate-500">
                    stack ......... <span className="text-emerald-400">{project.technologies.join(' / ')}</span>
                  </p>
                  <p className="text-slate-500">
                    category ...... <span className="text-emerald-400">{project.category.join(' / ')}</span>
                  </p>
                  <p className="text-slate-500">
                    {t.projects.year} .......... <span className="text-emerald-400">{project.year}</span>
                  </p>
                  <p className="text-slate-500">
                    status ........ <span className="text-primary">[ online ]</span>
                    <span className="terminal-cursor" />
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div data-aos="fade-up" className="mt-12 grid gap-4 sm:grid-cols-2">
            {prevProject && (
              <Link
                to={`/projects/${prevProject.id}`}
                className="btn-outline group inline-flex items-center justify-start gap-2"
              >
                <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-0.5" />
                <span className="flex flex-col items-start gap-0.5 font-mono">
                  <span className="text-[10px] uppercase tracking-widest text-slate-500">
                    {`< prev`}
                  </span>
                  <span className="truncate">{prevProject.title}</span>
                </span>
              </Link>
            )}
            {nextProject && (
              <Link
                to={`/projects/${nextProject.id}`}
                className="btn-outline group inline-flex items-center justify-end gap-2 sm:justify-end sm:text-right"
              >
                <span className="flex flex-col items-end gap-0.5 font-mono">
                  <span className="text-[10px] uppercase tracking-widest text-slate-500">
                    {`next >`}
                  </span>
                  <span className="truncate">{nextProject.title}</span>
                </span>
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}