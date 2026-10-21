import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import {
  Brain,
  Code2,
  Database,
  Download,
  Eye,
  GraduationCap,
  Lightbulb,
  Mail,
  MapPin,
  RefreshCw,
  Server,
  Sparkles,
  Target,
  Terminal,
  Users,
  Wrench,
} from 'lucide-react';
import profilePhoto from '../../assets/image/profile2.webp';
import PageBackground from '../../components/PageBackground/PageBackground.jsx';
import ProfileCard from '../../components/ProfileCard/ProfileCard.jsx';
import { projects } from '../../data/projects';
import { useLanguage } from '../../hooks/useLanguage';
import { useTheme } from '../../hooks/useTheme';

const techStack = [
  { icon: Code2, label: 'Frontend', items: ['Next.js', 'React', 'TypeScript', 'Vue.js', 'Tailwind CSS'] },
  { icon: Server, label: 'Backend', items: ['Express', 'Node.js', 'Laravel', 'Prisma', 'REST + JWT'] },
  { icon: Database, label: 'Database', items: ['PostgreSQL', 'MySQL', 'Neon'] },
  { icon: Wrench, label: 'DevOps & Tools', items: ['Git', 'Docker', 'Vercel', 'Render', 'Railway', 'Claude'] },
];

const learningTags = ['AI / LLMs', 'MCP', 'Java Spring Boot', 'C# .NET'];

