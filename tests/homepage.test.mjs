import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const html = readFileSync(resolve(root, "index.html"), "utf8");
const css = readFileSync(resolve(root, "assets/css/site.css"), "utf8");
const sitemap = readFileSync(resolve(root, "sitemap.xml"), "utf8");
const readme = readFileSync(resolve(root, "README.txt"), "utf8");

test("the outdated CV is not linked from the page", () => {
  assert.doesNotMatch(html, /href=["'][^"']*CV_zli\.pdf/i);
  assert.doesNotMatch(html, />\s*View CV\s*</i);
});

test("the mobile menu is hidden while closed and closes after navigation", () => {
  assert.match(
    css,
    /\.mobile-nav:not\(\[open\]\)\s+nav\s*\{[^}]*display:\s*none;/s,
  );
  assert.match(html, /\.mobile-nav a["']\).*?removeAttribute\(["']open["']\)/s);
});

test("the homepage uses a compact bounded visual rhythm", () => {
  const hero = css.match(/(?:^|\n)\.hero \{([^}]*)\}/)?.[1] ?? "";
  const heroMedia = css.match(/(?:^|\n)\.hero-media \{([^}]*)\}/)?.[1] ?? "";
  const heroContent = css.match(/(?:^|\n)\.hero-content \{([^}]*)\}/)?.[1] ?? "";
  const section = css.match(/(?:^|\n)\.section \{([^}]*)\}/)?.[1] ?? "";
  const sectionHeader = css.match(/(?:^|\n)\.section-header \{([^}]*)\}/)?.[1] ?? "";

  assert.match(hero, /height:\s*470px;/);
  assert.match(hero, /min-height:\s*440px;/);
  assert.match(hero, /overflow:\s*hidden;/);
  assert.match(heroMedia, /width:\s*min\(100%,\s*var\(--wide\)\);/);
  assert.match(heroMedia, /margin-inline:\s*auto;/);
  assert.match(
    heroContent,
    /padding-left:\s*clamp\(0px,\s*calc\(\(100vw - 390px\) \* 0\.4\),\s*220px\);/,
  );
  assert.match(section, /padding:\s*84px 0;/);
  assert.match(sectionHeader, /margin-bottom:\s*38px;/);
  assert.match(css, /@media \(max-width: 820px\)[\s\S]*?\.hero \{[^}]*height:\s*510px;/);
  assert.match(css, /@media \(max-width: 600px\)[\s\S]*?\.hero \{[^}]*height:\s*490px;/);
});

test("the page exposes a consistent SHNU scholarly identity", () => {
  const jsonLdMatch = html.match(
    /<script type="application\/ld\+json">\s*([\s\S]*?)\s*<\/script>/,
  );
  assert.ok(jsonLdMatch, "Person JSON-LD should exist");
  const person = JSON.parse(jsonLdMatch[1]);

  assert.equal(person.name, "Zhi Li");
  assert.deepEqual(person.alternateName, ["Li Zhi", "李智"]);
  assert.ok(
    person.sameAs.includes("https://teacher.shnu.edu.cn/slxy/lz1/listm.htm"),
  );
  assert.match(html, /<[^>]+lang="zh-CN"[^>]*>李智<\/[^>]+>/);
  assert.match(html, />SHNU Profile</);
});

test("the page declares a local favicon", () => {
  assert.match(html, /<link rel="icon" href="images\/me\.jpg" type="image\/jpeg">/);
});

test("the publication section is current and does not claim completeness", () => {
  assert.doesNotMatch(html, /Complete list/i);
  assert.match(html, /The Impact of Bar-induced Noncircular Motions/);
  assert.match(html, /Bar-driven Gas Dynamics in NGC 1097/);
  assert.match(html, /The Milky Way Bar Potential Constrained/);
  assert.match(html, /How Nested Bars Enhance, Modulate, and Are Destroyed/);
  assert.match(html, /Bar-driven Gas Dynamics of M31/);
  assert.match(html, />Full publication record</);
});

test("publication links have paper-specific accessible names", () => {
  const groups = [...html.matchAll(/<p class="paper-links">([\s\S]*?)<\/p>/g)];
  assert.ok(groups.length >= 5);

  for (const [, group] of groups) {
    const links = [...group.matchAll(/<a\b([^>]*)>/g)];
    assert.ok(links.length > 0);
    for (const [, attributes] of links) {
      assert.match(attributes, /aria-label="[^"]+"/);
    }
  }
});

test("large media is opt-in and all video fallbacks use HTTPS", () => {
  assert.doesNotMatch(html, /<video\b[^>]*preload="metadata"/);
  assert.equal([...html.matchAll(/<video\b[^>]*preload="none"/g)].length, 2);
  assert.doesNotMatch(html, /href="http:\/\/hubble\.shao\.ac\.cn\/~zli\/.*?\.mp4"/);
  assert.match(html, /class="hero-media"[^>]*fetchpriority="high"/);
});

test("gallery images have useful descriptions", () => {
  const images = [
    ...html.matchAll(/<img\b[^>]*src="images\/bird\d+\.jpg"[^>]*alt="([^"]*)"[^>]*>/g),
  ];
  assert.equal(images.length, 12);
  for (const [, alt] of images) {
    assert.ok(alt.split(/\s+/).length >= 5, `Alt text is too generic: ${alt}`);
    assert.doesNotMatch(alt, /^Budgie photograph \d+$/);
  }
});

test("local links, media, and fragment targets resolve", () => {
  const localPaths = [...html.matchAll(/(?:href|src)="([^"]+)"/g)]
    .map(([, value]) => value)
    .filter((value) => !/^(?:https?:|mailto:|tel:|#)/.test(value));
  for (const path of localPaths) {
    assert.doesNotThrow(
      () => readFileSync(resolve(root, decodeURIComponent(path.split(/[?#]/)[0]))),
      `Missing local resource: ${path}`,
    );
  }

  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(([, id]) => id);
  assert.equal(new Set(ids).size, ids.length, "IDs should be unique");
  const fragments = [...html.matchAll(/href="#([^"]+)"/g)].map(([, id]) => id);
  for (const fragment of fragments) assert.ok(ids.includes(fragment), `Missing #${fragment}`);
});

test("sitemap metadata is minimal and current", () => {
  assert.match(sitemap, /<lastmod>2026-08-13<\/lastmod>/);
  assert.doesNotMatch(sitemap, /<(?:changefreq|priority)>/);
});

test("README describes the current site", () => {
  assert.match(readme, /Zhi Li/);
  assert.doesNotMatch(readme, /Astral by HTML5 UP/);
});
