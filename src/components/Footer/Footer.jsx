import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Mail, 
  Terminal, 
  Radio, 
  ArrowUp, 
  ShieldCheck, 
  Cpu, 
  Zap, 
  Eye,
  Clock
} from 'lucide-react';
import { GitHubIcon, LinkedInIcon } from '../SocialIcons.jsx';
import { useLanguage } from '../../hooks/useLanguage.jsx';
import { useTheme } from '../../hooks/useTheme.jsx';

const quickCommands = [
  { key: 'home', path: '/', cmd: 'cd ~/' },
  { key: 'about', path: '/about', cmd: 'cat whoami.md' },
  { key: 'skills', path: '/skills', cmd: 'netstat -ports' },
  { key: 'projects', path: '/projects', cmd: 'ls -la ./repos' },
  { key: 'experience', path: '/experience', cmd: 'journalctl -xe' },
  { key: 'certificates', path: '/certificates', cmd: 'gpg --verify' },
  { key: 'contact', path: '/contact', cmd: './dispatch_msg.sh' },
];

const telemetryFeeds = [
  'SHA-256: 8f4e2d...e91a',
  'PORT: 443/TLS_v1.3',
  'STATUS: ROOT_UID_0',
  'GEO: 11.5564° N, 104.9282° E',
  'FIREWALL: ENFORCED',
  'DAEMON: cron.hourly',
  'CACHE: REDIS_6379_OK'
];

// Unique identifier key for your portfolio counter
const COUNTER_NAMESPACE = 'ngetmeas_portfolio_2026';
const COUNTER_KEY = 'global_visitors';
const INITIAL_OFFSET = 1850; // Starting baseline count

