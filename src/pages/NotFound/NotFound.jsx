import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
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
      <section className="grid-bg relative flex min-h-screen items-center justify-center pt-24 pb-20">
        <div className="mx-auto w-full max-w-2xl px-6 text-center" data-aos="fade-up">
          <h1
            className={`text-8xl font-bold sm:text-9xl ${
              isDark
                ? 'bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent'
                : 'bg-gradient-to-r from-green-600 via-green-500 to-green-600 bg-clip-text text-transparent'
            }`}
          >
            {t.notFound.title}
          </h1>

          <h2
            className={`mt-4 text-3xl font-bold sm:text-4xl ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            {t.notFound.subtitle}
          </h2>

          <p className={`mt-4 text-lg ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            {t.notFound.description}
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link to="/" className="btn-primary inline-flex items-center gap-2">
              <Home className="h-4 w-4" />
              {t.notFound.goHome}
            </Link>
            <button
              type="button"
              onClick={() => window.history.back()}
              className="btn-outline inline-flex items-center gap-2"
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