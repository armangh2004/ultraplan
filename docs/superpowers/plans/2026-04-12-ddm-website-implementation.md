# Dream Drive Motors Website — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a 14-page premium car leasing dealership website with cinematic animations, smooth scrolling, and a luxury dark aesthetic that works flawlessly across all devices.

**Architecture:** Next.js 14+ App Router with shared root layout (Nav, Footer, Lenis, CustomCursor). Reusable animation components (ScrollReveal, TextSplit, ParallaxImage, etc.) wrap page content. All vehicle data and business constants live in `lib/constants.ts`. Pages are statically generated. Design system tokens are enforced via Tailwind config.

**Tech Stack:** Next.js 14+ (App Router), Tailwind CSS v3 (using `tailwind.config.ts` JS config), GSAP + ScrollTrigger, Lenis, Framer Motion, SplitType, TypeScript, Vercel

**Spec:** `docs/superpowers/specs/2026-04-12-ddm-website-design.md`

**Design Source:** `design/` folder contains 14 screen designs (each has `code.html` with Tailwind source + `screen.png` visual mockup). The `design/dream_drive_elite/` folder contains a duplicate of the DESIGN.md design system doc and has no corresponding page — it is not used.

**Key Technical Notes:**
- **Tailwind v3** is used (not v4) because the design system maps cleanly to `tailwind.config.ts` JS configuration and all Stitch exports use v3 Tailwind CDN syntax. This avoids the v4 CSS-based config migration.
- **Google Fonts** are loaded via `next/font/google` in `app/layout.tsx` (not CSS @import) for automatic optimization and no render-blocking.
- **Material Symbols** are loaded via a single CSS @import in `globals.css` for the icon font. Only a handful of icons are used — if performance testing flags this, switch to inline SVGs.
- **GSAP plugins** are registered centrally in `lib/gsap.ts` to prevent duplicate registration.
- **Page transitions** use `framer-motion` with a template.tsx approach in App Router (not AnimatePresence with usePathname, which has exit animation limitations). The template re-renders on navigation, enabling enter animations. Exit animations use a brief opacity fade managed by the template.

---

## Phase 1: Foundation

### Task 1: Project Scaffolding

**Files:**
- Create: `ddm-website/package.json`
- Create: `ddm-website/tsconfig.json`
- Create: `ddm-website/next.config.ts`
- Create: `ddm-website/tailwind.config.ts`
- Create: `ddm-website/styles/globals.css`
- Create: `ddm-website/app/layout.tsx`
- Create: `ddm-website/app/page.tsx`

- [ ] **Step 1: Create Next.js project**

```bash
cd "/Users/arman/Downloads/DDM Website"
npx create-next-app@latest ddm-website --typescript --tailwind --eslint --app --src=false --import-alias "@/*" --use-npm --tailwind-version 3
```

If `--tailwind-version` is not supported, run `create-next-app` normally and then verify `tailwind.config.ts` exists (v3 style). If the scaffolding generates v4 CSS config, downgrade: `npm install tailwindcss@3`.

- [ ] **Step 2: Install animation dependencies**

```bash
cd ddm-website
npm install gsap @gsap/react lenis framer-motion split-type
```

- [ ] **Step 3: Verify dev server starts**

Run: `npm run dev`
Expected: Next.js dev server on localhost:3000, default page renders.

- [ ] **Step 4: Commit**

```bash
git init
git add .
git commit -m "feat: scaffold Next.js project with animation dependencies"
```

### Task 2: Tailwind Design System Configuration

**Files:**
- Modify: `ddm-website/tailwind.config.ts`
- Modify: `ddm-website/styles/globals.css`

- [ ] **Step 1: Configure Tailwind with DDM design tokens**

Replace `tailwind.config.ts` with the full DDM design system. Include all colors (primary, on-primary, background, surface hierarchy, on-surface, on-surface-variant, outline, outline-variant, error, error-container), font families (headline: Newsreader, body: Manrope, label: Manrope), and border radius scale (none/sm/DEFAULT/md/lg/xl/full).

Reference: Spec Section 3 (Design System).

- [ ] **Step 2: Set up Google Fonts via next/font**

In `app/layout.tsx`, import Newsreader and Manrope via `next/font/google`. Apply font CSS variables to the `<html>` element. Reference those variables in `tailwind.config.ts` fontFamily config. This avoids render-blocking CSS @import and gives automatic font optimization.

```typescript
import { Newsreader, Manrope } from 'next/font/google';
const newsreader = Newsreader({ subsets: ['latin'], variable: '--font-headline', style: ['normal', 'italic'] });
const manrope = Manrope({ subsets: ['latin'], variable: '--font-body' });
```

- [ ] **Step 3: Set up globals.css**

Add Tailwind directives (@tailwind base/components/utilities), Material Symbols Outlined CSS @import (icon font only — body fonts use next/font), base body styles (bg-background, text-on-surface, antialiased), utility classes (.serif-italic, .glass-card, .monogram-overlay, .gold-gradient-text, .no-scrollbar), and custom scrollbar styling for dark theme.

Reference: Common styles across all `design/*/code.html` files.

- [ ] **Step 4: Verify fonts and colors render**

Create a temporary test in `app/page.tsx` with:
- A Newsreader headline in primary gold
- A Manrope body text paragraph in on-surface
- A div with each surface color as background
- Verify in browser that fonts load and colors match spec.

- [ ] **Step 4: Commit**

```bash
git add tailwind.config.ts styles/globals.css app/page.tsx
git commit -m "feat: configure Tailwind with DDM design system tokens"
```

### Task 3: Core Utilities, Types & Constants

**Files:**
- Create: `ddm-website/lib/types.ts`
- Create: `ddm-website/lib/utils.ts`
- Create: `ddm-website/lib/gsap.ts`
- Create: `ddm-website/lib/validation.ts`
- Create: `ddm-website/lib/hooks/useReducedMotion.ts`
- Create: `ddm-website/lib/hooks/useIsTouchDevice.ts`
- Create: `ddm-website/lib/constants.ts`

- [ ] **Step 1: Define TypeScript interfaces**

In `lib/types.ts`, define the `Vehicle` interface exactly as specified in Spec Section 11 (slug, make, model, year, tagline, price, monthlyLease, category, manufacturer, specs, details, badge, images). Also define `NavLink`, `FooterLink`, `ServiceItem` types.

- [ ] **Step 2: Create core utilities**

