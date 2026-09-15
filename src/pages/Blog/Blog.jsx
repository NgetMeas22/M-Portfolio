import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Calendar, 
  Clock, 
  Tag, 
  ArrowRight, 
  Terminal, 
  Radio, 
  Activity, 
  FileCode2, 
  BookmarkCheck,
  Flame
} from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';
import { useTheme } from '../../hooks/useTheme';
import { blogPosts } from '../../data/blog';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Blog() {
  const { t, language } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    AOS.init({ duration: 800, easing: 'ease-out-cubic', once: true, offset: 60 });
  }, []);

  const formatDate = (date) =>
    new Date(date).toLocaleDateString(language === 'kh' ? 'km-KH' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

  return (
    <section
      id="blog"
      className={`relative min-h-screen pt-28 lg:pt-36 pb-24 font-mono transition-colors duration-300 overflow-hidden ${
        isDark ? 'bg-[#030504] text-emerald-400' : 'bg-[#f4f7f5] text-slate-900'
      }`}
    >
      {/* AMBIENT GLOW BACKDROPS */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div
          className="absolute -left-20 top-24 h-96 w-96 rounded-full blur-3xl animate-blob"
          style={{
            background: isDark
              ? 'radial-gradient(circle, rgba(16,185,129,0.08), transparent 70%)'
              : 'radial-gradient(circle, rgba(16,185,129,0.12), transparent 70%)',
          }}
        />
        <div
          className="absolute bottom-12 right-0 h-96 w-96 rounded-full blur-3xl animate-flicker"
          style={{
            background: isDark
              ? 'radial-gradient(circle, rgba(45,212,191,0.06), transparent 70%)'
              : 'radial-gradient(circle, rgba(20,184,166,0.1), transparent 70%)',
          }}
        />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* HEADER */}
        <div className="mb-12 text-center" data-aos="fade-up">
          <span
            className={`mb-4 inline-flex items-center gap-2 border px-3.5 py-1 text-xs uppercase tracking-wider font-bold ${
              isDark
                ? 'border-emerald-500/40 bg-emerald-950/40 text-emerald-300'
                : 'border-emerald-600/30 bg-emerald-100/60 text-emerald-900'
            }`}
          >
            <Terminal className="h-3.5 w-3.5" />
            {'>_ journal.syslog'}
          </span>
          <h1
            className={`text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
            style={{
              textShadow: isDark
                ? '0 0 30px rgba(16, 185, 129, 0.45)'
                : '0 0 20px rgba(5, 150, 105, 0.15)',
            }}
          >
            {t.blog.title}
          </h1>
          <p
            className={`mx-auto mt-3 max-w-2xl text-base sm:text-lg ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}
          >
            {t.blog.subtitle}
          </p>
        </div>

        {/* BLOG TELEMETRY HUD STRIP */}
        <div
          className={`mb-14 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 border p-4 sm:p-5 rounded-xl ${
            isDark
              ? 'border-emerald-500/30 bg-black/60 shadow-[0_0_20px_rgba(16,185,129,0.1)]'
              : 'border-emerald-200 bg-white shadow-xs'
          }`}
          data-aos="fade-up"
        >
          <div className="space-y-0.5">
            <span className={`text-[10px] uppercase tracking-wider font-bold ${isDark ? 'text-emerald-600' : 'text-emerald-700'}`}>
              ARTICLES PUBLISHED
            </span>
            <div className={`text-xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {blogPosts.length} DISPATCHES
            </div>
          </div>
          <div className="space-y-0.5">
            <span className={`text-[10px] uppercase tracking-wider font-bold ${isDark ? 'text-emerald-600' : 'text-emerald-700'}`}>
              CONTENT STREAM
            </span>
            <div className="text-xl font-black text-emerald-500 flex items-center gap-1.5">
              <Activity className="h-4 w-4 animate-spin" /> LIVE_SYNC
            </div>
          </div>
          <div className="space-y-0.5">
            <span className={`text-[10px] uppercase tracking-wider font-bold ${isDark ? 'text-emerald-600' : 'text-emerald-700'}`}>
              KNOWLEDGE DOMAIN
            </span>
            <div className={`text-xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
              WEB & DEV OPS
            </div>
          </div>
          <div className="space-y-0.5">
            <span className={`text-[10px] uppercase tracking-wider font-bold ${isDark ? 'text-emerald-600' : 'text-emerald-700'}`}>
              READ INTEGRITY
            </span>
            <div className="text-xl font-black text-emerald-500 flex items-center gap-1.5">
              <BookmarkCheck className="h-4 w-4" /> PEER_VERIFIED
            </div>
          </div>
        </div>

        {/* ARTICLES GRID */}
        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post, index) => {
            const title = language === 'kh' ? post.titleKh : post.title;
            const excerpt = language === 'kh' ? post.excerptKh : post.excerpt;

            return (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                data-aos="fade-up"
                data-aos-delay={Math.min(index * 60, 300)}
                className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border p-6 sm:p-7 transition-all duration-300 no-underline ${
                  isDark
                    ? 'border-emerald-900/60 bg-black/90 hover:border-emerald-400 hover:shadow-[0_0_30px_rgba(16,185,129,0.15)]'
                    : 'border-emerald-200 bg-white hover:border-emerald-500 hover:shadow-lg shadow-xs'
                }`}
              >
                {/* HUD CORNER RETICLES */}
                <span className={`absolute top-2 left-2 h-2.5 w-2.5 border-t-2 border-l-2 ${isDark ? 'border-emerald-500/40 group-hover:border-emerald-400' : 'border-emerald-300 group-hover:border-emerald-600'}`} />
                <span className={`absolute top-2 right-2 h-2.5 w-2.5 border-t-2 border-r-2 ${isDark ? 'border-emerald-500/40 group-hover:border-emerald-400' : 'border-emerald-300 group-hover:border-emerald-600'}`} />
                <span className={`absolute bottom-2 left-2 h-2.5 w-2.5 border-b-2 border-l-2 ${isDark ? 'border-emerald-500/40 group-hover:border-emerald-400' : 'border-emerald-300 group-hover:border-emerald-600'}`} />
                <span className={`absolute bottom-2 right-2 h-2.5 w-2.5 border-b-2 border-r-2 ${isDark ? 'border-emerald-500/40 group-hover:border-emerald-400' : 'border-emerald-300 group-hover:border-emerald-600'}`} />

                <div>
                  {/* CARD TOP META BAR */}
                  <div
                    className={`flex items-center justify-between border-b pb-3 mb-4 text-xs ${
                      isDark ? 'border-emerald-950' : 'border-emerald-100'
                    }`}
                  >
                    <span className={`font-mono text-[11px] font-bold flex items-center gap-1.5 ${isDark ? 'text-emerald-500' : 'text-emerald-800'}`}>
                      <FileCode2 className="h-3.5 w-3.5" /> POST // #{String(index + 1).padStart(2, '0')}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1.5 text-[10px] uppercase font-bold px-2 py-0.5 rounded border ${
                        isDark
                          ? 'border-emerald-900 bg-emerald-950/40 text-emerald-400'
                          : 'border-emerald-200 bg-emerald-50 text-emerald-800'
                      }`}
                    >
                      <Radio className="h-2.5 w-2.5 animate-pulse text-emerald-500" />
                      DISPATCH
                    </span>
                  </div>

                  {/* DATE & TAGS */}
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span
                      className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-2 py-0.5 rounded border ${
                        isDark
                          ? 'border-emerald-900/60 bg-black text-slate-300'
                          : 'border-emerald-200 bg-emerald-50 text-emerald-900'
                      }`}
                    >
                      <Calendar className="h-3 w-3 text-emerald-500" />
                      {formatDate(post.date)}
                    </span>
                    {post.tags[0] && (
                      <span
                        className={`text-[11px] font-bold px-2 py-0.5 rounded border ${
                          isDark
                            ? 'border-emerald-500/30 bg-emerald-950/40 text-emerald-400'
                            : 'border-emerald-300 bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        #{post.tags[0]}
                      </span>
                    )}
                  </div>

                  {/* TITLE */}
                  <h3
                    className={`text-lg sm:text-xl font-bold uppercase tracking-tight transition-colors mb-2 ${
                      isDark ? 'text-white group-hover:text-emerald-400' : 'text-slate-900 group-hover:text-emerald-700'
                    }`}
                  >
                    {title}
                  </h3>

                  {/* EXCERPT */}
                  <p
                    className={`text-xs sm:text-sm leading-relaxed line-clamp-3 mb-4 ${
                      isDark ? 'text-slate-400' : 'text-slate-600'
                    }`}
                  >
                    {excerpt}
                  </p>
                </div>

                {/* BOTTOM METADATA & LINK */}
                <div>
                  <div
                    className={`flex items-center gap-3 text-xs mb-4 ${
                      isDark ? 'text-slate-500' : 'text-slate-500'
                    }`}
                  >
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-emerald-500" />
                      {language === 'en' ? `${post.readTime} ${t.blog.readTime}` : post.readTime}
                    </span>

                    {post.tags.slice(1).length > 0 && (
                      <div className="flex flex-wrap items-center gap-1.5">
                        <Tag className="h-3 w-3 text-emerald-500" />
                        {post.tags.slice(1).map((tg) => (
                          <span
                            key={tg}
                            className={`text-[10px] ${
                              isDark ? 'text-emerald-600' : 'text-slate-500'
                            }`}
                          >
                            #{tg}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* CARD FOOTER */}
                  <div
                    className={`flex items-center justify-between border-t pt-4 text-xs font-bold uppercase tracking-wider ${
                      isDark ? 'border-emerald-950 text-emerald-400' : 'border-emerald-100 text-emerald-700'
                    }`}
                  >
                    <span>{t.blog.readMore}</span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}