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

## Next Steps — Feature Roadmap

### High Priority
1. **Comparative Country Case Studies** — Add a `/cases` section with 4-6 country profiles (e.g., Taiwan, UK, Germany, Thailand, Rwanda, USA) showing how each country configures its knobs. Could reuse the diagram component to visualize each country's configuration. Link to relevant literature entries by country field.

2. **Cross-Knob Interaction Highlighting** — When a scenario is selected, visually indicate which other knobs it interacts with (many scenarios have cross-knob implications noted in their descriptions). Could use subtle connector lines or badge indicators on the diagram.

3. **Scenario Comparison Mode** — Allow users to select 2 scenarios side-by-side within a knob page to compare their intended effects and risks. Useful for teaching trade-offs (e.g., FFS vs. Capitation, Global Budget vs. DRG).

4. **Search / Filter Across Scenarios** — As the scenario count grows, add a search bar or filter by outcome metric (e.g., "show me all scenarios with High efficiency").

### Medium Priority
5. **Literature Expansion** — Add more empirical papers, particularly for the newly added scenarios (Global Budgets → Maryland all-payer; HTA → NICE evaluations; Risk Adjustment → Medicare Advantage studies; Vertical Integration → Kaiser evidence). Target 30-40 papers total.

6. **Glossary / Definitions Panel** — A persistent or linkable glossary for health systems terminology (moral hazard, adverse selection, monopsony, Pigouvian tax, etc.) that could be referenced from scenario descriptions.

7. **"Build Your System" Interactive Mode** — Let users select one scenario from each knob and see the combined effect profile, highlighting where choices conflict or reinforce each other. This is the pedagogical endgame of the framework.

8. **Animated Transitions** — Add smooth transitions when selecting scenarios, toggling the literature panel, and navigating between knob pages. Framer Motion or CSS transitions.

### Lower Priority
9. **PDF Export** — Allow users to export a selected configuration (scenarios + effects + literature) as a PDF summary for assignments or presentations.

10. **Instructor Mode** — Pre-built "lesson" configurations that walk through specific policy design questions (e.g., "Why did Vietnam's hospital autonomization fail?" using the Wagstaff & Bales paper + Organization + Payment knobs).

11. **Dark Mode** — Respect system preference, adapt the dot-grid background and color scheme.

12. **Accessibility Audit** — Ensure full WCAG 2.1 AA compliance: keyboard navigation through all interactive elements, screen reader labels for the SVG diagram, sufficient color contrast on all rating levels.

## Content Expansion Opportunities
- The audit identified additional scenarios that could be added in future passes: Blended/Mixed Payment Systems, Coinsurance, Reinsurance/Catastrophic Risk Pools, Purchaser-Provider Split, Social Franchising, Quality Transparency/Public Reporting, Academic Detailing, Patient Navigators, Health Literacy Interventions.
- Environmental and public health regulation (upstream determinants) could be a new regulation subcategory.
- The reference PDF `getting-health-reform-right.pdf` is in the project root for cross-referencing framework concepts.

## Style Guidelines
- Body text: Source Serif 4 (serif). Headings/labels: Space Mono (monospace).
- Color palette: blue (info panels, literature), green/purple/teal/rose/orange (knob-specific).
- Scenario descriptions should be written at a graduate policy level — precise, evidence-aware, acknowledging trade-offs.
- Effect ratings should include parenthetical explanations of the mechanism, not just the level.
- Risk warnings should name the specific behavioral mechanism or market failure at play.
- Do not use emojis in the UI or data files.