In `lib/utils.ts`, create:
- `cn(...classes)` — Tailwind class merging utility (using `clsx` + `tailwind-merge`, install both: `npm install clsx tailwind-merge`)
- `formatCurrency(n: number)` — formats as "$X,XXX"
- `formatNumber(n: number)` — formats with commas

In `lib/gsap.ts`, create central GSAP plugin registration:
```typescript
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
export { gsap, ScrollTrigger };
```
All components import from `@/lib/gsap` instead of directly from `gsap`.

In `lib/validation.ts`, create shared form validation:
- `validateRequired(value: string, fieldName: string)` → error string or null
- `validateEmail(value: string)` → error string or null
- `validatePhone(value: string)` → error string or null
- `validateMinLength(value: string, min: number, fieldName: string)` → error string or null

In `lib/hooks/useReducedMotion.ts`:
```typescript
'use client';
import { useEffect, useState } from 'react';
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return reduced;
}
```

In `lib/hooks/useIsTouchDevice.ts`: similar pattern using `(pointer: coarse)` matchMedia.

These hooks are used by all animation components (Tasks 5-11) to disable animations on touch/reduced-motion.

- [ ] **Step 2: Create constants file**

In `lib/constants.ts`, export:
- `BUSINESS_INFO` object (name, address, phone, email, hours)
- `NAV_LINKS` array matching Spec Section 7.1 routing table (Inventory→/inventory, Leasing→/services/leasing, Sell/Trade→/services/trade-in, About→/about, Concierge→/services)
- `VEHICLES` array with 6-8 vehicles: Porsche 911 GT3 RS, Ferrari Roma Spider, Range Rover SV, Mercedes S-Class, Lamborghini Huracán, BMW M4, Aston Martin DB12, Rolls-Royce Spectre. Each with full specs, pricing, and placeholder image paths.
- `LEASE_DEFAULTS` object (residualPercent: 0.5, moneyFactor: 0.00125)
- `SERVICE_ITEMS` array for the services hub page

Reference: Spec Section 11 (Vehicle Data Schema), design source files for specific vehicle data.

- [ ] **Step 3: Commit**

```bash
git add lib/types.ts lib/constants.ts
git commit -m "feat: add vehicle data, business constants, and TypeScript types"
```

### Task 4: Stock Images

**Files:**
- Create: `ddm-website/public/images/` (directory with organized subfolders)

- [ ] **Step 1: Source and download stock images**

Download high-quality stock images from Unsplash/Pexels matching the Stitch aesthetic. Organize in subfolders:
- `public/images/heroes/` — 4-5 cinematic car hero shots (dark, dramatic lighting)
- `public/images/vehicles/` — one hero + thumbnail per vehicle in constants (8 vehicles × 2 images + 2-3 gallery detail shots for the GT3 RS detail page)
- `public/images/showroom/` — 2-3 luxury showroom/garage interiors
- `public/images/detail/` — 3-4 close-up shots (wheels, steering wheel, keys, dashboard)
- `public/images/people/` — 1-2 professional portraits (grayscale)
- `public/images/maps/` — 1 aerial night city view
- `public/images/misc/` — abstract luxury textures, car transporter for delivery page

Target: ~30-35 images total. All should be dark-toned, cinematic, matching the gold-on-black DDM aesthetic. Download at reasonable resolution (1920px wide max) to keep build size manageable.

- [ ] **Step 2: Update vehicle image paths in constants**

Update `lib/constants.ts` to reference the actual downloaded image paths (e.g., `/images/vehicles/porsche-911-gt3-rs-hero.jpg`).

- [ ] **Step 3: Commit**

```bash
git add public/images/ lib/constants.ts
git commit -m "feat: add stock images matching DDM luxury aesthetic"
```

---

## Phase 2: Animation System

### Task 5: Smooth Scroll (Lenis)

**Files:**
- Create: `ddm-website/components/interactive/SmoothScroll.tsx`

- [ ] **Step 1: Create Lenis smooth scroll wrapper**

Build a client component (`"use client"`) that:
- Initializes Lenis with smooth scrolling config (lerp: 0.1, duration: 1.2)
- Integrates with GSAP ScrollTrigger via `lenis.on('scroll', ScrollTrigger.update)`
- Checks for touch device via `window.matchMedia('(pointer: coarse)')` — if touch, don't initialize Lenis
- Checks `prefers-reduced-motion` — if set, don't initialize
- Cleans up on unmount
- Wraps children in a div (passthrough)

Reference: Spec Section 5.1 Layer 1.

- [ ] **Step 2: Verify smooth scroll works in browser**

Temporarily add enough content to `app/page.tsx` to enable scrolling. Verify:
- Desktop: smooth momentum scrolling active
- Mobile (DevTools toggle): native scrolling, no Lenis

- [ ] **Step 3: Commit**

```bash
git add components/interactive/SmoothScroll.tsx
git commit -m "feat: add Lenis smooth scroll wrapper (desktop only)"
```

### Task 6: Scroll Reveal Animations (Framer Motion)

**Files:**
- Create: `ddm-website/components/animation/ScrollReveal.tsx`
- Create: `ddm-website/components/animation/StaggerReveal.tsx`

- [ ] **Step 1: Build ScrollReveal component**

Client component using Framer Motion's `motion.div` with `whileInView`. Props: `direction` (up/down/left/right, default "up"), `delay` (number, default 0), `duration` (number, default 0.6), `distance` (number, default 40 — reduced on mobile via CSS media query or JS check), `once` (boolean, default true), `children`.

Respects `prefers-reduced-motion` by setting duration to 0 and distance to 0.

- [ ] **Step 2: Build StaggerReveal component**

Client component that wraps children, each child in a `motion.div` with staggered `whileInView` animation. Props: `staggerDelay` (number, default 0.1), `direction`, `distance`, `children`. Uses Framer Motion's `staggerChildren` in the parent's `transition` variants.

- [ ] **Step 3: Test both in browser**

Add a temporary section to `app/page.tsx` with 3 cards inside a `<StaggerReveal>`. Scroll down and verify they animate in with stagger. Check that `<ScrollReveal>` works on a single element.

- [ ] **Step 4: Commit**

```bash
git add components/animation/ScrollReveal.tsx components/animation/StaggerReveal.tsx
git commit -m "feat: add ScrollReveal and StaggerReveal animation components"
```

### Task 7: Text Split Animation

**Files:**
- Create: `ddm-website/components/animation/TextSplit.tsx`

- [ ] **Step 1: Build TextSplit component**

