# Health System Control Knobs — Project Context

## Purpose
An interactive teaching tool based on the Roberts, Hsiao, Berman & Reich "Getting Health Reform Right" framework. Designed for graduate-level health policy education. Users explore five policy control knobs and see how different configurations affect health system performance across six outcome dimensions.

Live at: `healthsystems.vercel.app`
Repo: `github.com/ARWTucker13/hs-site`

## Tech Stack
- **Framework**: Next.js 16 (App Router, static export via Turbopack)
- **Styling**: Tailwind CSS v4, custom `@theme` tokens in `globals.css`
- **Typography**: Source Serif 4 (body text), Space Mono (`.font-blueprint` headings/labels)
- **Icons**: lucide-react
- **Deployment**: Vercel (auto-deploys from `main` branch)
- **No backend / no database** — all data lives in JSON files under `data/`

## Architecture

### File Structure
```
app/
  page.tsx                    # Overview page — framework intro, metric descriptions
  layout.tsx                  # Root layout (max-w-6xl container)
  globals.css                 # Tailwind theme, Source Serif 4 + Space Mono imports
  knobs/
    financing/page.tsx        # Each knob page constructs a KnobPageConfig from its JSON
    payment/page.tsx
    organization/page.tsx
    regulation/page.tsx
    behavior/page.tsx

components/
  ControlKnobsDiagram.tsx     # SVG diagram — 5 knobs (left) → 6 outcomes (right)
  KnobLink.tsx                # Clickable knob labels in the diagram
  KnobPageLayout.tsx          # Shared layout: info panel, scenario cards, literature section
  MetricCard.tsx              # Outcome metric cards in the diagram
  GaugeCard.tsx               # Progress bar visualization for effect levels
  Tooltip.tsx                 # Reusable tooltip component

data/
  financingData.json          # 10 scenarios (5 revenue generation, 5 risk pooling)
  paymentData.json            # 11 scenarios (7 provider payment, 4 demand-side + VBID)
  organizationData.json       # 10 scenarios (6 delivery structure, 4 facility governance)
  regulationData.json         # 10 scenarios (5 quality/safety, 5 market/price)
  behaviorData.json           # 9 scenarios (5 provider behavior, 4 patient behavior)
  literature.json             # 19 empirical papers with country, methodology, findings
  metricDescriptions.ts       # Definitions for the 6 outcome metrics

lib/
  knobUtils.ts                # Shared types (Scenario, KnobPageConfig, LiteraturePaper), helpers
```

### Key Patterns
- **Knob pages are data-driven**: Each page imports its JSON, casts to typed arrays, builds a `KnobPageConfig`, and passes it to `KnobPageLayout`. To add a scenario, just add to the JSON array.
- **Scenario structure**: Every scenario has `id`, `name`, `description`, `intended_effects` (metric → "Level (explanation)"), and `systemic_risks` (metric → "Warning: explanation" or "Critical Warning: explanation").
- **Effect level vocabulary**: Very High > High > Medium-High > Medium > Medium-Low > Low. The `GaugeCard` component parses these into progress bar widths.
- **Literature matching**: Papers match knob pages via the `control_knob` field (slash-separated, e.g. "Payment / Regulation" matches both pages). Filtering is case-insensitive split on " / ".
- **Color system**: Each knob has a named color (green/purple/teal/rose/orange) defined in `KnobPageLayout.tsx`'s `COLOR_CLASSES`.

### Data Integrity Rules
- Outcome ratings in scenario JSON should be supported by empirical evidence where possible. The overview page caveat reminds users that ratings are literature-informed but context-dependent.
- Literature entries include: id, control_knob, country, authors, year, title, journal, context, methodology, finding, macro_takeaway.
- When updating ratings, note the empirical basis in the rating text (e.g., parenthetical explanation).

## Development Commands
```bash
npm run dev          # Start dev server (localhost:3000)
npm run build        # Production build — use this to verify before committing
npm run lint         # ESLint check
```

## Current Feature Set (as of 2026-02-23)
- Interactive SVG diagram with 5 clickable knobs and 6 clickable outcome metrics
- 50 policy scenarios across 5 knob pages with intended effects and systemic risks
- Progress bar visualizations showing effect levels when a scenario is selected
- 19 empirical papers with collapsible "Empirical Evidence" sections on each knob page
- Google Scholar links for each paper (opens in new tab)
- Literature-calibrated ratings where empirical evidence suggested miscalibration
- Responsive design (works on mobile and desktop)
- Caveat text on overview page about context-specificity of outcomes

## Session Log

