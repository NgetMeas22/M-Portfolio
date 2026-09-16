import { useEffect, useState } from 'react';
import { 
  Send, 
  MapPin, 
  Mail, 
  Phone, 
  Loader, 
  Terminal, 
  Activity, 
  Radio, 
  ShieldCheck, 
  KeyRound, 
  CheckCircle2, 
  Copy, 
  Check 
} from 'lucide-react';
import { GitHubIcon, LinkedInIcon } from '../../components/SocialIcons.jsx';
import { useLanguage } from '../../hooks/useLanguage';
import { useTheme } from '../../hooks/useTheme';
import AOS from 'aos';
import 'aos/dist/aos.css';

const inputClass = (isDark) =>
  `block w-full rounded-xl border bg-transparent px-4 py-3.5 font-mono text-sm outline-none transition-all duration-200 ${
    isDark
      ? 'border-emerald-950/80 bg-black/60 text-slate-100 placeholder:text-slate-600 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/20 shadow-inner'
      : 'border-emerald-200 bg-white text-slate-900 placeholder:text-slate-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/15 shadow-xs'
  }`;

const errorClass = (isDark) =>
  isDark ? 'border-rose-500/80 focus:border-rose-400 focus:ring-rose-500/20' : 'border-rose-400 focus:border-rose-500 focus:ring-rose-500/20';

