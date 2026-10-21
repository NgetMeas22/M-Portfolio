import { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  BriefcaseBusiness,
  ChevronDown,
  Code2,
  Contact,
  FileBadge,
  FileText,
  GraduationCap,
  Home as HomeIcon,
  Languages,
  Layers3,
  Menu,
  Moon,
  Newspaper,
  Sparkles,
  Sun,
  Terminal,
  User,
  X,
} from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage.jsx';
import { useTheme } from '../../hooks/useTheme.jsx';

// Shown directly in the desktop bar
const primaryNav = [
  { to: '/', label: 'home', end: true, icon: HomeIcon },
  { to: '/about', label: 'about', icon: User },
  { to: '/skills', label: 'skills', icon: Code2 },
  { to: '/projects', label: 'projects', icon: Layers3 },
  { to: '/experience', label: 'experience', icon: BriefcaseBusiness },
  { to: '/blog', label: 'blog', icon: Newspaper },
  { to: '/contact', label: 'contact', icon: Contact },
];

// Grouped under the desktop "More" dropdown
const moreNav = [
  { to: '/services', label: 'services', icon: Sparkles },
  { to: '/certificates', label: 'certificates', icon: FileBadge },
  { to: '/education', label: 'education', icon: GraduationCap },
  { to: '/resume', label: 'resume', icon: FileText },
];

const allNav = [...primaryNav, ...moreNav];

const languages = [
  { id: 'en', label: 'English', hint: 'EN' },
  { id: 'kh', label: 'ខ្មែរ', hint: 'KH' },
];

const themes = [
  { id: 'dark', label: 'Dark', icon: Moon },
  { id: 'light', label: 'Light', icon: Sun },
];

const matrixChars = '01<>[]{}#$%ABCDEFNGETMEAS';

