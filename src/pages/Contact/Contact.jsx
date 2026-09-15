import { useEffect, useState } from 'react';
import { Send, MapPin, Mail, Phone, Loader } from 'lucide-react';
import { GitHubIcon, LinkedInIcon } from '../../components/SocialIcons.jsx';
import { useLanguage } from '../../hooks/useLanguage';
import { useTheme } from '../../hooks/useTheme';
import AOS from 'aos';
import 'aos/dist/aos.css';

const inputClass = (isDark) =>
  `block w-full rounded-lg border bg-transparent px-4 py-3 font-mono text-sm outline-none transition-colors duration-300 ${
    isDark
      ? 'border-slate-700 text-slate-100 placeholder:text-slate-500 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/20'
      : 'border-slate-400 text-slate-800 placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20'
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

  const renderField = (name, label, type = 'text', required = false) => (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block font-mono text-xs text-slate-500"
      >
        <span className="text-emerald-400">&gt;_</span> {label}
        <span className="text-slate-600">:</span>
        {required && <span className="ml-1 text-rose-500">*</span>}
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
      <section className="grid-bg grid-pattern relative min-h-screen overflow-hidden pt-28 lg:pt-32 pb-16">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* Centered Header */}
          <div className="mb-10 text-center" data-aos="fade-up">
            <span className="cyber-badge mb-4 inline-flex items-center gap-2">
              <Send className="h-3.5 w-3.5" />
              {`>_ contact.signal`}
            </span>
            <h1 className="section-title font-mono text-3xl sm:text-4xl lg:text-5xl">
              {t.contact.title}
              <span className="text-primary"> // </span>
              <span className="animate-flicker text-emerald-400">&gt;_</span>
            </h1>
            <p className="section-subtitle mt-3 text-lg">{t.contact.subtitle}</p>
          </div>

          {/* Two-Column Grid */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* LEFT — Signal Panel */}
            <div className="flex flex-col gap-6" data-aos="fade-right">
              <p className="font-mono text-sm text-slate-400">
                <span className="text-emerald-400">$</span> cat contact.signal
              </p>

              {/* Contact Method Cards */}
              <div className="flex flex-col gap-4">
                {infoItems.map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <div
                      key={index}
                      className="card flex items-center gap-4 p-5"
                      data-aos="fade-up"
                      data-aos-delay={index * 80}
                    >
                      <div className="glow-sm inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
                        <IconComponent className="h-5 w-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-mono text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                          {item.label}
                        </p>
                        <p
                          className={`truncate font-mono text-sm ${
                            isDark ? 'text-slate-200' : 'text-slate-800'
                          }`}
                        >
                          {item.value}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Email CTA */}
              <a
                href={`mailto:${t.contact.emailValue}`}
                className="btn-primary no-print inline-flex items-center gap-2 font-mono"
                data-aos="fade-up"
                data-aos-delay="250"
              >
                <Mail className="h-4 w-4" />
                {t.contact.send}
              </a>

              {/* Social Links */}
              <div className="flex items-center gap-3" data-aos="fade-up" data-aos-delay="300">
                {socials.map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className={`inline-flex h-11 w-11 items-center justify-center rounded-lg border transition-all duration-300 hover:-translate-y-1 ${
                        isDark
                          ? 'border-slate-700 bg-slate-900/40 text-slate-300 hover:border-emerald-500/40 hover:text-emerald-400'
                          : 'border-slate-300 bg-white text-slate-600 hover:border-emerald-500/40 hover:text-emerald-600'
                      }`}
                    >
                      <IconComponent className="h-5 w-5" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* RIGHT — Terminal Form */}
            <div data-aos="fade-left" data-aos-delay="100">
              <form
                onSubmit={handleSubmit}
                className="card glass space-y-4 p-6"
                noValidate
              >
                {/* Terminal Titlebar */}
                <div className="mb-2 flex items-center justify-between rounded-lg border border-slate-700 bg-slate-900/60 px-4 py-2.5">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
                    <span className="h-3 w-3 rounded-full bg-teal-400/80" />
                    <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
                    <span className="ml-2 font-mono text-xs text-slate-500">
                      {`>_ send_message.sh`}
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 font-mono text-[10px] text-emerald-400">
                    <Loader className="h-3 w-3" />
                    {`>_`}
                  </span>
                </div>

                {/* Fields */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {renderField('name', t.contact.name, 'text', true)}
                  {renderField('email', t.contact.email, 'email', true)}
                </div>
                {renderField('phone', t.contact.phone, 'tel', false)}
                {renderField('subject', t.contact.subject, 'text', true)}

                {/* Textarea */}
                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block font-mono text-xs text-slate-500"
                  >
                    <span className="text-emerald-400">&gt;_</span> {t.contact.message}
                    <span className="text-slate-600">:</span>
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
                    <p
                      className={`mt-1.5 font-mono text-xs font-medium ${
                        isDark ? 'text-rose-400' : 'text-rose-500'
                      }`}
                    >
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Success Banner */}
                {status === 'success' && (
                  <div
                    className={`flex items-center gap-2 rounded-lg border px-4 py-3 font-mono text-sm font-medium ${
                      isDark
                        ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400'
                        : 'border-emerald-500/40 bg-emerald-500/10 text-emerald-600'
                    }`}
                  >
                    <Send className="h-4 w-4" />
                    {t.contact.success}
                  </div>
                )}

                {/* Error Banner */}
                {status === 'error' && (
                  <div
                    className={`flex items-center gap-2 rounded-lg border px-4 py-3 font-mono text-sm font-medium ${
                      isDark
                        ? 'border-rose-500/40 bg-rose-500/10 text-rose-400'
                        : 'border-rose-500/40 bg-rose-500/10 text-rose-600'
                    }`}
                  >
                    <Loader className="h-4 w-4" />
                    {t.contact.error}
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  className="btn-primary inline-flex w-full items-center justify-center gap-2 font-mono disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
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
          </div>
        </div>
      </section>
    </>
  );
}

export default Contact;
