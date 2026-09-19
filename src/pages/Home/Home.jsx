import { useState, useEffect, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Mail,
  ExternalLink,
  Download,
  ArrowRight,
  Terminal as TerminalIcon,
  ShieldAlert,
  Network,
  Binary,
  Lock,
  Activity,
  Search,
  Layers,
  Code2,
  Rocket,
  Globe,
} from 'lucide-react';
import { GitHubIcon, LinkedInIcon } from '../../components/SocialIcons.jsx';
import { useLanguage } from '../../hooks/useLanguage';
import { useTheme } from '../../hooks/useTheme';
import { projects } from '../../data/projects';
import AOS from 'aos';
import 'aos/dist/aos.css';

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const MATRIX_CHARS = '01<>[]{}#$%ABCDEFGHIJKLMNOPQRSTUVWXYZNGETMEAS*+/=';

const protocolVectors = [
  {
    icon: Network,
    code: 'SEC-01',
    badge: 'CORE DIRECTIVE',
    title: 'FULL-STACK DISTRIBUTED ARCHITECTURE',
    desc: 'Engineering resilient, scalable single-page interfaces and API gateways. Specialized in decoupled frontend architectures and reactive client stores.',
  },
  {
    icon: Binary,
    code: 'SEC-02',
    badge: 'ZERO TRUST',
    title: 'API HARDENING & CRYPTO INTEGRITY',
    desc: 'Building guarded REST endpoints, rate-limited tokens, cryptographic auth handshakes, and hardened middleware validation logic.',
  },
  {
    icon: ShieldAlert,
    code: 'SEC-03',
    badge: 'OPTIMIZATION',
    title: 'DATABASE SCHEMAS & HIGH-CONCURRENCY',
    desc: 'Structuring normalized relational schemas, query index tuning, caching fallbacks, and transactional database integrity guarantees.',
  },
];

const techArsenal = [
  { name: 'React 19', port: ':3000', layer: 'FRONTEND', status: 'ACTIVE' },
  { name: 'TypeScript', port: ':COMPILER', layer: 'RUNTIME', status: 'SYNCHRONIZED' },
  { name: 'Laravel 11', port: ':8000', layer: 'BACKEND', status: 'DAEMON_UP' },
  { name: 'Node.js', port: ':5000', layer: 'RUNTIME', status: 'LISTENING' },
  { name: 'PostgreSQL', port: ':5432', layer: 'PERSISTENCE', status: 'CONNECTED' },
  { name: 'Redis Cache', port: ':6379', layer: 'IN-MEMORY', status: 'BOUND' },
  { name: 'Tailwind CSS', port: ':JIT', layer: 'STYLESHEET', status: 'INJECTED' },
  { name: 'Docker / CI', port: ':DAEMON', layer: 'CONTAINER', status: 'COMPOSED' },
];

const terminalLogs = [
  { command: 'whoami', output: 'NGET MEAS [root@sec-gateway]' },
  { command: 'cat /etc/security/roles.conf', output: 'Full Stack Developer // Cyber-Style UI Engineer' },
  { command: 'netstat -tulpn | grep 443', output: 'tcp 0 0 0.0.0.0:443 LISTEN ESTABLISHED' },
  { command: 'iptables -L --line-numbers', output: 'CHAIN: INCOMING_COMMISSIONS [STATE: ACCEPT]' },
  { command: 'systemctl check portfolio.service', output: 'STATUS: ACTIVE (RUNNING) :: ZERO_FAILURES' },
  { command: 'curl -sS api/status | jq .', output: '{"uptime":"99.98%","ready_for":["work","commissions"]}' },
  { command: 'echo $READY', output: 'OPEN_TO_FREELANCE_AND_FULL_TIME_ROLES' },
];

const MARQUEE_ITEMS = [
  'FULL_STACK_DEVELOPER',
  'API_ENGINEER',
  'CYBER_UI_DESIGNER',
  'DATABASE_ARCHITECT',
  'REACT // LARAVEL // NODE',
  'OPEN_TO_WORK',
  'PHNOM_PENH',
  'DOCKER // CI_CD',
];

/* ------------------------------------------------------------------ */
/*  ANIMATION HELPERS                                                  */
/* ------------------------------------------------------------------ */

