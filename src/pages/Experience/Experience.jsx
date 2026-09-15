import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Briefcase, Calendar, CheckCircle2, MapPin } from 'lucide-react';
import { experience } from '../../data/experience';
import { useLanguage } from '../../hooks/useLanguage';
import { useTheme } from '../../hooks/useTheme';

function Experience() {
  const { t, language } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    AOS.init({ duration: 800, easing: 'ease-out-cubic', once: true, offset: 60 });
  }, []);

  return (
    <section className="grid-bg grid-pattern relative min-h-screen overflow-hidden pt-28 lg:pt-32 pb-16">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center" data-aos="fade-up">
          <span className="cyber-badge mb-4 inline-flex items-center gap-2">
            <Briefcase className="h-3.5 w-3.5" />
            {'>_ timeline.er'}
          </span>
          <h1
            className="section-title text-3xl sm:text-4xl lg:text-5xl font-mono"
            style={{
              textShadow: isDark
                ? '0 0 30px rgba(16, 185, 129, 0.35)'
                : '0 0 26px rgba(5, 150, 105, 0.2)',
            }}
          >
            {t.experience.title}
          </h1>
          <p className="section-subtitle text-lg mt-2">{t.experience.subtitle}</p>
        </div>

        <div className="relative">
          {/* Vertical timeline rail — left rail on mobile, centered on desktop */}
          <div
            className="timeline-line absolute left-6 top-0 bottom-0 w-px md:left-1/2 md:-translate-x-1/2"
            aria-hidden="true"
          >
            <div className={`h-full w-full ${isDark ? 'bg-emerald-500/30' : 'bg-green-500/30'}`} />
            <div className="absolute inset-0 w-full overflow-hidden">
              <div
                className="h-full w-full"
                style={{
                  background: isDark
                    ? 'linear-gradient(180deg, transparent 0%, rgba(16,185,129,0.08) 40%, rgba(16,185,129,0.15) 50%, rgba(16,185,129,0.08) 60%, transparent 100%)'
                    : 'linear-gradient(180deg, transparent 0%, rgba(34,197,94,0.08) 40%, rgba(34,197,94,0.15) 50%, rgba(34,197,94,0.08) 60%, transparent 100%)',
                  backgroundSize: '100% 200%',
                  animation: 'scanPulse 4s ease-in-out infinite',
                }}
              />
            </div>
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 h-32 w-full"
              style={{
                background: isDark
                  ? 'linear-gradient(180deg, rgba(16,185,129,0.5) 0%, transparent 100%)'
                  : 'linear-gradient(180deg, rgba(34,197,94,0.5) 0%, transparent 100%)',
              }}
            />
          </div>

          <div className="space-y-8">
            {experience.map((item, index) => {
              const isLeft = index % 2 === 0;
              const title = language === 'kh' ? item.titleKh : item.title;
              const company = language === 'kh' ? item.companyKh : item.company;
              const period = language === 'kh' ? item.periodKh : item.period;
              const type = language === 'kh' ? item.typeKh : item.type;
              const responsibilities =
                language === 'kh' ? item.responsibilitiesKh : item.responsibilities;

              return (
                <div
                  key={item.id}
                  className={`relative flex items-start pl-16 md:pl-0 ${
                    isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Glowing emerald node */}
                  <div className="timeline-dot absolute left-6 top-8 z-10 md:left-1/2 md:-translate-x-1/2">
                    <div
                      className={`glow-md relative flex h-12 w-12 items-center justify-center rounded-full border-2 ${
                        isDark
                          ? 'border-emerald-400 bg-emerald-950/80 shadow-[0_0_20px_rgba(16,185,129,0.5)]'
                          : 'border-green-500 bg-green-50 shadow-[0_0_20px_rgba(34,197,94,0.4)]'
                      }`}
                    >
                      <span
                        className={`font-mono text-xs font-bold ${
                          isDark ? 'text-emerald-400' : 'text-green-600'
                        }`}
                      >
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="terminal-cursor absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-emerald-400" />
                    </div>
                  </div>

                  {/* Card */}
                  <div className={`md:w-[calc(50%-3rem)] ${isLeft ? 'md:pr-0' : 'md:pl-0'}`}>
                    <article
                      data-aos={isLeft ? 'fade-right' : 'fade-left'}
                      data-aos-delay={index * 120}
                      className="card glass glass-sm card-hover group overflow-hidden"
                    >
                      <div className="p-5 sm:p-6">
                        {/* Header: role + company */}
                        <div className="mb-3">
                          <div className="flex flex-wrap items-baseline gap-2">
                            <span className="font-mono text-xs font-bold text-primary">
                              {'>_'}
                            </span>
                            <h3
                              className={`font-mono text-lg font-bold transition-colors group-hover:text-primary ${
                                isDark ? 'text-slate-100' : 'text-slate-800'
                              }`}
                            >
                              {title}
                            </h3>
                          </div>
                          <div className="mt-1.5 flex flex-wrap items-center gap-3 text-sm">
                            <span className="flex items-center gap-1.5">
                              <MapPin className="h-3.5 w-3.5 text-primary" />
                              <span className="font-mono font-medium text-primary">
                                @{company}
                              </span>
                            </span>
                            <span className="tag text-xs">{type}</span>
                          </div>
                        </div>

                        {/* Date range */}
                        <div className="mb-3">
                          <span className="tag inline-flex items-center gap-1.5 font-mono">
                            <Calendar className="h-3.5 w-3.5" />
                            {period}
                          </span>
                        </div>

                        {/* Key responsibilities */}
                        {responsibilities && responsibilities.length > 0 && (
                          <div
                            className={`border-t pt-3 ${
                              isDark ? 'border-white/10' : 'border-slate-200'
                            }`}
                          >
                            <h4
                              className={`mb-2.5 font-mono text-xs font-semibold uppercase tracking-widest ${
                                isDark ? 'text-slate-500' : 'text-slate-600'
                              }`}
                            >
                              {t.experience.responsibilities}
                            </h4>
                            <ul className="space-y-2">
                              {responsibilities.map((resp, i) => (
                                <li
                                  key={i}
                                  className={`flex items-start gap-2.5 text-sm ${
                                    isDark ? 'text-slate-400' : 'text-slate-600'
                                  }`}
                                >
                                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                                  <span>{resp}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </article>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scanPulse {
          0%, 100% { background-position: 0% 0%; }
          50% { background-position: 0% 100%; }
        }
      `}</style>
    </section>
  );
}

export default Experience;