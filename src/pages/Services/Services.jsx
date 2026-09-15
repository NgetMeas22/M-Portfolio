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
      className={`min-h-screen py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
        isDark ? 'bg-[#0a0a0a]' : 'bg-white'
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16" data-aos="fade-up">
          <div
            className={`mb-3 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold tracking-wide ${
              isDark
                ? 'border-primary/30 bg-primary/10 text-primary'
                : 'border-green-500/30 bg-green-500/10 text-green-700'
            }`}
          >
            <Code className="h-3.5 w-3.5" />
            {t.services.title}
          </div>
          <h1 className="section-title text-4xl sm:text-5xl font-mono">
            {t.services.title}
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-6 rounded-full" />
          <p
            className={`text-lg max-w-2xl mx-auto ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            {t.services.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {serviceItems.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div
                key={service.titleKey}
                className={`group rounded-2xl p-6 transition-all duration-300 hover:-translate-y-2 ${
                  isDark
                    ? 'bg-white/5 backdrop-blur-lg border border-white/10 hover:border-primary/30 hover:bg-white/10 hover:shadow-[0_0_15px_rgba(0,255,65,0.08)]'
                    : 'bg-gray-50 shadow-lg hover:shadow-2xl border border-gray-100'
                }`}
                data-aos="fade-up"
                data-aos-delay={index * 80}
              >
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}
                >
                  <IconComponent className="h-7 w-7 text-white" />
                </div>
                <h3 className={`text-lg font-bold mb-2 ${isDark ? 'text-slate-100' : 'text-slate-800'}`}>
                  {t.services[service.titleKey]}
                </h3>
                <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  {t.services[service.descKey]}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
