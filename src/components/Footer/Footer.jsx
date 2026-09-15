import { Link } from 'react-router-dom';
import { Mail, Heart } from 'lucide-react';
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
          ? 'bg-[#0a0a0f] border-white/10 text-gray-300'
          : 'bg-gray-50 border-gray-200 text-gray-700'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <h3
              className={`text-xl font-bold mb-3 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}
            >
              NGET MEAS
            </h3>
            <p className="text-sm leading-relaxed max-w-xs">
              {t.footer.description}
            </p>
          </div>

          <div>
            <h4
              className={`text-sm font-semibold uppercase tracking-wider mb-4 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
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
                        ? 'text-gray-400 hover:text-cyan-400'
                        : 'text-gray-500 hover:text-blue-600'
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
              className={`text-sm font-semibold uppercase tracking-wider mb-4 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
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
                      ? 'bg-white/5 text-gray-400 hover:bg-cyan-500/15 hover:text-cyan-400'
                      : 'bg-gray-100 text-gray-500 hover:bg-blue-50 hover:text-blue-600'
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
            ? 'border-white/10 bg-[#07070b]'
            : 'border-gray-200 bg-gray-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
          <p className={theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}>
            &copy; {new Date().getFullYear()} NGET MEAS. {t.footer.copyright}
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
