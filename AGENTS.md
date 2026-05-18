# Jom Jumpa #AI — workshop site

A one-night hands-on workshop for AI-assisted coding in Singapore. The site
itself is the curriculum: a landing page plus four track pages. Static HTML,
no build step, hosted on Netlify with auto-deploy from this GitHub repo. The
homepage's "Wall of Apps" feed is wired to Supabase via a Tally form and an
Edge Function — that flow is also a demo of what Track 4 teaches.

## How to run

```
python3 -m http.server 8765
# then visit http://localhost:8765
```

No package install needed for the site. The only Node dep is the Supabase CLI
(used for Edge Function deploys, not for running the site):

```
npx supabase functions deploy tally-webhook --no-verify-jwt
npx supabase db query --linked "<sql>"
```

The Supabase project is linked via `supabase/.temp/` (gitignored). Auth uses a
personal access token in `SUPABASE_ACCESS_TOKEN` or `npx supabase login --token`.

## Conventions

- **One self-contained HTML file per page.** All CSS and JS inline. No build
  step, no bundler, no framework.
- **External code only via CDN.** Currently only `@supabase/supabase-js` from
  esm.sh, loaded as a `<script type="module">` in `index.html`.
- **Typography:** Fraunces (serif, italics for emphasis) for headings, Manrope
  for body, JetBrains Mono for code/labels/eyebrows. Loaded from Google Fonts.
- **Colour tokens** live at the top of `index.html` under `:root`. Track pages
  duplicate the relevant subset locally. Track accents: T1 green `#2e7d5b`,
  T2 blue `#3b5ba5`, T3 orange `#c66a2a`, T4 purple `#7e4b8c`. Coral `#d94e3a`
  and gold `#c89b4a` are shared editorial accents.
- **Mobile-friendly is non-negotiable.** Pages use `clamp()` for headline
  sizing, safe-area insets on `.wrap`, and explicit breakpoints at 760/640/480.
- **Track structure:** each track page is independently startable. T1 ends with
  a "Phase 2: Keep Going" section. Cross-references between tracks are explicit
  ("from Track 2", "see Track 3") — keep these in sync if tracks are renumbered.
- **Edge Function (TypeScript/Deno):** matches Tally form field labels with
  substring patterns in `pick()`. Map by label, not by field key. Booleans and
  empty values are rejected. URLs are unwrapped from Tally's markdown encoding.

## Don't do this

- **No React, Vue, Tailwind, or any framework.** The workshop teaches that
  a single HTML file is enough. Adding tooling contradicts the message.
- **No build step.** No Vite, no webpack, no `npm run build`. If a change
  needs compiling, redesign the change.
- **Don't paste the Supabase secret key into client code.** Only the
  publishable key (`sb_publishable_*` or legacy anon JWT) goes in
  `index.html`. The secret key stays in Edge Function env vars.
- **Don't add CSS frameworks for "consistency".** The four track pages
  intentionally have slightly different visual personalities; that's the
  design, not drift.
- **Don't introduce npm dependencies to the site itself.** The Node
  dependency (`supabase` CLI) is dev-only. If new tooling is needed,
  question whether it belongs in this repo at all.
- **Don't commit `supabase/.temp/`, `node_modules/`, or `*:Zone.Identifier`.**
  These are gitignored.
- **Don't auto-rename or auto-restructure tracks** without updating every
  cross-reference. Track filenames and numbers appear in: `index.html` cards,
  internal links inside other tracks, the closing summary in `track-4`, and
  this file's file map.

## File map

```
index.html                       Landing page. Hero, golden rule, track
                                 cards, Wall of Apps feed (Supabase fetch),
                                 communities, tools, learn resources, connect.
track-1-get-it-live.html         Beginner flow (idea → URL via Lovable or
                                 Claude/ChatGPT + Netlify Drop). Includes
                                 Phase 2: iterate-redeploy rhythm, prompt
                                 library, gotchas.
track-2-dev-mode.html            GitHub + Netlify auto-deploy. Real repo,
                                 continuous deploy. ~20 min.
track-3-spec-it-out.html         Writing AGENTS.md for your repo. Five-section
                                 structure, hands-on procedure via GitHub
                                 web UI. The track this very file demonstrates.
track-4-bonus-round.html         Three optional paths: A) Codespaces +
                                 Copilot (the AGENTS.md payoff moment),
                                 B) Supabase database, C) Claude Code CLI.
resource-pack.html               SG AI scene (events + communities), four
                                 prompting-guide picks, and the tooling
                                 catalogue (8 workshop tools + 13 AI Engineer
                                 SG categories with search + level filter).
                                 Replaces the old Notion link.
submit.html                      Standalone submission page (QR target).
                                 Same form fields as before; inserts into
                                 `builds` and `submitters` via the
                                 publishable key. Has its own success state.
supabase/functions/tally-webhook/index.ts
                                 Deno Edge Function. Receives Tally form
                                 webhooks, verifies HMAC, parses field labels
                                 (handles markdown links and dropdown option
                                 IDs), inserts into `builds` table.
supabase/.temp/                  Supabase CLI scratch state. Gitignored.
jjai-site-brief.md               Original site brief — frozen, not the source
                                 of truth for current state.
package.json                     Single devDep: `supabase` CLI.
.gitignore                       node_modules, supabase scratch dirs,
                                 :Zone.Identifier files.
```

## Supabase project

- **Project ref:** `coixbvfepucdnzoxbklb`
- **URL:** `https://coixbvfepucdnzoxbklb.supabase.co`
- **Publishable key** is embedded in `index.html` (intentional — gated by RLS).

### Tables

- **`builds`** — publicly displayed on the Wall of Apps. Columns:
  `id`, `created_at`, `name`, `url`, `description`, `tag`, `submitter`
  (legacy, unused by new form), `approved` (default `true`), `pick`
  (default `false`).
- **`submitters`** — private contact details. One row per submission,
  linked by `build_id` (FK to `builds.id`, `on delete cascade`). Columns:
  `id`, `created_at`, `build_id`, `name`, `email`, `whatsapp`,
  `whatsapp_consent` (default `false`), `pdpa_consent` (default `false`).

### RLS policies

- `builds`:
  - `anon read approved` — SELECT where `approved = true`. Required;
    without it the homepage feed returns `[]`.
  - `anon insert builds` — INSERT with check `(true)`. Required for the
    in-app form to write public build data.
- `submitters`:
  - `anon insert submitters` — INSERT with check `(true)`.
  - **No SELECT policy** by design. Anon clients can write contact
    details but cannot read them back; only service-role (Supabase
    Studio, Edge Functions, `supabase db query --linked`) can.

### Intake flow

- **Primary intake** is the standalone page `submit.html`. Linked from
  `index.html` (the "submit your build →" header link and the
  placeholder cards). Designed for direct visits and **QR-code scans
  during the session**, hence its own URL. Inserts into `builds` and,
  if any contact field is filled, a linked row into `submitters`,
  using the publishable key + RLS.
- **Legacy:** `supabase/functions/tally-webhook/` (Deno Edge Function)
  parsed Tally form payloads when intake ran through Tally. Function is
  still deployed but unused — kept parked, not in the active path.

### Anti-spam note

Anon INSERT is open. For a one-night workshop this is acceptable — bad
rows can be flipped to `approved=false` in Supabase Studio or deleted.
Long-running events should add a CAPTCHA or move intake behind an Edge
Function with a signed token.
