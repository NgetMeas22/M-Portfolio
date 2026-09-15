import { useEffect, useMemo, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { 
  Code, 
  Database, 
  Server, 
  Wrench, 
  BookOpen, 
  Filter, 
  Terminal, 
  Cpu, 
  ShieldAlert, 
  Layers, 
  CheckCircle2,
  Zap,
  Activity
} from 'lucide-react';
import { skills, skillCategories, skillLevelLabels } from '../../data/skills';
import { useLanguage } from '../../hooks/useLanguage';
import { useTheme } from '../../hooks/useTheme';

const categoryIcons = {
  Frontend: Code,
  Backend: Server,
  Database: Database,
  Tools: Wrench,
  Learning: BookOpen,
};

const levelPercent = {
  comfortable: 90,
  familiar: 70,
  learning: 45,
};

const architectureDomains = [
  {
    icon: Layers,
    title: 'Reactive Frontend',
    desc: 'SPA/PWA applications, component lifecycle state trees, SSR/SSG workflows, and design systems.',
    status: 'OPTIMIZED',
  },
  {
    icon: Server,
    title: 'Backend Services',
    desc: 'RESTful architectures, microservice communications, token authorization, and ORM pipelines.',
    status: 'ACTIVE',
  },
  {
    icon: ShieldAlert,
    title: 'Defensive Execution',
    desc: 'Input sanitation, cryptographic handshakes, SQL-injection prevention, and token security.',
    status: 'HARDENED',
  },
];

export default function Skills() {
  const { t, language } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    AOS.init({ duration: 800, easing: 'ease-out-cubic', once: true, offset: 60 });
  }, []);

  useEffect(() => {
    AOS.refresh();
  }, [activeCategory]);

  const filteredSkills = useMemo(
    () =>
      activeCategory === 'all'
        ? skills
        : skills.filter((skill) => skill.category === activeCategory),
    [activeCategory]
  );

  const groupedSkills = useMemo(() => {
    const map = {};
    filteredSkills.forEach((skill) => {
      if (!map[skill.category]) map[skill.category] = [];
      map[skill.category].push(skill);
    });
    return map;
  }, [filteredSkills]);

  const displayCategories = skillCategories.filter(
    (c) => c.id !== 'all' && groupedSkills[c.id]?.length
  );

  const levelLabel = (level) =>
    skillLevelLabels[level]?.[language === 'kh' ? 'kh' : 'en'] || level;

  return (
    <section
      id="skills"
      className={`relative min-h-screen pt-28 lg:pt-36 pb-24 font-mono transition-colors duration-300 overflow-hidden ${
        isDark ? 'bg-[#030504] text-emerald-400' : 'bg-[#f4f7f5] text-slate-900'
      }`}
    >
      {/* BACKGROUND AMBIENT GLOWS */}
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
            {'>_ skills.matrix'}
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
            Skills<span className="text-emerald-500"> // </span>Capabilities
          </h1>
          <p
            className={`mx-auto mt-3 max-w-2xl text-base sm:text-lg ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}
          >
            {t.skills.subtitle}
          </p>
        </div>

        {/* TELEMETRY MATRIX STRIP */}
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
              TOTAL NODES
            </span>
            <div className={`text-xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {skills.length} DEPLOYED
            </div>
          </div>
          <div className="space-y-0.5">
            <span className={`text-[10px] uppercase tracking-wider font-bold ${isDark ? 'text-emerald-600' : 'text-emerald-700'}`}>
              RUNTIME STATUS
            </span>
            <div className="text-xl font-black text-emerald-500 flex items-center gap-1.5">
              <Activity className="h-4 w-4 animate-spin" /> RUNNING
            </div>
          </div>
          <div className="space-y-0.5">
            <span className={`text-[10px] uppercase tracking-wider font-bold ${isDark ? 'text-emerald-600' : 'text-emerald-700'}`}>
              PRIMARY DOMAIN
            </span>
            <div className={`text-xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
              FULL STACK
            </div>
          </div>
          <div className="space-y-0.5">
            <span className={`text-[10px] uppercase tracking-wider font-bold ${isDark ? 'text-emerald-600' : 'text-emerald-700'}`}>
              INTEGRITY
            </span>
            <div className="text-xl font-black text-emerald-500 flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4" /> 100% AUDITED
            </div>
          </div>
        </div>

        {/* CATEGORY FILTER SWITCHER */}
        <div
          className="mb-12 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <span
            className={`mr-2 inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold ${
              isDark ? 'text-emerald-600' : 'text-emerald-800'
            }`}
          >
            <Filter className="h-4 w-4 text-emerald-500" />
            <span>FILTER:</span>
          </span>
          {skillCategories.map((category) => {
            const active = activeCategory === category.id;
            return (
              <button
                key={category.id}
                type="button"
                onClick={() => setActiveCategory(category.id)}
                className={`cursor-pointer rounded-lg border px-4 py-2 text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-200 active:scale-95 ${
                  active
                    ? isDark
                      ? 'border-emerald-400 bg-emerald-500/20 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                      : 'border-emerald-600 bg-emerald-600 text-white shadow-md'
                    : isDark
                      ? 'border-emerald-900/60 bg-black/60 text-slate-400 hover:border-emerald-500/40 hover:text-emerald-400'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-emerald-400 hover:bg-emerald-50/50'
                }`}
              >
                {language === 'kh' ? category.labelKh : category.label}
              </button>
            );
          })}
        </div>

        {/* SKILLS CARDS GRID */}
        <div key={activeCategory} className="space-y-10">
          {displayCategories.map((category, catIdx) => {
            const IconComponent = categoryIcons[category.id] || Code;
            return (
              <div
                key={category.id}
                data-aos="fade-up"
                data-aos-delay={Math.min(catIdx * 80, 250)}
              >
                {/* CATEGORY BAR */}
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span
                      className={`inline-flex h-9 w-9 items-center justify-center rounded-lg border ${
                        isDark
                          ? 'border-emerald-500/40 bg-emerald-950/40 text-emerald-400'
                          : 'border-emerald-300 bg-emerald-50 text-emerald-700 shadow-xs'
                      }`}
                    >
                      <IconComponent className="h-5 w-5" />
                    </span>
                    <h2
                      className={`text-base sm:text-lg font-bold uppercase tracking-wider ${
                        isDark ? 'text-white' : 'text-slate-900'
                      }`}
                    >
                      {'// '}{language === 'kh' ? category.labelKh : category.label}
                    </h2>
                  </div>
                  <span
                    className={`text-xs uppercase tracking-widest font-mono ${
                      isDark ? 'text-emerald-600' : 'text-emerald-700 font-semibold'
                    }`}
                  >
                    {groupedSkills[category.id]?.length} PROTOCOLS
                  </span>
                </div>

                {/* SKILL TILES CONTAINER */}
                <div
                  className={`relative grid grid-cols-1 gap-5 p-6 sm:grid-cols-2 lg:grid-cols-3 rounded-2xl border transition-all ${
                    isDark
                      ? 'border-emerald-500/30 bg-black/90 shadow-[0_0_30px_rgba(16,185,129,0.08)]'
                      : 'border-emerald-200 bg-white shadow-sm'
                  }`}
                >
                  {/* RETICLE CORNERS */}
                  <span className={`absolute top-2 left-2 h-2.5 w-2.5 border-t-2 border-l-2 ${isDark ? 'border-emerald-400' : 'border-emerald-600'}`} />
                  <span className={`absolute top-2 right-2 h-2.5 w-2.5 border-t-2 border-r-2 ${isDark ? 'border-emerald-400' : 'border-emerald-600'}`} />
                  <span className={`absolute bottom-2 left-2 h-2.5 w-2.5 border-b-2 border-l-2 ${isDark ? 'border-emerald-400' : 'border-emerald-600'}`} />
                  <span className={`absolute bottom-2 right-2 h-2.5 w-2.5 border-b-2 border-r-2 ${isDark ? 'border-emerald-400' : 'border-emerald-600'}`} />

                  {groupedSkills[category.id].map((skill) => {
                    const pct = levelPercent[skill.level] ?? 50;
                    return (
                      <div
                        key={skill.name}
                        className={`group relative flex flex-col gap-2 p-4 rounded-xl border transition-all duration-200 ${
                          isDark
                            ? 'border-emerald-900/40 bg-emerald-950/15 hover:border-emerald-500/60 hover:bg-emerald-950/30'
                            : 'border-emerald-100 bg-emerald-50/40 hover:border-emerald-400 hover:shadow-xs'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <span
                            className={`truncate text-sm font-bold tracking-tight ${
                              isDark
                                ? 'text-slate-200 group-hover:text-emerald-400'
                                : 'text-slate-800 group-hover:text-emerald-700'
                            }`}
                          >
                            {skill.name}
                          </span>
                          <span
                            className={`text-xs font-black font-mono ${
                              isDark ? 'text-emerald-400' : 'text-emerald-700'
                            }`}
                          >
                            {pct}%
                          </span>
                        </div>

                        {/* DIGITAL GAUGE PROGRESS BAR */}
                        <div
                          className={`h-2 w-full overflow-hidden rounded-md p-0.5 border ${
                            isDark
                              ? 'border-emerald-900/80 bg-black'
                              : 'border-emerald-200 bg-white'
                          }`}
                        >
                          <div
                            className={`h-full rounded-sm transition-all duration-700 ${
                              isDark
                                ? 'bg-gradient-to-r from-emerald-600 via-emerald-400 to-teal-300 shadow-[0_0_10px_rgba(16,185,129,0.7)]'
                                : 'bg-gradient-to-r from-emerald-500 to-teal-600'
                            }`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>

                        <div className="flex items-center justify-between pt-1">
                          <span
                            className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded border ${
                              isDark
                                ? 'border-emerald-900/80 bg-black/60 text-emerald-500'
                                : 'border-emerald-200 bg-white text-emerald-800'
                            }`}
                          >
                            {levelLabel(skill.level)}
                          </span>
                          <span className={`text-[9px] font-mono uppercase ${isDark ? 'text-emerald-700' : 'text-slate-400'}`}>
                            VERIFIED_NODE
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* ARCHITECTURE SPECIALIZATION FOOTER */}
        <div className="mt-16" data-aos="fade-up" data-aos-delay="200">
          <div className="mb-6">
            <span
              className={`text-xs uppercase tracking-widest font-bold ${
                isDark ? 'text-emerald-600' : 'text-emerald-700'
              }`}
            >
              // OPERATIONAL_PIPELINE
            </span>
            <h3
              className={`text-2xl sm:text-3xl font-bold uppercase tracking-tight mt-1 ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              Architecture Specialization
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {architectureDomains.map((domain, i) => (
              <div
                key={i}
                className={`relative border p-6 rounded-xl transition-all ${
                  isDark
                    ? 'border-emerald-900/60 bg-emerald-950/15 hover:border-emerald-500/50'
                    : 'border-emerald-200 bg-white hover:border-emerald-400 shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`inline-flex h-9 w-9 items-center justify-center rounded-lg border ${
                      isDark
                        ? 'border-emerald-500/40 bg-emerald-950/40 text-emerald-400'
                        : 'border-emerald-300 bg-emerald-50 text-emerald-700'
                    }`}
                  >
                    <domain.icon className="h-4 w-4" />
                  </span>
                  <span
                    className={`text-[10px] font-bold border px-2 py-0.5 rounded uppercase font-mono ${
                      isDark
                        ? 'border-emerald-900 bg-black text-emerald-400'
                        : 'border-emerald-200 bg-emerald-50 text-emerald-800'
                    }`}
                  >
                    {domain.status}
                  </span>
                </div>
                <h4
                  className={`text-base font-bold uppercase mb-2 ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  {domain.title}
                </h4>
                <p
                  className={`text-xs sm:text-sm leading-relaxed ${
                    isDark ? 'text-slate-400' : 'text-slate-600'
                  }`}
                >
                  {domain.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}