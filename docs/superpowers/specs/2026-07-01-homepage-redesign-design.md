# Zhi Li Homepage Redesign

## Goal

Replace the current panel-switching academic homepage with a modern, professional, image-led research profile while preserving the site's content, URLs, search metadata, and GitHub Pages deployment.

The selected direction is **Research Atlas**: scientific imagery leads the visual hierarchy, while publications and professional information remain easy to scan.

## Constraints

- Use plain static HTML and CSS.
- Keep GitHub Pages and the current project URL.
- Require no framework, package manager, build step, CMS, or web-font service.
- Preserve working files, media, external profile links, section anchors, sitemap files, and structured data.
- Keep maintenance suitable for infrequent manual updates.

## Information Architecture

The homepage remains a single scrolling document with these sections:

1. Hero: name, field, title, affiliation, and primary academic links.
2. Research: major research themes supported by existing simulation imagery.
3. Publications: selected papers first, followed by the complete publication list.
4. Movies: existing simulation videos with clear labels and browser fallbacks.
5. Teaching: current teaching material and links.
6. Beyond Research: the bird gallery as a quieter personal section.
7. Contact: current email, phone, affiliation, and address.

Existing fragment identifiers remain valid: `home`, `research`, `publication`, `movies`, `teaching`, `gallery`, and `contact`.

## Visual System

- Use the existing `cmz.jpg` research image as the hero's primary visual.
- Use existing research and portrait images elsewhere at their natural aspect ratios.
- Use a white and graphite base, vermilion primary accent, and muted green secondary accent.
- Use a system serif stack for display headings and a system sans-serif stack for body text.
- Use full-width page bands and unframed layouts; reserve cards for genuinely repeated research items only.
- Keep content within a readable maximum width while allowing hero and research media to span wider.
- Use a sticky desktop navigation and a compact native mobile navigation without JavaScript.
- Keep motion minimal and honor `prefers-reduced-motion`.

## Implementation Shape

- Rewrite `index.html` as semantic HTML with `header`, `nav`, `main`, `section`, `article`, and `footer` elements.
- Add one stylesheet at `assets/css/site.css`.
- Remove references to the old jQuery panel template and its JavaScript.
- Remove obsolete template files only after a reference audit confirms that the new page does not use them.
- Preserve the existing image, video, PDF, teaching, robots, and sitemap paths.
- Preserve and update the existing `Person` JSON-LD only where markup changes require it.

No client-side state, dynamic data source, publication crawler, analytics package, or automatic content pipeline will be added.

## Accessibility And Resilience

- Maintain one logical heading hierarchy and one visible page title.
- Add meaningful alternative text to content images; decorative images use empty alternative text.
- Ensure links and controls have visible keyboard focus and adequate contrast.
- Ensure navigation and content remain usable without JavaScript.
- Provide text or direct-link fallbacks for video and downloadable resources.
- Let long publication titles, URLs, and labels wrap without overlapping other content.

## SEO Preservation

The redesign must retain:

- Canonical URL.
- Page title and meta description.
- Robots directives and Google verification tag.
- Open Graph and Twitter metadata.
- `Person` JSON-LD, including current affiliation, email, and `sameAs` profile URLs.
- `robots.txt`, `sitemap.xml`, and `sitemap.txt`.
- Existing public URL and section anchors.

## Migration

1. Record the current internal anchors, local assets, external links, and structured data.
2. Build the replacement HTML and CSS locally using existing content and assets.
3. Verify content parity, asset resolution, responsive layout, and SEO metadata.
4. Remove confirmed-unused template dependencies.
5. Commit and push the redesign to `master`.
6. Poll the public GitHub Pages URL until the new version is served, then repeat the critical checks against production.

The previous site remains recoverable from Git history.

## Verification

- Parse the JSON-LD successfully and compare required identity fields.
- Check every local `href`, `src`, and section fragment target.
- Confirm profile, institution, ADS, arXiv, CV, and teaching links remain present.
- Confirm all required section IDs and contact details are present.
- Run `git diff --check`.
- Inspect desktop, tablet, and mobile screenshots for overflow, overlap, unreadable text, broken media, and navigation problems.
- Confirm the public page returns HTTP 200 and serves the new content after deployment.

## Acceptance Criteria

- The site presents the approved Research Atlas design on desktop and mobile.
- All existing academic and personal sections remain available.
- No working asset, document, video, external profile, or section URL is lost.
- The page loads without jQuery or another JavaScript framework.
- The SEO and identity metadata remain valid and consistent with visible content.
- The repository requires no new dependency or build command.
- The deployed GitHub Pages site passes the same content and metadata checks as the local version.
