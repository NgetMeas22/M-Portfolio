import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import {
  Globe,
  Layout,
  Server,
  Database,
  Smartphone,
  Settings,
  Code,
  Terminal,
  ArrowRight,
  MessageSquare,
} from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';
import { useTheme } from '../../hooks/useTheme';
import PageBackground from '../../components/PageBackground/PageBackground.jsx';

const serviceItems = [
  { icon: Globe, titleKey: 'webDev', descKey: 'webDevDesc', tags: ['Next.js', 'React', 'Laravel'] },
  { icon: Layout, titleKey: 'frontend', descKey: 'frontendDesc', tags: ['React', 'Tailwind'] },
  { icon: Server, titleKey: 'backend', descKey: 'backendDesc', tags: ['Express', 'Node.js', 'Laravel'] },
  { icon: Code, titleKey: 'api', descKey: 'apiDesc', tags: ['REST', 'JSON'] },
  { icon: Database, titleKey: 'database', descKey: 'databaseDesc', tags: ['PostgreSQL', 'MySQL', 'Neon'] },
  { icon: Smartphone, titleKey: 'responsive', descKey: 'responsiveDesc', tags: ['Mobile-First'] },
  { icon: Settings, titleKey: 'maintenance', descKey: 'maintenanceDesc', tags: ['Bugfix', 'Speed'] },
];

export default function Services() {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    AOS.init({ duration: 700, once: true, easing: 'ease-out-cubic' });
  }, []);

  return (
    <section
      id="services"
      className={`grid-bg grid-pattern relative min-h-screen pt-20 sm:pt-28 lg:pt-36 pb-12 sm:pb-24 font-mono transition-colors duration-300 overflow-hidden ${
        isDark
          ? 'bg-[#030504] text-emerald-400 selection:bg-emerald-500 selection:text-black'
          : 'bg-[#f4f7f5] text-slate-900 selection:bg-emerald-600 selection:text-white'
      }`}
    >
      <PageBackground isDark={isDark} />

      <div className="relative mx-auto w-full max-w-6xl px-3.5 sm:px-6 lg:px-8">

        {/* HEADER */}
        <div className="mb-8 sm:mb-12 text-center" data-aos="fade-up">
          <span
            className={`mb-2 sm:mb-4 inline-flex items-center gap-1.5 sm:gap-2 border px-2.5 sm:px-3.5 py-1 text-[11px] sm:text-xs uppercase tracking-wider font-bold rounded ${
              isDark
                ? 'border-emerald-500/40 bg-emerald-950/40 text-emerald-300'
                : 'border-emerald-600/30 bg-emerald-100/60 text-emerald-900'
            }`}
          >
            <Terminal className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
            {'>_ system.services'}
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
            {t.services.title}
          </h1>
          <p
            className={`mx-auto mt-2 sm:mt-3 max-w-xl text-xs sm:text-base ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}
          >
            {t.services.subtitle}
          </p>
        </div>

        {/* SERVICES GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {serviceItems.map((service, index) => {
            const Icon = service.icon;
            return (
              <article
                key={service.titleKey}
                data-aos="fade-up"
                data-aos-delay={Math.min(index * 60, 300)}
                className={`group flex gap-4 rounded-2xl border p-5 transition-all duration-200 hover:-translate-y-0.5 ${
                  isDark
                    ? 'border-emerald-900/60 bg-black/80 hover:border-emerald-500/70 hover:shadow-[0_0_24px_rgba(16,185,129,0.12)]'
                    : 'border-emerald-200 bg-white shadow-xs hover:border-emerald-500 hover:shadow-md'
                }`}
              >
                <span
                  className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition-transform duration-200 group-hover:scale-105 ${
                    isDark
                      ? 'border-emerald-500/30 bg-emerald-950/40 text-emerald-400'
                      : 'border-emerald-300 bg-emerald-50 text-emerald-700'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </span>

                <div className="min-w-0">
                  <h2
                    className={`text-base font-bold tracking-tight ${
                      isDark ? 'text-white group-hover:text-emerald-300' : 'text-slate-900 group-hover:text-emerald-700'
                    }`}
                  >
                    {t.services[service.titleKey]}
                  </h2>
                  <p className={`mt-1 text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    {t.services[service.descKey]}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`rounded border px-2 py-0.5 text-[10px] font-bold ${
                          isDark
                            ? 'border-emerald-900 bg-emerald-950/30 text-emerald-500'
                            : 'border-emerald-100 bg-emerald-50 text-emerald-800'
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* CONTACT PROMPT */}
        <div
          className={`mt-10 sm:mt-14 flex flex-col items-center justify-between gap-4 rounded-2xl border p-6 text-center sm:flex-row sm:text-left ${
            isDark
              ? 'border-emerald-500/30 bg-emerald-950/20'
              : 'border-emerald-200 bg-white shadow-xs'
          }`}
          data-aos="fade-up"
        >
          <div className="flex items-center gap-4">
            <span
              className={`hidden sm:inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border ${
                isDark
                  ? 'border-emerald-500/40 bg-black text-emerald-300'
                  : 'border-emerald-300 bg-emerald-50 text-emerald-700'
              }`}
            >
              <MessageSquare className="h-5 w-5" />
            </span>
            <div>
              <h2 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {t.services.ctaTitle}
              </h2>
              <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                {t.services.ctaText}
              </p>
            </div>
          </div>
          <Link
            to="/contact"
            className={`inline-flex shrink-0 items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-bold uppercase tracking-wider transition-all active:scale-95 ${
              isDark
                ? 'bg-emerald-500 text-black hover:bg-emerald-400 shadow-[0_0_18px_rgba(16,185,129,0.35)]'
                : 'bg-emerald-600 text-white hover:bg-emerald-700'
            }`}
          >
            {t.services.ctaButton}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
