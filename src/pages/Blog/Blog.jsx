import { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, Terminal } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';
import { useTheme } from '../../hooks/useTheme';
import { blogPosts } from '../../data/blog';
import PageBackground from '../../components/PageBackground/PageBackground.jsx';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Blog() {
  const { t, language } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const isKh = language === 'kh';

  useEffect(() => {
    AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true, offset: 60 });
  }, []);

  const posts = useMemo(
    () => [...blogPosts].sort((a, b) => new Date(b.date) - new Date(a.date)),
    []
  );
  const [featured, ...rest] = posts;

  const formatDate = (date) =>
    new Date(date).toLocaleDateString(isKh ? 'km-KH' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

  const readTime = (post) => (isKh ? post.readTime : `${post.readTime} ${t.blog.readTime}`);

  const renderMeta = (post) => (
    <div className={`flex flex-wrap items-center gap-x-4 gap-y-1 text-xs ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
      <span className="inline-flex items-center gap-1.5">
        <Calendar className="h-3.5 w-3.5 text-emerald-500" />
        {formatDate(post.date)}
      </span>
      <span className="inline-flex items-center gap-1.5">
        <Clock className="h-3.5 w-3.5 text-emerald-500" />
        {readTime(post)}
      </span>
    </div>
  );

  const renderTags = (post, max = 3) => (
    <div className="flex flex-wrap gap-1.5">
      {post.tags.slice(0, max).map((tag) => (
        <span
          key={tag}
          className={`rounded border px-2 py-0.5 text-[10px] font-bold ${
            isDark
              ? 'border-emerald-900 bg-emerald-950/30 text-emerald-500'
              : 'border-emerald-100 bg-emerald-50 text-emerald-800'
          }`}
        >
          #{tag}
        </span>
      ))}
    </div>
  );

  const cardBase = isDark
    ? 'border-emerald-900/60 bg-black/80 hover:border-emerald-500/70 hover:shadow-[0_0_24px_rgba(16,185,129,0.12)]'
    : 'border-emerald-200 bg-white shadow-xs hover:border-emerald-500 hover:shadow-md';

  return (
    <section
      id="blog"
      className={`grid-bg grid-pattern relative min-h-screen pt-20 sm:pt-28 lg:pt-36 pb-12 sm:pb-24 font-mono transition-colors duration-300 overflow-hidden ${
        isDark
          ? 'bg-[#030504] text-emerald-400 selection:bg-emerald-500 selection:text-black'
          : 'bg-[#f4f7f5] text-slate-900 selection:bg-emerald-600 selection:text-white'
      }`}
    >
      <PageBackground isDark={isDark} />

      <div className="relative mx-auto w-full max-w-4xl px-3.5 sm:px-6 lg:px-8">

        {/* HEADER */}
        <div className="mb-8 sm:mb-12 text-center" data-aos="fade-up">
          <span
            className={`mb-2 sm:mb-4 inline-flex items-center gap-1.5 sm:gap-2 border px-2.5 sm:px-3.5 py-1 text-[11px] sm:text-xs uppercase tracking-wider font-bold rounded ${
              isDark
                ? 'border-emerald-500/40 bg-emerald-950/40 text-emerald-300'
                : 'border-emerald-600/30 bg-emerald-100/60 text-emerald-900'
            }`}
          >
            <Terminal className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
            {'>_ journal.syslog'}
          </span>
          <h1
            className={`text-2xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight ${
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
            className={`mx-auto mt-2 sm:mt-3 max-w-xl text-xs sm:text-base ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}
          >
            {t.blog.subtitle}
          </p>
        </div>

        {/* FEATURED (LATEST) POST */}
        {featured && (
          <Link
            to={`/blog/${featured.slug}`}
            data-aos="fade-up"
            className={`group mb-6 block rounded-2xl border-2 p-5 sm:p-7 no-underline transition-all duration-200 ${cardBase}`}
          >
            <span
              className={`mb-3 inline-block rounded px-2 py-0.5 text-[10px] font-black uppercase tracking-wider ${
                isDark ? 'bg-emerald-500 text-black' : 'bg-emerald-600 text-white'
              }`}
            >
              {t.blog.latest}
            </span>
            <h2
              className={`text-xl sm:text-2xl font-bold tracking-tight ${
                isDark ? 'text-white group-hover:text-emerald-300' : 'text-slate-900 group-hover:text-emerald-700'
              }`}
            >
              {isKh ? featured.titleKh : featured.title}
            </h2>
            <p className={`mt-2 text-sm leading-relaxed line-clamp-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              {isKh ? featured.excerptKh : featured.excerpt}
            </p>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              {renderMeta(featured)}
              <span className={`inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>
                {t.blog.readMore}
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        )}

        {/* OTHER POSTS */}
        <div className="space-y-3 sm:space-y-4">
          {rest.map((post, index) => (
            <Link
              key={post.id}
              to={`/blog/${post.slug}`}
              data-aos="fade-up"
              data-aos-delay={Math.min(index * 60, 240)}
              className={`group flex items-center gap-4 rounded-2xl border p-4 sm:p-5 no-underline transition-all duration-200 ${cardBase}`}
            >
              <div className="min-w-0 flex-1">
                {renderMeta(post)}
                <h3
                  className={`mt-1.5 text-base sm:text-lg font-bold tracking-tight ${
                    isDark ? 'text-white group-hover:text-emerald-300' : 'text-slate-900 group-hover:text-emerald-700'
                  }`}
                >
                  {isKh ? post.titleKh : post.title}
                </h3>
                <p className={`mt-1 text-sm leading-relaxed line-clamp-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  {isKh ? post.excerptKh : post.excerpt}
                </p>
                <div className="mt-2.5">
                  {renderTags(post)}
                </div>
              </div>
              <ArrowRight
                className={`h-5 w-5 shrink-0 transition-transform duration-200 group-hover:translate-x-1 ${
                  isDark ? 'text-emerald-500' : 'text-emerald-700'
                }`}
              />
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
