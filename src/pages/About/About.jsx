import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import {
  GraduationCap,
  Code,
  Target,
  BookOpen,
  Lightbulb,
  Brain,
  Users,
  Eye,
  RefreshCw,
  MapPin,
} from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';
import { useTheme } from '../../hooks/useTheme';

const About = () => {
  const { t } = useLanguage();
  const { theme } = useTheme();

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-out-cubic',
    });
  }, []);

  const learningTags = [
    { name: 'AI', color: 'from-purple-500 to-pink-500' },
    { name: 'Python', color: 'from-blue-500 to-green-500' },
    { name: 'C# .NET', color: 'from-indigo-500 to-purple-500' },
    { name: 'Java Spring Boot', color: 'from-red-500 to-orange-500' },
  ];

  const softSkills = [
    { icon: Brain, name: t.about.problemSolving, color: 'from-blue-500 to-cyan-500' },
    { icon: Eye, name: t.about.analyticalThinking, color: 'from-purple-500 to-pink-500' },
    { icon: Users, name: t.about.communication, color: 'from-green-500 to-teal-500' },
    { icon: Lightbulb, name: t.about.attentionToDetail, color: 'from-yellow-500 to-orange-500' },
    { icon: RefreshCw, name: t.about.continuousLearning, color: 'from-red-500 to-rose-500' },
  ];

  const isDark = theme === 'dark';

  return (
    <section
      id="about"
      className={`min-h-screen py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
        isDark ? 'bg-[#0a0a0f]' : 'bg-white'
      }`}
    >
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <h1
            className={`text-4xl sm:text-5xl font-bold mb-4 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}
          >
            {t.about.title}
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6 rounded-full" />
          <p
            className={`text-lg max-w-2xl mx-auto ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            {t.about.subtitle}
          </p>
        </div>

        {/* Who I Am Section */}
        <div
          className={`rounded-2xl p-8 mb-8 transition-all duration-300 ${
            isDark
              ? 'bg-white/5 backdrop-blur-lg border border-white/10 hover:border-blue-500/30'
              : 'bg-gray-50 shadow-lg hover:shadow-xl border border-gray-100'
          }`}
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
              <Code className="w-6 h-6 text-white" />
            </div>
            <h2
              className={`text-2xl font-bold ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}
            >
              {t.about.whoIAm}
            </h2>
          </div>
          <p
            className={`text-lg leading-relaxed ${
              isDark ? 'text-gray-300' : 'text-gray-700'
            }`}
          >
            {t.about.whoIAmText}
          </p>
        </div>

        {/* Education Section */}
        <div
          className={`rounded-2xl p-8 mb-8 transition-all duration-300 ${
            isDark
              ? 'bg-white/5 backdrop-blur-lg border border-white/10 hover:border-blue-500/30'
              : 'bg-gray-50 shadow-lg hover:shadow-xl border border-gray-100'
          }`}
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <h2
              className={`text-2xl font-bold ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}
            >
              {t.about.education}
            </h2>
          </div>
          <p
            className={`text-lg leading-relaxed mb-6 ${
              isDark ? 'text-gray-300' : 'text-gray-700'
            }`}
          >
            {t.about.educationText}
          </p>
          <div
            className={`flex items-center gap-2 p-4 rounded-xl ${
              isDark ? 'bg-white/5' : 'bg-white'
            }`}
          >
            <MapPin className="w-5 h-5 text-blue-500" />
            <span
              className={`font-medium ${
                isDark ? 'text-gray-200' : 'text-gray-800'
              }`}
            >
              Royal University of Phnom Penh — Bachelor of IT, Third Year, Expected 2028
            </span>
          </div>
        </div>

        {/* Development Journey Section */}
        <div
          className={`rounded-2xl p-8 mb-8 transition-all duration-300 ${
            isDark
              ? 'bg-white/5 backdrop-blur-lg border border-white/10 hover:border-blue-500/30'
              : 'bg-gray-50 shadow-lg hover:shadow-xl border border-gray-100'
          }`}
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <Code className="w-6 h-6 text-white" />
            </div>
            <h2
              className={`text-2xl font-bold ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}
            >
              {t.about.developmentJourney}
            </h2>
          </div>
          <p
            className={`text-lg leading-relaxed ${
              isDark ? 'text-gray-300' : 'text-gray-700'
            }`}
          >
            {t.about.developmentJourneyText}
          </p>
        </div>

        {/* Career Goal Section */}
        <div
          className={`rounded-2xl p-8 mb-8 transition-all duration-300 ${
            isDark
              ? 'bg-white/5 backdrop-blur-lg border border-white/10 hover:border-blue-500/30'
              : 'bg-gray-50 shadow-lg hover:shadow-xl border border-gray-100'
          }`}
          data-aos="fade-up"
          data-aos-delay="400"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center">
              <Target className="w-6 h-6 text-white" />
            </div>
            <h2
              className={`text-2xl font-bold ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}
            >
              {t.about.careerGoal}
            </h2>
          </div>
          <p
            className={`text-lg leading-relaxed ${
              isDark ? 'text-gray-300' : 'text-gray-700'
            }`}
          >
            {t.about.careerGoalText}
          </p>
        </div>

        {/* Current Learning Section */}
        <div
          className={`rounded-2xl p-8 mb-8 transition-all duration-300 ${
            isDark
              ? 'bg-white/5 backdrop-blur-lg border border-white/10 hover:border-blue-500/30'
              : 'bg-gray-50 shadow-lg hover:shadow-xl border border-gray-100'
          }`}
          data-aos="fade-up"
          data-aos-delay="500"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <h2
              className={`text-2xl font-bold ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}
            >
              {t.about.currentLearning}
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {learningTags.map((tag, index) => (
              <span
                key={index}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r ${tag.color} shadow-lg hover:scale-105 transition-transform duration-200`}
                data-aos="zoom-in"
                data-aos-delay={600 + index * 100}
              >
                {tag.name}
              </span>
            ))}
          </div>
        </div>

        {/* Personal Interests Section */}
        <div
          className={`rounded-2xl p-8 mb-8 transition-all duration-300 ${
            isDark
              ? 'bg-white/5 backdrop-blur-lg border border-white/10 hover:border-blue-500/30'
              : 'bg-gray-50 shadow-lg hover:shadow-xl border border-gray-100'
          }`}
          data-aos="fade-up"
          data-aos-delay="600"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center">
              <Lightbulb className="w-6 h-6 text-white" />
            </div>
            <h2
              className={`text-2xl font-bold ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}
            >
              {t.about.interests}
            </h2>
          </div>
          <p
            className={`text-lg leading-relaxed ${
              isDark ? 'text-gray-300' : 'text-gray-700'
            }`}
          >
            {t.about.interestsText}
          </p>
        </div>

        {/* Soft Skills Section */}
        <div data-aos="fade-up" data-aos-delay="700">
          <div className="flex items-center gap-3 mb-8 justify-center">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <h2
              className={`text-2xl font-bold ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}
            >
              {t.about.softSkills}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {softSkills.map((skill, index) => {
              const IconComponent = skill.icon;
              return (
                <div
                  key={index}
                  className={`group rounded-2xl p-6 text-center transition-all duration-300 hover:-translate-y-2 ${
                    isDark
                      ? 'bg-white/5 backdrop-blur-lg border border-white/10 hover:border-blue-500/40 hover:bg-white/10'
                      : 'bg-white shadow-lg hover:shadow-2xl border border-gray-100'
                  }`}
                  data-aos="zoom-in"
                  data-aos-delay={800 + index * 100}
                >
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${skill.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <IconComponent className="w-7 h-7 text-white" />
                  </div>
                  <h3
                    className={`font-semibold text-lg ${
                      isDark ? 'text-gray-200' : 'text-gray-800'
                    }`}
                  >
                    {skill.name}
                  </h3>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