function MatrixBackground({ isDark }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = 80;
    };
    resize();
    window.addEventListener('resize', resize);

    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array.from({ length: columns }, () => Math.random() * -100);

    let animId;
    const draw = () => {
      ctx.fillStyle = isDark ? 'rgba(3, 5, 4, 0.15)' : 'rgba(244, 247, 245, 0.2)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = matrixChars[Math.floor(Math.random() * matrixChars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.fillStyle = isDark
          ? `rgba(16, 185, 129, ${0.12 + Math.random() * 0.15})`
          : `rgba(5, 150, 105, ${0.08 + Math.random() * 0.08})`;
        ctx.fillText(char, x, y);

        if (y > canvas.height && Math.random() > 0.976) {
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
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none opacity-30"
      aria-hidden="true"
    />
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const moreRef = useRef(null);
  const location = useLocation();

  const langContext = useLanguage();
  const language = langContext?.language || 'en';
  const setLanguage = langContext?.setLanguage;
  const t = langContext?.t || {};

  const themeContext = useTheme();
  const theme = themeContext?.theme || 'dark';
  const setTheme = themeContext?.setTheme;
  const isDark = theme === 'dark';

  const label = (key) => t?.nav?.[key] ?? key;

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(window.scrollY > 20);
      setProgress(max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus whenever the route changes
  const [lastPath, setLastPath] = useState(location.pathname);
  if (lastPath !== location.pathname) {
    setLastPath(location.pathname);
    setIsOpen(false);
    setMoreOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (moreRef.current && !moreRef.current.contains(event.target)) {
        setMoreOpen(false);
      }
    };
    const handleKey = (event) => {
      if (event.key === 'Escape') {
        setMoreOpen(false);
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKey);
    };
  }, []);

  const toggleLanguage = () => setLanguage?.(language === 'en' ? 'kh' : 'en');
  const toggleTheme = () => setTheme?.(isDark ? 'light' : 'dark');

  const moreActive = moreNav.some((item) => location.pathname.startsWith(item.to));
  const activeMore = moreNav.find((item) => location.pathname.startsWith(item.to));

  const headerClass = scrolled
    ? isDark
      ? 'bg-[#030504]/90 backdrop-blur-xl border-b border-emerald-500/25 shadow-2xl shadow-black/80'
      : 'bg-[#f4f7f5]/90 backdrop-blur-xl border-b border-emerald-600/20 shadow-md shadow-emerald-950/5'
    : isDark
      ? 'bg-[#030504]/70 border-b border-emerald-500/10 backdrop-blur-md'
      : 'bg-[#f4f7f5]/80 border-b border-emerald-600/10 backdrop-blur-md';

  const iconButtonClass = `inline-flex h-9 items-center justify-center gap-1.5 rounded-lg border px-2.5 text-[11px] font-bold font-mono tracking-wider transition-all duration-200 cursor-pointer ${
    isDark
      ? 'border-emerald-500/30 bg-black/70 text-emerald-400 hover:border-emerald-400 hover:bg-emerald-950/50 hover:shadow-[0_0_14px_rgba(16,185,129,0.25)]'
      : 'border-emerald-500/30 bg-white text-emerald-800 hover:border-emerald-600 hover:bg-emerald-50'
  }`;

  const desktopLinkClass = (isActive) =>
    `group relative inline-flex items-center gap-1.5 rounded-lg px-2 xl:px-2.5 py-2 text-[11px] xl:text-xs font-bold font-mono uppercase tracking-wider whitespace-nowrap transition-colors duration-150 cursor-pointer ${
      isActive
        ? isDark
          ? 'text-emerald-300 bg-emerald-500/10'
          : 'text-emerald-800 bg-emerald-100/80'
        : isDark
          ? 'text-slate-400 hover:text-emerald-300 hover:bg-emerald-500/5'
          : 'text-slate-600 hover:text-emerald-800 hover:bg-emerald-50'
    }`;

  // Glowing bar under the active desktop link
  const activeBar = (isActive) => (
    <span
      aria-hidden="true"
      className={`absolute inset-x-2 -bottom-px h-0.5 rounded-full transition-all duration-200 ${
        isActive
          ? isDark
            ? 'bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.9)] opacity-100'
            : 'bg-emerald-600 opacity-100'
          : 'bg-emerald-500 opacity-0 scale-x-50 group-hover:opacity-40 group-hover:scale-x-100'
      }`}
    />
  );

  const segmentClass = (active) =>
    `flex flex-1 items-center justify-center gap-2 rounded-md px-3 py-2 text-xs font-bold transition-all cursor-pointer ${
      active
        ? isDark
          ? 'bg-emerald-500/15 text-emerald-300 shadow-[inset_0_0_0_1px_rgba(16,185,129,0.5)]'
          : 'bg-white text-emerald-800 shadow-sm ring-1 ring-emerald-300'
        : isDark
          ? 'text-slate-400 hover:text-emerald-300'
          : 'text-slate-600 hover:text-emerald-800'
    }`;

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerClass}`}>
        <MatrixBackground isDark={isDark} />
        <nav
          aria-label="Main navigation"
          className="relative mx-auto flex h-16 max-w-[1600px] items-center justify-between gap-4 px-4 sm:px-6 lg:h-[72px] lg:px-8"
        >
          {/* LOGO */}
          <NavLink to="/" end className="group z-10 flex shrink-0 items-center gap-2.5">
            <span
              className={`relative flex h-9 w-9 items-center justify-center rounded-xl border transition-all duration-300 group-hover:rotate-6 group-hover:scale-105 ${
                isDark
                  ? 'border-emerald-500/50 bg-emerald-950/40 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.3)]'
                  : 'border-emerald-500/50 bg-emerald-100 text-emerald-800 shadow-xs'
              }`}
            >
              <Terminal className="h-4 w-4" />
              <span className="absolute -right-0.5 -top-0.5 flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </span>
            </span>
            <span className="font-mono text-base font-black tracking-wider sm:text-lg">
              <span className="text-emerald-500">&lt;</span>
              <span className={isDark ? 'text-white' : 'text-slate-900'}>NGET</span>
              <span className={isDark ? 'text-emerald-400' : 'text-emerald-600'}>MEAS</span>
              <span className="text-emerald-500">/&gt;</span>
            </span>
          </NavLink>

          {/* DESKTOP NAVIGATION */}
          <div className="z-10 hidden min-w-0 items-center gap-0.5 lg:flex xl:gap-1">
            {primaryNav.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) => desktopLinkClass(isActive)}
                >
                  {({ isActive }) => (
                    <>
                      <Icon className="hidden h-3.5 w-3.5 opacity-80 xl:block" />
                      {label(item.label)}
                      {activeBar(isActive)}
                    </>
                  )}
                </NavLink>
              );
            })}

            {/* MORE DROPDOWN */}
            <div ref={moreRef} className="relative">
              <button
                type="button"
                onClick={() => setMoreOpen((prev) => !prev)}
                className={desktopLinkClass(moreActive)}
                aria-expanded={moreOpen}
                aria-haspopup="menu"
              >
                {activeMore ? label(activeMore.label) : label('more')}
                <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${moreOpen ? 'rotate-180' : ''}`} />
                {activeBar(moreActive)}
              </button>

              <div
                role="menu"
                className={`absolute right-0 top-full mt-3 w-60 origin-top-right rounded-xl border p-1.5 font-mono transition-all duration-150 ${
                  moreOpen ? 'visible scale-100 opacity-100' : 'invisible scale-95 opacity-0'
                } ${
                  isDark
                    ? 'border-emerald-500/30 bg-[#030504]/95 shadow-[0_10px_40px_rgba(0,0,0,0.9)] backdrop-blur-xl'
                    : 'border-emerald-200 bg-white shadow-xl'
                }`}
              >
                {moreNav.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      role="menuitem"
                      className={({ isActive }) =>
                        `flex items-center gap-3 rounded-lg px-3 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors ${
                          isActive
                            ? isDark
                              ? 'bg-emerald-500/10 text-emerald-300'
                              : 'bg-emerald-50 text-emerald-800'
                            : isDark
                              ? 'text-slate-400 hover:bg-emerald-500/5 hover:text-emerald-300'
                              : 'text-slate-600 hover:bg-emerald-50 hover:text-emerald-800'
                        }`
                      }
                    >
                      <span
                        className={`flex h-7 w-7 items-center justify-center rounded-md border ${
                          isDark ? 'border-emerald-500/25 bg-emerald-950/40' : 'border-emerald-200 bg-emerald-50'
                        }`}
                      >
                        <Icon className="h-3.5 w-3.5" />
                      </span>
                      {label(item.label)}
                    </NavLink>
                  );
                })}
              </div>
            </div>
          </div>

          {/* CONTROLS */}
          <div className="z-10 flex shrink-0 items-center gap-2">
            <span
              className={`hidden items-center gap-2 rounded-lg border px-2.5 py-1.5 font-mono text-[11px] font-bold tracking-wider 2xl:flex ${
                isDark ? 'border-emerald-900/80 bg-black/70 text-emerald-400' : 'border-emerald-300 bg-white text-emerald-800'
              }`}
            >
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
              OPEN TO WORK
            </span>

            <button
              type="button"
              onClick={toggleLanguage}
              className={`${iconButtonClass} hidden sm:inline-flex`}
              aria-label={language === 'en' ? 'Switch to Khmer' : 'Switch to English'}
              title={language === 'en' ? 'ភាសាខ្មែរ' : 'English'}
            >
              <Languages className="h-3.5 w-3.5" />
              {language.toUpperCase()}
            </button>

            <button
              type="button"
              onClick={toggleTheme}
              className={`${iconButtonClass} hidden w-9 px-0 sm:inline-flex`}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              title={isDark ? 'Light mode' : 'Dark mode'}
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className={`${iconButtonClass} w-9 px-0 lg:hidden`}
              aria-label="Open navigation"
              aria-expanded={isOpen}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>

        {/* SCROLL PROGRESS */}
        <div className="absolute inset-x-0 bottom-0 h-px overflow-hidden" aria-hidden="true">
          <div
            className={`h-full transition-[width] duration-150 ${
              isDark ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)]' : 'bg-emerald-600'
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </header>

      {/* MOBILE DRAWER */}
      <div
        className={`fixed inset-0 z-60 transition-opacity duration-300 lg:hidden ${
          isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
        aria-hidden={!isOpen}
      >
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setIsOpen(false)} />

        <aside
          className={`absolute right-0 top-0 flex h-full w-80 max-w-[85vw] flex-col font-mono transition-transform duration-300 ease-out ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          } ${isDark ? 'border-l border-emerald-500/30 bg-[#050807]' : 'border-l border-emerald-300 bg-[#f4f7f5] shadow-2xl'}`}
        >
          <div className="flex items-center justify-between border-b border-emerald-500/20 px-5 py-4">
            <span className="text-base font-black tracking-wider">
              <span className="text-emerald-500">&lt;</span>
              <span className={isDark ? 'text-white' : 'text-slate-900'}>NGET</span>
              <span className={isDark ? 'text-emerald-400' : 'text-emerald-600'}>MEAS</span>
              <span className="text-emerald-500">/&gt;</span>
            </span>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className={`${iconButtonClass} w-9 px-0`}
              aria-label="Close navigation"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-4">
            <p className="mb-2 px-2 text-[10px] font-bold uppercase tracking-widest text-emerald-600">{'// navigate'}</p>
            <div className="space-y-1">
              {allNav.map((item, i) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.end}
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded-lg border px-3 py-2.5 text-xs font-bold uppercase tracking-wider transition-all ${
                        isActive
                          ? isDark
                            ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300'
                            : 'border-emerald-300 bg-emerald-100/80 text-emerald-900'
                          : isDark
                            ? 'border-transparent text-slate-400 hover:bg-emerald-500/5 hover:text-emerald-300'
                            : 'border-transparent text-slate-700 hover:bg-white hover:text-emerald-800'
                      }`
                    }
                  >
                    <span className="w-5 text-[10px] text-emerald-600/70">{String(i + 1).padStart(2, '0')}</span>
                    <Icon className="h-4 w-4 opacity-80" />
                    {label(item.label)}
                  </NavLink>
                );
              })}
            </div>
          </div>

          {/* SETTINGS */}
          <div className="space-y-4 border-t border-emerald-500/20 px-5 py-5">
            <div>
              <p className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-emerald-600">
                <Languages className="h-3.5 w-3.5" />
                Language // ភាសា
              </p>
              <div className={`flex gap-1 rounded-lg border p-1 ${isDark ? 'border-emerald-900/70 bg-black/60' : 'border-emerald-200 bg-emerald-50/60'}`}>
                {languages.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setLanguage?.(item.id)}
                    className={segmentClass(language === item.id)}
                    aria-pressed={language === item.id}
                  >
                    {item.label}
                    <span className="text-[10px] opacity-60">{item.hint}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-emerald-600">Theme</p>
              <div className={`flex gap-1 rounded-lg border p-1 ${isDark ? 'border-emerald-900/70 bg-black/60' : 'border-emerald-200 bg-emerald-50/60'}`}>
                {themes.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setTheme?.(item.id)}
                      className={segmentClass(theme === item.id)}
                      aria-pressed={theme === item.id}
                    >
                      <Icon className="h-3.5 w-3.5" />
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
