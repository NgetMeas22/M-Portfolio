import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Calendar, CheckCircle, Lightbulb, AlertTriangle } from 'lucide-react';
import { GitHubIcon } from '../../components/SocialIcons.jsx';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useLanguage } from '../../hooks/useLanguage';
import { useTheme } from '../../hooks/useTheme';
import { projects } from '../../data/projects';

export default function ProjectDetails() {
  const { id } = useParams();
  const { language, t } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const project = projects.find(p => p.slug === id);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 pt-24">
        <div className="text-center">
          <h1 className={`text-4xl sm:text-5xl font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-800'}`}>
            Project not found
          </h1>
          <p className={`mb-8 ${isDark ? 'text-dark-100' : 'text-slate-500'}`}>
            The project you are looking for does not exist or has been removed.
          </p>
          <Link to="/projects" className="btn-primary inline-flex items-center gap-2">
            <ArrowLeft size={18} />
            {t.projects.backToProjects}
          </Link>
        </div>
      </div>
    );
  }

  const isKh = language === 'kh';
  const description = isKh ? project.descriptionKh : project.description;
  const problem = isKh ? project.problemKh : project.problem;
  const solution = isKh ? project.solutionKh : project.solution;
  const features = isKh ? project.featuresKh : project.features;

  const sectionCard = isDark
    ? 'glass rounded-2xl p-6 sm:p-8'
    : 'card shadow-lg rounded-2xl p-6 sm:p-8';

  return (
    <div className="min-h-screen">
      <section className="py-20 relative overflow-hidden grid-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div data-aos="fade-down">
            <Link
              to="/projects"
              className={`inline-flex items-center gap-2 mb-8 transition-colors ${
                isDark ? 'text-cyan-400 hover:text-cyan-300' : 'text-blue-600 hover:text-blue-700'
              }`}
            >
              <ArrowLeft size={18} />
              {t.projects.backToProjects}
            </Link>
          </div>

          <div data-aos="fade-up">
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent"
              style={{
                backgroundImage: isDark
                  ? 'linear-gradient(135deg, #00d4ff, #7c3aed, #10b981)'
                  : 'linear-gradient(135deg, #0066cc, #7c3aed, #0066cc)',
              }}
            >
              {project.title}
            </h1>

            <div className="flex flex-wrap items-center gap-3 mb-10">
              {project.isTeamProject && (
                <span className={`tag ${isDark ? 'text-purple-300 border-purple-400/40 bg-purple-500/10' : 'text-purple-700 border-purple-300 bg-purple-100'}`}>
                  {t.projects.teamProject}
                </span>
              )}
              <span className="tag inline-flex items-center gap-1.5">
                <Calendar size={14} />
                {project.year}
              </span>
            </div>

            <div className="flex flex-wrap gap-2 mb-12">
              {project.technologies.map(tech => (
                <span key={tech} className="tag">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div data-aos="fade-up" className={sectionCard}>
            <h2 className={`flex items-center gap-3 text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-800'}`}>
              <span className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${isDark ? 'bg-cyan-500/10 text-cyan-400' : 'bg-blue-100 text-blue-600'}`}>
                <Lightbulb size={20} />
              </span>
              {t.projects.overview}
            </h2>
            <p className={`leading-relaxed ${isDark ? 'text-dark-100' : 'text-slate-600'}`}>
              {description}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 my-10">
            <div data-aos="fade-right" className={sectionCard}>
              <h2 className={`flex items-center gap-3 text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-800'}`}>
                <span className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${isDark ? 'bg-red-500/10 text-red-400' : 'bg-red-100 text-red-600'}`}>
                  <AlertTriangle size={20} />
                </span>
                {t.projects.problem}
              </h2>
              <p className={`leading-relaxed ${isDark ? 'text-dark-100' : 'text-slate-600'}`}>
                {problem}
              </p>
            </div>

            <div data-aos="fade-left" className={sectionCard}>
              <h2 className={`flex items-center gap-3 text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-800'}`}>
                <span className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${isDark ? 'bg-emerald-500/10 text-emerald-400' : 'bg-emerald-100 text-emerald-600'}`}>
                  <CheckCircle size={20} />
                </span>
                {t.projects.solution}
              </h2>
              <p className={`leading-relaxed ${isDark ? 'text-dark-100' : 'text-slate-600'}`}>
                {solution}
              </p>
            </div>
          </div>

          <div data-aos="fade-up" className={sectionCard}>
            <h2 className={`flex items-center gap-3 text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-slate-800'}`}>
              <span className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${isDark ? 'bg-cyan-500/10 text-cyan-400' : 'bg-blue-100 text-blue-600'}`}>
                <CheckCircle size={20} />
              </span>
              {t.projects.features}
            </h2>
            <ul className="grid sm:grid-cols-2 gap-3">
              {features.map((feature, i) => (
                <li
                  key={i}
                  className={`flex items-center gap-3 p-3 rounded-lg ${
                    isDark
                      ? 'bg-dark-700 border border-dark-400/50'
                      : 'bg-light-800 border border-slate-200'
                  }`}
                >
                  <CheckCircle size={18} className={isDark ? 'text-cyan-400 flex-shrink-0' : 'text-blue-600 flex-shrink-0'} />
                  <span className={isDark ? 'text-dark-100' : 'text-slate-600'}>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid md:grid-cols-2 gap-6 my-10">
            <div data-aos="fade-right" className={sectionCard}>
              <h2 className={`flex items-center gap-3 text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-800'}`}>
                <span className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${isDark ? 'bg-red-500/10 text-red-400' : 'bg-red-100 text-red-600'}`}>
                  <AlertTriangle size={20} />
                </span>
                {t.projects.challenges}
              </h2>
              <p className={`leading-relaxed ${isDark ? 'text-dark-100' : 'text-slate-600'}`}>
                Challenges were overcome through careful planning and implementation.
              </p>
            </div>

            <div data-aos="fade-left" className={sectionCard}>
              <h2 className={`flex items-center gap-3 text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-800'}`}>
                <span className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${isDark ? 'bg-purple-500/10 text-purple-400' : 'bg-purple-100 text-purple-600'}`}>
                  <Lightbulb size={20} />
                </span>
                {t.projects.whatILearned}
              </h2>
              <p className={`leading-relaxed ${isDark ? 'text-dark-100' : 'text-slate-600'}`}>
                This project strengthened my skills in the technologies used.
              </p>
            </div>
          </div>

          <div data-aos="fade-up" className="flex flex-wrap gap-4 mt-12 justify-center">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-2"
            >
              <GitHubIcon size={18} />
              {t.projects.viewGitHub}
            </a>
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline inline-flex items-center gap-2"
              >
                {t.projects.viewLive}
                <ExternalLink size={18} />
              </a>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}