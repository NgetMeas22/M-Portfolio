import { Link } from 'react-router-dom';
import { Mail, Heart, Terminal } from 'lucide-react';
import { GitHubIcon, LinkedInIcon } from '../SocialIcons.jsx';
import { useLanguage } from '../../hooks/useLanguage.jsx';
import { useTheme } from '../../hooks/useTheme.jsx';

const quickLinks = [
  { key: 'home', path: '/' },
  { key: 'about', path: '/about' },
  { key: 'skills', path: '/skills' },
  { key: 'projects', path: '/projects' },
  { key: 'contact', path: '/contact' },
];

const socialLinks = [
  { icon: GitHubIcon, href: 'https://github.com/NgetMeas22', label: 'GitHub' },
  { icon: LinkedInIcon, href: 'https://linkedin.com/in/nget-meas-6525bb3a6', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:measm2519@gmail.com', label: 'Email' },
];

function Footer() {
  const { t } = useLanguage();
  const { theme } = useTheme();

  return (
    <footer
      className={`border-t transition-colors duration-300 ${
        theme === 'dark'
          ? 'bg-[#0a0a0a] border-white/5 text-gray-400'
          : 'bg-gray-50 border-gray-200 text-gray-700'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Terminal className={`w-5 h-5 ${theme === 'dark' ? 'text-primary' : 'text-green-600'}`} />
              <h3
                className={`text-xl font-bold font-mono ${
                  theme === 'dark' ? 'text-gray-200' : 'text-gray-900'
                }`}
              >
                NGET MEAS
              </h3>
            </div>
            <p className="text-sm leading-relaxed max-w-xs">
              {t.footer.description}
            </p>
          </div>

          <div>
            <h4
              className={`text-sm font-semibold uppercase tracking-wider mb-3 font-mono ${
                theme === 'dark' ? 'text-gray-200' : 'text-gray-900'
              }`}
            >
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    to={link.path}
                    className={`text-sm transition-colors duration-200 ${
                      theme === 'dark'
                        ? 'text-gray-400 hover:text-primary'
                        : 'text-gray-500 hover:text-green-600'
                    }`}
                  >
                    {t.nav[link.key]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4
              className={`text-sm font-semibold uppercase tracking-wider mb-3 font-mono ${
                theme === 'dark' ? 'text-gray-200' : 'text-gray-900'
              }`}
            >
              {t.footer.connect}
            </h4>
            <div className="flex gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={`p-2.5 rounded-lg transition-all duration-200 ${
                    theme === 'dark'
                      ? 'bg-primary/5 text-gray-400 hover:bg-primary/10 hover:text-primary'
                      : 'bg-gray-100 text-gray-500 hover:bg-green-50 hover:text-green-600'
                  }`}
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div
        className={`border-t py-6 ${
          theme === 'dark'
            ? 'border-white/5 bg-[#050505]'
            : 'border-gray-200 bg-gray-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
          <p className={`font-mono ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
            &copy; {new Date().getFullYear()} <span className={theme === 'dark' ? 'text-primary' : 'text-green-600'}>NGET MEAS</span>. {t.footer.copyright}
          </p>
          <p
            className={`flex items-center gap-1 ${
              theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
            }`}
          >
            {t.footer.builtWith}{' '}
            <Heart size={12} className="text-red-500 fill-red-500" />
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
