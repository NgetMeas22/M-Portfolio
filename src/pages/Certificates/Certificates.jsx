import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { 
  Award, 
  Building2, 
  Calendar, 
  Code, 
  Globe, 
  Terminal, 
  ShieldCheck, 
  CheckCircle2, 
  ExternalLink,
  KeyRound,
  FileBadge
} from 'lucide-react';
import { certificates } from '../../data/certificates';
import { useLanguage } from '../../hooks/useLanguage';
import { useTheme } from '../../hooks/useTheme';

const categoryConfig = {
  Programming: {
    icon: Code,
    badge: {
      dark: 'bg-emerald-950/60 text-emerald-400 border-emerald-500/40',
      light: 'bg-emerald-50 text-emerald-800 border-emerald-300'
    }
  },
  'Web Development': {
    icon: Globe,
    badge: {
      dark: 'bg-teal-950/60 text-teal-400 border-teal-500/40',
      light: 'bg-teal-50 text-teal-800 border-teal-300'
    }
  },
  Language: {
    icon: Globe,
    badge: {
      dark: 'bg-green-950/60 text-green-400 border-green-500/40',
      light: 'bg-green-50 text-green-800 border-green-300'
    }
  }
};

export default function Certificates() {
  const { t, language } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    AOS.init({ duration: 800, once: true, easing: 'ease-out-cubic' });
  }, []);

  return (
    <section
      id="certificates"
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
            {'>_ credentials.verify'}
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
            {t.certificates.title}
          </h1>
          <p
            className={`mx-auto mt-3 max-w-2xl text-base sm:text-lg ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}
          >
            {t.certificates.subtitle}
          </p>
        </div>

        {/* VERIFICATION TELEMETRY STRIP */}
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
              ACCREDITATIONS
            </span>
            <div className={`text-xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {certificates.length} ISSUED
            </div>
          </div>
          <div className="space-y-0.5">
            <span className={`text-[10px] uppercase tracking-wider font-bold ${isDark ? 'text-emerald-600' : 'text-emerald-700'}`}>
              SIGNATURE AUTH
            </span>
            <div className="text-xl font-black text-emerald-500 flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4" /> SHA-256 VALID
            </div>
          </div>
          <div className="space-y-0.5">
            <span className={`text-[10px] uppercase tracking-wider font-bold ${isDark ? 'text-emerald-600' : 'text-emerald-700'}`}>
              REGISTRY NODE
            </span>
            <div className={`text-xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
              AUTHORIZED
            </div>
          </div>
          <div className="space-y-0.5">
            <span className={`text-[10px] uppercase tracking-wider font-bold ${isDark ? 'text-emerald-600' : 'text-emerald-700'}`}>
              CLEARANCE
            </span>
            <div className="text-xl font-black text-emerald-500 flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4" /> LEVEL_03_VERIFIED
            </div>
          </div>
        </div>

        {/* CERTIFICATE GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          {certificates.map((cert, index) => {
            const cat = categoryConfig[cert.category] || categoryConfig.Programming;
            const CategoryIcon = cat.icon;

            return (
              <article
                key={cert.id}
                data-aos="fade-up"
                data-aos-delay={index * 90}
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
                  {/* CARD TOP META BAR */}
                  <div
                    className={`flex items-center justify-between border-b pb-3 mb-4 text-xs ${
                      isDark ? 'border-emerald-950' : 'border-emerald-100'
                    }`}
                  >
                    <span className={`font-mono text-[11px] font-bold flex items-center gap-1.5 ${isDark ? 'text-emerald-500' : 'text-emerald-800'}`}>
                      <FileBadge className="h-3.5 w-3.5" /> CERT_RECORD // #{String(index + 1).padStart(2, '0')}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-0.5 text-[10px] uppercase font-bold tracking-wider ${
                        cat.badge[isDark ? 'dark' : 'light']
                      }`}
                    >
                      <CategoryIcon className="h-3 w-3" />
                      {cert.category}
                    </span>
                  </div>

                  {/* TITLE & ISSUER DETAILS */}
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className={`shrink-0 w-12 h-12 rounded-xl border flex items-center justify-center transition-transform duration-300 group-hover:scale-105 ${
                        isDark
                          ? 'border-emerald-500/30 bg-emerald-950/40 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                          : 'border-emerald-300 bg-emerald-50 text-emerald-700 shadow-xs'
                      }`}
                    >
                      <Award className="h-6 w-6" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3
                        className={`text-lg sm:text-xl font-bold uppercase tracking-tight transition-colors ${
                          isDark
                            ? 'text-white group-hover:text-emerald-400'
                            : 'text-slate-900 group-hover:text-emerald-700'
                        }`}
                      >
                        {language === 'kh' ? cert.titleKh : cert.title}
                      </h3>

                      <div className="mt-2 flex flex-wrap items-center gap-4 text-xs sm:text-sm">
                        <span className={`flex items-center gap-1.5 font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-800'}`}>
                          <Building2 className="h-3.5 w-3.5 text-emerald-500" />
                          {language === 'kh' ? cert.organizationKh : cert.organization}
                        </span>
                        <span className={`flex items-center gap-1.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                          <Calendar className="h-3.5 w-3.5 text-emerald-500" />
                          {cert.date}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* SUMMARY LOG DESCRIPTION */}
                  <p
                    className={`text-xs sm:text-sm leading-relaxed ${
                      isDark ? 'text-slate-400' : 'text-slate-600'
                    }`}
                  >
                    {language === 'kh' ? cert.descriptionKh : cert.description}
                  </p>
                </div>

                {/* CARD FOOTER CREDENTIAL BADGE */}
                <div
                  className={`mt-6 pt-4 border-t flex flex-wrap items-center justify-between gap-3 ${
                    isDark ? 'border-emerald-950' : 'border-emerald-100'
                  }`}
                >
                  {cert.credentialId ? (
                    <div
                      className={`inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs font-bold ${
                        isDark
                          ? 'border-emerald-900/80 bg-black text-emerald-400'
                          : 'border-emerald-200 bg-emerald-50/60 text-emerald-800'
                      }`}
                    >
                      <KeyRound className="h-3.5 w-3.5 text-emerald-500" />
                      <span>{t.certificates.credentialId}: {cert.credentialId}</span>
                    </div>
                  ) : (
                    <span className={`text-[11px] uppercase font-bold tracking-wider ${isDark ? 'text-emerald-600' : 'text-slate-400'}`}>
                      VERIFIED_RECORD
                    </span>
                  )}

                  {cert.link && (
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider transition-colors ${
                        isDark
                          ? 'text-emerald-400 hover:text-emerald-300 hover:underline'
                          : 'text-emerald-700 hover:text-emerald-800 hover:underline'
                      }`}
                    >
                      VALIDATE <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
}