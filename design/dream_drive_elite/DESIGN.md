# Design System Document

## 1. Overview & Creative North Star: "The Digital Concierge"

This design system is a bespoke framework crafted for a high-end automotive experience. Moving away from the rigid, utilitarian grids of standard web applications, this system adopts a **"Digital Concierge"** North Star. The philosophy is rooted in editorial excellence, where every pixel feels curated, intentional, and exclusive. 

We achieve this through:
*   **Intentional Asymmetry:** Breaking the expected 12-column flow to create focus and visual tension.
*   **Editorial Scale:** Using extreme typographic contrast—pairing grand, high-contrast serifs with hyper-legible, technical sans-serifs.
*   **Tonal Depth:** Replacing harsh lines with a hierarchy of obsidian-toned surfaces that mimic the layered depth of a premium vehicle's interior.

---

## 2. Colors & Surface Philosophy

The palette is a sophisticated interplay of `background` (#131313) and `primary` (#ffc28d). It reflects a twilight-hour aesthetic—warm, golden glows against deep, matte blacks.

### The "No-Line" Rule
To maintain an elite, seamless feel, **1px solid borders are strictly prohibited for sectioning.** Boundaries must be defined through:
1.  **Tonal Shifts:** Placing a `surface_container_low` (#1c1b1b) section atop a `surface` (#131313) background.
2.  **Shadow Play:** Using subtle light-bleed rather than a stroke.

### Surface Hierarchy & Nesting
Treat the UI as physical layers. Use the following tiers to define importance:
*   **Base:** `surface` (#131313) for the primary canvas.
*   **De-emphasized:** `surface_container_lowest` (#0e0e0e) for "sunken" areas like footer sections.
*   **Elevated:** `surface_container_high` (#2a2a2a) or `surface_container_highest` (#353534) for interactive cards or navigation bars.

### The "Glass & Gradient" Rule
Floating elements (modals, dropdowns) should utilize **Glassmorphism**. Use semi-transparent variants of `surface_container` with a `20px` backdrop-blur. For main CTAs and Hero backgrounds, apply a subtle linear gradient from `primary` (#ffc28d) to `primary_container` (#eda35d) at a 135° angle to simulate the metallic sheen of luxury car paint.

---

## 3. Typography: Editorial Authority

The typography pairs the heritage feel of a newsroom with the precision of modern engineering.

*   **Display & Headlines (Newsreader):** High-contrast serif. Used for storytelling and brand statements. `display-lg` (3.5rem) should be used sparingly for maximum impact, often with tight letter-spacing (-0.02em).
*   **Titles & Body (Manrope):** A geometric sans-serif that balances the "elite" serif. It provides a technical, clean counter-balance.
*   **Labeling (Manrope):** Use `label-md` (0.75rem) in uppercase with 0.1em tracking for category tags or technical specs to mimic high-end watch face aesthetics.

---

## 4. Elevation & Depth

We convey hierarchy through **Tonal Layering** rather than traditional structural lines.

*   **The Layering Principle:** Depth is achieved by stacking. Place a `surface_container_lowest` (#0e0e0e) card on a `surface_container_low` (#1c1b1b) section to create a soft, natural "recessed" look.
*   **Ambient Shadows:** Floating elements must use shadows tinted with the `on_surface` color at 6% opacity. Blur values should be expansive (30px–60px) to simulate soft, gallery-style lighting.
*   **The "Ghost Border" Fallback:** If a border is required for accessibility, use the `outline_variant` (#4d4635) at 15% opacity. Never use 100% opaque lines.

---

## 5. Components

### Buttons
*   **Primary:** Background: `primary` (#ffc28d) | Text: `on_primary` (#4b2700). Shape: `md` (0.375rem). Use a subtle inner-glow to suggest tactility.
*   **Secondary:** Background: `secondary_container` (#474746) | Text: `on_secondary` (#313030).
*   **Tertiary:** No background. Text: `primary`. Hover state uses a `primary_fixed_dim` (#ffb877) underline of 2px.

### Cards & Lists
*   **No Dividers:** Forbid the use of divider lines. Separate list items using `16px` of vertical white space or by alternating background tones between `surface_container_low` and `surface_container`.
*   **Vehicle Cards:** Use `surface_container_highest` (#353534) with an `xl` (0.75rem) corner radius. Imagery should bleed to the top edges.

### Input Fields
*   **Style:** Underlined or "Soft Box." Avoid high-contrast boxes. Use `surface_container_highest` as the background with a `primary` focus indicator—a 2px bottom border only.
*   **Error State:** Use `error` (#ffb4ab) for text, but maintain the dark background to avoid breaking the "elite" atmosphere.

### Signature Component: The Monogram Overlay
A floating `DDM` monogram in `outline_variant` at 5% opacity can be used as a background watermark behind vehicle specifications to reinforce the bespoke nature of the brand.

---

## 6. Do’s and Don’ts

### Do:
*   **Do** use asymmetrical layouts where text is aligned to the left and imagery overflows the right container.
*   **Do** use generous white space (spacing tokens 48px+) to allow the brand to "breathe."
*   **Do** use the `newsreader` font for any text that is intended to feel "expensive."

### Don’t:
*   **Don’t** use pure white (#FFFFFF) for body text; use `on_surface` (#e5e2e1) to reduce eye strain in dark mode.
*   **Don’t** use standard "Drop Shadows." Shadows must be broad, diffused, and tinted.
*   **Don’t** use "pill" buttons (fully rounded) unless for small labels/chips. Stick to `md` or `lg` radii to maintain a structural, architectural feel.