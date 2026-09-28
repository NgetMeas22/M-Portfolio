export default function PageBackground({ isDark }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div
        className="absolute -left-24 top-24 h-[420px] w-[420px] rounded-full blur-[110px] animate-blob"
        style={{
          background: isDark
            ? 'radial-gradient(circle, rgba(16,185,129,0.14) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute right-0 top-1/3 h-96 w-96 rounded-full blur-3xl animate-blob"
        style={{
          background: isDark
            ? 'radial-gradient(circle, rgba(20,184,166,0.10) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(20,184,166,0.10) 0%, transparent 70%)',
          animationDelay: '2.4s',
        }}
      />
      <div
        className="absolute left-10 bottom-1/4 h-[400px] w-[400px] rounded-full blur-[120px] animate-blob"
        style={{
          background: isDark
            ? 'radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 70%)',
          animationDelay: '4.8s',
        }}
      />
      <div className={`absolute inset-0 scanline ${isDark ? 'opacity-40' : 'opacity-20'}`} />
    </div>
  );
}
