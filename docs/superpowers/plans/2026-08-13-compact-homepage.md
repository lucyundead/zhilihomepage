# Compact Homepage Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reduce the hero's height and image scale while tightening the visual rhythm of every homepage section.

**Architecture:** Preserve the existing static HTML and responsive breakpoints. Center the hero image at a bounded desktop width over a neutral full-width background, then compact existing CSS dimensions without changing content or component structure.

**Tech Stack:** Static HTML5, CSS3, Node.js built-in test runner, GitHub Pages.

## Global Constraints

- Preserve all current content, links, images, accessibility behavior, search metadata, and mobile-menu behavior.
- Add no dependencies, new artwork, gradients, decorative effects, or new components.
- Use a 470px desktop hero, 510px tablet hero, and 490px phone hero.
- Cap the desktop hero image at 1180px and center it within a neutral full-width background.
- Use 84px default section padding, 66px tablet section padding, and a 38px section-header margin.
- Verify at 1440x900, 1024x768, and 390x844 before deployment.

---

### Task 1: Compact Visual Rhythm

**Files:**
- Modify: `tests/homepage.test.mjs`
- Modify: `assets/css/site.css`

**Interfaces:**
- Consumes: Existing `.hero`, `.hero-media`, `.hero-content`, `.section`, card, publication, movie, and contact selectors.
- Produces: The same selectors with compact dimensions; no HTML contract changes.

- [x] **Step 1: Write the failing compact-layout regression test**

Add a test that extracts the desktop rules and verifies the approved values:

```js
test("the homepage uses a compact bounded visual rhythm", () => {
  const hero = css.match(/(?:^|\n)\.hero \{([^}]*)\}/)?.[1] ?? "";
  const heroMedia = css.match(/(?:^|\n)\.hero-media \{([^}]*)\}/)?.[1] ?? "";
  const section = css.match(/(?:^|\n)\.section \{([^}]*)\}/)?.[1] ?? "";
  const sectionHeader = css.match(/(?:^|\n)\.section-header \{([^}]*)\}/)?.[1] ?? "";

  assert.match(hero, /height:\s*470px;/);
  assert.match(hero, /min-height:\s*440px;/);
  assert.match(hero, /overflow:\s*hidden;/);
  assert.match(heroMedia, /width:\s*min\(100%,\s*var\(--wide\)\);/);
  assert.match(heroMedia, /margin-inline:\s*auto;/);
  assert.match(section, /padding:\s*84px 0;/);
  assert.match(sectionHeader, /margin-bottom:\s*38px;/);
  assert.match(css, /@media \(max-width: 820px\)[\s\S]*?\.hero \{[^}]*height:\s*510px;/);
  assert.match(css, /@media \(max-width: 600px\)[\s\S]*?\.hero \{[^}]*height:\s*490px;/);
});
```

- [x] **Step 2: Run the test and verify the current oversized layout fails**

Run: `node --test --test-isolation=none tests/homepage.test.mjs`

Expected: the new compact-layout test fails on the current `680px` hero and `104px` sections; all existing tests remain green.

- [x] **Step 3: Implement the approved CSS values**

Apply these desktop values and proportionally compact the existing component rules:

```css
h2 { font-size: 44px; }
h3 { font-size: 28px; }
h4 { font-size: 21px; }

.hero {
  height: 470px;
  max-height: none;
  min-height: 440px;
  overflow: hidden;
  background: #343936;
}

.hero-media {
  width: min(100%, var(--wide));
  margin-inline: auto;
}

.hero-content { padding: 42px 0; }
.hero h1 { font-size: 64px; }
.hero-statement { font-size: 29px; }
.section { padding: 84px 0; }
.section-header { margin-bottom: 38px; }
```

Use `510px` at `max-width: 820px` and `490px` at `max-width: 600px`. Reduce About, research-card, highlight-card, publication, movie, teaching, contact, and footer spacing only through their existing selectors.

- [x] **Step 4: Run the full regression suite**

Run: `node --test --test-isolation=none tests/homepage.test.mjs`

Expected: all tests pass with zero failures.

### Task 2: Responsive Visual Verification And Deployment

**Files:**
- Verify: `index.html`
- Verify: `assets/css/site.css`
- Verify: `tests/homepage.test.mjs`

**Interfaces:**
- Consumes: The compact CSS from Task 1.
- Produces: A verified GitHub Pages deployment on `master`.

- [x] **Step 1: Inspect the diff and CSS integrity**

Run: `git diff --check` and `git diff --stat`.

Expected: no whitespace errors and no production files beyond `assets/css/site.css` changed.

- [x] **Step 2: Verify desktop, tablet, and phone layouts**

Serve the static site on a loopback-only temporary server. At `1440x900`, `1024x768`, and `390x844`, verify:

```text
document.documentElement.scrollWidth <= innerWidth
hero height = 470px, 470px, and 490px respectively
all hero text and profile links remain inside the hero
the closed mobile menu has display:none and a zero-sized rectangle
the next section is visible in the first viewport
```

Also inspect first-viewport screenshots and browser console output.

- [x] **Step 3: Run final tests and commit**

Run: `node --test --test-isolation=none tests/homepage.test.mjs`

Then:

```bash
git add assets/css/site.css tests/homepage.test.mjs docs/superpowers/plans/2026-08-13-compact-homepage.md
git commit -m "Compact homepage visual rhythm"
```

- [x] **Step 4: Push and verify GitHub Pages**

Run: `git push origin master`.

Verify that the live CSS returns HTTP 200 and contains `.hero { height: 470px; }`, the bounded hero-media rule, and the compact responsive values.