Client component that:
- Takes `children` (string text content), `className`, `splitBy` ("chars" | "words", default "chars"), `staggerDelay` (default 0.03), `duration` (default 0.8)
- Uses a ref and SplitType to split text on mount
- Uses GSAP `from` animation with `y: 40, opacity: 0` and `stagger` on the split elements
- Triggers via GSAP ScrollTrigger (start: "top 80%", once)
- On mobile (matchMedia pointer:coarse), forces `splitBy: "words"` for performance
- Respects `prefers-reduced-motion`
- Cleans up SplitType revert and GSAP kill on unmount

Reference: Spec Section 5.1 Layer 3.

- [ ] **Step 2: Test with a hero headline**

Add a `<TextSplit>` around a large headline in `app/page.tsx`. Verify characters animate in with stagger on scroll.

- [ ] **Step 3: Commit**

```bash
git add components/animation/TextSplit.tsx
git commit -m "feat: add TextSplit animation component (SplitType + GSAP)"
```

### Task 8: Parallax Image & Number Counter

**Files:**
- Create: `ddm-website/components/animation/ParallaxImage.tsx`
- Create: `ddm-website/components/animation/NumberCounter.tsx`

- [ ] **Step 1: Build ParallaxImage component**

Client component wrapping a Next.js `<Image>`. Uses GSAP ScrollTrigger to translate the image Y-axis at a different rate than scroll (props: `speed` default 0.3, `src`, `alt`, `className`, `fill`, `priority`). On mobile: reduced to subtle scale transform (1.0→1.05). Respects `prefers-reduced-motion`.

- [ ] **Step 2: Build NumberCounter component**

Client component that:
- Takes `end` (number), `suffix` (string, e.g., "s", "hp", "+"), `prefix` (string, e.g., "$"), `duration` (default 2), `className`
- Uses GSAP ScrollTrigger to count from 0 to `end` when element enters viewport
- Formats numbers with commas (toLocaleString)
- Works on all devices (no desktop-only restriction)
- Respects `prefers-reduced-motion` (shows final value immediately)

Reference: Spec Section 5.1 Layer 4.

- [ ] **Step 3: Test both components**

Add a parallax hero image and a row of 4 number counters (3.0s, 518hp, 184mph, 1,895lbs) to `app/page.tsx`. Verify parallax scrolls smoothly and counters animate when scrolled into view.

- [ ] **Step 4: Commit**

```bash
git add components/animation/ParallaxImage.tsx components/animation/NumberCounter.tsx
git commit -m "feat: add ParallaxImage and NumberCounter animation components"
```

### Task 9: Micro-interactions (Magnetic Button, Image Reveal)

**Files:**
- Create: `ddm-website/components/animation/MagneticButton.tsx`
- Create: `ddm-website/components/animation/ImageReveal.tsx`

- [ ] **Step 1: Build MagneticButton component**

Client component that:
- Wraps children (typically a `<Button>`)
- On mousemove within the element, calculates offset from center and applies GSAP `to` with small x/y translation (max 10px) with ease
- On mouseleave, animates back to 0,0
- Disabled on touch devices (renders children without effect)
- Props: `strength` (default 0.3), `className`, `children`

- [ ] **Step 2: Build ImageReveal component**

Client component that:
- Wraps a Next.js `<Image>` in a container with `overflow-hidden`
- Uses GSAP ScrollTrigger to animate a clip-path from `inset(100% 0 0 0)` to `inset(0 0 0 0)` (reveal from bottom)
- Props: `src`, `alt`, `className`, `direction` ("up" | "left" | "right", default "up"), `duration` (default 1)
- Respects `prefers-reduced-motion`

- [ ] **Step 3: Commit**

```bash
git add components/animation/MagneticButton.tsx components/animation/ImageReveal.tsx
git commit -m "feat: add MagneticButton and ImageReveal animation components"
```

### Task 10: Custom Cursor

**Files:**
- Create: `ddm-website/components/interactive/CustomCursor.tsx`

- [ ] **Step 1: Build CustomCursor component**

Client component that:
- Renders a fixed-position div (small gold dot, 8px, rounded-full, bg-primary, mix-blend-difference, pointer-events-none, z-[9999])
- Uses GSAP to lerp-follow the mouse position (requestAnimationFrame loop)
- Expands to 40px when hovering over interactive elements (detected via `data-cursor="pointer"` attribute or `a`, `button` elements)
- Shows text label when hovering elements with `data-cursor-text="View"` attribute
- Completely hidden on touch devices (check `pointer: coarse`)
- Hidden when mouse leaves the viewport
- Respects `prefers-reduced-motion`

Reference: Spec Section 5.1 Layer 6.

- [ ] **Step 2: Test in browser**

Add `CustomCursor` to root layout temporarily. Verify gold dot follows cursor, expands on buttons/links. Verify hidden in mobile DevTools mode.

- [ ] **Step 3: Commit**

```bash
git add components/interactive/CustomCursor.tsx
git commit -m "feat: add custom gold cursor with interactive states (desktop only)"
```

### Task 11: Page Transition

**Files:**
- Create: `ddm-website/app/template.tsx`
- Create: `ddm-website/components/animation/PageTransition.tsx`

- [ ] **Step 1: Build PageTransition component**

Client component using Framer Motion `motion.div`:
- Props: `children`
- Wraps children in a `motion.div` with initial `{ opacity: 0, y: 20 }`, animate `{ opacity: 1, y: 0 }`, transition `{ duration: 0.5, ease: "easeOut" }`
- On desktop: adds a gold line wipe overlay — an absolute `motion.div` (bg-primary, h-[2px], w-full) that animates scaleX from 0→1→0 on mount
- On mobile (useIsTouchDevice): simple fade only (no line wipe)
- Respects useReducedMotion (instant render, no animation)

**Important:** Uses `app/template.tsx` (not layout.tsx) as the wrapper. Next.js App Router re-mounts template.tsx on every navigation, which triggers the Framer Motion initial/animate cycle naturally. This avoids the AnimatePresence exit animation limitation.

```typescript
// app/template.tsx
import PageTransition from '@/components/animation/PageTransition';
export default function Template({ children }: { children: React.ReactNode }) {
  return <PageTransition>{children}</PageTransition>;
}
```

Reference: Spec Section 5.1 Layer 7.

- [ ] **Step 2: Test with navigation between two pages**

Create a temporary second page at `app/about/page.tsx` with a link back to home. Navigate between them and verify the enter animation plays on each navigation.

- [ ] **Step 3: Commit**

```bash
git add app/template.tsx components/animation/PageTransition.tsx
git commit -m "feat: add page transition via template.tsx with gold line wipe"
```

