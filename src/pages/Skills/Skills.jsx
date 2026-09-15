import { useEffect, useMemo, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Code, Database, Server, Wrench, BookOpen, Filter } from 'lucide-react';
import { skills, skillCategories, skillLevelLabels } from '../../data/skills';
import { useLanguage } from '../../hooks/useLanguage';
import { useTheme } from '../../hooks/useTheme';

const categoryIcons = {
  Frontend: <Code className="h-6 w-6" />,
  Backend: <Server className="h-6 w-6" />,
  Database: <Database className="h-6 w-6" />,
  Tools: <Wrench className="h-6 w-6" />,
  Learning: <BookOpen className="h-6 w-6" />
};

const levelStyles = {
  comfortable: {
    dark: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
    light: 'text-emerald-600 border-emerald-600/30 bg-emerald-600/10'
  },
  familiar: {
    dark: 'text-amber-400 border-amber-500/30 bg-amber-500/10',
    light: 'text-amber-600 border-amber-600/30 bg-amber-600/10'
  },
  learning: {
    dark: 'text-purple-400 border-purple-500/30 bg-purple-500/10',
    light: 'text-purple-600 border-purple-600/30 bg-purple-600/10'
  }
};

const tabStyles = {
  active: {
    dark: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/40 shadow-[0_0_15px_rgba(0,212,255,0.15)]',
    light: 'bg-blue-500/10 text-blue-600 border-blue-500/40 shadow-[0_0_15px_rgba(0,102,204,0.1)]'
  },
  inactive: {
    dark: 'text-slate-400 border-slate-700 hover:border-cyan-500/40 hover:text-cyan-400',
    light: 'text-slate-500 border-slate-200 hover:border-blue-500/40 hover:text-blue-600'
  }
};

function Skills() {
  const { t, language } = useLanguage();
  const { theme } = useTheme();
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

  const levelLabel = (level) =>
    skillLevelLabels[level]?.[language === 'kh' ? 'kh' : 'en'] || level;

  const isDark = theme === 'dark';

  return (
    <>
      <style>
        {`
          @keyframes skillCardIn {
            from { opacity: 0; transform: translateY(24px) scale(0.96); }
            to { opacity: 1; transform: translateY(0) scale(1); }
          }
        `}
      </style>

      <section className="grid-bg relative min-h-screen pt-24 pb-20">
        <div className="mx-auto w-full max-w-7xl px-6">
          <div className="mb-12 text-center" data-aos="fade-up">
            <div
              className={`mb-3 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold tracking-wide ${
                isDark
                  ? 'border-cyan-500/30 bg-cyan-500/10 text-cyan-400'
                  : 'border-blue-500/30 bg-blue-500/10 text-blue-600'
              }`}
            >
              <Code className="h-3.5 w-3.5" />
              Technical Stack
            </div>
            <h1 className="section-title text-3xl sm:text-4xl lg:text-5xl">
              {t.skills.title}
            </h1>
            <p className="section-subtitle text-lg">{t.skills.subtitle}</p>
          </div>

          <div
            className="mb-12 flex flex-wrap items-center justify-center gap-3"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <div
              className={`mr-1 inline-flex items-center gap-2 text-sm font-medium ${
                isDark ? 'text-slate-400' : 'text-slate-500'
              }`}
            >
              <Filter className="h-4 w-4" />
              <span>{t.nav.skills}</span>
            </div>
            {skillCategories.map((category) => {
              const active = activeCategory === category.id;
              const styles = active ? tabStyles.active : tabStyles.inactive;
              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setActiveCategory(category.id)}
                  className={`cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300 active:scale-95 ${
                    active ? styles[theme] : styles[theme]
                  }`}
                >
                  {language === 'kh' ? category.labelKh : category.label}
                </button>
              );
            })}
          </div>

          <div key={activeCategory} className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredSkills.map((skill, index) => (
              <article
                key={skill.name}
                data-aos="fade-up"
                data-aos-delay={Math.min(index * 50, 300)}
                className="card group flex flex-col gap-4"
                style={{ animation: `skillCardIn 0.45s ease ${index * 0.05}s both` }}
              >
                <div className="flex items-start">
                  <div
                    className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-xl text-white transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1"
                    style={{
                      backgroundColor: skill.color,
                      boxShadow: `0 0 24px ${skill.color}66`
                    }}
                  >
                    {categoryIcons[skill.category] || <Code className="h-6 w-6" />}
                  </div>
                  <span
                    className={`ml-auto rounded-full border px-3 py-1 text-xs font-semibold ${
                      levelStyles[skill.level][theme]
                    }`}
                  >
                    {levelLabel(skill.level)}
                  </span>
                </div>

                <div>
                  <h3
                    className={`text-lg font-bold transition-colors ${
                      isDark ? 'text-slate-100' : 'text-slate-800'
                    }`}
                  >
                    {skill.name}
                  </h3>
                  <span
                    className={`mt-2 inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-medium ${
                      isDark
                        ? 'border-cyan-500/20 bg-cyan-500/5 text-cyan-400'
                        : 'border-blue-500/20 bg-blue-500/5 text-blue-600'
                    }`}
                  >
                    {categoryIcons[skill.category]}
                    {skill.category}
                  </span>
                </div>

                <p
                  className={`mt-auto border-t pt-3 text-sm leading-relaxed ${
                    isDark ? 'border-slate-800 text-slate-400' : 'border-slate-100 text-slate-500'
                  }`}
                >
                  {skill.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Skills;