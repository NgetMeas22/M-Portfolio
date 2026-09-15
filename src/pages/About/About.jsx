import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import {
  Binary,
  BookOpen,
  Brain,
  Code2,
  Database,
  Download,
  Eye,
  GraduationCap,
  Layers3,
  Lightbulb,
  MapPin,
  RefreshCw,
  Server,
  ShieldCheck,
  Target,
  Terminal,
  Users,
  Activity,
  UserCheck,
  Cpu,
  Fingerprint
} from 'lucide-react';
// Exact relative path to verified image
import profileImage from '../../assets/image/profile.PNG';
import { useLanguage } from '../../hooks/useLanguage';
import { useTheme } from '../../hooks/useTheme';

const About = () => {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-out-cubic',
    });
  }, []);

  const learningTags = ['AI / LLMs', 'Python', 'C# .NET', 'Java Spring Boot'];

  const focusAreas = [
    { icon: Code2, title: 'Frontend Architecture', text: 'React, Vue.js, Tailwind CSS, clean responsive UI & micro-frontends' },
    { icon: Server, title: 'Backend & APIs', text: 'Laravel, PHP, REST API design, service logic & auth middleware' },
    { icon: Database, title: 'Data Persistence', text: 'MySQL, SQL Server, SQLite, relational schemas & query tuning' },
    { icon: ShieldCheck, title: 'Deployment & CI/CD', text: 'Git, GitHub, Vercel, Docker basics, secure modular code' },
  ];

  const softSkills = [
    { icon: Brain, name: t.about.problemSolving },
    { icon: Eye, name: t.about.analyticalThinking },
    { icon: Users, name: t.about.communication },
    { icon: Lightbulb, name: t.about.attentionToDetail },
    { icon: RefreshCw, name: t.about.continuousLearning },
  ];

  const coreFacts = [
    { icon: GraduationCap, label: t.about.education, value: t.about.educationText },
    { icon: MapPin, label: t.hero.locationLabel, value: t.hero.location },
    { icon: Target, label: t.about.careerGoal, value: t.about.careerGoalText },
    { icon: BookOpen, label: t.about.currentLearning, value: learningTags.join(' | ') },
  ];

  const stats = [
    { value: '3rd', label: 'IT Student' },
    { value: '10+', label: 'Projects' },
    { value: '4', label: 'Core Tracks' },
    { value: 'Full', label: 'Stack Focus' },
  ];

  return (
    <section
      id="about"
      className={`relative min-h-screen overflow-hidden pt-28 lg:pt-36 pb-24 font-mono transition-colors duration-300 ${
        isDark ? 'bg-[#030504] text-emerald-400' : 'bg-[#f4f7f5] text-slate-800'
      }`}
    >
      {/* GLOW DECORATIONS */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div
          className="absolute -left-20 top-20 h-96 w-96 rounded-full blur-3xl animate-blob"
          style={{
            background: isDark
              ? 'radial-gradient(circle, rgba(16,185,129,0.08), transparent 70%)'
              : 'radial-gradient(circle, rgba(16,185,129,0.12), transparent 70%)',
          }}
        />
        <div
          className="absolute bottom-10 right-0 h-96 w-96 rounded-full blur-3xl animate-flicker"
          style={{
            background: isDark
              ? 'radial-gradient(circle, rgba(45,212,191,0.06), transparent 70%)'
              : 'radial-gradient(circle, rgba(20,184,166,0.1), transparent 70%)',
          }}
        />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* SECTION TITLE */}
        <div className="mb-14 text-center" data-aos="fade-up">
          <span
            className={`mb-4 inline-flex items-center gap-2 border px-3.5 py-1 text-xs uppercase tracking-wider font-bold ${
              isDark
                ? 'border-emerald-500/40 bg-emerald-950/40 text-emerald-300'
                : 'border-emerald-600/30 bg-emerald-100/60 text-emerald-900'
            }`}
          >
            <Terminal className="h-3.5 w-3.5" />
            {'>_ about.profile'}
          </span>
          <h1
            className={`text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            {t.hero.name}
          </h1>
          <p
            className={`mx-auto mt-3 max-w-2xl text-base sm:text-lg ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}
          >
            {t.about.subtitle}
          </p>
        </div>

        {/* PROFILE & BIOGRAPHY TERMINAL */}
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] items-start">
          
          {/* LEFT: ENHANCED BIOMETRIC PROFILE HUD */}
          <div className="space-y-6" data-aos="fade-right" data-aos-delay="120">
            <div
              className={`relative overflow-hidden rounded-2xl border p-5 shadow-2xl transition-all ${
                isDark
                  ? 'border-emerald-500/40 bg-[#050807] shadow-[0_0_40px_rgba(16,185,129,0.18)]'
                  : 'border-emerald-200 bg-white shadow-emerald-950/5'
              }`}
            >
              {/* HUD CORNER BRACKETS */}
              <span className={`absolute top-2 left-2 h-3.5 w-3.5 border-t-2 border-l-2 ${isDark ? 'border-emerald-400' : 'border-emerald-600'}`} />
              <span className={`absolute top-2 right-2 h-3.5 w-3.5 border-t-2 border-r-2 ${isDark ? 'border-emerald-400' : 'border-emerald-600'}`} />
              <span className={`absolute bottom-2 left-2 h-3.5 w-3.5 border-b-2 border-l-2 ${isDark ? 'border-emerald-400' : 'border-emerald-600'}`} />
              <span className={`absolute bottom-2 right-2 h-3.5 w-3.5 border-b-2 border-r-2 ${isDark ? 'border-emerald-400' : 'border-emerald-600'}`} />

              {/* CARD HEADER */}
              <div
                className={`flex items-center justify-between border-b pb-3 mb-3 text-xs ${
                  isDark ? 'border-emerald-500/20 text-emerald-400' : 'border-emerald-100 text-emerald-800'
                }`}
              >
                <div className="flex items-center gap-1.5 font-bold">
                  <Fingerprint className="h-4 w-4 text-emerald-400" />
                  <span>BIO_SCAN_MATRIX</span>
                </div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-emerald-600">
                  ENC: AES_256
                </span>
              </div>

              {/* IMAGE FRAME CONTAINER */}
              <div
                className={`relative overflow-hidden rounded-xl border ${
                  isDark ? 'border-emerald-500/30 bg-black' : 'border-emerald-200 bg-slate-100'
                }`}
              >
                {/* PHOTO SUB-HEADER */}
                <div
                  className={`flex items-center justify-between border-b px-3.5 py-1.5 text-[11px] font-bold ${
                    isDark
                      ? 'border-emerald-500/20 bg-emerald-950/50 text-emerald-400'
                      : 'border-emerald-100 bg-emerald-50 text-emerald-800'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <UserCheck className="h-3.5 w-3.5" /> ID: NM-2026
                  </span>
                  <span className="flex items-center gap-1 text-[10px] tracking-wider text-emerald-500">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                    VERIFIED_ENTITY
                  </span>
                </div>

                {/* IMAGE VIEWPORT */}
                <div className="relative flex justify-center items-center overflow-hidden bg-slate-950">
                  <img
                    src={profileImage}
                    alt={t.hero.name}
                    className={`w-full aspect-[3/4] max-h-[460px] object-cover object-top transition-transform duration-500 hover:scale-[1.01] ${
                      isDark ? 'contrast-110 brightness-95' : 'contrast-100'
                    }`}
                  />

                  {/* LASER SCANNER & HUD RETICLES (DARK MODE ONLY) */}
                  {isDark && (
                    <>
                      {/* SUBTLE SCANLINE OVERLAY */}
                      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.06)_1px,transparent_1px)] bg-[size:100%_4px]" />

                      {/* LASER BEAM */}
                      <div className="pointer-events-none absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_15px_rgba(16,185,129,0.9)] animate-scanBeam" />

                      {/* TARGET RETICLE */}
                      <div className="pointer-events-none absolute top-8 right-5 h-12 w-12 border border-emerald-400/40 rounded-full flex items-center justify-center">
                        <div className="h-1.5 w-1.5 bg-emerald-400 rounded-full" />
                        <span className="absolute -top-3 text-[8px] font-mono text-emerald-400 font-bold">REC_01</span>
                      </div>
                    </>
                  )}
                </div>

                {/* STATUS FOOTER BAR */}
                <div
                  className={`flex items-center justify-between border-t px-4 py-2.5 text-xs font-bold ${
                    isDark
                      ? 'border-emerald-500/30 bg-black/95 text-emerald-400'
                      : 'border-emerald-200 bg-white text-emerald-900'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                    <span className="tracking-wider">STATUS: ACTIVE</span>
                  </div>
                  <span className="flex items-center gap-1.5 text-emerald-500 text-[11px]">
                    <Activity className="h-3.5 w-3.5 animate-spin" />
                    ONLINE // SEC_OK
                  </span>
                </div>
              </div>

              {/* STATS TILES */}
              <div className="mt-4 grid grid-cols-2 gap-2.5">
                {stats.map((stat, i) => (
                  <div
                    key={stat.label}
                    className={`group relative overflow-hidden rounded-lg border p-3 transition-all ${
                      isDark
                        ? 'border-emerald-500/20 bg-emerald-950/20 hover:border-emerald-500/50 hover:bg-emerald-950/30'
                        : 'border-emerald-100 bg-emerald-50/70 hover:border-emerald-400'
                    }`}
                  >
                    <div className="flex items-baseline justify-between">
                      <p className={`text-xl font-black ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>
                        {stat.value}
                      </p>
                      <span className={`text-[9px] font-bold ${isDark ? 'text-emerald-700 group-hover:text-emerald-400' : 'text-emerald-500'}`}>
                        //0{i + 1}
                      </span>
                    </div>
                    <p className={`mt-0.5 text-[10px] uppercase tracking-wider font-semibold ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* DOWNLOAD CV BUTTON */}
            <a
              href="/CV_NgetMeas.pdf"
              download="CV_NgetMeas.pdf"
              className={`w-full inline-flex items-center justify-center gap-2.5 py-4 px-6 text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl transition-all shadow-md ${
                isDark
                  ? 'bg-emerald-500 text-black hover:bg-emerald-400 hover:shadow-[0_0_28px_rgba(16,185,129,0.55)]'
                  : 'bg-emerald-600 text-white hover:bg-emerald-700 hover:shadow-lg'
              }`}
            >
              <Download className="h-4 w-4" />
              {t.hero.downloadCV}
            </a>
          </div>

          {/* RIGHT: TERMINAL WHOAMI & LOG DETAILS */}
          <div
            className={`rounded-2xl border shadow-xl overflow-hidden transition-all ${
              isDark
                ? 'border-emerald-500/30 bg-black/90 shadow-[0_0_30px_rgba(16,185,129,0.1)]'
                : 'border-emerald-200 bg-white shadow-emerald-950/5'
            }`}
            data-aos="fade-left"
            data-aos-delay="180"
          >
            {/* TERMINAL BAR */}
            <div
              className={`flex items-center justify-between border-b px-5 py-3 text-xs ${
                isDark
                  ? 'border-emerald-900/60 bg-emerald-950/30 text-slate-300'
                  : 'border-emerald-100 bg-emerald-50/80 text-slate-700'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-red-500/80" />
                <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
                <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
                <span className="ml-2 font-bold font-mono">
                  {'>_ nget_meas/about.md'}
                </span>
              </div>
              <span className="text-[11px] font-bold text-emerald-600">UTF-8</span>
            </div>

            {/* CONTENT LOG */}
            <div className="space-y-6 p-6 sm:p-8">
              <div>
                <p className={`text-xs font-bold ${isDark ? 'text-emerald-500' : 'text-emerald-700'}`}>
                  $ whoami
                </p>
                <h2
                  className={`mt-2 text-2xl sm:text-3xl font-bold uppercase tracking-tight ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  {t.about.whoIAm}
                </h2>
                <p
                  className={`mt-3 leading-relaxed text-sm sm:text-base ${
                    isDark ? 'text-slate-300' : 'text-slate-600'
                  }`}
                >
                  {t.about.whoIAmText}
                </p>
              </div>

              {/* CORE FACTS GRID */}
              <div className="grid gap-4 sm:grid-cols-2">
                {coreFacts.map((fact) => {
                  const IconComponent = fact.icon;
                  return (
                    <div
                      key={fact.label}
                      className={`rounded-xl border p-4 transition-all ${
                        isDark
                          ? 'border-emerald-900/50 bg-emerald-950/15 text-slate-200'
                          : 'border-emerald-100 bg-emerald-50/40 text-slate-800'
                      }`}
                    >
                      <div
                        className={`mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg border ${
                          isDark
                            ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
                            : 'border-emerald-300 bg-white text-emerald-700 shadow-xs'
                        }`}
                      >
                        <IconComponent className="h-4 w-4" />
                      </div>
                      <p
                        className={`text-[11px] uppercase tracking-wider font-bold ${
                          isDark ? 'text-emerald-500' : 'text-emerald-700'
                        }`}
                      >
                        {fact.label}
                      </p>
                      <p
                        className={`mt-1.5 text-xs sm:text-sm leading-relaxed ${
                          isDark ? 'text-slate-300' : 'text-slate-600'
                        }`}
                      >
                        {fact.value}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* JOURNEY LOG */}
              <div
                className={`border-t pt-6 ${
                  isDark ? 'border-emerald-900/60' : 'border-emerald-100'
                }`}
              >
                <p className={`text-xs font-bold ${isDark ? 'text-emerald-500' : 'text-emerald-700'}`}>
                  $ cat journey.log
                </p>
                <p
                  className={`mt-3 text-sm leading-relaxed ${
                    isDark ? 'text-slate-300' : 'text-slate-600'
                  }`}
                >
                  {t.about.developmentJourneyText}
                </p>
                <p
                  className={`mt-3 text-sm leading-relaxed ${
                    isDark ? 'text-slate-300' : 'text-slate-600'
                  }`}
                >
                  {t.about.interestsText}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* BUILD STACK & SOFT SKILLS */}
        <div
          className="mt-12 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]"
          data-aos="fade-up"
          data-aos-delay="260"
        >
          {/* BUILD STACK */}
          <div
            className={`rounded-2xl border p-6 sm:p-8 shadow-xl ${
              isDark
                ? 'border-emerald-500/30 bg-black/90'
                : 'border-emerald-200 bg-white shadow-emerald-950/5'
            }`}
          >
            <div className="mb-6 flex items-center gap-3">
              <span
                className={`inline-flex h-10 w-10 items-center justify-center rounded-lg border ${
                  isDark
                    ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
                    : 'border-emerald-300 bg-emerald-50 text-emerald-700 shadow-xs'
                }`}
              >
                <Layers3 className="h-5 w-5" />
              </span>
              <div>
                <span className={`text-xs uppercase tracking-wider font-bold ${isDark ? 'text-emerald-500' : 'text-emerald-700'}`}>
                  {'>_ build_stack'}
                </span>
                <h2
                  className={`text-xl sm:text-2xl font-bold uppercase tracking-tight ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  {t.about.developmentJourney}
                </h2>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {focusAreas.map((area) => {
                const IconComponent = area.icon;
                return (
                  <div
                    key={area.title}
                    className={`rounded-xl border p-4.5 transition-all ${
                      isDark
                        ? 'border-emerald-900/50 bg-emerald-950/15'
                        : 'border-emerald-100 bg-emerald-50/40 hover:border-emerald-300'
                    }`}
                  >
                    <IconComponent
                      className={`mb-3 h-5 w-5 ${
                        isDark ? 'text-emerald-400' : 'text-emerald-700'
                      }`}
                    />
                    <h3
                      className={`text-sm font-bold ${
                        isDark ? 'text-white' : 'text-slate-900'
                      }`}
                    >
                      {area.title}
                    </h3>
                    <p
                      className={`mt-1.5 text-xs sm:text-sm leading-relaxed ${
                        isDark ? 'text-slate-400' : 'text-slate-600'
                      }`}
                    >
                      {area.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* HUMAN / SOFT SKILLS */}
          <div
            className={`rounded-2xl border p-6 sm:p-8 shadow-xl ${
              isDark
                ? 'border-emerald-500/30 bg-black/90'
                : 'border-emerald-200 bg-white shadow-emerald-950/5'
            }`}
          >
            <div className="mb-6 flex items-center gap-3">
              <span
                className={`inline-flex h-10 w-10 items-center justify-center rounded-lg border ${
                  isDark
                    ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
                    : 'border-emerald-300 bg-emerald-50 text-emerald-700 shadow-xs'
                }`}
              >
                <Binary className="h-5 w-5" />
              </span>
              <div>
                <span className={`text-xs uppercase tracking-wider font-bold ${isDark ? 'text-emerald-500' : 'text-emerald-700'}`}>
                  {'>_ human_skills'}
                </span>
                <h2
                  className={`text-xl sm:text-2xl font-bold uppercase tracking-tight ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  {t.about.softSkills}
                </h2>
              </div>
            </div>

            <div className="space-y-3">
              {softSkills.map((skill) => {
                const IconComponent = skill.icon;
                return (
                  <div
                    key={skill.name}
                    className={`flex items-center gap-3.5 rounded-lg border p-3.5 transition-all ${
                      isDark
                        ? 'border-emerald-900/50 bg-emerald-950/20 text-slate-200'
                        : 'border-emerald-100 bg-emerald-50/40 text-slate-800 hover:border-emerald-300'
                    }`}
                  >
                    <span
                      className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md border ${
                        isDark
                          ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
                          : 'border-emerald-200 bg-white text-emerald-700'
                      }`}
                    >
                      <IconComponent className="h-4 w-4" />
                    </span>
                    <span className="text-xs sm:text-sm font-semibold">{skill.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* LEARNING TRACKS FOOTER */}
        <div className="mt-14 text-center" data-aos="fade-up" data-aos-delay="300">
          <span
            className={`mb-3 inline-flex items-center gap-2 border px-3.5 py-1 text-xs uppercase tracking-wider font-bold ${
              isDark
                ? 'border-emerald-500/40 bg-emerald-950/40 text-emerald-300'
                : 'border-emerald-600/30 bg-emerald-100/60 text-emerald-900'
            }`}
          >
            {'>_ learning_path'}
          </span>
          <h2
            className={`text-2xl sm:text-3xl font-bold uppercase tracking-tight ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            {t.about.currentLearning}
          </h2>
          
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {learningTags.map((tag, index) => (
              <span
                key={tag}
                data-aos="zoom-in"
                data-aos-delay={350 + index * 80}
                className={`border px-4 py-2 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all ${
                  isDark
                    ? 'border-emerald-500/30 bg-black text-emerald-400 hover:border-emerald-400'
                    : 'border-emerald-200 bg-white text-emerald-800 hover:border-emerald-500 shadow-xs'
                }`}
              >
                # {tag}
              </span>
            ))}
          </div>
        </div>

      </div>

      {/* SCANLINE BEAM ANIMATION */}
      <style>{`
        @keyframes scanBeam {
          0% { top: 0%; opacity: 0.7; }
          50% { top: 100%; opacity: 0.9; }
          100% { top: 0%; opacity: 0.7; }
        }
        .animate-scanBeam {
          animation: scanBeam 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default About;