# Homepage Review Fixes

**Goal:** Resolve the actionable homepage review findings without changing the CV PDF or adding new dependencies.

**Approach:** Keep the site as static HTML/CSS. Add one small inline script only to close the native mobile `<details>` menu after navigation. Replace the misleading publication list with verified recent work and direct profile links.

## 1. Add regression coverage

- Add `tests/homepage.test.mjs` with Node's built-in test runner.
- Cover the CV link, mobile navigation, scholarly identity, recent publications, media loading, local references, and sitemap metadata.
- Run `node --test tests/homepage.test.mjs` and confirm the reviewed issues fail.

## 2. Apply the page fixes

- Update `index.html` identity metadata and visible SHNU profile links.
- Remove the stale CV button while leaving `files/CV_zli.pdf` untouched.
- Refresh the publications section with verified 2023-2025 papers.
- Close the mobile menu by default and after selecting a link.
- Defer video metadata loading, use HTTPS fallbacks, and improve repeated link labels.
- Simplify `sitemap.xml` and replace the obsolete template README.

## 3. Verify and publish

- Run the regression suite and inspect the diff.
- Check responsive behavior at desktop and mobile widths.
- Commit and push `master`, then verify the GitHub Pages deployment.
