import { useEffect, useRef, useState } from 'react';
import { MoveHorizontal } from 'lucide-react';
import portrait from '../../assets/image/profile2-cutout.webp';

// Art styles shown on the left of the divider; the real photo is always on the right.
const STYLES = [
  { id: 'matrix', label: 'Matrix', filter: 'grayscale(1) sepia(1) hue-rotate(95deg) saturate(2.8) contrast(1.25) brightness(0.95)' },
  { id: 'popart', label: 'Pop Art', filter: 'url(#hp-pop) saturate(1.6) contrast(1.15)' },
  { id: 'blueprint', label: 'Blueprint', filter: 'grayscale(1) invert(0.92) sepia(1) hue-rotate(170deg) saturate(3.2) contrast(1.15)' },
  { id: 'sketch', label: 'Neon Sketch', filter: { dark: 'url(#hp-sketch-dark)', light: 'url(#hp-sketch-light)' } },
  { id: 'glitch', label: 'Glitch', filter: 'grayscale(1) contrast(1.35) brightness(1.05)' },
];

const CHIPS = [
  { label: 'Next.js', dot: '#e5e7eb', pos: { left: '0%', top: '16%' }, depth: 14, delay: '0s' },
  { label: 'React', dot: '#61dafb', pos: { right: '2%', top: '8%' }, depth: 22, delay: '1.2s' },
  { label: 'Express', dot: '#a3e635', pos: { left: '-2%', top: '50%' }, depth: 26, delay: '0.6s' },
  { label: 'PostgreSQL', dot: '#60a5fa', pos: { right: '-2%', top: '44%' }, depth: 18, delay: '1.8s' },
];

const TRAIL_CHARS = '01<>/{}#;';

const silhouetteMask = {
  WebkitMaskImage: `url(${portrait})`,
  maskImage: `url(${portrait})`,
  WebkitMaskSize: '100% 100%',
  maskSize: '100% 100%',
};

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Paint splatters behind the Pop Art side (inspired by mixed-media portraits)
function Splashes() {
  return (
    <svg className="hp-splash absolute -inset-[6%] h-[112%] w-[112%]" viewBox="0 0 100 100" aria-hidden="true">
      <path d="M8 62c6-10 2-22 12-26s14 8 22 4 6-16 16-14-2 14 6 20-6 12-16 12-12 10-22 8-24 6-18-4z" fill="#14b8a6" opacity="0.75" />
      <path d="M2 30c8-4 14 2 20-4s4-14 12-12-4 10 2 16-10 8-18 6-20 0-16-6z" fill="#f59e0b" opacity="0.8" />
      <path d="M14 84c10-6 20 0 28-6s14-2 12 6-18 10-26 8-20-2-14-8z" fill="#ef4444" opacity="0.75" />
      <path d="M30 14c4-6 12-6 14 0s-6 8-10 6-6-2-4-6z" fill="#38bdf8" opacity="0.8" />
      {[
        [6, 48, 1.6, '#ef4444'], [22, 22, 1.1, '#14b8a6'], [44, 8, 1.4, '#f59e0b'], [4, 74, 1.2, '#38bdf8'],
        [28, 94, 1.5, '#f59e0b'], [12, 12, 0.9, '#ef4444'], [40, 40, 0.8, '#38bdf8'], [16, 58, 0.7, '#f59e0b'],
      ].map(([cx, cy, r, fill]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} fill={fill} />
      ))}
    </svg>
  );
}

