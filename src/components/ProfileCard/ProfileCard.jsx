import { useRef } from 'react';

/**
 * Photo card with layered hover effects: 3D tilt, rotating gradient border,
 * glare sweep, scan line, grid overlay, corner brackets and a sliding caption.
 */
export default function ProfileCard({ src, alt, isDark, status, title, subtitle }) {
  const cardRef = useRef(null);

  const handleMove = (e) => {
    const el = cardRef.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.setProperty('--ry', `${(x - 0.5) * 14}deg`);
    el.style.setProperty('--rx', `${(0.5 - y) * 10}deg`);
    el.style.setProperty('--gx', `${x * 100}%`);
    el.style.setProperty('--gy', `${y * 100}%`);
  };

  const handleLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.setProperty('--rx', '0deg');
    el.style.setProperty('--ry', '0deg');
  };

  const bracket = `pc-bracket absolute h-5 w-5 ${isDark ? 'border-emerald-300' : 'border-white'}`;

  return (
    <div className="pc-wrap group mx-auto w-full max-w-[340px]" onPointerMove={handleMove} onPointerLeave={handleLeave}>
      <div ref={cardRef} className={`pc-card relative rounded-2xl p-[2px] ${isDark ? 'pc-dark' : 'pc-light'}`}>
        {/* Rotating gradient border */}
        <div className="pc-border pointer-events-none absolute inset-0 rounded-2xl" aria-hidden="true" />

        <figure className="relative overflow-hidden rounded-[14px] bg-black">
          <img
            src={src}
            alt={alt}
            width="900"
            height="975"
            loading="lazy"
            className="pc-img aspect-[4/5] w-full object-cover object-top"
          />

          {/* Mouse-following spotlight */}
          <div className="pc-spot pointer-events-none absolute inset-0" aria-hidden="true" />
          {/* Grid overlay */}
          <div className="pc-grid pointer-events-none absolute inset-0" aria-hidden="true" />
          {/* Glare sweep */}
          <div className="pc-glare pointer-events-none absolute inset-0" aria-hidden="true" />
          {/* Scan line */}
          <div className="pc-scan pointer-events-none absolute inset-x-0 h-px" aria-hidden="true" />

          {/* Corner brackets */}
          <span className={`${bracket} left-3 top-3 border-l-2 border-t-2`} aria-hidden="true" />
          <span className={`${bracket} right-3 top-3 border-r-2 border-t-2`} aria-hidden="true" />
          <span className={`${bracket} bottom-3 left-3 border-b-2 border-l-2`} aria-hidden="true" />
          <span className={`${bracket} bottom-3 right-3 border-b-2 border-r-2`} aria-hidden="true" />

          {/* Caption */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent px-4 pb-4 pt-16">
            <div className="pc-caption">
              <p className="text-lg font-black uppercase tracking-tight text-white">{title}</p>
              <p className="text-[11px] font-bold text-emerald-300">{subtitle}</p>
            </div>
            <span className="mt-2.5 inline-flex items-center gap-1.5 rounded-full border border-emerald-400/40 bg-black/70 px-2.5 py-1 text-[10px] font-bold text-emerald-300 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
              {status}
            </span>
          </div>
        </figure>
      </div>

      <style>{`
        @property --pc-angle { syntax: '<angle>'; initial-value: 0deg; inherits: false; }
        .pc-wrap { perspective: 1000px; }
        .pc-card {
          transform: rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg));
          transform-style: preserve-3d;
          transition: transform 0.35s ease-out, box-shadow 0.4s ease;
        }
        .pc-dark { background: rgba(16,185,129,0.25); }
        .pc-light { background: rgba(5,150,105,0.3); }
        .group:hover .pc-dark { box-shadow: 0 0 45px rgba(16,185,129,0.35); }
        .group:hover .pc-light { box-shadow: 0 18px 40px rgba(5,150,105,0.25); }
        .pc-border {
          background: conic-gradient(from var(--pc-angle), #10b981, transparent 25%, #2dd4bf 50%, transparent 75%, #10b981);
          opacity: 0;
          transition: opacity 0.4s ease;
          animation: pc-rotate 4s linear infinite;
          -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          -webkit-mask-composite: xor;
          mask: linear-gradient(#000 0 0) content-box exclude, linear-gradient(#000 0 0);
          padding: 2px;
        }
        .group:hover .pc-border { opacity: 1; }
        .pc-img {
          filter: grayscale(0.35) contrast(1.05);
          transform: scale(1);
          transition: transform 0.8s cubic-bezier(.2,.8,.2,1), filter 0.6s ease;
        }
        .group:hover .pc-img { transform: scale(1.07); filter: grayscale(0) contrast(1.08) saturate(1.1); }
        .pc-spot {
          background: radial-gradient(circle at var(--gx, 50%) var(--gy, 30%), rgba(52,211,153,0.22), transparent 45%);
          opacity: 0;
          transition: opacity 0.4s ease;
          mix-blend-mode: screen;
        }
        .group:hover .pc-spot { opacity: 1; }
        .pc-grid {
          background-image:
            linear-gradient(rgba(52,211,153,0.12) 1px, transparent 1px),
            linear-gradient(90deg, rgba(52,211,153,0.12) 1px, transparent 1px);
          background-size: 22px 22px;
          opacity: 0;
          transition: opacity 0.5s ease;
          mix-blend-mode: screen;
        }
        .group:hover .pc-grid { opacity: 1; }
        .pc-glare {
          background: linear-gradient(115deg, transparent 35%, rgba(255,255,255,0.22) 48%, rgba(255,255,255,0.05) 55%, transparent 65%);
          transform: translateX(-120%);
          transition: transform 1s ease;
        }
        .group:hover .pc-glare { transform: translateX(120%); }
        .pc-scan {
          top: 0;
          background: linear-gradient(90deg, transparent, #34d399, transparent);
          box-shadow: 0 0 12px #34d399;
          opacity: 0;
        }
        .group:hover .pc-scan { opacity: 1; animation: pc-scan 2.4s ease-in-out infinite; }
        .pc-bracket { opacity: 0; transform: scale(1.4); transition: opacity 0.35s ease, transform 0.35s ease; }
        .group:hover .pc-bracket { opacity: 1; transform: scale(1); }
        .pc-caption { opacity: 0; transform: translateY(10px); transition: opacity 0.4s ease, transform 0.4s ease; }
        .group:hover .pc-caption { opacity: 1; transform: translateY(0); }
        @keyframes pc-rotate { to { --pc-angle: 360deg; } }
        @keyframes pc-scan { 0% { top: 0%; } 50% { top: 100%; } 100% { top: 0%; } }
        @media (hover: none) {
          .pc-img { filter: none; }
          .pc-caption { opacity: 1; transform: none; }
        }
        @media (prefers-reduced-motion: reduce) {
          .pc-border, .group:hover .pc-scan { animation: none; }
          .pc-card, .pc-img, .pc-glare { transition: none; }
        }
      `}</style>
    </div>
  );
}