// Markdown-style "## heading"
function Heading({ children, isDark }) {
  return (
    <h2 className={`mb-3 flex items-baseline gap-2 text-sm sm:text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
      <span className={isDark ? 'text-emerald-400' : 'text-emerald-700'}>##</span>
      {children}
    </h2>
  );
}

const About = () => {
  const { t, language } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const isKh = language === 'kh';

  useEffect(() => {
    AOS.init({ duration: 800, once: true, easing: 'ease-out-cubic' });
  }, []);

  const softSkills = [
    { icon: Brain, name: t.about.problemSolving },
    { icon: Eye, name: t.about.analyticalThinking },
    { icon: Users, name: t.about.communication },
    { icon: Lightbulb, name: t.about.attentionToDetail },
    { icon: RefreshCw, name: t.about.continuousLearning },
  ];

  const facts = [
    { icon: GraduationCap, label: t.about.education, value: t.about.educationText },
    { icon: Target, label: t.about.careerGoal, value: t.about.careerGoalText },
    { icon: Sparkles, label: t.about.interests, value: t.about.interestsText },
  ];

  const stats = [
    { value: projects.length, label: isKh ? 'គម្រោង' : 'Projects' },
    { value: projects.filter((p) => p.live).length, label: isKh ? 'កំពុងដំណើរការ' : 'Live apps' },
    { value: isKh ? 'ឆ្នាំទី៣' : '3rd yr', label: isKh ? 'និស្សិត IT' : 'IT student' },
    { value: techStack.length, label: isKh ? 'ផ្នែកបច្ចេកទេស' : 'Core tracks' },
  ];

  // Shared tokens
  const muted = isDark ? 'text-slate-400' : 'text-slate-600';
  const body = isDark ? 'text-slate-300' : 'text-slate-700';
  const accent = isDark ? 'text-emerald-400' : 'text-emerald-700';
  const line = isDark ? 'border-emerald-900/50' : 'border-emerald-100';
  const panel = isDark ? 'border-emerald-900/50 bg-emerald-950/15' : 'border-emerald-100 bg-emerald-50/40';
  const chip = `inline-flex items-center gap-1.5 rounded-md border px-2 py-1 text-[11px] font-semibold ${
    isDark ? 'border-emerald-900/70 bg-emerald-950/30 text-emerald-300' : 'border-emerald-200 bg-emerald-50 text-emerald-800'
  }`;

  return (
    <section
      id="about"
      className={`grid-bg grid-pattern relative min-h-screen overflow-hidden pt-20 sm:pt-28 lg:pt-36 pb-12 sm:pb-24 font-mono transition-colors duration-300 ${
        isDark
          ? 'bg-[#030504] text-emerald-400 selection:bg-emerald-500 selection:text-black'
          : 'bg-[#f4f7f5] text-slate-900 selection:bg-emerald-600 selection:text-white'
      }`}
    >
      <PageBackground isDark={isDark} />

      <div className="relative mx-auto w-full max-w-6xl px-3.5 sm:px-6 lg:px-8">
        {/* TITLE */}
        <div className="mb-6 sm:mb-10 text-center" data-aos="fade-up">
          <span
            className={`mb-2 sm:mb-4 inline-flex items-center gap-1.5 sm:gap-2 border px-2.5 sm:px-3.5 py-1 text-[11px] sm:text-xs uppercase tracking-wider font-bold rounded ${
              isDark ? 'border-emerald-500/40 bg-emerald-950/40 text-emerald-300' : 'border-emerald-600/30 bg-emerald-100/60 text-emerald-900'
            }`}
          >
            <Terminal className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
            {'>_ cat about.md'}
          </span>
          <h1 className={`text-2xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {t.about.title}
          </h1>
          <p className={`mx-auto mt-2 sm:mt-3 max-w-2xl text-xs sm:text-sm md:text-base ${muted}`}>{t.about.subtitle}</p>
        </div>

        {/* ABOUT.MD WINDOW */}
        <article
          data-aos="fade-up"
          data-aos-delay="100"
          className={`overflow-hidden rounded-2xl border ${
            isDark ? 'border-emerald-500/30 bg-black/85 shadow-[0_0_40px_rgba(16,185,129,0.1)]' : 'border-emerald-200 bg-white shadow-xl shadow-emerald-950/5'
          }`}
        >
          {/* WINDOW BAR */}
          <div
            className={`flex items-center justify-between border-b px-4 sm:px-5 py-2.5 text-xs ${
              isDark ? 'border-emerald-900/60 bg-emerald-950/30 text-slate-300' : 'border-emerald-100 bg-emerald-50/80 text-slate-700'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
              <span className="ml-2 font-bold">{'>_ nget_meas/about.md'}</span>
            </div>
            <span className={`hidden sm:inline text-[11px] ${muted}`}>Markdown · UTF-8</span>
          </div>

          <div className="grid lg:grid-cols-[380px_1fr]">
            {/* SIDEBAR: IDENTITY */}
            <aside className={`flex flex-col gap-5 border-b p-5 sm:p-6 lg:border-b-0 lg:border-r ${line}`}>
              <ProfileCard
                src={profilePhoto}
                alt={t.hero.name}
                isDark={isDark}
                status={t.hero.statusText}
                title={`${t.hero.greeting} Meas 👋`}
                subtitle={isKh ? 'តោះបង្កើតអ្វីដែលអស្ចារ្យជាមួយគ្នា' : "Let's build something great together"}
              />

              <div className="text-center">
                <h2 className={`text-xl font-black uppercase tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>{t.hero.name}</h2>
                <p className={`mt-1 text-xs font-bold ${accent}`}>Full-Stack Developer</p>
                <p className={`mt-1.5 inline-flex items-center gap-1 text-[11px] ${muted}`}>
                  <MapPin className="h-3 w-3" /> {t.hero.location}
                </p>
              </div>

              {/* STATS */}
              <div className={`grid grid-cols-2 overflow-hidden rounded-xl border text-center ${line}`}>
                {stats.map((stat, i) => (
                  <div
                    key={stat.label}
                    className={`px-2 py-3 ${i % 2 === 0 ? `border-r ${line}` : ''} ${i < 2 ? `border-b ${line}` : ''}`}
                  >
                    <p className={`text-lg font-black leading-none ${accent}`}>{stat.value}</p>
                    <p className={`mt-1 text-[10px] uppercase tracking-wider ${muted}`}>{stat.label}</p>
                  </div>
                ))}
              </div>

              <div className="grid gap-2">
                <a
                  href="/CV_NgetMeas.pdf"
                  download="CV_NgetMeas.pdf"
                  className={`inline-flex items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-bold uppercase tracking-wider transition-all active:scale-95 ${
                    isDark
                      ? 'bg-emerald-500 text-black hover:bg-emerald-400 hover:shadow-[0_0_24px_rgba(16,185,129,0.5)]'
                      : 'bg-emerald-600 text-white hover:bg-emerald-700'
                  }`}
                >
                  <Download className="h-4 w-4" />
                  {t.hero.downloadCV}
                </a>
                <Link
                  to="/contact"
                  className={`inline-flex items-center justify-center gap-2 rounded-xl border py-2.5 text-xs font-bold uppercase tracking-wider transition-all ${
                    isDark ? 'border-emerald-500/40 text-emerald-300 hover:bg-emerald-950/50' : 'border-emerald-300 text-emerald-800 hover:bg-emerald-50'
                  }`}
                >
                  <Mail className="h-4 w-4" />
                  {t.hero.contactMe}
                </Link>
              </div>
            </aside>

            {/* MARKDOWN CONTENT */}
            <div className="space-y-8 p-5 sm:p-7 lg:p-9">
              <section>
                <Heading isDark={isDark}>{t.about.whoIAm}</Heading>
                <div className={`space-y-3 text-xs sm:text-sm leading-relaxed ${body}`}>
                  <p>{t.about.whoIAmText}</p>
                  <p>{t.about.developmentJourneyText}</p>
                </div>
              </section>

              <section>
                <Heading isDark={isDark}>{isKh ? 'ព័ត៌មានសង្ខេប' : 'Quick Facts'}</Heading>
                <div className="grid gap-3 sm:grid-cols-3">
                  {facts.map(({ icon: Icon, label, value }) => (
                    <div key={label} className={`rounded-xl border p-3.5 ${panel}`}>
                      <p className={`mb-1.5 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider ${accent}`}>
                        <Icon className="h-3.5 w-3.5" />
                        {label}
                      </p>
                      <p className={`text-xs leading-relaxed ${body}`}>{value}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <Heading isDark={isDark}>{isKh ? 'បច្ចេកវិទ្យាដែលប្រើ' : 'Tech Stack'}</Heading>
                <div className={`divide-y rounded-xl border ${isDark ? 'divide-emerald-900/50 border-emerald-900/50' : 'divide-emerald-100 border-emerald-100'}`}>
                  {techStack.map(({ icon: Icon, label, items }) => (
                    <div key={label} className="flex flex-col gap-2 px-3.5 py-3 sm:flex-row sm:items-center sm:gap-4">
                      <span className={`flex w-36 shrink-0 items-center gap-2 text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        <Icon className={`h-4 w-4 ${accent}`} />
                        {label}
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {items.map((item) => (
                          <span key={item} className={chip}>{item}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <div className="grid gap-8 md:grid-cols-2">
                <section>
                  <Heading isDark={isDark}>{t.about.softSkills}</Heading>
                  <div className="flex flex-wrap gap-1.5">
                    {softSkills.map(({ icon: Icon, name }) => (
                      <span key={name} className={chip}>
                        <Icon className="h-3.5 w-3.5" />
                        {name}
                      </span>
                    ))}
                  </div>
                </section>

                <section>
                  <Heading isDark={isDark}>{t.about.currentLearning}</Heading>
                  <div className="flex flex-wrap gap-1.5">
                    {learningTags.map((tag) => (
                      <span
                        key={tag}
                        className={`rounded-md border border-dashed px-2 py-1 text-[11px] font-semibold ${
                          isDark ? 'border-slate-600 text-slate-300' : 'border-slate-300 text-slate-700'
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
};

export default About;
