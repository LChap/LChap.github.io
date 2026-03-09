# AI-Assisted Website Production Guide

> A living reference for building and iterating on this portfolio using Claude Code.
> Sources: [eesel.ai](https://www.eesel.ai/blog/claude-code-best-practices) · [Arize AI](https://arize.com/blog/claude-md-best-practices-learned-from-optimizing-claude-code-with-prompt-learning/) · [Claude Code Docs](https://code.claude.com/docs/en/common-workflows) · [DesignRush](https://www.designrush.com/agency/web-development-companies/trends/ai-and-web-development) · [AIT Systems](https://ait.systems/ai-in-web-development-2025/)

---

## The Production Cycle

Every AI-assisted web iteration follows four phases. Do not skip them.

```
EXPLORE → PLAN → IMPLEMENT → VERIFY
```

1. **Explore** — Read existing files before changing anything. Understand what's there.
2. **Plan** — State the goal, list files to change, identify risks. Ask Claude to pause before coding.
3. **Implement** — Make targeted, minimal changes. One concern per session.
4. **Verify** — Open the browser. Check layout, interactions, responsiveness. Commit only when satisfied.

---

## Project-Specific Context

| Item | Value |
|------|-------|
| Stack | Vanilla HTML / CSS / JS — no build step |
| Pages | `index.html` (home), `projects.html` (project grid) |
| Styles | `css/style.css` — single shared stylesheet |
| Scripts | `js/main.js` — single shared script |
| Assets | `assets/headshot.jpg` |
| Font CDN | Google Fonts — Inter |
| Icons CDN | Font Awesome 6.5.0 |
| Color palette | `--blue: #2c5f9e` · `--blue-light: #3a7bd5` · `--bg: #f0f2f5` |
| Hosting | GitHub Pages (`LChap.github.io`) |

---

## Best Practices

### 1. Provide rich context upfront

The more Claude knows before touching code, the fewer revision loops you need.

```
Tell Claude:
- The full file you want changed (paste it or reference it)
- The exact problem (visual bug, new feature, refactor)
- Any constraints (keep existing class names, no new dependencies)
- What "done" looks like
```

### 2. One concern per session

Mixing "fix the hero layout" with "add a contact form" in one prompt leads to large,
hard-to-review diffs. Break work into focused iterations.

```
Good:  "Fix the hex animation — after it runs, hover breaks."
Bad:   "Fix the animation, add contact, improve mobile, and change the font."
```

### 3. Read before editing

Claude should always read (`Read` tool) a file before editing it. If you're pairing
manually, always view the current source before sending a diff.

### 4. Preserve the CSS variable system

All color and sizing values live in `:root` variables. Never hardcode a color or
spacing value that already has a variable.

```css
/* Correct */
color: var(--blue);

/* Wrong */
color: #2c5f9e;
```

### 5. Keep JavaScript focused

`main.js` handles: parallax, sticky header, hex animation, search, back-to-top,
project filters. Each feature is isolated in a named block comment. Add new features
in the same pattern:

```js
// ============================================================
// FEATURE NAME
// ============================================================
```

### 6. Respect the two-file structure

This site intentionally has no framework, no bundler. Keep it that way unless there
is a clear, specific reason to add complexity. A new page = a new `.html` file that
shares `css/style.css` and `js/main.js`.

### 7. Mobile-first verification

After every visual change, check these breakpoints:
- 375px (iPhone SE)
- 768px (tablet)
- 1280px (desktop)

The CSS breakpoint is `@media (max-width: 768px)`. Add responsive overrides there.

### 8. Use Git branches for experiments

```bash
git checkout -b feature/contact-section
# work, verify
git checkout main && git merge feature/contact-section
```

Experiments that do not work get `git checkout .` — no harm done.

### 9. Semantic and accessible HTML

- Use `<section id="...">` for major content blocks
- All images need `alt` text
- Interactive elements need focus states (already handled by browser defaults + the CSS)
- Color contrast must meet WCAG AA (the current blue `#2c5f9e` on white passes)

### 10. Performance defaults

- CDN assets (Font Awesome, Google Fonts) load via `<link>` with `preconnect`
- No JavaScript frameworks — page loads in a single network round-trip
- Images should be ≤ 200 KB (headshot.jpg is acceptable at its current size)
- Avoid adding npm/node unless strictly necessary

---

## Common Iteration Patterns

### Adding a new section to index.html

1. Add the `<section id="new-section">` block in `index.html`
2. Add a nav link `<li><a href="#new-section">Label</a></li>`
3. Add styles in the `/* SECTION NAME */` block in `style.css`
4. If the section needs interactivity, add a JS block in `main.js`

### Adding a new project card

Open `projects.html` and copy an existing `.project-card` block. Update:
- `.project-icon` — Font Awesome icon class
- `<h3>` — project title
- `.project-desc` — description
- `.project-tags span` — tech tags (these drive the filter buttons)
- `.project-highlights` — bullet checkpoints
- `.project-link` href — GitHub URL

### Debugging a CSS layout issue

1. Add `outline: 2px solid red` to the suspect element temporarily
2. Check `grid-template-columns` and `gap` on the parent container
3. Check `position: sticky` — it only works when the parent doesn't have `overflow: hidden`
4. Remove the debug outline before committing

---

## Known Issues / Watch-outs

| Issue | Status | Notes |
|-------|--------|-------|
| Hex animation inline style override | Fixed | JS now clears inline styles after animation so CSS `:hover` works |
| Search on home page | Fixed | Redirects to `projects.html?q=...` when no cards present |
| `.skills-panel` sticky positioning | Working | Requires parent to not have `overflow: hidden` |

---

## Prompting Claude Code Effectively

### For visual changes
```
"Read css/style.css and index.html. In the hero section, add two CTA buttons:
'View My Work' linking to projects.html and 'Get In Touch' linking to #contact.
Style them consistently with the existing palette. Do not change any existing styles."
```

### For bug fixes
```
"Read js/main.js. The hex animation sets `transform: scale(1)` inline, which
removes the CSS `rotate(30deg)` and breaks hover. Fix it so hover still works
after animation completes."
```

### For new features
```
"Read projects.html and style.css. Add filter buttons above the project grid:
All, Python, Groq, Tavily. Clicking a button should show only cards whose
.project-tags contain that text. Active button gets the --blue color."
```

---

## ROI Benchmarks (Industry 2024–2025)

| Metric | Gain |
|--------|------|
| Developer productivity | +30–50% |
| Debugging speed | +50% |
| Bug rate reduction | 40–60% |
| Time-to-market | 25–40% faster |
| Time saved per developer | ≥ 30% (Stack Overflow 2024) |

---

*Last updated: March 2026 — Lucas Chapelle*