function MatrixRain({ isDark }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = canvas.parentElement ? canvas.parentElement.offsetWidth : window.innerWidth;
      canvas.height = canvas.parentElement ? canvas.parentElement.offsetHeight : window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array.from({ length: columns }, () => Math.random() * -120);

    let animId;
    const draw = () => {
      ctx.fillStyle = isDark ? 'rgba(3, 5, 4, 0.16)' : 'rgba(244, 247, 245, 0.22)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.fillStyle = isDark
          ? `rgba(16, 185, 129, ${0.14 + Math.random() * 0.18})`
          : `rgba(5, 150, 105, ${0.08 + Math.random() * 0.08})`;
        ctx.fillText(char, x, y);

        if (y > canvas.height && Math.random() > 0.976) drops[i] = 0;
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

  return <canvas ref={canvasRef} className="matrix-rain opacity-50" aria-hidden="true" />;
}

function useRotatingRole(roleText, { typeSpeed = 45, hold = 2200, transition = 220 } = {}) {
  const lines = useMemo(() => (roleText ? roleText.split('\n') : []), [roleText]);
  const [index, setIndex] = useState(0);
  const [typed, setTyped] = useState('');
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!lines.length) return;
    const current = lines[index % lines.length];
    let typing;
    let timer;
    let x = 0;

    typing = setInterval(() => {
      x += 1;
      setTyped(current.slice(0, x));
      if (x >= current.length) {
        clearInterval(typing);
        timer = setTimeout(() => {
          setVisible(false);
          timer = setTimeout(() => {
            setIndex((i) => (i + 1) % lines.length);
            setTyped('');
            setVisible(true);
          }, transition);
        }, hold);
      }
    }, typeSpeed);

    return () => {
      clearInterval(typing);
      clearTimeout(timer);
    };
  }, [lines, index, typeSpeed, hold, transition]);

  return { typed, visible };
}

