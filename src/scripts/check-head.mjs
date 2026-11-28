#!/usr/bin/env node
/**
 * Audit A-02 — the CI head check.
 *
 * Crawls every dist/**\/index.html and fails if any page lacks exactly one
 * canonical, one <title>, one meta description and one <h1>, or breaks the
 * length rules. It also checks the things that quietly rot: a canonical on a
 * noindex page, an AI-generated image filename shipping to production (A-07 /
 * D-01), and JSON-LD that does not parse (A-05).
 *
 * Run with `npm run check:head` after a build. Wired into CI by
 * .github/workflows/quality.yml.
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const DIST = 'dist';
const ORIGIN = 'https://www.alliedplumbing.ca';
const seo = JSON.parse(readFileSync('src/data/seo.json', 'utf8'));

/** A-07 / D-01: nothing with one of these in its name may reach production. */
const AI_MARKERS = [/Gemini_Generated/i, /Prompt_Generation/i, /_Image_Script_Generation/i];

const failures = [];
const warnings = [];

function walk(directory) {
  const found = [];
  for (const entry of readdirSync(directory)) {
    const full = join(directory, entry);
    if (statSync(full).isDirectory()) found.push(...walk(full));
    else if (entry === 'index.html') found.push(full);
  }
  return found;
}

function routeFor(file) {
  const path = '/' + relative(DIST, file).replace(/index\.html$/, '');
  return path === '/' ? '/' : path.replace(/\/+$/, '');
}

function count(html, pattern) {
  return [...html.matchAll(pattern)].length;
}

/** Measure what a search engine sees, not what the markup spells. "O&M"
 *  ships as "O&amp;M", which is four characters longer in the source and the
 *  same length on the results page. */
function decode(text) {
  return text
    .replaceAll('&amp;', '&')
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&quot;', '"')
    .replaceAll('&#39;', "'")
    .replaceAll('&apos;', "'");
}

for (const file of walk(DIST)) {
  const route = routeFor(file);
  const html = readFileSync(file, 'utf8');
  const meta = seo[route];
  const fail = message => failures.push(`${route}: ${message}`);

  if (!meta) {
    fail('prerendered but missing from src/data/seo.json');
    continue;
  }

  const titles = [...html.matchAll(/<title>([\s\S]*?)<\/title>/g)];
  if (titles.length !== 1) fail(`expected 1 <title>, found ${titles.length}`);
  else {
    const title = decode(titles[0][1]);
    if (title.length > 60) fail(`title is ${title.length} chars (max 60): ${title}`);
  }

  const descriptions = [...html.matchAll(/<meta\s+name="description"\s+content="([^"]*)"/g)];
  if (descriptions.length !== 1) fail(`expected 1 meta description, found ${descriptions.length}`);
  else {
    const length = decode(descriptions[0][1]).length;
    if (length < 120 || length > 155) fail(`description is ${length} chars (want 120-155)`);
  }

  const h1s = count(html, /<h1[\s>]/g);
  if (h1s !== 1) fail(`expected 1 <h1>, found ${h1s}`);

  const canonicals = [...html.matchAll(/<link rel="canonical" href="([^"]+)"/g)];
  if (meta.noindex) {
    if (canonicals.length) fail('noindex route must not declare a canonical');
    if (!html.includes('content="noindex,follow"')) fail('noindex route is missing its robots tag');
  } else {
    if (canonicals.length !== 1) fail(`expected 1 canonical, found ${canonicals.length}`);
    else {
      const expected = ORIGIN + (route === '/' ? '/' : `${route}/`);
      if (canonicals[0][1] !== expected)
        fail(`canonical is ${canonicals[0][1]}, expected ${expected}`);
    }
  }

  for (const block of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      JSON.parse(block[1]);
    } catch (error) {
      fail(`invalid JSON-LD: ${error.message}`);
    }
  }

  for (const marker of AI_MARKERS) {
    if (marker.test(html)) warnings.push(`${route}: AI-generated asset still referenced (D-01)`);
  }

  if (!html.includes('data-prerendered="true"')) fail('not prerendered');
}

const routes = Object.keys(seo).length;
/* A licence is the one claim on the site that someone verifies against an
   external register, so it must never outlive its term. The pages drop a
   lapsed licence on their own; this is the earlier signal, while there is
   still time to renew and re-read the register. */
{
  const credentials = JSON.parse(readFileSync('src/data/credentials.json', 'utf8'));
  const today = new Date();
  const horizon = new Date(today.getTime() + 60 * 86_400_000).toISOString().slice(0, 10);
  const now = today.toISOString().slice(0, 10);
  for (const licence of credentials.licences) {
    if (licence.expires <= now)
      warnings.push(`${licence.number} expired on ${licence.expires} and is no longer published`);
    else if (licence.expires <= horizon)
      warnings.push(`${licence.number} expires on ${licence.expires} — renew and re-check the register`);
  }
}

/* An incentives page nobody revisits is worse than none: it is wrong with
   authority, and it sends an owner to a programme that has closed. */
{
  const incentives = JSON.parse(readFileSync('src/data/incentives.json', 'utf8'));
  const age = Math.floor((Date.now() - Date.parse(incentives.checked)) / 86_400_000);
  if (age > incentives.recheckDays)
    warnings.push(
      `incentives.json was checked ${age} days ago (re-check every ${incentives.recheckDays}) — programmes open and close`,
    );
}

if (warnings.length) {
  console.warn(`\n${warnings.length} warning(s):`);
  for (const warning of [...new Set(warnings)]) console.warn(`  ! ${warning}`);
}
if (failures.length) {
  console.error(`\n${failures.length} head check failure(s):`);
  for (const failure of failures) console.error(`  x ${failure}`);
  process.exit(1);
}
console.log(`Head check passed for ${routes} routes.`);