export default function HeroPortrait({ isDark, language, name }) {
  const stageRef = useRef(null);
  const [styleIdx, setStyleIdx] = useState(0);
  const [hovering, setHovering] = useState(false);
  const [pinned, setPinned] = useState(false);
  const [reduced] = useState(prefersReducedMotion);

  const style = STYLES[styleIdx];
  const artFilter = typeof style.filter === 'string' ? style.filter : style.filter[isDark ? 'dark' : 'light'];
  const isKh = language === 'kh';

  const trailRef = useRef(null);
  const readoutRef = useRef(null);
  const lastSpawn = useRef(0);

  const nextStyle = () => setStyleIdx((i) => (i + 1) % STYLES.length);

  // Short-lived DOM nodes (no React state) so the trail stays cheap at 60fps
  const spawn = (className, x, y, text = '') => {
    const box = trailRef.current;
    if (!box) return;
    const node = document.createElement('span');
    node.className = className;
    node.textContent = text;
    node.style.left = `${x}px`;
    node.style.top = `${y}px`;
    node.style.setProperty('--dx', `${(Math.random() - 0.5) * 44}px`);
    box.appendChild(node);
    node.addEventListener('animationend', () => node.remove());
  };

  const spawnTrail = (x, y) => {
    const now = performance.now();
    if (now - lastSpawn.current < 35 || (trailRef.current?.childElementCount ?? 0) > 32) return;
    lastSpawn.current = now;
    spawn('hp-particle', x, y, TRAIL_CHARS[Math.floor(Math.random() * TRAIL_CHARS.length)]);
  };

  // Idle: sweep the divider slowly and reset tilt/parallax
  useEffect(() => {
    const el = stageRef.current;
    if (!el || hovering) return undefined;
    ['--rx', '--ry'].forEach((v) => el.style.setProperty(v, '0deg'));
    ['--px', '--py'].forEach((v) => el.style.setProperty(v, '0'));
    el.style.setProperty('--hy', '46%');
    if (reduced) {
      el.style.setProperty('--split', '50%');
      return undefined;
    }
    let raf;
    const start = performance.now();
    const tick = (now) => {
      el.style.setProperty('--split', `${50 + Math.sin((now - start) / 1500) * 20}%`);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [hovering, reduced]);

  // Idle: auto-cycle styles until the visitor picks one
  useEffect(() => {
    if (hovering || pinned || reduced) return undefined;
    const id = setInterval(nextStyle, 4200);
    return () => clearInterval(id);
  }, [hovering, pinned, reduced]);

  const handlePointerMove = (e) => {
    const el = stageRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
    const y = Math.min(1, Math.max(0, (e.clientY - r.top) / r.height));
    const px = e.clientX - r.left;
    const py = e.clientY - r.top;
    el.style.setProperty('--split', `${x * 100}%`);
    el.style.setProperty('--mx', `${px}px`);
    el.style.setProperty('--my', `${py}px`);
    el.style.setProperty('--hy', `${Math.min(84, Math.max(6, y * 100))}%`);
    if (readoutRef.current) {
      const pad = (n) => String(Math.round(n * 100)).padStart(3, '0');
      readoutRef.current.textContent = `x:${pad(x)} y:${pad(y)}`;
    }
    if (!reduced) {
      spawnTrail(px, py);
      el.style.setProperty('--ry', `${(x - 0.5) * 12}deg`);
      el.style.setProperty('--rx', `${(0.5 - y) * 8}deg`);
      el.style.setProperty('--px', String((x - 0.5) * 2));
      el.style.setProperty('--py', String((y - 0.5) * 2));
    }
  };

  const handlePointerEnter = (e) => {
    setHovering(true);
    if (!pinned) nextStyle();
    handlePointerMove(e);
  };

  const chipClass = `inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] sm:text-[11px] font-bold tracking-wide backdrop-blur-md ${
    isDark
      ? 'border-emerald-500/30 bg-black/60 text-slate-200 shadow-[0_0_18px_rgba(16,185,129,0.18)]'
      : 'border-emerald-200 bg-white/85 text-slate-800 shadow-md'
  }`;

  return (
    <div className="relative mx-auto w-full max-w-[330px] sm:max-w-[420px] select-none">
      {/* SVG FILTERS */}
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <defs>
          <filter id="hp-pop" colorInterpolationFilters="sRGB">
            <feComponentTransfer>
              <feFuncR type="discrete" tableValues="0.08 0.45 0.9 1" />
              <feFuncG type="discrete" tableValues="0.06 0.32 0.68 0.95" />
              <feFuncB type="discrete" tableValues="0.18 0.5 0.72 0.9" />
            </feComponentTransfer>
          </filter>
          <filter id="hp-sketch-dark" colorInterpolationFilters="sRGB">
            <feColorMatrix type="saturate" values="0" />
            <feGaussianBlur stdDeviation="0.5" />
            <feConvolveMatrix order="3" kernelMatrix="-1 -1 -1 -1 8 -1 -1 -1 -1" preserveAlpha="true" />
            <feColorMatrix type="matrix" values="0.6 0 0 0 0.01  2.4 0 0 0 0.03  1.6 0 0 0 0.02  0 0 0 1 0" />
          </filter>
          <filter id="hp-sketch-light" colorInterpolationFilters="sRGB">
            <feColorMatrix type="saturate" values="0" />
            <feGaussianBlur stdDeviation="0.5" />
            <feConvolveMatrix order="3" kernelMatrix="-1 -1 -1 -1 8 -1 -1 -1 -1" preserveAlpha="true" />
            <feColorMatrix type="matrix" values="-2.6 0 0 0 0.98  -1.4 0 0 0 0.99  -2 0 0 0 0.97  0 0 0 1 0" />
          </filter>
          <filter id="hp-red" colorInterpolationFilters="sRGB">
            <feColorMatrix type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" />
          </filter>
          <filter id="hp-cyan" colorInterpolationFilters="sRGB">
            <feColorMatrix type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0" />
          </filter>
        </defs>
      </svg>

      <div
        ref={stageRef}
        onPointerEnter={handlePointerEnter}
        onPointerMove={handlePointerMove}
        onPointerLeave={() => setHovering(false)}
        onClick={(e) => {
          const r = stageRef.current.getBoundingClientRect();
          if (!reduced) spawn('hp-ripple', e.clientX - r.left, e.clientY - r.top);
          setPinned(false);
          nextStyle();
        }}
        className="hp-stage relative cursor-pointer touch-pan-y"
        style={{ '--split': '50%' }}
        role="img"
        aria-label={`${name} — ${style.label}`}
      >
        {/* BACKDROP */}
        <div
          className={`hp-glow pointer-events-none absolute left-[8%] right-[8%] top-[6%] aspect-square rounded-full ${
            isDark ? 'opacity-90' : 'opacity-60'
          }`}
          aria-hidden="true"
        />
        <div
          className={`hp-spin pointer-events-none absolute left-[2%] right-[2%] top-0 aspect-square rounded-full border border-dashed ${
            isDark ? 'border-emerald-500/30' : 'border-emerald-600/30'
          }`}
          aria-hidden="true"
        />
        <div
          className={`hp-spin-rev pointer-events-none absolute left-[14%] right-[14%] top-[12%] aspect-square rounded-full border ${
            isDark ? 'border-emerald-400/15' : 'border-emerald-600/15'
          }`}
          aria-hidden="true"
        >
          <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]" />
        </div>

        <div
          className={`hp-spot pointer-events-none absolute inset-0 transition-opacity duration-500 ${hovering ? 'opacity-100' : 'opacity-0'}`}
          aria-hidden="true"
        />

        {/* PORTRAIT (TILTS) */}
        <div className="hp-tilt relative">
          <img
            src={portrait}
            alt={name}
            draggable="false"
            className="hp-fade relative block w-full"
            style={isDark ? { filter: 'drop-shadow(0 0 1px rgba(52,211,153,0.55)) drop-shadow(0 0 22px rgba(16,185,129,0.25))' } : undefined}
            width="760"
            height="822"
          />

          {/* ART SIDE */}
          <div key={style.id} className="hp-art absolute inset-0" aria-hidden="true">
            {style.id === 'popart' && <Splashes />}
            <img src={portrait} alt="" draggable="false" className="hp-fade absolute inset-0 h-full w-full" style={{ filter: artFilter }} />

            {style.id === 'matrix' && (
              <div className="hp-fade absolute inset-0">
                <div className="absolute inset-0" style={silhouetteMask}>
                  <div className="hp-scanlines absolute inset-0" />
                  <div className="hp-beam absolute inset-x-0 h-16" />
                </div>
              </div>
            )}

            {style.id === 'blueprint' && (
              <div className="hp-fade absolute inset-0">
                <div className="hp-grid absolute inset-0" style={silhouetteMask} />
              </div>
            )}

            {style.id === 'glitch' && (
              <>
                <img src={portrait} alt="" draggable="false" className="hp-fade hp-glitch-r absolute inset-0 h-full w-full mix-blend-screen" style={{ filter: 'url(#hp-red)' }} />
                <img src={portrait} alt="" draggable="false" className="hp-fade hp-glitch-c absolute inset-0 h-full w-full mix-blend-screen" style={{ filter: 'url(#hp-cyan)' }} />
                <img src={portrait} alt="" draggable="false" className="hp-fade hp-slice absolute inset-0 h-full w-full" style={{ filter: artFilter }} />
              </>
            )}
          </div>

          {/* SHINE ON REAL PHOTO (follows cursor) */}
          <div className={`hp-fade pointer-events-none absolute inset-0 transition-opacity duration-500 ${hovering ? 'opacity-100' : 'opacity-0'}`} aria-hidden="true">
            <div className="hp-shine absolute inset-0" style={silhouetteMask} />
          </div>

          {/* DIVIDER */}
          <div className="hp-divider pointer-events-none absolute bottom-[10%] top-[2%] w-0.5 -translate-x-1/2" aria-hidden="true">
            <span
              className={`hp-handle absolute left-1/2 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border backdrop-blur-md ${
                isDark
                  ? 'border-emerald-400/70 bg-black/70 text-emerald-300 shadow-[0_0_18px_rgba(52,211,153,0.6)]'
                  : 'border-emerald-500 bg-white/90 text-emerald-700 shadow-md'
              }`}
            >
              <MoveHorizontal className="h-4 w-4" />
            </span>
          </div>
        </div>

        {/* SIDE LABELS */}
        <span
          className={`pointer-events-none absolute left-0 top-0 rounded-md border px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest backdrop-blur-md ${
            isDark ? 'border-emerald-500/40 bg-black/60 text-emerald-300' : 'border-emerald-300 bg-white/85 text-emerald-800'
          }`}
        >
          <span key={style.id} className="hp-label inline-block">{'< '}{style.label}</span>
        </span>
        <span
          className={`pointer-events-none absolute right-0 top-0 rounded-md border px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest backdrop-blur-md ${
            isDark ? 'border-slate-500/40 bg-black/60 text-slate-300' : 'border-slate-300 bg-white/85 text-slate-700'
          }`}
        >
          {isKh ? 'រូបពិត >' : 'Real >'}
        </span>

        {/* FLOATING STACK CHIPS */}
        {CHIPS.map((chip) => (
          <div
            key={chip.label}
            className="hp-parallax pointer-events-none absolute"
            style={{ ...chip.pos, '--depth': chip.depth }}
          >
            <span className={`hp-float ${chipClass}`} style={{ animationDelay: chip.delay }}>
              <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: chip.dot }} />
              {chip.label}
            </span>
          </div>
        ))}

        {/* STATUS BADGE */}
        <div className="pointer-events-none absolute bottom-[12%] left-[4%]">
          <span
            className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[11px] sm:text-xs font-bold backdrop-blur-md ${
              isDark
                ? 'border-emerald-400/40 bg-black/70 text-white shadow-[0_0_24px_rgba(16,185,129,0.3)]'
                : 'border-emerald-200 bg-white/90 text-slate-800 shadow-lg'
            }`}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            {isKh ? 'ទទួលគម្រោងថ្មី' : 'Open for Projects'}
          </span>
        </div>

        {/* CURSOR HALO + TRAIL */}
        <div
          className={`hp-halo pointer-events-none absolute z-20 hidden sm:block transition-opacity duration-300 ${hovering && !reduced ? 'opacity-100' : 'opacity-0'}`}
          aria-hidden="true"
        >
          <span className="hp-halo-ring absolute inset-0 rounded-full border border-dashed border-emerald-300/80" />
          <span className="absolute left-1/2 top-0 h-2 w-px -translate-x-1/2 bg-emerald-300" />
          <span className="absolute bottom-0 left-1/2 h-2 w-px -translate-x-1/2 bg-emerald-300" />
          <span className="absolute left-0 top-1/2 h-px w-2 -translate-y-1/2 bg-emerald-300" />
          <span className="absolute right-0 top-1/2 h-px w-2 -translate-y-1/2 bg-emerald-300" />
          <span className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-300 shadow-[0_0_8px_#6ee7b7]" />
          <span
            ref={readoutRef}
            className="absolute left-[110%] top-[110%] whitespace-nowrap rounded border border-emerald-500/40 bg-black/75 px-1.5 py-0.5 text-[9px] font-bold text-emerald-300"
          >
            x:050 y:050
          </span>
        </div>
        <div ref={trailRef} className="pointer-events-none absolute inset-0 z-20" aria-hidden="true" />
      </div>

      {/* STYLE SWITCHER */}
      <div className="relative mt-3 flex flex-col items-center gap-2">
        <div className="flex flex-wrap justify-center gap-1.5">
          {STYLES.map((s, i) => {
            const active = i === styleIdx;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => {
                  setStyleIdx(i);
                  setPinned(true);
                }}
                aria-pressed={active}
                className={`cursor-pointer rounded-md border px-1.5 py-1 text-[9px] sm:px-2 sm:text-[10px] font-bold uppercase tracking-wide sm:tracking-wider transition-all ${
                  active
                    ? isDark
                      ? 'border-emerald-400 bg-emerald-500/15 text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.3)]'
                      : 'border-emerald-600 bg-emerald-600 text-white'
                    : isDark
                      ? 'border-emerald-900/70 bg-black/50 text-slate-500 hover:border-emerald-500/50 hover:text-emerald-300'
                      : 'border-slate-200 bg-white text-slate-500 hover:border-emerald-400 hover:text-emerald-700'
                }`}
              >
                {s.label}
              </button>
            );
          })}
        </div>
        <p className={`text-[10px] tracking-wider ${isDark ? 'text-slate-600' : 'text-slate-500'}`}>
          {isKh ? '// ដាក់ Mouse ឬចុចលើរូប ដើម្បីប្តូររចនាប័ទ្ម' : '// hover, drag or tap the portrait to transform'}
        </p>
      </div>

      <style>{`
        .hp-glow {
          background: radial-gradient(circle at 50% 45%, rgba(16,185,129,0.45), rgba(16,185,129,0.12) 45%, transparent 70%);
          filter: blur(8px);
          animation: hp-breathe 5s ease-in-out infinite;
        }
        .hp-spin { animation: hp-spin 28s linear infinite; }
        .hp-spin-rev { animation: hp-spin 20s linear infinite reverse; }
        .hp-tilt {
          transform: perspective(900px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg));
          transition: transform 0.35s ease-out;
        }
        .hp-fade {
          -webkit-mask-image: linear-gradient(to bottom, #000 78%, transparent 100%), linear-gradient(to right, transparent, #000 9%, #000 91%, transparent);
          -webkit-mask-composite: source-in;
          mask-image: linear-gradient(to bottom, #000 78%, transparent 100%), linear-gradient(to right, transparent, #000 9%, #000 91%, transparent);
          mask-composite: intersect;
        }
        .hp-spot {
          background: radial-gradient(240px circle at var(--mx, 50%) var(--my, 40%), rgba(16,185,129,0.3), transparent 70%);
        }
        .hp-shine {
          background: radial-gradient(160px circle at var(--mx, 50%) var(--my, 40%), rgba(255,255,255,0.25), transparent 70%);
          mix-blend-mode: soft-light;
        }
        .hp-handle { top: var(--hy, 46%); transition: top 0.15s ease-out; }
        .hp-halo {
          left: var(--mx, 50%);
          top: var(--my, 50%);
          width: 54px;
          height: 54px;
          transform: translate(-50%, -50%);
        }
        .hp-halo-ring { animation: hp-spin 5s linear infinite; }
        .hp-particle {
          position: absolute;
          font-size: 14px;
          font-weight: 800;
          color: #a7f3d0;
          text-shadow: 0 1px 2px rgba(0,0,0,0.95), 0 0 2px rgba(0,0,0,0.9), 0 0 12px rgba(16,185,129,0.95);
          transform: translate(-50%, -50%);
          animation: hp-particle 1.2s ease-out forwards;
        }
        .hp-ripple {
          position: absolute;
          width: 14px;
          height: 14px;
          border-radius: 9999px;
          border: 2px solid #34d399;
          transform: translate(-50%, -50%);
          animation: hp-ripple 0.65s ease-out forwards;
        }
        @keyframes hp-particle {
          0% { opacity: 1; transform: translate(-50%, -50%) scale(1.15); }
          60% { opacity: 0.85; }
          100% { opacity: 0; transform: translate(calc(-50% + var(--dx)), calc(-50% - 42px)) scale(0.7); }
        }
        @keyframes hp-ripple {
          from { opacity: 0.9; width: 14px; height: 14px; }
          to { opacity: 0; width: 180px; height: 180px; }
        }
        .hp-art {
          clip-path: polygon(-20% -20%, var(--split) -20%, var(--split) 120%, -20% 120%);
          transition: clip-path 0.12s linear;
          animation: hp-art-in 0.55s ease-out;
        }
        .hp-divider {
          left: var(--split);
          transition: left 0.12s linear;
          background: linear-gradient(to bottom, transparent, #34d399 12%, #34d399 88%, transparent);
          box-shadow: 0 0 12px rgba(52,211,153,0.8);
        }
        .hp-parallax {
          transform: translate3d(calc(var(--px, 0) * var(--depth) * 1px), calc(var(--py, 0) * var(--depth) * 1px), 0);
          transition: transform 0.4s ease-out;
        }
        .hp-float { animation: hp-float 5s ease-in-out infinite; }
        .hp-label { animation: hp-art-in 0.4s ease-out; }
        .hp-splash { animation: hp-splash-in 0.6s cubic-bezier(.2,.9,.3,1.3); transform-origin: 30% 50%; }
        .hp-scanlines {
          background: repeating-linear-gradient(to bottom, rgba(0,0,0,0.35) 0 1px, transparent 1px 3px);
          mix-blend-mode: multiply;
        }
        .hp-beam {
          background: linear-gradient(to bottom, transparent, rgba(52,211,153,0.55), transparent);
          animation: hp-beam 2.6s ease-in-out infinite;
        }
        .hp-grid {
          background-image:
            linear-gradient(rgba(186,230,253,0.35) 1px, transparent 1px),
            linear-gradient(90deg, rgba(186,230,253,0.35) 1px, transparent 1px);
          background-size: 18px 18px;
        }
        .hp-glitch-r { opacity: 0.75; animation: hp-glitch-r 1.1s steps(2) infinite; }
        .hp-glitch-c { opacity: 0.75; animation: hp-glitch-c 0.9s steps(2) infinite; }
        .hp-slice { animation: hp-slice 1.6s steps(1) infinite; }

        @keyframes hp-spin { to { transform: rotate(360deg); } }
        @keyframes hp-breathe { 0%,100% { transform: scale(1); } 50% { transform: scale(1.06); } }
        @keyframes hp-float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        @keyframes hp-art-in { from { opacity: 0; filter: blur(6px); } to { opacity: 1; filter: blur(0); } }
        @keyframes hp-splash-in { from { transform: scale(0.4) rotate(-12deg); opacity: 0; } to { transform: scale(1) rotate(0); opacity: 1; } }
        @keyframes hp-beam { 0% { top: -10%; } 100% { top: 100%; } }
        @keyframes hp-glitch-r {
          0%,100% { transform: translate(-3px, 0); } 25% { transform: translate(-6px, 1px); }
          50% { transform: translate(-2px, -1px); } 75% { transform: translate(-5px, 0); }
        }
        @keyframes hp-glitch-c {
          0%,100% { transform: translate(3px, 0); } 25% { transform: translate(5px, -1px); }
          50% { transform: translate(2px, 1px); } 75% { transform: translate(6px, 0); }
        }
        @keyframes hp-slice {
          0% { clip-path: inset(12% 0 80% 0); transform: translateX(-8px); }
          25% { clip-path: inset(58% 0 30% 0); transform: translateX(7px); }
          50% { clip-path: inset(32% 0 60% 0); transform: translateX(-5px); }
          75% { clip-path: inset(76% 0 12% 0); transform: translateX(9px); }
          100% { clip-path: inset(12% 0 80% 0); transform: translateX(-8px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .hp-glow, .hp-spin, .hp-spin-rev, .hp-float, .hp-beam, .hp-glitch-r, .hp-glitch-c, .hp-slice, .hp-art, .hp-splash, .hp-label {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
