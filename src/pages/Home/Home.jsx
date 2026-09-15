import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ExternalLink, Download, ArrowRight } from 'lucide-react';
import { GitHubIcon, LinkedInIcon } from '../../components/SocialIcons.jsx';
import { useLanguage } from '../../hooks/useLanguage';
import { useTheme } from '../../hooks/useTheme';
import { projects } from '../../data/projects';
import AOS from 'aos';
import 'aos/dist/aos.css';

const techStack = [
  { name: 'React' },
  { name: 'JavaScript' },
  { name: 'PHP' },
  { name: 'Laravel' },
  { name: 'MySQL' },
  { name: 'Tailwind CSS' },
  { name: 'Vue.js' },
  { name: 'Git' },
];

const learningTags = ['AI', 'Python', 'C# .NET', 'Spring Boot'];

const terminalLines = [
  { command: 'whoami', output: 'NGET MEAS' },
  { command: 'role', output: 'Full Stack Developer' },
  { command: 'location', output: 'Phnom Penh, Cambodia' },
  { command: 'status', output: 'Open to opportunities' },
];

const RAIN_CHARS = ['0', '1', '7', 'A', 'F', '9', '#', '$', '@', '%', '3', ':', '.', '_'];
const RAIN_COLUMNS = Array.from({ length: 12 }, () =>
  Array.from({ length: 18 }, () => RAIN_CHARS[Math.floor(Math.random() * RAIN_CHARS.length)]).join('')
);

