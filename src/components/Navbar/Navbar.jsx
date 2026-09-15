import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, Sun, Moon, Globe } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage.jsx';
import { useTheme } from '../../hooks/useTheme.jsx';

const navItems = [
  { to: '/', label: 'home', end: true },
  { to: '/about', label: 'about' },
  { to: '/skills', label: 'skills' },
  { to: '/projects', label: 'projects' },
  { to: '/experience', label: 'experience' },
  { to: '/certificates', label: 'certificates' },
  { to: '/education', label: 'education' },
  { to: '/services', label: 'services' },
  { to: '/blog', label: 'blog' },
  { to: '/contact', label: 'contact' },
];

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
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const toggleLanguage = () => setLanguage(language === 'en' ? 'kh' : 'en');
  const closeMenu = () => setIsOpen(false);

  const headerClass = scrolled
    ? isDark
      ? 'bg-dark-900/85 backdrop-blur-xl border-b border-primary/10 shadow-lg shadow-black/20'
      : 'bg-white/85 backdrop-blur-xl border-b border-light-400/20 shadow-lg shadow-slate-200/50'
    : 'bg-transparent border-b border-transparent';

  const textClass = isDark ? 'text-white' : 'text-slate-800';

  const controlButtonClass = `inline-flex h-10 w-10 items-center justify-center rounded-lg transition-colors duration-200 ${
    isDark
      ? 'text-gray-200 hover:text-primary hover:bg-white/5'
      : 'text-slate-600 hover:text-primary-dim hover:bg-slate-100'
  }`;

  const desktopLinkClass = ({ isActive }) =>
    `relative px-3 py-1.5 text-sm font-medium rounded-md transition-colors duration-200 ${
      isActive
        ? isDark
          ? 'text-primary bg-primary/10 after:absolute after:left-3 after:right-3 after:-bottom-0.5 after:h-0.5 after:rounded-full after:bg-primary'
          : 'text-primary-dim bg-primary/10 after:absolute after:left-3 after:right-3 after:-bottom-0.5 after:h-0.5 after:rounded-full after:bg-primary-dim'
        : isDark
          ? 'text-gray-200 hover:text-primary hover:bg-primary/5'
          : 'text-slate-700 hover:text-primary-dim hover:bg-primary/10'
    }`;

  const mobileLinkClass = ({ isActive }) =>
    `block px-4 py-3 text-base font-medium rounded-lg transition-colors duration-200 ${
      isActive
        ? isDark
          ? 'text-primary bg-primary/10 border-l-2 border-primary'
          : 'text-primary-dim bg-primary/10 border-l-2 border-primary-dim'
        : isDark
          ? 'text-gray-200 hover:text-primary hover:bg-white/5'
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
        {t.nav[item.label]}
      </NavLink>
    ));

  const renderControls = (compact = false) => (
    <div className={`flex items-center ${compact ? 'gap-2' : 'gap-1'}`}>
      <button
        type="button"
        onClick={toggleLanguage}
        className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold transition-colors duration-200 ${
          isDark
            ? 'text-gray-200 hover:text-primary hover:bg-white/5'
            : 'text-slate-600 hover:text-primary-dim hover:bg-slate-100'
        }`}
        aria-label="Switch language"
      >
        <Globe className="h-4 w-4" />
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
        <nav
          className={`mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-20 lg:px-8 ${textClass}`}
        >
          <NavLink to="/" end onClick={closeMenu} className="flex items-center gap-2.5 shrink-0">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent text-sm font-bold text-dark-900">
              NM
            </span>
            <span className="hidden sm:block text-lg font-bold tracking-wide">
              NGET <span className={isDark ? 'text-primary' : 'text-primary-dim'}>MEAS</span>
            </span>
            <span className="sm:hidden text-lg font-bold tracking-wide">NM</span>
          </NavLink>

          <div className="hidden items-center gap-1 lg:flex">
            {renderLinks(desktopLinkClass)}
          </div>

          <div className="hidden lg:block">{renderControls()}</div>

          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className={`${controlButtonClass} lg:hidden`}
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
          className={`absolute inset-0 bg-black/60 transition-opacity duration-300 ${
            isOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={closeMenu}
        />

        <aside
          className={`absolute right-0 top-0 h-full w-72 max-w-[85vw] overflow-y-auto p-6 transition-transform duration-300 ease-in-out ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          } ${
            isDark
              ? 'bg-dark-800 border-l border-primary/10'
              : 'bg-white border-l border-light-400/20'
          }`}
        >
          <div className="flex items-center justify-between mb-6">
            <NavLink to="/" end onClick={closeMenu} className={`flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-800'}`}>
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent text-sm font-bold text-dark-900">
                NM
              </span>
              <span className="text-base font-bold tracking-wide">
                NGET <span className={isDark ? 'text-primary' : 'text-primary-dim'}>MEAS</span>
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

          <div className="space-y-1.5">{renderLinks(mobileLinkClass, closeMenu)}</div>

          <div className="mt-6 pt-6 border-t border-primary/10 flex items-center justify-between">
            <span className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
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