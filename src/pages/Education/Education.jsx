import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { GraduationCap, BookOpen, Calendar, MapPin, Award } from 'lucide-react';
import { education } from '../../data/experience';
import { useLanguage } from '../../hooks/useLanguage';
import { useTheme } from '../../hooks/useTheme';

const nodeStyles = [
  {
    icon: GraduationCap,
    gradient: 'from-cyan-500 to-blue-600',
    glow: 'rgba(0,212,255,0.45)',
  },
  {
    icon: BookOpen,
    gradient: 'from-purple-500 to-pink-600',
    glow: 'rgba(168,85,247,0.45)',
  },
];

function Education() {
  const { t, language } = useLanguage();
  const { theme } = useTheme();

  const isDark = theme === 'dark';

  useEffect(() => {
    AOS.init({ duration: 800, easing: 'ease-out-cubic', once: true, offset: 60 });
  }, []);

  return (
    <>
      <style>
        {`
          @keyframes timelineCardIn {
            from { opacity: 0; transform: translateY(24px) scale(0.96); }
            to { opacity: 1; transform: translateY(0) scale(1); }
          }
        `}
      </style>

      <section className="grid-bg relative min-h-screen overflow-hidden pt-24 pb-20">
        <div className="mx-auto w-full max-w-5xl px-6">
          {/* Page header */}
          <div className="mb-16 text-center" data-aos="fade-up">
            <div
              className={`mb-3 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold tracking-wide ${
                isDark
                  ? 'border-cyan-500/30 bg-cyan-500/10 text-cyan-400'
                  : 'border-blue-500/30 bg-blue-500/10 text-blue-600'
              }`}
            >
              <GraduationCap className="h-3.5 w-3.5" />
              {t.nav.education}
            </div>
            <h1 className="section-title text-3xl sm:text-4xl lg:text-5xl">
              {t.education.title}
            </h1>
            <p className="section-subtitle text-lg">{t.education.subtitle}</p>
          </div>

          {/* Timeline */}
          <div className="relative">
            <span
              aria-hidden="true"
              className={`absolute bottom-4 left-5 top-4 w-px md:left-1/2 md:-translate-x-1/2 ${
                isDark
                  ? 'bg-gradient-to-b from-cyan-500/40 via-purple-500/40 to-transparent'
                  : 'bg-gradient-to-b from-blue-500/40 via-purple-500/40 to-transparent'
              }`}
            />

            <div className="space-y-12">
              {education.map((item, index) => {
                const leftSide = index % 2 === 0;
                const node = nodeStyles[index % nodeStyles.length];
                const NodeIcon = node.icon;
                const institution =
                  language === 'kh' ? item.institutionKh : item.institution;
                const degree = language === 'kh' ? item.degreeKh : item.degree;
                const status = language === 'kh' ? item.statusKh : item.status;
                const description =
                  language === 'kh' ? item.descriptionKh : item.description;
                const coursework =
                  language === 'kh' ? item.courseworkKh : item.coursework;

                return (
                  <div
                    key={item.id}
                    className={`relative flex pl-16 md:pl-0 ${
                      leftSide ? 'md:justify-start' : 'md:justify-end'
                    }`}
                  >
                    {/* Timeline node */}
                    <div
                      className={`absolute left-0 top-2 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br ${
                        node.gradient
                      } md:left-1/2 md:-translate-x-1/2`}
                      style={{ boxShadow: `0 0 18px ${node.glow}` }}
                    >
                      <NodeIcon className="h-5 w-5 text-white" />
                    </div>

                    {/* Card */}
                    <div className="md:w-[calc(50%_-_3.5rem)]">
                      <article
                        data-aos="fade-up"
                        data-aos-delay={index * 100}
                        className={`card group flex h-full flex-col gap-4 overflow-hidden transition-all duration-300 ${
                          isDark
                            ? 'border-slate-800 bg-slate-900/50 hover:border-cyan-500/30 hover:shadow-[0_0_30px_rgba(0,212,255,0.08)]'
                            : 'border-slate-200 bg-white shadow-md hover:shadow-xl hover:border-blue-200'
                        }`}
                        style={{
                          animation: `timelineCardIn 0.5s ease ${index * 0.08}s both`,
                        }}
                      >
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <div>
                            <h3
                              className={`text-xl font-bold transition-colors ${
                                isDark ? 'text-slate-100' : 'text-slate-800'
                              }`}
                            >
                              {degree}
                            </h3>
                            <div
                              className={`mt-1.5 flex items-center gap-2 text-sm font-medium ${
                                isDark ? 'text-slate-400' : 'text-slate-500'
                              }`}
                            >
                              <MapPin className="h-4 w-4 text-cyan-500" />
                              {institution}
                            </div>
                          </div>
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${
                              isDark
                                ? 'border-purple-500/30 bg-purple-500/10 text-purple-400'
                                : 'border-purple-500/30 bg-purple-500/10 text-purple-600'
                            }`}
                          >
                            <Award className="h-3 w-3" />
                            {status}
                          </span>
                        </div>

                        {item.expectedGraduation && (
                          <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
                            <span
                              className={`inline-flex items-center gap-1.5 font-medium ${
                                isDark ? 'text-cyan-400' : 'text-blue-600'
                              }`}
                            >
                              <Calendar className="h-4 w-4" />
                              {t.education.expectedGraduation}: {item.expectedGraduation}
                            </span>
                          </div>
                        )}

                        <p
                          className={`border-t pt-3 text-sm leading-relaxed ${
                            isDark
                              ? 'border-slate-800 text-slate-400'
                              : 'border-slate-100 text-slate-500'
                          }`}
                        >
                          {description}
                        </p>

                        <div className="mt-auto">
                          <h4
                            className={`mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wide ${
                              isDark ? 'text-slate-300' : 'text-slate-700'
                            }`}
                          >
                            <BookOpen className="h-4 w-4 text-cyan-500" />
                            {t.education.relevantCoursework}
                          </h4>
                          <div className="flex flex-wrap gap-1.5">
                            {coursework.map((course, i) => (
                              <span
                                key={i}
                                className={`rounded-md border px-2.5 py-1 text-xs font-medium ${
                                  isDark
                                    ? 'border-cyan-500/20 bg-cyan-500/5 text-cyan-400'
                                    : 'border-blue-500/20 bg-blue-500/5 text-blue-600'
                                }`}
                              >
                                {course}
                              </span>
                            ))}
                          </div>
                        </div>
                      </article>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Education;