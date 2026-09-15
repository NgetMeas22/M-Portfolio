import { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import {
  BriefcaseBusiness,
  Check,
  ChevronDown,
  Code2,
  Contact,
  FileBadge,
  GraduationCap,
  Home as HomeIcon,
  Languages,
  Layers3,
  Menu,
  Moon,
  Newspaper,
  Settings,
  Shield,
  Sparkles,
  Sun,
  Terminal,
  User,
  X,
} from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage.jsx';
import { useTheme } from '../../hooks/useTheme.jsx';

const navItems = [
  { to: '/', label: 'home', end: true, icon: HomeIcon },
  { to: '/about', label: 'about', icon: User },
  { to: '/skills', label: 'skills', icon: Code2 },
  { to: '/projects', label: 'projects', icon: Layers3 },
  { to: '/experience', label: 'experience', icon: BriefcaseBusiness },
  { to: '/certificates', label: 'certificates', icon: FileBadge },
  { to: '/education', label: 'education', icon: GraduationCap },
  { to: '/services', label: 'services', icon: Sparkles },
  { to: '/blog', label: 'blog', icon: Newspaper },
  { to: '/contact', label: 'contact', icon: Contact },
];

const matrixChars = '01<>[]{}#$%ABCDEFNGETMEAS';

function MatrixBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = 72;
    };
    resize();
    window.addEventListener('resize', resize);

    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array.from({ length: columns }, () => Math.random() * -100);

    let animId;
    const draw = () => {
      ctx.fillStyle = 'rgba(5, 5, 5, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = matrixChars[Math.floor(Math.random() * matrixChars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.fillStyle = `rgba(16, 185, 129, ${0.12 + Math.random() * 0.12})`;
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
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const settingsRef = useRef(null);
  const { language, setLanguage, t } = useLanguage();
  const { theme, setTheme } = useTheme();
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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!settingsRef.current?.contains(event.target)) {
        setSettingsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const closeMenu = () => setIsOpen(false);
  const chooseLanguage = (nextLanguage) => {
    setLanguage(nextLanguage);
    setSettingsOpen(false);
  };
  const chooseTheme = (nextTheme) => {
    setTheme(nextTheme);
    setSettingsOpen(false);
  };

  const headerClass = scrolled
    ? isDark
      ? 'bg-dark-900/92 backdrop-blur-xl border-b border-primary/15 shadow-lg shadow-black/40'
      : 'bg-white/88 backdrop-blur-xl border-b border-emerald-900/10 shadow-lg shadow-slate-200/60'
    : isDark
      ? 'bg-dark-900/35 border-b border-primary/10 backdrop-blur-sm'
      : 'bg-white/70 border-b border-emerald-900/10 backdrop-blur-sm';

  const textClass = isDark ? 'text-gray-200' : 'text-slate-800';

  const controlButtonClass = `inline-flex h-10 items-center justify-center gap-2 rounded-lg border px-3 text-sm font-semibold transition-all duration-200 font-mono ${
    isDark
      ? 'border-primary/20 bg-primary/5 text-gray-300 hover:border-primary/50 hover:text-primary hover:bg-primary/10'
      : 'border-emerald-700/20 bg-white/60 text-slate-700 hover:border-emerald-600/50 hover:text-emerald-700 hover:bg-emerald-50'
  }`;

  const desktopLinkClass = ({ isActive }) =>
    `relative inline-flex items-center gap-1.5 px-2.5 py-2 text-sm font-medium rounded-md transition-all duration-200 font-mono ${
      isActive
        ? isDark
          ? 'text-primary bg-primary/10 shadow-[0_0_10px_rgba(16,185,129,0.12)]'
          : 'text-primary-dim bg-primary/10'
        : isDark
          ? 'text-gray-300 hover:text-primary hover:bg-primary/5'
          : 'text-slate-700 hover:text-primary-dim hover:bg-primary/10'
    }`;

  const mobileLinkClass = ({ isActive }) =>
    `flex items-center gap-2 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 font-mono ${
      isActive
        ? isDark
          ? 'text-primary bg-primary/10 border-l-2 border-primary'
          : 'text-primary-dim bg-primary/10 border-l-2 border-primary-dim'
        : isDark
          ? 'text-gray-300 hover:text-primary hover:bg-primary/5'
          : 'text-slate-700 hover:text-primary-dim hover:bg-slate-100'
    }`;

  const renderLinks = (linkClass, onNavigate) =>
    navItems.map((item) => {
      const Icon = item.icon;
      return (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.end}
          className={linkClass}
          onClick={onNavigate}
        >
          <Icon className="h-3.5 w-3.5 opacity-70" />
          {t.nav[item.label]}
        </NavLink>
      );
    });

  const renderSettingsMenu = () => (
    <div
      className={`absolute right-0 mt-3 w-64 rounded-xl border p-3 shadow-2xl ${
        isDark
          ? 'border-primary/20 bg-dark-900/95 shadow-black/40'
          : 'border-emerald-900/10 bg-white/95 shadow-slate-300/40'
      }`}
    >
      <div className="mb-3 border-b border-primary/10 pb-3">
        <p className="mb-2 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-secondary">
          <Languages className="h-3.5 w-3.5 text-primary" />
          Language
        </p>
        {[
          { id: 'en', label: 'English', hint: 'EN' },
          { id: 'kh', label: 'Khmer', hint: 'KH' },
        ].map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => chooseLanguage(item.id)}
            className="flex w-full items-center justify-between rounded-lg px-3 py-2 font-mono text-sm text-secondary transition-colors hover:bg-primary/10 hover:text-primary"
          >
            <span>{item.label}</span>
            <span className="flex items-center gap-2">
              <span className="text-xs">{item.hint}</span>
              {language === item.id && <Check className="h-4 w-4 text-primary" />}
            </span>
          </button>
        ))}
      </div>

      <div>
        <p className="mb-2 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-secondary">
          <Shield className="h-3.5 w-3.5 text-primary" />
          Theme
        </p>
        {[
          { id: 'dark', label: 'Black Hacker', icon: Moon },
          { id: 'light', label: 'Light Mode', icon: Sun },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => chooseTheme(item.id)}
              className="flex w-full items-center justify-between rounded-lg px-3 py-2 font-mono text-sm text-secondary transition-colors hover:bg-primary/10 hover:text-primary"
            >
              <span className="flex items-center gap-2">
                <Icon className="h-4 w-4" />
                {item.label}
              </span>
              {theme === item.id && <Check className="h-4 w-4 text-primary" />}
            </button>
          );
        })}
      </div>
    </div>
  );

  const renderControls = (compact = false) => (
    <div ref={compact ? null : settingsRef} className="relative">
      <button
        type="button"
        onClick={() => setSettingsOpen((open) => !open)}
        className={compact ? `${controlButtonClass} w-full justify-between` : controlButtonClass}
        aria-expanded={settingsOpen}
        aria-label="Open settings"
      >
        <Settings className="h-4 w-4" />
        <span>{language.toUpperCase()}</span>
        {isDark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
        <ChevronDown className={`h-4 w-4 transition-transform ${settingsOpen ? 'rotate-180' : ''}`} />
      </button>
      {settingsOpen && renderSettingsMenu()}
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
            <span className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-primary/40 bg-primary/15 text-sm font-bold text-primary font-mono shadow-[0_0_18px_rgba(16,185,129,0.28)]">
              <Terminal className="h-5 w-5" />
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
            className={`${controlButtonClass} lg:hidden z-10 px-2.5`}
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
          className={`absolute right-0 top-0 h-full w-80 max-w-[88vw] overflow-y-auto p-5 transition-transform duration-300 ease-in-out ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          } ${
            isDark
              ? 'bg-dark-900 border-l border-primary/15'
              : 'bg-white border-l border-light-400/20'
          }`}
        >
          <div className="relative flex items-center justify-between mb-5">
            <NavLink to="/" end onClick={closeMenu} className={`flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-800'}`}>
              <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-primary/40 bg-primary/15 text-primary font-mono">
                <Terminal className="h-5 w-5" />
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
              className={`${controlButtonClass} px-2.5`}
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="relative space-y-1.5">{renderLinks(mobileLinkClass, closeMenu)}</div>

          <div className="relative mt-5 border-t border-primary/10 pt-5">
            <span className={`mb-3 block text-sm font-medium font-mono ${isDark ? 'text-primary/70' : 'text-slate-500'}`}>
              <Shield className="inline h-3.5 w-3.5 mr-1" />
              Settings
            </span>
            <div ref={settingsRef}>{renderControls(true)}</div>
          </div>
        </aside>
      </div>
    </>
  );
}

export default Navbar;
