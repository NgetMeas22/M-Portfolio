import { useEffect, useMemo, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Code, Database, Server, Wrench, BookOpen, Filter, Terminal } from 'lucide-react';
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

const levelPercent = {
  comfortable: 85,
  familiar: 60,
  learning: 35,
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

  const isDark = theme === 'dark';

  return (
    <section className="grid-bg grid-pattern relative min-h-screen pt-28 lg:pt-32 pb-16">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">

        <div className="mb-10 text-center" data-aos="fade-up">
          <span className="cyber-badge mb-4 inline-flex items-center gap-2">
            <Terminal className="h-3.5 w-3.5" />
            {`>_ skills.matrix`}
          </span>
          <h1
            className="section-title text-3xl sm:text-4xl lg:text-5xl font-mono"
            style={{
              textShadow: isDark
                ? '0 0 30px rgba(16, 185, 129, 0.35)'
                : '0 0 26px rgba(5, 150, 105, 0.2)',
            }}
          >
            Skills<span className="text-primary"> // </span>capabilities
          </h1>
          <p className="section-subtitle mt-3 text-lg">{t.skills.subtitle}</p>
        </div>

        <div
          className="mb-8 flex flex-wrap items-center justify-center gap-3"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <span className="mr-1 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-secondary">
            <Filter className="h-4 w-4 text-primary" />
            <span>{t.nav.skills}</span>
          </span>
          {skillCategories.map((category) => {
            const active = activeCategory === category.id;
            return (
              <button
                key={category.id}
                type="button"
                onClick={() => setActiveCategory(category.id)}
                className={`rounded-full border px-4 py-2 font-mono text-xs transition-all duration-300 active:scale-95 sm:text-sm ${
                  active
                    ? 'glow-sm border-primary/60 bg-primary/10 text-primary'
                    : 'border-slate-800 text-slate-400 hover:border-primary/40 hover:text-primary'
                }`}
              >
                {language === 'kh' ? category.labelKh : category.label}
              </button>
            );
          })}
        </div>

        <div key={activeCategory} className="space-y-8">
          {displayCategories.map((category, catIdx) => (
            <div
              key={category.id}
              data-aos="fade-up"
              data-aos-delay={Math.min(catIdx * 80, 300)}
            >
              <div className="mb-4 flex items-center gap-3">
                <span className="glow-sm inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-primary/20 bg-primary/10 text-primary">
                  {categoryIcons[category.id] || <Code className="h-5 w-5" />}
                </span>
                <h2 className="section-subtitle font-mono text-sm uppercase tracking-widest sm:text-base">
                  {'['}{language === 'kh' ? category.labelKh : category.label}{']'}
                </h2>
              </div>

              <div className="card grid grid-cols-1 gap-x-6 gap-y-4 p-6 sm:grid-cols-2 lg:grid-cols-3">
                {groupedSkills[category.id].map((skill) => {
                  const pct = levelPercent[skill.level] ?? 50;
                  return (
                    <div key={skill.name} className="flex flex-col gap-1.5">
                      <div className="flex items-center justify-between gap-3">
                        <span className="truncate font-mono text-sm font-semibold text-slate-200">
                          {skill.name}
                        </span>
                        <span className="font-mono text-xs text-slate-500">
                          {pct}%
                        </span>
                      </div>

                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-800/80">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-primary to-primary-light transition-all duration-700"
                          style={{ width: `${pct}%` }}
                        />
                      </div>

                      <span className="tag mt-1 w-fit font-mono">
                        {levelLabel(skill.level)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;