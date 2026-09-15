import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Globe, Layout, Server, Database, Smartphone, Settings, Code } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';
import { useTheme } from '../../hooks/useTheme';

const serviceItems = [
  {
    icon: Globe,
    titleKey: 'webDev',
    descKey: 'webDevDesc',
    gradient: 'from-primary to-accent'
  },
  {
    icon: Layout,
    titleKey: 'frontend',
    descKey: 'frontendDesc',
    gradient: 'from-emerald-400 to-green-500'
  },
  {
    icon: Server,
    titleKey: 'backend',
    descKey: 'backendDesc',
    gradient: 'from-green-500 to-emerald-500'
  },
  {
    icon: Code,
    titleKey: 'api',
    descKey: 'apiDesc',
    gradient: 'from-primary to-green-400'
  },
  {
    icon: Database,
    titleKey: 'database',
    descKey: 'databaseDesc',
    gradient: 'from-emerald-500 to-teal-500'
  },
  {
    icon: Smartphone,
    titleKey: 'responsive',
    descKey: 'responsiveDesc',
    gradient: 'from-green-400 to-primary'
  },
  {
    icon: Settings,
    titleKey: 'maintenance',
    descKey: 'maintenanceDesc',
    gradient: 'from-emerald-600 to-green-600'
  }
];

const serviceKeywords = {
  webDev: ['React', 'Laravel', 'Full-Stack'],
  frontend: ['React', 'Vue.js', 'CSS'],
  backend: ['PHP', 'Laravel', 'Server'],
  api: ['REST', 'JSON', 'Endpoints'],
  database: ['MySQL', 'SQL Server', 'SQLite'],
  responsive: ['Mobile', 'Fluid', 'Adaptive'],
  maintenance: ['Updates', 'Bugfix', 'Support'],
};

const Services = () => {
  const { t } = useLanguage();
  const { theme } = useTheme();

  useEffect(() => {
    AOS.init({ duration: 800, once: true, easing: 'ease-out-cubic' });
  }, []);

  const isDark = theme === 'dark';

  return (
    <section
      id="services"
      className="grid-bg grid-pattern relative min-h-screen pt-28 lg:pt-32 pb-20"
    >
      <div className="mx-auto max-w-6xl px-6">

        <div className="mb-14 text-center" data-aos="fade-up">
          <span className="cyber-badge mb-4 inline-flex items-center gap-2">
            <Code className="h-3.5 w-3.5" />
            {`>_ services`}
          </span>
          <h1 className="section-title text-4xl sm:text-5xl font-mono">
            {t.services.title}
          </h1>
          <p className="section-subtitle mt-3 text-lg max-w-2xl mx-auto">
            {t.services.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {serviceItems.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div
                key={service.titleKey}
                className="card group p-6 flex flex-col gap-5"
                data-aos="fade-up"
                data-aos-delay={index * 80}
              >
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 text-primary transition-transform duration-300 group-hover:scale-110">
                  <IconComponent className="h-7 w-7" />
                </div>

                <div>
                  <h3
                    className={`text-lg font-bold font-mono ${
                      isDark ? 'text-slate-100' : 'text-slate-800'
                    }`}
                  >
                    {t.services[service.titleKey]}
                  </h3>
                  <p
                    className={`mt-2 text-sm leading-relaxed ${
                      isDark ? 'text-slate-400' : 'text-slate-500'
                    }`}
                  >
                    {t.services[service.descKey]}
                  </p>
                </div>

                <div className="mt-auto flex flex-wrap gap-2 pt-2 border-t border-slate-800">
                  {(serviceKeywords[service.titleKey] || []).map((kw) => (
                    <span key={kw} className="tag">
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
