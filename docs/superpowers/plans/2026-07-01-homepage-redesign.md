# Research Atlas Homepage Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the Astral/jQuery homepage with the approved dependency-free Research Atlas design while preserving content, anchors, media, and SEO.

**Architecture:** Keep one semantic `index.html` document and one custom `assets/css/site.css` stylesheet. Reuse all academic, gallery, PDF, and research-media assets; remove old template references, validate locally, visually inspect responsive layouts, then deploy through the existing GitHub Pages branch.

**Tech Stack:** HTML5, CSS3, JSON-LD, GitHub Pages, PowerShell and browser-based verification.

---

## File Map

- Modify `index.html`: semantic content, navigation, sections, SEO, JSON-LD, media, and links.
- Create `assets/css/site.css`: complete Research Atlas visual system and responsive behavior.
- Remove obsolete files under `assets/js`, `assets/sass`, `assets/webfonts`, and old template CSS after reference checks.
- Preserve `files`, `images`, `teaching`, `robots.txt`, `sitemap.xml`, and `sitemap.txt`.

### Task 1: Record The Existing Contract

**Files:**
- Read: `index.html`
- Read: `files/**`, `images/**`, `teaching/**`

- [ ] **Step 1: Record required section anchors and SEO fields**

Required anchors: `home`, `research`, `publication`, `movies`, `teaching`, `gallery`, `contact`.

Required identity fields: canonical URL, description, Google verification, Open Graph fields, `Person` JSON-LD, Scholar, ADS Library, ORCID, CV, current affiliation, and current contact details.

- [ ] **Step 2: Record all local references**

Run:

```powershell
rg -o '(href|src)="[^"]+"' index.html
Get-ChildItem -Recurse -File files,images,teaching | Select-Object -ExpandProperty FullName
```

Expected: every local page reference has a matching repository file or section target.

- [ ] **Step 3: Commit the planning baseline**

```powershell
git add docs/superpowers/specs/2026-07-01-homepage-redesign-design.md docs/superpowers/plans/2026-07-01-homepage-redesign.md
git commit -m "Plan homepage redesign"
```

### Task 2: Build The Semantic Homepage

**Files:**
- Modify: `index.html`
- Create: `assets/css/site.css`

- [ ] **Step 1: Write a failing content-contract check**

Run this before editing and confirm it fails because `site.css` and the Research Atlas markers do not exist:

```powershell
$html = Get-Content -Raw index.html
$required = @('assets/css/site.css','class="site-header"','class="hero"','class="research-grid"','class="publication-list"')
$missing = $required | Where-Object { -not $html.Contains($_) }
if ($missing.Count) { throw "Missing redesign markers: $($missing -join ', ')" }
```

- [ ] **Step 2: Replace the old shell with semantic HTML**

Use this top-level structure and retain the approved content inside each section:

```html
<body>
  <header class="site-header">
    <a class="site-name" href="#home">Zhi Li</a>
    <nav aria-label="Primary navigation">
      <a href="#research">Research</a>
      <a href="#publication">Publications</a>
      <a href="#movies">Movies</a>
      <a href="#teaching">Teaching</a>
      <a href="#gallery">Beyond Research</a>
      <a href="#contact">Contact</a>
    </nav>
  </header>
  <main>
    <section id="home" class="hero"><h1>Zhi Li</h1></section>
    <section id="research"><h2>Research</h2></section>
    <section id="publication"><h2>Publications</h2></section>
    <section id="movies"><h2>Simulation Movies</h2></section>
    <section id="teaching"><h2>Teaching</h2></section>
    <section id="gallery"><h2>Beyond Research</h2></section>
    <section id="contact"><h2>Contact</h2></section>
  </main>
  <footer><p>&copy; Zhi Li</p></footer>
</body>
```

Keep the full current research descriptions, six publications, two videos, seven teaching PDFs, twelve bird images, profile links, CV, and contact data. Correct malformed HTML and obvious encoding artifacts while preserving scientific meaning.

