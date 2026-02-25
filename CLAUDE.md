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
  literature.json             # 30 empirical papers with country, methodology, findings
  metricDescriptions.ts       # Definitions for the 6 outcome metrics

lib/
  knobUtils.ts                # Shared types (Scenario, KnobPageConfig, LiteraturePaper), helpers
```

### Key Patterns
- **Knob pages are data-driven**: Each page imports its JSON, casts to typed arrays, builds a `KnobPageConfig`, and passes it to `KnobPageLayout`. To add a scenario, just add to the JSON array.
- **Scenario structure**: Every scenario has `id`, `name`, `description`, `intended_effects` (metric → "Level (explanation)"), `systemic_risks` (metric → "Warning: explanation" or "Critical Warning: explanation"), optional `literature_ids` (array of paper IDs from literature.json), and optional `interactions` (Record<knob display name → explanation string>).
- **Effect level vocabulary**: Very High > High > Medium-High > Medium > Medium-Low > Low. The `GaugeCard` component parses these into progress bar widths.
- **Literature matching**: Two-tier system. Papers match knob pages via the `control_knob` field (slash-separated, e.g. "Payment / Regulation" matches both pages) for the collapsible "show more papers" section. When a scenario is selected, its `literature_ids` pull papers from the full set (cross-knob references work) and display them inline above the toggle.
- **Cross-knob interactions**: Scenarios with `interactions` show colored pill chips (using each target knob's color) with tooltip explanations. The diagram highlights interacting knobs with pulsing ring indicators.
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

## Current Feature Set (as of 2026-02-25)
- Interactive SVG diagram with 5 clickable knobs and 6 clickable outcome metrics
- 50 policy scenarios across 5 knob pages with intended effects and systemic risks
- Progress bar visualizations showing effect levels when a scenario is selected
- Scenario comparison mode (select two scenarios, side-by-side effects/risks with divergence highlighting)
- 30 empirical papers (literature.json) with smart two-tier display: linked papers shown inline when scenario selected, remaining papers behind collapsible toggle
- Paper count badges on scenario cards indicating literature support
- Cross-knob interaction mapping: colored pill chips with tooltip explanations, pulsing ring indicators on related knobs in the diagram
- 41 scenario-to-paper linkages across all 5 knobs (cross-knob references resolve correctly)
- 18 scenarios with explicit cross-knob interaction data
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

### 2026-02-25 — Literature Integration + Cross-Knob Interaction Mapping
**What was done:**
- Added 11 new empirical papers to `literature.json` (now 30 total): Maryland global budgets (Hogan 2017), CMS bundled payments (Dummit 2016), VBID copay adherence (Chernew 2008), Medicare Advantage risk adjustment (Brown 2014), Singapore MSAs (Hsiao 1995), tobacco price elasticity (Chaloupka 2002), NICE cost-effectiveness thresholds (Dakin 2015), primary care contribution (Starfield 2005), Kaiser vertical integration (Enthoven 2004), Cochrane shared decision-making (Stacey 2017), Cochrane nurse substitution (Laurant 2018)
- Added `literature_ids` and `interactions` optional fields to the Scenario type in `knobUtils.ts`
- Linked 41 scenario-to-paper references across all 5 knob pages, including 15 matches identified through systematic audit of existing papers against unlinked scenarios
- Added cross-knob interaction data to 18 scenarios with explanations of how knobs influence each other
- Built cross-knob interaction UI: colored pill chips (each knob's own color) with hover tooltip explanations, linking to target knob pages. Pulsing ring indicators on related knobs in the diagram
- Redesigned Empirical Evidence section: two-tier display with linked papers shown inline when a scenario is selected, remaining knob papers behind a collapsible toggle. Cross-knob paper references resolve correctly (linked papers pull from full paper set, not just knob-filtered set)
- Added paper count badges (BookOpen icon + "N papers") on scenario cards
- Enlarged tooltip component: fixed-width (22rem/28rem), left-anchored, larger text for legibility
- Cleaned up information density: literature defaults to collapsed, interactions are compact pills rather than full text sections

**Current state:** 50 scenarios, 30 papers, 41 paper linkages, 18 cross-knob interaction mappings. All features verified across all 5 knob pages.

---

## Critique of Current Site

**Strengths:**
- Diagram-to-scenario interaction is intuitive: click knob → pick scenario → effects light up, related knobs pulse
- Cross-knob interactions make the framework's interconnections visible rather than just described in text
- Literature is now directly tied to scenarios — clicking a scenario surfaces its supporting evidence
- Scenario comparison mode enables the core pedagogical move of contrasting policy trade-offs
- Scenario writing quality is strong: trade-offs named, mechanisms explained, ratings justified
- Mobile layout holds up well

**Remaining weaknesses:**
1. **No narrative arc** — The site is a reference tool, not a guided learning experience. No suggested path, no "start here", no way to pose a policy question and explore across knobs.
2. **Outcome metrics are underutilized** — Can click a metric for its definition, but can't filter by it ("show me all scenarios with High efficiency"). Metrics feel like labels, not analytical tools.
3. **15 scenarios lack literature support** — salary/budget, reference pricing, general taxation, insurance premiums, external aid, SHI, CBHI, public integrated, PPP, not-for-profit, decentralized district, licensure, accreditation, clinical standards (regulation), malpractice, certificate of need, pharma regulation, clinical guidelines (behavior), CME, health education, social marketing.
4. **32 scenarios lack cross-knob interaction data** — interactions field only populated for scenarios where the mapping was most clear; remaining scenarios would benefit from the same treatment.
5. **No visual distinction between effect levels on scenario cards** — "Medium" and "Medium-High" look identical; only the progress bars in the diagram differentiate them.

---

## Next Steps — Feature Roadmap

### Near-Term: Content Completeness & Polish

**Fill Literature Gaps**
- Add ~10-15 papers for the 15 unlinked scenarios (malpractice/defensive medicine, public integrated systems, SHI fragmentation, CHW sustainability, CME effectiveness, etc.)
- *Scope: data/literature.json only. ~1 session.*

**Complete Cross-Knob Interaction Data**
- Add `interactions` field to remaining 32 scenarios
- *Scope: 5 JSON data files only. ~1 session.*

**Visual Polish**
- Color-coded effect level indicators on scenario cards (e.g., subtle background tint by level)
- Animated transitions for scenario selection, panel expansion (Framer Motion or CSS)
- Refine tooltip positioning edge cases on mobile
- *Scope: KnobPageLayout.tsx, GaugeCard.tsx, globals.css. ~1 session.*

### Medium-Term: New Features

**Country Case Studies**
- Add `/cases` page with 4-6 country profiles (Taiwan, UK, Germany, Thailand, Rwanda, USA)
- Each case maps the country's knob configuration onto the diagram
- Link to relevant literature entries by country field
- *Scope: new page + new data file + reuse of ControlKnobsDiagram. ~1-2 sessions.*

**"Build Your System" Interactive Mode**
- Select one scenario from each knob, see combined effect profile with conflicts/reinforcements highlighted
- This is the pedagogical endgame — forces students to confront trade-offs across the full framework
- *Scope: new page + new component + cross-knob conflict detection logic. ~2 sessions.*

**Search / Filter Across Scenarios**
- Filter by outcome metric ("show me all scenarios with High efficiency") or search by keyword
- Becomes more valuable as scenario count grows
- *Scope: new component + KnobPageLayout.tsx. ~1 session.*

**Glossary / Definitions Panel**
- Linkable glossary for health systems terminology (moral hazard, adverse selection, monopsony, etc.)
- Could surface inline via tooltips on technical terms in scenario descriptions
- *Scope: new data file + component. ~1 session.*

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
