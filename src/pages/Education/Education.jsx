import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { BookOpen, Calendar, GraduationCap, MapPin } from 'lucide-react';
import { education } from '../../data/experience';
import { useLanguage } from '../../hooks/useLanguage';
import { useTheme } from '../../hooks/useTheme';

function Education() {
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
            <GraduationCap className="h-3.5 w-3.5" />
            {'>_ education.dao'}
          </span>
          <h1
            className="section-title text-3xl sm:text-4xl lg:text-5xl font-mono"
            style={{
              textShadow: isDark
                ? '0 0 30px rgba(16, 185, 129, 0.35)'
                : '0 0 26px rgba(5, 150, 105, 0.2)',
            }}
          >
            {t.education.title}
          </h1>
          <p className="section-subtitle text-lg mt-2">{t.education.subtitle}</p>
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
            {education.map((item, index) => {
              const isLeft = index % 2 === 0;
              const institution = language === 'kh' ? item.institutionKh : item.institution;
              const degree = language === 'kh' ? item.degreeKh : item.degree;
              const status = language === 'kh' ? item.statusKh : item.status;
              const coursework = language === 'kh' ? item.courseworkKh : item.coursework;
              const description = language === 'kh' ? item.descriptionKh : item.description;

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
                        {/* Header: degree + emerald tile + institution */}
                        <div className="mb-3 flex items-start gap-3">
                          <span className="glow-sm mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-primary/20 bg-primary/10 text-primary">
                            <GraduationCap className="h-5 w-5" />
                          </span>
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-baseline gap-2">
                              <span className="font-mono text-xs font-bold text-primary">
                                {'>_'}
                              </span>
                              <h3
                                className={`font-mono text-lg font-bold transition-colors group-hover:text-primary ${
                                  isDark ? 'text-slate-100' : 'text-slate-800'
                                }`}
                              >
                                {degree}
                              </h3>
                            </div>
                            <span className="mt-1 flex items-center gap-1.5 text-sm">
                              <MapPin className="h-3.5 w-3.5 text-primary" />
                              <span className="font-mono font-medium text-primary">
                                @{institution}
                              </span>
                            </span>
                          </div>
                        </div>

                        {/* Status / grade + expected graduation */}
                        <div className="mb-3 flex flex-wrap items-center gap-2">
                          {status && (
                            <span className="tag inline-flex items-center gap-1.5 font-mono">
                              <GraduationCap className="h-3.5 w-3.5" />
                              {status}
                            </span>
                          )}
                          {item.expectedGraduation && (
                            <span className="tag inline-flex items-center gap-1.5">
                              <Calendar className="h-3.5 w-3.5" />
                              {t.education.expectedGraduation}: {item.expectedGraduation}
                            </span>
                          )}
                        </div>

                        {/* Description */}
                        {description && (
                          <p
                            className={`mb-3 text-sm leading-relaxed ${
                              isDark ? 'text-slate-400' : 'text-slate-600'
                            }`}
                          >
                            {description}
                          </p>
                        )}

                        {/* Coursework */}
                        {coursework && coursework.length > 0 && (
                          <div
                            className={`border-t pt-3 ${
                              isDark ? 'border-white/10' : 'border-slate-200'
                            }`}
                          >
                            <h4
                              className={`mb-2.5 flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest ${
                                isDark ? 'text-slate-500' : 'text-slate-600'
                              }`}
                            >
                              <span className="glow-sm inline-flex h-6 w-6 items-center justify-center rounded-md border border-primary/20 bg-primary/10 text-primary">
                                <BookOpen className="h-3.5 w-3.5" />
                              </span>
                              {t.education.relevantCoursework}
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {coursework.map((course, i) => (
                                <span key={i} className="tag font-mono text-xs">
                                  {course}
                                </span>
                              ))}
                            </div>
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

export default Education;