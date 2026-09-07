# UI issues for dev + applied fixes

## 1. Logo repetition / broken sizing
- Problem: Header mixed raster logo + duplicated text; earlier hero/contact logos could escape sizing and dominate the page.
- Fix: Keep one bounded header logo and one footer logo; remove oversized decorative logo placements.

## 2. Hero visual became a text card
- Problem: The previous fix replaced the broken graphic with more structured text, which makes the page feel coded/template-like.
- Fix: Use a generated 3D visual asset in the hero, with only a small overlay label.

## 3. Broken SVG diagram
- Problem: The cube, circles, arrows, and chart labels clipped at laptop/tablet widths and looked like rendering bugs.
- Fix: Replace the handmade SVG/radar with generated graphics and simple responsive image frames.

## 4. Too many repeated cards
- Problem: Every section used the same text-card pattern, weakening visual hierarchy.
- Fix: Alternate text sections with rich visual image blocks and compact captions.

## 5. Weak responsive art direction
- Problem: Graphics did not have a stable image ratio and positioning rules across iPhone/laptop.
- Fix: Use aspect-ratio containers, object-fit: cover, and breakpoint-specific single-column layout.

## 6. Footer/social visibility
- Problem: Social links were present but visually secondary and not anchored as a deliberate footer row.
- Fix: Keep pill buttons, wrap on mobile, and verify no overflow.
