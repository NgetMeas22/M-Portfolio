import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Calendar, Clock, Tag, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';
import { useTheme } from '../../hooks/useTheme';
import { blogPosts } from '../../data/blog';
import AOS from 'aos';
import 'aos/dist/aos.css';

function Blog() {
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
    <section className="grid-bg grid-pattern relative min-h-screen pt-28 lg:pt-32 pb-16">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center" data-aos="fade-up">
          <span className="cyber-badge mb-4 inline-flex items-center gap-2">
            <BookOpen className="h-3.5 w-3.5" />
            &gt;_ log_stream
          </span>
          <h1 className="section-title text-3xl sm:text-4xl lg:text-5xl font-mono">
            {t.blog.title}
          </h1>
          <p className="section-subtitle mt-3 text-lg">{t.blog.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post, index) => {
            const title = language === 'kh' ? post.titleKh : post.title;
            const excerpt = language === 'kh' ? post.excerptKh : post.excerpt;

            return (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                data-aos="fade-up"
                data-aos-delay={Math.min(index * 50, 300)}
                className="card card-hover group flex flex-col gap-3 p-6 no-underline"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="tag inline-flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    {formatDate(post.date)}
                  </span>
                  <span className="tag">{post.tags[0]}</span>
                </div>

                <h3
                  className={`font-mono text-xl font-bold transition-colors duration-300 group-hover:text-primary ${
                    isDark ? 'text-slate-100' : 'text-slate-800'
                  }`}
                >
                  {title}
                </h3>

                <p
                  className={`text-sm leading-relaxed ${
                    isDark ? 'text-slate-400' : 'text-slate-500'
                  }`}
                >
                  {excerpt}
                </p>

                <div className="mt-auto flex flex-wrap items-center gap-2 text-xs font-medium">
                  <span
                    className={`inline-flex items-center gap-1.5 ${
                      isDark ? 'text-slate-500' : 'text-slate-500'
                    }`}
                  >
                    <Clock className="h-3.5 w-3.5" />
                    {language === 'en' ? `${post.readTime} ${t.blog.readTime}` : post.readTime}
                  </span>
                  {post.tags.slice(1).length > 0 && (
                    <span
                      className={`inline-flex flex-wrap items-center gap-2 ${
                        isDark ? 'text-slate-500' : 'text-slate-500'
                      }`}
                    >
                      <Tag className="h-3.5 w-3.5" />
                      {post.tags.slice(1).map((tag) => (
                        <span key={tag} className="tag">
                          {tag}
                        </span>
                      ))}
                    </span>
                  )}
                </div>

                <div
                  className={`flex items-center gap-2 border-t pt-3 text-sm font-semibold ${
                    isDark ? 'border-white/5 text-primary' : 'border-slate-200 text-green-600'
                  }`}
                >
                  <span>{t.blog.readMore}</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Blog;