export default function Home() {
  const { t, language } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const nameParts = t.hero.name.split(' ');
  const featuredProjects = projects.filter(project => project.featured).slice(0, 3);

  const [displayedLines, setDisplayedLines] = useState([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [showOutput, setShowOutput] = useState(false);
  const [typingComplete, setTypingComplete] = useState(false);
  const [roleText, setRoleText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  useEffect(() => {
    if (currentLine >= terminalLines.length) {
      const timer = setTimeout(() => setTypingComplete(true), 0);
      return () => clearTimeout(timer);
    }

    const line = terminalLines[currentLine];

    if (!showOutput) {
      if (currentChar < line.command.length) {
        const timer = setTimeout(() => {
          setDisplayedLines(prev => {
            const updated = [...prev];
            if (updated[currentLine]) {
              updated[currentLine] = { ...updated[currentLine], command: line.command.slice(0, currentChar + 1) };
            } else {
              updated[currentLine] = { command: line.command.slice(0, currentChar + 1), output: '' };
            }
            return updated;
          });
          setCurrentChar(c => c + 1);
        }, 60);
        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => setShowOutput(true), 300);
        return () => clearTimeout(timer);
      }
    } else {
      const outputTimer = setTimeout(() => {
        setDisplayedLines(prev => {
          const updated = [...prev];
          updated[currentLine] = { ...updated[currentLine], output: line.output };
          return updated;
        });
      }, 0);
      const timer = setTimeout(() => {
        setShowOutput(false);
        setCurrentChar(0);
        setCurrentLine(l => l + 1);
      }, 200);
      return () => { clearTimeout(outputTimer); clearTimeout(timer); };
    }
  }, [currentLine, currentChar, showOutput]);

  useEffect(() => {
    const roles = [t.hero.role, 'Full Stack Builder', 'Cyber UI Engineer', 'API Architect'];
    const current = roles[roleIndex % roles.length];

    if (deleting && roleText.length === 0) {
      const timer = setTimeout(() => {
        setRoleIndex(i => i + 1);
        setDeleting(false);
      }, 400);
      return () => clearTimeout(timer);
    }

    if (!deleting && roleText.length === current.length) {
      const timer = setTimeout(() => setDeleting(true), 1800);
      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => {
      setRoleText(
        deleting
          ? current.slice(0, roleText.length - 1)
          : current.slice(0, roleText.length + 1)
      );
    }, deleting ? 35 : 85);
    return () => clearTimeout(timer);
  }, [roleText, deleting, roleIndex, t]);

  return (
    <div className="min-h-screen">
      <section className="grid-bg grid-pattern relative flex min-h-screen items-center overflow-hidden pt-28 lg:pt-32">
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-primary/5 blur-3xl animate-blob" />
          <div className="absolute -bottom-16 right-0 h-80 w-80 rounded-full bg-primary-light/5 blur-3xl animate-flicker" />
        </div>

        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-8 pb-16 lg:grid-cols-2 lg:gap-10">

            <div data-aos="fade-right" className="lg:w-[48%]">
              <span className="cyber-badge mb-4 inline-flex items-center gap-2">
                {'>_ nget_meas.init'}
              </span>

              <h1 className="font-mono text-[3rem] leading-none font-black tracking-tighter sm:text-6xl lg:text-7xl">
                <span className="text-slate-400">{nameParts[0]}</span>{' '}
                <span
                  className="inline-block bg-linear-to-r from-primary to-accent bg-clip-text text-transparent glow-lg"
                  style={{
                    textShadow: isDark
                      ? '0 0 40px rgba(16,185,129,0.5)'
                      : '0 0 28px rgba(5,150,105,0.3)',
                  }}
                >
                  {nameParts.slice(1).join(' ')}
                </span>
              </h1>

              <p className="section-subtitle mt-4 font-mono text-base sm:text-lg">
                <span className="text-slate-500">~$</span>{' '}
                <span className="text-primary-light">{roleText}</span>
                <span className="terminal-cursor" aria-hidden="true" />
              </p>

              <div className="mt-4 max-w-xl space-y-2 text-lg text-slate-400">
                <p>{t.hero.description1}</p>
                <p>{t.hero.description2}</p>
              </div>

              <div className="mt-6">
                <span className="font-mono text-xs uppercase tracking-widest text-slate-500">
                  {t.hero.currentlyLearning}
                </span>
                <div className="mt-3 flex flex-wrap gap-2">
                  {learningTags.map(tag => (
                    <span key={tag} className="tag font-mono">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 font-mono text-sm text-slate-500">
                <span className="text-primary">$</span> smos --role
                <span className="terminal-cursor ml-1" aria-hidden="true" />
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="/CV_NgetMeas.pdf"
                  download="CV_NgetMeas.pdf"
                  className="btn-primary inline-flex items-center gap-2"
                >
                  <Download size={18} />
                  {t.hero.downloadCV}
                </a>
                <Link to="/projects" className="btn-outline inline-flex items-center gap-2">
                  {t.hero.viewProjects}
                  <ArrowRight size={18} />
                </Link>
              </div>

              <div className="mt-8 flex items-center gap-3">
                <a
                  href="https://github.com/NgetMeas22"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card card-hover inline-flex h-11 w-11 items-center justify-center rounded-lg text-slate-400 hover:text-primary"
                  aria-label="GitHub"
                >
                  <GitHubIcon size={20} />
                </a>
                <a
                  href="https://linkedin.com/in/nget-meas-6525bb3a6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card card-hover inline-flex h-11 w-11 items-center justify-center rounded-lg text-slate-400 hover:text-primary"
                  aria-label="LinkedIn"
                >
                  <LinkedInIcon size={20} />
                </a>
                <a
                  href="mailto:measm2519@gmail.com"
                  className="card card-hover inline-flex h-11 w-11 items-center justify-center rounded-lg text-slate-400 hover:text-primary"
                  aria-label="Email"
                >
                  <Mail size={20} />
                </a>
              </div>
            </div>

            <div data-aos="fade-up" className="flex justify-center lg:w-[48%] lg:justify-end">
              <div className="relative w-full max-w-md">
                <div className="matrix-rain" aria-hidden="true">
                  <div className="flex h-full items-center justify-center gap-1.5 opacity-[0.08]">
                    {RAIN_COLUMNS.map((col, i) => (
                      <span
                        key={i}
                        className="font-mono text-[10px] leading-5 text-primary"
                        style={{
                          animation: `rainDrop ${6 + i}s linear infinite`,
                          animationDelay: `${-i * 0.8}s`,
                        }}
                      >
                        {col}
                      </span>
                    ))}
                  </div>
                  <div
                    className="absolute inset-x-0 top-0 h-10"
                    style={{
                      background:
                        'linear-gradient(180deg, transparent, rgba(16,185,129,0.15), transparent)',
                      animation: 'scanSweep 7s linear infinite',
                    }}
                  />
                </div>

                <div className="card glass glow-md relative overflow-hidden rounded-xl">
                  <div className="flex items-center gap-2 border-b border-slate-800/80 px-4 py-3">
                    <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
                    <span className="h-3 w-3 rounded-full bg-teal-400/80" />
                    <span className="h-3 w-3 rounded-full bg-primary/80" />
                    <span className="ml-2 font-mono text-xs text-slate-500">
                      {'>_ raw_shell.sh'}
                    </span>
                  </div>

                  <div className="relative min-h-75 p-5 font-mono text-sm">
                    <div className="relative space-y-3">
                      {displayedLines.map((line, i) => (
                        <div key={i} className="space-y-1">
                          <p>
                            <span className="text-primary">$</span>{' '}
                            <span className="text-slate-300">{line.command}</span>
                          </p>
                          {line.output && <p className="pl-6 text-primary">{line.output}</p>}
                        </div>
                      ))}
                      {!typingComplete ? (
                        <span className="terminal-cursor" aria-hidden="true" />
                      ) : (
                        <p>
                          <span className="text-primary">$</span>{' '}
                          <span className="text-slate-400">_</span>
                          <span className="terminal-cursor" aria-hidden="true" />
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div data-aos="fade-up" className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="cyber-badge mb-4 inline-flex items-center gap-2">
                {'>_ featured_work'}
              </span>
              <h2 className="section-title font-mono text-2xl sm:text-3xl lg:text-4xl">
                {t.projects.title}
              </h2>
              <p className="section-subtitle mt-3 text-lg">{t.projects.subtitle}</p>
            </div>
            <Link to="/projects" className="btn-outline w-fit">
              {t.projects.viewDetails}
              <ArrowRight size={18} />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {featuredProjects.map((project, index) => (
              <article
                key={project.id}
                data-aos="fade-up"
                data-aos-delay={100 + index * 90}
                className="card glass glass-sm card-hover flex h-full flex-col p-6"
              >
                <div className="mb-4 flex flex-wrap gap-2">
                  {project.category.slice(0, 3).map(category => (
                    <span key={category} className="tag font-mono">
                      {category === 'Team Project' ? t.projects.teamProject : category}
                    </span>
                  ))}
                </div>

                <h3 className="font-mono text-lg font-bold text-slate-100">
                  {project.title}
                </h3>
                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-secondary">
                  {language === 'kh' ? project.descriptionKh : project.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {project.technologies.slice(0, 4).map(tech => (
                    <span key={tech} className="tag font-mono text-[11px]">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-auto flex items-center justify-between gap-3 pt-6">
                  <Link
                    to={`/projects/${project.id}`}
                    className="underline-glow font-mono text-sm text-primary-light hover:underline"
                  >
                    {t.projects.viewDetails}
                  </Link>
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="tag inline-flex items-center gap-1.5 font-mono"
                    >
                      <ExternalLink className="h-3 w-3" />
                      {t.projects.viewLive}
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div data-aos="fade-up" className="mb-6 text-center">
            <span className="cyber-badge mb-4 inline-flex items-center gap-2">
              {'>_ /tech_stack'}
            </span>
            <h2 className="section-title font-mono text-2xl sm:text-3xl lg:text-4xl">
              {t.skills.title}
            </h2>
            <p className="section-subtitle mt-3 text-lg">{t.skills.subtitle}</p>
          </div>
          <div
            data-aos="fade-up"
            data-aos-delay="100"
            className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
          >
            {techStack.map(tech => (
              <div key={tech.name} className="card card-hover flex items-center gap-3 p-4">
                <span className="h-2.5 w-2.5 flex-none rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.7)]" />
                <span className="font-mono text-sm text-secondary">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-16">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div data-aos="fade-up" className="mb-6 text-center">
            <span className="cyber-badge mb-4 inline-flex items-center gap-2">
              {'>_ github.com/NgetMeas22'}
            </span>
            <h2 className="section-title font-mono text-2xl sm:text-3xl lg:text-4xl">GitHub</h2>
            <p className="section-subtitle mt-3 text-lg">gh auth status</p>
          </div>
          <div
            data-aos="fade-up"
            data-aos-delay="100"
            className="card glass glass-sm card-hover mx-auto max-w-2xl p-6 text-center"
          >
            <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
              <GitHubIcon size={32} />
            </div>
            <h3 className="font-mono text-xl font-bold tracking-tight text-secondary">
              @NgetMeas22
            </h3>
            <div className="mt-4 flex items-center justify-center gap-8">
              <div>
                <p className="font-mono text-3xl font-black text-primary">22</p>
                <p className="mt-1 font-mono text-xs uppercase tracking-widest text-slate-500">
                  public_repos
                </p>
              </div>
              <div>
                <p className="font-mono text-3xl font-black text-primary">3</p>
                <p className="mt-1 font-mono text-xs uppercase tracking-widest text-slate-500">
                  followers
                </p>
              </div>
            </div>
            <a
              href="https://github.com/NgetMeas22"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-6 inline-flex items-center gap-2"
            >
              view_profile
              <ExternalLink size={18} />
            </a>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes rainDrop {
          0% { transform: translateY(-110%); }
          100% { transform: translateY(110%); }
        }
        @keyframes scanSweep {
          0% { transform: translateY(-120%); }
          100% { transform: translateY(360px); }
        }
      `}</style>
    </div>
  );
}
