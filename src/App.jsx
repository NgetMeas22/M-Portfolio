import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './hooks/useTheme.jsx';
import { LanguageProvider } from './hooks/useLanguage.jsx';
import Navbar from './components/Navbar/Navbar.jsx';
import Footer from './components/Footer/Footer.jsx';
import ScrollToTop from './components/ScrollToTop/ScrollToTop.jsx';
import Home from './pages/Home/Home.jsx';
import About from './pages/About/About.jsx';
import Skills from './pages/Skills/Skills.jsx';
import Projects from './pages/Projects/Projects.jsx';
import ProjectDetails from './pages/ProjectDetails/ProjectDetails.jsx';
import Experience from './pages/Experience/Experience.jsx';
import Certificates from './pages/Certificates/Certificates.jsx';
import Education from './pages/Education/Education.jsx';
import Services from './pages/Services/Services.jsx';
import Blog from './pages/Blog/Blog.jsx';
import BlogPost from './pages/Blog/BlogPost.jsx';
import Contact from './pages/Contact/Contact.jsx';
import Resume from './pages/Resume/Resume.jsx';
import NotFound from './pages/NotFound/NotFound.jsx';

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <ScrollToTop />
        <Navbar />
        <main className="min-h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectDetails />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/certificates" element={<Certificates />} />
            <Route path="/education" element={<Education />} />
            <Route path="/services" element={<Services />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
