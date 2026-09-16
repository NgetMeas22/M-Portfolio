import { useEffect, useState } from 'react';
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
  FileBadge,
  Eye,
  X,
  GraduationCap,
  Server,
  Briefcase,
  Sparkles
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
  Backend: {
    icon: Server,
    badge: {
      dark: 'bg-cyan-950/60 text-cyan-400 border-cyan-500/40',
      light: 'bg-cyan-50 text-cyan-800 border-cyan-300'
    }
  },
  Language: {
    icon: Globe,
    badge: {
      dark: 'bg-green-950/60 text-green-400 border-green-500/40',
      light: 'bg-green-50 text-green-800 border-green-300'
    }
  },
  Education: {
    icon: GraduationCap,
    badge: {
      dark: 'bg-indigo-950/60 text-indigo-400 border-indigo-500/40',
      light: 'bg-indigo-50 text-indigo-800 border-indigo-300'
    }
  },
  Productivity: {
    icon: Briefcase,
    badge: {
      dark: 'bg-amber-950/60 text-amber-400 border-amber-500/40',
      light: 'bg-amber-50 text-amber-800 border-amber-300'
    }
  }
};

export default function Certificates() {
  const { t, language } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [selectedCert, setSelectedCert] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 800, once: true, easing: 'ease-out-cubic' });
  }, []);

  useEffect(() => {
    if (selectedCert) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedCert]);

  return (
    <section
      id="certificates"
      className={`relative min-h-screen pt-28 lg:pt-36 pb-24 font-mono transition-colors duration-500 overflow-hidden ${
        isDark ? 'bg-[#030504] text-emerald-400' : 'bg-[#f4f7f5] text-slate-900'
      }`}
    >
      <style>{`
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(1000%); }
        }
        @keyframes radarSweep {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes shimmerGlow {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        .animate-scanline {
          animation: scanline 8s linear infinite;
        }
        .animate-radar {
          animation: radarSweep 12s linear infinite;
        }
        .animate-shimmer {
          animation: shimmerGlow 3s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
      `}</style>

      {/* AMBIENT GLOW BACKDROPS & RADAR GRID */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div
          className="absolute -left-20 top-24 h-96 w-96 rounded-full blur-3xl animate-pulse"
          style={{
            animationDuration: '6s',
            background: isDark
              ? 'radial-gradient(circle, rgba(16,185,129,0.12), transparent 70%)'
              : 'radial-gradient(circle, rgba(16,185,129,0.15), transparent 70%)',
          }}
        />
        <div
          className="absolute bottom-12 right-0 h-96 w-96 rounded-full blur-3xl animate-pulse"
          style={{
            animationDuration: '8s',
            background: isDark
              ? 'radial-gradient(circle, rgba(45,212,191,0.08), transparent 70%)'
              : 'radial-gradient(circle, rgba(20,184,166,0.12), transparent 70%)',
          }}
        />
        {/* SCANLINE OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/[0.03] to-transparent h-48 w-full animate-scanline pointer-events-none" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* HEADER */}
        <div className="mb-12 text-center" data-aos="fade-up">
          <span
            className={`group inline-flex items-center gap-2 border px-3.5 py-1 text-xs uppercase tracking-wider font-bold transition-all duration-300 hover:scale-105 ${
              isDark
                ? 'border-emerald-500/40 bg-emerald-950/40 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.15)]'
                : 'border-emerald-600/30 bg-emerald-100/60 text-emerald-900 shadow-xs'
            }`}
          >
            <Terminal className="h-3.5 w-3.5 animate-bounce" />
            <span className="relative overflow-hidden">
              {'>_ credentials.verify'}
              <span className="absolute inset-x-0 bottom-0 h-[2px] bg-emerald-400 -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
            </span>
          </span>
          <h1
            className={`mt-4 text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight transition-transform duration-500 hover:scale-[1.01] ${
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
          className={`relative mb-10 sm:mb-14 border rounded-xl sm:rounded-2xl p-3 sm:p-5 backdrop-blur-md transition-all duration-300 ${
            isDark
              ? 'border-emerald-500/30 bg-black/70 shadow-[0_0_25px_rgba(16,185,129,0.1)]'
              : 'border-emerald-200 bg-white/90 shadow-xs'
          }`}
          data-aos="fade-up"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 divide-y sm:divide-y-0 divide-emerald-500/10 sm:divide-x sm:divide-emerald-500/20">
            {/* ITEM 1: ACCREDITATIONS */}
            <div className="space-y-1 group min-w-0 pb-2 sm:pb-0 sm:pr-4">
              <span className={`text-[9px] xs:text-[10px] uppercase tracking-wider font-bold block truncate ${isDark ? 'text-emerald-500' : 'text-emerald-700'}`}>
                ACCREDITATIONS
              </span>
              <div className={`text-sm xs:text-base sm:text-lg lg:text-xl font-black tracking-tight truncate ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {certificates.length} ISSUED
              </div>
            </div>

            {/* ITEM 2: SIGNATURE AUTH */}
            <div className="space-y-1 group min-w-0 pb-2 sm:pb-0 sm:px-4">
              <span className={`text-[9px] xs:text-[10px] uppercase tracking-wider font-bold block truncate ${isDark ? 'text-emerald-500' : 'text-emerald-700'}`}>
                SIGNATURE AUTH
              </span>
              <div className="text-sm xs:text-base sm:text-lg lg:text-xl font-black text-emerald-400 flex items-center gap-1.5 truncate">
                <ShieldCheck className="h-4 w-4 shrink-0 animate-pulse text-emerald-400" />
                <span className="truncate">SHA-256 VALID</span>
              </div>
            </div>

            {/* ITEM 3: REGISTRY NODE */}
            <div className="space-y-1 group min-w-0 pt-2 sm:pt-0 sm:px-4">
              <span className={`text-[9px] xs:text-[10px] uppercase tracking-wider font-bold block truncate ${isDark ? 'text-emerald-500' : 'text-emerald-700'}`}>
                REGISTRY NODE
              </span>
              <div className={`text-sm xs:text-base sm:text-lg lg:text-xl font-black flex items-center gap-1.5 sm:gap-2 truncate ${isDark ? 'text-white' : 'text-slate-900'}`}>
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="truncate">AUTHORIZED</span>
              </div>
            </div>

            {/* ITEM 4: CLEARANCE */}
            <div className="space-y-1 group min-w-0 pt-2 sm:pt-0 sm:pl-4">
              <span className={`text-[9px] xs:text-[10px] uppercase tracking-wider font-bold block truncate ${isDark ? 'text-emerald-500' : 'text-emerald-700'}`}>
                CLEARANCE
              </span>
              <div className="text-sm xs:text-base sm:text-lg lg:text-xl font-black text-emerald-400 flex items-center gap-1.5 truncate">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400 group-hover:rotate-12 transition-transform duration-300" />
                <span className="truncate">LEVEL_03_VERIFIED</span>
              </div>
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
                data-aos-delay={index * 80}
                className={`group relative flex flex-col justify-between rounded-2xl border p-6 sm:p-7 transition-all duration-500 hover:-translate-y-1.5 ${
                  isDark
                    ? 'border-emerald-900/60 bg-black/90 hover:border-emerald-400 hover:shadow-[0_10px_35px_rgba(16,185,129,0.2)]'
                    : 'border-emerald-200 bg-white hover:border-emerald-500 hover:shadow-xl'
                }`}
              >
                {/* AMBIENT CARD SHIMMER ON HOVER */}
                <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-emerald-500/[0.04] to-transparent group-hover:animate-shimmer rounded-2xl" />

                {/* CORNER RETICLES */}
                <span className={`pointer-events-none absolute top-2.5 left-2.5 h-3 w-3 border-t-2 border-l-2 transition-all duration-300 group-hover:scale-125 ${isDark ? 'border-emerald-500/40 group-hover:border-emerald-400' : 'border-emerald-300 group-hover:border-emerald-600'}`} />
                <span className={`pointer-events-none absolute top-2.5 right-2.5 h-3 w-3 border-t-2 border-r-2 transition-all duration-300 group-hover:scale-125 ${isDark ? 'border-emerald-500/40 group-hover:border-emerald-400' : 'border-emerald-300 group-hover:border-emerald-600'}`} />
                <span className={`pointer-events-none absolute bottom-2.5 left-2.5 h-3 w-3 border-b-2 border-l-2 transition-all duration-300 group-hover:scale-125 ${isDark ? 'border-emerald-500/40 group-hover:border-emerald-400' : 'border-emerald-300 group-hover:border-emerald-600'}`} />
                <span className={`pointer-events-none absolute bottom-2.5 right-2.5 h-3 w-3 border-b-2 border-r-2 transition-all duration-300 group-hover:scale-125 ${isDark ? 'border-emerald-500/40 group-hover:border-emerald-400' : 'border-emerald-300 group-hover:border-emerald-600'}`} />

                <div>
                  {/* CARD TOP META BAR */}
                  <div
                    className={`flex items-center justify-between border-b pb-3 mb-4 text-xs ${
                      isDark ? 'border-emerald-950' : 'border-emerald-100'
                    }`}
                  >
                    <span className={`font-mono text-[11px] font-bold flex items-center gap-1.5 ${isDark ? 'text-emerald-500' : 'text-emerald-800'}`}>
                      <FileBadge className="h-3.5 w-3.5 transition-transform duration-300 group-hover:rotate-6" /> 
                      CERT_RECORD // #{String(index + 1).padStart(2, '0')}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-0.5 text-[10px] uppercase font-bold tracking-wider transition-all duration-300 group-hover:scale-105 ${
                        cat.badge[isDark ? 'dark' : 'light']
                      }`}
                    >
                      <CategoryIcon className="h-3 w-3 transition-transform duration-300 group-hover:rotate-12" />
                      {cert.category}
                    </span>
                  </div>

                  {/* TITLE & ISSUER DETAILS */}
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className={`shrink-0 w-12 h-12 rounded-xl border flex items-center justify-center transition-all duration-500 group-hover:rotate-6 group-hover:scale-110 ${
                        isDark
                          ? 'border-emerald-500/30 bg-emerald-950/40 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)] group-hover:border-emerald-400 group-hover:shadow-[0_0_25px_rgba(16,185,129,0.4)]'
                          : 'border-emerald-300 bg-emerald-50 text-emerald-700 shadow-xs group-hover:border-emerald-500'
                      }`}
                    >
                      <Award className="h-6 w-6 transition-transform duration-300 group-hover:scale-110" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3
                        className={`text-lg sm:text-xl font-bold uppercase tracking-tight transition-colors duration-300 ${
                          isDark
                            ? 'text-white group-hover:text-emerald-400'
                            : 'text-slate-900 group-hover:text-emerald-700'
                        }`}
                      >
                        {language === 'kh' ? cert.titleKh : cert.title}
                      </h3>

                      <div className="mt-2 flex flex-wrap items-center gap-4 text-xs sm:text-sm">
                        <span className={`flex items-center gap-1.5 font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-800'}`}>
                          <Building2 className="h-3.5 w-3.5 text-emerald-500 transition-transform duration-300 group-hover:scale-110" />
                          {language === 'kh' ? cert.organizationKh : cert.organization}
                        </span>
                        <span className={`flex items-center gap-1.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                          <Calendar className="h-3.5 w-3.5 text-emerald-500 transition-transform duration-300 group-hover:scale-110" />
                          {cert.date}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* SUMMARY LOG DESCRIPTION */}
                  <p
                    className={`text-xs sm:text-sm leading-relaxed transition-colors duration-300 ${
                      isDark ? 'text-slate-400 group-hover:text-slate-300' : 'text-slate-600 group-hover:text-slate-800'
                    }`}
                  >
                    {language === 'kh' ? cert.descriptionKh : cert.description}
                  </p>
                </div>

                {/* CARD FOOTER CREDENTIAL BADGE & ACTIONS */}
                <div
                  className={`mt-6 pt-4 border-t flex flex-wrap items-center justify-between gap-3 ${
                    isDark ? 'border-emerald-950' : 'border-emerald-100'
                  }`}
                >
                  <div className="flex flex-wrap items-center gap-2">
                    {cert.credentialId ? (
                      <div
                        className={`inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs font-bold transition-all duration-300 hover:border-emerald-400 hover:shadow-[0_0_10px_rgba(16,185,129,0.2)] ${
                          isDark
                            ? 'border-emerald-900/80 bg-black text-emerald-400'
                            : 'border-emerald-200 bg-emerald-50/60 text-emerald-800'
                        }`}
                      >
                        <KeyRound className="h-3.5 w-3.5 text-emerald-500 animate-pulse" />
                        <span>{t.certificates.credentialId}: {cert.credentialId}</span>
                      </div>
                    ) : (
                      <span className={`text-[11px] uppercase font-bold tracking-wider flex items-center gap-1.5 ${isDark ? 'text-emerald-600' : 'text-slate-400'}`}>
                        <Sparkles className="h-3 w-3 animate-spin" style={{ animationDuration: '4s' }} />
                        VERIFIED_RECORD
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    {cert.image && (
                      /* HOVER ALERT WRAPPER */
                      <div className="relative inline-flex flex-col items-center group/btn">
                        {/* ANIMATED HOVER POPUP ALERT */}
                        <div
                          role="tooltip"
                          className={`pointer-events-none absolute bottom-full mb-3 z-30 whitespace-nowrap rounded-lg border px-3 py-1.5 text-[11px] font-semibold tracking-wider opacity-0 scale-75 translate-y-2 transition-all duration-300 ease-out group-hover/btn:opacity-100 group-hover/btn:scale-100 group-hover/btn:translate-y-0 group-hover/btn:animate-bounce shadow-2xl ${
                            isDark
                              ? 'border-emerald-400/80 bg-[#06110a] text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.35)]'
                              : 'border-emerald-400 bg-white text-emerald-950 shadow-lg'
                          }`}
                        >
                          <span className="inline-flex items-center gap-2">
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                            </span>
                            {language === 'kh' ? 'ចុចមើលសញ្ញាបត្រដើម' : 'Click to inspect document'}
                          </span>
                          
                          {/* TOOLTIP BOTTOM ARROW */}
                          <div
                            className={`absolute left-1/2 -bottom-1 h-2.5 w-2.5 -translate-x-1/2 rotate-45 border-b border-r ${
                              isDark
                                ? 'border-emerald-400/80 bg-[#06110a]'
                                : 'border-emerald-400 bg-white'
                            }`}
                          />
                        </div>

                        {/* VIEW CERTIFICATE BUTTON WITH GLOW & RIPPLE */}
                        <button
                          type="button"
                          onClick={() => setSelectedCert(cert)}
                          className={`relative overflow-hidden inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-lg border transition-all duration-300 active:scale-95 group/view ${
                            isDark
                              ? 'border-emerald-500/50 bg-emerald-950/30 text-emerald-300 hover:bg-emerald-900/60 hover:border-emerald-400 hover:shadow-[0_0_20px_rgba(16,185,129,0.3)]'
                              : 'border-emerald-300 bg-emerald-100/60 text-emerald-900 hover:bg-emerald-200/80 hover:border-emerald-500 hover:shadow-md'
                          }`}
                        >
                          <Eye className="h-3.5 w-3.5 transition-transform duration-300 group-hover/view:scale-125" />
                          <span>VIEW CERTIFICATE</span>
                          {/* BUTTON SHINE EFFECT */}
                          <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover/view:translate-x-full transition-transform duration-700 ease-in-out" />
                        </button>
                      </div>
                    )}

                    {cert.link && (
                      <a
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`group/link inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                          isDark
                            ? 'text-emerald-400 hover:text-emerald-300'
                            : 'text-emerald-700 hover:text-emerald-800'
                        }`}
                      >
                        <span>VALIDATE</span>
                        <ExternalLink className="h-3.5 w-3.5 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

      </div>

      {/* FULL CERTIFICATE IMAGE MODAL WITH FLUID POP-IN */}
      {selectedCert && (
        <div 
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md transition-all duration-300"
          onClick={() => setSelectedCert(null)}
        >
          <div 
            className={`relative max-w-3xl w-full max-h-[90vh] overflow-hidden rounded-2xl border shadow-2xl flex flex-col transform transition-all duration-300 scale-100 animate-in zoom-in-95 ${
              isDark 
                ? 'border-emerald-500/50 bg-[#050b07] text-white shadow-[0_0_60px_rgba(16,185,129,0.3)]' 
                : 'border-emerald-300 bg-white text-slate-900 shadow-2xl'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* MODAL SCANNER ANIMATION */}
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent animate-pulse" />

            {/* MODAL HEADER */}
            <div className={`flex items-center justify-between px-5 py-3.5 border-b ${
              isDark ? 'border-emerald-900/60 bg-black/50' : 'border-emerald-100 bg-emerald-50/50'
            }`}>
              <div className="flex items-center gap-2 truncate pr-4">
                <FileBadge className="h-4 w-4 text-emerald-400 shrink-0 animate-pulse" />
                <span className="text-xs sm:text-sm font-bold truncate tracking-wide">
                  {language === 'kh' ? selectedCert.titleKh : selectedCert.title}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCert(null)}
                aria-label="Close modal"
                className={`p-1.5 rounded-lg border transition-all duration-300 hover:rotate-90 ${
                  isDark
                    ? 'border-emerald-900/60 hover:bg-emerald-950 text-slate-300 hover:text-white hover:border-emerald-400'
                    : 'border-slate-200 hover:bg-slate-100 text-slate-600 hover:text-slate-900'
                }`}
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* MODAL IMAGE CONTAINER WITH ZOOM HOVER */}
            <div className="flex-1 overflow-auto p-4 flex items-center justify-center bg-black/40">
              <img 
                src={selectedCert.image} 
                alt={selectedCert.title} 
                className="max-h-[70vh] w-auto max-w-full rounded-lg shadow-2xl object-contain transition-transform duration-500 hover:scale-105" 
              />
            </div>

            {/* MODAL FOOTER */}
            <div className={`px-5 py-3 border-t flex flex-wrap items-center justify-between gap-3 text-xs ${
              isDark ? 'border-emerald-900/60 bg-black/50 text-slate-400' : 'border-emerald-100 bg-emerald-50/50 text-slate-600'
            }`}>
              <span className="font-semibold">{language === 'kh' ? selectedCert.organizationKh : selectedCert.organization}</span>
              {selectedCert.credentialId && (
                <span className="font-mono font-bold text-emerald-400 flex items-center gap-1.5">
                  <KeyRound className="h-3 w-3" />
                  ID: {selectedCert.credentialId}
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}