### 2026-02-23 — Literature Layer, Scenario Expansion, Typography
**What was done:**
- Added `data/literature.json` with 19 verified empirical papers (country, methodology, findings, macro takeaway)
- Recalibrated 6 scenario ratings where empirical evidence showed miscalibration: FFS quality (Medium-High → Medium), DRG upcoding risk (Warning → Critical Warning), P4P quality (High → Medium-High), Peer Review quality (High → Medium-High), CCT health_status (Medium-High → High), Malpractice quality (Medium-High → Medium)
- Built collapsible "Empirical Evidence" section into KnobPageLayout with Google Scholar links, methodology badges, and filtered matching
- Added caveat text on overview page about context-specificity and path-dependence
- Switched body typography to Source Serif 4 (overriding Tailwind v4's `--font-sans` theme variable)
- Ran comprehensive gap audit across all 5 knobs against the Roberts/Hsiao framework
- Added 12 new scenarios: Global Budgets, Bundled Payments, VBID, Risk Adjustment, Medical Savings Accounts, Earmarked/Sin Taxes, HTA/Cost-Effectiveness Thresholds, Antitrust, Scope-of-Practice, Primary Care Gatekeeping, Vertical Integration, Shared Decision-Making
- Fixed Vercel deployment (reconnected to correct repo), confirmed mobile responsiveness
- Created CLAUDE.md

**Current state:** 50 scenarios across 5 knobs, 19 literature entries, deployed and working on mobile + desktop.

---

## Critique of Current Site

**Strengths:**
- Diagram-to-scenario interaction is intuitive: click knob → pick scenario → effects light up
- Scenario writing quality is strong: trade-offs named, mechanisms explained, ratings justified
- Literature section adds credibility and pedagogical depth
- Mobile layout holds up well

**Weaknesses to address:**
1. **Diagram is static/passive** — On knob pages, the other 4 knobs are visible but only navigate. No visual feedback showing how the selected scenario relates to other knobs, even though descriptions frequently reference cross-knob interactions.
2. **No scenario comparison** — Single-selection model prevents side-by-side comparison. For teaching trade-offs (FFS vs. Capitation, Global Budget vs. DRG), comparison is the core pedagogical move.
3. **Literature is hidden by default** — Collapsible toggle means most users may never open it. The papers are the strongest differentiator and should be more visible.
4. **No narrative arc** — The site is a reference tool, not a guided learning experience. No suggested path, no "start here", no way to pose a policy question and explore across knobs.
5. **Outcome metrics are underutilized** — Can click a metric for its definition, but can't filter by it ("show me all scenarios with High efficiency"). Metrics feel like labels, not analytical tools.
6. **No visual distinction between effect levels** — "Medium" and "Medium-High" look identical in scenario cards; you have to read the parenthetical. Progress bars in the diagram help, but cards themselves could use color coding.

---

## Next Steps — Feature Roadmap

### Work Blocks for Next Session (pick one or two)

**Option A: Literature Integration & Visibility**
- Surface paper count badges on scenario cards linking to the literature section
- Add inline literature citations in scenario risk/effect text where they exist
- Default the literature section to expanded (or expanded on first visit)
- Add ~10-15 new literature entries for the 12 newly added scenarios (Global Budgets → Maryland all-payer; HTA → NICE evaluations; Risk Adjustment → Medicare Advantage; Vertical Integration → Kaiser)
- *Scope: data files + KnobPageLayout.tsx. ~1 session.*

**Option B: Scenario Comparison Mode**
- Add a "Compare" toggle allowing selection of 2 scenarios within a knob page
- Render side-by-side panel showing both effects and risks
- Highlight divergences (e.g., FFS has High access but Critical efficiency risk; Capitation inverts this)
- *Scope: KnobPageLayout.tsx only. ~1 session. High pedagogical value.*

**Option C: Country Case Studies**
- Add `/cases` page with 4-6 country profiles (Taiwan, UK, Germany, Thailand, Rwanda, USA)
- Each case maps the country's knob configuration onto the diagram
- Link to relevant literature entries by country field
- *Scope: new page + new data file + reuse of ControlKnobsDiagram. ~1-2 sessions.*

**Option D: Cross-Knob Interaction Mapping**
- Add `interactions` field to scenarios listing which other knobs they affect
- When a scenario is selected, highlight related knobs on the diagram
- Add "Related Scenarios" section showing relevant scenarios from other knobs
- *Scope: data files + ControlKnobsDiagram.tsx + KnobPageLayout.tsx. ~1 session. Addresses biggest conceptual gap.*

**Recommended starting point: Option B or D** — both address core pedagogical gaps and are technically scoped to a single session.

### Medium Priority (future sessions)
- **Search / Filter Across Scenarios** — Filter by outcome metric or search by keyword as scenario count grows
- **Glossary / Definitions Panel** — Linkable glossary for health systems terminology (moral hazard, adverse selection, monopsony, etc.)
- **"Build Your System" Interactive Mode** — Select one scenario from each knob, see combined effect profile with conflicts/reinforcements highlighted (pedagogical endgame)
- **Animated Transitions** — Smooth transitions for scenario selection, literature toggle, page navigation (Framer Motion or CSS)

### Lower Priority
- **PDF Export** — Export selected configuration as PDF for assignments/presentations
- **Instructor Mode** — Pre-built "lesson" configurations walking through specific policy questions
- **Dark Mode** — System preference, adapted dot-grid and color scheme
- **Accessibility Audit** — WCAG 2.1 AA: keyboard nav, screen reader labels for SVG, color contrast

## Content Expansion Opportunities
- Additional scenarios from the audit: Blended/Mixed Payment Systems, Coinsurance, Reinsurance/Catastrophic Risk Pools, Purchaser-Provider Split, Social Franchising, Quality Transparency/Public Reporting, Academic Detailing, Patient Navigators, Health Literacy Interventions
- Environmental and public health regulation (upstream determinants) as a new regulation subcategory
- The reference PDF `getting-health-reform-right.pdf` is in the project root for cross-referencing framework concepts

## Style Guidelines
- Body text: Source Serif 4 (serif). Headings/labels: Space Mono (monospace).
- Color palette: blue (info panels, literature), green/purple/teal/rose/orange (knob-specific).
- Scenario descriptions should be written at a graduate policy level — precise, evidence-aware, acknowledging trade-offs.
- Effect ratings should include parenthetical explanations of the mechanism, not just the level.
- Risk warnings should name the specific behavioral mechanism or market failure at play.
- Do not use emojis in the UI or data files.
