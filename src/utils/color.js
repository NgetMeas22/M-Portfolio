// Keep brand colors readable: lighten dark ones on the dark theme
// (PHP, SQLite, Vercel) and darken pale ones on the light theme (JS, React).
export const readableColor = (hex, isDark) => {
  const h = (hex || '').replace('#', '');
  if (h.length !== 6) return isDark ? '#34d399' : '#047857';
  const rgb = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
  const lum = (c) => 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
  const target = isDark ? 150 : 110;
  const mixWith = isDark ? 255 : 0;
  let out = rgb;
  for (let t = 0.1; t <= 1 && (isDark ? lum(out) < target : lum(out) > target); t += 0.1) {
    out = rgb.map((c) => Math.round(c + (mixWith - c) * t));
  }
  return `rgb(${out.join(',')})`;
};
