import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Mail,
  Download,
  ArrowRight,
  ShieldAlert,
  Network,
  Binary,
  Lock,
  Activity,
  Search,
  Layers,
  Code2,
  Rocket,
  Globe,
  FolderGit2,
  Cpu,
  GraduationCap,
  CheckCircle2,
} from 'lucide-react';
import { GitHubIcon, LinkedInIcon } from '../../components/SocialIcons.jsx';
import PageBackground from '../../components/PageBackground/PageBackground.jsx';
import GitHubSnake from '../../components/GitHubSnake/GitHubSnake.jsx';
import HeroPortrait from '../../components/HeroPortrait/HeroPortrait.jsx';
import { useLanguage } from '../../hooks/useLanguage';
import { useTheme } from '../../hooks/useTheme';
import AOS from 'aos';
import 'aos/dist/aos.css';

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const protocolVectors = [
  {
    icon: Network,
    code: '01',
    badge: 'FRONTEND',
    title: 'Modern UI Architecture',
    desc: 'Responsive, fast interfaces using Next.js, React, Vue, and Tailwind with clean component state.',
  },
  {
    icon: Binary,
    code: '02',
    badge: 'BACKEND',
    title: 'Secure REST APIs',
    desc: 'Scalable backend services, authentication, and secure endpoints with Express, Node.js & Laravel.',
  },
  {
    icon: ShieldAlert,
    code: '03',
    badge: 'DATABASE',
    title: 'Database & Performance',
    desc: 'Normalized SQL schemas, query tuning, and reliable data persistence with MySQL & PostgreSQL.',
  },
];

const MARQUEE_ITEMS = [
  'FULL_STACK_DEVELOPER',
  'NEXT.JS // REACT',
  'EXPRESS // NODE.JS',
  'LARAVEL // SPRING_BOOT',
  'REST_APIS',
  'POSTGRESQL // MYSQL',
  'OPEN_TO_WORK',
  'PHNOM_PENH',
];

/* ------------------------------------------------------------------ */
/*  ANIMATION HELPERS                                                  */
/* ------------------------------------------------------------------ */

function useRotatingRole(roleText, { typeSpeed = 45, hold = 2200, transition = 220 } = {}) {
  const lines = useMemo(() => (roleText ? roleText.split('\n') : []), [roleText]);
  const [index, setIndex] = useState(0);
  const [typed, setTyped] = useState('');
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!lines.length) return;
    const current = lines[index % lines.length];
    let typing;
    let timer;
    let x = 0;

    typing = setInterval(() => {
      x += 1;
      setTyped(current.slice(0, x));
      if (x >= current.length) {
        clearInterval(typing);
        timer = setTimeout(() => {
          setVisible(false);
          timer = setTimeout(() => {
            setIndex((i) => (i + 1) % lines.length);
            setTyped('');
            setVisible(true);
          }, transition);
        }, hold);
      }
    }, typeSpeed);

    return () => {
      clearInterval(typing);
      clearTimeout(timer);
    };
  }, [lines, index, typeSpeed, hold, transition]);

  return { typed, visible };
}

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */

