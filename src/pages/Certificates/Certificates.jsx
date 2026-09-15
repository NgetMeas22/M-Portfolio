import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Award, Building2, Calendar, Code, Globe } from 'lucide-react';
import { certificates } from '../../data/certificates';
import { useLanguage } from '../../hooks/useLanguage';
import { useTheme } from '../../hooks/useTheme';

const categoryConfig = {
  Programming: {
    icon: <Code className="h-4 w-4" />,
    gradient: 'from-primary to-accent',
    badge: {
      dark: 'bg-primary/10 text-primary border-primary/30',
      light: 'bg-green-500/10 text-green-700 border-green-500/30'
    }
  },
  'Web Development': {
    icon: <Globe className="h-4 w-4" />,
    gradient: 'from-emerald-500 to-green-500',
    badge: {
      dark: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
      light: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/30'
    }
  },
  Language: {
    icon: <Globe className="h-4 w-4" />,
    gradient: 'from-green-400 to-primary',
    badge: {
      dark: 'bg-green-500/10 text-green-400 border-green-500/30',
      light: 'bg-green-500/10 text-green-600 border-green-500/30'
    }
  }
};

const Certificates = () => {
  const { t, language } = useLanguage();
  const { theme } = useTheme();

  useEffect(() => {
    AOS.init({ duration: 800, once: true, easing: 'ease-out-cubic' });
  }, []);

  const isDark = theme === 'dark';

  return (
    <section
      id="certificates"
      className={`min-h-screen pt-28 lg:pt-32 pb-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
        isDark ? 'bg-[#0a0a0a]' : 'bg-white'
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10" data-aos="fade-up">
          <div
            className={`mb-3 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold tracking-wide ${
              isDark
                ? 'border-primary/30 bg-primary/10 text-primary'
                : 'border-green-500/30 bg-green-500/10 text-green-700'
            }`}
          >
            <Award className="h-3.5 w-3.5" />
            {t.certificates.title}
          </div>
          <h1 className="section-title text-4xl sm:text-5xl font-mono">
            {t.certificates.title}
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-4 rounded-full" />
          <p
            className={`text-lg max-w-2xl mx-auto ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            {t.certificates.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certificates.map((cert, index) => {
            const cat = categoryConfig[cert.category] || categoryConfig.Programming;
            return (
              <div
                key={cert.id}
                className={`group rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 ${
                  isDark
                    ? 'bg-white/5 backdrop-blur-lg border border-white/10 hover:border-primary/30 hover:shadow-[0_0_15px_rgba(0,255,65,0.08)]'
                    : 'bg-gray-50 shadow-lg hover:shadow-xl border border-gray-100'
                }`}
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br ${cat.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Award className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3
                      className={`text-lg font-bold mb-1 ${
                        isDark ? 'text-slate-100' : 'text-slate-800'
                      }`}
                    >
                      {language === 'kh' ? cert.titleKh : cert.title}
                    </h3>
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-medium ${cat.badge[theme]}`}
                    >
                      {cat.icon}
                      {cert.category}
                    </span>
                  </div>
                </div>

                <div className="mt-3 space-y-2">
                  <div className={`flex items-center gap-2 text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    <Building2 className="h-4 w-4 shrink-0 text-primary" />
                    <span>{language === 'kh' ? cert.organizationKh : cert.organization}</span>
                  </div>
                  <div className={`flex items-center gap-2 text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    <Calendar className="h-4 w-4 shrink-0 text-primary" />
                    <span>{cert.date}</span>
                  </div>
                </div>

                <p
                  className={`mt-3 text-sm leading-relaxed ${
                    isDark ? 'text-slate-400' : 'text-slate-500'
                  }`}
                >
                  {language === 'kh' ? cert.descriptionKh : cert.description}
                </p>

                {cert.credentialId && (
                  <div
                    className={`mt-3 flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium ${
                      isDark ? 'bg-white/5 text-slate-300' : 'bg-white text-slate-600'
                    }`}
                  >
                    <Award className="h-3.5 w-3.5 text-primary" />
                    <span>{t.certificates.credentialId}: {cert.credentialId}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Certificates;
