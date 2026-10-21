import { useEffect, useMemo, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import {
  Code,
  Database,
  Server,
  Wrench,
  BookOpen,
  Briefcase,
  Filter,
  Terminal,
  ShieldAlert,
  Layers,
  Search,
  X,
  Boxes,
  FolderTree,
  CheckCircle2,
  GraduationCap,
  Cloud,
} from 'lucide-react';
import { skills, skillCategories, skillLevelLabels } from '../../data/skills';
import { useLanguage } from '../../hooks/useLanguage';
import { useTheme } from '../../hooks/useTheme';
import PageBackground from '../../components/PageBackground/PageBackground.jsx';
import { readableColor } from '../../utils/color.js';

const categoryIcons = {
  Frontend: Code,
  Backend: Server,
  Database: Database,
  Tools: Wrench,
  Cloud: Cloud,
  Productivity: Briefcase,
  Learning: BookOpen,
};

const levelPercent = {
  comfortable: 90,
  familiar: 70,
  learning: 45,
};

const architectureDomains = [
  { icon: Layers, status: 'OPTIMIZED' },
  { icon: Server, status: 'ACTIVE' },
  { icon: ShieldAlert, status: 'SECURE' },
];

// Fallback label when a skill has no `short` field in the data.
const shortLabel = (skill) =>
  skill.short ||
  (skill.name.includes(' ')
    ? skill.name.split(/\s+/).map((w) => w[0]).join('').slice(0, 3)
    : skill.name.slice(0, 3)
  ).toUpperCase();

export default function Skills() {
  const { t, language } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const isKh = language === 'kh';
  const [activeCategory, setActiveCategory] = useState('all');
  const [query, setQuery] = useState('');

  useEffect(() => {
    AOS.init({ duration: 800, easing: 'ease-out-cubic', once: true, offset: 60 });
  }, []);

  useEffect(() => {
    AOS.refresh();
  }, [activeCategory, query]);

  const filteredSkills = useMemo(() => {
    const q = query.trim().toLowerCase();
    return skills.filter(
      (skill) =>
        (activeCategory === 'all' || skill.category === activeCategory) &&
        (!q ||
          skill.name.toLowerCase().includes(q) ||
          skill.description?.toLowerCase().includes(q))
    );
  }, [activeCategory, query]);

  const groupedSkills = useMemo(() => {
    const map = {};
    filteredSkills.forEach((skill) => {
      if (!map[skill.category]) map[skill.category] = [];
      map[skill.category].push(skill);
    });
    return map;
  }, [filteredSkills]);

  const categoryCounts = useMemo(() => {
    const counts = { all: skills.length };
    skills.forEach((s) => {
      counts[s.category] = (counts[s.category] || 0) + 1;
    });
    return counts;
  }, []);

  const stats = useMemo(
    () => [
      { icon: Boxes, label: t.skills.total, value: skills.length },
      {
        icon: FolderTree,
        label: t.skills.categories,
        value: skillCategories.filter((c) => c.id !== 'all').length,
      },
      {
        icon: CheckCircle2,
        label: t.skills.proficient,
        value: skills.filter((s) => s.level === 'comfortable').length,
      },
      {
        icon: GraduationCap,
        label: t.skills.inProgress,
        value: skills.filter((s) => s.level === 'learning').length,
      },
    ],
    [t]
  );

  const displayCategories = skillCategories.filter(
    (c) => c.id !== 'all' && groupedSkills[c.id]?.length
  );

  const levelLabel = (level) => skillLevelLabels[level]?.[isKh ? 'kh' : 'en'] || level;

  const levelBadgeClass = (level) => {
    if (level === 'comfortable') {
      return isDark
        ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-300'
        : 'border-emerald-300 bg-emerald-50 text-emerald-800';
    }
    if (level === 'familiar') {
      return isDark
        ? 'border-emerald-800/80 bg-black/60 text-emerald-500'
        : 'border-emerald-200 bg-white text-emerald-700';
    }
    return isDark
      ? 'border-dashed border-slate-600 bg-black/60 text-slate-400'
      : 'border-dashed border-slate-300 bg-white text-slate-600';
  };

  const domains = t.skills.domains || [];

  return (
    <section
      id="skills"
      className={`grid-bg grid-pattern relative min-h-screen pt-20 sm:pt-28 lg:pt-36 pb-12 sm:pb-24 font-mono transition-colors duration-300 overflow-hidden ${
        isDark
          ? 'bg-[#030504] text-emerald-400 selection:bg-emerald-500 selection:text-black'
          : 'bg-[#f4f7f5] text-slate-900 selection:bg-emerald-600 selection:text-white'
      }`}
    >
      <PageBackground isDark={isDark} />

      <div className="relative mx-auto w-full max-w-7xl px-3.5 sm:px-6 lg:px-8">

        {/* HEADER */}
        <div className="mb-6 sm:mb-10 text-center" data-aos="fade-up">
          <span
            className={`mb-2 sm:mb-4 inline-flex items-center gap-1.5 sm:gap-2 border px-2.5 sm:px-3.5 py-1 text-[11px] sm:text-xs uppercase tracking-wider font-bold rounded ${
              isDark
                ? 'border-emerald-500/40 bg-emerald-950/40 text-emerald-300'
                : 'border-emerald-600/30 bg-emerald-100/60 text-emerald-900'
            }`}
          >
            <Terminal className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
            {'>_ skills.matrix'}
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
            {t.skills.title}
          </h1>
          <p
            className={`mx-auto mt-2 sm:mt-3 max-w-2xl text-xs sm:text-base ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}
          >
            {t.skills.subtitle}
          </p>
        </div>

        {/* STATS STRIP */}
        <div
          className="mb-8 sm:mb-10 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4"
          data-aos="fade-up"
        >
          {stats.map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className={`flex items-center gap-3 rounded-xl border p-3 sm:p-4 ${
                isDark
                  ? 'border-emerald-500/25 bg-black/60 shadow-[0_0_20px_rgba(16,185,129,0.06)]'
                  : 'border-emerald-200 bg-white shadow-xs'
              }`}
            >
              <span
                className={`inline-flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-lg border ${
                  isDark
                    ? 'border-emerald-500/40 bg-emerald-950/40 text-emerald-400'
                    : 'border-emerald-300 bg-emerald-50 text-emerald-700'
                }`}
              >
                <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
              </span>
              <div className="min-w-0">
                <div className={`text-xl sm:text-2xl font-black leading-none ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {value}
                </div>
                <div
                  className={`mt-1 truncate text-[10px] sm:text-[11px] uppercase tracking-wider font-bold ${
                    isDark ? 'text-emerald-600' : 'text-emerald-700'
                  }`}
                >
                  {label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* SEARCH + FILTER */}
        <div className="mb-8 sm:mb-12 space-y-4" data-aos="fade-up" data-aos-delay="100">
          <div className="relative mx-auto max-w-md">
            <Search
              className={`pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 ${
                isDark ? 'text-emerald-600' : 'text-emerald-700'
              }`}
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.skills.search}
              aria-label={t.skills.search}
              className={`w-full rounded-lg border py-2.5 pl-9 pr-9 text-sm outline-none transition-colors ${
                isDark
                  ? 'border-emerald-900/70 bg-black/70 text-emerald-200 placeholder:text-slate-600 focus:border-emerald-500/70 focus:shadow-[0_0_12px_rgba(16,185,129,0.25)]'
                  : 'border-slate-200 bg-white text-slate-800 placeholder:text-slate-400 focus:border-emerald-500'
              }`}
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                aria-label={t.skills.clear}
                className={`absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer rounded p-1 ${
                  isDark ? 'text-slate-500 hover:text-emerald-400' : 'text-slate-400 hover:text-emerald-700'
                }`}
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2.5">
            <span
              className={`mr-1 sm:mr-2 inline-flex items-center gap-1.5 text-[11px] sm:text-xs uppercase tracking-widest font-bold ${
                isDark ? 'text-emerald-600' : 'text-emerald-800'
              }`}
            >
              <Filter className="h-3.5 w-3.5 text-emerald-500" />
              <span>{t.skills.filter}:</span>
            </span>
            {skillCategories.map((category) => {
              const active = activeCategory === category.id;
              return (
                <button
                  key={category.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setActiveCategory(category.id)}
                  className={`inline-flex cursor-pointer items-center gap-1.5 rounded-lg border px-2.5 sm:px-3.5 py-1.5 sm:py-2 text-[11px] sm:text-xs md:text-sm font-bold tracking-wider uppercase transition-all duration-200 active:scale-95 ${
                    active
                      ? isDark
                        ? 'border-emerald-400 bg-emerald-500/20 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                        : 'border-emerald-600 bg-emerald-600 text-white shadow-md'
                      : isDark
                        ? 'border-emerald-900/60 bg-black/60 text-slate-400 hover:border-emerald-500/40 hover:text-emerald-400'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-emerald-400 hover:bg-emerald-50/50'
                  }`}
                >
                  {isKh ? category.labelKh : category.label}
                  <span
                    className={`rounded px-1.5 py-px text-[10px] font-black ${
                      active
                        ? isDark
                          ? 'bg-emerald-400/20 text-emerald-200'
                          : 'bg-white/20 text-white'
                        : isDark
                          ? 'bg-emerald-950/60 text-emerald-600'
                          : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {categoryCounts[category.id] || 0}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* SKILLS BY CATEGORY */}
        <div key={`${activeCategory}-${query}`} className="space-y-10">
          {displayCategories.length === 0 && (
            <div
              className={`rounded-2xl border border-dashed p-10 text-center text-sm ${
                isDark ? 'border-emerald-900/70 text-slate-500' : 'border-slate-300 text-slate-500'
              }`}
            >
              <p>{t.skills.noResults}</p>
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  setActiveCategory('all');
                }}
                className={`mt-3 cursor-pointer text-xs font-bold uppercase tracking-wider underline-offset-4 hover:underline ${
                  isDark ? 'text-emerald-400' : 'text-emerald-700'
                }`}
              >
                {t.skills.clear}
              </button>
            </div>
          )}

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
                      {'// '}{isKh ? category.labelKh : category.label}
                    </h2>
                  </div>
                  <span
                    className={`text-xs uppercase tracking-widest ${
                      isDark ? 'text-emerald-600' : 'text-emerald-700 font-semibold'
                    }`}
                  >
                    {groupedSkills[category.id].length} {t.skills.count}
                  </span>
                </div>

                {/* SKILL TILES */}
                <div
                  className={`relative grid grid-cols-1 gap-4 sm:gap-5 p-4 sm:p-6 sm:grid-cols-2 lg:grid-cols-3 rounded-2xl border ${
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

                  {groupedSkills[category.id].map((skill, idx) => {
                    const pct = skill.percentage ?? levelPercent[skill.level] ?? 50;
                    const brand = readableColor(skill.color, isDark);
                    const label = shortLabel(skill);
                    return (
                      <div
                        key={skill.name}
                        className={`group relative flex flex-col gap-3 rounded-xl border p-4 transition-all duration-200 hover:-translate-y-0.5 ${
                          isDark
                            ? 'border-emerald-900/40 bg-emerald-950/15 hover:border-emerald-500/60 hover:bg-emerald-950/30 hover:shadow-[0_0_18px_rgba(16,185,129,0.15)]'
                            : 'border-emerald-100 bg-emerald-50/40 hover:border-emerald-400 hover:shadow-md'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={`relative inline-flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg border font-black tracking-tight transition-transform duration-200 group-hover:scale-105 ${
                              label.length >= 5 ? 'text-[10px]' : label.length === 4 ? 'text-xs' : 'text-sm'
                            } ${isDark ? 'border-emerald-900/70 bg-black' : 'border-emerald-100 bg-white'}`}
                            style={{ color: brand, boxShadow: `inset 0 -3px 0 ${brand}` }}
                            aria-hidden="true"
                          >
                            <span
                              className="absolute inset-0 opacity-10"
                              style={{ backgroundColor: brand }}
                            />
                            <span className="relative">{label}</span>
                          </span>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-2">
                              <span
                                className={`truncate text-sm font-bold tracking-tight ${
                                  isDark
                                    ? 'text-slate-100 group-hover:text-emerald-300'
                                    : 'text-slate-800 group-hover:text-emerald-700'
                                }`}
                              >
                                {skill.name}
                              </span>
                              <span className={`text-xs font-black ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>
                                {pct}%
                              </span>
                            </div>
                            <span
                              className={`mt-1 inline-block rounded border px-1.5 py-px text-[10px] uppercase font-bold tracking-wider ${levelBadgeClass(skill.level)}`}
                            >
                              {levelLabel(skill.level)}
                            </span>
                          </div>
                        </div>

                        {skill.description && (
                          <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                            {skill.description}
                          </p>
                        )}

                        {/* PROGRESS BAR */}
                        <div
                          className={`mt-auto h-2 w-full overflow-hidden rounded-md border p-0.5 ${
                            isDark ? 'border-emerald-900/80 bg-black' : 'border-emerald-200 bg-white'
                          }`}
                          role="progressbar"
                          aria-valuenow={pct}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          aria-label={skill.name}
                        >
                          <div className="h-full" style={{ width: `${pct}%` }}>
                            <div
                              className={`skill-bar-fill h-full rounded-sm ${
                                isDark
                                  ? 'bg-gradient-to-r from-emerald-600 via-emerald-400 to-teal-300 shadow-[0_0_10px_rgba(16,185,129,0.7)]'
                                  : 'bg-gradient-to-r from-emerald-500 to-teal-600'
                              }`}
                              style={{ animationDelay: `${Math.min(idx * 60, 480)}ms` }}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* ARCHITECTURE SPECIALIZATION */}
        <div className="mt-16" data-aos="fade-up" data-aos-delay="200">
          <div className="mb-6">
            <span className={`text-xs uppercase tracking-widest font-bold ${isDark ? 'text-emerald-600' : 'text-emerald-700'}`}>
              {t.skills.specializationLabel}
            </span>
            <h3
              className={`text-2xl sm:text-3xl font-bold uppercase tracking-tight mt-1 ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              {t.skills.specializationTitle}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {architectureDomains.map((domain, i) => (
              <div
                key={domain.status}
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
                    className={`text-[10px] font-bold border px-2 py-0.5 rounded uppercase ${
                      isDark
                        ? 'border-emerald-900 bg-black text-emerald-400'
                        : 'border-emerald-200 bg-emerald-50 text-emerald-800'
                    }`}
                  >
                    {domain.status}
                  </span>
                </div>
                <h4 className={`text-base font-bold uppercase mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {domains[i]?.title}
                </h4>
                <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  {domains[i]?.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