// មុខងារជំនួយសម្រាប់គេចពីសញ្ញាពិសេសក្នុង Telegram Markdown
const escapeMarkdown = (text = '') => {
  return String(text).replace(/[_*[\]()~`>#+-=|{}.!]/g, '\\$&');
};

export default function Contact() {
  const { t, language } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // 'idle' | 'sending' | 'success' | 'error'
  const [copiedKey, setCopiedKey] = useState(false);

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

    const TELEGRAM_BOT_TOKEN = '8795346738:AAFqwRXOye_sRPAlh1F_FnWaH81uE-pTkBw';
    const TELEGRAM_CHAT_ID = '6494480634';

    const textPayload = `
🚀 *NEW PORTFOLIO MESSAGE*
--------------------------------
👤 *Name:* ${escapeMarkdown(form.name)}
📧 *Email:* ${escapeMarkdown(form.email)}
📱 *Phone:* ${escapeMarkdown(form.phone || 'N/A')}
📌 *Subject:* ${escapeMarkdown(form.subject)}

📝 *Message:*
${escapeMarkdown(form.message)}
    `.trim();

    try {
      const response = await fetch(
        `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text: textPayload,
            parse_mode: 'MarkdownV2',
          }),
        }
      );

      const result = await response.json();

      if (result.ok) {
        setStatus('success');
        setForm({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const handleCopyKey = () => {
    navigator.clipboard.writeText('4A9F 82C1 09DE 5521 B378 99AA DE02 7F45');
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const infoItems = [
    { icon: MapPin, label: t.contact.location, value: t.contact.locationValue, code: 'LOC_GATEWAY' },
    { icon: Mail, label: 'EMAIL DISPATCH', value: t.contact.emailValue, code: 'SMTP_TLS_465' },
    { icon: Phone, label: 'DIRECT COMMS', value: t.contact.phoneValue, code: 'VOICE_SECURE' },
  ];

  const socials = [
    {
      icon: GitHubIcon,
      href: 'https://github.com/NgetMeas22',
      label: 'GitHub',
      handle: '@NgetMeas22'
    },
    {
      icon: LinkedInIcon,
      href: 'https://linkedin.com/in/nget-meas-6525bb3a6',
      label: 'LinkedIn',
      handle: 'in/nget-meas'
    },
    {
      icon: Mail,
      href: 'mailto:measm2519@gmail.com',
      label: 'Email',
      handle: 'measm2519@gmail.com'
    },
  ];

  const renderField = (name, label, type = 'text', required = false) => (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block font-mono text-xs font-bold uppercase tracking-wider"
      >
        <span className={isDark ? 'text-emerald-500' : 'text-emerald-700'}>&gt;_</span>{' '}
        <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>{label}</span>
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
        placeholder={`Enter ${label.toLowerCase()}...`}
      />
      {errors[name] && (
        <p className={`mt-1.5 text-xs font-medium font-mono ${isDark ? 'text-rose-400' : 'text-rose-600'}`}>
          {errors[name]}
        </p>
      )}
    </div>
  );

  return (
    <section
      id="contact"
      className={`relative min-h-screen pt-28 lg:pt-36 pb-24 font-mono transition-colors duration-300 overflow-hidden ${
        isDark ? 'bg-[#030504] text-emerald-400' : 'bg-[#f4f7f5] text-slate-900'
      }`}
    >
      {/* AMBIENT GLOW BACKDROPS */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div
          className="absolute -left-20 top-24 h-96 w-96 rounded-full blur-3xl animate-blob"
          style={{
            background: isDark
              ? 'radial-gradient(circle, rgba(16,185,129,0.08), transparent 70%)'
              : 'radial-gradient(circle, rgba(16,185,129,0.12), transparent 70%)',
          }}
        />
        <div
          className="absolute bottom-12 right-0 h-96 w-96 rounded-full blur-3xl animate-flicker"
          style={{
            background: isDark
              ? 'radial-gradient(circle, rgba(45,212,191,0.06), transparent 70%)'
              : 'radial-gradient(circle, rgba(20,184,166,0.1), transparent 70%)',
          }}
        />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* HEADER */}
        <div className="mb-12 text-center" data-aos="fade-up">
          <span
            className={`mb-4 inline-flex items-center gap-2 border px-3.5 py-1 text-xs uppercase tracking-wider font-bold ${
              isDark
                ? 'border-emerald-500/40 bg-emerald-950/40 text-emerald-300'
                : 'border-emerald-600/30 bg-emerald-100/60 text-emerald-900'
            }`}
          >
            <Terminal className="h-3.5 w-3.5" />
            {'>_ contact.transmission'}
          </span>
          <h1
            className={`text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
            style={{
              textShadow: isDark
                ? '0 0 30px rgba(16, 185, 129, 0.45)'
                : '0 0 20px rgba(5, 150, 105, 0.15)',
            }}
          >
            {t.contact.title}
          </h1>
          <p
            className={`mx-auto mt-3 max-w-2xl text-base sm:text-lg ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}
          >
            {t.contact.subtitle}
          </p>
        </div>

        {/* TRANSMISSION TELEMETRY HUD STRIP */}
        <div
          className={`mb-14 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 border p-4 sm:p-5 rounded-xl ${
            isDark
              ? 'border-emerald-500/30 bg-black/60 shadow-[0_0_20px_rgba(16,185,129,0.1)]'
              : 'border-emerald-200 bg-white shadow-xs'
          }`}
          data-aos="fade-up"
        >
          <div className="space-y-0.5">
            <span className={`text-[10px] uppercase tracking-wider font-bold ${isDark ? 'text-emerald-600' : 'text-emerald-700'}`}>
              TUNNEL PROTOCOL
            </span>
            <div className={`text-xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
              TLS 1.3 / E2EE
            </div>
          </div>
          <div className="space-y-0.5">
            <span className={`text-[10px] uppercase tracking-wider font-bold ${isDark ? 'text-emerald-600' : 'text-emerald-700'}`}>
              SIGNAL STATUS
            </span>
            <div className="text-xl font-black text-emerald-500 flex items-center gap-1.5">
              <Activity className="h-4 w-4 animate-spin" /> READY // ONLINE
            </div>
          </div>
          <div className="space-y-0.5">
            <span className={`text-[10px] uppercase tracking-wider font-bold ${isDark ? 'text-emerald-600' : 'text-emerald-700'}`}>
              RESPONSE TIME
            </span>
            <div className={`text-xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
              &lt; 24 HOURS
            </div>
          </div>
          <div className="space-y-0.5">
            <span className={`text-[10px] uppercase tracking-wider font-bold ${isDark ? 'text-emerald-600' : 'text-emerald-700'}`}>
              PGP VERIFIED
            </span>
            <div className="text-xl font-black text-emerald-500 flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4" /> 4096-BIT RSA
            </div>
          </div>
        </div>

        {/* TWO-COLUMN GRID */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 items-start">

          {/* LEFT — SIGNAL HUD PANELS */}
          <div className="lg:col-span-5 flex flex-col gap-6" data-aos="fade-right">
            
            {/* TERMINAL RUNTIME NOTICE */}
            <div
              className={`flex items-center justify-between border-b pb-2 text-xs font-bold ${
                isDark ? 'border-emerald-950 text-emerald-600' : 'border-emerald-200 text-emerald-800'
              }`}
            >
              <span>$ netcat -zv target 443</span>
              <span className="flex items-center gap-1.5 text-emerald-500">
                <Radio className="h-3 w-3 animate-pulse" /> CONNECTED
              </span>
            </div>

            {/* CONTACT METHOD CARDS */}
            <div className="flex flex-col gap-4">
              {infoItems.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={index}
                    className={`group relative overflow-hidden rounded-xl border p-5 transition-all duration-300 ${
                      isDark
                        ? 'border-emerald-900/60 bg-black/90 hover:border-emerald-400 hover:shadow-[0_0_20px_rgba(16,185,129,0.1)]'
                        : 'border-emerald-200 bg-white hover:border-emerald-500 hover:shadow-md shadow-xs'
                    }`}
                  >
                    <span className={`absolute top-1.5 left-1.5 h-2 w-2 border-t border-l ${isDark ? 'border-emerald-500/40 group-hover:border-emerald-400' : 'border-emerald-300 group-hover:border-emerald-600'}`} />
                    <span className={`absolute bottom-1.5 right-1.5 h-2 w-2 border-b border-r ${isDark ? 'border-emerald-500/40 group-hover:border-emerald-400' : 'border-emerald-300 group-hover:border-emerald-600'}`} />

                    <div className="flex items-center gap-4">
                      <div
                        className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border transition-transform duration-300 group-hover:scale-105 ${
                          isDark
                            ? 'border-emerald-500/30 bg-emerald-950/40 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                            : 'border-emerald-300 bg-emerald-50 text-emerald-700 shadow-xs'
                        }`}
                      >
                        <IconComponent className="h-5 w-5" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between">
                          <p className={`text-[10px] font-bold uppercase tracking-wider ${isDark ? 'text-emerald-600' : 'text-emerald-700'}`}>
                            {item.label}
                          </p>
                          <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded border ${isDark ? 'border-emerald-950 bg-black text-slate-500' : 'border-emerald-100 bg-emerald-50 text-slate-500'}`}>
                            {item.code}
                          </span>
                        </div>
                        <p
                          className={`mt-1 truncate text-sm font-bold ${
                            isDark ? 'text-slate-100 group-hover:text-emerald-300' : 'text-slate-900 group-hover:text-emerald-800'
                          }`}
                        >
                          {item.value}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* PGP KEY SECURITY CHIP */}
            <div
              className={`rounded-xl border p-5 ${
                isDark
                  ? 'border-emerald-900/60 bg-emerald-950/15 text-slate-300'
                  : 'border-emerald-200 bg-white text-slate-700 shadow-xs'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`flex items-center gap-1.5 text-xs font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>
                  <KeyRound className="h-4 w-4" /> PGP_FINGERPRINT
                </span>
                <button
                  type="button"
                  onClick={handleCopyKey}
                  className={`inline-flex items-center gap-1 text-[10px] uppercase font-bold px-2 py-0.5 rounded border transition-colors cursor-pointer ${
                    isDark
                      ? 'border-emerald-800 bg-black text-emerald-400 hover:border-emerald-400'
                      : 'border-emerald-300 bg-emerald-50 text-emerald-800 hover:border-emerald-600'
                  }`}
                >
                  {copiedKey ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                  {copiedKey ? 'COPIED' : 'COPY'}
                </button>
              </div>
              <p className={`text-[11px] tracking-widest font-mono break-all ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                4A9F 82C1 09DE 5521 B378 99AA DE02 7F45
              </p>
            </div>

            {/* SOCIAL IDENTITIES */}
            <div className="pt-2">
              <p className={`text-xs font-bold uppercase tracking-widest mb-3 ${isDark ? 'text-emerald-600' : 'text-emerald-700'}`}>
                // EXTERNAL_GATEWAYS
              </p>
              <div className="grid grid-cols-3 gap-3">
                {socials.map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all duration-300 ${
                        isDark
                          ? 'border-emerald-950 bg-black/90 text-slate-400 hover:border-emerald-400 hover:text-emerald-400 hover:shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                          : 'border-emerald-200 bg-white text-slate-700 hover:border-emerald-600 hover:text-emerald-700 shadow-xs'
                      }`}
                    >
                      <IconComponent className="h-5 w-5 mb-1.5" />
                      <span className="text-[11px] font-bold">{social.label}</span>
                    </a>
                  );
                })}
              </div>
            </div>

          </div>

          {/* RIGHT — TERMINAL FORM DISPATCH */}
          <div className="lg:col-span-7" data-aos="fade-left" data-aos-delay="100">
            <div
              className={`relative overflow-hidden rounded-2xl border shadow-2xl transition-all ${
                isDark
                  ? 'border-emerald-500/40 bg-[#050807] shadow-[0_0_40px_rgba(16,185,129,0.15)]'
                  : 'border-emerald-200 bg-white shadow-emerald-950/5'
              }`}
            >
              {/* HUD CORNER RETICLES */}
              <span className={`absolute top-2 left-2 h-3.5 w-3.5 border-t-2 border-l-2 ${isDark ? 'border-emerald-400' : 'border-emerald-600'}`} />
              <span className={`absolute top-2 right-2 h-3.5 w-3.5 border-t-2 border-r-2 ${isDark ? 'border-emerald-400' : 'border-emerald-600'}`} />
              <span className={`absolute bottom-2 left-2 h-3.5 w-3.5 border-b-2 border-l-2 ${isDark ? 'border-emerald-400' : 'border-emerald-600'}`} />
              <span className={`absolute bottom-2 right-2 h-3.5 w-3.5 border-b-2 border-r-2 ${isDark ? 'border-emerald-400' : 'border-emerald-600'}`} />

              {/* TERMINAL TITLEBAR */}
              <div
                className={`flex items-center justify-between border-b px-5 py-3 text-xs ${
                  isDark
                    ? 'border-emerald-900/80 bg-emerald-950/40 text-slate-200'
                    : 'border-emerald-100 bg-emerald-50/80 text-slate-700'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="h-3 w-3 rounded-full bg-red-500/80" />
                  <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
                  <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 font-bold font-mono">
                    {`>_ payload_transmission.sh`}
                  </span>
                </div>
                <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 text-[10px] font-bold border rounded ${isDark ? 'border-emerald-500/30 text-emerald-400 bg-black' : 'border-emerald-200 text-emerald-800 bg-white'}`}>
                  <Activity className="h-3 w-3 animate-pulse text-emerald-500" /> BUFFER: READY
                </span>
              </div>

              {/* FORM INTERFACE */}
              <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5" noValidate>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {renderField('name', t.contact.name, 'text', true)}
                  {renderField('email', t.contact.email, 'email', true)}
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {renderField('phone', t.contact.phone, 'tel', false)}
                  {renderField('subject', t.contact.subject, 'text', true)}
                </div>

                {/* TEXTAREA MESSAGE */}
                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block font-mono text-xs font-bold uppercase tracking-wider"
                  >
                    <span className={isDark ? 'text-emerald-500' : 'text-emerald-700'}>&gt;_</span>{' '}
                    <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>{t.contact.message}</span>
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
                    placeholder="Enter mission description or payload message..."
                  />
                  {errors.message && (
                    <p className={`mt-1.5 font-mono text-xs font-medium ${isDark ? 'text-rose-400' : 'text-rose-600'}`}>
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* STATUS FEEDBACK BANNERS */}
                {status === 'success' && (
                  <div
                    className={`flex items-center gap-2.5 rounded-xl border p-4 text-xs font-bold ${
                      isDark
                        ? 'border-emerald-500/50 bg-emerald-950/40 text-emerald-300'
                        : 'border-emerald-500 bg-emerald-50 text-emerald-800'
                    }`}
                  >
                    <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                    <span>
                      {language === 'kh' 
                        ? 'សារត្រូវបានបញ្ជូនទៅ Telegram ដោយជោគជ័យ!' 
                        : t.contact.success}
                    </span>
                  </div>
                )}

                {status === 'error' && (
                  <div
                    className={`flex items-center gap-2.5 rounded-xl border p-4 text-xs font-bold ${
                      isDark
                        ? 'border-rose-500/50 bg-rose-950/40 text-rose-300'
                        : 'border-rose-400 bg-rose-50 text-rose-800'
                    }`}
                  >
                    <ShieldCheck className="h-5 w-5 text-rose-500 shrink-0" />
                    <span>
                      {language === 'kh' 
                        ? 'ការផ្ញើទៅ Telegram បរាជ័យ។ សូមព្យាយាមម្តងទៀត។' 
                        : t.contact.error}
                    </span>
                  </div>
                )}

                {/* SUBMIT BUTTON */}
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className={`w-full sm:w-auto inline-flex items-center justify-center gap-2.5 py-4 px-8 text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer disabled:cursor-not-allowed disabled:opacity-60 ${
                    isDark
                      ? 'bg-emerald-500 text-black hover:bg-emerald-400 hover:shadow-[0_0_28px_rgba(16,185,129,0.55)]'
                      : 'bg-emerald-600 text-white hover:bg-emerald-700 hover:shadow-lg'
                  }`}
                >
                  {status === 'sending' ? (
                    <>
                      <Loader className="h-4 w-4 animate-spin" />
                      TRANSMITTING_PACKET...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      DISPATCH_PAYLOAD
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}