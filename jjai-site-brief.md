# Jom Jumpa #AI — Resource Site
## Claude Code Project Brief

---

## What This Is

A custom-built website that serves as the home base for the **Jom Jumpa #AI** workshop series — a community initiative teaching AI-assisted software development to finance professionals and working adults in Singapore with no prior coding experience.

The site is the resource pack, the workshop companion, and eventually a living showcase of everything participants build. It needs to feel polished and purposeful — not a generic AI-generated page.

---

## Deployment Stack

- **Repository:** GitHub (public repo, it's setup here)
- **Hosting:** Netlify, connected to the GitHub repo for continuous deployment. Not yet done. 
- **Languages:** Plain HTML, CSS, JavaScript — no frameworks, no build steps, no npm
- **Single file or multi-file:** Multi-file is fine. Use whatever structure makes sense.
- **Goal:** Every `git push` to `main` auto-deploys to the live Netlify URL

This stack is intentional — the site itself is a live demonstration of what participants learn in Track 3 of the workshop.

---

## Aesthetic Direction

The four track pages that exist as standalone HTML files already have an established visual language. You can find them in the root directory. The main site should feel like the natural parent of those pages — elevated, editorial, with a warm-but-technical character.

**Reference points from existing track pages:**
- **Track 1** (warmest): Fraunces serif + Manrope sans, cream paper background (`#faf8f4`), coral accent (`#d94e3a`), gold (`#c89b4a`), green (`#2e7d5b`)
- **Track 2**: Inter + Fraunces, cool paper, blue accent (`#3b5ba5`)
- **Track 3**: Inter + JetBrains Mono, light documentation style, orange accent (`#c66a2a`)
- **Track 4**: Full dark mode, JetBrains Mono dominant, purple accent (`#b87ec9`)

**For the main site:** Take the warmth of Track 1 as the base. Layer in the editorial typographic sophistication of a quality print magazine. Think: warm cream backgrounds, generous whitespace, Fraunces serif for display text, a clean sans for body, JetBrains Mono for code/labels. The coral and gold accents from Track 1 carry through. Dark sections (like a footer or hero variant) should feel like Track 4's dark mode — confident and intentional, not just inverted.

**Tone:** Approachable but not dumbed down. Community-driven but polished. This is not a corporate site. It should feel like it was made by someone who cares about craft.

**Do not:** Use generic AI aesthetics (purple gradients, Inter everywhere, predictable card grids). The site should feel genuinely designed, not generated.

---

## Site Structure

### Pages / Sections

The site can be a single long-scroll page or have sub-pages. The single long-scroll approach is recommended for simplicity and to match the workshop format (one URL, always scroll to what you need).

**Section 1 — Hero**
- Event name: `Jom Jumpa #AI`
- One-line premise: *"Take an idea. Build it with AI. Ship it to the internet. In under an hour."*
- Subtext: *"A hands-on workshop for people who've never written code — and the curious who want to go further."*
- A visual element that communicates "something is live" — consider an animated terminal, a blinking cursor, or a countdown-style element

**Section 2 — The Golden Rule**
Always visible, styled prominently. This is the most important single instruction in the workshop.

> *"Always end your prompt with: Build this as a single self-contained HTML file with no external libraries. Clean, modern design. Mobile-friendly."*

Style it like a callout block or a pull quote — can't be missed.

**Section 3 — The 4 Tracks**
Four cards, each linking out to the corresponding standalone track HTML file. Cards should show:
- Track number + name
- One-line description
- "Who it's for" label
- A success criteria line ("You'll have: ...")
- A link/button that opens the track page

The track pages (`track-1-get-it-live.html`, `track-2-make-it-yours.html`, `track-3-dev-mode.html`, `track-4-bonus-round.html`) are standalone files that will sit in the same repository. Link to them directly.

Track colour coding (from existing pages):
- Track 1: Green `#2e7d5b`
- Track 2: Blue `#3b5ba5`
- Track 3: Orange `#c66a2a`
- Track 4: Purple `#7e4b8c`

**Section 4 — Built Tonight** *(the live showcase)*
A grid of cards showing apps built by participants. Initially populated manually — you will update this section by editing the HTML and pushing to GitHub (which auto-deploys via Netlify).

Each card should show:
- App name / description (a short label)
- The live URL (as a clickable link)
- An optional "🔥 Community Pick" badge (for voting, future phase)
- A subtle iframe preview OR just the URL styled as a card (iframe previews can be blocked by some sites, so style the card well enough to work without them)

For the initial build, include 2–3 placeholder cards so the section renders well. Comment the HTML clearly so it's easy to add real cards later.

The section heading: **"What the room built tonight"**

**Section 5 — Singapore AI Communities**
A clean list/grid of the key Singapore AI communities to join. Each entry needs:
- Name
- One-line description
- URL

Communities to include:
- **AI Tinkerers Singapore** — Monthly builder meetup, live demos, vetted attendees → `singapore.aitinkerers.org`
- **Global AI Singapore (Agentic Nights)** — Monthly meetup, beginner-friendly → `meetup.com/global-ai-singapore-community`
- **AI Events SG** — Master calendar for every AI event in Singapore → `aievents.sg`
- **AI Engineer Singapore** — Annual builder conference → `ai.engineer/singapore`
- **SuperAI** — Asia's largest AI conference at MBS → `superai.com`
- **AI Singapore** — National AI programme, apprenticeship schemes → `aisingapore.org`

**Section 6 — Level Up Your Tools**
A reference table of tools for going beyond the workshop. Keep it tight — no marketing copy, just what each tool is for.

| Tool | Best For | URL |
|---|---|---|
| Lovable | Most beginner-friendly full-app builder | lovable.dev |
| Bolt | Best free tier for prompt-to-app | bolt.new |
| v0 by Vercel | Beautiful UI components | v0.app |
| Replit | Full browser coding environment | replit.com |
| Claude Code | Terminal AI coding agent | claude.com/claude-code |
| Supabase | Free database for your app | supabase.com |
| Netlify | Free hosting + auto-deploy | netlify.com |
| GitHub Pages | Free permanent hosting | pages.github.com |

**Section 7 — Free Learning Resources**
A short list of the best free prompting guides.

- **Anthropic Prompting Guide** — From the makers of Claude → `docs.claude.com`
- **Learn Prompting** — Most comprehensive free guide online → `learnprompting.org`
- **Prompt Engineering Guide (DAIR.AI)** → `promptingguide.ai`
- **DeepLearning.AI — 1hr Course** — Andrew Ng + OpenAI, the single best hour to spend → `deeplearning.ai`

**Section 8 — Stay Connected**
- Join the WhatsApp community (link: https://chat.whatsapp.com/JKdwQrOXKMj3NOrwdvEkBL)
- Connect on LinkedIn → `linkedin.com/in/qanital`
- Subscribe to Substack → `qals.substack.com`
- A note that future sessions in the series will be announced here

**Section 9 — Footer**
- Event: Jom Jumpa #AI · 2026
- Hosted at UOB · Organised with Mendaki
- A small line: *"This site was built and deployed using exactly the tools we taught tonight."*

---

## Technical Notes

### File Structure
```
/
├── index.html                    ← main site (this file)
├── track-1-get-it-live.html      ← existing, don't modify
├── track-2-make-it-yours.html    ← existing, don't modify
├── track-3-dev-mode.html         ← existing, don't modify
├── track-4-bonus-round.html      ← existing, don't modify
└── assets/                       ← optional, for any images/icons
```

### Fonts
Load from Google Fonts. Use the same stack as the track pages for consistency:
```
Fraunces — display/headlines (serif, optical size variable font)
Manrope or similar — body text (clean sans)
JetBrains Mono — code snippets, labels, track numbers
```

### Animations
Use CSS animations only — no JS animation libraries. Suggestions:
- Subtle fade-in on scroll for sections (use IntersectionObserver in vanilla JS)
- A blinking cursor in the hero
- Hover states on cards that feel tactile (translate + shadow)
- The "Built Tonight" cards should feel like they're updating live — a subtle pulse on the section heading

### Navigation
A sticky top nav with:
- Site name / logo: `Jom Jumpa #AI`
- Links to each section (smooth scroll)
- On mobile: collapses to a hamburger or just hides nav links (single-page scroll, so this is low priority)

### Responsiveness
Mobile-first. Most attendees will scan the QR code on their phones during the session. Every section must work at 380px wide.

---

## The "Built Tonight" Section — How Updates Work

This is the key interactive section. The workflow for updating it during a live session:

1. Participant submits their app URL via the Tally form
2. During the prayer break (or whenever you have a moment), open the repo in GitHub Codespaces or using Claude Code CLI
3. Edit `index.html` — add a new card to the Built Tonight section
4. Ask Claude Code to commit and push: *"Add this card and push to main"*
5. Netlify detects the push and rebuilds — live within ~30 seconds
6. Show the class: their app is now on the site

This workflow is the live Track 3/4 demo. The site update IS the demo.

For Phase 2 (post-workshop), a voting/liking feature can be added. The natural implementation would use Supabase — which is exactly Track 4 Path A. The site continues to be a live classroom example.

---

## What to Build First

Build the main `index.html` in full. Do not modify the track HTML files — they are complete and will be linked from the main site.

When building, Claude Code should:
1. Read this brief fully before writing any code
2. Consider the aesthetic direction and make deliberate design choices — not defaults
3. Build mobile-first, test that every section renders cleanly at 380px
4. Comment the Built Tonight section clearly for easy manual updates
5. Make the Golden Rule unmissable — someone scanning on a phone should see it within 2 scrolls of landing on the page

---

## Placeholders to Fill In

Before going live, replace these:
- `[WHATSAPP_INVITE_LINK]` — the WhatsApp community invite URL
- `[TALLY_FORM_URL]` — `https://tally.so/r/Ek82MN` (already known)
- Placeholder Built Tonight cards → real URLs from participants
- Netlify site URL once claimed → update any self-referential links

---

## The Bigger Picture

This site is intentionally a proof of concept. It was planned in a conversation with an AI, the copy was written with an AI, and it will be built by an AI coding agent following this brief. During the workshop, it will be updated live by an AI agent in front of an audience.

That is the point. Not that AI does the work — but that with the right prompt and the right context, you can build real things faster than you thought possible. This brief is the prompt. The site is the output. The workshop is the story.

Build something worth showing.
