import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Tag, 
  Terminal, 
  Copy, 
  Check, 
  FileCode, 
  Radio, 
  AlertTriangle,
  BookmarkCheck
} from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';
import { useTheme } from '../../hooks/useTheme';
import { blogPosts } from '../../data/blog';
import AOS from 'aos';
import 'aos/dist/aos.css';

function formatInline(text) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, index) =>
    part.startsWith('**') && part.endsWith('**') ? (
      <strong key={index} className="font-bold text-emerald-500">
        {part.slice(2, -2)}
      </strong>
    ) : (
      part
    )
  );
}

function CodeBlock({ lang, code, isDark }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`my-6 overflow-hidden rounded-xl border font-mono text-xs sm:text-sm shadow-md transition-all ${
        isDark ? 'border-emerald-900/60 bg-black/95' : 'border-emerald-200 bg-slate-900 text-slate-100'
      }`}
    >
      <div
        className={`flex items-center justify-between border-b px-4 py-2 text-xs ${
          isDark ? 'border-emerald-950 bg-emerald-950/40 text-emerald-400' : 'border-slate-800 bg-slate-950 text-slate-300'
        }`}
      >
        <div className="flex items-center gap-2">
          <FileCode className="h-3.5 w-3.5 text-emerald-500" />
          <span className="font-bold uppercase tracking-wider">{lang || 'CODE'}</span>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className={`flex items-center gap-1.5 px-2 py-1 rounded text-[10px] font-bold uppercase transition-all cursor-pointer ${
            isDark
              ? 'border border-emerald-900 bg-black text-emerald-400 hover:border-emerald-400'
              : 'border border-slate-700 bg-slate-800 text-slate-300 hover:border-emerald-500 hover:text-emerald-400'
          }`}
        >
          {copied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
          {copied ? 'COPIED' : 'COPY'}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 leading-relaxed">
        <code className="text-emerald-300">{code}</code>
      </pre>
    </div>
  );
}

