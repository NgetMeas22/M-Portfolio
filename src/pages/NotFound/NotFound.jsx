import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, AlertTriangle } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';
import { useTheme } from '../../hooks/useTheme';
import AOS from 'aos';
import 'aos/dist/aos.css';

function NotFound() {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    AOS.init({ duration: 800, easing: 'ease-out-cubic', once: true });
  }, []);

  return (
    <>
      <section className="grid-bg grid-pattern relative flex min-h-screen items-center justify-center overflow-hidden pt-28 lg:pt-32">
        {/* Matrix Rain Backdrop */}
        <div
          aria-hidden="true"
          className="matrix-rain animate-scanline opacity-70"
          style={{
            backgroundImage:
              'linear-gradient(180deg, transparent 0%, rgba(16, 185, 129, 0.07) 50%, transparent 100%)',
          }}
        />

        <div className="relative z-10 mx-auto w-full max-w-2xl px-6 text-center" data-aos="fade-up">
          <span className="cyber-badge mb-4 inline-flex items-center gap-2">
            <AlertTriangle className="h-3.5 w-3.5" />
            {`>_ 404.error`}
          </span>

          {/* Giant 404 */}
          <div className="relative inline-block">
            <h1
              aria-hidden="true"
              className="absolute inset-0 animate-flicker translate-x-1 font-mono font-black tracking-tighter text-emerald-500/30"
            >
              404
            </h1>
            <h1 className="relative animate-flicker font-mono text-8xl font-black tracking-tighter text-emerald-400 sm:text-9xl [text-shadow:0_0_30px_rgba(16,185,129,0.45),0_0_80px_rgba(16,185,129,0.2)]">
              404
            </h1>
          </div>

          <p className="mt-4 font-mono text-lg text-slate-300">
            <span className="text-emerald-400">&gt;_</span> {t.notFound.title}
          </p>
          <p className={`mt-3 font-mono text-sm ${isDark ? 'text-slate-500' : 'text-slate-600'}`}>
            {t.notFound.description}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link to="/" className="btn-primary inline-flex items-center gap-2 font-mono">
              <Home className="h-4 w-4" />
              {t.notFound.goHome}
            </Link>
            <button
              type="button"
              onClick={() => window.history.back()}
              className="btn-outline inline-flex items-center gap-2 font-mono"
            >
              <ArrowLeft className="h-4 w-4" />
              {t.notFound.goBack}
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default NotFound;
