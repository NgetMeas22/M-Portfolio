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
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    icon: Layout,
    titleKey: 'frontend',
    descKey: 'frontendDesc',
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    icon: Server,
    titleKey: 'backend',
    descKey: 'backendDesc',
    gradient: 'from-green-500 to-teal-500'
  },
  {
    icon: Code,
    titleKey: 'api',
    descKey: 'apiDesc',
    gradient: 'from-amber-500 to-orange-500'
  },
  {
    icon: Database,
    titleKey: 'database',
    descKey: 'databaseDesc',
    gradient: 'from-red-500 to-rose-500'
  },
  {
    icon: Smartphone,
    titleKey: 'responsive',
    descKey: 'responsiveDesc',
    gradient: 'from-indigo-500 to-blue-500'
  },
  {
    icon: Settings,
    titleKey: 'maintenance',
    descKey: 'maintenanceDesc',
    gradient: 'from-slate-500 to-zinc-500'
  }
];

const Services = () => {
  const { t } = useLanguage();
  const { theme } = useTheme();

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-out-cubic'
    });
  }, []);

  const isDark = theme === 'dark';

  return (
    <section
      id="services"
      className={`min-h-screen py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
        isDark ? 'bg-[#0a0a0f]' : 'bg-white'
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16" data-aos="fade-up">
          <div
            className={`mb-3 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold tracking-wide ${
              isDark
                ? 'border-cyan-500/30 bg-cyan-500/10 text-cyan-400'
                : 'border-blue-500/30 bg-blue-500/10 text-blue-600'
            }`}
          >
            <Code className="h-3.5 w-3.5" />
            {t.services.title}
          </div>
          <h1
            className={`text-4xl sm:text-5xl font-bold mb-4 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}
          >
            {t.services.title}
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6 rounded-full" />
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
                    ? 'bg-white/5 backdrop-blur-lg border border-white/10 hover:border-cyan-500/30 hover:bg-white/10'
                    : 'bg-gray-50 shadow-lg hover:shadow-2xl border border-gray-100'
                }`}
                data-aos="fade-up"
                data-aos-delay={index * 80}
              >
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}
                  style={{
                    boxShadow: isDark
                      ? `0 0 24px ${getServiceGlow(service.gradient)}22`
                      : `0 0 24px ${getServiceGlow(service.gradient)}11`
                  }}
                >
                  <IconComponent className="h-7 w-7 text-white" />
                </div>
                <h3
                  className={`text-lg font-bold mb-2 ${
                    isDark ? 'text-slate-100' : 'text-slate-800'
                  }`}
                >
                  {t.services[service.titleKey]}
                </h3>
                <p
                  className={`text-sm leading-relaxed ${
                    isDark ? 'text-slate-400' : 'text-slate-500'
                  }`}
                >
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

function getServiceGlow(gradient) {
  const colorMap = {
    'from-blue-500': '#3b82f6',
    'from-purple-500': '#a855f7',
    'from-green-500': '#22c55e',
    'from-amber-500': '#f59e0b',
    'from-red-500': '#ef4444',
    'from-indigo-500': '#6366f1',
    'from-slate-500': '#64748b'
  };
  const first = gradient.split(' ')[0];
  return colorMap[first] || '#3b82f6';
}

export default Services;
