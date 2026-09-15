import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import {
  GraduationCap,
  Target,
  BookOpen,
  Lightbulb,
  Brain,
  Users,
  Eye,
  RefreshCw,
  MapPin,
} from 'lucide-react';
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

  const learningTags = [
    { name: 'AI', color: 'from-emerald-500 to-green-600' },
    { name: 'Python', color: 'from-primary to-accent' },
    { name: 'C# .NET', color: 'from-emerald-600 to-teal-500' },
    { name: 'Java Spring Boot', color: 'from-green-500 to-emerald-600' },
  ];

  const softSkills = [
    { icon: Brain, name: t.about.problemSolving, color: 'from-emerald-500 to-green-500' },
    { icon: Eye, name: t.about.analyticalThinking, color: 'from-primary to-accent' },
    { icon: Users, name: t.about.communication, color: 'from-green-500 to-emerald-500' },
    { icon: Lightbulb, name: t.about.attentionToDetail, color: 'from-emerald-400 to-green-600' },
    { icon: RefreshCw, name: t.about.continuousLearning, color: 'from-green-600 to-emerald-400' },
  ];

  const coreFacts = [
    { icon: GraduationCap, label: t.about.education, value: t.about.educationText },
    { icon: MapPin, label: t.hero.locationLabel, value: t.hero.location },
    { icon: Target, label: t.about.careerGoal, value: t.about.careerGoalText },
    { icon: BookOpen, label: t.about.currentLearning, value: learningTags.map(tag => tag.name).join(' \u00B7 ') },
  ];

  return (
    <section
      id="about"
      className="grid-bg grid-pattern relative min-h-screen overflow-hidden pt-28 lg:pt-32 pb-20"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div
          className="absolute -left-24 top-24 h-72 w-72 rounded-full blur-3xl animate-blob"
          style={{
            background: isDark
              ? 'radial-gradient(circle, rgba(16,185,129,0.06), transparent 70%)'
              : 'radial-gradient(circle, rgba(34,197,94,0.04), transparent 70%)',
          }}
        />
        <div
          className="absolute bottom-0 right-0 h-80 w-80 rounded-full blur-3xl animate-flicker"
          style={{
            background: isDark
              ? 'radial-gradient(circle, rgba(52,211,153,0.05), transparent 70%)'
              : 'radial-gradient(circle, rgba(34,197,94,0.03), transparent 70%)',
          }}
        />
      </div>

      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">

        <div className="mb-16 text-center" data-aos="fade-up">
          <span className="cyber-badge mb-4 inline-flex items-center gap-2">
            {'>_ about.init'}
          </span>
          <h1 className="section-title font-mono text-3xl sm:text-4xl lg:text-5xl">
            {t.hero.name}
          </h1>
          <p className="section-subtitle mt-3 text-lg">{t.about.subtitle}</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2 mb-16">

          <div
            className="card glass glass-sm glow-md overflow-hidden rounded-xl"
            data-aos="fade-right"
            data-aos-delay="200"
          >
            <div className="flex items-center gap-2 border-b border-slate-800/80 px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-red-500" />
              <span className="h-3 w-3 rounded-full bg-yellow-500" />
              <span className="h-3 w-3 rounded-full bg-green-500" />
              <span className="ml-2 font-mono text-xs text-slate-500">
                {'>_ raw_shell.sh'}
              </span>
            </div>

            <div className="space-y-5 p-6 font-mono text-sm">
              <p>
                <span className="text-primary">$</span>{' '}
                <span className="text-slate-300">whoami</span>
                <span className="terminal-cursor ml-1" aria-hidden="true" />
              </p>
              <p className="pl-4 text-primary">{t.hero.name}</p>

              <div className="border-t border-slate-800/50" />

              <p>
                <span className="text-primary">$</span>{' '}
                <span className="text-slate-300">cat about.md</span>
                <span className="terminal-cursor ml-1" aria-hidden="true" />
              </p>
              <p className="pl-4 leading-relaxed text-slate-400">
                {t.about.whoIAmText}
              </p>
              <p className="pl-4 leading-relaxed text-slate-400">
                {t.about.developmentJourneyText}
              </p>

              <div className="border-t border-slate-800/50" />

              <div className="flex flex-wrap gap-2">
                {coreFacts.map((fact, i) => {
                  const IconComponent = fact.icon;
                  return (
                    <span key={i} className="tag inline-flex items-center gap-1.5 font-mono">
                      <IconComponent className="h-3 w-3" />
                      {fact.label}: {fact.value}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>

          <div
            className="flex flex-col gap-6"
            data-aos="fade-left"
            data-aos-delay="300"
          >
            <div
              className="card glass glow-md relative overflow-hidden rounded-xl p-8"
              style={{
                boxShadow: isDark
                  ? '0 0 40px rgba(16,185,129,0.15)'
                  : '0 0 25px rgba(5,150,105,0.1)',
              }}
            >
              <div className="mx-auto mb-6 flex h-36 w-36 items-center justify-center rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-primary/20 to-accent/10">
                <span className="font-mono text-5xl font-black text-primary">NM</span>
              </div>
              <h3 className="text-center font-mono text-lg font-bold text-secondary">
                {t.hero.name}
              </h3>
              <p className="mt-1 text-center font-mono text-sm text-primary-light">
                {t.hero.role}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {coreFacts.map((fact, i) => {
                const IconComponent = fact.icon;
                return (
                  <div key={i} className="card card-hover p-4">
                    <div className="mb-2 inline-flex h-8 w-8 items-center justify-center rounded-lg border border-primary/20 bg-primary/10 text-primary">
                      <IconComponent className="h-4 w-4" />
                    </div>
                    <p className="font-mono text-xs uppercase tracking-widest text-slate-500">
                      {fact.label}
                    </p>
                    <p className="mt-1 font-mono text-sm text-secondary">
                      {fact.value}
                    </p>
                  </div>
                );
              })}
            </div>

            <a
              href="/CV_NgetMeas.pdf"
              download="CV_NgetMeas.pdf"
              className="btn-primary w-full inline-flex items-center justify-center"
            >
              {t.hero.downloadCV}
            </a>
          </div>

        </div>

        <div data-aos="fade-up" data-aos-delay="400">
          <div className="mb-10 text-center">
            <span className="cyber-badge mb-4 inline-flex items-center gap-2">
              {'>_ learning_path'}
            </span>
            <h2 className="section-title font-mono text-2xl sm:text-3xl">
              {t.about.currentLearning}
            </h2>
          </div>
          <div className="mb-14 flex flex-wrap justify-center gap-3">
            {learningTags.map((tag, index) => (
              <span
                key={index}
                className="tag font-mono"
                data-aos="zoom-in"
                data-aos-delay={500 + index * 100}
              >
                {tag.name}
              </span>
            ))}
          </div>

          <div className="mb-10 text-center">
            <span className="cyber-badge mb-4 inline-flex items-center gap-2">
              {'>_ soft_skills'}
            </span>
            <h2 className="section-title font-mono text-2xl sm:text-3xl">
              {t.about.softSkills}
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {softSkills.map((skill, index) => {
              const IconComponent = skill.icon;
              return (
                <div
                  key={index}
                  className="card card-hover group p-6 text-center"
                  data-aos="zoom-in"
                  data-aos-delay={600 + index * 90}
                >
                  <div className="glow-sm mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
                    <IconComponent className="h-7 w-7" />
                  </div>
                  <h3 className="font-mono text-base font-semibold text-secondary">
                    {skill.name}
                  </h3>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