---

## Phase 3: Shared Components

### Task 12: UI Components (Button, SectionHeading, GlassCard, MonogramOverlay, InputField, BentoGrid)

**Files:**
- Create: `ddm-website/components/ui/Button.tsx`
- Create: `ddm-website/components/ui/SectionHeading.tsx`
- Create: `ddm-website/components/ui/GlassCard.tsx`
- Create: `ddm-website/components/ui/MonogramOverlay.tsx`
- Create: `ddm-website/components/ui/InputField.tsx`
- Create: `ddm-website/components/ui/BentoGrid.tsx`

- [ ] **Step 1: Build Button component**

Server component with variants:
- `primary`: bg-primary text-on-primary, hover brightness-110, active scale-[0.98]
- `secondary`: border border-outline-variant/30 text-on-surface, hover bg-surface-container
- `tertiary`: no bg, text-primary, hover underline with primary-fixed-dim
- All: uppercase text-[10px] tracking-widest font-bold, px-8 py-4 (configurable via size prop), transition-all
- Props: `variant`, `size` ("sm" | "md" | "lg"), `className`, `children`, `href` (renders as Link if provided), standard button props

Reference: Spec Section 3.4, `design/DESIGN.md` Section 5 (Components > Buttons).

- [ ] **Step 2: Build SectionHeading component**

Server component for the repeated pattern: small label + large headline.
- Props: `label` (string, optional — renders as 10px uppercase tracking-[0.3em] text-primary), `children` (headline content), `className`
- Headline renders in font-headline with appropriate size classes

- [ ] **Step 3: Build GlassCard, MonogramOverlay, InputField**

`GlassCard`: Server component — glass-card background (bg-white/5 backdrop-blur-[20px]), border border-outline-variant/10, p-configurable, rounded-sm. Props: `className`, `children`.

`MonogramOverlay`: Server component — fixed/absolute positioned "DDM" text in font-headline italic, opacity-[0.02-0.05], pointer-events-none, select-none. Props: `opacity` (default 0.03), `className`.

