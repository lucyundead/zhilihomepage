# Compact Homepage Visual Design

## Goal

Make the homepage feel more compact and polished, especially in the first viewport, while preserving its current content, academic identity, color palette, and static HTML/CSS architecture.

## Scope

- Reduce the visual height and apparent zoom of the hero.
- Tighten typography and vertical spacing throughout the page.
- Keep all existing sections, links, images, accessibility behavior, and search metadata.
- Add no dependencies, new artwork, or content-management workflow.

## Hero

On desktop viewports wider than 820px:

- Set the hero height to 470px, with a 440px minimum.
- Center the existing `cmz.jpg` inside a visual field capped at 1180px wide.
- Use the existing dark neutral palette behind the image so wide screens receive restrained side bands instead of a stretched scientific figure.
- Keep the solid contrast overlay and position the text near the lower-left of the shared 1180px content grid.
- Reduce the main name from 76px to 64px and the statement from 34px to 29px.
- Reduce hero content padding and the gaps around the role and academic-profile links.

At tablet and phone widths:

- Let the image use the available width so side bands do not consume scarce space.
- Use a 510px hero at tablet width and a 490px hero on phones.
- Keep the existing responsive wrapping and mobile navigation behavior.

## Page Rhythm

- Reduce default section padding from 104px to 84px.
- Reduce tablet section padding from 78px to 66px.
- Reduce section-header bottom margins from 48px to 38px.
- Reduce the About band, research-highlight separation, and Contact band proportionally.
- Reduce global section headings from 48px to 44px and compact-panel headings where needed.

## Content Components

- Shorten research-card images and reduce card-copy padding while preserving readable line lengths.
- Reduce highlight-card image columns and internal padding slightly.
- Tighten publication-row and movie-copy padding.
- Preserve stable grid dimensions, card alignment, and all existing breakpoints.
- Do not remove content or introduce nested cards, decorative effects, gradients, or additional controls.

## Verification

- Extend the dependency-free homepage regression test with compact-layout CSS contracts.
- Verify the full page at 1440x900, 1024x768, and 390x844.
- Confirm no horizontal overflow, text overlap, clipped profile links, or mobile-menu regression.
- Compare first-viewport screenshots before deployment.
- Push to `master` only after tests and visual checks pass, then verify the live HTML and CSS.
