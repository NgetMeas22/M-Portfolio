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
import profileImage from '../../assets/image/profile.jpg';
import PageBackground from '../../components/PageBackground/PageBackground.jsx';
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
    { icon: Code2, title: 'Frontend Architecture', text: 'React, Vue.js, Tailwind CSS, responsive & accessible UI' },
    { icon: Server, title: 'Backend & APIs', text: 'Laravel, Node.js, secure REST APIs & auth middleware' },
    { icon: Database, title: 'Data Persistence', text: 'MySQL, PostgreSQL, relational schemas & query tuning' },
    { icon: ShieldCheck, title: 'DevOps & Tooling', text: 'Git, GitHub, Docker, CI/CD and deployment workflows' },
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
    { value: '15+', label: 'Projects' },
    { value: '4', label: 'Core Tracks' },
    { value: 'Full', label: 'Stack Focus' },
  ];

  return (
    <section
      id="about"
      className={`grid-bg grid-pattern relative min-h-screen overflow-hidden pt-20 sm:pt-28 lg:pt-36 pb-12 sm:pb-24 font-mono transition-colors duration-300 ${
        isDark
          ? 'bg-[#030504] text-emerald-400 selection:bg-emerald-500 selection:text-black'
          : 'bg-[#f4f7f5] text-slate-900 selection:bg-emerald-600 selection:text-white'
      }`}
    >
      {/* GLOBAL BACKGROUND LAYERS */}
      <PageBackground isDark={isDark} />

      <div className="relative mx-auto w-full max-w-7xl px-3.5 sm:px-6 lg:px-8">
        
        {/* SECTION TITLE */}
        <div className="mb-6 sm:mb-12 text-center" data-aos="fade-up">
          <span
            className={`mb-2 sm:mb-4 inline-flex items-center gap-1.5 sm:gap-2 border px-2.5 sm:px-3.5 py-1 text-[11px] sm:text-xs uppercase tracking-wider font-bold rounded ${
              isDark
                ? 'border-emerald-500/40 bg-emerald-950/40 text-emerald-300'
                : 'border-emerald-600/30 bg-emerald-100/60 text-emerald-900'
            }`}
          >
            <Terminal className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
            {'>_ about.profile'}
          </span>
          <h1
            className={`text-2xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            {t.hero.name}
          </h1>
          <p
            className={`mx-auto mt-2 sm:mt-3 max-w-2xl text-xs sm:text-sm md:text-base ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}
          >
            {t.about.subtitle}
          </p>
        </div>

        {/* PROFILE & BIOGRAPHY TERMINAL */}
        <div className="grid gap-5 sm:gap-6 lg:gap-8 lg:grid-cols-[0.88fr_1.12fr] items-stretch">
          
          {/* LEFT: ENHANCED BIOMETRIC PROFILE HUD */}
          <div className="w-full max-w-sm mx-auto lg:max-w-none flex flex-col justify-between space-y-3.5" data-aos="fade-right" data-aos-delay="120">
            <div
              className={`relative overflow-hidden rounded-xl border p-3 sm:p-3.5 shadow-xl transition-all ${
                isDark
                  ? 'border-emerald-500/40 bg-[#050807] shadow-[0_0_35px_rgba(16,185,129,0.15)]'
                  : 'border-emerald-200 bg-white shadow-emerald-950/5'
              }`}
            >
              {/* HUD CORNER BRACKETS */}
              <span className={`absolute top-2 left-2 h-3 w-3 border-t-2 border-l-2 ${isDark ? 'border-emerald-400' : 'border-emerald-600'}`} />
              <span className={`absolute top-2 right-2 h-3 w-3 border-t-2 border-r-2 ${isDark ? 'border-emerald-400' : 'border-emerald-600'}`} />
              <span className={`absolute bottom-2 left-2 h-3 w-3 border-b-2 border-l-2 ${isDark ? 'border-emerald-400' : 'border-emerald-600'}`} />
              <span className={`absolute bottom-2 right-2 h-3 w-3 border-b-2 border-r-2 ${isDark ? 'border-emerald-400' : 'border-emerald-600'}`} />

              {/* CARD HEADER */}
              <div
                className={`flex items-center justify-between border-b pb-2 mb-2 text-xs ${
                  isDark ? 'border-emerald-500/20 text-emerald-400' : 'border-emerald-100 text-emerald-800'
                }`}
              >
                <div className="flex items-center gap-1.5 font-bold">
                  <Fingerprint className="h-3.5 w-3.5 text-emerald-400" />
                  <span className="text-[11px] sm:text-xs">BIO_SCAN_MATRIX</span>
                </div>
                <span className="text-[9px] uppercase font-mono tracking-widest text-emerald-600">
                  ENC: AES_256
                </span>
              </div>

              {/* IMAGE FRAME CONTAINER */}
              <div
                className={`relative overflow-hidden rounded-lg border ${
                  isDark ? 'border-emerald-500/30 bg-black' : 'border-emerald-200 bg-slate-100'
                }`}
              >
                {/* PHOTO SUB-HEADER */}
                <div
                  className={`flex items-center justify-between border-b px-3 py-1 text-[10px] sm:text-[11px] font-bold ${
                    isDark
                      ? 'border-emerald-500/20 bg-emerald-950/50 text-emerald-400'
                      : 'border-emerald-100 bg-emerald-50 text-emerald-800'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <UserCheck className="h-3 w-3" /> ID: NM-2026
                  </span>
                  <span className="flex items-center gap-1 text-[9px] sm:text-[10px] tracking-wider text-emerald-500">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                    VERIFIED_ENTITY
                  </span>
                </div>

                {/* IMAGE VIEWPORT: PROPER CHEST PORTRAIT CROP */}
                <div className="relative h-[200px] sm:h-[240px] md:h-[270px] lg:h-[290px] flex justify-center items-center overflow-hidden bg-slate-950">
                  <img
                    src={profileImage}
                    alt={t.hero.name}
                    className={`w-full h-full object-cover object-top transition-transform duration-500 hover:scale-[1.01] ${
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
                      <div className="pointer-events-none absolute top-3 right-3 h-8 w-8 border border-emerald-400/40 rounded-full flex items-center justify-center">
                        <div className="h-1.5 w-1.5 bg-emerald-400 rounded-full" />
                        <span className="absolute -top-2.5 text-[7px] font-mono text-emerald-400 font-bold">REC_01</span>
                      </div>
                    </>
                  )}
                </div>

                {/* STATUS FOOTER BAR */}
                <div
                  className={`flex items-center justify-between border-t px-3 py-1.5 text-[10px] sm:text-[11px] font-bold ${
                    isDark
                      ? 'border-emerald-500/30 bg-black/95 text-emerald-400'
                      : 'border-emerald-200 bg-white text-emerald-900'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                    <span className="tracking-wider">STATUS: ACTIVE</span>
                  </div>
                  <span className="flex items-center gap-1 text-emerald-500 text-[10px]">
                    <Activity className="h-3 w-3 animate-spin" />
                    ONLINE // SEC_OK
                  </span>
                </div>
              </div>

              {/* STATS TILES */}
              <div className="mt-2.5 grid grid-cols-2 gap-2">
                {stats.map((stat, i) => (
                  <div
                    key={stat.label}
                    className={`group relative overflow-hidden rounded-lg border p-1.5 sm:p-2 transition-all ${
                      isDark
                        ? 'border-emerald-500/20 bg-emerald-950/20 hover:border-emerald-500/50 hover:bg-emerald-950/30'
                        : 'border-emerald-100 bg-emerald-50/70 hover:border-emerald-400'
                    }`}
                  >
                    <div className="flex items-baseline justify-between">
                      <p className={`text-sm sm:text-base font-black ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>
                        {stat.value}
                      </p>
                      <span className={`text-[9px] font-bold ${isDark ? 'text-emerald-700 group-hover:text-emerald-400' : 'text-emerald-500'}`}>
                        //0{i + 1}
                      </span>
                    </div>
                    <p className={`mt-0.5 text-[9px] sm:text-[10px] uppercase tracking-wider font-semibold truncate ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
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
              className={`w-full inline-flex items-center justify-center gap-2 py-2.5 sm:py-3 px-4 sm:px-5 text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl transition-all shadow-md active:scale-95 ${
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
            className={`flex flex-col rounded-2xl border shadow-xl overflow-hidden transition-all ${
              isDark
                ? 'border-emerald-500/30 bg-black/90 shadow-[0_0_30px_rgba(16,185,129,0.1)]'
                : 'border-emerald-200 bg-white shadow-emerald-950/5'
            }`}
            data-aos="fade-left"
            data-aos-delay="180"
          >
            {/* TERMINAL BAR */}
            <div
              className={`shrink-0 flex items-center justify-between border-b px-4 sm:px-5 py-2.5 sm:py-3 text-xs ${
                isDark
                  ? 'border-emerald-900/60 bg-emerald-950/30 text-slate-300'
                  : 'border-emerald-100 bg-emerald-50/80 text-slate-700'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-red-500/80" />
                <span className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-yellow-500/80" />
                <span className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-emerald-500/80" />
                <span className="ml-2 font-bold font-mono text-[11px] sm:text-xs">
                  {'>_ nget_meas/about.md'}
                </span>
              </div>
              <span className="text-[10px] sm:text-[11px] font-bold text-emerald-600">UTF-8</span>
            </div>

            {/* CONTENT LOG */}
            <div className="flex-1 flex flex-col space-y-3.5 sm:space-y-4 p-4 sm:p-5 lg:p-6 justify-start">
              <div>
                <p className={`text-[11px] sm:text-xs font-bold ${isDark ? 'text-emerald-500' : 'text-emerald-700'}`}>
                  $ whoami
                </p>
                <h2
                  className={`mt-1 text-lg sm:text-xl md:text-2xl font-bold uppercase tracking-tight ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  {t.about.whoIAm}
                </h2>
                <p
                  className={`mt-1.5 leading-relaxed text-xs sm:text-[13px] ${
                    isDark ? 'text-slate-300' : 'text-slate-600'
                  }`}
                >
                  {t.about.whoIAmText}
                </p>
              </div>

              {/* SINGLE UNIFIED CORE FACTS CARD (COMBINED 4 IN 1) */}
              <div
                className={`rounded-xl border p-3 sm:p-3.5 transition-all ${
                  isDark
                    ? 'border-emerald-900/60 bg-emerald-950/20 text-slate-200'
                    : 'border-emerald-100 bg-emerald-50/50 text-slate-800'
                }`}
              >
                {/* INNER HUD SPEC HEADER */}
                <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-emerald-500/20 text-[10px] font-mono">
                  <span className="flex items-center gap-1.5 font-bold text-emerald-400">
                    <ShieldCheck className="h-3 w-3" /> CORE_SPECIFICATION
                  </span>
                  <span className="text-[9px] text-emerald-600 font-bold uppercase tracking-wider">
                    // VERIFIED
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3.5">
                  {/* EDUCATION */}
                  <div className="flex items-start gap-2.5">
                    <div
                      className={`shrink-0 mt-0.5 inline-flex h-7 w-7 items-center justify-center rounded-lg border ${
                        isDark
                          ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
                          : 'border-emerald-300 bg-white text-emerald-700 shadow-xs'
                      }`}
                    >
                      <GraduationCap className="h-3.5 w-3.5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className={`text-[10px] uppercase tracking-wider font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>
                        {t.about.education}
                      </p>
                      <p className={`mt-0.5 text-[11px] sm:text-xs leading-snug ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                        {t.about.educationText}
                      </p>
                    </div>
                  </div>

                  {/* LOCATION */}
                  <div className="flex items-start gap-2.5">
                    <div
                      className={`shrink-0 mt-0.5 inline-flex h-7 w-7 items-center justify-center rounded-lg border ${
                        isDark
                          ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
                          : 'border-emerald-300 bg-white text-emerald-700 shadow-xs'
                      }`}
                    >
                      <MapPin className="h-3.5 w-3.5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className={`text-[10px] uppercase tracking-wider font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>
                        {t.hero.locationLabel}
                      </p>
                      <p className={`mt-0.5 text-[11px] sm:text-xs leading-snug ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                        {t.hero.location}
                      </p>
                    </div>
                  </div>

                  {/* CAREER GOAL */}
                  <div className="flex items-start gap-2.5">
                    <div
                      className={`shrink-0 mt-0.5 inline-flex h-7 w-7 items-center justify-center rounded-lg border ${
                        isDark
                          ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
                          : 'border-emerald-300 bg-white text-emerald-700 shadow-xs'
                      }`}
                    >
                      <Target className="h-3.5 w-3.5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className={`text-[10px] uppercase tracking-wider font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>
                        {t.about.careerGoal}
                      </p>
                      <p className={`mt-0.5 text-[11px] sm:text-xs leading-snug ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                        {t.about.careerGoalText}
                      </p>
                    </div>
                  </div>

                  {/* CURRENTLY LEARNING */}
                  <div className="flex items-start gap-2.5">
                    <div
                      className={`shrink-0 mt-0.5 inline-flex h-7 w-7 items-center justify-center rounded-lg border ${
                        isDark
                          ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
                          : 'border-emerald-300 bg-white text-emerald-700 shadow-xs'
                      }`}
                    >
                      <BookOpen className="h-3.5 w-3.5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className={`text-[10px] uppercase tracking-wider font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>
                        {t.about.currentLearning}
                      </p>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {learningTags.map((tag) => (
                          <span
                            key={tag}
                            className={`px-1.5 py-0.5 rounded text-[9px] sm:text-[10px] font-mono font-semibold border ${
                              isDark
                                ? 'bg-emerald-950/60 border-emerald-500/30 text-emerald-300'
                                : 'bg-white border-emerald-300 text-emerald-800'
                            }`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* JOURNEY & PHILOSOPHY LOG */}
              <div
                className={`border-t pt-3 sm:pt-3.5 space-y-1.5 ${
                  isDark ? 'border-emerald-900/60' : 'border-emerald-100'
                }`}
              >
                <div className="flex items-center justify-between">
                  <p className={`text-[11px] sm:text-xs font-bold ${isDark ? 'text-emerald-500' : 'text-emerald-700'}`}>
                    $ cat journey.log
                  </p>
                  <span className="text-[9px] font-mono text-emerald-600">SYS_LOG // READ_ONLY</span>
                </div>
                <p
                  className={`text-xs sm:text-[13px] leading-relaxed ${
                    isDark ? 'text-slate-300' : 'text-slate-600'
                  }`}
                >
                  {t.about.developmentJourneyText}
                </p>
                <p
                  className={`text-xs sm:text-[13px] leading-relaxed ${
                    isDark ? 'text-slate-400' : 'text-slate-600'
                  }`}
                >
                  {t.about.interestsText}
                </p>
              </div>

              {/* TERMINAL STATUS FOOTER */}
              <div
                className={`mt-auto border-t pt-2.5 flex items-center justify-between text-[10px] font-mono ${
                  isDark ? 'border-emerald-900/40 text-emerald-600' : 'border-emerald-100 text-slate-500'
                }`}
              >
                <span>PROCESS: COMPLETED (EXIT 0)</span>
                <span className="flex items-center gap-1.5 text-emerald-500 font-bold">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                  SECURE_BUFFER_OK
                </span>
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
                  {'>_ focus_areas'}
                </span>
                <h2
                  className={`text-xl sm:text-2xl font-bold uppercase tracking-tight ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  Technical Focus
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