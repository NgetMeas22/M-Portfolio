import { useEffect } from 'react';
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
  Activity, 
  ShieldCheck, 
  Cpu, 
  Zap, 
  Radio,
  ArrowUpRight
} from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';
import { useTheme } from '../../hooks/useTheme';

const serviceItems = [
  {
    icon: Globe,
    titleKey: 'webDev',
    descKey: 'webDevDesc',
    code: 'SRV-01',
    status: 'ACTIVE'
  },
  {
    icon: Layout,
    titleKey: 'frontend',
    descKey: 'frontendDesc',
    code: 'SRV-02',
    status: 'OPTIMIZED'
  },
  {
    icon: Server,
    titleKey: 'backend',
    descKey: 'backendDesc',
    code: 'SRV-03',
    status: 'DAEMON_UP'
  },
  {
    icon: Code,
    titleKey: 'api',
    descKey: 'apiDesc',
    code: 'SRV-04',
    status: 'HARDENED'
  },
  {
    icon: Database,
    titleKey: 'database',
    descKey: 'databaseDesc',
    code: 'SRV-05',
    status: 'PERSISTENT'
  },
  {
    icon: Smartphone,
    titleKey: 'responsive',
    descKey: 'responsiveDesc',
    code: 'SRV-06',
    status: 'ADAPTIVE'
  },
  {
    icon: Settings,
    titleKey: 'maintenance',
    descKey: 'maintenanceDesc',
    code: 'SRV-07',
    status: 'STANDBY'
  }
];

const serviceKeywords = {
  webDev: ['React', 'Laravel', 'Full-Stack'],
  frontend: ['React', 'Vue.js', 'Tailwind'],
  backend: ['PHP', 'Laravel', 'REST'],
  api: ['RESTful', 'JSON', 'Auth'],
  database: ['MySQL', 'PostgreSQL', 'SQLite'],
  responsive: ['Mobile-First', 'Fluid', 'Viewport'],
  maintenance: ['Audit', 'Bugfix', 'DevOps'],
};

export default function Services() {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    AOS.init({ duration: 800, once: true, easing: 'ease-out-cubic' });
  }, []);

  return (
    <section
      id="services"
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
            {'>_ system.services'}
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
            {t.services.title}
          </h1>
          <p
            className={`mx-auto mt-3 max-w-2xl text-base sm:text-lg ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}
          >
            {t.services.subtitle}
          </p>
        </div>

        {/* SERVICE TELEMETRY HUD STRIP */}
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
              DEPLOYED VECTORS
            </span>
            <div className={`text-xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {serviceItems.length} DAEMONS
            </div>
          </div>
          <div className="space-y-0.5">
            <span className={`text-[10px] uppercase tracking-wider font-bold ${isDark ? 'text-emerald-600' : 'text-emerald-700'}`}>
              CODE ARCHITECTURE
            </span>
            <div className="text-xl font-black text-emerald-500 flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4" /> ZERO TRUST
            </div>
          </div>
          <div className="space-y-0.5">
            <span className={`text-[10px] uppercase tracking-wider font-bold ${isDark ? 'text-emerald-600' : 'text-emerald-700'}`}>
              SLA GUARANTEE
            </span>
            <div className={`text-xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
              99.9% RELIABLE
            </div>
          </div>
          <div className="space-y-0.5">
            <span className={`text-[10px] uppercase tracking-wider font-bold ${isDark ? 'text-emerald-600' : 'text-emerald-700'}`}>
              NETWORK CAPACITY
            </span>
            <div className="text-xl font-black text-emerald-500 flex items-center gap-1.5">
              <Activity className="h-4 w-4 animate-spin" /> SCALE READY
            </div>
          </div>
        </div>

        {/* SERVICES GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {serviceItems.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <article
                key={service.titleKey}
                data-aos="fade-up"
                data-aos-delay={index * 80}
                className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border p-6 sm:p-7 transition-all duration-300 ${
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

                <div>
                  {/* CARD HEADER WITH PROTOCOL TAG */}
                  <div
                    className={`flex items-center justify-between border-b pb-3 mb-4 text-xs ${
                      isDark ? 'border-emerald-950' : 'border-emerald-100'
                    }`}
                  >
                    <span className={`font-mono text-[11px] font-bold flex items-center gap-1.5 ${isDark ? 'text-emerald-500' : 'text-emerald-800'}`}>
                      <Radio className="h-3 w-3 text-emerald-500 animate-pulse" /> {service.code}
                    </span>
                    <span
                      className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded border ${
                        isDark
                          ? 'border-emerald-900 bg-emerald-950/40 text-emerald-400'
                          : 'border-emerald-200 bg-emerald-50 text-emerald-800'
                      }`}
                    >
                      {service.status}
                    </span>
                  </div>

                  {/* ICON & TITLE */}
                  <div className="flex items-center gap-4 mb-3">
                    <div
                      className={`inline-flex h-12 w-12 items-center justify-center rounded-xl border transition-transform duration-300 group-hover:scale-105 ${
                        isDark
                          ? 'border-emerald-500/30 bg-emerald-950/40 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                          : 'border-emerald-300 bg-emerald-50 text-emerald-700 shadow-xs'
                      }`}
                    >
                      <IconComponent className="h-6 w-6" />
                    </div>

                    <h3
                      className={`text-lg sm:text-xl font-bold uppercase tracking-tight transition-colors ${
                        isDark ? 'text-white group-hover:text-emerald-400' : 'text-slate-900 group-hover:text-emerald-700'
                      }`}
                    >
                      {t.services[service.titleKey]}
                    </h3>
                  </div>

                  {/* DESCRIPTION */}
                  <p
                    className={`mt-3 text-xs sm:text-sm leading-relaxed ${
                      isDark ? 'text-slate-400' : 'text-slate-600'
                    }`}
                  >
                    {t.services[service.descKey]}
                  </p>
                </div>

                {/* TECH STACK KEYWORDS */}
                <div
                  className={`mt-6 pt-4 border-t flex flex-wrap items-center gap-1.5 ${
                    isDark ? 'border-emerald-950' : 'border-emerald-100'
                  }`}
                >
                  {(serviceKeywords[service.titleKey] || []).map((kw) => (
                    <span
                      key={kw}
                      className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                        isDark
                          ? 'border-emerald-950 bg-black/60 text-emerald-500'
                          : 'border-emerald-100 bg-emerald-50 text-emerald-800'
                      }`}
                    >
                      #{kw}
                    </span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
}