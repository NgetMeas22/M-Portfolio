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
    <>
      <section className="grid-bg relative min-h-screen pt-24 pb-20">
        <div className="mx-auto w-full max-w-7xl px-6">
          <div className="mb-14 text-center" data-aos="fade-up">
            <div
              className={`mb-3 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold tracking-wide ${
                isDark
                  ? 'border-primary/30 bg-primary/10 text-primary'
                  : 'border-green-500/30 bg-green-500/10 text-green-600'
              }`}
            >
              <BookOpen className="h-3.5 w-3.5" />
              Developer Notes
            </div>
            <h1 className="section-title text-3xl sm:text-4xl lg:text-5xl">{t.blog.title}</h1>
            <p className="section-subtitle text-lg">{t.blog.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post, index) => (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                data-aos="fade-up"
                data-aos-delay={Math.min(index * 50, 300)}
                className="card group flex flex-col gap-4 no-underline"
              >
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-medium">
                  <span
                    className={`inline-flex items-center gap-1.5 ${
                      isDark ? 'text-gray-400' : 'text-slate-500'
                    }`}
                  >
                    <Calendar className="h-3.5 w-3.5" />
                    {formatDate(post.date)}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 ${
                      isDark
                        ? 'border-primary/20 bg-primary/5 text-primary'
                        : 'border-green-500/20 bg-green-500/5 text-green-600'
                    }`}
                  >
                    <Clock className="h-3.5 w-3.5" />
                    {language === 'en' ? `${post.readTime} ${t.blog.readTime}` : post.readTime}
                  </span>
                </div>

                <h3
                  className={`text-xl font-bold transition-colors duration-300 group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-accent group-hover:bg-clip-text group-hover:text-transparent ${
                    isDark ? 'text-slate-100' : 'text-slate-800'
                  }`}
                >
                  {language === 'kh' ? post.titleKh : post.title}
                </h3>

                <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  {language === 'kh' ? post.excerptKh : post.excerpt}
                </p>

                <div className="flex flex-wrap items-center gap-2">
                  <Tag className={`h-4 w-4 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
                  {post.tags.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>

                <div
                  className={`mt-auto flex items-center gap-2 pt-4 text-sm font-semibold ${
                    isDark ? 'text-primary' : 'text-green-600'
                  }`}
                >
                  <span>{t.blog.readMore}</span>
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Blog;
