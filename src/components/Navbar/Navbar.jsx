import { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, Sun, Moon, Terminal, Shield } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage.jsx';
import { useTheme } from '../../hooks/useTheme.jsx';

const navItems = [
  { to: '/', label: 'home', end: true, icon: '⌂' },
  { to: '/about', label: 'about', icon: '►' },
  { to: '/skills', label: 'skills', icon: '⚡' },
  { to: '/projects', label: 'projects', icon: '⊞' },
  { to: '/experience', label: 'experience', icon: '◈' },
  { to: '/certificates', label: 'certificates', icon: '★' },
  { to: '/education', label: 'education', icon: '◆' },
  { to: '/services', label: 'services', icon: '⚙' },
  { to: '/blog', label: 'blog', icon: '§' },
  { to: '/contact', label: 'contact', icon: '✉' },
];

const matrixChars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF';

function MatrixBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = 64;
    };
    resize();
    window.addEventListener('resize', resize);

    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array.from({ length: columns }, () => Math.random() * -100);

    let animId;
    const draw = () => {
      ctx.fillStyle = 'rgba(10, 10, 10, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = matrixChars[Math.floor(Math.random() * matrixChars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.fillStyle = `rgba(0, 255, 65, ${0.15 + Math.random() * 0.15})`;
        ctx.fillText(char, x, y);

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none opacity-40"
      aria-hidden="true"
    />
  );
}

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const toggleLanguage = () => setLanguage(language === 'en' ? 'kh' : 'en');
  const closeMenu = () => setIsOpen(false);

  const headerClass = scrolled
    ? isDark
      ? 'bg-dark-900/90 backdrop-blur-xl border-b border-primary/15 shadow-lg shadow-black/30'
      : 'bg-white/85 backdrop-blur-xl border-b border-light-400/20 shadow-lg shadow-slate-200/50'
    : 'bg-transparent border-b border-transparent';

  const textClass = isDark ? 'text-gray-200' : 'text-slate-800';

  const controlButtonClass = `inline-flex h-10 w-10 items-center justify-center rounded-lg transition-all duration-200 ${
    isDark
      ? 'text-gray-300 hover:text-primary hover:bg-primary/10 hover:shadow-[0_0_10px_rgba(0,255,65,0.15)]'
      : 'text-slate-600 hover:text-primary-dim hover:bg-slate-100'
  }`;

  const desktopLinkClass = ({ isActive }) =>
    `relative px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200 font-mono ${
      isActive
        ? isDark
          ? 'text-primary bg-primary/10 shadow-[0_0_10px_rgba(0,255,65,0.1)] after:absolute after:left-3 after:right-3 after:-bottom-0.5 after:h-0.5 after:rounded-full after:bg-primary'
          : 'text-primary-dim bg-primary/10 after:absolute after:left-3 after:right-3 after:-bottom-0.5 after:h-0.5 after:rounded-full after:bg-primary-dim'
        : isDark
          ? 'text-gray-300 hover:text-primary hover:bg-primary/5 hover:shadow-[0_0_8px_rgba(0,255,65,0.08)]'
          : 'text-slate-700 hover:text-primary-dim hover:bg-primary/10'
    }`;

  const mobileLinkClass = ({ isActive }) =>
    `block px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 font-mono ${
      isActive
        ? isDark
          ? 'text-primary bg-primary/10 border-l-2 border-primary shadow-[0_0_10px_rgba(0,255,65,0.1)]'
          : 'text-primary-dim bg-primary/10 border-l-2 border-primary-dim'
        : isDark
          ? 'text-gray-300 hover:text-primary hover:bg-primary/5'
          : 'text-slate-700 hover:text-primary-dim hover:bg-slate-100'
    }`;

  const renderLinks = (linkClass, onNavigate) =>
    navItems.map((item) => (
      <NavLink
        key={item.to}
        to={item.to}
        end={item.end}
        className={linkClass}
        onClick={onNavigate}
      >
        <Terminal className="mr-1 inline h-3.5 w-3.5 opacity-60" />
        {t.nav[item.label]}
      </NavLink>
    ));

  const renderControls = (compact = false) => (
    <div className={`flex items-center ${compact ? 'gap-2' : 'gap-1'}`}>
      <button
        type="button"
        onClick={toggleLanguage}
        className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold transition-all duration-200 font-mono ${
          isDark
            ? 'text-gray-300 hover:text-primary hover:bg-primary/10 hover:shadow-[0_0_10px_rgba(0,255,65,0.1)]'
            : 'text-slate-600 hover:text-primary-dim hover:bg-slate-100'
        }`}
        aria-label="Switch language"
      >
        <Terminal className="h-4 w-4" />
        <span>{language === 'en' ? 'EN' : 'KH'}</span>
      </button>
      <button
        type="button"
        onClick={toggleTheme}
        className={controlButtonClass}
        aria-label="Toggle theme"
      >
        {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </button>
    </div>
  );

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerClass}`}
      >
        {isDark && <MatrixBackground />}
        <nav
          className={`relative mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-20 lg:px-8 ${textClass}`}
        >
          <NavLink to="/" end onClick={closeMenu} className="flex items-center gap-2.5 shrink-0 z-10">
            <span className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent text-sm font-bold text-dark-900 font-mono shadow-[0_0_15px_rgba(0,255,65,0.3)]">
              <Terminal className="h-5 w-5 text-dark-900" />
            </span>
            <span className="hidden sm:block text-lg font-bold tracking-wide font-mono">
              <span className={isDark ? 'text-primary' : 'text-primary-dim'}>&lt;</span>
              NGET<span className={isDark ? 'text-primary' : 'text-primary-dim'}>MEAS</span>
              <span className={isDark ? 'text-primary' : 'text-primary-dim'}>/&gt;</span>
            </span>
            <span className="sm:hidden text-lg font-bold tracking-wide font-mono">
              <span className={isDark ? 'text-primary' : 'text-primary-dim'}>&lt;</span>NM<span className={isDark ? 'text-primary' : 'text-primary-dim'}>/&gt;</span>
            </span>
          </NavLink>

          <div className="hidden items-center gap-1 lg:flex z-10">
            {renderLinks(desktopLinkClass)}
          </div>

          <div className="hidden lg:block z-10">{renderControls()}</div>

          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className={`${controlButtonClass} lg:hidden z-10`}
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </nav>
      </header>

      <div
        className={`fixed inset-0 z-[60] ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
      >
        <div
          className={`absolute inset-0 bg-black/70 transition-opacity duration-300 ${
            isOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={closeMenu}
        />

        <aside
          className={`absolute right-0 top-0 h-full w-72 max-w-[85vw] overflow-y-auto p-6 transition-transform duration-300 ease-in-out ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          } ${
            isDark
              ? 'bg-dark-900 border-l border-primary/15'
              : 'bg-white border-l border-light-400/20'
          }`}
        >
          {isDark && (
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute inset-0 opacity-10">
                {[
                  { l: 5, t: 12, d: 2.1, c: 0 }, { l: 15, t: 45, d: 3.4, c: 3 },
                  { l: 28, t: 78, d: 2.7, c: 7 }, { l: 42, t: 22, d: 4.1, c: 12 },
                  { l: 55, t: 65, d: 2.3, c: 5 }, { l: 68, t: 8, d: 3.8, c: 9 },
                  { l: 78, t: 55, d: 2.9, c: 15 }, { l: 88, t: 35, d: 4.5, c: 2 },
                  { l: 8, t: 88, d: 3.2, c: 11 }, { l: 35, t: 5, d: 2.5, c: 18 },
                  { l: 48, t: 92, d: 3.6, c: 6 }, { l: 62, t: 42, d: 4.2, c: 14 },
                  { l: 75, t: 72, d: 2.8, c: 8 }, { l: 92, t: 15, d: 3.1, c: 1 },
                  { l: 22, t: 58, d: 4.4, c: 10 }, { l: 58, t: 30, d: 2.6, c: 16 },
                  { l: 82, t: 85, d: 3.9, c: 4 }, { l: 12, t: 38, d: 2.2, c: 13 },
                  { l: 45, t: 68, d: 3.5, c: 17 }, { l: 72, t: 25, d: 4.3, c: 19 },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="absolute text-primary/20 font-mono text-xs whitespace-nowrap"
                    style={{
                      left: `${item.l}%`,
                      top: `${item.t}%`,
                      animation: `flicker ${item.d}s infinite`,
                    }}
                  >
                    {matrixChars[item.c]}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="relative flex items-center justify-between mb-6">
            <NavLink to="/" end onClick={closeMenu} className={`flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-800'}`}>
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent text-sm font-bold text-dark-900 font-mono">
                <Terminal className="h-5 w-5 text-dark-900" />
              </span>
              <span className="text-base font-bold tracking-wide font-mono">
                <span className={isDark ? 'text-primary' : 'text-primary-dim'}>&lt;</span>
                NGET<span className={isDark ? 'text-primary' : 'text-primary-dim'}>MEAS</span>
                <span className={isDark ? 'text-primary' : 'text-primary-dim'}>/&gt;</span>
              </span>
            </NavLink>
            <button
              type="button"
              onClick={closeMenu}
              className={`${controlButtonClass} -mr-2`}
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="relative space-y-1.5">{renderLinks(mobileLinkClass, closeMenu)}</div>

          <div className="relative mt-6 pt-6 border-t border-primary/10 flex items-center justify-between">
            <span className={`text-sm font-medium font-mono ${isDark ? 'text-primary/60' : 'text-slate-500'}`}>
              <Shield className="inline h-3.5 w-3.5 mr-1" />
              Settings
            </span>
            {renderControls(true)}
          </div>
        </aside>
      </div>
    </>
  );
}

export default Navbar;