`InputField`: Client component — label (10px uppercase tracking-widest text-on-surface-variant, transitions to primary on focus-within) + input (bg-surface-container-high or underline style, border-b border-outline-variant, focus:border-primary, focus:ring-0). Props: `label`, `type`, `placeholder`, `error` (string — shows in error color #ffb4ab below input), `variant` ("underline" | "filled"), standard input props.

`BentoGrid`: Server component — a reusable wrapper for the bento grid pattern used across many pages. Props: `children`, `className`, `cols` (default 12), `rows` (optional), `gap` (default 8), `height` (optional, e.g., "h-[800px]"). Renders a CSS grid with `grid-cols-{cols}` on md+, single column on mobile. Children use col-span/row-span classes to define their cell sizes. This is a thin layout wrapper, not prescriptive — each page controls its own grid children.

Reference: Spec Sections 3.4, 12.

- [ ] **Step 5: Commit**

```bash
git add components/ui/
git commit -m "feat: add UI components (Button, SectionHeading, GlassCard, MonogramOverlay, InputField, BentoGrid)"
```

### Task 13: Navbar

**Files:**
- Create: `ddm-website/components/layout/Navbar.tsx`
- Create: `ddm-website/components/layout/MobileMenu.tsx`

- [ ] **Step 1: Build Navbar component**

Client component (needs usePathname for active state):
- Fixed top, full width, z-50, bg-background/90 backdrop-blur-xl, border-b border-white/5
- Inner container: max-w-screen-2xl mx-auto, px-12, py-6, flex justify-between items-center
- Left: DDM logo (font-headline italic text-2xl text-primary, Link to "/"), nav links from `NAV_LINKS` constant (hidden md:flex, 10px uppercase tracking-widest, active link gets text-primary + border-b border-primary)
- Right: search bar (hidden lg:flex, bg-surface-container-high, Material Symbols search icon, input), calendar + person icon buttons, gold "Inquire" Button linking to /contact
- Mobile (below lg): show hamburger button that opens MobileMenu

Use `usePathname()` to determine active nav link. Match against link href.

Reference: Spec Section 7.1, `design/homepage_dream_drive_motors_final/code.html` lines 54-84.

- [ ] **Step 2: Build MobileMenu component**

Client component:
- Full-screen fixed overlay (inset-0, z-[60], bg-background)
- Animated with Framer Motion: slides in from right (x: "100%" → 0) with opacity transition
- Close button (X icon) top-right
- Nav links: large Newsreader italic text, stacked vertically with generous spacing, each link animates in with stagger
- Business info at bottom (phone, email)
- Focus trapped when open (Escape key closes)
- Body scroll locked when open

Reference: Spec Section 7.2.

- [ ] **Step 3: Test navigation**

Verify: logo links home, nav links route correctly, active state highlights, mobile hamburger opens/closes menu, Escape closes menu.

- [ ] **Step 4: Commit**

```bash
git add components/layout/Navbar.tsx components/layout/MobileMenu.tsx
git commit -m "feat: add Navbar with mobile menu and active route highlighting"
```

### Task 14: Footer

**Files:**
- Create: `ddm-website/components/layout/Footer.tsx`

- [ ] **Step 1: Build Footer component**

Server component:
- Background: bg-[#0e0e0e], border-t border-white/5
- Inner container: max-w-screen-2xl mx-auto, px-12, py-20
- Grid: flex flex-col md:flex-row justify-between
- Left column: DDM logo (font-headline italic text-3xl text-primary), tagline (10px uppercase tracking-widest text-on-surface/40), social icon buttons (share, mail — border border-white/10, hover bg-primary)
- Right columns: 3-col grid (Contact: address/email/phone, Services: Inventory/Leasing/Sell-Trade, Legal: Privacy/Terms) — all 10px uppercase tracking-widest, text-on-surface/50 hover:text-primary
- Bottom bar: border-t border-white/5, py-10, centered copyright text

Reference: Spec Section 7.3, `design/homepage_dream_drive_motors_final/code.html` lines 255-298.

- [ ] **Step 2: Commit**

```bash
git add components/layout/Footer.tsx
git commit -m "feat: add shared Footer component"
```

### Task 15: Root Layout Assembly

**Files:**
- Modify: `ddm-website/app/layout.tsx`

- [ ] **Step 1: Wire up root layout**

Update `app/layout.tsx` to:
- Import and render `<SmoothScroll>`, `<CustomCursor>`, `<Navbar>`, `<PageTransition>`, `<Footer>`
- Set metadata: title template "%s | Dream Drive Motors", default title, description
- Wrap children in `<main>` tag inside `<PageTransition>`
- Structure: `<SmoothScroll>` → `<CustomCursor>` → `<Navbar>` → `<main><PageTransition>{children}</PageTransition></main>` → `<Footer>`

- [ ] **Step 2: Clean up temporary test content from app/page.tsx**

Remove all temporary test content. Set page.tsx to a minimal placeholder with the DDM headline.

- [ ] **Step 3: Verify full layout renders**

Check: Nav appears fixed at top, footer at bottom, smooth scroll works, custom cursor follows mouse, page has correct dark background and fonts.

- [ ] **Step 4: Commit**

```bash
git add app/layout.tsx app/page.tsx
git commit -m "feat: assemble root layout with Nav, Footer, animations, cursor"
```

---

## Phase 4: Core Pages

### Task 16: Homepage

**Files:**
- Create: `ddm-website/components/interactive/BudgetSearch.tsx`
- Create: `ddm-website/components/ui/VehicleCard.tsx`
- Create: `ddm-website/components/sections/Hero.tsx`
- Modify: `ddm-website/app/page.tsx`

- [ ] **Step 1: Build Hero section component**

Reusable server component for the hero pattern used across multiple pages. Props: `label`, `title` (ReactNode for rich formatting), `subtitle`, `children` (for CTAs/extra content), `backgroundImage`, `className`, `height` (default "h-screen").

Renders: full-height section, relative positioned, background image with gradient overlay, content positioned with z-10, max-w-screen-2xl container.

- [ ] **Step 2: Build BudgetSearch component**

Client component for the budget-first search tool:
- Glassmorphism panel (glass-card, positioned absolute bottom-12, centered)
- Grid: 4 columns (Monthly Budget select, Preferred Type select, Lease/Buy toggle, "Find My DDM" gold button)
- Select styling: bg-surface-container-highest/50, border-none, text-xs
- Toggle: two buttons in a flex container, active gets bg-primary
- On submit: navigates to /inventory (with potential query params later)

Reference: `design/homepage_dream_drive_motors_final/code.html` lines 107-138.

- [ ] **Step 3: Build VehicleCard component**

Server component for inventory cards used on Homepage and Inventory page:
- Props: `vehicle: Vehicle`, `variant` ("featured" | "compact" | "grid"), `className`
- Featured: large with full overlay info (used in homepage bento)
- Grid: standard card with image, specs row, price, arrow button
- Compact: smaller card for bento stacks
- Image with group-hover:scale-105 transition, gradient overlay, badge if present
- Link wrapping to `/inventory/${vehicle.slug}`

- [ ] **Step 4: Build Homepage page**

Assemble `app/page.tsx` with all sections from Spec 6.1:
- Hero with TextSplit "Drive Your Ambition.", parallax background, BudgetSearch floating at bottom
- Curated Selection: SectionHeading + bento grid (8-col VehicleCard featured + 4-col stack of 2 compact cards) wrapped in ScrollReveal
- DDM Difference: asymmetric 2-col grid, MonogramOverlay, 3 feature rows in StaggerReveal (icon boxes with verified/event_seat/local_shipping Material Symbols)
- Services Overview: 3-col grid with 1px gap (bg-white/5 parent), 3 specific cards: (1) "Sell or Trade" → /services/trade-in, (2) "The Leasing Desk" → /services/leasing, (3) "DDM Atelier" → /about. Each: headline with italic gold word, description, arrow link with gap animation on hover
- Export metadata per Spec Section 15 SEO table

Reference: `design/homepage_dream_drive_motors_final/code.html` and `screen.png`.

- [ ] **Step 5: Test homepage thoroughly**

Verify in browser:
- Hero parallax, text split animation, budget search functionality
- Bento grid layout with hover effects on vehicle cards
- DDM Difference section stagger animation
- Services cards with hover transitions
- Responsive: check at 1536px, 1024px, 768px, 375px
- All links route correctly

- [ ] **Step 6: Commit**

```bash
git add components/interactive/BudgetSearch.tsx components/ui/VehicleCard.tsx components/sections/Hero.tsx app/page.tsx
git commit -m "feat: build Homepage with hero, curated selection, DDM difference, services"
```

### Task 17: The Atelier — About Page

**Files:**
- Create: `ddm-website/app/about/page.tsx`
- Create: `ddm-website/components/sections/CTASection.tsx`

- [ ] **Step 1: Build CTASection component**

Reusable server component for centered CTA blocks (used on About, Leasing, Delivery, etc.):
- Props: `headline` (ReactNode), `subtitle` (string), `primaryCTA` ({label, href}), `secondaryCTA` ({label, href}, optional), `className`
- Dark background section, centered text, large headline, buttons below

- [ ] **Step 2: Build About page**

Assemble `app/about/page.tsx` matching Spec 6.2:
- Hero: "Established 2024" label, TextSplit "The Atelier: Bespoke Excellence" (9xl), gold divider line
- Hero Image: 21:9 aspect, grayscale default with hover:grayscale-0 transition (1s), scale-105 hover:scale-100
- Editorial: 12-col grid (md:grid-cols-12) — 4-col heading "The Art of Curated Motoring", col-start-6 col-span-7 body with lead paragraph (text-2xl font-light) + detail paragraph + gold divider + "Private Gallery" / "By Appointment" stats
- CTASection: "Begin Your Bespoke Journey"
- Export metadata

Reference: `design/the_atelier_dream_drive_motors_final/code.html` and `screen.png`.

- [ ] **Step 3: Test and commit**

```bash
git add app/about/page.tsx components/sections/CTASection.tsx
git commit -m "feat: build The Atelier (About) page with editorial layout"
```

### Task 18: Inventory Page

**Files:**
- Create: `ddm-website/app/inventory/page.tsx`

- [ ] **Step 1: Build Inventory page**

Assemble `app/inventory/page.tsx` matching Spec 6.3:
- Hero: "The Reserve Inventory" with gold-gradient-text class, stats sidebar (Available Units count + Showroom Location in large Newsreader type)
- Filter bar: bg-surface-container, border border-white/5, manufacturer pill buttons (All active by default in bg-primary, others bg-white/5 with hover), body style buttons, Filter + Sort controls (client-side filtering of VEHICLES array)
- Vehicle grid: 3-col (lg:grid-cols-3 md:grid-cols-2 grid-cols-1), gap-12, using VehicleCard variant="grid"
- Curated Collections bento: 4-col × 2-row grid with "The Classics" (col-span-2 row-span-2), "Electric Luxury" (col-span-2), "Interiors" (col-span-1, centered label), gold "Bespoke Ordering" card (col-span-1, bg-primary)
- Export metadata

The filter is client-side: clicking manufacturer/body buttons filters the VEHICLES array. Use React state. Cards animate in/out with Framer Motion layout animations.

Reference: `design/inventory_dream_drive_motors_final/code.html` and `screen.png`.

- [ ] **Step 2: Test filters, responsiveness, and commit**

```bash
git add app/inventory/page.tsx
git commit -m "feat: build Inventory page with filters and curated collections"
```

### Task 19: Vehicle Detail Page

**Files:**
- Create: `ddm-website/app/inventory/[slug]/page.tsx`

- [ ] **Step 1: Build Vehicle Detail page**

Assemble `app/inventory/[slug]/page.tsx` matching Spec 6.4:
- `generateStaticParams()` returning all vehicle slugs from VEHICLES constant
- Hero: full-screen, cinematic car image, massive model name (text-[10rem] on desktop), spec tags
- Specs: 4-col grid (md:grid-cols-4, border-y), each stat with NumberCounter (acceleration, HP, top speed, downforce), hover:scale-105 group transition
- Gallery: 12-col grid — 8-col main large image (h-[700px]) + 4-col stack of 2 detail images, all with hover:scale-105
- Atelier Info: 8-col card with two-column description, location + verified badges, MonogramOverlay
- Lease Sidebar: 4-col (lg:col-span-4) sticky (lg:sticky top-32), price in font-headline text-5xl, two CTA buttons, vehicle details list (odometer, interior, transmission)
- Map: full-width section, grayscale image with gold pin overlay centered
- Export dynamic metadata (title: `${year} ${make} ${model} | Dream Drive Motors`)

Reference: `design/vehicle_detail_porsche_911_gt3_rs_final/code.html` and `screen.png`.

- [ ] **Step 2: Test with different vehicle slugs, responsiveness**

Navigate to `/inventory/porsche-911-gt3-rs` and other slugs. Verify data populates correctly, number counters animate, sticky sidebar works on desktop and stacks on mobile.

- [ ] **Step 3: Commit**

```bash
git add app/inventory/
git commit -m "feat: build Vehicle Detail page with specs, gallery, and lease sidebar"
```

---

## Phase 5: Service Pages

### Task 20: Services & Concierge Hub

**Files:**
- Create: `ddm-website/components/ui/ServiceCard.tsx`
- Create: `ddm-website/app/services/page.tsx`

- [ ] **Step 1: Build ServiceCard component**

Client component for the services grid cards (Spec 6.5):
- Props: `title`, `description`, `icon` (Material Symbol name), `href`, `backgroundImage` (optional), `badge` (optional, e.g., "White Glove")
- Height: h-[520px], overflow-hidden, bg-surface-container-low
- Background image: absolute, opacity-0, scale-1.1, on group-hover: opacity-0.2 scale-1.0 (the `service-hover-image` pattern from Stitch)
- Content: icon (text-3xl, opacity-60), title (text-5xl font-headline italic, group-hover:text-primary), description, arrow link at bottom with border-t
- On mobile: background image always visible at reduced opacity

Reference: `design/services_concierge_dream_drive_motors_final/code.html` lines 128-201.

- [ ] **Step 2: Build Services hub page**

Assemble `app/services/page.tsx` matching Spec 6.5:
- Hero: 95vh, "The Elite Concierge" massive italic gold TextSplit with text-glow CSS
- Mastery section heading + description (asymmetric flex with border-l)
- 3×2 ServiceCard grid (grid-cols-3 on lg, grid-cols-2 on md, grid-cols-1) with 6 services from SERVICE_ITEMS constant
- Bespoke Experience: asymmetric layout — left (flex-1): heading, description, 3-col stats (24/7, 50+, Elite), expanding-line CTA. Right (flex-1): 4:5 image with GlassCard testimonial overlapping
- Export metadata

- [ ] **Step 3: Commit**

```bash
git add components/ui/ServiceCard.tsx app/services/page.tsx
git commit -m "feat: build Services & Concierge hub with service card grid"
```

### Task 21: Bespoke Auto Leasing Page

**Files:**
- Create: `ddm-website/app/services/leasing/page.tsx`

- [ ] **Step 1: Build Leasing page**

Assemble matching Spec 6.6:
- Hero: "Bespoke Auto Leasing" italic, starting price GlassCard floating right
- Art of the Lease: left 3 features with border-l-primary hover, right staggered image grid
- Vehicle Portfolio bento grid
- CTASection: "Begin Your Journey"
- Export metadata

Reference: `design/bespoke_auto_leasing_ddm_final/code.html` and `screen.png`.

- [ ] **Step 2: Commit**

```bash
git add app/services/leasing/
git commit -m "feat: build Bespoke Auto Leasing service page"
```

### Task 22: Precision Auto Financing Page

**Files:**
- Create: `ddm-website/app/services/financing/page.tsx`

- [ ] **Step 1: Build Financing page**

Assemble matching Spec 6.7:
- Hero: "Financial Engineering." with MonogramOverlay
- Bento specs grid: 8-col Private Lender Network + 4-col Elite Privacy + 3 small cards
- Editorial: grayscale portrait + blockquote
- CTA: email input + callback button
- Export metadata

Reference: `design/precision_auto_financing_ddm_final/code.html` and `screen.png`.

- [ ] **Step 2: Commit**

```bash
git add app/services/financing/
git commit -m "feat: build Precision Auto Financing service page"
```

### Task 23: Credit Application Info Page

**Files:**
- Create: `ddm-website/app/services/credit-info/page.tsx`

- [ ] **Step 1: Build Credit Info page**

Assemble matching Spec 6.8:
- Hero: split layout, grayscale→color image, quote overlay
- Form section with MonogramOverlay watermark, step indicator, InputField components, Tailored Structures card
- Features bento grid
- Export metadata

Reference: `design/credit_application_dream_drive_motors_final/code.html` and `screen.png`.

- [ ] **Step 2: Commit**

```bash
git add app/services/credit-info/
git commit -m "feat: build Credit Application info page"
```

### Task 24: Direct Acquisition Page

**Files:**
- Create: `ddm-website/app/services/acquisition/page.tsx`

- [ ] **Step 1: Build Acquisition page**

Assemble matching Spec 6.9:
- Hero: grayscale car, "Direct Acquisition." headline, "48 Hours" stat
- Value proposition bento: Market Liquidity card + gold Appraisal card + glass logistics card
- Process section: sticky left with 4 numbered steps, right with parallax image + testimonial
- CTA: gold-tinted card with email input
- Export metadata

Reference: `design/direct_acquisition_ddm_final/code.html` and `screen.png`.

- [ ] **Step 2: Commit**

```bash
git add app/services/acquisition/
git commit -m "feat: build Direct Acquisition service page"
```

### Task 25: Seamless Trade-Ins Page

**Files:**
- Create: `ddm-website/app/services/trade-in/page.tsx`

- [ ] **Step 1: Build Trade-In page**

Assemble matching Spec 6.10:
- Hero: stacked car images, "The Perfect Transition." headline
- Valuation section: editorial left + glassmorphism form right (InputField components with validation)
- Bento grid: glass cards
- Testimonial: full-width blockquote
- Export metadata

Reference: `design/seamless_trade_ins_ddm_final/code.html` and `screen.png`.

- [ ] **Step 2: Commit**

```bash
git add app/services/trade-in/
git commit -m "feat: build Seamless Trade-Ins service page"
```

### Task 26: Bespoke Home Delivery Page

**Files:**
- Create: `ddm-website/app/services/delivery/page.tsx`

- [ ] **Step 1: Build Delivery page**

Assemble matching Spec 6.11:
- Hero: 90vh, "Bespoke Home Delivery" 9xl headline
- Handover bento: ceremony card, punctuality card, atmosphere card, ecosystem card
- Logistics section: 2-col with features + circular image
- CTASection: two buttons
- Export metadata

Reference: `design/bespoke_home_delivery_ddm_final/code.html` and `screen.png`.

- [ ] **Step 2: Commit**

```bash
git add app/services/delivery/
git commit -m "feat: build Bespoke Home Delivery service page"
```

---

## Phase 6: Interactive Pages

### Task 27: Lease Calculator

**Files:**
- Create: `ddm-website/components/interactive/LeaseCalculator.tsx`
- Modify: `ddm-website/lib/utils.ts` (add calculateLease function)
- Create: `ddm-website/app/calculator/page.tsx`

- [ ] **Step 1: Add lease calculation utility**

In `lib/utils.ts`, add the `calculateLease` function:
```typescript
export function calculateLease(
  msrp: number,
  downPayment: number,
  termMonths: number,
  residualPercent: number = 0.5,
  moneyFactor: number = 0.00125
): { monthly: number; residual: number; totalInterest: number; purchaseOption: number } {
  const residual = msrp * residualPercent;
  const netCapCost = msrp - downPayment;
  const depreciation = (netCapCost - residual) / termMonths;
  const financeCharge = (netCapCost + residual) * moneyFactor;
  const monthly = depreciation + financeCharge;
  const totalInterest = financeCharge * termMonths;
  const purchaseOption = residual;
  return { monthly: Math.round(monthly), residual, totalInterest: Math.round(totalInterest), purchaseOption };
}
```

- [ ] **Step 2: Build LeaseCalculator component**

Client component with:
- State: selectedVehicle, downPayment (range slider), termMonths (24/36/48 buttons), annualMileage (10k/12k/15k cards)
- Vehicle selector: thumbnail + model name + MSRP, dropdown/select
- Down payment slider: custom styled range input with gold thumb (CSS from Stitch)
- Term buttons: button group, active gets bg-primary
- Mileage cards: 3 cards with labels (Limited/Standard/Executive), selected gets border-primary
- Results panel: sticky on desktop (lg:sticky top-40), GlassCard, displays calculateLease results — massive monthly price with NumberCounter animation on value change, purchase option, total interest, two CTA buttons, security/concierge badges, disclaimer
- Results update reactively on any input change

Reference: `design/bespoke_lease_calculator_ddm_final/code.html` and `screen.png`.

- [ ] **Step 3: Build Calculator page**

Assemble `app/calculator/page.tsx`:
- Hero heading: "Bespoke Lease Strategy"
- LeaseCalculator component
- Related Opportunities: 3 cards with grayscale→color hover (link to leasing, about, services)
- Export metadata

- [ ] **Step 4: Test calculator math**

Verify: with MSRP $184,500, $25,000 down, 36 months, default residual/MF → monthly should be approximately $1,842 (matching Stitch design). Test edge cases: min/max down payment, different terms.

- [ ] **Step 5: Commit**

```bash
git add lib/utils.ts components/interactive/LeaseCalculator.tsx app/calculator/
git commit -m "feat: build Lease Calculator with real-time calculation"
```

### Task 28: Secure Credit Application

**Files:**
- Create: `ddm-website/app/apply/page.tsx`

- [ ] **Step 1: Build Credit Application page**

Assemble `app/apply/page.tsx` matching Spec 6.13:
- Hero: "Secure Credit Application" headline, encryption + prequalification badges, image + quote overlay
- Form section: MonogramOverlay watermark, step indicator (Step 01 of 03), 2×2 InputField grid (name, email, phone, contact method select), Tailored Options card with Lease/Finance toggle buttons, gold submit button with arrow animation
- Form validation using Spec Section 12 rules (name min 2 chars, valid email, valid phone)
- Error states: inline error text in #ffb4ab, input border transitions to error color
- Submit: button shows "Submitted" with checkmark for 2s then resets
- SSL encryption badge below button
- Features bento below form
- Export metadata

Reference: `design/secure_credit_application_ddm_final/code.html` and `screen.png`.

- [ ] **Step 2: Test form validation and submit states**

Verify: empty submit shows errors, valid submit shows success state, errors clear on valid input.

- [ ] **Step 3: Commit**

```bash
git add app/apply/
git commit -m "feat: build Secure Credit Application with form validation"
```

### Task 29: Contact & Inquire Page

**Files:**
- Create: `ddm-website/app/contact/page.tsx`

- [ ] **Step 1: Build Contact page**

Assemble `app/contact/page.tsx` matching Spec 6.14:
- Unique layout: this page has a left sidebar on desktop (hidden on mobile)
- Sidebar: fixed left, w-72, bg-surface-container-lowest, DDM Concierge heading, nav links: Showroom→`/inventory`, Private Collection→`/inventory` (same page, this is a conceptual label — both link to /inventory), Service Center→`/services`, Financial Suites→`/services/financing`, Contact→`/contact` (active). Schedule Viewing button scrolls to inquiry form via `#inquiry-form` anchor
- Main content with lg:pl-72 offset
- Hero: "The Direct Line to Excellence." headline
- Content grid (lg:grid-cols-12): left 4-col (address with Material Symbol icons, phone, email, Private Appointments card, atmospheric image), right 8-col (inquiry form: InputField for name/email, interest radio group with 4 options styled as bordered cards, textarea for message, gold submit button)
- Form validation per Spec Section 12
- Map section: full-width, aerial image, gold Atelier pin overlay card centered
- Export metadata

Reference: `design/contact_inquire_dream_drive_motors_final/code.html` and `screen.png`.

- [ ] **Step 2: Test sidebar layout, form, responsiveness**

Verify: sidebar visible on desktop, hidden on mobile. Form validates. Radio buttons toggle correctly. Contact info is correct per BUSINESS_INFO constant.

- [ ] **Step 3: Commit**

```bash
git add app/contact/
git commit -m "feat: build Contact & Inquire page with sidebar and form"
```

---

## Phase 7: Polish

### Task 30: Custom 404 Page

**Files:**
- Create: `ddm-website/app/not-found.tsx`

- [ ] **Step 1: Build 404 page**

Matching Spec Section 14:
- bg-background (#0a0a0a), centered content, MonogramOverlay at 3%
- "Lost in the Collection" headline (font-headline italic text-6xl)
- Subtitle paragraph
- Two buttons: "Return to Gallery" (primary, href="/") + "Contact Concierge" (secondary, href="/contact")

- [ ] **Step 2: Test by navigating to a non-existent route**

Visit `/nonexistent-page`, verify custom 404 renders with correct styling.

- [ ] **Step 3: Commit**

```bash
git add app/not-found.tsx
git commit -m "feat: add custom 404 page matching DDM aesthetic"
```

### Task 31: SEO & Metadata

**Files:**
- Modify: `ddm-website/app/layout.tsx` (default metadata)
- Create: `ddm-website/app/sitemap.ts`
- Create: `ddm-website/app/robots.ts`
- Create: `ddm-website/public/og-image.jpg` (or .png)

- [ ] **Step 1: Add metadata to all pages**

Verify each page exports `metadata` matching the SEO table in Spec Section 15. Update any pages missing it. Ensure `app/layout.tsx` has the default metadata template with title template "%s | Dream Drive Motors".

- [ ] **Step 2: Create sitemap.ts**

Next.js App Router sitemap convention — export all 14 page URLs + vehicle detail URLs with lastModified dates.

- [ ] **Step 3: Create robots.ts**

Allow all crawlers, reference sitemap URL.

- [ ] **Step 4: Create OG image**

Create a simple dark card image (1200×630) with DDM gold logo centered. Place in `public/og-image.jpg`. Reference in default metadata as `openGraph.images`.

- [ ] **Step 5: Add LocalBusiness structured data**

In `app/layout.tsx` or `app/page.tsx`, add JSON-LD script tag with LocalBusiness schema (name, address, phone, url) per Spec Section 15.

- [ ] **Step 6: Commit**

```bash
git add app/layout.tsx app/sitemap.ts app/robots.ts public/og-image.jpg
git commit -m "feat: add SEO metadata, sitemap, robots.txt, and structured data"
```

### Task 32: Accessibility Pass

**Files:**
- Modify: various component files

- [ ] **Step 1: Add skip-to-content link**

In `app/layout.tsx`, add a visually-hidden link at the top of body: "Skip to main content" that becomes visible on focus (sr-only focus:not-sr-only), links to `#main-content`. Add `id="main-content"` to the `<main>` tag.

- [ ] **Step 2: Add aria labels to icon-only buttons**

Audit Navbar (calendar, person, hamburger buttons), Footer (social icons), VehicleCard (favorite, arrow buttons) — add `aria-label` to all icon-only buttons. Add `aria-hidden="true"` to CustomCursor component.

- [ ] **Step 3: Add focus ring styles**

In `globals.css`, add custom focus-visible style: `outline: 2px solid #D4AF37; outline-offset: 2px;` on all interactive elements. Ensure it's visible against dark backgrounds.

- [ ] **Step 4: Verify form labels**

Ensure all InputField components render proper `<label>` elements associated with inputs via htmlFor/id.

- [ ] **Step 5: Test with keyboard navigation**

Tab through entire site: verify all interactive elements are reachable, focus ring visible, mobile menu traps focus, forms navigable.

- [ ] **Step 6: Commit**

```bash
git add .
git commit -m "feat: accessibility improvements (skip link, aria labels, focus rings)"
```

### Task 33: Performance Optimization & Final Polish

**Files:**
- Modify: `ddm-website/next.config.ts`
- Modify: various pages as needed

- [ ] **Step 1: Optimize Next.js config**

In `next.config.ts`: enable image optimization with remotePatterns for any external image domains, set output appropriately for Vercel.

- [ ] **Step 2: Audit image usage**

Ensure all images use Next.js `<Image>` with:
- `placeholder="blur"` with `blurDataURL` for above-fold images
- `loading="lazy"` for below-fold (default)
- `priority` flag on hero images only
- Appropriate `sizes` prop for responsive srcset

- [ ] **Step 3: Run Lighthouse audit**

```bash
npm run build && npm run start
```

Open Chrome DevTools → Lighthouse → Mobile audit. Target: 90+ performance. Fix any flagged issues (unused CSS, large images, render-blocking resources).

- [ ] **Step 4: Test all pages on mobile**

Use Chrome DevTools device mode. Check each page at:
- iPhone SE (375px) — smallest common phone
- iPhone 14 Pro (393px) — standard phone
- iPad (768px) — tablet
- iPad Pro (1024px) — large tablet
- Desktop (1536px) — design target

Verify: no horizontal overflow, touch targets ≥44px, text readable, images not cropped badly, animations smooth.

- [ ] **Step 5: Final commit**

```bash
git add .
git commit -m "feat: performance optimization and responsive polish"
```

### Task 34: Deploy to Vercel

- [ ] **Step 1: Initialize git remote and push**

```bash
cd ddm-website
git remote add origin <github-repo-url>
git push -u origin main
```

- [ ] **Step 2: Connect to Vercel**

```bash
npx vercel
```

Follow prompts to link project. Vercel auto-detects Next.js and configures build.

- [ ] **Step 3: Verify production deployment**

Visit the Vercel URL. Test:
- All 14 pages render
- Animations work
- Mobile responsive
- Images load
- Page transitions work
- Custom cursor on desktop
- No console errors

- [ ] **Step 4: Commit any deployment config changes**

```bash
git add .
git commit -m "chore: add Vercel deployment configuration"
```
