import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ExternalLink, Download, ArrowRight } from 'lucide-react';
import { GitHubIcon, LinkedInIcon } from '../../components/SocialIcons.jsx';
import { useLanguage } from '../../hooks/useLanguage';
import { useTheme } from '../../hooks/useTheme';
import AOS from 'aos';
import 'aos/dist/aos.css';

const techStack = [
  { name: 'React', color: '#61dafb' },
  { name: 'JavaScript', color: '#f7df1e' },
  { name: 'PHP', color: '#777bb4' },
  { name: 'Laravel', color: '#ff2d20' },
  { name: 'MySQL', color: '#4479a1' },
  { name: 'Tailwind CSS', color: '#06b6d4' },
  { name: 'Vue.js', color: '#4fc08d' },
  { name: 'Git', color: '#f05032' },
];

const learningTags = ['AI', 'Python', 'C# .NET', 'Spring Boot'];

const terminalLines = [
  { command: 'whoami', output: 'NGET MEAS' },
  { command: 'role', output: 'Full Stack Developer' },
  { command: 'location', output: 'Phnom Penh, Cambodia' },
  { command: 'status', output: 'Open to opportunities' },
];

export default function Home() {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [displayedLines, setDisplayedLines] = useState([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [showOutput, setShowOutput] = useState(false);
  const [typingComplete, setTypingComplete] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  useEffect(() => {
    if (currentLine >= terminalLines.length) {
      const timer = setTimeout(() => setTypingComplete(true), 0);
      return () => clearTimeout(timer);
    }

    const line = terminalLines[currentLine];

    if (!showOutput) {
      if (currentChar < line.command.length) {
        const timer = setTimeout(() => {
          setDisplayedLines(prev => {
            const updated = [...prev];
            if (updated[currentLine]) {
              updated[currentLine] = { ...updated[currentLine], command: line.command.slice(0, currentChar + 1) };
            } else {
              updated[currentLine] = { command: line.command.slice(0, currentChar + 1), output: '' };
            }
            return updated;
          });
          setCurrentChar(c => c + 1);
        }, 60);
        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => setShowOutput(true), 300);
        return () => clearTimeout(timer);
      }
    } else {
      const outputTimer = setTimeout(() => {
        setDisplayedLines(prev => {
          const updated = [...prev];
          updated[currentLine] = { ...updated[currentLine], output: line.output };
          return updated;
        });
      }, 0);
      const timer = setTimeout(() => {
        setShowOutput(false);
        setCurrentChar(0);
        setCurrentLine(l => l + 1);
      }, 200);
      return () => { clearTimeout(outputTimer); clearTimeout(timer); };
    }
  }, [currentLine, currentChar, showOutput]);

  return (
    <div className="min-h-screen">
      <section className="min-h-screen flex items-center relative overflow-hidden grid-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div data-aos="fade-right">
              <p className={`text-sm font-mono mb-4 tracking-wider uppercase ${isDark ? 'text-primary' : 'text-green-600'}`}>
                {t.hero.greeting}
              </p>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-4">
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage: isDark
                      ? 'linear-gradient(135deg, #00ff41, #39ff14, #10b981)'
                      : 'linear-gradient(135deg, #059669, #22c55e, #16a34a)',
                  }}
                >
                  {t.hero.name}
                </span>
              </h1>

              <h2 className={`text-2xl sm:text-3xl font-semibold mb-6 ${isDark ? 'text-gray-200' : 'text-slate-600'}`}>
                {t.hero.role}
              </h2>

              <p className={`text-lg mb-3 ${isDark ? 'text-gray-300' : 'text-slate-500'}`}>
                {t.hero.description1}
              </p>
              <p className={`text-lg mb-8 ${isDark ? 'text-gray-300' : 'text-slate-500'}`}>
                {t.hero.description2}
              </p>

              <div className="mb-8">
                <span className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                  {t.hero.currentlyLearning}:
                </span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {learningTags.map(tag => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-4 mb-8">
                <Link to="/projects" className="btn-primary inline-flex items-center gap-2">
                  {t.hero.viewProjects}
                  <ArrowRight size={18} />
                </Link>
                <a href="/NgetMeas_CV.pdf" download className="btn-outline inline-flex items-center gap-2">
                  <Download size={18} />
                  {t.hero.downloadCV}
                </a>
                <Link to="/contact" className="btn-outline inline-flex items-center gap-2">
                  {t.hero.contactMe}
                  <ExternalLink size={18} />
                </Link>
              </div>

              <div className="flex gap-4">
                <a
                  href="https://github.com/NgetMeas22"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-3 rounded-lg transition-all duration-300 ${
                    isDark
                      ? 'bg-dark-600 hover:bg-dark-500 text-gray-300 hover:text-primary'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-green-600'
                  }`}
                >
                  <GitHubIcon size={20} />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-3 rounded-lg transition-all duration-300 ${
                    isDark
                      ? 'bg-dark-600 hover:bg-dark-500 text-gray-300 hover:text-primary'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-green-600'
                  }`}
                >
                  <LinkedInIcon size={20} />
                </a>
                <a
                  href="mailto:measm2519@gmail.com"
                  className={`p-3 rounded-lg transition-all duration-300 ${
                    isDark
                      ? 'bg-dark-600 hover:bg-dark-500 text-gray-300 hover:text-primary'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-green-600'
                  }`}
                >
                  <Mail size={20} />
                </a>
              </div>
            </div>

            <div data-aos="fade-up" className="flex justify-center lg:justify-end">
              <div className="w-full max-w-md">
                <div className="terminal-window">
                  <div className={`flex items-center gap-2 px-4 py-3 ${isDark ? 'bg-dark-700' : 'bg-slate-800'}`}>
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <span className="ml-2 text-xs font-mono text-slate-400">{t.hero.terminalTitle}</span>
                  </div>
                  <div className="p-5 font-mono text-sm space-y-4 min-h-[240px]">
                    {displayedLines.map((line, i) => (
                      <div key={i}>
                        <p className="text-primary/80">
                          <span className="text-emerald-400">&gt;</span>{' '}
                          {line.command}
                        </p>
                        {line.output && (
                          <p className={isDark ? 'text-primary/80' : 'text-green-700'}>{line.output}</p>
                        )}
                      </div>
                    ))}
                    {!typingComplete && (
                      <span className="typing-cursor" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div data-aos="fade-up">
            <div className="text-center mb-12">
              <h2 className="section-title">Tech Stack</h2>
              <p className="section-subtitle">
                Technologies I work with daily
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              {techStack.map(tech => (
                <div
                  key={tech.name}
                  className={`flex items-center gap-3 px-6 py-4 rounded-xl transition-all duration-300 hover:scale-105 ${
                    isDark
                      ? 'bg-dark-600 border border-dark-400 hover:border-primary/30 hover:shadow-[0_0_15px_rgba(0,255,65,0.15)]'
                      : 'bg-white border border-slate-200 hover:border-green-400/30 shadow-sm'
                  }`}
                >
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: tech.color }}
                  />
                  <span className={`font-medium text-sm ${isDark ? 'text-gray-200' : 'text-slate-700'}`}>
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div data-aos="fade-up">
            <div className="text-center mb-12">
              <h2 className="section-title">GitHub Profile</h2>
              <p className="section-subtitle">
                Check out my open-source contributions and projects
              </p>
            </div>
            <div className={`card max-w-2xl mx-auto text-center ${isDark ? '' : 'shadow-lg'}`}>
              <div className="flex items-center justify-center mb-6">
                <GitHubIcon size={48} className={isDark ? 'text-primary' : 'text-green-600'} />
              </div>
              <h3 className={`text-xl font-bold mb-4 font-mono ${isDark ? 'text-gray-200' : 'text-slate-800'}`}>
                @NgetMeas22
              </h3>
              <div className="flex justify-center gap-8 mb-8">
                <div>
                  <p className={`text-3xl font-bold font-mono ${isDark ? 'text-primary' : 'text-green-600'}`}>22</p>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>Public Repos</p>
                </div>
                <div>
                  <p className={`text-3xl font-bold font-mono ${isDark ? 'text-primary' : 'text-green-600'}`}>3</p>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>Followers</p>
                </div>
              </div>
              <a
                href="https://github.com/NgetMeas22"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-2"
              >
                View GitHub Profile
                <ExternalLink size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
