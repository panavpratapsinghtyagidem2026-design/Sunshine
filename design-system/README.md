# Sunshine Design System

A production-ready design system for Sunshine — an SOS and daily-living
companion app for older adults living alone. Built in **React + CSS custom
properties** (no utility framework), light mode only, targeting **WCAG AAA
where feasible**.

## Structure

```
design-system/
├── tokens/
│   ├── tokens.css   ← color, type, space, shape, elevation, motion
│   └── base.css     ← global resets + default typographic rhythm
└── components/
    ├── Button, Input, Card, Badge, NavBar, Modal, EmptyState
    └── SOSButton    ← proposed addition, see below
```

Import order matters: `tokens.css` → `base.css` → component CSS (each
component imports its own stylesheet, so you only need the two token files
at the app root).

## Component index & usage notes

| Component | Use it for | Don't use it for |
|---|---|---|
| **Button** | One decisive primary action per screen; secondary/ghost/danger for the rest | Stacking multiple primaries — it erases the hierarchy it creates |
| **Input** | Any text entry, with a permanent visible label | Placeholder-as-label, floating labels (they vanish exactly when needed) |
| **Card** | Grouping related content; `interactive` only when the *whole card* navigates | Decorative containers with no real grouping purpose |
| **Badge** | Showing *state* (taken / needs reply / offline) | Generic tags or labels that don't represent a status |
| **NavBar** | Primary app navigation, max 5 labeled items, SOS always present | Icon-only navigation, hamburger menus |
| **Modal** | Genuinely blocking moments only (max two actions) | Anything dismissible or non-urgent — use Card/page instead |
| **EmptyState** | Reassuring "nothing here yet" moments, in a warm human voice | Error states (write an honest, distinct message instead) |
| **SOSButton** | The single emergency control, fixed position, always visible | Duplicating elsewhere as a "shortcut" — one location, memorized under stress |

### Why SOSButton is here even though it wasn't requested

A generic Button cannot do this job: it needs a recognizable silhouette
from across a room, protection against accidental triggers, and
unambiguous "help is coming" feedback. It uses an **arm → countdown →
send** pattern instead of a confirmation dialog, because someone in real
distress should never be blocked by a modal, while someone who tapped by
accident gets a calm, visible window to stand down. It is intentionally
**not** styled in the danger-red — danger means "you're about to lose
something," SOS means "a person is coming to help you," so it's carried in
marigold, the system's one warm accent. **This component is a UI surface
only; the actual escalation logic (who gets called, in what order, with
what fallback) is a product/ops decision that must live in the backend,
not in this button.**

## Design rationale (the short version)

Sunshine's visual language is built around one idea: **a well-lit room,
not a clinical waiting room.** The neutral ramp is warm paper and ink, not
cool gray, because cool grays read as institutional to people who already
associate screens with hospital forms. Functional color sits on top of
that warmth: a deep, desaturated **harbor blue** for trust and primary
action, a quiet **sage green** for health/growth contexts, and exactly
**one warm accent — marigold** — reserved for "this needs you, right now"
(the SOS surface, primary CTAs, active states), so attention is never
split between competing signals.

Type pairs **Fraunces** (a warm display serif with the unhurried gravity
of print) for headings against **Hanken Grotesk** (an open, large-x-height
humanist sans) for body — chosen specifically because it stays calm and
legible at the larger sizes this audience needs, where many geometric
sans typefaces start to feel like they're shouting. The base size is 19px,
not 16px — the single highest-leverage decision in the system, from which
the rest of the type scale, spacing, and tap-target sizing are derived so
nothing looks "zoomed" relative to its neighbors.

Space is not a generic 8px grid; it's derived from the **56px comfortable
tap target**, so spacing and touchable area always agree. Shape is a
single soft-radius family (10/16/24px) that scales with surface size, and
elevation uses warm-tinted, low-contrast shadows — "raised paper," never
glass. Motion is slow, single-eased, and never bouncy: playful easing
reads as delightful to a 25-year-old and as "is this broken?" to someone
less familiar with software conventions — and everything collapses to
near-zero under `prefers-reduced-motion`.

## Accessibility baseline

- Target **WCAG AAA** contrast (≥7:1 body text, ≥4.5:1 large text) against
  `--color-paper`; ratios are noted inline in `tokens.css`. The one
  intentional exception is `--color-marigold-500`, which meets AA-large/
  AAA-large only — it is restricted to fills, icons, and large text, never
  small body copy (`--color-marigold-700` is the text-safe variant).
- Minimum tap target is **44px** (WCAG 2.5.5), but the *system default* is
  **56px**, and the SOS control is **96px** — sized for tremor and
  low-precision pointing, not just compliance minimums.
- A single, never-suppressed focus style (`:focus-visible` → marigold ring)
  is defined once in `base.css` and inherited everywhere.
- Status is always communicated by **shape + text + color together**
  (see Badge's leading dot, Input's error icon+message), never color alone.
- All motion respects `prefers-reduced-motion` via one shared media query
  in `tokens.css` — component authors don't need to remember to add it.

## Open items for the product team

- Confirm the exact escalation chain `SOSButton`'s `onTrigger` should call
  (contacts → caregiver → emergency services, with what timeout/fallback)
  — this is a clinical/ops decision, not a design-system one.
- If the product later needs dark mode (e.g. for night-time SOS visibility),
  the token layer is structured to support a `[data-theme="dark"]`
  override block without touching component code — flag it and we can add
  that pass.
