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
} from 'lucide-react';
import heroImage from '../../assets/hero.png';
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

  const learningTags = ['AI', 'Python', 'C# .NET', 'Java Spring Boot'];

  const focusAreas = [
    { icon: Code2, title: 'Frontend', text: 'React, Vue.js, Tailwind CSS, clean responsive UI' },
    { icon: Server, title: 'Backend', text: 'Laravel, PHP, REST API design, service logic' },
    { icon: Database, title: 'Database', text: 'MySQL, SQL Server, SQLite, relational models' },
    { icon: ShieldCheck, title: 'Delivery', text: 'GitHub, Vercel, Docker basics, maintainable code' },
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
    { value: '4', label: 'Learning Tracks' },
    { value: 'Full', label: 'Stack Focus' },
  ];

  return (
    <section
      id="about"
      className="grid-bg grid-pattern relative min-h-screen overflow-hidden pt-28 lg:pt-32 pb-16"
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
              ? 'radial-gradient(circle, rgba(45,212,191,0.05), transparent 70%)'
              : 'radial-gradient(circle, rgba(20,184,166,0.04), transparent 70%)',
          }}
        />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center" data-aos="fade-up">
          <span className="cyber-badge mb-4 inline-flex items-center gap-2">
            <Terminal className="h-3.5 w-3.5" />
            {'>_ about.profile'}
          </span>
          <h1 className="section-title font-mono text-3xl sm:text-4xl lg:text-5xl">
            {t.hero.name}
          </h1>
          <p className="section-subtitle mx-auto mt-3 max-w-2xl text-lg">
            {t.about.subtitle}
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-6" data-aos="fade-right" data-aos-delay="120">
            <div className="profile-frame relative overflow-hidden rounded-2xl p-4">
              <div className="absolute inset-0 matrix-rain-grid opacity-20" aria-hidden="true" />
              <div className="relative overflow-hidden rounded-xl border border-primary/20 bg-dark-900">
                <img
                  src={heroImage}
                  alt={t.hero.name}
                  className="profile-image h-[360px] w-full object-contain p-10"
                />
              </div>
              <div className="relative mt-4 grid grid-cols-2 gap-3">
                {stats.map((stat) => (
                  <div key={stat.label} className="rounded-lg border border-primary/15 bg-primary/5 p-3">
                    <p className="font-mono text-xl font-black text-primary">{stat.value}</p>
                    <p className="mt-1 font-mono text-[11px] uppercase tracking-widest text-secondary">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <a
              href="/CV_NgetMeas.pdf"
              download="CV_NgetMeas.pdf"
              className="btn-primary w-full"
            >
              <Download className="h-4 w-4" />
              {t.hero.downloadCV}
            </a>
          </div>

          <div className="terminal-window rounded-2xl" data-aos="fade-left" data-aos-delay="180">
            <div className="flex items-center gap-2 border-b border-slate-800/80 px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
              <span className="h-3 w-3 rounded-full bg-teal-400/80" />
              <span className="h-3 w-3 rounded-full bg-primary/80" />
              <span className="ml-2 font-mono text-xs text-slate-500">
                {'>_ nget_meas/about.md'}
              </span>
            </div>

            <div className="space-y-5 p-6 font-mono">
              <div>
                <p className="text-sm text-slate-500">
                  <span className="text-primary">$</span> whoami
                </p>
                <h2 className="mt-2 text-2xl font-black text-slate-100 sm:text-3xl">
                  {t.about.whoIAm}
                </h2>
                <p className="mt-4 leading-relaxed text-secondary">
                  {t.about.whoIAmText}
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {coreFacts.map((fact) => {
                  const IconComponent = fact.icon;
                  return (
                    <div key={fact.label} className="card card-hover p-4">
                      <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg border border-primary/20 bg-primary/10 text-primary">
                        <IconComponent className="h-4 w-4" />
                      </div>
                      <p className="font-mono text-xs uppercase tracking-widest text-slate-500">
                        {fact.label}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-secondary">
                        {fact.value}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="border-t border-primary/10 pt-6">
                <p className="text-sm text-slate-500">
                  <span className="text-primary">$</span> cat journey.log
                </p>
                <p className="mt-4 leading-relaxed text-secondary">
                  {t.about.developmentJourneyText}
                </p>
                <p className="mt-4 leading-relaxed text-secondary">
                  {t.about.interestsText}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.8fr]" data-aos="fade-up" data-aos-delay="260">
          <div className="card glass glass-sm p-6">
            <div className="mb-4 flex items-center gap-3">
              <span className="glow-sm inline-flex h-10 w-10 items-center justify-center rounded-lg border border-primary/20 bg-primary/10 text-primary">
                <Layers3 className="h-5 w-5" />
              </span>
              <div>
                <span className="cyber-badge inline-flex">{'>_ build_stack'}</span>
                <h2 className="mt-3 font-mono text-2xl font-bold text-slate-100">
                  {t.about.developmentJourney}
                </h2>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {focusAreas.map((area) => {
                const IconComponent = area.icon;
                return (
                  <div key={area.title} className="rounded-xl border border-primary/10 bg-primary/5 p-4">
                    <IconComponent className="mb-3 h-5 w-5 text-primary" />
                    <h3 className="font-mono text-sm font-bold text-slate-100">{area.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-secondary">{area.text}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="card glass glass-sm p-6">
            <div className="mb-4 flex items-center gap-3">
              <span className="glow-sm inline-flex h-10 w-10 items-center justify-center rounded-lg border border-primary/20 bg-primary/10 text-primary">
                <Binary className="h-5 w-5" />
              </span>
              <div>
                <span className="cyber-badge inline-flex">{'>_ human_skills'}</span>
                <h2 className="mt-3 font-mono text-2xl font-bold text-slate-100">
                  {t.about.softSkills}
                </h2>
              </div>
            </div>
            <div className="space-y-3">
              {softSkills.map((skill) => {
                const IconComponent = skill.icon;
                return (
                  <div key={skill.name} className="flex items-center gap-3 rounded-lg border border-primary/10 bg-dark-900/50 p-3">
                    <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <IconComponent className="h-4 w-4" />
                    </span>
                    <span className="font-mono text-sm text-secondary">{skill.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-8 text-center" data-aos="fade-up" data-aos-delay="320">
          <span className="cyber-badge mb-4 inline-flex items-center gap-2">
            {'>_ learning_path'}
          </span>
          <h2 className="section-title font-mono text-2xl sm:text-3xl">
            {t.about.currentLearning}
          </h2>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {learningTags.map((tag, index) => (
              <span
                key={tag}
                className="tag font-mono"
                data-aos="zoom-in"
                data-aos-delay={380 + index * 90}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
