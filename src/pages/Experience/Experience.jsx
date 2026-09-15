import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { 
  Briefcase, 
  Calendar, 
  CheckCircle2, 
  MapPin, 
  Terminal, 
  Activity, 
  Radio, 
  Sparkles,
  Building2,
  Clock
} from 'lucide-react';
import { experience } from '../../data/experience';
import { useLanguage } from '../../hooks/useLanguage';
import { useTheme } from '../../hooks/useTheme';

export default function Experience() {
  const { t, language } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    AOS.init({ duration: 800, easing: 'ease-out-cubic', once: true, offset: 60 });
  }, []);

  return (
    <section
      id="experience"
      className={`relative min-h-screen pt-28 lg:pt-36 pb-24 font-mono transition-colors duration-300 overflow-hidden ${
        isDark ? 'bg-[#030504] text-emerald-400' : 'bg-[#f4f7f5] text-slate-900'
      }`}
    >
      {/* AMBIENT GLOW BACKDROPS */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div
          className="absolute -left-20 top-24 h-96 w-96 rounded-full blur-3xl animate-blob"
          style={{
            background: isDark
              ? 'radial-gradient(circle, rgba(16,185,129,0.08), transparent 70%)'
              : 'radial-gradient(circle, rgba(16,185,129,0.12), transparent 70%)',
          }}
        />
        <div
          className="absolute bottom-12 right-0 h-96 w-96 rounded-full blur-3xl animate-flicker"
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
            {'>_ timeline.career'}
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
            {t.experience.title}
          </h1>
          <p
            className={`mx-auto mt-3 max-w-2xl text-base sm:text-lg ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}
          >
            {t.experience.subtitle}
          </p>
        </div>

        {/* CAREER TELEMETRY HUD STRIP */}
        <div
          className={`mb-14 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 border p-4 sm:p-5 rounded-xl ${
            isDark
              ? 'border-emerald-500/30 bg-black/60 shadow-[0_0_20px_rgba(16,185,129,0.1)]'
              : 'border-emerald-200 bg-white shadow-xs'
          }`}
          data-aos="fade-up"
        >
          <div className="space-y-0.5">
            <span className={`text-[10px] uppercase tracking-wider font-bold ${isDark ? 'text-emerald-600' : 'text-emerald-700'}`}>
              ENGAGEMENTS
            </span>
            <div className={`text-xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {experience.length} LOGGED
            </div>
          </div>
          <div className="space-y-0.5">
            <span className={`text-[10px] uppercase tracking-wider font-bold ${isDark ? 'text-emerald-600' : 'text-emerald-700'}`}>
              CURRENT STATUS
            </span>
            <div className="text-xl font-black text-emerald-500 flex items-center gap-1.5">
              <Activity className="h-4 w-4 animate-spin" /> ACTIVE // READY
            </div>
          </div>
          <div className="space-y-0.5">
            <span className={`text-[10px] uppercase tracking-wider font-bold ${isDark ? 'text-emerald-600' : 'text-emerald-700'}`}>
              LOCATION BASE
            </span>
            <div className={`text-xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
              PHNOM PENH
            </div>
          </div>
          <div className="space-y-0.5">
            <span className={`text-[10px] uppercase tracking-wider font-bold ${isDark ? 'text-emerald-600' : 'text-emerald-700'}`}>
              CODE AUDIT
            </span>
            <div className="text-xl font-black text-emerald-500 flex items-center gap-1.5">
              <Sparkles className="h-4 w-4" /> 100% RELIABLE
            </div>
          </div>
        </div>

        {/* TIMELINE TREE */}
        <div className="relative">
          {/* Vertical timeline rail */}
          <div
            className="timeline-line absolute left-6 top-0 bottom-0 w-0.5 md:left-1/2 md:-translate-x-1/2"
            aria-hidden="true"
          >
            <div className={`h-full w-full ${isDark ? 'bg-emerald-500/25' : 'bg-emerald-600/30'}`} />
            
            {/* Animated Laser Data Sweep */}
            <div className="absolute inset-0 w-full overflow-hidden">
              <div
                className="h-40 w-full"
                style={{
                  background: isDark
                    ? 'linear-gradient(180deg, transparent 0%, rgba(16,185,129,0.9) 50%, transparent 100%)'
                    : 'linear-gradient(180deg, transparent 0%, rgba(5,150,105,0.9) 50%, transparent 100%)',
                  animation: 'laserTimeline 4s linear infinite',
                }}
              />
            </div>
          </div>

          <div className="space-y-12">
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
                  {/* Glowing Node Marker */}
                  <div className="timeline-dot absolute left-6 top-6 z-20 md:left-1/2 md:-translate-x-1/2">
                    <div
                      className={`relative flex h-11 w-11 items-center justify-center rounded-xl border-2 transition-transform duration-300 hover:scale-110 ${
                        isDark
                          ? 'border-emerald-400 bg-black shadow-[0_0_20px_rgba(16,185,129,0.6)]'
                          : 'border-emerald-600 bg-white shadow-md'
                      }`}
                    >
                      <span
                        className={`font-mono text-xs font-black ${
                          isDark ? 'text-emerald-400' : 'text-emerald-700'
                        }`}
                      >
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                    </div>
                  </div>

                  {/* Experience Card */}
                  <div className={`w-full md:w-[calc(50%-3.5rem)] ${isLeft ? 'md:pr-2' : 'md:pl-2'}`}>
                    <article
                      data-aos={isLeft ? 'fade-right' : 'fade-left'}
                      data-aos-delay={index * 100}
                      className={`group relative overflow-hidden rounded-2xl border p-6 sm:p-7 transition-all duration-300 ${
                        isDark
                          ? 'border-emerald-900/60 bg-black/90 hover:border-emerald-400 hover:shadow-[0_0_30px_rgba(16,185,129,0.15)]'
                          : 'border-emerald-200 bg-white hover:border-emerald-500 hover:shadow-lg shadow-xs'
                      }`}
                    >
                      {/* CORNER RETICLES */}
                      <span className={`absolute top-2 left-2 h-2.5 w-2.5 border-t-2 border-l-2 ${isDark ? 'border-emerald-500/40 group-hover:border-emerald-400' : 'border-emerald-300 group-hover:border-emerald-600'}`} />
                      <span className={`absolute top-2 right-2 h-2.5 w-2.5 border-t-2 border-r-2 ${isDark ? 'border-emerald-500/40 group-hover:border-emerald-400' : 'border-emerald-300 group-hover:border-emerald-600'}`} />
                      <span className={`absolute bottom-2 left-2 h-2.5 w-2.5 border-b-2 border-l-2 ${isDark ? 'border-emerald-500/40 group-hover:border-emerald-400' : 'border-emerald-300 group-hover:border-emerald-600'}`} />
                      <span className={`absolute bottom-2 right-2 h-2.5 w-2.5 border-b-2 border-r-2 ${isDark ? 'border-emerald-500/40 group-hover:border-emerald-400' : 'border-emerald-300 group-hover:border-emerald-600'}`} />

                      {/* CARD TOP STATUS BAR */}
                      <div
                        className={`flex items-center justify-between border-b pb-3 mb-4 text-xs ${
                          isDark ? 'border-emerald-950 text-emerald-600' : 'border-emerald-100 text-emerald-800'
                        }`}
                      >
                        <span className="font-bold flex items-center gap-1.5 font-mono">
                          <Radio className="h-3 w-3 text-emerald-500 animate-pulse" />
                          ENGAGEMENT_ID: #{item.id}
                        </span>
                        <span className={`text-[10px] uppercase font-bold border px-2 py-0.5 rounded ${
                          isDark ? 'border-emerald-900 bg-emerald-950/40 text-emerald-400' : 'border-emerald-200 bg-emerald-50 text-emerald-800'
                        }`}>
                          {type}
                        </span>
                      </div>

                      {/* ROLE & COMPANY */}
                      <div className="mb-4">
                        <div className="flex items-center gap-2">
                          <span className={`text-xs font-bold ${isDark ? 'text-emerald-500' : 'text-emerald-700'}`}>
                            {'>_'}
                          </span>
                          <h3
                            className={`font-mono text-lg sm:text-xl font-bold uppercase tracking-tight transition-colors ${
                              isDark
                                ? 'text-white group-hover:text-emerald-400'
                                : 'text-slate-900 group-hover:text-emerald-700'
                            }`}
                          >
                            {title}
                          </h3>
                        </div>

                        <div className="mt-2 flex flex-wrap items-center gap-4 text-xs sm:text-sm">
                          <span className={`flex items-center gap-1.5 font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-800'}`}>
                            <Building2 className="h-3.5 w-3.5 text-emerald-500" />
                            @{company}
                          </span>
                          <span className={`flex items-center gap-1.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                            <Clock className="h-3.5 w-3.5 text-emerald-500" />
                            {period}
                          </span>
                        </div>
                      </div>

                      {/* KEY RESPONSIBILITIES / LOGS */}
                      {responsibilities && responsibilities.length > 0 && (
                        <div
                          className={`mt-4 border-t pt-4 ${
                            isDark ? 'border-emerald-950' : 'border-emerald-100'
                          }`}
                        >
                          <h4
                            className={`mb-3 font-mono text-xs font-bold uppercase tracking-widest ${
                              isDark ? 'text-emerald-600' : 'text-emerald-700'
                            }`}
                          >
                            // {t.experience.responsibilities}
                          </h4>
                          <ul className="space-y-2.5">
                            {responsibilities.map((resp, i) => (
                              <li
                                key={i}
                                className={`flex items-start gap-3 text-xs sm:text-sm leading-relaxed ${
                                  isDark ? 'text-slate-300' : 'text-slate-600'
                                }`}
                              >
                                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                                <span>{resp}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </article>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      <style>{`
        @keyframes laserTimeline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(1000%); }
        }
      `}</style>
    </section>
  );
}