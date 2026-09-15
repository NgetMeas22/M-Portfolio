import { useState, useEffect } from 'react';
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
  Radio,
  Lock,
  Activity,
  Cpu,
  Server,
  Zap,
  CheckCircle2,
  HardDrive
} from 'lucide-react';
import { GitHubIcon, LinkedInIcon } from '../../components/SocialIcons.jsx';
import { useLanguage } from '../../hooks/useLanguage';
import { useTheme } from '../../hooks/useTheme';
import { projects } from '../../data/projects';
import AOS from 'aos';
import 'aos/dist/aos.css';

const telemetryFeeds = [
  { label: 'NODE_LOC', value: 'Phnom Penh, KH [11.55°N, 104.92°E]' },
  { label: 'KERNEL', value: 'Linux 6.8.0-kali-amd64' },
  { label: 'LATENCY', value: '18ms [PROD_GATEWAY]' },
  { label: 'ACCESS_LVL', value: 'ROOT_UID_00' },
];

const systemStats = [
  { icon: Cpu, label: 'CPU CORE', value: '8x vCPU @ 3.8GHz', stat: '4.2% LOAD' },
  { icon: HardDrive, label: 'MEMORY POOL', value: '32GB ECC DDR5', stat: '2.8GB IN-USE' },
  { icon: Server, label: 'SOCKETS ACTIVE', value: '24 PROTOCOLS', stat: 'ESTABLISHED' },
  { icon: Zap, label: 'AVAILABILITY', value: '99.98% UPTIME', stat: 'OPTIMAL' },
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

const terminalLogs = [
  { command: 'whoami', output: 'NGET MEAS [root@sec-gateway]' },
  { command: 'cat /etc/security/roles.conf', output: 'Full Stack Architect // Cyber Systems Developer' },
  { command: 'netstat -tulpn | grep 443', output: 'tcp 0 0 0.0.0.0:443 LISTEN ESTABLISHED' },
  { command: 'iptables -L --line-numbers', output: 'CHAIN: INCOMING_COMMISSIONS [STATE: ACCEPT]' },
  { command: 'systemctl check production.service', output: 'STATUS: ACTIVE (RUNNING) :: ZERO_FAILURES' },
  { command: 'echo $STATUS', output: 'READY_FOR_COMMISSIONS_AND_EMPLOYMENT' },
];

const HEX_STREAM = [
  '0x7F', '0x45', '0x4C', '0x46', '0x02', '0x01', '0x01', '0x00',
  '0xFF', '0x1A', '0x2B', '0x3C', '0x88', '0x99', '0xAA', '0xDE',
  '0xC0', '0xDE', '0x55', '0x21', '0x09', '0x9B', '0xF4', '0xA1'
];

export default function Home() {
  const { t, language } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const nameParts = t.hero.name.split(' ');
  const featuredProjects = projects.filter(project => project.featured).slice(0, 3);

  const [displayedLines, setDisplayedLines] = useState([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [showOutput, setShowOutput] = useState(false);
  const [typingComplete, setTypingComplete] = useState(false);
  const [roleText, setRoleText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  // Terminal Typing Emulation
  useEffect(() => {
    if (currentLine >= terminalLogs.length) {
      const timer = setTimeout(() => setTypingComplete(true), 0);
      return () => clearTimeout(timer);
    }

    const line = terminalLogs[currentLine];

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
        }, 30);
        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => setShowOutput(true), 150);
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
      }, 100);
      return () => {
        clearTimeout(outputTimer);
        clearTimeout(timer);
      };
    }
  }, [currentLine, currentChar, showOutput]);

  // Cypher Role Rotating Hook
  useEffect(() => {
    const roles = [
      'FULL_STACK_ARCHITECT',
      'CYBER_DEFENSE_UI_ENGINEER',
      'API_SYSTEMS_SPECIALIST',
      'HIGH_THROUGHPUT_DEVELOPER'
    ];
    const current = roles[roleIndex % roles.length];

    if (deleting && roleText.length === 0) {
      const timer = setTimeout(() => {
        setRoleIndex(i => i + 1);
        setDeleting(false);
      }, 350);
      return () => clearTimeout(timer);
    }

    if (!deleting && roleText.length === current.length) {
      const timer = setTimeout(() => setDeleting(true), 1800);
      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => {
      setRoleText(
        deleting
          ? current.slice(0, roleText.length - 1)
          : current.slice(0, roleText.length + 1)
      );
    }, deleting ? 20 : 50);
    return () => clearTimeout(timer);
  }, [roleText, deleting, roleIndex]);

  return (
    <div
      className={`relative min-h-screen font-mono transition-colors duration-300 overflow-x-hidden ${
        isDark 
          ? 'bg-[#030504] text-emerald-400 selection:bg-emerald-500 selection:text-black' 
          : 'bg-[#f4f7f5] text-emerald-950 selection:bg-emerald-600 selection:text-white'
      }`}
    >
      {/* CRT SCANLINE & VIGNETTE LAYER - Active only in Dark Mode */}
      {isDark && (
        <>
          <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden opacity-20 scanline-overlay" />
          <div className="pointer-events-none fixed inset-0 z-40 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(2,4,3,0.95)_100%)]" />
        </>
      )}

      {/* TOP TELEMETRY BAR WITH EXTRA VERTICAL PADDING */}
      <header
        className={`border-b transition-colors duration-200 px-4 sm:px-8 py-3 text-[11px] sm:text-xs uppercase tracking-wider ${
          isDark 
            ? 'border-emerald-500/20 bg-black/90 backdrop-blur-md text-emerald-500/80' 
            : 'border-emerald-700/15 bg-white/95 backdrop-blur-md text-emerald-800'
        }`}
      >
        <div className="mx-auto flex max-w-[1700px] items-center justify-between gap-4">
          <div className="flex items-center gap-2 whitespace-nowrap">
            <Radio className={`h-3.5 w-3.5 animate-pulse ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
            <span className={isDark ? 'text-emerald-600 font-bold' : 'text-emerald-700 font-bold'}>STATUS:</span>
            <span className={`font-bold tracking-widest ${isDark ? 'text-white' : 'text-slate-900'}`}>
              TLS_AES_256_ACTIVE
            </span>
          </div>
          
          <div className="flex items-center gap-4 sm:gap-8 overflow-x-auto no-scrollbar whitespace-nowrap text-[10px] sm:text-xs">
            {telemetryFeeds.map((feed, idx) => (
              <div key={idx} className={`border-l pl-3 ${isDark ? 'border-emerald-950' : 'border-emerald-200'}`}>
                <span className={`font-bold ${isDark ? 'text-emerald-700' : 'text-emerald-600'}`}>{feed.label}: </span>
                <span className={isDark ? 'text-slate-300' : 'text-slate-700 font-medium'}>{feed.value}</span>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* HERO SECTION WITH GENEROUS TOP & BOTTOM SPACING */}
      <section className="relative px-4 sm:px-8 lg:px-12 pt-28 pb-20 sm:pt-32 sm:pb-28 lg:pt-36 lg:pb-32">
        <div className="mx-auto w-full max-w-[1700px]">
          <div className="grid items-center gap-12 lg:grid-cols-12 xl:gap-16">

            {/* LEFT COLUMN: HERO CONTENT */}
            <div data-aos="fade-right" className="lg:col-span-7 flex flex-col space-y-7 sm:space-y-9">
              
              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                <div
                  className={`inline-flex items-center gap-2 border px-3.5 py-1.5 text-xs font-bold ${
                    isDark 
                      ? 'border-emerald-500/40 bg-emerald-950/40 text-emerald-300' 
                      : 'border-emerald-600/40 bg-emerald-100/60 text-emerald-900'
                  }`}
                >
                  <Lock className={`h-3.5 w-3.5 ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`} />
                  <span className="tracking-wider">// NODE://INIT_OK</span>
                </div>
                <span
                  className={`border px-3 py-1 text-[11px] font-semibold ${
                    isDark 
                      ? 'border-emerald-900/80 bg-black/60 text-emerald-500' 
                      : 'border-emerald-200 bg-white text-emerald-800'
                  }`}
                >
                  PORT: 443 [OPEN]
                </span>
                <span
                  className={`border px-3 py-1 text-[11px] font-semibold ${
                    isDark 
                      ? 'border-emerald-900/80 bg-black/60 text-emerald-500' 
                      : 'border-emerald-200 bg-white text-emerald-800'
                  }`}
                >
                  ENCRYPTION: HARDENED
                </span>
              </div>

              <div className="space-y-4">
                <h1 className="text-4xl sm:text-6xl md:text-7xl xl:text-8xl font-black uppercase tracking-tight leading-[1.05]">
                  <span className={isDark ? 'text-slate-500' : 'text-slate-400'}>{nameParts[0]}</span>{' '}
                  <span
                    className={`glitch-text ${
                      isDark 
                        ? 'text-emerald-400 drop-shadow-[0_0_30px_rgba(16,185,129,0.7)]' 
                        : 'text-emerald-700 drop-shadow-[0_0_15px_rgba(4,120,87,0.25)]'
                    }`}
                  >
                    {nameParts.slice(1).join(' ')}
                  </span>
                </h1>

                <div
                  className={`flex flex-wrap items-center gap-2.5 text-lg sm:text-2xl md:text-3xl pt-1 ${
                    isDark ? 'text-emerald-300' : 'text-emerald-800'
                  }`}
                >
                  <span className={`font-bold ${isDark ? 'text-emerald-600' : 'text-emerald-700'}`}>root@mesh:~#</span>
                  <span className="underline decoration-emerald-500/50">{roleText}</span>
                  <span className={`inline-block w-3 h-6 animate-pulse ${isDark ? 'bg-emerald-400' : 'bg-emerald-700'}`} />
                </div>
              </div>

              <p
                className={`max-w-2xl text-base sm:text-lg md:text-xl leading-relaxed border-l-4 pl-5 sm:pl-7 py-3.5 ${
                  isDark 
                    ? 'text-slate-300 border-emerald-500/80 bg-emerald-950/20' 
                    : 'text-slate-700 border-emerald-600 bg-emerald-50/80'
                }`}
              >
                Constructing hardened, full-stack digital assets. Focusing on fault-tolerant backend infrastructures, resilient state distribution, and defensive web software engineering.
              </p>

              {/* HEX STREAM */}
              <div
                className={`flex flex-wrap gap-1.5 sm:gap-2 text-[10px] sm:text-xs select-none ${
                  isDark ? 'text-emerald-600/80' : 'text-emerald-800/80'
                }`}
              >
                {HEX_STREAM.map((hex, i) => (
                  <span
                    key={i}
                    className={`px-2 py-0.5 border transition-colors ${
                      isDark 
                        ? 'bg-black/80 border-emerald-950 hover:border-emerald-500' 
                        : 'bg-white border-emerald-200 hover:border-emerald-600 shadow-xs'
                    }`}
                  >
                    {hex}
                  </span>
                ))}
              </div>

              {/* ACTIONS & SOCIAL LINKS */}
              <div className="flex flex-wrap items-center gap-4 pt-3">
                <a
                  href="/CV_NgetMeas.pdf"
                  download="CV_NgetMeas.pdf"
                  className={`w-full sm:w-auto inline-flex items-center justify-center gap-3 px-7 py-4 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all ${
                    isDark
                      ? 'bg-emerald-500 text-black hover:bg-emerald-400 hover:shadow-[0_0_30px_rgba(16,185,129,0.6)]'
                      : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-md hover:shadow-lg'
                  }`}
                >
                  <Download className="h-4 w-4" />
                  EXEC_DOWNLOAD_CV
                </a>
                
                <Link
                  to="/projects"
                  className={`w-full sm:w-auto inline-flex items-center justify-center gap-3 border px-7 py-4 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all ${
                    isDark
                      ? 'border-emerald-500/60 bg-black/80 text-emerald-400 hover:border-emerald-300 hover:bg-emerald-950/40'
                      : 'border-emerald-600/50 bg-white text-emerald-900 hover:border-emerald-700 hover:bg-emerald-50 shadow-xs'
                  }`}
                >
                  AUDIT_ARCHIVES
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <div className="flex items-center gap-3 mt-2 sm:mt-0">
                  <a
                    href="https://github.com/NgetMeas22"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex h-12 w-12 items-center justify-center border transition-all ${
                      isDark
                        ? 'border-emerald-500/40 bg-black text-emerald-400 hover:border-emerald-400 hover:bg-emerald-950/50'
                        : 'border-emerald-300 bg-white text-emerald-800 hover:border-emerald-600 hover:bg-emerald-50 shadow-xs'
                    }`}
                    aria-label="GitHub"
                  >
                    <GitHubIcon size={20} />
                  </a>
                  <a
                    href="https://linkedin.com/in/nget-meas-6525bb3a6"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex h-12 w-12 items-center justify-center border transition-all ${
                      isDark
                        ? 'border-emerald-500/40 bg-black text-emerald-400 hover:border-emerald-400 hover:bg-emerald-950/50'
                        : 'border-emerald-300 bg-white text-emerald-800 hover:border-emerald-600 hover:bg-emerald-50 shadow-xs'
                    }`}
                    aria-label="LinkedIn"
                  >
                    <LinkedInIcon size={20} />
                  </a>
                  <a
                    href="mailto:measm2519@gmail.com"
                    className={`flex h-12 w-12 items-center justify-center border transition-all ${
                      isDark
                        ? 'border-emerald-500/40 bg-black text-emerald-400 hover:border-emerald-400 hover:bg-emerald-950/50'
                        : 'border-emerald-300 bg-white text-emerald-800 hover:border-emerald-600 hover:bg-emerald-50 shadow-xs'
                    }`}
                    aria-label="Email"
                  >
                    <Mail size={20} />
                  </a>
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN: TERMINAL HUD */}
            <div data-aos="fade-left" className="lg:col-span-5 w-full">
              <div
                className={`relative border-2 shadow-2xl transition-colors duration-200 ${
                  isDark 
                    ? 'border-emerald-500/50 bg-black shadow-[0_0_40px_rgba(16,185,129,0.2)]' 
                    : 'border-emerald-600/40 bg-white shadow-emerald-950/5'
                }`}
              >
                {/* HUD CORNER BRACKETS */}
                <span className={`absolute -top-1.5 -left-1.5 h-3 w-3 border-t-2 border-l-2 ${isDark ? 'border-emerald-400' : 'border-emerald-700'}`} />
                <span className={`absolute -top-1.5 -right-1.5 h-3 w-3 border-t-2 border-r-2 ${isDark ? 'border-emerald-400' : 'border-emerald-700'}`} />
                <span className={`absolute -bottom-1.5 -left-1.5 h-3 w-3 border-b-2 border-l-2 ${isDark ? 'border-emerald-400' : 'border-emerald-700'}`} />
                <span className={`absolute -bottom-1.5 -right-1.5 h-3 w-3 border-b-2 border-r-2 ${isDark ? 'border-emerald-400' : 'border-emerald-700'}`} />

                {/* TERMINAL HEADER */}
                <div
                  className={`flex items-center justify-between border-b px-4 py-3 text-xs ${
                    isDark 
                      ? 'border-emerald-900/80 bg-emerald-950/40 text-slate-200' 
                      : 'border-emerald-100 bg-emerald-50/70 text-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <TerminalIcon className={`h-4 w-4 ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`} />
                    <span className="font-bold">BASH_PORTAL_SESSION.sh</span>
                  </div>
                  <span
                    className={`flex items-center gap-1.5 text-[10px] font-bold border px-2 py-0.5 ${
                      isDark 
                        ? 'text-emerald-400 bg-emerald-950/70 border-emerald-500/30' 
                        : 'text-emerald-800 bg-white border-emerald-300'
                    }`}
                  >
                    <Activity className="h-3 w-3 animate-spin text-emerald-500" /> ACTIVE
                  </span>
                </div>

                {/* TERMINAL BUFFER VIEWPORT */}
                <div className="min-h-[320px] sm:min-h-[380px] p-5 sm:p-6 space-y-3.5 text-xs sm:text-sm leading-relaxed overflow-y-auto">
                  <p className={isDark ? 'text-emerald-700' : 'text-emerald-600/90'}>
                    // Remote handshake negotiated. Cipher: ECDHE-RSA-AES128-GCM-SHA256
                  </p>
                  
                  {displayedLines.map((line, idx) => (
                    <div key={idx} className="space-y-1">
                      <p className={isDark ? 'text-slate-200' : 'text-slate-800'}>
                        <span className={`font-bold ${isDark ? 'text-emerald-500' : 'text-emerald-700'}`}>root@sec-gateway:~#</span> {line.command}
                      </p>
                      {line.output && (
                        <p
                          className={`pl-4 border-l-2 font-mono ${
                            isDark 
                              ? 'text-emerald-400 border-emerald-500/40' 
                              : 'text-emerald-800 border-emerald-600/50 bg-emerald-50/50 py-0.5'
                          }`}
                        >
                          {line.output}
                        </p>
                      )}
                    </div>
                  ))}

                  {!typingComplete ? (
                    <span className={`inline-block h-4 w-2 animate-pulse ${isDark ? 'bg-emerald-400' : 'bg-emerald-700'}`} />
                  ) : (
                    <p className={`pt-2 border-t ${isDark ? 'text-emerald-600 border-emerald-950' : 'text-emerald-700 border-emerald-100'}`}>
                      root@sec-gateway:~# <span className={`inline-block h-4 w-2 animate-pulse ${isDark ? 'bg-emerald-400' : 'bg-emerald-700'}`} />
                    </p>
                  )}
                </div>

                {/* TERMINAL STATUS BAR */}
                <div
                  className={`grid grid-cols-2 sm:grid-cols-4 border-t px-4 py-2.5 text-[10px] font-semibold gap-2 ${
                    isDark 
                      ? 'border-emerald-900/80 bg-emerald-950/30 text-emerald-600' 
                      : 'border-emerald-100 bg-emerald-50 text-emerald-800'
                  }`}
                >
                  <div>SOCK: <span className={isDark ? 'text-emerald-400' : 'text-emerald-900 font-bold'}>0x88F</span></div>
                  <div>PKTS: <span className={isDark ? 'text-emerald-400' : 'text-emerald-900 font-bold'}>204,112</span></div>
                  <div>PORT: <span className={isDark ? 'text-emerald-400' : 'text-emerald-900 font-bold'}>443/TLS</span></div>
                  <div className={`sm:text-right font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>READY</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SYSTEM TELEMETRY / HARDWARE PANEL */}
      <section
        className={`border-y py-12 sm:py-16 ${
          isDark 
            ? 'border-emerald-500/20 bg-black/60' 
            : 'border-emerald-900/10 bg-white/90 shadow-xs'
        }`}
      >
        <div className="mx-auto w-full max-w-[1700px] px-4 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {systemStats.map((item, i) => (
              <div
                key={i}
                className={`border p-5 flex items-center gap-4 transition-all duration-200 ${
                  isDark 
                    ? 'border-emerald-950 bg-black/90 hover:border-emerald-500/50' 
                    : 'border-emerald-200/80 bg-emerald-50/40 hover:border-emerald-500 shadow-xs'
                }`}
              >
                <div
                  className={`p-3.5 border ${
                    isDark 
                      ? 'border-emerald-900 bg-emerald-950/40 text-emerald-400' 
                      : 'border-emerald-300 bg-white text-emerald-700 shadow-xs'
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <div className={`text-[10px] uppercase tracking-widest ${isDark ? 'text-emerald-600' : 'text-emerald-700'}`}>
                    {item.label}
                  </div>
                  <div className={`text-sm sm:text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {item.value}
                  </div>
                  <div className={`text-[11px] font-mono flex items-center gap-1.5 ${isDark ? 'text-emerald-400' : 'text-emerald-700 font-semibold'}`}>
                    <CheckCircle2 className="h-3 w-3" /> {item.stat}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OPERATIONAL CAPABILITIES */}
      <section className="py-20 sm:py-28 lg:py-32">
        <div className="mx-auto w-full max-w-[1700px] px-4 sm:px-8 lg:px-12">
          <div className="mb-12 sm:mb-16">
            <span className={`text-xs uppercase tracking-widest font-bold ${isDark ? 'text-emerald-600' : 'text-emerald-700'}`}>
              // SECTION: OPERATIONAL_PROFILES
            </span>
            <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight mt-1.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              SYSTEM_CAPABILITIES
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {protocolVectors.map((vector, i) => (
              <div
                key={i}
                data-aos="fade-up"
                data-aos-delay={i * 100}
                className={`relative border p-7 sm:p-9 transition-all duration-200 ${
                  isDark 
                    ? 'border-emerald-900/60 bg-emerald-950/10 hover:border-emerald-500 hover:bg-emerald-950/20' 
                    : 'border-emerald-200 bg-white hover:border-emerald-500 hover:shadow-md shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-6">
                  <span
                    className={`border px-3 py-1 font-bold ${
                      isDark 
                        ? 'border-emerald-900 bg-black text-emerald-500' 
                        : 'border-emerald-300 bg-emerald-50 text-emerald-800'
                    }`}
                  >
                    {vector.code}
                  </span>
                  <span
                    className={`text-[10px] uppercase border px-2.5 py-0.5 font-bold ${
                      isDark 
                        ? 'border-emerald-950 text-emerald-600' 
                        : 'border-emerald-200 text-emerald-700'
                    }`}
                  >
                    {vector.badge}
                  </span>
                </div>
                <h3 className={`text-lg sm:text-xl font-bold mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {vector.title}
                </h3>
                <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  {vector.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TECH ARSENAL MATRIX */}
      <section
        className={`border-t py-20 sm:py-28 lg:py-32 ${
          isDark 
            ? 'border-emerald-500/20 bg-black/80' 
            : 'border-emerald-900/10 bg-white/70'
        }`}
      >
        <div className="mx-auto w-full max-w-[1700px] px-4 sm:px-8 lg:px-12">
          <div className="mb-14 text-center">
            <span className={`text-xs uppercase tracking-widest font-bold ${isDark ? 'text-emerald-600' : 'text-emerald-700'}`}>
              // DAEMONS & NETWORK RUNTIMES
            </span>
            <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight mt-1.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              DEPLOYED_TECH_ARSENAL
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {techArsenal.map(tech => (
              <div
                key={tech.name}
                className={`border p-6 transition-all duration-200 ${
                  isDark 
                    ? 'border-emerald-900/60 bg-black hover:border-emerald-500 hover:shadow-[0_0_20px_rgba(16,185,129,0.15)]' 
                    : 'border-emerald-200 bg-white hover:border-emerald-500 hover:shadow-md shadow-xs'
                }`}
              >
                <div className={`flex items-center justify-between text-xs ${isDark ? 'text-emerald-600' : 'text-emerald-700'}`}>
                  <span>{tech.port}</span>
                  <span
                    className={`text-[10px] border px-2 py-0.5 font-bold ${
                      isDark 
                        ? 'bg-emerald-950/60 border-emerald-900 text-emerald-400' 
                        : 'bg-emerald-50 border-emerald-200 text-emerald-800'
                    }`}
                  >
                    {tech.layer}
                  </span>
                </div>
                <div className={`mt-4 text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {tech.name}
                </div>
                <div
                  className={`mt-3 flex items-center justify-between text-[11px] border-t pt-2.5 ${
                    isDark 
                      ? 'border-emerald-950 text-emerald-700' 
                      : 'border-emerald-100 text-slate-500'
                  }`}
                >
                  <span>STATE</span>
                  <span className={`font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>
                    {tech.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section className="border-t border-emerald-500/20 py-20 sm:py-28 lg:py-32">
        <div className="mx-auto w-full max-w-[1700px] px-4 sm:px-8 lg:px-12">
          <div className="mb-14 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <span className={`text-xs uppercase tracking-widest font-bold ${isDark ? 'text-emerald-600' : 'text-emerald-700'}`}>
                // ACTIVE_DEPLOYMENTS
              </span>
              <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight mt-1.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                FEATURED_TARGETS
              </h2>
            </div>
            <Link
              to="/projects"
              className={`text-sm font-bold uppercase hover:underline flex items-center gap-1.5 ${
                isDark ? 'text-emerald-400' : 'text-emerald-700'
              }`}
            >
              INSPECT_ALL_REPOSITORIES <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project, idx) => (
              <article
                key={project.id}
                data-aos="fade-up"
                data-aos-delay={idx * 100}
                className={`border p-7 sm:p-9 flex flex-col justify-between transition-all duration-200 group ${
                  isDark 
                    ? 'border-emerald-900/80 bg-black hover:border-emerald-400' 
                    : 'border-emerald-200 bg-white hover:border-emerald-600 hover:shadow-lg shadow-xs'
                }`}
              >
                <div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.category.map(cat => (
                      <span
                        key={cat}
                        className={`text-[10px] border px-2.5 py-1 font-semibold ${
                          isDark 
                            ? 'bg-emerald-950/40 text-emerald-400 border-emerald-900/80' 
                            : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                        }`}
                      >
                        {cat}
                      </span>
                    ))}
                  </div>

                  <h3
                    className={`text-lg sm:text-xl font-bold mb-3 transition-colors ${
                      isDark 
                        ? 'text-white group-hover:text-emerald-400' 
                        : 'text-slate-900 group-hover:text-emerald-700'
                    }`}
                  >
                    {project.title}
                  </h3>

                  <p className={`text-sm line-clamp-3 leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    {language === 'kh' ? project.descriptionKh : project.description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.technologies.slice(0, 4).map(t => (
                      <span
                        key={t}
                        className={`text-[11px] border px-2 py-0.5 ${
                          isDark 
                            ? 'text-emerald-600 border-emerald-950' 
                            : 'text-emerald-700 border-emerald-100 bg-emerald-50/50'
                        }`}
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>

                <div
                  className={`mt-8 pt-5 border-t flex items-center justify-between ${
                    isDark ? 'border-emerald-950' : 'border-emerald-100'
                  }`}
                >
                  <Link
                    to={`/projects/${project.id}`}
                    className={`text-xs font-bold hover:underline flex items-center gap-1 ${
                      isDark ? 'text-emerald-400' : 'text-emerald-700'
                    }`}
                  >
                    EXPLOIT_SOURCE →
                  </Link>

                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-xs hover:underline flex items-center gap-1.5 ${
                        isDark ? 'text-slate-400 hover:text-emerald-400' : 'text-slate-600 hover:text-emerald-700 font-semibold'
                      }`}
                    >
                      <ExternalLink className="h-3.5 w-3.5" /> LIVE_HOST
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CRT SCANLINE EFFECTS */}
      <style>{`
        .scanline-overlay {
          background: linear-gradient(
            to bottom,
            rgba(255,255,255,0),
            rgba(255,255,255,0) 50%,
            rgba(0, 0, 0, 0.45) 50%,
            rgba(0, 0, 0, 0.45)
          );
          background-size: 100% 4px;
        }
        .glitch-text {
          text-shadow: 2px 0 #00ff88, -2px 0 #003311;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}