- [ ] **Step 3: Implement the approved visual system**

Define CSS custom properties for graphite, white, vermilion, green, muted text, border, serif, sans-serif, content width, and wide content width. Implement sticky navigation, image-led hero, research grid, publication rows, responsive videos, teaching links, gallery grid, contact layout, focus states, mobile navigation, and `prefers-reduced-motion`.

Do not add JavaScript, external fonts, gradients, decorative blobs, nested cards, or new dependencies.

- [ ] **Step 4: Run the content-contract check again**

Expected: exit code 0 with no missing redesign markers.

- [ ] **Step 5: Commit the working redesign**

```powershell
git add index.html assets/css/site.css
git commit -m "Redesign academic homepage"
```

### Task 3: Validate Content, Assets, And Metadata

**Files:**
- Verify: `index.html`
- Verify: `assets/css/site.css`

- [ ] **Step 1: Parse JSON-LD and verify identity data**

Use PowerShell regex to extract the `application/ld+json` block, pipe it through `ConvertFrom-Json`, and assert the current title, affiliation, email, and four `sameAs` URLs.

- [ ] **Step 2: Verify local assets and fragment targets**

Extract relative `href` and `src` values. Assert that every file exists and every `#fragment` has a matching `id`. Ignore `mailto:`, `http:`, and `https:` values for local existence checks.

- [ ] **Step 3: Verify content counts**

Assert seven required section IDs, six publication entries, two videos, seven teaching PDF links, twelve gallery images, three visible academic profile links, and no references to `jquery`, `assets/js`, `main.css`, or `noscript.css`.

- [ ] **Step 4: Run repository checks**

```powershell
git diff --check
git status --short
```

Expected: no whitespace errors and only intentional redesign files changed.

### Task 4: Responsive Visual QA And Cleanup

**Files:**
- Modify if needed: `index.html`
- Modify if needed: `assets/css/site.css`
- Remove after audit: obsolete Astral template assets.

- [ ] **Step 1: Serve the site locally**

Use a local static HTTP server and open the page in a Chromium browser.

- [ ] **Step 2: Capture desktop, tablet, and mobile screenshots**

Inspect at approximately 1440x1000, 768x1024, and 390x844. Check hero framing, navigation, publication wrapping, videos, gallery, contact text, focus visibility, image loading, horizontal overflow, and section spacing.

- [ ] **Step 3: Fix only observed layout defects**

Repeat screenshots until all three viewports are readable, non-overlapping, and free of horizontal scrolling.

- [ ] **Step 4: Remove confirmed-unused template assets**

Before deletion, run:

```powershell
rg -n 'assets/(js|sass|webfonts)|fontawesome|main\.css|noscript\.css' index.html assets/css/site.css
```

Expected: no matches. Remove only the obsolete Astral CSS, JavaScript, Sass, webfont, and background assets; preserve `assets/css/site.css`.

- [ ] **Step 5: Repeat all Task 3 checks and commit**

```powershell
git add index.html assets/css/site.css assets
git commit -m "Finish responsive homepage redesign"
```

### Task 5: Deploy And Verify Production

**Files:**
- Deploy: committed repository state on `master`

- [ ] **Step 1: Push the branch**

```powershell
git push origin master
```

- [ ] **Step 2: Poll GitHub Pages**

Request `https://lucyundead.github.io/zhilihomepage/` with a cache-busting query until it contains `assets/css/site.css` and `class="hero"`.

- [ ] **Step 3: Verify production content**

Repeat the JSON-LD, section, contact, profile-link, and local-asset checks against the deployed HTML. Confirm HTTP 200 for the homepage, stylesheet, hero image, CV, robots file, and both sitemap formats.

- [ ] **Step 4: Confirm repository state**

```powershell
git status --short --branch
```

Expected: `master` matches `origin/master`; the temporary `.superpowers` companion directory remains untracked and is not deployed.
