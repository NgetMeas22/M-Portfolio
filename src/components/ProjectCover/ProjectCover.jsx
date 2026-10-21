import { useState } from 'react';
import { Lock } from 'lucide-react';

const hostOf = (url) => {
  if (!url) return null;
  try {
    return new URL(url).host;
  } catch {
    return url.replace(/^https?:\/\//, '');
  }
};

const initialsOf = (title) =>
  title
    .split(/[\s-]+/)
    .filter((w) => /^[A-Za-z0-9]/.test(w))
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();

/**
 * Project preview inside a browser-style frame.
 * Uses `project.cover` when available, otherwise renders a generated terminal cover.
 */
export default function ProjectCover({ project, isDark, size = 'card', className = '' }) {
  const [failed, setFailed] = useState(false);
  const showImage = project.cover && !failed;
  const host = hostOf(project.live) || (project.github || '').replace(/^https?:\/\//, '');
  const isHero = size === 'hero';

  return (
    <div
      className={`relative overflow-hidden ${isHero ? 'rounded-2xl border' : 'border-b'} ${
        isDark ? 'border-emerald-900/60 bg-[#050807]' : 'border-emerald-100 bg-slate-50'
      } ${className}`}
    >
      {/* BROWSER BAR */}
      <div
        className={`flex items-center gap-2 border-b px-3 ${isHero ? 'h-9' : 'h-7'} ${
          isDark ? 'border-emerald-900/60 bg-black/80' : 'border-emerald-100 bg-white'
        }`}
      >
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-2 w-2 rounded-full bg-rose-500/80" />
          <span className="h-2 w-2 rounded-full bg-amber-400/80" />
          <span className="h-2 w-2 rounded-full bg-emerald-500/80" />
        </span>
        <span
          className={`ml-1 min-w-0 flex-1 truncate rounded px-2 py-0.5 font-mono text-[10px] ${
            isDark ? 'bg-emerald-950/40 text-slate-500' : 'bg-slate-100 text-slate-500'
          }`}
        >
          {project.live && <Lock className="mr-1 inline h-2.5 w-2.5 -translate-y-px" />}
          {host}
        </span>
      </div>

      {/* VIEWPORT */}
      <div className={`relative overflow-hidden ${isHero ? 'aspect-[16/9]' : 'aspect-[16/10]'}`}>
        {showImage ? (
          <img
            src={project.cover}
            alt={`${project.title} preview`}
            loading={isHero ? 'eager' : 'lazy'}
            decoding="async"
            onError={() => setFailed(true)}
            className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
        ) : (
          <div
            className={`grid-pattern relative flex h-full w-full flex-col items-center justify-center gap-3 ${
              isDark
                ? 'bg-gradient-to-br from-emerald-950/70 via-black to-black'
                : 'bg-gradient-to-br from-emerald-100 via-white to-emerald-50'
            }`}
          >
            <span
              className={`flex items-center justify-center rounded-2xl border font-mono font-black tracking-tight transition-transform duration-500 group-hover:scale-110 ${
                isHero ? 'h-24 w-24 text-4xl' : 'h-16 w-16 text-2xl'
              } ${
                isDark
                  ? 'border-emerald-500/40 bg-black/70 text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.25)]'
                  : 'border-emerald-300 bg-white text-emerald-700 shadow-sm'
              }`}
            >
              {initialsOf(project.title)}
            </span>
            <span className={`font-mono text-[11px] ${isDark ? 'text-emerald-600' : 'text-emerald-700'}`}>
              {'>_ '}
              {project.technologies.slice(0, 3).join(' · ')}
            </span>
          </div>
        )}

        {/* Bottom fade so overlaid badges stay readable */}
        <div
          className={`pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t ${
            isDark ? 'from-black/70' : 'from-black/25'
          } to-transparent`}
        />
      </div>
    </div>
  );
}