function useTerminalTyping(lines) {
  const [shown, setShown] = useState([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [showOutput, setShowOutput] = useState(false);

  useEffect(() => {
    if (currentLine >= lines.length) return;
    const line = lines[currentLine];

    if (!showOutput) {
      if (currentChar < line.command.length) {
        const t1 = setTimeout(() => {
          setShown((prev) => {
            const next = [...prev];
            if (next[currentLine]) {
              next[currentLine] = { ...next[currentLine], command: line.command.slice(0, currentChar + 1) };
            } else {
              next[currentLine] = { command: line.command.slice(0, currentChar + 1), output: '' };
            }
            return next;
          });
          setCurrentChar((c) => c + 1);
        }, 26);
        return () => clearTimeout(t1);
      }
      const t2 = setTimeout(() => setShowOutput(true), 120);
      return () => clearTimeout(t2);
    }

    const t3 = setTimeout(() => {
      setShown((prev) => {
        const next = [...prev];
        if (next[currentLine]) next[currentLine] = { ...next[currentLine], output: line.output };
        return next;
      });
    }, 0);
    const t4 = setTimeout(() => {
      setShowOutput(false);
      setCurrentChar(0);
      setCurrentLine((l) => l + 1);
    }, 170);
    return () => {
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [currentLine, currentChar, showOutput, lines]);

  return { shown, done: currentLine >= lines.length };
}

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */

export default function Home() {
  const { t, language } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const featuredProjects = projects.filter((p) => p.featured).slice(0, 3);
  const nameParts = t.hero.name.split(' ');
  const role = useRotatingRole(t.hero.role);
  const { shown: terminalShown, done: terminalDone } = useTerminalTyping(terminalLogs);

  useEffect(() => {
    if (!document.documentElement.classList.contains('aos-init')) {
      AOS.init({ duration: 800, easing: 'ease-out-cubic', once: true, offset: 60 });
    }
  }, []);

  const container = 'mx-auto w-full max-w-[1600px] px-4 sm:px-8 md:px-14 lg:px-20 xl:px-28';

  return (
    <section
      className={`grid-bg grid-pattern relative min-h-screen overflow-hidden pt-28 lg:pt-36 pb-24 font-mono transition-colors duration-300 ${
        isDark
          ? 'bg-[#030504] text-emerald-400 selection:bg-emerald-500 selection:text-black'
          : 'bg-[#f4f7f5] text-slate-900 selection:bg-emerald-600 selection:text-white'
      }`}
    >
      {/* ============================================================ */}
      {/* GLOBAL BACKGROUND LAYERS                                      */}
      {/* ============================================================ */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div
          className="absolute -left-24 top-24 h-[420px] w-[420px] rounded-full blur-[110px] animate-blob"
          style={{
            background: isDark
              ? 'radial-gradient(circle, rgba(16,185,129,0.14) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute right-0 top-1/3 h-96 w-96 rounded-full blur-3xl animate-blob"
          style={{
            background: isDark
              ? 'radial-gradient(circle, rgba(20,184,166,0.10) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(20,184,166,0.10) 0%, transparent 70%)',
            animationDelay: '2.4s',
          }}
        />
        <div className={`absolute inset-0 scanline ${isDark ? 'opacity-40' : 'opacity-20'}`} />
      </div>

      {/* ============================================================ */}
      {/* HERO                                                            */}
      {/* ============================================================ */}
      <section className="relative">
        <MatrixRain isDark={isDark} />

        <div className={`relative z-10 ${container}`}>
          <div className="grid items-center gap-12 lg:grid-cols-12 xl:gap-16">
            {/* ---------- LEFT COLUMN ---------- */}
            <div data-aos="fade-right" className="lg:col-span-7 flex flex-col space-y-6 sm:space-y-8">
              {/* BADGES */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <span
                  className={`inline-flex items-center gap-2 border px-3 py-1.5 text-xs font-bold rounded ${
                    isDark
                      ? 'border-emerald-400/50 bg-emerald-950/60 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.25)]'
                      : 'border-emerald-600/40 bg-emerald-100/80 text-emerald-900'
                  }`}
                >
                  <Lock className={`h-3.5 w-3.5 ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`} />
                  <span className="tracking-wider">// NODE://INIT_OK</span>
                </span>
                <span
                  className={`border px-2.5 py-1 text-[10px] sm:text-[11px] font-bold rounded ${
                    isDark
                      ? 'border-emerald-700/60 bg-emerald-950/30 text-emerald-300'
                      : 'border-emerald-300 bg-white text-emerald-800 shadow-xs'
                  }`}
                >
                  PORT: 443 [OPEN]
                </span>
                <span
                  className={`border px-2.5 py-1 text-[10px] sm:text-[11px] font-bold rounded ${
                    isDark
                      ? 'border-emerald-700/60 bg-emerald-950/30 text-emerald-300'
                      : 'border-emerald-300 bg-white text-emerald-800 shadow-xs'
                  }`}
                >
                  <Activity className="mr-1 inline h-2.5 w-2.5 animate-pulse text-emerald-400" />
                  ENCRYPTION: HARDENED
                </span>
              </div>

              {/* NAME */}
              <div className="space-y-3 sm:space-y-4">
                <h1
                  className={`text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight leading-[1.05] break-words ${
                    isDark ? 'text-white [text-shadow:0_0_30px_rgba(52,211,153,0.25)]' : 'text-slate-900'
                  }`}
                >
                  {'<'}
                  <span className={isDark ? 'text-emerald-400 drop-shadow-[0_0_30px_rgba(52,211,153,0.6)]' : 'text-emerald-700'}>
                    {nameParts[0]}
                  </span>
                  <span className={isDark ? 'opacity-70' : 'text-slate-500'}>{nameParts.slice(1).join(' ')}</span>
                  {'/>'}
                </h1>

                {/* ROTATING ROLE */}
                <div className={`space-y-1.5 text-base sm:text-xl md:text-2xl ${isDark ? 'text-emerald-300 font-bold' : 'text-emerald-800 font-bold'}`}>
                  <div className={`flex items-center gap-2 ${isDark ? 'text-emerald-500' : 'text-emerald-700'}`}>
                    root@mesh:~#
                    <span
                      className={`inline-block h-5 sm:h-6 w-2.5 animate-pulse ${
                        isDark ? 'bg-emerald-400 shadow-[0_0_10px_#10b981]' : 'bg-emerald-700'
                      }`}
                    />
                  </div>
                  <div
                    className={`inline-block min-h-[1.4em] transition-all duration-300 ${
                      role.visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                    }`}
                  >
                    {role.typed}
                  </div>
                </div>
              </div>

              {/* BIO */}
              <p
                className={`max-w-2xl text-sm sm:text-base md:text-lg leading-relaxed border-l-4 pl-4 sm:pl-6 py-3 rounded-r-xl ${
                  isDark
                    ? 'text-slate-100 border-emerald-400 bg-emerald-950/30'
                    : 'text-slate-800 border-emerald-600 bg-emerald-50/80 shadow-xs'
                }`}
              >
                {t.hero.description1}{' '}
                <span className={isDark ? 'text-emerald-300' : 'text-emerald-700'}>{t.hero.description2}</span>
              </p>

              {/* ACTIONS & SOCIALS */}
              <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 pt-2">
                <a
                  href="/CV_NgetMeas.pdf"
                  download="CV_NgetMeas.pdf"
                  className={`inline-flex items-center justify-center gap-3 px-6 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl transition-all shadow-md text-center ${
                    isDark
                      ? 'bg-emerald-400 text-black font-black hover:bg-emerald-300 hover:shadow-[0_0_25px_rgba(52,211,153,0.6)]'
                      : 'bg-emerald-600 text-white hover:bg-emerald-700'
                  }`}
                >
                  <Download className="h-4 w-4 shrink-0" />
                  {t.hero.downloadCV}
                </a>

                <Link
                  to="/projects"
                  className={`inline-flex items-center justify-center gap-3 border-2 px-6 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl transition-all text-center ${
                    isDark
                      ? 'border-emerald-400/60 bg-emerald-950/30 text-emerald-300 hover:border-emerald-300 hover:bg-emerald-950/60'
                      : 'border-emerald-600 bg-white text-emerald-900 hover:border-emerald-700 hover:bg-emerald-50 shadow-xs'
                  }`}
                >
                  {t.hero.viewProjects}
                  <ArrowRight className="h-4 w-4 shrink-0" />
                </Link>

                <div className="flex items-center justify-center gap-2.5 pt-2 sm:pt-0">
                  <a
                    href="https://github.com/NgetMeas22"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex h-11 w-11 items-center justify-center rounded-xl border-2 transition-all ${
                      isDark
                        ? 'border-emerald-500/40 bg-black text-emerald-400 hover:border-emerald-300'
                        : 'border-emerald-300 bg-white text-emerald-800 hover:border-emerald-600 hover:bg-emerald-50 shadow-xs'
                    }`}
                    aria-label="GitHub"
                  >
                    <GitHubIcon size={18} />
                  </a>
                  <a
                    href="https://linkedin.com/in/nget-meas-6525bb3a6"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex h-11 w-11 items-center justify-center rounded-xl border-2 transition-all ${
                      isDark
                        ? 'border-emerald-500/40 bg-black text-emerald-400 hover:border-emerald-300'
                        : 'border-emerald-300 bg-white text-emerald-800 hover:border-emerald-600 hover:bg-emerald-50 shadow-xs'
                    }`}
                    aria-label="LinkedIn"
                  >
                    <LinkedInIcon size={18} />
                  </a>
                  <a
                    href="mailto:measm2519@gmail.com"
                    className={`flex h-11 w-11 items-center justify-center rounded-xl border-2 transition-all ${
                      isDark
                        ? 'border-emerald-500/40 bg-black text-emerald-400 hover:border-emerald-300'
                        : 'border-emerald-300 bg-white text-emerald-800 hover:border-emerald-600 hover:bg-emerald-50 shadow-xs'
                    }`}
                    aria-label="Email"
                  >
                    <Mail size={18} />
                  </a>
                </div>
              </div>
            </div>

            {/* ---------- RIGHT COLUMN: TERMINAL HUD ---------- */}
            <div data-aos="fade-left" className="lg:col-span-5 w-full">
              <div
                className={`relative rounded-2xl border-2 transition-all duration-200 overflow-hidden ${
                  isDark
                    ? 'border-emerald-400/60 bg-[#050b08] shadow-[0_0_35px_rgba(16,185,129,0.2)]'
                    : 'border-emerald-600/40 bg-white shadow-xl'
                }`}
              >
                <span className={`absolute top-2 left-2 h-3.5 w-3.5 border-t-2 border-l-2 ${isDark ? 'border-emerald-400' : 'border-emerald-700'}`} />
                <span className={`absolute top-2 right-2 h-3.5 w-3.5 border-t-2 border-r-2 ${isDark ? 'border-emerald-400' : 'border-emerald-700'}`} />
                <span className={`absolute bottom-2 left-2 h-3.5 w-3.5 border-b-2 border-l-2 ${isDark ? 'border-emerald-400' : 'border-emerald-700'}`} />
                <span className={`absolute bottom-2 right-2 h-3.5 w-3.5 border-b-2 border-r-2 ${isDark ? 'border-emerald-400' : 'border-emerald-700'}`} />

                {/* HEADER */}
                <div
                  className={`flex flex-wrap items-center justify-between border-b px-4 py-3 text-xs gap-2 ${
                    isDark
                      ? 'border-emerald-500/30 bg-emerald-950/60 text-slate-100'
                      : 'border-emerald-100 bg-emerald-50/90 text-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="flex gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                      <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
                    </span>
                    <TerminalIcon className={`h-4 w-4 ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`} />
                    <span className="font-bold tracking-wider truncate">BASH_PORTAL_SESSION.sh</span>
                  </div>
                  <span
                    className={`flex items-center gap-1.5 text-[10px] font-bold border px-2 py-0.5 rounded ${
                      isDark
                        ? 'text-emerald-300 bg-emerald-950 border-emerald-500/50'
                        : 'text-emerald-800 bg-white border-emerald-300'
                    }`}
                  >
                    <Activity className="h-3 w-3 animate-spin text-emerald-400" /> ACTIVE
                  </span>
                </div>

                {/* BUFFER */}
                <div className="min-h-[280px] sm:min-h-[340px] p-4 sm:p-5 space-y-3 text-xs sm:text-sm leading-relaxed overflow-y-auto">
                  <p className={isDark ? 'text-emerald-400/80 font-bold' : 'text-emerald-700 font-semibold'}>
                    // Remote handshake negotiated. Cipher: ECDHE-RSA-AES128-GCM-SHA256
                  </p>

                  {terminalShown.map((line, idx) => (
                    <div key={idx} className="space-y-1">
                      <p className={`break-all ${isDark ? 'text-white font-semibold' : 'text-slate-900 font-semibold'}`}>
                        <span className={`font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>
                          root@sec-gateway:~#
                        </span>{' '}
                        {line.command}
                      </p>
                      {line.output && (
                        <p
                          className={`pl-3 border-l-2 break-all text-xs ${
                            isDark
                              ? 'text-emerald-300 border-emerald-400 bg-emerald-950/20 py-1'
                              : 'text-emerald-900 border-emerald-600 bg-emerald-50/70 py-1 font-semibold'
                          }`}
                        >
                          {line.output}
                        </p>
                      )}
                    </div>
                  ))}

                  {!terminalDone ? (
                    <span className={`inline-block h-4 w-2 animate-pulse ${isDark ? 'bg-emerald-400 shadow-[0_0_8px_#10b981]' : 'bg-emerald-700'}`} />
                  ) : (
                    <p className={`pt-2 border-t text-xs ${isDark ? 'text-emerald-400 border-emerald-900/60' : 'text-emerald-700 border-emerald-100'}`}>
                      root@sec-gateway:~#{' '}
                      <span className={`inline-block h-4 w-2 animate-pulse ${isDark ? 'bg-emerald-400' : 'bg-emerald-700'}`} />
                    </p>
                  )}
                </div>

                {/* STATUS BAR */}
                <div
                  className={`grid grid-cols-2 sm:grid-cols-4 border-t px-4 py-2.5 text-[10px] sm:text-[11px] font-bold gap-2 ${
                    isDark
                      ? 'border-emerald-500/30 bg-emerald-950/40 text-emerald-400'
                      : 'border-emerald-100 bg-emerald-50 text-emerald-800'
                  }`}
                >
                  <div>SOCK: <span className={isDark ? 'text-white' : 'text-slate-900'}>0x88F</span></div>
                  <div>PKTS: <span className={isDark ? 'text-white' : 'text-slate-900'}>204,112</span></div>
                  <div>PORT: <span className={isDark ? 'text-white' : 'text-slate-900'}>443/TLS</span></div>
                  <div className={`text-right font-black ${isDark ? 'text-emerald-300' : 'text-emerald-700'}`}>READY</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* MARQUEE TICKER                                                 */}
      {/* ============================================================ */}
      <div
        className={`relative z-10 mt-16 border-y overflow-hidden ${
          isDark ? 'border-emerald-500/30 bg-black/70' : 'border-emerald-900/10 bg-white/80'
        }`}
      >
        <div className="home-marquee flex w-max whitespace-nowrap py-3">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 items-center">
              {MARQUEE_ITEMS.map((item) => (
                <span
                  key={`${copy}-${item}`}
                  className={`mx-6 flex items-center gap-4 text-xs sm:text-sm font-bold uppercase tracking-widest ${
                    isDark ? 'text-emerald-400/80' : 'text-emerald-800'
                  }`}
                >
                  {item}
                  <Binary className={`h-3.5 w-3.5 ${isDark ? 'text-emerald-600' : 'text-emerald-500'}`} />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ============================================================ */}
      {/* OPERATIONAL CAPABILITIES                                       */}
      {/* ============================================================ */}
      <section className="relative z-10 py-16 sm:py-24">
        <div className={container}>
          <div className="mb-10 sm:mb-14" data-aos="fade-up">
            <span className={`text-xs uppercase tracking-widest font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>
              // SECTION: OPERATIONAL_PROFILES
            </span>
            <h2 className={`text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight mt-1.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              SYSTEM_CAPABILITIES
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {protocolVectors.map((vector, i) => (
              <div
                key={vector.code}
                data-aos="fade-up"
                data-aos-delay={i * 100}
                className={`relative border-2 rounded-2xl p-6 sm:p-8 transition-all duration-200 group ${
                  isDark
                    ? 'border-emerald-800/60 bg-emerald-950/20 hover:border-emerald-400'
                    : 'border-emerald-200 bg-white hover:border-emerald-500 shadow-xs'
                }`}
              >
                <span
                  className={`absolute top-3 right-3 h-2 w-2 rounded-full animate-pulse ${
                    isDark ? 'bg-emerald-400 shadow-[0_0_10px_#10b981]' : 'bg-emerald-600'
                  }`}
                />
                <div className="flex items-center justify-between text-xs mb-5">
                  <span
                    className={`border px-2.5 py-1 font-bold rounded ${
                      isDark
                        ? 'border-emerald-500/50 bg-black text-emerald-300'
                        : 'border-emerald-300 bg-emerald-50 text-emerald-800'
                    }`}
                  >
                    {vector.code}
                  </span>
                  <span
                    className={`text-[10px] uppercase border px-2 py-0.5 font-bold rounded ${
                      isDark ? 'border-emerald-700/60 text-emerald-400' : 'border-emerald-200 text-emerald-700'
                    }`}
                  >
                    {vector.badge}
                  </span>
                </div>
                <div className="flex items-center gap-3 mb-2.5">
                  <span
                    className={`p-2.5 rounded-lg border ${
                      isDark
                        ? 'border-emerald-400/50 bg-emerald-950/60 text-emerald-300'
                        : 'border-emerald-300 bg-emerald-50 text-emerald-700'
                    }`}
                  >
                    <vector.icon className="h-5 w-5" />
                  </span>
                  <h3 className={`text-base sm:text-lg font-black uppercase tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {vector.title}
                  </h3>
                </div>
                <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  {vector.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* TECH ARSENAL MATRIX                                             */}
      {/* ============================================================ */}
      <section
        className={`relative z-10 border-t py-16 sm:py-20 ${
          isDark ? 'border-emerald-500/30 bg-black/70' : 'border-emerald-900/10 bg-white/80'
        }`}
      >
        <div className={container}>
          <div className="mb-10 sm:mb-12 text-center" data-aos="fade-up">
            <span className={`text-xs uppercase tracking-widest font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>
              // DAEMONS & NETWORK RUNTIMES
            </span>
            <h2 className={`text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight mt-1.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              DEPLOYED_TECH_ARSENAL
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {techArsenal.map((tech, i) => (
              <div
                key={tech.name}
                data-aos="fade-up"
                data-aos-delay={(i % 4) * 80}
                className={`border-2 rounded-xl p-5 transition-all duration-200 group ${
                  isDark
                    ? 'border-emerald-900/70 bg-black/90 hover:border-emerald-400'
                    : 'border-emerald-200 bg-white hover:border-emerald-500 shadow-xs'
                }`}
              >
                <div className={`flex items-center justify-between text-xs font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>
                  <span className="font-mono">{tech.port}</span>
                  <span
                    className={`text-[10px] border px-2 py-0.5 rounded font-bold ${
                      isDark
                        ? 'bg-emerald-950 border-emerald-500/50 text-emerald-300'
                        : 'bg-emerald-50 border-emerald-200 text-emerald-800'
                    }`}
                  >
                    {tech.layer}
                  </span>
                </div>
                <div className={`mt-3 text-lg font-black uppercase tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {tech.name}
                </div>
                <div
                  className={`mt-3 flex items-center justify-between text-[10px] sm:text-[11px] border-t pt-2.5 ${
                    isDark ? 'border-emerald-900/60 text-slate-400' : 'border-emerald-100 text-slate-500'
                  }`}
                >
                  <span className="font-mono">STATE</span>
                  <span className={`font-bold flex items-center gap-1.5 ${isDark ? 'text-emerald-300' : 'text-emerald-700'}`}>
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    {tech.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* WORKFLOW PIPELINE                                               */}
      {/* ============================================================ */}
      <section className="relative z-10 py-16 sm:py-24">
        <div className={container}>
          <div className="mb-10 sm:mb-14" data-aos="fade-up">
            <span className={`text-xs uppercase tracking-widest font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>
              // DEPLOYMENT_PIPELINE
            </span>
            <h2 className={`text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight mt-1.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              HOW_I_SHIP_PRODUCTS
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {[
              { code: '01', icon: Search, title: t.home.process01, desc: t.home.process01D },
              { code: '02', icon: Layers, title: t.home.process02, desc: t.home.process02D },
              { code: '03', icon: Code2, title: t.home.process03, desc: t.home.process03D },
              { code: '04', icon: Rocket, title: t.home.process04, desc: t.home.process04D },
            ].map((step, i) => (
              <div
                key={step.code}
                data-aos="fade-up"
                data-aos-delay={i * 100}
                className={`relative border-2 rounded-2xl p-6 transition-all duration-200 group ${
                  isDark
                    ? 'border-emerald-800/60 bg-emerald-950/20 hover:border-emerald-400'
                    : 'border-emerald-200 bg-white hover:border-emerald-500 shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`font-mono text-2xl font-black ${
                      isDark ? 'text-emerald-400/25' : 'text-emerald-700/20'
                    } group-hover:text-emerald-400 transition-colors`}
                  >
                    {step.code}
                  </span>
                  <span
                    className={`p-2.5 rounded-xl border ${
                      isDark
                        ? 'border-emerald-400/40 bg-black text-emerald-300'
                        : 'border-emerald-300 bg-emerald-50 text-emerald-700'
                    }`}
                  >
                    <step.icon className="h-5 w-5" />
                  </span>
                </div>
                <h3 className={`font-bold uppercase tracking-tight mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {step.title}
                </h3>
                <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* FEATURED PROJECTS                                               */}
      {/* ============================================================ */}
      <section
        className={`relative z-10 border-t py-16 sm:py-24 ${
          isDark ? 'border-emerald-500/30 bg-black/70' : 'border-emerald-900/10 bg-white/80'
        }`}
      >
        <div className={container}>
          <div className="mb-10 sm:mb-12 flex flex-col justify-between gap-3 sm:flex-row sm:items-end" data-aos="fade-up">
            <div>
              <span className={`text-xs uppercase tracking-widest font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>
                // ACTIVE_DEPLOYMENTS
              </span>
              <h2 className={`text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight mt-1.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {t.projects.title}
              </h2>
            </div>
            <Link
              to="/projects"
              className={`text-xs sm:text-sm font-bold uppercase hover:underline flex items-center gap-1.5 ${
                isDark ? 'text-emerald-400' : 'text-emerald-700'
              }`}
            >
              INSPECT_ALL_REPOSITORIES <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {featuredProjects.map((project, idx) => (
              <article
                key={project.id}
                data-aos="fade-up"
                data-aos-delay={idx * 100}
                className={`border-2 rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-200 group ${
                  isDark
                    ? 'border-emerald-900/80 bg-black/90 hover:border-emerald-400'
                    : 'border-emerald-200 bg-white hover:border-emerald-600 shadow-xs'
                }`}
              >
                <div>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {project.category.map((cat) => (
                      <span
                        key={cat}
                        className={`text-[9px] sm:text-[10px] border px-2 py-0.5 font-bold rounded ${
                          isDark
                            ? 'bg-emerald-950/60 text-emerald-300 border-emerald-700/60'
                            : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                        }`}
                      >
                        {cat}
                      </span>
                    ))}
                  </div>

                  <h3
                    className={`text-base sm:text-lg font-black mb-2.5 transition-colors uppercase tracking-tight ${
                      isDark ? 'text-white group-hover:text-emerald-400' : 'text-slate-900 group-hover:text-emerald-700'
                    }`}
                  >
                    {project.title}
                  </h3>

                  <p className={`text-xs sm:text-sm line-clamp-3 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    {language === 'kh' ? project.descriptionKh : project.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className={`text-[10px] font-mono border px-1.5 py-0.5 rounded ${
                          isDark
                            ? 'text-emerald-400 border-emerald-800/80 bg-black'
                            : 'text-emerald-700 border-emerald-100 bg-emerald-50/50'
                        }`}
                      >
                        #{tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div
                  className={`mt-6 pt-4 border-t flex items-center justify-between text-xs ${
                    isDark ? 'border-emerald-900/60' : 'border-emerald-100'
                  }`}
                >
                  <Link
                    to={`/projects/${project.id}`}
                    className={`font-bold hover:underline flex items-center gap-1 ${
                      isDark ? 'text-emerald-400' : 'text-emerald-700'
                    }`}
                  >
                    {t.projects.viewDetails} →
                  </Link>

                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`hover:underline flex items-center gap-1 ${
                        isDark ? 'text-slate-300 hover:text-emerald-400' : 'text-slate-600 hover:text-emerald-700 font-semibold'
                      }`}
                    >
                      <ExternalLink className="h-3 w-3" /> LIVE_HOST
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* CONTACT CTA                                                      */}
      {/* ============================================================ */}
      <section className="relative z-10 py-16 sm:py-28">
        <div className={`${container} relative`}>
          <div
            className={`absolute inset-0 matrix-rain-grid rounded-3xl opacity-40 ${
              isDark ? 'bg-black/40' : 'bg-white/50'
            }`}
            aria-hidden="true"
          />

          <div className="relative z-10 text-center" data-aos="fade-up">
            <span
              className={`inline-flex items-center gap-2 border px-3.5 py-1 text-xs uppercase tracking-wider font-bold rounded ${
                isDark
                  ? 'border-emerald-500/40 bg-emerald-950/40 text-emerald-300'
                  : 'border-emerald-600/30 bg-emerald-100/60 text-emerald-900'
              }`}
            >
              <Globe className="h-3.5 w-3.5" />
              {'>_ open.channel'}
            </span>

            <h2 className={`text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight mt-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {t.home.ctaTitle}
            </h2>
            <p className={`mx-auto mt-4 max-w-2xl text-base sm:text-lg leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              {t.home.ctaSubtitle}
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href="mailto:measm2519@gmail.com"
                className={`inline-flex items-center justify-center gap-3 px-6 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl transition-all shadow-md ${
                  isDark
                    ? 'bg-emerald-400 text-black font-black hover:bg-emerald-300 hover:shadow-[0_0_25px_rgba(52,211,153,0.6)]'
                    : 'bg-emerald-600 text-white hover:bg-emerald-700'
                }`}
              >
                <Mail className="h-4 w-4 shrink-0" />
                {t.home.emailMe}
              </a>
              <Link
                to="/contact"
                className={`inline-flex items-center justify-center gap-3 border-2 px-6 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl transition-all ${
                  isDark
                    ? 'border-emerald-400/60 bg-emerald-950/30 text-emerald-300 hover:border-emerald-300 hover:bg-emerald-950/60'
                    : 'border-emerald-600 bg-white text-emerald-900 hover:border-emerald-700 hover:bg-emerald-50 shadow-xs'
                }`}
              >
                {t.home.contactPage}
                <ArrowRight className="h-4 w-4 shrink-0" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* __SECTIONS_3__ */}

      <style>{`
        .home-marquee {
          animation: homeMarquee 26s linear infinite;
        }
        @keyframes homeMarquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}