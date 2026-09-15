import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Tag, BookOpen } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';
import { useTheme } from '../../hooks/useTheme';
import { blogPosts } from '../../data/blog';
import AOS from 'aos';
import 'aos/dist/aos.css';

function formatInline(text) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, index) =>
    part.startsWith('**') && part.endsWith('**') ? (
      <strong key={index} className="font-semibold">
        {part.slice(2, -2)}
      </strong>
    ) : (
      part
    )
  );
}

function BlogPost() {
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
      month: 'long',
      day: 'numeric',
    });

  const renderContent = (content) => {
    const segments = content.split('```');

    return segments.map((segment, segmentIndex) => {
      if (segmentIndex % 2 === 1) {
        const newlineIndex = segment.indexOf('\n');
        const lang =
          newlineIndex !== -1 ? segment.slice(0, newlineIndex).trim() : segment.trim();
        const code = newlineIndex !== -1 ? segment.slice(newlineIndex + 1) : '';

        return (
          <pre
            key={segmentIndex}
            className={`overflow-x-auto rounded-lg border p-4 text-sm leading-relaxed font-mono ${
              isDark
                ? 'bg-dark-900 border-dark-600 text-emerald-300'
                : 'bg-slate-800 text-emerald-300 border-slate-200'
            }`}
          >
            {lang && (
              <span
                className={`mb-2 block text-xs uppercase tracking-wider ${
                  isDark ? 'text-primary' : 'text-green-500'
                }`}
              >
                {lang}
              </span>
            )}
            <code>{code}</code>
          </pre>
        );
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
                className={`ml-4 mb-4 list-disc space-y-1.5 pl-2 ${
                  isDark ? 'text-slate-300' : 'text-slate-700'
                }`}
              >
                {lines.map((line, lineIndex) => (
                  <li key={lineIndex}>{formatInline(line.trim().slice(2))}</li>
                ))}
              </ul>
            );
          }

          if (lines.length === 1 && lines[0].trim().startsWith('## ')) {
            return (
              <h2
                key={blockKey}
                className={`mb-3 mt-1 font-mono text-2xl font-bold ${
                  isDark ? 'text-primary' : 'text-slate-900'
                }`}
              >
                {formatInline(lines[0].trim().slice(3))}
              </h2>
            );
          }

          return (
            <p
              key={blockKey}
              className={`mb-4 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}
            >
              {formatInline(block.trim())}
            </p>
          );
        });
    });
  };

  if (!post) {
    return (
      <section className="grid-bg grid-pattern relative min-h-screen pt-28 lg:pt-32 pb-16">
        <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="card" data-aos="fade-up">
            <h1 className="section-title text-3xl sm:text-4xl">{t.blog.title}</h1>
            <p className={`mt-4 text-lg ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              {t.blog.notFound}
            </p>
            <Link to="/blog" className="btn-primary mt-6 inline-flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              {t.blog.backToBlog}
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="grid-bg grid-pattern relative min-h-screen pt-28 lg:pt-32 pb-16">
      <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8">
        <Link
          to="/blog"
          className="btn-outline mb-6 inline-flex items-center gap-2"
          data-aos="fade-up"
        >
          <ArrowLeft className="h-4 w-4" />
          {t.blog.backToBlog}
        </Link>

        <article className="card overflow-hidden" data-aos="fade-up">
          <div className="border-b border-white/5 p-6">
            <span className="cyber-badge mb-4 inline-flex items-center gap-2">
              <BookOpen className="h-3.5 w-3.5" />
              &gt;_ post.log
            </span>

            <h1
              className={`mb-4 font-mono text-3xl sm:text-4xl font-bold leading-tight ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              {language === 'kh' ? post.titleKh : post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-2">
              <span className="tag">{t.hero.name}</span>
              <span className="tag inline-flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                {t.blog.publishedOn} {formatDate(post.date)}
              </span>
              <span className="tag inline-flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                {language === 'en' ? `${post.readTime} ${t.blog.readTime}` : post.readTime}
              </span>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <Tag className={`h-4 w-4 ${isDark ? 'text-secondary' : 'text-green-600'}`} />
              <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                {t.blog.tags}
              </span>
              {post.tags.map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className={`border-t border-white/5 ${isDark ? 'bg-dark-800' : 'bg-slate-50'}`}>
            <div
              className={`flex items-center gap-2 border-b px-4 py-2.5 ${
                isDark ? 'border-white/5 bg-dark-900' : 'border-slate-200'
              }`}
            >
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-teal-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
              <span
                className={`ml-2 font-mono text-xs tracking-widest uppercase ${
                  isDark ? 'text-secondary' : 'text-slate-500'
                }`}
              >
                &gt;_ {post.slug}.log
              </span>
              <span className="terminal-cursor" />
            </div>
            <div className="p-6 text-base sm:text-lg">{renderContent(post.content)}</div>
          </div>
        </article>

        <div className="mt-8 text-center">
          <Link to="/blog" className="btn-outline inline-flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            {t.blog.backToBlog}
          </Link>
        </div>
      </div>
    </section>
  );
}

export default BlogPost;