export default function Footer() {
  const { t, language } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [realTime, setRealTime] = useState('');
  const [latency, setLatency] = useState(18);
  const [visitCount, setVisitCount] = useState(() => {
    const cached = localStorage.getItem('portfolio_cached_count');
    return cached ? parseInt(cached, 10) : INITIAL_OFFSET;
  });

  // 1. LIVE TIME CLOCK (Phnom Penh GMT+7)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setRealTime(
        now.toLocaleTimeString('en-GB', {
          timeZone: 'Asia/Phnom_Penh',
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        })
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);

    const latencyTimer = setInterval(() => {
      setLatency(Math.floor(16 + Math.random() * 7));
    }, 3500);

    return () => {
      clearInterval(timer);
      clearInterval(latencyTimer);
    };
  }, []);

  // 2. REAL GLOBAL VISITOR HIT TRACKER (Increments for any device visiting your link)
  useEffect(() => {
    const hasVisitedInSession = sessionStorage.getItem('visited_session');

    async function recordVisitor() {
      try {
        // If first time visiting in this browser session -> call /up/ (increment by 1 globally)
        // If already counted in this tab session -> call /get/ (fetch current without double-counting)
        const action = !hasVisitedInSession ? 'up' : 'get';
        const endpoint = `https://api.counterapi.dev/v1/${COUNTER_NAMESPACE}/${COUNTER_KEY}/${action}`;

        const res = await fetch(endpoint);
        if (!res.ok) throw new Error('Counter API unreachable');
        const data = await res.json();

        if (data && typeof data.count === 'number') {
          const totalHits = data.count + INITIAL_OFFSET;
          setVisitCount(totalHits);
          localStorage.setItem('portfolio_cached_count', totalHits.toString());
          sessionStorage.setItem('visited_session', 'true');
        }
      } catch {
        // Fallback gracefully if API is offline or adblocker intervenes
        const local = localStorage.getItem('portfolio_cached_count');
        const nextLocal = local ? parseInt(local, 10) + (!hasVisitedInSession ? 1 : 0) : INITIAL_OFFSET;
        setVisitCount(nextLocal);
        localStorage.setItem('portfolio_cached_count', nextLocal.toString());
        sessionStorage.setItem('visited_session', 'true');
      }
    }

    recordVisitor();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      className={`relative border-t font-mono transition-colors duration-300 overflow-hidden ${
        isDark 
          ? 'bg-[#030504] border-emerald-500/20 text-emerald-400' 
          : 'bg-[#f4f7f5] border-emerald-900/15 text-slate-800'
      }`}
    >
      {/* AMBIENT BACKDROP GLOW */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-64 overflow-hidden" aria-hidden="true">
        <div
          className="absolute left-1/2 -bottom-24 h-72 w-[800px] -translate-x-1/2 rounded-full blur-3xl opacity-20"
          style={{
            background: isDark
              ? 'radial-gradient(ellipse, rgba(16,185,129,0.3) 0%, transparent 70%)'
              : 'radial-gradient(ellipse, rgba(5,150,105,0.2) 0%, transparent 70%)'
          }}
        />
      </div>

      {/* TOP STREAMING TICKER */}
      <div
        className={`border-b py-2 text-[10px] sm:text-[11px] uppercase tracking-widest overflow-hidden ${
          isDark ? 'border-emerald-950 bg-black/80 text-emerald-500' : 'border-emerald-100 bg-white text-emerald-800'
        }`}
      >
        <div className="flex items-center gap-8 whitespace-nowrap animate-marquee">
          {[...telemetryFeeds, ...telemetryFeeds].map((item, idx) => (
            <span key={idx} className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* MAIN FOOTER CONTAINER */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10 items-start">

          {/* COLUMN 1: SYSTEM IDENTITY & LIVE REAL-TIME TELEMETRY */}
          <div className="md:col-span-6 lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <span
                className={`flex h-9 w-9 items-center justify-center rounded-xl border ${
                  isDark
                    ? 'border-emerald-500/40 bg-emerald-950/40 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                    : 'border-emerald-400 bg-emerald-100 text-emerald-800 shadow-xs'
                }`}
              >
                <Terminal className="h-4 w-4" />
              </span>
              <span className="text-xl font-black uppercase tracking-wider font-mono">
                <span className="text-emerald-500">&lt;</span>
                <span className={isDark ? 'text-white' : 'text-slate-900'}>NGET</span>
                <span className={isDark ? 'text-emerald-400' : 'text-emerald-600'}>MEAS</span>
                <span className="text-emerald-500">/&gt;</span>
              </span>
            </div>

            <p className={`text-xs sm:text-sm leading-relaxed max-w-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Full Stack Developer & Cyber UI Architect. Building hardened web applications, scalable backends, and responsive client experiences.
            </p>

            {/* LIVE TELEMETRY & GLOBAL VISITOR COUNTER */}
            <div
              className={`rounded-xl border p-4 space-y-2.5 max-w-sm transition-all ${
                isDark 
                  ? 'border-emerald-900/80 bg-black/80 shadow-[0_0_20px_rgba(0,0,0,0.8)]' 
                  : 'border-emerald-200 bg-white shadow-sm'
              }`}
            >
              {/* REAL-TIME CLOCK */}
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="flex items-center gap-1.5 text-emerald-500">
                  <Clock className="h-3.5 w-3.5" />
                  <span>REAL_TIME [GMT+7]:</span>
                </span>
                <span className={`font-mono font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {realTime || '00:00:00'}
                </span>
              </div>

              {/* GLOBAL REAL VISITOR TRAFFIC LOG */}
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 text-emerald-500 font-bold">
                  <Eye className="h-3.5 w-3.5" />
                  <span>{language === 'kh' ? 'ចំនួនអ្នកចូលមើល:' : 'TOTAL_VISITORS:'}</span>
                </span>
                <span className={`font-mono font-black px-2.5 py-0.5 rounded border text-[11px] ${
                  isDark
                    ? 'border-emerald-500/40 bg-emerald-950/60 text-emerald-300 shadow-[0_0_10px_rgba(16,185,129,0.2)]'
                    : 'border-emerald-300 bg-emerald-50 text-emerald-900'
                }`}>
                  #{String(visitCount).padStart(7, '0')}
                </span>
              </div>

              {/* NETWORK LATENCY */}
              <div className="flex items-center justify-between text-[11px] pt-1 border-t border-emerald-500/15">
                <span className={isDark ? 'text-slate-500' : 'text-slate-500'}>LATENCY / PROD:</span>
                <span className="font-bold text-emerald-500 flex items-center gap-1">
                  <Radio className="h-3 w-3 animate-pulse" /> {latency}ms [OPTIMAL]
                </span>
              </div>
            </div>
          </div>

          {/* COLUMN 2: CLI NAVIGATION MATRIX (AUTOMATICALLY HIDDEN ON MOBILE SCREENS) */}
          <div className="hidden md:block md:col-span-6 lg:col-span-4 space-y-3">
            <h4
              className={`text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 ${
                isDark ? 'text-emerald-400' : 'text-emerald-800'
              }`}
            >
              <Cpu className="h-3.5 w-3.5 text-emerald-500" />
              // SHELL_COMMANDS
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {quickCommands.map((link) => (
                <Link
                  key={link.key}
                  to={link.path}
                  className={`group flex items-center justify-between p-2 rounded-lg border transition-all ${
                    isDark
                      ? 'border-emerald-950/70 bg-emerald-950/15 hover:border-emerald-500/50 hover:bg-emerald-950/30 text-slate-300 hover:text-emerald-400'
                      : 'border-emerald-100 bg-white hover:border-emerald-300 hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 shadow-xs'
                  }`}
                >
                  <span className="truncate">{t.nav[link.key] || link.key}</span>
                  <span className={`text-[10px] font-mono opacity-60 group-hover:opacity-100 ${isDark ? 'text-emerald-500' : 'text-emerald-700'}`}>
                    {link.cmd}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* COLUMN 3: OUTBOUND LINKS & RETURN TO TOP */}
          <div className="md:col-span-12 lg:col-span-3 space-y-4">
            <h4
              className={`text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 ${
                isDark ? 'text-emerald-400' : 'text-emerald-800'
              }`}
            >
              <Zap className="h-3.5 w-3.5 text-emerald-500" />
              // OUTBOUND_NODES
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-2.5">
              <a
                href="https://github.com/NgetMeas22"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-between p-2.5 rounded-xl border text-xs font-bold transition-all ${
                  isDark
                    ? 'border-emerald-950 bg-black text-slate-300 hover:border-emerald-400 hover:text-emerald-400'
                    : 'border-emerald-200 bg-white text-slate-700 hover:border-emerald-500 hover:text-emerald-700 shadow-xs'
                }`}
              >
                <span className="flex items-center gap-2">
                  <GitHubIcon size={16} /> GitHub
                </span>
                <span className="text-[10px] text-emerald-500 font-mono">@NgetMeas22</span>
              </a>

              <a
                href="https://linkedin.com/in/nget-meas-6525bb3a6"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-between p-2.5 rounded-xl border text-xs font-bold transition-all ${
                  isDark
                    ? 'border-emerald-950 bg-black text-slate-300 hover:border-emerald-400 hover:text-emerald-400'
                    : 'border-emerald-200 bg-white text-slate-700 hover:border-emerald-500 hover:text-emerald-700 shadow-xs'
                }`}
              >
                <span className="flex items-center gap-2">
                  <LinkedInIcon size={16} /> LinkedIn
                </span>
                <span className="text-[10px] text-emerald-500 font-mono">in/nget-meas</span>
              </a>

              <a
                href="mailto:measm2519@gmail.com"
                className={`flex items-center justify-between p-2.5 rounded-xl border text-xs font-bold transition-all ${
                  isDark
                    ? 'border-emerald-950 bg-black text-slate-300 hover:border-emerald-400 hover:text-emerald-400'
                    : 'border-emerald-200 bg-white text-slate-700 hover:border-emerald-500 hover:text-emerald-700 shadow-xs'
                }`}
              >
                <span className="flex items-center gap-2">
                  <Mail size={16} /> Email
                </span>
                <span className="text-[10px] text-emerald-500 font-mono">DIRECT_MAIL</span>
              </a>
            </div>

            {/* SCROLL TO TOP TRIGGER */}
            <button
              type="button"
              onClick={scrollToTop}
              className={`w-full mt-2 cursor-pointer flex items-center justify-center gap-2 py-3 px-4 rounded-xl border text-xs font-bold uppercase tracking-wider transition-all active:scale-95 ${
                isDark
                  ? 'border-emerald-500/40 bg-emerald-950/30 text-emerald-400 hover:bg-emerald-500/20 hover:border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.15)]'
                  : 'border-emerald-300 bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
              }`}
            >
              <ArrowUp className="h-3.5 w-3.5" />
              TOP_OF_STACK
            </button>
          </div>

        </div>
      </div>

      {/* COPYRIGHT & SYSTEM INTEGRITY BAR */}
      <div
        className={`border-t py-4 text-xs font-mono transition-colors ${
          isDark ? 'border-emerald-950/80 bg-black/95 text-slate-400' : 'border-emerald-100 bg-emerald-50/70 text-slate-600'
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>
              &copy; {new Date().getFullYear()} <span className="font-bold text-emerald-500">NGET MEAS</span>. ALL RIGHTS RESERVED.
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span className="flex items-center gap-1 text-emerald-500">
              <ShieldCheck className="h-3.5 w-3.5" />
              SYSTEM_INTEGRITY: 100%
            </span>
            <span className={isDark ? 'text-slate-600' : 'text-slate-400'}>//</span>
            <span>BUILD: v2.4.0-SEC</span>
          </div>
        </div>
      </div>

      {/* MARQUEE ANIMATION KEYFRAMES */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </footer>
  );
}