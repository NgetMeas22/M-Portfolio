import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Mail,
  ExternalLink,
  Download,
  ArrowRight,
  Layers,
  ShieldCheck,
  Database,
} from 'lucide-react';
import { GitHubIcon, LinkedInIcon } from '../../components/SocialIcons.jsx';
import { useLanguage } from '../../hooks/useLanguage';
import { useTheme } from '../../hooks/useTheme';
import { projects } from '../../data/projects';

/* ---------- Content ---------- */

const stack = [
  { group: 'Frontend', items: ['React 19', 'TypeScript', 'Tailwind CSS'] },
  { group: 'Backend', items: ['Laravel 11', 'Node.js', 'REST APIs', 'JWT auth'] },
  { group: 'Database', items: ['PostgreSQL', 'Redis'] },
  { group: 'DevOps', items: ['Docker', 'CI/CD', 'Git'] },
];

const services = [
  {
    icon: Layers,
    title: 'Full-stack web apps',
    desc: 'React frontends connected to Laravel or Node.js backends, built to be fast, easy to maintain, and easy to extend.',
  },
  {
    icon: ShieldCheck,
    title: 'Secure APIs',
    desc: 'REST endpoints with authentication, input validation, and rate limiting, so your data stays protected.',
  },
  {
    icon: Database,
    title: 'Database design',
    desc: 'Clean PostgreSQL schemas, tuned indexes, and Redis caching for quick queries under heavy use.',
  },
];

// The one "signature" element: a small terminal that introduces me.
const terminalLines = [
  { cmd: 'whoami', out: 'nget-meas, full-stack developer' },
  { cmd: 'stack --list', out: 'React, Node.js, Laravel, PostgreSQL, Docker' },
  { cmd: 'status', out: 'open to freelance and full-time roles' },
];

/* ---------- Hooks ---------- */

function useTerminalTyping(lines) {
  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  const [line, setLine] = useState(prefersReduced ? lines.length : 0);
  const [chars, setChars] = useState(0);

  useEffect(() => {
    if (line >= lines.length) return;
    const { cmd } = lines[line];
    const timer = setTimeout(
      () => {
        if (chars < cmd.length) {
          setChars((c) => c + 1);
        } else {
          setLine((l) => l + 1);
          setChars(0);
        }
      },
      chars < cmd.length ? 45 : 450
    );
    return () => clearTimeout(timer);
  }, [line, chars, lines]);

  return { line, chars, done: line >= lines.length };
}

/* ---------- Page ---------- */

