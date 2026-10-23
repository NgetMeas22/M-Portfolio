import { useEffect } from 'react';
import { X } from 'lucide-react';

/**
 * Turn a demo-video value into something playable.
 * Supports local files (/projects/videos/x.mp4), YouTube, Vimeo and Google Drive share links.
 */
const resolveVideo = (src) => {
  if (!src) return null;
  const yt = src.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/);
  if (yt) return { kind: 'embed', url: `https://www.youtube-nocookie.com/embed/${yt[1]}?autoplay=1&rel=0` };
  const vimeo = src.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeo) return { kind: 'embed', url: `https://player.vimeo.com/video/${vimeo[1]}?autoplay=1` };
  const drive = src.match(/drive\.google\.com\/file\/d\/([\w-]+)/);
  if (drive) return { kind: 'embed', url: `https://drive.google.com/file/d/${drive[1]}/preview` };
  return { kind: 'file', url: src };
};

export default function VideoModal({ open, onClose, src, title, isDark }) {
  const video = resolveVideo(src);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open || !video) return null;

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/85 p-3 sm:p-8 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${title} demo video`}
    >
      <div
        className={`w-full max-w-5xl overflow-hidden rounded-2xl border font-mono ${
          isDark ? 'border-emerald-500/40 bg-[#050807] shadow-[0_0_50px_rgba(16,185,129,0.25)]' : 'border-emerald-200 bg-white shadow-2xl'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={`flex items-center justify-between gap-3 border-b px-4 py-2.5 text-xs ${
            isDark ? 'border-emerald-900/60 text-slate-300' : 'border-emerald-100 text-slate-700'
          }`}
        >
          <div className="flex min-w-0 items-center gap-2">
            <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-red-500/80" />
            <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-yellow-500/80" />
            <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-500/80" />
            <span className="ml-2 truncate font-bold">{`>_ ${title} — demo`}</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className={`inline-flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-lg border transition-colors ${
              isDark ? 'border-emerald-500/30 text-emerald-300 hover:bg-emerald-950/60' : 'border-emerald-200 text-emerald-800 hover:bg-emerald-50'
            }`}
            aria-label="Close video"
            autoFocus
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="aspect-video w-full bg-black">
          {video.kind === 'embed' ? (
            <iframe
              src={video.url}
              title={`${title} demo video`}
              className="h-full w-full"
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
            />
          ) : (
            <video
              key={video.url}
              src={video.url}
              className="h-full w-full"
              controls
              autoPlay
              muted
              playsInline
            >
              <source src={video.url} type="video/mp4" />
              <source src={video.url} type="video/quicktime" />
              Your browser does not support the video tag.
            </video>
          )}
        </div>
      </div>
    </div>
  );
}
