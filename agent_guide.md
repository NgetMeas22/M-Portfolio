# Agent Guide — NGET MEAS Portfolio (Black Hacker / Cyberpunk Minimalist)

Quick-start reference for AI agents (and humans) working on this codebase. Read fully before editing
anything, and re-open the specific file before rewriting it so you honor the existing imports, data,
hooks, and translations.

---

## 1) One-line summary

A bilingual (English + Khmer) single-page React portfolio themed as a **"Black Hacker / Cyberpunk
Minimalist"** terminal — deep-black background, emerald (`#10b981`) primitive accents, monospace
typography (JetBrains Mono + Share Tech Mono for Latin, Kantumruy Pro for Khmer), glassmorphism,
matrix-rain canvases, and terminal-window card motifs everywhere. **No rainbow/gradient polychrome —
everything is muted emerald + grays.**

## 2) Stack (do NOT add new deps without asking)

- **React 19** + **Vite 8** (local tooling; Vite runs inside `node_modules/.bin/vite`)
- **Tailwind CSS v4** — config is **CSS-first** via `@theme` in `src/index.css` (NOT a `tailwind.config.js`)
- **react-router-dom v7**, **lucide-react** (icons), **AOS** (scroll animations), **canvas** Matrix rain
- Custom context hooks: `useLanguage` (i18n), `useTheme` (theme), all driven from `src/hooks/`

## 3) Paths / environment (CRITICAL)

- The directory name contains spaces: `D:\Code All\Project_professional_All\Portfolio`
- **Windows host, Git Bash shell.** After any `write`, `git` may emit harmless `LF will be replaced by
  CRLF` warnings — ignore them. When git handles a file, choose *Keep Working Copy* so edits aren't lost.
- **Do not** alter file paths, casing, or rename dirs (git case-sensitivity + react-router imports).
- CV: the real file is `public/CV_NgetMeas.pdf`. CV download-button links MUST point to
  `/CV_NgetMeas.pdf` **with** `download="CV_NgetMeas.pdf"` (see Home + Resume). An old wrong link was
  `/NgetMeas_CV.pdf` — keep it fixed to the real file.

## 4) Commands (workdir: the project root)

| Task | Command |
|---|---|
| Install | `npm install` |
| Dev server | `npm run dev` |
| Lint a file | `npx eslint "src/pages/Home/Home.jsx"` |
| Lint all / build | `npm run lint` → `npm run build` |
| Commit & push | `git add -A && git commit -m "msg" && git push origin main` |

**Workflow rule:** always run `npm run lint` after touches (project ships lint-clean). After page
rewrites, run `npm run build` to confirm the cyber classes resolve. Remote is `origin/main` on GitHub.

## 5) File map

```
src/
  App.jsx                 – routes + Theme/Language providers, redesigned wrappers
  main.jsx                – entry
  index.css               – @theme tokens + FULL cyber utility layer (see §6)
  locales/en.js kh.js     – translations: EN + KH. BOTH must stay in sync (same keys)
  hooks/
    useLanguage.jsx  useLanguage.jsx   – i18n context (t.*, language, setLanguage)
    useTheme.jsx     useTheme.jsx      – theme context (isDark, theme, toggleTheme)
  data/
    skills.js  projects.js  experience.js  certificates.js  blog.js   – ALL content lives here
  components/
    Navbar/  Footer/  ... + Layout, Hero, SocialIcons, LanguageSwitcher, ThemeSwitcher, ...
  pages/
    Home/ About/ Skills/ Services/ Projects/ ProjectDetails/
    Experience/ Education/ Certificates/ Blog/ Contact/ Resume/ NotFound/
  translations/ (etc.)
```

**Golden rule — never hardcode content:** pages render from `src/data/*` + locale keys `t.*`
(`useLanguage()`), never inline English/Khmer prose or fake data. Keep both locales in sync when you
touch a key. Preserve `import` lines, hooks (`useLanguage`/`useTheme`/`useLanguage`/`useLanguage`),
and AOS calls exactly.

## 6) CSS utility classes (already defined in `src/index.css`)

Use ONLY these + Tailwind. Do NOT invent new classes; add any genuinely new one to `index.css` with the
others. Palette: bg `#050505`, surface `#0c0f0e`, border `#1f2937`, primary `#10b981`, accent
`#34d399`, secondary text `#94a3b8`.

- Wrappers / bg: `grid-bg`, `grid-pattern`, `grid-pattern-grid`; `pt-28 lg:pt-32` (top clearance —
  the fixed navbar overlaps unless you add it on the OUTERMOST section; never `pt-24`)
- Cards: `card`, `card-hover`, `glass`, `glass-sm/md/lg`, `glow-sm/md/lg`
- Type: `section-title`, `section-subtitle`, `cyber-badge` (labels like `>_ projects.init`),
  `terminal-badge`, `font-mono`
- Buttons: `btn-primary`, `btn-outline`, `btn-ghost`
- Pills: `tag` (neutral emerald text — **use for ALL tags, no rainbow pills**)
- Effects: `glow-*`, `matrix-rain`, `grid-dot`, `grid-pattern`, `underline-glow`, `flicker`,
  `delay-*` (AOS), `blinking`, `scanline`, `matrix-rain-grid`

## 7) Typical task flow (example: redesign a page)

1. `write`/`edit` the page JSX using the `§6` classes, preserving all imports, data, hooks, and `t.*`
2. `npx eslint "src/pages/<P>/<P>.jsx"` — fix lines you introduced (unused vars/imports are the usual
   culprit)
3. `npm run build` → confirm cyber classes resolve (warning about `@theme` in the minifier is harmless)
4. Only commit+push when the user asks.

## 8) Gotchas / traps

- Light theme exists (`isDark`/`useTheme`) — respect it, but the design is **dark-first**; keeping
  pages readable in light by using the same classes + `body.light` overrides in `index.css`.
- `Math.random()`/crypto during render ticks off `eslint react-hooks/clean-up` guards in older versions
  — if lint complains, memoize or gate it (e.g. blink cursors with CSS `blink` keyframe instead).
- Keep AOS `data-aos` attributes; don't double-init.
- Don't rename keyframe/class names used by other pages (they're shared globals).
- Two locale files = two places to update for every user-visible string.