export default function Home() {
  const { t, language } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const nameParts = t.hero.name.split(' ');
  const role = useRotatingRole(t.hero.role);

  useEffect(() => {
    if (!document.documentElement.classList.contains('aos-init')) {
      AOS.init({ duration: 800, easing: 'ease-out-cubic', once: true, offset: 60 });
    }
  }, []);

  const container = 'mx-auto w-full max-w-[1600px] px-3.5 sm:px-8 md:px-14 lg:px-20 xl:px-28';

  return (
    <section
      className={`grid-bg grid-pattern relative min-h-screen overflow-hidden pt-20 sm:pt-28 lg:pt-36 pb-12 sm:pb-24 font-mono transition-colors duration-300 ${
        isDark
          ? 'bg-[#030504] text-emerald-400 selection:bg-emerald-500 selection:text-black'
          : 'bg-[#f4f7f5] text-slate-900 selection:bg-emerald-600 selection:text-white'
      }`}
    >
      {/* ============================================================ */}
      {/* GLOBAL BACKGROUND LAYERS                                      */}
      {/* ============================================================ */}
      <PageBackground isDark={isDark} />

      {/* ============================================================ */}
      {/* HERO                                                            */}
      {/* ============================================================ */}
      <section className="relative">
        <div className={`relative z-10 ${container}`}>
          <div className="grid items-center gap-6 sm:gap-12 lg:grid-cols-12 xl:gap-16">
            {/* ---------- LEFT COLUMN ---------- */}
            <div data-aos="fade-right" className="lg:col-span-7 flex flex-col space-y-4 sm:space-y-7">
              {/* BADGES */}
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                <span
                  className={`inline-flex items-center gap-1 border px-2 py-0.5 sm:px-2.5 sm:py-1 text-[10px] sm:text-xs font-bold rounded-lg ${
                    isDark
                      ? 'border-emerald-400/50 bg-emerald-950/60 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.25)]'
                      : 'border-emerald-600/40 bg-emerald-100/80 text-emerald-900'
                  }`}
                >
                  <Lock className={`h-2.5 w-2.5 sm:h-3.5 sm:w-3.5 ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`} />
                  <span className="tracking-wider">// NODE://INIT_OK</span>
                </span>
                <span
                  className={`border px-1.5 py-0.5 sm:px-2 sm:py-1 text-[9px] sm:text-[11px] font-bold rounded-lg ${
                    isDark
                      ? 'border-emerald-700/60 bg-emerald-950/30 text-emerald-300'
                      : 'border-emerald-300 bg-white text-emerald-800 shadow-xs'
                  }`}
                >
                  PORT: 443 [OPEN]
                </span>
                <span
                  className={`border px-1.5 py-0.5 sm:px-2 sm:py-1 text-[9px] sm:text-[11px] font-bold rounded-lg ${
                    isDark
                      ? 'border-emerald-700/60 bg-emerald-950/30 text-emerald-300'
                      : 'border-emerald-300 bg-white text-emerald-800 shadow-xs'
                  }`}
                >
                  <Activity className="mr-1 inline h-2 w-2 sm:h-2.5 sm:w-2.5 animate-pulse text-emerald-400" />
                  ENCRYPTION: HARDENED
                </span>
              </div>

              {/* NAME */}
              <div className="space-y-1.5 sm:space-y-3.5">
                <h1
                  className={`text-2xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-tight break-words ${
                    isDark ? 'text-white [text-shadow:0_0_30px_rgba(52,211,153,0.25)]' : 'text-slate-900'
                  }`}
                >
                  {'<'}
                  <span className={isDark ? 'text-emerald-400 drop-shadow-[0_0_30px_rgba(52,211,153,0.6)]' : 'text-emerald-700'}>
                    {nameParts[0]}
                  </span>
                  <span className={isDark ? 'opacity-70' : 'text-slate-500'}> {nameParts.slice(1).join(' ')}</span>
                  {'/>'}
                </h1>

                {/* ROTATING ROLE */}
                <div
                  className={`flex flex-wrap items-center gap-x-2 text-xs sm:text-lg md:text-xl font-bold ${
                    isDark ? 'text-emerald-300' : 'text-emerald-800'
                  }`}
                >
                  <span className={`${isDark ? 'text-emerald-500' : 'text-emerald-700'} shrink-0 text-[11px] sm:text-base`}>root@meas:~#</span>
                  <span
                    className={`inline-block min-h-[1.4em] transition-all duration-300 ${
                      role.visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                    }`}
                  >
                    {role.typed}
                  </span>
                  <span
                    className={`inline-block h-3.5 sm:h-5 w-1.5 sm:w-2 animate-pulse ${
                      isDark ? 'bg-emerald-400 shadow-[0_0_10px_#10b981]' : 'bg-emerald-700'
                    }`}
                  />
                </div>
              </div>

              {/* BIO */}
              <p
                className={`max-w-2xl text-xs sm:text-sm md:text-base leading-relaxed border-l-2 sm:border-l-4 pl-3 sm:pl-5 py-2 sm:py-3 rounded-r-xl ${
                  isDark
                    ? 'text-slate-100 border-emerald-400 bg-emerald-950/30'
                    : 'text-slate-800 border-emerald-600 bg-emerald-50/80 shadow-xs'
                }`}
              >
                {t.hero.description1}{' '}
                <span className={isDark ? 'text-emerald-300 font-semibold' : 'text-emerald-700 font-semibold'}>{t.hero.description2}</span>
              </p>

              {/* ACTIONS & SOCIALS */}
              <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-2 sm:gap-3 pt-1">
                <a
                  href="/CV_NgetMeas.pdf"
                  download="CV_NgetMeas.pdf"
                  className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl transition-all shadow-md text-center ${
                    isDark
                      ? 'bg-emerald-400 text-black font-black hover:bg-emerald-300 hover:shadow-[0_0_25px_rgba(52,211,153,0.6)]'
                      : 'bg-emerald-600 text-white hover:bg-emerald-700'
                  }`}
                >
                  <Download className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
                  {t.hero.downloadCV}
                </a>

                <Link
                  to="/projects"
                  className={`inline-flex items-center justify-center gap-2 border-2 px-4 py-2.5 sm:px-5 sm:py-3 text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl transition-all text-center ${
                    isDark
                      ? 'border-emerald-400/60 bg-emerald-950/30 text-emerald-300 hover:border-emerald-300 hover:bg-emerald-950/60'
                      : 'border-emerald-600 bg-white text-emerald-900 hover:border-emerald-700 hover:bg-emerald-50 shadow-xs'
                  }`}
                >
                  {t.hero.viewProjects}
                  <ArrowRight className="h-4 w-4 shrink-0" />
                </Link>

                <div className="flex items-center justify-center gap-2 pt-1 sm:pt-0">
                  <a
                    href="https://github.com/NgetMeas22"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl border-2 transition-all ${
                      isDark
                        ? 'border-emerald-500/40 bg-black text-emerald-400 hover:border-emerald-300'
                        : 'border-emerald-300 bg-white text-emerald-800 hover:border-emerald-600 hover:bg-emerald-50 shadow-xs'
                    }`}
                    aria-label="GitHub"
                  >
                    <GitHubIcon size={17} />
                  </a>
                  <a
                    href="https://linkedin.com/in/nget-meas-6525bb3a6"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl border-2 transition-all ${
                      isDark
                        ? 'border-emerald-500/40 bg-black text-emerald-400 hover:border-emerald-300'
                        : 'border-emerald-300 bg-white text-emerald-800 hover:border-emerald-600 hover:bg-emerald-50 shadow-xs'
                    }`}
                    aria-label="LinkedIn"
                  >
                    <LinkedInIcon size={17} />
                  </a>
                  <a
                    href="mailto:measm2519@gmail.com"
                    className={`flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl border-2 transition-all ${
                      isDark
                        ? 'border-emerald-500/40 bg-black text-emerald-400 hover:border-emerald-300'
                        : 'border-emerald-300 bg-white text-emerald-800 hover:border-emerald-600 hover:bg-emerald-50 shadow-xs'
                    }`}
                    aria-label="Email"
                  >
                    <Mail size={17} />
                  </a>
                </div>
              </div>
            </div>

            {/* ---------- RIGHT COLUMN: INTERACTIVE PORTRAIT ---------- */}
            <div data-aos="fade-left" className="lg:col-span-5 w-full">
              <HeroPortrait isDark={isDark} language={language} name={t.hero.name} />
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* MARQUEE TICKER                                                 */}
      {/* ============================================================ */}
      <div
        className={`relative z-10 my-8 sm:my-12 border-y overflow-hidden ${
          isDark ? 'border-emerald-500/20 bg-transparent' : 'border-emerald-900/10 bg-transparent'
        }`}
      >
        <div className="home-marquee flex w-max whitespace-nowrap py-3">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 items-center">
              {MARQUEE_ITEMS.map((item) => (
                <span
                  key={`${copy}-${item}`}
                  className={`mx-6 flex items-center gap-4 text-xs sm:text-sm font-bold uppercase tracking-widest ${
                    isDark ? 'text-emerald-400/80' : 'text-emerald-800'
                  }`}
                >
                  {item}
                  <Binary className={`h-3.5 w-3.5 ${isDark ? 'text-emerald-600' : 'text-emerald-500'}`} />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ============================================================ */}
      {/* IMPACT STATS HUD STRIP                                        */}
      {/* ============================================================ */}
      <section className="relative z-10 pt-6 sm:pt-14 pb-2">
        <div className={container}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 md:gap-5">
            {[
              {
                icon: FolderGit2,
                value: '15+',
                label: t.home.statProjects,
                sub: t.home.statProjectsSub,
              },
              {
                icon: Cpu,
                value: '4+',
                label: t.home.statStacks,
                sub: t.home.statStacksSub,
              },
              {
                icon: GraduationCap,
                value: 'RUPP',
                label: t.home.statEdu,
                sub: t.home.statEduSub,
              },
              {
                icon: CheckCircle2,
                value: '100%',
                label: t.home.statCommit,
                sub: t.home.statCommitSub,
              },
            ].map((stat, idx) => (
              <div
                key={idx}
                data-aos="fade-up"
                data-aos-delay={idx * 80}
                className={`relative border-2 rounded-xl sm:rounded-2xl p-3 sm:p-5 transition-all duration-200 group overflow-hidden ${
                  isDark
                    ? 'border-emerald-800/60 bg-emerald-950/20 hover:border-emerald-400'
                    : 'border-emerald-200 bg-white hover:border-emerald-500 shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                  <span
                    className={`p-1.5 sm:p-2 rounded-lg border ${
                      isDark
                        ? 'border-emerald-500/40 bg-black text-emerald-300'
                        : 'border-emerald-300 bg-emerald-50 text-emerald-700'
                    }`}
                  >
                    <stat.icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </span>
                  <span
                    className={`font-mono text-[9px] sm:text-[10px] tracking-wider uppercase font-bold px-1.5 py-0.5 rounded border ${
                      isDark
                        ? 'border-emerald-800 text-emerald-400 bg-emerald-950/40'
                        : 'border-emerald-200 text-emerald-700 bg-emerald-50'
                    }`}
                  >
                    METRIC_{idx + 1}
                  </span>
                </div>
                <div
                  className={`text-xl sm:text-3xl lg:text-4xl font-black font-mono tracking-tight ${
                    isDark ? 'text-emerald-400 [text-shadow:0_0_20px_rgba(52,211,153,0.3)]' : 'text-emerald-700'
                  }`}
                >
                  {stat.value}
                </div>
                <div className={`mt-0.5 sm:mt-1 font-bold text-[11px] sm:text-sm uppercase tracking-tight truncate ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {stat.label}
                </div>
                <div className={`text-[10px] sm:text-xs mt-0.5 truncate ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  {stat.sub}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* OPERATIONAL CAPABILITIES                                       */}
      {/* ============================================================ */}
      <section className="relative z-10 py-16 sm:py-24">
        <div className={container}>
          <div className="mb-8 sm:mb-12" data-aos="fade-up">
            <span className={`text-xs uppercase tracking-widest font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>
              // CORE EXPERTISE
            </span>
            <h2 className={`text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight mt-1.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              CORE_CAPABILITIES
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
            {protocolVectors.map((vector, i) => (
              <div
                key={vector.code}
                data-aos="fade-up"
                data-aos-delay={i * 100}
                className={`relative border-2 rounded-2xl p-5 sm:p-7 transition-all duration-200 group ${
                  isDark
                    ? 'border-emerald-800/60 bg-emerald-950/20 hover:border-emerald-400'
                    : 'border-emerald-200 bg-white hover:border-emerald-500 shadow-xs'
                }`}
              >
                <span
                  className={`absolute top-3 right-3 h-2 w-2 rounded-full animate-pulse ${
                    isDark ? 'bg-emerald-400 shadow-[0_0_10px_#10b981]' : 'bg-emerald-600'
                  }`}
                />
                <div className="flex items-center justify-between text-xs mb-4">
                  <span
                    className={`border px-2 py-0.5 font-bold rounded ${
                      isDark
                        ? 'border-emerald-500/50 bg-black text-emerald-300'
                        : 'border-emerald-300 bg-emerald-50 text-emerald-800'
                    }`}
                  >
                    {vector.code}
                  </span>
                  <span
                    className={`text-[10px] uppercase border px-2 py-0.5 font-bold rounded ${
                      isDark ? 'border-emerald-700/60 text-emerald-400' : 'border-emerald-200 text-emerald-700'
                    }`}
                  >
                    {vector.badge}
                  </span>
                </div>
                <div className="flex items-center gap-2.5 mb-2">
                  <span
                    className={`p-2 rounded-lg border ${
                      isDark
                        ? 'border-emerald-400/50 bg-emerald-950/60 text-emerald-300'
                        : 'border-emerald-300 bg-emerald-50 text-emerald-700'
                    }`}
                  >
                    <vector.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                  </span>
                  <h3 className={`text-sm sm:text-base font-black uppercase tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {vector.title}
                  </h3>
                </div>
                <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  {vector.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* WHY COLLABORATE / VALUE PROPOSITION                           */}
      {/* ============================================================ */}
      <section className="relative z-10 py-12 sm:py-16 md:py-20">
        <div className={container}>
          <div className="mb-8 sm:mb-12" data-aos="fade-up">
            <span className={`text-xs uppercase tracking-widest font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>
              {t.home.whyBadge}
            </span>
            <h2 className={`text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight mt-1.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {t.home.whyTitle}
            </h2>
            <p className={`mt-2 max-w-xl text-xs sm:text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              {t.home.whySubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
            {[
              {
                code: '01',
                title: t.home.why01Title,
                desc: t.home.why01Desc,
                tag: 'MAINTAINABILITY',
              },
              {
                code: '02',
                title: t.home.why02Title,
                desc: t.home.why02Desc,
                tag: 'INTEGRATION',
              },
              {
                code: '03',
                title: t.home.why03Title,
                desc: t.home.why03Desc,
                tag: 'OPTIMIZATION',
              },
            ].map((card, i) => (
              <div
                key={card.code}
                data-aos="fade-up"
                data-aos-delay={i * 100}
                className={`relative border-2 rounded-2xl p-5 sm:p-7 transition-all duration-200 group ${
                  isDark
                    ? 'border-emerald-800/60 bg-emerald-950/20 hover:border-emerald-400'
                    : 'border-emerald-200 bg-white hover:border-emerald-500 shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-4">
                  <span
                    className={`font-mono font-bold border px-2 py-0.5 rounded ${
                      isDark
                        ? 'border-emerald-500/50 bg-black text-emerald-300'
                        : 'border-emerald-300 bg-emerald-50 text-emerald-800'
                    }`}
                  >
                    // {card.code}
                  </span>
                  <span
                    className={`text-[10px] uppercase border px-2 py-0.5 font-bold rounded ${
                      isDark ? 'border-emerald-700/60 text-emerald-400' : 'border-emerald-200 text-emerald-700'
                    }`}
                  >
                    {card.tag}
                  </span>
                </div>
                <h3 className={`text-base sm:text-lg font-black uppercase tracking-tight mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {card.title}
                </h3>
                <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* WORKFLOW PIPELINE                                               */}
      {/* ============================================================ */}
      <section className="relative z-10 py-10 sm:py-16 md:py-20">
        <div className={container}>
          <div className="mb-8 sm:mb-12" data-aos="fade-up">
            <span className={`text-xs uppercase tracking-widest font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>
              // PROCESS
            </span>
            <h2 className={`text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight mt-1.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              DEVELOPMENT_FLOW
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              { code: '01', icon: Search, title: t.home.process01, desc: t.home.process01D },
              { code: '02', icon: Layers, title: t.home.process02, desc: t.home.process02D },
              { code: '03', icon: Code2, title: t.home.process03, desc: t.home.process03D },
              { code: '04', icon: Rocket, title: t.home.process04, desc: t.home.process04D },
            ].map((step, i) => (
              <div
                key={step.code}
                data-aos="fade-up"
                data-aos-delay={i * 100}
                className={`relative border-2 rounded-2xl p-4 sm:p-5 transition-all duration-200 group ${
                  isDark
                    ? 'border-emerald-800/60 bg-emerald-950/20 hover:border-emerald-400'
                    : 'border-emerald-200 bg-white hover:border-emerald-500 shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`font-mono text-lg sm:text-xl font-black ${
                      isDark ? 'text-emerald-400/25' : 'text-emerald-700/20'
                    } group-hover:text-emerald-400 transition-colors`}
                  >
                    {step.code}
                  </span>
                  <span
                    className={`p-2 rounded-xl border ${
                      isDark
                        ? 'border-emerald-400/40 bg-black text-emerald-300'
                        : 'border-emerald-300 bg-emerald-50 text-emerald-700'
                    }`}
                  >
                    <step.icon className="h-4 w-4" />
                  </span>
                </div>
                <h3 className={`font-bold uppercase tracking-tight mb-1 text-sm sm:text-base ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {step.title}
                </h3>
                <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* GITHUB CONTRIBUTION SNAKE                                     */}
      {/* ============================================================ */}
      <section className="relative z-10 py-10 sm:py-16 md:py-20">
        <div className={container}>
          <div className="mb-8 sm:mb-12" data-aos="fade-up">
            <span className={`text-xs uppercase tracking-widest font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>
              // ACTIVITY
            </span>
            <h2 className={`text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight mt-1.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {t.home.snakeTitle}
            </h2>
          </div>
          <GitHubSnake isDark={isDark} t={t} />
        </div>
      </section>

      {/* ============================================================ */}
      {/* CONTACT CTA                                                      */}
      {/* ============================================================ */}
      <section className="relative z-10 py-12 sm:py-16 md:py-20">
        <div className={container}>
          <div
            className={`relative rounded-2xl sm:rounded-3xl border-2 p-6 sm:p-10 md:p-12 text-center transition-all ${
              isDark
                ? 'border-emerald-800/60 bg-emerald-950/20'
                : 'border-emerald-200 bg-white shadow-xs'
            }`}
            data-aos="fade-up"
          >
            <span
              className={`inline-flex items-center gap-2 border px-3 py-1 text-xs uppercase tracking-wider font-bold rounded ${
                isDark
                  ? 'border-emerald-500/40 bg-emerald-950/40 text-emerald-300'
                  : 'border-emerald-600/30 bg-emerald-100/60 text-emerald-900'
              }`}
            >
              <Globe className="h-3.5 w-3.5" />
              {'>_ open.channel'}
            </span>

            <h2 className={`text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight mt-3 sm:mt-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {t.home.ctaTitle}
            </h2>
            <p className={`mx-auto mt-3 max-w-xl text-xs sm:text-sm md:text-base leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              {t.home.ctaSubtitle}
            </p>

            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="mailto:measm2519@gmail.com"
                className={`w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-5 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl transition-all shadow-md ${
                  isDark
                    ? 'bg-emerald-400 text-black font-black hover:bg-emerald-300 hover:shadow-[0_0_25px_rgba(52,211,153,0.6)]'
                    : 'bg-emerald-600 text-white hover:bg-emerald-700'
                }`}
              >
                <Mail className="h-4 w-4 shrink-0" />
                {t.home.emailMe}
              </a>
              <Link
                to="/contact"
                className={`w-full sm:w-auto inline-flex items-center justify-center gap-2.5 border-2 px-5 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl transition-all ${
                  isDark
                    ? 'border-emerald-400/60 bg-emerald-950/30 text-emerald-300 hover:border-emerald-300 hover:bg-emerald-950/60'
                    : 'border-emerald-600 bg-white text-emerald-900 hover:border-emerald-700 hover:bg-emerald-50 shadow-xs'
                }`}
              >
                {t.home.contactPage}
                <ArrowRight className="h-4 w-4 shrink-0" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* __SECTIONS_3__ */}

      <style>{`
        .home-marquee {
          animation: homeMarquee 26s linear infinite;
        }
        @keyframes homeMarquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}