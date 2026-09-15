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
  Radio,
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

function MatrixBackground({ isDark }) {
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
      className="absolute inset-0 pointer-events-none opacity-40"
      aria-hidden="true"
    />
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef(null);

  const langContext = useLanguage();
  const language = langContext?.language || 'en';
  const setLanguage = langContext?.setLanguage || langContext?.changeLanguage || langContext?.setLang;
  const t = langContext?.t || {};

  const themeContext = useTheme();
  const theme = themeContext?.theme || 'dark';
  const setTheme = themeContext?.setTheme || themeContext?.toggleTheme;
  const isDark = theme === 'dark';

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setSettingsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const closeMenu = () => setIsOpen(false);

  const handleLanguageSelect = (langId) => {
    if (typeof setLanguage === 'function') {
      setLanguage(langId);
    }
    setSettingsOpen(false);
  };

  const handleThemeSelect = (themeId) => {
    if (typeof setTheme === 'function') {
      setTheme(themeId);
    }
    setSettingsOpen(false);
  };

  const headerClass = scrolled
    ? isDark
      ? 'bg-[#030504]/95 backdrop-blur-xl border-b border-emerald-500/25 shadow-2xl shadow-black/80'
      : 'bg-[#f4f7f5]/95 backdrop-blur-xl border-b border-emerald-600/20 shadow-md shadow-emerald-950/5'
    : isDark
      ? 'bg-[#030504]/75 border-b border-emerald-500/15 backdrop-blur-md'
      : 'bg-[#f4f7f5]/85 border-b border-emerald-600/15 backdrop-blur-md';

  const controlButtonClass = `inline-flex h-9 items-center justify-center gap-2 rounded-xl border px-3 text-xs font-bold transition-all duration-200 font-mono tracking-wider cursor-pointer ${
    isDark
      ? 'border-emerald-500/40 bg-black/90 text-emerald-400 hover:border-emerald-400 hover:bg-emerald-950/40 shadow-[0_0_15px_rgba(16,185,129,0.15)]'
      : 'border-emerald-500/40 bg-white text-emerald-900 hover:border-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 shadow-xs'
  }`;

  const desktopLinkClass = ({ isActive }) =>
    `relative inline-flex items-center gap-1.5 px-2.5 xl:px-3 py-1.5 text-[11px] xl:text-xs font-bold rounded-lg transition-all duration-150 font-mono uppercase tracking-wider ${
      isActive
        ? isDark
          ? 'text-emerald-400 bg-emerald-950/60 border border-emerald-500/40 shadow-[0_0_14px_rgba(16,185,129,0.25)]'
          : 'text-emerald-900 bg-emerald-100/90 border border-emerald-400 shadow-xs font-black'
        : isDark
          ? 'text-slate-400 hover:text-emerald-400 hover:bg-emerald-950/30'
          : 'text-slate-700 hover:text-emerald-900 hover:bg-emerald-50/70'
    }`;

  const mobileLinkClass = ({ isActive }) =>
    `flex items-center justify-between px-4 py-3 text-xs font-bold rounded-xl transition-all duration-150 font-mono uppercase tracking-wider ${
      isActive
        ? isDark
          ? 'text-emerald-400 bg-emerald-950/60 border-l-4 border-emerald-400'
          : 'text-emerald-900 bg-emerald-100/90 border-l-4 border-emerald-600'
        : isDark
          ? 'text-slate-400 hover:text-emerald-400 hover:bg-emerald-950/30'
          : 'text-slate-700 hover:text-emerald-900 hover:bg-slate-100'
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
          <span className="flex items-center gap-1.5">
            <Icon className="h-3.5 w-3.5 opacity-80" />
            {t?.nav?.[item.label] ?? item.label}
          </span>
        </NavLink>
      );
    });

  const renderSettingsMenu = () => (
    <div
      className={`absolute right-0 top-full mt-3 w-64 rounded-xl border p-3.5 shadow-2xl z-[100] transition-all font-mono ${
        isDark
          ? 'border-emerald-500/40 bg-[#030504] shadow-[0_0_30px_rgba(0,0,0,0.9)] text-slate-200'
          : 'border-emerald-300 bg-white shadow-xl text-slate-900'
      }`}
    >
      {/* LANGUAGE SELECTOR */}
      <div className="mb-3.5 border-b border-emerald-500/20 pb-3">
        <p className="mb-2.5 flex items-center gap-2 text-[11px] uppercase tracking-widest text-emerald-500 font-bold">
          <Languages className="h-3.5 w-3.5" />
          Language // ភាសា
        </p>
        <div className="space-y-1.5">
          {[
            { id: 'en', label: 'English', hint: 'EN' },
            { id: 'kh', label: 'Khmer (ខ្មែរ)', hint: 'KH' },
          ].map((item) => {
            const isSelected = language === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleLanguageSelect(item.id);
                }}
                className={`flex w-full cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-xs font-semibold transition-all ${
                  isSelected
                    ? isDark
                      ? 'bg-emerald-950/70 text-emerald-400 border border-emerald-500/40 shadow-[0_0_10px_rgba(16,185,129,0.2)]'
                      : 'bg-emerald-100 text-emerald-900 border border-emerald-400 font-bold'
                    : isDark
                      ? 'text-slate-400 hover:bg-emerald-950/40 hover:text-emerald-300'
                      : 'text-slate-700 hover:bg-emerald-50'
                }`}
              >
                <span>{item.label}</span>
                <span className="flex items-center gap-2">
                  <span className="text-[10px] text-slate-500">{item.hint}</span>
                  {isSelected && <Check className="h-3.5 w-3.5 text-emerald-500" />}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* THEME SELECTOR */}
      <div>
        <p className="mb-2.5 flex items-center gap-2 text-[11px] uppercase tracking-widest text-emerald-500 font-bold">
          <Shield className="h-3.5 w-3.5" />
          Theme Mode
        </p>
        <div className="space-y-1.5">
          {[
            { id: 'dark', label: 'Black Hacker', icon: Moon },
            { id: 'light', label: 'Light Mode', icon: Sun },
          ].map((item) => {
            const Icon = item.icon;
            const isSelected = theme === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleThemeSelect(item.id);
                }}
                className={`flex w-full cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-xs font-semibold transition-all ${
                  isSelected
                    ? isDark
                      ? 'bg-emerald-950/70 text-emerald-400 border border-emerald-500/40 shadow-[0_0_10px_rgba(16,185,129,0.2)]'
                      : 'bg-emerald-100 text-emerald-900 border border-emerald-400 font-bold'
                    : isDark
                      ? 'text-slate-400 hover:bg-emerald-950/40 hover:text-emerald-300'
                      : 'text-slate-700 hover:bg-emerald-50'
                }`}
              >
                <span className="flex items-center gap-2">
                  <Icon className="h-3.5 w-3.5" />
                  {item.label}
                </span>
                {isSelected && <Check className="h-3.5 w-3.5 text-emerald-500" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerClass}`}>
        <MatrixBackground isDark={isDark} />
        <nav className="relative mx-auto flex h-16 max-w-[1700px] items-center justify-between gap-3 px-4 sm:px-6 lg:h-20 lg:px-12">
          
          {/* LOGO */}
          <NavLink to="/" end onClick={closeMenu} className="flex items-center gap-2.5 shrink-0 z-10 group">
            <span
              className={`relative flex h-9 w-9 items-center justify-center rounded-xl border transition-all duration-300 group-hover:scale-105 ${
                isDark
                  ? 'border-emerald-500/50 bg-emerald-950/40 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.3)]'
                  : 'border-emerald-500/50 bg-emerald-100 text-emerald-800 shadow-xs'
              }`}
            >
              <Terminal className="h-4 w-4" />
            </span>
            <span className="text-base sm:text-lg font-black tracking-wider font-mono">
              <span className="text-emerald-500">&lt;</span>
              <span className={isDark ? 'text-white' : 'text-slate-900'}>
                NGET
              </span>
              <span className={isDark ? 'text-emerald-400' : 'text-emerald-600'}>
                MEAS
              </span>
              <span className="text-emerald-500">/&gt;</span>
            </span>
          </NavLink>

          {/* DESKTOP NAVIGATION LINKS */}
          <div className="hidden items-center gap-1 xl:gap-1.5 lg:flex z-10">
            {renderLinks(desktopLinkClass)}
          </div>

          {/* DESKTOP CONTROLS */}
          <div ref={dropdownRef} className="hidden lg:flex items-center gap-3 relative z-10">
            {/* LIVE PULSE STATUS BADGE */}
            <div
              className={`hidden xl:flex items-center gap-2 border px-3 py-1.5 rounded-xl text-[11px] font-mono font-bold tracking-wider ${
                isDark 
                  ? 'border-emerald-900/80 bg-black/80 text-emerald-400 shadow-inner' 
                  : 'border-emerald-400 bg-white text-emerald-900 shadow-xs'
              }`}
            >
              <Radio className="h-3.5 w-3.5 animate-pulse text-emerald-500" />
              <span>ONLINE</span>
            </div>

            {/* SETTINGS MENU TRIGGER */}
            <button
              type="button"
              onClick={() => setSettingsOpen((prev) => !prev)}
              className={controlButtonClass}
              aria-expanded={settingsOpen}
              aria-label="Configuration settings"
            >
              <Settings className="h-3.5 w-3.5 text-emerald-500" />
              <span>{language ? language.toUpperCase() : 'EN'}</span>
              {isDark ? <Moon className="h-3.5 w-3.5" /> : <Sun className="h-3.5 w-3.5 text-emerald-600" />}
              <ChevronDown className={`h-3.5 w-3.5 transition-transform ${settingsOpen ? 'rotate-180' : ''}`} />
            </button>

            {settingsOpen && renderSettingsMenu()}
          </div>

          {/* MOBILE HAMBURGER TOGGLE */}
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className={`${controlButtonClass} lg:hidden z-10 px-2.5`}
            aria-label="Open Navigation"
          >
            <Menu className="h-5 w-5" />
          </button>
        </nav>
      </header>

      {/* MOBILE DRAWER */}
      <div className={`fixed inset-0 z-[60] transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={closeMenu} />

        <aside
          className={`absolute right-0 top-0 h-full w-80 max-w-[85vw] overflow-y-auto p-6 transition-transform duration-300 ease-in-out font-mono ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          } ${isDark ? 'bg-[#050807] border-l border-emerald-500/30' : 'bg-[#f4f7f5] border-l border-emerald-300 shadow-2xl'}`}
        >
          <div className="flex items-center justify-between pb-5 border-b border-emerald-500/20">
            <div className="flex items-center gap-2">
              <span className={`p-1.5 rounded-lg border ${isDark ? 'border-emerald-500/40 bg-emerald-950/40 text-emerald-400' : 'border-emerald-400 bg-emerald-100 text-emerald-800'}`}>
                <Terminal className="h-4 w-4" />
              </span>
              <span className={`font-black tracking-wider ${isDark ? 'text-white' : 'text-slate-900'}`}>
                &lt;NM/&gt;
              </span>
            </div>
            <button
              type="button"
              onClick={closeMenu}
              className={`${controlButtonClass} px-2.5`}
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="py-6 space-y-1.5">{renderLinks(mobileLinkClass, closeMenu)}</div>

          <div className="pt-6 border-t border-emerald-500/20">
            <span className="block mb-3 text-xs uppercase tracking-widest text-emerald-500 font-bold">
              // SYS_CONFIG
            </span>
            <div className="relative">
              {renderSettingsMenu()}
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}