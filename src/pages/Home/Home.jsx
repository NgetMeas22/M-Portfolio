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
  '0x7F', '0x45', '0x4C', '0x02', '0xFF', '0x1A', '0x2B', '0xDE',
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
        }, 25);
        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => setShowOutput(true), 120);
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
      }, 90);
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
          ? 'bg-[#030705] text-emerald-400 selection:bg-emerald-500 selection:text-black' 
          : 'bg-[#f8faf9] text-slate-900 selection:bg-emerald-600 selection:text-white'
      }`}
    >
      {/* BACKGROUND ACCENTS */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div
          className="absolute -left-20 top-20 h-[350px] sm:h-[500px] w-[350px] sm:w-[500px] rounded-full blur-[100px] sm:blur-[140px]"
          style={{
            background: isDark
              ? 'radial-gradient(circle, rgba(16,185,129,0.18) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 70%)',
          }}
        />
        <div
          className={`absolute inset-0 bg-[linear-gradient(to_right,#10b9810d_1px,transparent_1px),linear-gradient(to_bottom,#10b9810d_1px,transparent_1px)] bg-[size:3rem_3rem] sm:bg-[size:4rem_4rem] ${
            isDark ? 'opacity-30' : 'opacity-20'
          }`}
        />
      </div>

      {/* HERO SECTION */}
      <section className="relative z-10 px-6 sm:px-12 md:px-16 lg:px-24 xl:px-32 pt-16 pb-16 sm:pt-24 sm:pb-24 lg:pt-28 lg:pb-28">
        <div className="mx-auto w-full max-w-[1600px]">
          <div className="grid items-center gap-12 lg:grid-cols-12 xl:gap-16">

            {/* LEFT COLUMN: HERO CONTENT */}
            <div data-aos="fade-right" className="lg:col-span-7 flex flex-col space-y-6 sm:space-y-8">
              
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <div
                  className={`inline-flex items-center gap-2 border px-3 py-1.5 text-xs font-bold rounded ${
                    isDark 
                      ? 'border-emerald-400/50 bg-emerald-950/60 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.25)]' 
                      : 'border-emerald-600/40 bg-emerald-100/80 text-emerald-900'
                  }`}
                >
                  <Lock className={`h-3.5 w-3.5 ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`} />
                  <span className="tracking-wider">// NODE://INIT_OK</span>
                </div>
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
                  ENCRYPTION: HARDENED
                </span>
              </div>

              <div className="space-y-3 sm:space-y-4">
                <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black uppercase tracking-tight leading-[1.08] break-words">
                  <span className={isDark ? 'text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]' : 'text-slate-900'}>
                    {nameParts[0]}
                  </span>{' '}
                  <span
                    className={`font-black ${
                      isDark 
                        ? 'text-emerald-400 drop-shadow-[0_0_35px_rgba(52,211,153,0.7)]' 
                        : 'text-emerald-700 drop-shadow-[0_0_15px_rgba(4,120,87,0.2)]'
                    }`}
                  >
                    {nameParts.slice(1).join(' ')}
                  </span>
                </h1>

                {/* ROLE ROTATOR */}
                <div
                  className={`flex flex-wrap items-center gap-2 text-base sm:text-xl md:text-2xl pt-1 ${
                    isDark ? 'text-emerald-300 font-bold' : 'text-emerald-800 font-bold'
                  }`}
                >
                  <span className={isDark ? 'text-emerald-500' : 'text-emerald-700'}>root@mesh:~#</span>
                  <span className="underline decoration-emerald-400 decoration-2 underline-offset-4 break-all">
                    {roleText}
                  </span>
                  <span className={`inline-block w-2.5 h-5 sm:h-6 animate-pulse ${isDark ? 'bg-emerald-400 shadow-[0_0_10px_#10b981]' : 'bg-emerald-700'}`} />
                </div>
              </div>

              {/* BIO BOX */}
              <p
                className={`max-w-2xl text-sm sm:text-base md:text-lg leading-relaxed border-l-4 pl-4 sm:pl-6 py-3 rounded-r-xl ${
                  isDark 
                    ? 'text-slate-100 border-emerald-400 bg-emerald-950/30' 
                    : 'text-slate-800 border-emerald-600 bg-emerald-50/80 shadow-xs'
                }`}
              >
                Constructing hardened, full-stack digital assets. Focusing on fault-tolerant backend infrastructures, resilient state distribution, and defensive web software engineering.
              </p>

              {/* HEX STREAM */}
              <div
                className={`flex flex-wrap gap-1.5 sm:gap-2 text-[10px] sm:text-xs select-none ${
                  isDark ? 'text-emerald-400/90 font-bold' : 'text-emerald-800 font-semibold'
                }`}
              >
                {HEX_STREAM.map((hex, i) => (
                  <span
                    key={i}
                    className={`px-2 py-0.5 border rounded transition-all ${
                      isDark 
                        ? 'bg-black/90 border-emerald-800/80 hover:border-emerald-400 hover:text-emerald-300' 
                        : 'bg-white border-emerald-200 hover:border-emerald-600 shadow-xs'
                    }`}
                  >
                    {hex}
                  </span>
                ))}
              </div>

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
                  EXEC_DOWNLOAD_CV
                </a>
                
                <Link
                  to="/projects"
                  className={`inline-flex items-center justify-center gap-3 border-2 px-6 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl transition-all text-center ${
                    isDark
                      ? 'border-emerald-400/60 bg-emerald-950/30 text-emerald-300 hover:border-emerald-300 hover:bg-emerald-950/60'
                      : 'border-emerald-600 bg-white text-emerald-900 hover:border-emerald-700 hover:bg-emerald-50 shadow-xs'
                  }`}
                >
                  AUDIT_ARCHIVES
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

            {/* RIGHT COLUMN: ILLUMINATED TERMINAL HUD */}
            <div data-aos="fade-left" className="lg:col-span-5 w-full">
              <div
                className={`relative rounded-2xl border-2 transition-all duration-200 overflow-hidden ${
                  isDark 
                    ? 'border-emerald-400/60 bg-[#050b08] shadow-[0_0_35px_rgba(16,185,129,0.2)]' 
                    : 'border-emerald-600/40 bg-white shadow-xl'
                }`}
              >
                {/* HUD CORNER RETICLES */}
                <span className={`absolute top-2 left-2 h-3.5 w-3.5 border-t-2 border-l-2 ${isDark ? 'border-emerald-400' : 'border-emerald-700'}`} />
                <span className={`absolute top-2 right-2 h-3.5 w-3.5 border-t-2 border-r-2 ${isDark ? 'border-emerald-400' : 'border-emerald-700'}`} />
                <span className={`absolute bottom-2 left-2 h-3.5 w-3.5 border-b-2 border-l-2 ${isDark ? 'border-emerald-400' : 'border-emerald-700'}`} />
                <span className={`absolute bottom-2 right-2 h-3.5 w-3.5 border-b-2 border-r-2 ${isDark ? 'border-emerald-400' : 'border-emerald-700'}`} />

                {/* TERMINAL HEADER */}
                <div
                  className={`flex flex-wrap items-center justify-between border-b px-4 py-3 text-xs gap-2 ${
                    isDark 
                      ? 'border-emerald-500/30 bg-emerald-950/60 text-slate-100' 
                      : 'border-emerald-100 bg-emerald-50/90 text-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-2">
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

                {/* TERMINAL BUFFER VIEWPORT */}
                <div className="min-h-[280px] sm:min-h-[380px] p-4 sm:p-6 space-y-3.5 text-xs sm:text-sm leading-relaxed overflow-y-auto">
                  <p className={isDark ? 'text-emerald-400/80 font-bold' : 'text-emerald-700 font-semibold'}>
                    // Remote handshake negotiated. Cipher: ECDHE-RSA-AES128-GCM-SHA256
                  </p>
                  
                  {displayedLines.map((line, idx) => (
                    <div key={idx} className="space-y-1">
                      <p className={`break-all ${isDark ? 'text-white font-semibold' : 'text-slate-900 font-semibold'}`}>
                        <span className={`font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>root@sec-gateway:~#</span> {line.command}
                      </p>
                      {line.output && (
                        <p
                          className={`pl-3 border-l-2 font-mono break-all text-xs ${
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

                  {!typingComplete ? (
                    <span className={`inline-block h-4 w-2 animate-pulse ${isDark ? 'bg-emerald-400 shadow-[0_0_8px_#10b981]' : 'bg-emerald-700'}`} />
                  ) : (
                    <p className={`pt-2 border-t text-xs ${isDark ? 'text-emerald-400 border-emerald-900/60' : 'text-emerald-700 border-emerald-100'}`}>
                      root@sec-gateway:~# <span className={`inline-block h-4 w-2 animate-pulse ${isDark ? 'bg-emerald-400' : 'bg-emerald-700'}`} />
                    </p>
                  )}
                </div>

                {/* TERMINAL STATUS BAR */}
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

      {/* SYSTEM TELEMETRY / HARDWARE PANEL */}
      <section
        className={`relative z-10 border-y py-12 sm:py-16 ${
          isDark 
            ? 'border-emerald-500/30 bg-black/70' 
            : 'border-emerald-900/10 bg-white/90 shadow-xs'
        }`}
      >
        <div className="mx-auto w-full max-w-[1600px] px-6 sm:px-12 md:px-16 lg:px-24 xl:px-32">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {systemStats.map((item, i) => (
              <div
                key={i}
                className={`border-2 rounded-xl p-4 sm:p-5 flex items-center gap-4 transition-all duration-200 ${
                  isDark 
                    ? 'border-emerald-800/60 bg-emerald-950/20 hover:border-emerald-400' 
                    : 'border-emerald-200 bg-white hover:border-emerald-500 shadow-xs'
                }`}
              >
                <div
                  className={`p-3 rounded-lg border shrink-0 ${
                    isDark 
                      ? 'border-emerald-400/50 bg-emerald-950/60 text-emerald-300' 
                      : 'border-emerald-300 bg-emerald-50 text-emerald-700'
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                </div>
                <div className="space-y-1 overflow-hidden">
                  <div className={`text-[10px] uppercase tracking-widest font-bold truncate ${isDark ? 'text-emerald-500' : 'text-emerald-700'}`}>
                    {item.label}
                  </div>
                  <div className={`text-sm sm:text-base font-black truncate ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {item.value}
                  </div>
                  <div className={`text-[11px] font-mono flex items-center gap-1.5 ${isDark ? 'text-emerald-300 font-bold' : 'text-emerald-700 font-semibold'}`}>
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" /> {item.stat}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OPERATIONAL CAPABILITIES */}
      <section className="relative z-10 py-16 sm:py-24 lg:py-28">
        <div className="mx-auto w-full max-w-[1600px] px-6 sm:px-12 md:px-16 lg:px-24 xl:px-32">
          <div className="mb-10 sm:mb-14">
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
                key={i}
                data-aos="fade-up"
                data-aos-delay={i * 100}
                className={`relative border-2 rounded-2xl p-6 sm:p-8 transition-all duration-200 ${
                  isDark 
                    ? 'border-emerald-800/60 bg-emerald-950/20 hover:border-emerald-400' 
                    : 'border-emerald-200 bg-white hover:border-emerald-500 shadow-xs'
                }`}
              >
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
                      isDark 
                        ? 'border-emerald-700/60 text-emerald-400' 
                        : 'border-emerald-200 text-emerald-700'
                    }`}
                  >
                    {vector.badge}
                  </span>
                </div>
                <h3 className={`text-base sm:text-lg font-black mb-2.5 uppercase tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {vector.title}
                </h3>
                <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  {vector.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TECH ARSENAL MATRIX */}
      <section
        className={`relative z-10 border-t py-16 sm:py-24 lg:py-28 ${
          isDark 
            ? 'border-emerald-500/30 bg-black/80' 
            : 'border-emerald-900/10 bg-white/70'
        }`}
      >
        <div className="mx-auto w-full max-w-[1600px] px-6 sm:px-12 md:px-16 lg:px-24 xl:px-32">
          <div className="mb-10 sm:mb-12 text-center">
            <span className={`text-xs uppercase tracking-widest font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>
              // DAEMONS & NETWORK RUNTIMES
            </span>
            <h2 className={`text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight mt-1.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              DEPLOYED_TECH_ARSENAL
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {techArsenal.map(tech => (
              <div
                key={tech.name}
                className={`border-2 rounded-xl p-5 transition-all duration-200 ${
                  isDark 
                    ? 'border-emerald-900/70 bg-black/90 hover:border-emerald-400' 
                    : 'border-emerald-200 bg-white hover:border-emerald-500 shadow-xs'
                }`}
              >
                <div className={`flex items-center justify-between text-xs font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>
                  <span>{tech.port}</span>
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
                    isDark 
                      ? 'border-emerald-900/60 text-slate-400' 
                      : 'border-emerald-100 text-slate-500'
                  }`}
                >
                  <span className="font-mono">STATE</span>
                  <span className={`font-bold ${isDark ? 'text-emerald-300' : 'text-emerald-700'}`}>
                    {tech.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section className="relative z-10 border-t border-emerald-500/30 py-16 sm:py-24 lg:py-28">
        <div className="mx-auto w-full max-w-[1600px] px-6 sm:px-12 md:px-16 lg:px-24 xl:px-32">
          <div className="mb-10 sm:mb-12 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <span className={`text-xs uppercase tracking-widest font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>
                // ACTIVE_DEPLOYMENTS
              </span>
              <h2 className={`text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight mt-1.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                FEATURED_TARGETS
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
                    {project.category.map(cat => (
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
                      isDark 
                        ? 'text-white group-hover:text-emerald-400' 
                        : 'text-slate-900 group-hover:text-emerald-700'
                    }`}
                  >
                    {project.title}
                  </h3>

                  <p className={`text-xs sm:text-sm line-clamp-3 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    {language === 'kh' ? project.descriptionKh : project.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.technologies.slice(0, 4).map(t => (
                      <span
                        key={t}
                        className={`text-[10px] font-mono border px-1.5 py-0.5 rounded ${
                          isDark 
                            ? 'text-emerald-400 border-emerald-800/80 bg-black' 
                            : 'text-emerald-700 border-emerald-100 bg-emerald-50/50'
                        }`}
                      >
                        #{t}
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
                    EXPLOIT_SOURCE →
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
    </div>
  );
}