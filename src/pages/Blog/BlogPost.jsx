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
            className={`overflow-x-auto rounded-xl p-4 text-sm leading-relaxed ${
              isDark
                ? 'bg-slate-900 border border-slate-700/60 text-emerald-300'
                : 'bg-slate-800 text-emerald-300 border border-slate-200'
            }`}
          >
            {lang && (
              <span className={`mb-2 block text-xs uppercase tracking-wider ${isDark ? 'text-primary' : 'text-green-500'}`}>
                {lang}
              </span>
            )}
            <code className="font-mono">{code}</code>
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
                className={`ml-4 mb-6 list-disc space-y-1.5 pl-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}
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
                className={`mb-4 mt-2 text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}
              >
                {formatInline(lines[0].trim().slice(3))}
              </h2>
            );
          }

          return (
            <p
              key={blockKey}
              className={`mb-6 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}
            >
              {formatInline(block.trim())}
            </p>
          );
        });
    });
  };

  if (!post) {
    return (
      <section className="grid-bg relative min-h-screen pt-24 pb-20">
        <div className="mx-auto w-full max-w-3xl px-6 text-center">
          <div className="card" data-aos="fade-up">
            <h1 className="section-title text-3xl sm:text-4xl">{t.blog.title}</h1>
            <p className={`mt-4 text-lg ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              {t.blog.notFound}
            </p>
            <Link to="/blog" className="btn-primary mt-8 inline-flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              {t.blog.backToBlog}
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="grid-bg relative min-h-screen pt-24 pb-20">
      <div className="mx-auto w-full max-w-3xl px-6">
        <Link
          to="/blog"
          className={`mb-8 inline-flex items-center gap-2 text-sm font-semibold transition-colors ${
            isDark ? 'text-primary hover:text-primary/80' : 'text-green-600 hover:text-green-500'
          }`}
          data-aos="fade-up"
        >
          <ArrowLeft className="h-4 w-4" />
          {t.blog.backToBlog}
        </Link>

        <article className="card" data-aos="fade-up">
          <div
            className={`mb-3 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold ${
              isDark
                ? 'border-primary/30 bg-primary/10 text-primary'
                : 'border-green-500/30 bg-green-500/10 text-green-600'
            }`}
          >
            <BookOpen className="h-3.5 w-3.5" />
            Blog Post
          </div>

          <h1
            className={`mb-6 text-3xl sm:text-4xl font-bold leading-tight ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            {language === 'kh' ? post.titleKh : post.title}
          </h1>

          <div className="mb-8 flex flex-wrap items-center gap-x-6 gap-y-2 border-b pb-6 text-sm">
            <span className={`inline-flex items-center gap-2 ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
              <Calendar className="h-4 w-4 text-primary" />
              {t.blog.publishedOn} {formatDate(post.date)}
            </span>
            <span className={`inline-flex items-center gap-2 ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
              <Clock className="h-4 w-4 text-primary" />
              {language === 'en' ? `${post.readTime} ${t.blog.readTime}` : post.readTime}
            </span>
          </div>

          <div className="mb-8 flex flex-wrap items-center gap-2">
            <Tag className={`h-4 w-4 ${isDark ? 'text-primary' : 'text-green-600'}`} />
            {post.tags.map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>

          <div className="text-base sm:text-lg">{renderContent(post.content)}</div>
        </article>
      </div>
    </section>
  );
}

export default BlogPost;