export default function BlogPost() {
  const { slug } = useParams();
  const { t, language } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    AOS.init({ duration: 800, easing: 'ease-out-cubic', once: true, offset: 60 });
  }, []);

  const post = blogPosts.find((p) => p.slug === slug);

  const formatDate = (date) =>
    new Date(date).toLocaleDateString(language === 'kh' ? 'km-KH' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

  const renderContent = (content) => {
    const segments = content.split('```');

    return segments.map((segment, segmentIndex) => {
      if (segmentIndex % 2 === 1) {
        const newlineIndex = segment.indexOf('\n');
        const lang = newlineIndex !== -1 ? segment.slice(0, newlineIndex).trim() : segment.trim();
        const code = newlineIndex !== -1 ? segment.slice(newlineIndex + 1) : '';

        return <CodeBlock code={code} isDark={isDark} key={segmentIndex} lang={lang} />;
      }

      return segment
        .split('\n\n')
        .filter((block) => block.trim().length > 0)
        .map((block, blockIndex) => {
          const blockKey = `${segmentIndex}-${blockIndex}`;
          const lines = block.trim().split('\n');

          if (lines.every((line) => line.trim().startsWith('- '))) {
            return (
              <ul
                key={blockKey}
                className={`my-4 space-y-2 border-l-2 pl-4 ${
                  isDark ? 'border-emerald-500/40 text-slate-300' : 'border-emerald-600/40 text-slate-700'
                }`}
              >
                {lines.map((line, lineIndex) => (
                  <li key={lineIndex} className="flex items-start gap-2 text-sm sm:text-base leading-relaxed">
                    <span className="text-emerald-500 font-bold mt-0.5">&gt;</span>
                    <span>{formatInline(line.trim().slice(2))}</span>
                  </li>
                ))}
              </ul>
            );
          }

          if (lines.length === 1 && lines[0].trim().startsWith('## ')) {
            return (
              <h2
                key={blockKey}
                className={`mb-4 mt-8 font-mono text-xl sm:text-2xl font-bold uppercase tracking-tight flex items-center gap-2 ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}
              >
                <span className="text-emerald-500">//</span>
                {formatInline(lines[0].trim().slice(3))}
              </h2>
            );
          }

          return (
            <p
              key={blockKey}
              className={`mb-5 text-sm sm:text-base leading-relaxed ${
                isDark ? 'text-slate-300' : 'text-slate-700'
              }`}
            >
              {formatInline(block.trim())}
            </p>
          );
        });
    });
  };

  if (!post) {
    return (
      <section
        className={`relative flex min-h-screen items-center justify-center px-4 pt-28 lg:pt-36 pb-24 font-mono transition-colors duration-300 ${
          isDark ? 'bg-[#030504] text-emerald-400' : 'bg-[#f4f7f5] text-slate-900'
        }`}
      >
        <div className="text-center max-w-md p-8 border rounded-2xl border-dashed border-emerald-500/40 bg-black/40">
          <span className="inline-flex items-center gap-2 border px-3 py-1 text-xs uppercase font-bold border-rose-500/40 bg-rose-950/40 text-rose-400 mb-4">
            <AlertTriangle className="h-3.5 w-3.5"/>
            404 // DISPATCH_NOT_FOUND
          </span>
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight mb-3">
            &gt;&gt;_ NULL_RECORD
          </h1>
          <p className="text-sm mb-6 text-slate-400 leading-relaxed">
            {t.blog.notFound || 'The requested transmission article could not be loaded from syslog.'}
          </p>
          <Link
            to="/blog"
            className={`inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-wider font-mono rounded-xl transition-all duration-200 ${
              isDark
                ? 'bg-primary text-black hover:bg-primary-dim hover:shadow-[0_0_15px_rgba(16,185,129,0.35)]'
                : 'bg-emerald-600 text-white hover:bg-emerald-700 hover:shadow-[0_0_15px_rgba(5,150,105,0.3)]'
            }`}
          >
            <ArrowLeft size={16} />
            {t.blog.backToBlog}
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section
      id="blog-post"
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

      <div className="relative mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">

        {/* TOP BACK BUTTON */}
        <Link
          to="/blog"
          className={`inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 font-mono text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
            isDark
              ? 'text-primary border-primary/30 bg-primary/10 hover:bg-primary/20 hover:shadow-[0_0_10px_rgba(16,185,129,0.2)]'
              : 'text-primary-dim border-primary-dim/30 bg-primary-dim/10 hover:bg-primary-dim/20'
          }`}
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          {t.blog.backToBlog}
        </Link>

        {/* ARTICLE HUD CONTAINER */}
        <article
          className={`relative overflow-hidden rounded-2xl border shadow-2xl transition-all ${
            isDark
              ? 'border-emerald-500/40 bg-[#050807] shadow-[0_0_40px_rgba(16,185,129,0.15)]'
              : 'border-emerald-200 bg-white shadow-emerald-950/5'
          }`}
          data-aos="fade-up"
        >
          {/* HUD RETICLE CORNERS */}
          <span className={`absolute top-2 left-2 h-3 w-3 border-t-2 border-l-2 ${isDark ? 'border-emerald-400' : 'border-emerald-600'}`} />
          <span className={`absolute top-2 right-2 h-3 w-3 border-t-2 border-r-2 ${isDark ? 'border-emerald-400' : 'border-emerald-600'}`} />
          <span className={`absolute bottom-2 left-2 h-3 w-3 border-b-2 border-l-2 ${isDark ? 'border-emerald-400' : 'border-emerald-600'}`} />
          <span className={`absolute bottom-2 right-2 h-3 w-3 border-b-2 border-r-2 ${isDark ? 'border-emerald-400' : 'border-emerald-600'}`} />

          {/* ARTICLE TITLEBAR & METADATA */}
          <div className="p-6 sm:p-9 border-b border-emerald-500/20">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <span
                className={`inline-flex items-center gap-2 border px-3 py-1 text-xs uppercase tracking-wider font-bold ${
                  isDark
                    ? 'border-emerald-500/40 bg-emerald-950/40 text-emerald-300'
                    : 'border-emerald-600/30 bg-emerald-100/60 text-emerald-900'
                }`}
              >
                <Terminal className="h-3.5 w-3.5"/>
                {'>_ post.log'}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-emerald-500 font-bold">
                <Radio className="h-3 w-3 animate-pulse"/> RECORD_VERIFIED
              </span>
            </div>

            <h1
              className={`text-2xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight leading-tight mb-5 ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
              style={{
                textShadow: isDark
                  ? '0 0 25px rgba(16, 185, 129, 0.35)'
                  : '0 0 15px rgba(5, 150, 105, 0.12)',
              }}
            >
              {language === 'kh' ? post.titleKh : post.title}
            </h1>

            {/* METADATA CHIPS */}
            <div className="flex flex-wrap items-center gap-2.5 text-xs">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded border font-bold ${
                  isDark ? 'border-emerald-900 bg-black text-slate-300' : 'border-emerald-200 bg-emerald-50 text-emerald-900'
                }`}
              >
                <Calendar className="h-3.5 w-3.5 text-emerald-500"/>
                {t.blog.publishedOn} {formatDate(post.date)}
              </span>
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded border font-bold ${
                  isDark ? 'border-emerald-900 bg-black text-slate-300' : 'border-emerald-200 bg-emerald-50 text-emerald-900'
                }`}
              >
                <Clock className="h-3.5 w-3.5 text-emerald-500"/>
                {language === 'en' ? `${post.readTime} ${t.blog.readTime}` : post.readTime}
              </span>
              <span
                className={`inline-flex items-center gap-1 px-3 py-1 rounded border font-bold ${
                  isDark ? 'border-emerald-500/30 bg-emerald-950/40 text-emerald-400' : 'border-emerald-300 bg-emerald-100 text-emerald-800'
                }`}
              >
                AUTHOR: {t.hero.name}
              </span>
            </div>

            {/* TAGS */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-4 flex flex-wrap items-center gap-2 pt-3 border-t border-emerald-500/15">
                <Tag className="h-3.5 w-3.5 text-emerald-500"/>
                <span className={`text-[11px] uppercase font-bold tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  {t.blog.tags}:
                </span>
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`text-[11px] font-mono px-2 py-0.5 rounded border ${
                      isDark
                        ? 'border-emerald-950 bg-black/60 text-emerald-500'
                        : 'border-emerald-200 bg-white text-emerald-800'
                    }`}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* TELEMETRY SUB-STRIP */}
          <div
            className={`grid grid-cols-2 sm:grid-cols-4 border-b px-6 py-2.5 text-[10px] sm:text-xs uppercase tracking-wider font-bold ${
              isDark ? 'border-emerald-950 bg-black/80 text-emerald-600' : 'border-emerald-100 bg-emerald-50/50 text-emerald-800'
            }`}
          >
            <div>CHARSET: UTF-8</div>
            <div>STATUS: COMPILED</div>
            <div>SECURITY: SIGNED</div>
            <div className="text-right text-emerald-500">LIVE_DOCUMENT</div>
          </div>

          {/* TERMINAL CONTENT READER */}
          <div className={`p-6 sm:p-9 ${isDark ? 'bg-black/40' : 'bg-white'}`}>
            <div
              className={`flex items-center justify-between border-b pb-3 mb-6 text-xs font-mono ${
                isDark ? 'border-emerald-950 text-slate-500' : 'border-emerald-100 text-slate-500'
              }`}
            >
              <span>$ cat ./{post.slug}.md</span>
              <span className="flex items-center gap-1">
                <BookmarkCheck className="h-3.5 w-3.5 text-emerald-500"/>
                CHECKSUM: 0x9B4
              </span>
            </div>

            {/* PARSED MARKDOWN CONTENT */}
            <div className="prose-hacker">
              {renderContent(post.content)}
            </div>
          </div>
        </article>

        {/* BOTTOM RETURN TRIGGER */}
        <div className="mt-10 text-center">
          <Link
            to="/blog"
            className={`inline-flex items-center gap-2 border px-6 py-3 rounded-xl shadow-xs text-xs sm:text-sm font-bold uppercase tracking-wider transition-all ${
              isDark
                ? 'border-emerald-500/40 bg-black text-emerald-400 hover:bg-emerald-950/40 hover:border-emerald-500'
                : 'border-emerald-300 bg-white text-emerald-800 hover:bg-emerald-50 hover:border-emerald-300'
            }`}
          >
            <ArrowLeft className="h-4 w-4"/>
            {t.blog.backToBlog}
          </Link>
        </div>

      </div>
    </section>
  );
}