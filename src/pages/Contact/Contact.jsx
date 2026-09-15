import { useEffect, useState } from 'react';
import { Send, MapPin, Mail, Phone, Loader } from 'lucide-react';
import { GitHubIcon, LinkedInIcon } from '../../components/SocialIcons.jsx';
import { useLanguage } from '../../hooks/useLanguage';
import { useTheme } from '../../hooks/useTheme';
import AOS from 'aos';
import 'aos/dist/aos.css';

const inputClass = (isDark) =>
  `w-full rounded-lg border bg-transparent px-4 py-3 text-sm outline-none transition-colors duration-300 ${
    isDark
      ? 'border-slate-700 text-slate-100 placeholder:text-slate-500 focus:border-cyan-400'
      : 'border-slate-300 text-slate-800 placeholder:text-slate-400 focus:border-blue-500'
  }`;

const errorClass = (isDark) =>
  isDark ? 'border-rose-500/70 focus:border-rose-400' : 'border-rose-400 focus:border-rose-500';

function Contact() {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    AOS.init({ duration: 800, easing: 'ease-out-cubic', once: true, offset: 60 });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = () => {
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = t.contact.nameRequired;
    if (!form.email.trim()) {
      nextErrors.email = t.contact.emailRequired;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      nextErrors.email = t.contact.emailInvalid;
    }
    if (!form.subject.trim()) nextErrors.subject = t.contact.subjectRequired;
    if (!form.message.trim()) nextErrors.message = t.contact.messageRequired;
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('sending');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!response.ok) throw new Error('Request failed');
      setStatus('success');
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  const infoItems = [
    { icon: MapPin, label: t.contact.location, value: t.contact.locationValue },
    { icon: Mail, label: 'Email', value: t.contact.emailValue },
    { icon: Phone, label: 'Phone', value: t.contact.phoneValue },
  ];

  const socials = [
    {
      icon: GitHubIcon,
      href: 'https://github.com/NgetMeas22',
      label: 'GitHub',
    },
    {
      icon: LinkedInIcon,
      href: 'https://linkedin.com/in/nget-meas-6525bb3a6',
      label: 'LinkedIn',
    },
    {
      icon: Mail,
      href: 'mailto:measm2519@gmail.com',
      label: t.contact.emailValue,
    },
  ];

  const renderField = (name, label, type = 'text', required = false, optional = false) => (
    <div>
      <label
        htmlFor={name}
        className={`mb-2 block text-sm font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}
      >
        {label}
        {required && <span className="ml-1 text-rose-500">*</span>}
        {optional && <span className={`ml-1 text-xs ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>(optional)</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={form[name]}
        onChange={handleChange}
        className={`${inputClass(isDark)} ${errors[name] ? errorClass(isDark) : ''}`}
        disabled={status === 'sending'}
      />
      {errors[name] && (
        <p className={`mt-1.5 text-xs font-medium ${isDark ? 'text-rose-400' : 'text-rose-500'}`}>
          {errors[name]}
        </p>
      )}
    </div>
  );

  return (
    <>
      <section className="grid-bg relative min-h-screen pt-24 pb-20">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="mb-14 text-center" data-aos="fade-up">
            <div
              className={`mb-3 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold tracking-wide ${
                isDark
                  ? 'border-cyan-500/30 bg-cyan-500/10 text-cyan-400'
                  : 'border-blue-500/30 bg-blue-500/10 text-blue-600'
              }`}
            >
              <Send className="h-3.5 w-3.5" />
              Get In Touch
            </div>
            <h1 className="section-title text-3xl sm:text-4xl lg:text-5xl">{t.contact.title}</h1>
            <p className="section-subtitle text-lg">{t.contact.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-5">
            <div className="lg:col-span-3" data-aos="fade-right">
              <form
                onSubmit={handleSubmit}
                className="card space-y-5"
                noValidate
              >
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {renderField('name', t.contact.name, 'text', true)}
                  {renderField('email', t.contact.email, 'email', true)}
                </div>
                {renderField('phone', t.contact.phone, 'tel', false, true)}
                {renderField('subject', t.contact.subject, 'text', true)}
                <div>
                  <label
                    htmlFor="message"
                    className={`mb-2 block text-sm font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}
                  >
                    {t.contact.message}
                    <span className="ml-1 text-rose-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={form.message}
                    onChange={handleChange}
                    className={`${inputClass(isDark)} ${errors.message ? errorClass(isDark) : ''} resize-none`}
                    disabled={status === 'sending'}
                  />
                  {errors.message && (
                    <p className={`mt-1.5 text-xs font-medium ${isDark ? 'text-rose-400' : 'text-rose-500'}`}>
                      {errors.message}
                    </p>
                  )}
                </div>

                {status === 'success' && (
                  <div
                    className={`flex items-center gap-2 rounded-lg border px-4 py-3 text-sm font-medium ${
                      isDark
                        ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400'
                        : 'border-emerald-500/40 bg-emerald-500/10 text-emerald-600'
                    }`}
                  >
                    {t.contact.success}
                  </div>
                )}

                {status === 'error' && (
                  <div
                    className={`flex items-center gap-2 rounded-lg border px-4 py-3 text-sm font-medium ${
                      isDark
                        ? 'border-rose-500/40 bg-rose-500/10 text-rose-400'
                        : 'border-rose-500/40 bg-rose-500/10 text-rose-600'
                    }`}
                  >
                    {t.contact.error}
                  </div>
                )}

                <button
                  type="submit"
                  className="btn-primary inline-flex w-full items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                  disabled={status === 'sending'}
                >
                  {status === 'sending' ? (
                    <>
                      <Loader className="h-4 w-4 animate-spin" />
                      {t.contact.sending}
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      {t.contact.send}
                    </>
                  )}
                </button>
              </form>
            </div>

            <div className="lg:col-span-2" data-aos="fade-left" data-aos-delay="100">
              <div className="space-y-5">
                {infoItems.map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <div
                      key={index}
                      className="card flex items-center gap-4"
                    >
                      <div
                        className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${
                          isDark
                            ? 'bg-cyan-500/10 text-cyan-400'
                            : 'bg-blue-500/10 text-blue-600'
                        }`}
                      >
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <div className="min-w-0">
                        <p className={`text-xs font-medium uppercase tracking-wide ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                          {item.label}
                        </p>
                        <p className={`truncate font-semibold ${isDark ? 'text-slate-100' : 'text-slate-800'}`}>
                          {item.value}
                        </p>
                      </div>
                    </div>
                  );
                })}

                <div className="card">
                  <p
                    className={`mb-4 text-xs font-semibold uppercase tracking-wide ${
                      isDark ? 'text-slate-400' : 'text-slate-500'
                    }`}
                  >
                    Social Links
                  </p>
                  <div className="flex gap-3">
                    {socials.map((social, index) => {
                      const IconComponent = social.icon;
                      return (
                        <a
                          key={index}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex h-11 w-11 items-center justify-center rounded-lg transition-all duration-300 hover:-translate-y-1 ${
                            isDark
                              ? 'bg-dark-600 text-slate-200 hover:bg-dark-500 hover:text-cyan-400'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-blue-600'
                          }`}
                          aria-label={social.label}
                        >
                          <IconComponent className="h-5 w-5" />
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Contact;