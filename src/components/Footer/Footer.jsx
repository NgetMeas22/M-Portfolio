import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Mail, 
  Terminal, 
  Radio, 
  Activity, 
  ArrowUp, 
  ShieldCheck, 
  Cpu, 
  Binary, 
  Lock, 
  Zap, 
  CheckCircle2 
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

export default function Footer() {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [uptimeSeconds, setUptimeSeconds] = useState(14820);
  const [latency, setLatency] = useState(18);

  // Live telemetry timer simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setUptimeSeconds(prev => prev + 1);
    }, 1000);
    const latencyTimer = setInterval(() => {
      setLatency(Math.floor(16 + Math.random() * 8));
    }, 3000);
    return () => {
      clearInterval(timer);
      clearInterval(latencyTimer);
    };
  }, []);

  const formatUptime = (total) => {
    const hrs = Math.floor(total / 3600);
    const mins = Math.floor((total % 3600) / 60);
    const secs = total % 60;
    return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      className={`relative border-t font-mono transition-colors duration-300 overflow-hidden ${
        isDark 
          ? 'bg-[#030504] border-emerald-500/20 text-emerald-400' 
          : 'bg-[#f4f7f5] border-emerald-900/10 text-slate-800'
      }`}
    >
      {/* GLOW ACCENT BEHIND FOOTER */}
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
          isDark ? 'border-emerald-950 bg-black/80 text-emerald-600' : 'border-emerald-100 bg-white text-emerald-800'
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
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-14 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">

          {/* COLUMN 1: SYSTEM IDENTITY & RUNTIME */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <span
                className={`flex h-9 w-9 items-center justify-center rounded-lg border ${
                  isDark
                    ? 'border-emerald-500/40 bg-emerald-950/40 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                    : 'border-emerald-300 bg-emerald-50 text-emerald-700 shadow-xs'
                }`}
              >
                <Terminal className="h-5 w-5" />
              </span>
              <span className="text-xl font-black uppercase tracking-wider text-white">
                <span className="text-emerald-500">&lt;</span>
                NGET<span className="text-emerald-400">MEAS</span>
                <span className="text-emerald-500">/&gt;</span>
              </span>
            </div>

            <p className={`text-xs sm:text-sm leading-relaxed max-w-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Full Stack Developer & Cyber UI Architect. Building hardened web nodes, distributed microservices, and reactive high-throughput engines.
            </p>

            {/* LIVE TELEMETRY WIDGET */}
            <div
              className={`rounded-xl border p-3.5 space-y-2 max-w-sm ${
                isDark ? 'border-emerald-950 bg-black/60' : 'border-emerald-200 bg-white shadow-xs'
              }`}
            >
              <div className="flex items-center justify-between text-[11px] font-bold">
                <span className="flex items-center gap-1.5 text-emerald-500">
                  <Radio className="h-3.5 w-3.5 animate-pulse" /> LIVE_UPTIME
                </span>
                <span className={isDark ? 'text-slate-300' : 'text-slate-800'}>{formatUptime(uptimeSeconds)}</span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className={isDark ? 'text-slate-500' : 'text-slate-500'}>LATENCY / PROD:</span>
                <span className="font-bold text-emerald-500">{latency}ms [OPTIMAL]</span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className={isDark ? 'text-slate-500' : 'text-slate-500'}>CRYPTO CIPHER:</span>
                <span className="text-slate-400">ECDHE-RSA-AES256</span>
              </div>
            </div>
          </div>

          {/* COLUMN 2: CLI NAVIGATION MATRIX */}
          <div className="md:col-span-4 space-y-3">
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
                      ? 'border-emerald-950/60 bg-emerald-950/10 hover:border-emerald-500/50 hover:bg-emerald-950/30 text-slate-300 hover:text-emerald-400'
                      : 'border-emerald-100 bg-white hover:border-emerald-300 hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 shadow-xs'
                  }`}
                >
                  <span className="truncate">{t.nav[link.key] || link.key}</span>
                  <span className={`text-[10px] font-mono opacity-50 group-hover:opacity-100 ${isDark ? 'text-emerald-500' : 'text-emerald-700'}`}>
                    {link.cmd}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* COLUMN 3: EXTERNAL SIGNAL HUBS & TOP TRIGGER */}
          <div className="md:col-span-3 space-y-4">
            <h4
              className={`text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 ${
                isDark ? 'text-emerald-400' : 'text-emerald-800'
              }`}
            >
              <Zap className="h-3.5 w-3.5 text-emerald-500" />
              // OUTBOUND_NODES
            </h4>

            <div className="flex flex-col gap-2.5">
              <a
                href="https://github.com/NgetMeas22"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-between p-2.5 rounded-lg border text-xs font-bold transition-all ${
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
                className={`flex items-center justify-between p-2.5 rounded-lg border text-xs font-bold transition-all ${
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
                className={`flex items-center justify-between p-2.5 rounded-lg border text-xs font-bold transition-all ${
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
              className={`w-full mt-2 cursor-pointer flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg border text-xs font-bold uppercase tracking-wider transition-all active:scale-95 ${
                isDark
                  ? 'border-emerald-500/40 bg-emerald-950/20 text-emerald-400 hover:bg-emerald-500/20 hover:border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.15)]'
                  : 'border-emerald-300 bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
              }`}
            >
              <ArrowUp className="h-3.5 w-3.5" />
              TOP_OF_STACK
            </button>
          </div>

        </div>
      </div>

      {/* COPYRIGHT & SYSTEM CLEARANCE BAR */}
      <div
        className={`border-t py-4 text-xs font-mono transition-colors ${
          isDark ? 'border-emerald-950/80 bg-black/95 text-slate-500' : 'border-emerald-100 bg-emerald-50/50 text-slate-600'
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>
              &copy; {new Date().getFullYear()} <span className="font-bold text-emerald-400">NGET MEAS</span>. ALL RIGHTS RESERVED.
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