export default function Home() {
  const { t, language } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const featuredProjects = projects.filter((p) => p.featured).slice(0, 3);
  const { line, chars, done } = useTerminalTyping(terminalLines);

  // All theme classes live in one place, so the JSX stays readable.
  const c = isDark
    ? {
        page: 'bg-[#08100d] text-slate-300 selection:bg-emerald-400 selection:text-black',
        heading: 'text-white',
        muted: 'text-slate-400',
        accent: 'text-emerald-400',
        border: 'border-white/10',
        surface: 'bg-white/[0.03]',
        chip: 'border-white/10 bg-white/[0.04] text-slate-200',
        primary: 'bg-emerald-400 text-black hover:bg-emerald-300',
        secondary: 'border-white/15 text-slate-100 hover:border-emerald-400/70 hover:text-emerald-300',
        iconBtn: 'border-white/15 text-slate-200 hover:border-emerald-400/70 hover:text-emerald-300',
        cardHover: 'hover:border-emerald-400/50',
        focus: 'focus-visible:outline-emerald-400',
        glow: 'radial-gradient(circle, rgba(16,185,129,0.16) 0%, transparent 70%)',
      }
    : {
        page: 'bg-[#f7faf8] text-slate-700 selection:bg-emerald-600 selection:text-white',
        heading: 'text-slate-900',
        muted: 'text-slate-600',
        accent: 'text-emerald-700',
        border: 'border-slate-200',
        surface: 'bg-white',
        chip: 'border-slate-200 bg-white text-slate-800',
        primary: 'bg-emerald-600 text-white hover:bg-emerald-700',
        secondary: 'border-slate-300 text-slate-800 hover:border-emerald-600 hover:text-emerald-700',
        iconBtn: 'border-slate-300 text-slate-700 hover:border-emerald-600 hover:text-emerald-700',
        cardHover: 'hover:border-emerald-500',
        focus: 'focus-visible:outline-emerald-600',
        glow: 'radial-gradient(circle, rgba(16,185,129,0.10) 0%, transparent 70%)',
      };

  const container = 'mx-auto w-full max-w-6xl px-6 sm:px-10';
  const focusRing = `focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${c.focus}`;

  return (
    <div className={`relative min-h-screen overflow-x-hidden transition-colors duration-300 ${c.page}`}>
      {/* One soft glow behind the hero, nothing else in the background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div
          className="absolute -left-24 top-10 h-[420px] w-[420px] rounded-full blur-[120px]"
          style={{ background: c.glow }}
        />
      </div>

      {/* ---------- HERO ---------- */}
      <section className="relative z-10 pt-16 pb-20 sm:pt-24 sm:pb-28">
        <div className={container}>
          <div className="grid items-center gap-12 lg:grid-cols-12">
            {/* Left: who I am, what I do, what to click */}
            <div className="lg:col-span-7">
              <span
                className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm ${c.chip}`}
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60 motion-safe:animate-ping" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                Available for work
              </span>

              <p className={`mt-8 text-lg ${c.muted}`}>
                Hi, I&apos;m <span className={`font-semibold ${c.heading}`}>{t.hero.name}</span>
              </p>

              <h1
                className={`mt-2 text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl ${c.heading}`}
              >
                Full-stack developer who builds web apps from database to interface.
              </h1>

              <p className={`mt-6 max-w-xl text-base leading-relaxed sm:text-lg ${c.muted}`}>
                I build fast, secure, and reliable web applications with React, Laravel, and Node.js,
                backed by well-designed APIs and databases.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="/CV_NgetMeas.pdf"
                  download="CV_NgetMeas.pdf"
                  className={`inline-flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition-colors ${c.primary} ${focusRing}`}
                >
                  <Download className="h-4 w-4" />
                  Download CV
                </a>

                <Link
                  to="/projects"
                  className={`inline-flex items-center gap-2 rounded-lg border px-5 py-3 text-sm font-semibold transition-colors ${c.secondary} ${focusRing}`}
                >
                  View my projects
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <div className="flex items-center gap-2 sm:ml-2">
                  <a
                    href="https://github.com/NgetMeas22"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className={`flex h-11 w-11 items-center justify-center rounded-lg border transition-colors ${c.iconBtn} ${focusRing}`}
                  >
                    <GitHubIcon size={18} />
                  </a>
                  <a
                    href="https://linkedin.com/in/nget-meas-6525bb3a6"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className={`flex h-11 w-11 items-center justify-center rounded-lg border transition-colors ${c.iconBtn} ${focusRing}`}
                  >
                    <LinkedInIcon size={18} />
                  </a>
                  <a
                    href="mailto:measm2519@gmail.com"
                    aria-label="Email"
                    className={`flex h-11 w-11 items-center justify-center rounded-lg border transition-colors ${c.iconBtn} ${focusRing}`}
                  >
                    <Mail size={18} />
                  </a>
                </div>
              </div>
            </div>

            {/* Right: small terminal (always dark, so it looks the same in both themes) */}
            <div className="lg:col-span-5">
              <div
                className="overflow-hidden rounded-xl border border-emerald-400/20 bg-[#0a1410] shadow-[0_20px_60px_-20px_rgba(16,185,129,0.35)]"
                role="img"
                aria-label="Terminal introducing Nget Meas as a full-stack developer open to work"
              >
                <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                  <span className="ml-3 font-mono text-xs text-slate-400">about.sh</span>
                </div>

                <div className="min-h-[220px] space-y-4 p-5 font-mono text-sm leading-relaxed">
                  {terminalLines.map((l, i) => {
                    if (i > line) return null;
                    const typing = i === line;
                    return (
                      <div key={l.cmd}>
                        <p className="text-slate-100">
                          <span className="text-emerald-400">$</span>{' '}
                          {typing ? l.cmd.slice(0, chars) : l.cmd}
                          {typing && (
                            <span className="ml-0.5 inline-block h-4 w-2 translate-y-0.5 bg-emerald-400 motion-safe:animate-pulse" />
                          )}
                        </p>
                        {!typing && <p className="mt-1 pl-4 text-emerald-300/90">{l.out}</p>}
                      </div>
                    );
                  })}

                  {done && (
                    <p className="text-slate-100">
                      <span className="text-emerald-400">$</span>{' '}
                      <span className="inline-block h-4 w-2 translate-y-0.5 bg-emerald-400 motion-safe:animate-pulse" />
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- TECH STACK ---------- */}
      <section className={`relative z-10 border-t py-16 sm:py-20 ${c.border}`}>
        <div className={container}>
          <h2 className={`text-2xl font-bold tracking-tight sm:text-3xl ${c.heading}`}>
            Technologies I work with
          </h2>
          <p className={`mt-2 max-w-xl ${c.muted}`}>
            The tools I use every day to ship complete products.
          </p>

          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stack.map((s) => (
              <div key={s.group}>
                <h3 className={`text-sm font-semibold ${c.accent}`}>{s.group}</h3>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {s.items.map((item) => (
                    <li
                      key={item}
                      className={`rounded-md border px-3 py-1.5 text-sm ${c.chip}`}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- WHAT I DO ---------- */}
      <section className={`relative z-10 border-t py-16 sm:py-20 ${c.border}`}>
        <div className={container}>
          <h2 className={`text-2xl font-bold tracking-tight sm:text-3xl ${c.heading}`}>
            What I can build for you
          </h2>

          <div className={`mt-10 grid divide-y md:grid-cols-3 md:divide-x md:divide-y-0 ${c.border} divide-inherit`}>
            {services.map((s) => (
              <div key={s.title} className="py-6 md:px-8 md:py-2 md:first:pl-0 md:last:pr-0">
                <s.icon className={`h-6 w-6 ${c.accent}`} aria-hidden="true" />
                <h3 className={`mt-4 text-lg font-semibold ${c.heading}`}>{s.title}</h3>
                <p className={`mt-2 text-sm leading-relaxed sm:text-base ${c.muted}`}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- FEATURED PROJECTS ---------- */}
      <section className={`relative z-10 border-t py-16 sm:py-20 ${c.border}`}>
        <div className={container}>
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <h2 className={`text-2xl font-bold tracking-tight sm:text-3xl ${c.heading}`}>
                Featured projects
              </h2>
              <p className={`mt-2 ${c.muted}`}>A few things I&apos;ve built recently.</p>
            </div>
            <Link
              to="/projects"
              className={`inline-flex items-center gap-1.5 text-sm font-semibold hover:underline ${c.accent} ${focusRing}`}
            >
              See all projects
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project) => (
              <article
                key={project.id}
                className={`flex flex-col justify-between rounded-xl border p-6 transition-colors ${c.border} ${c.surface} ${c.cardHover}`}
              >
                <div>
                  <div className="flex flex-wrap gap-1.5">
                    {project.category.map((cat) => (
                      <span
                        key={cat}
                        className={`rounded-md border px-2 py-0.5 text-xs ${c.chip}`}
                      >
                        {cat}
                      </span>
                    ))}
                  </div>

                  <h3 className={`mt-4 text-lg font-semibold ${c.heading}`}>
                    <Link
                      to={`/projects/${project.id}`}
                      className={`hover:underline ${focusRing}`}
                    >
                      {project.title}
                    </Link>
                  </h3>

                  <p className={`mt-2 line-clamp-3 text-sm leading-relaxed ${c.muted}`}>
                    {language === 'kh' ? project.descriptionKh : project.description}
                  </p>

                  <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-1 text-xs">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <li key={tech} className={c.accent}>
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={`mt-6 flex items-center justify-between border-t pt-4 text-sm ${c.border}`}>
                  <Link
                    to={`/projects/${project.id}`}
                    className={`inline-flex items-center gap-1 font-semibold hover:underline ${c.accent} ${focusRing}`}
                  >
                    View details
                    <ArrowRight className="h-4 w-4" />
                  </Link>

                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-1 hover:underline ${c.muted} ${focusRing}`}
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      Live site
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- CONTACT CTA ---------- */}
      <section className={`relative z-10 border-t py-16 sm:py-24 ${c.border}`}>
        <div className={`${container} max-w-3xl text-center`}>
          <h2 className={`text-3xl font-bold tracking-tight sm:text-4xl ${c.heading}`}>
            Have a project or a role in mind?
          </h2>
          <p className={`mx-auto mt-4 max-w-xl text-base sm:text-lg ${c.muted}`}>
            I&apos;m open to freelance projects and full-time opportunities. Send me a message and I&apos;ll
            get back to you.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href="mailto:measm2519@gmail.com"
              className={`inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold transition-colors ${c.primary} ${focusRing}`}
            >
              <Mail className="h-4 w-4" />
              Email me
            </a>
            <Link
              to="/contact"
              className={`inline-flex items-center gap-2 rounded-lg border px-6 py-3 text-sm font-semibold transition-colors ${c.secondary} ${focusRing}`}
            >
              Contact page
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}