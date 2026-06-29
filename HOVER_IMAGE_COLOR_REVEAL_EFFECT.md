# PRD & Design Spec — Smooth Hover Image Color Reveal Brush

## Objective

Improve the current hover image effect so it matches the uploaded video reference exactly.

The desired effect is a premium **grayscale-to-color cursor reveal brush**:

* The image is normally black and white.
* When the cursor hovers over the image, a soft circular brush around the cursor reveals the colored version of the same image.
* The reveal should feel smooth, natural, premium, and Apple-like.
* The brush must not look rough, broken, pixelated, or laggy.
* The effect should be applied to the hero portrait image or selected image component currently using this hover interaction.

Do not redesign the entire page. Only improve the image hover reveal effect.

---

## Visual Reference Analysis

The uploaded video shows:

1. The portrait image starts in grayscale.
2. A circular color area appears under the cursor.
3. The brush area is soft and feathered.
4. The transition from grayscale to color is not harsh.
5. The brush follows the cursor smoothly.
6. The colored reveal does not permanently paint the image.
7. The effect behaves like a moving color lens, not a persistent drawing brush.
8. When the cursor moves, only the current circular area remains colored.
9. The rest of the image stays grayscale.
10. The cursor interaction feels fluid and premium.

This must be recreated.

---

## Required Technical Approach

Use a **two-layer image technique**.

### Layer 1 — Base Image

The base image must be grayscale.

```txt
position: relative
image: same portrait/image
filter: grayscale(100%)
```

### Layer 2 — Color Image

The color image must be placed absolutely above the grayscale image.

```txt
position: absolute
inset: 0
image: same portrait/image
filter: none
```

The color layer is hidden by default and only revealed through a CSS mask.

Use:

```css
mask-image: radial-gradient(circle at var(--x) var(--y), black 0%, black 42%, rgba(0,0,0,0.55) 58%, transparent 78%);
-webkit-mask-image: radial-gradient(circle at var(--x) var(--y), black 0%, black 42%, rgba(0,0,0,0.55) 58%, transparent 78%);
```

Important:

* Use both `mask-image` and `-webkit-mask-image`.
* The edge must be feathered.
* Do not use a hard `clip-path: circle()` because it creates a harsh edge.
* Do not use a rough SVG brush unless it is very smooth.
* Do not use persistent canvas painting for this reference.

---

## Smooth Movement Requirement

The mask position must not directly jump to the raw mouse coordinate.

Use Motion for React:

```tsx
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "motion/react";
```

Use raw motion values for pointer position:

```tsx
const rawX = useMotionValue(0);
const rawY = useMotionValue(0);
```

Then apply spring smoothing:

```tsx
const smoothX = useSpring(rawX, {
  stiffness: 180,
  damping: 26,
  mass: 0.45,
});

const smoothY = useSpring(rawY, {
  stiffness: 180,
  damping: 26,
  mass: 0.45,
});
```

Use `useMotionTemplate` to create the mask:

```tsx
const maskImage = useMotionTemplate`
  radial-gradient(
    circle 92px at ${smoothX}px ${smoothY}px,
    black 0%,
    black 42%,
    rgba(0,0,0,0.55) 58%,
    transparent 78%
  )
`;
```

Apply it to the color layer:

```tsx
style={{
  WebkitMaskImage: maskImage,
  maskImage,
}}
```

---

## Brush Size

Desktop brush size:

```txt
circle radius: 92px
```

Tablet brush size:

```txt
circle radius: 78px
```

Mobile:

* Disable cursor-following hover effect because mobile has no real cursor.
* Show normal color image or grayscale image depending on current design preference.
* Recommended: show normal color image on mobile to avoid broken interaction.

If responsive brush size becomes complex, use CSS/media or pass size prop.

---

## Hover Enter / Leave Behavior

When the pointer enters the image:

* Show color layer opacity from `0` to `1`.
* Position the mask immediately at the cursor coordinate.
* Avoid reveal starting from top-left.

When pointer moves:

* Update rawX and rawY based on cursor position inside the image.

When pointer leaves:

* Fade color layer opacity from `1` to `0`.
* Do not keep the last colored area visible.

Use state:

```tsx
const [isHovering, setIsHovering] = useState(false);
```

Color layer opacity:

```tsx
animate={{ opacity: isHovering ? 1 : 0 }}
transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
```

---

## Pointer Coordinate Calculation

Coordinates must be relative to the image container, not the whole viewport.

Use:

```tsx
function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
  const rect = event.currentTarget.getBoundingClientRect();

  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  rawX.set(x);
  rawY.set(y);
}
```

On pointer enter:

```tsx
function handlePointerEnter(event: React.PointerEvent<HTMLDivElement>) {
  const rect = event.currentTarget.getBoundingClientRect();

  rawX.set(event.clientX - rect.left);
  rawY.set(event.clientY - rect.top);

  setIsHovering(true);
}
```

On pointer leave:

```tsx
function handlePointerLeave() {
  setIsHovering(false);
}
```

Important:

* Do not use `pageX/pageY`.
* Do not use viewport coordinates directly.
* Do not calculate from parent section if the image is inside a nested container.
* Always calculate from the image wrapper rect.

---

## Component Name

Create reusable component:

```txt
src/components/ui/HoverColorRevealImage.tsx
```

The component should be reusable for hero portrait or future project images.

---

## Component Props

```ts
type HoverColorRevealImageProps = {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  sizes?: string;
  brushSize?: number;
};
```

Default:

```ts
brushSize = 92
```

---

## Expected Component Implementation

Use this direction:

```tsx
"use client";

import Image from "next/image";
import { useState } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "motion/react";

type HoverColorRevealImageProps = {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  sizes?: string;
  brushSize?: number;
};

export function HoverColorRevealImage({
  src,
  alt,
  className = "",
  imageClassName = "",
  priority = false,
  sizes = "(max-width: 768px) 100vw, 520px",
  brushSize = 92,
}: HoverColorRevealImageProps) {
  const [isHovering, setIsHovering] = useState(false);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const smoothX = useSpring(rawX, {
    stiffness: 180,
    damping: 26,
    mass: 0.45,
  });

  const smoothY = useSpring(rawY, {
    stiffness: 180,
    damping: 26,
    mass: 0.45,
  });

  const maskImage = useMotionTemplate`
    radial-gradient(
      circle ${brushSize}px at ${smoothX}px ${smoothY}px,
      black 0%,
      black 42%,
      rgba(0,0,0,0.55) 58%,
      transparent 78%
    )
  `;

  function updatePointerPosition(event: React.PointerEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();

    rawX.set(event.clientX - rect.left);
    rawY.set(event.clientY - rect.top);
  }

  function handlePointerEnter(event: React.PointerEvent<HTMLDivElement>) {
    updatePointerPosition(event);
    setIsHovering(true);
  }

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    updatePointerPosition(event);
  }

  function handlePointerLeave() {
    setIsHovering(false);
  }

  return (
    <div
      className={`relative isolate overflow-hidden ${className}`}
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className={`select-none object-cover grayscale ${imageClassName}`}
        draggable={false}
      />

      <motion.div
        className="pointer-events-none absolute inset-0 hidden md:block"
        animate={{ opacity: isHovering ? 1 : 0 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        style={{
          WebkitMaskImage: maskImage,
          maskImage,
        }}
      >
        <Image
          src={src}
          alt=""
          fill
          priority={priority}
          sizes={sizes}
          className={`select-none object-cover ${imageClassName}`}
          draggable={false}
          aria-hidden="true"
        />
      </motion.div>

      <Image
        src={src}
        alt=""
        fill
        priority={priority}
        sizes={sizes}
        className={`pointer-events-none select-none object-cover md:hidden ${imageClassName}`}
        draggable={false}
        aria-hidden="true"
      />
    </div>
  );
}
```

---

## Integration Requirement

Find the current image hover/reveal implementation in the project.

Likely locations:

* `src/components/sections/HeroSection.tsx`
* `src/components/ui/`
* any current portrait/avatar/image hover component

Replace the current rough brush implementation with `HoverColorRevealImage`.

Example usage:

```tsx
<HoverColorRevealImage
  src="/images/riswan-portrait.png"
  alt="Riswan Ramadhan"
  priority
  className="relative h-[520px] w-[420px]"
  imageClassName="object-contain"
/>
```

If the current hero portrait needs transparent/contain behavior:

* Use `object-contain`, not `object-cover`.
* Preserve the current image size, placement, and z-index.

If the current image is inside a hero layout with absolute text behind it, make sure:

* the image wrapper does not block navigation buttons
* the mask only affects the image
* the hero typography remains unchanged
* the image still appears above/below text as originally designed

---

## UI Quality Requirements

The final effect must:

* Feel smooth and premium.
* Reveal a soft circular colored area.
* Preserve grayscale outside the brush.
* Not show rough brush edges.
* Not flicker on hover.
* Not start from top-left when entering.
* Not reveal outside the image boundary.
* Not create layout shift.
* Not break mobile layout.
* Not make the image blurry.
* Not affect surrounding text or buttons.

---

## Performance Requirements

* Do not use React state for every pointer move.
* Do not store cursor coordinates in `useState`.
* Use Motion Values for cursor position.
* Do not trigger React re-render on every mouse move.
* Use `pointer-events-none` on the color overlay.
* Use only two image layers.
* Avoid canvas unless absolutely necessary.
* Avoid heavy blur filters on every frame.
* Keep GPU-friendly rendering.

---

## Accessibility Requirements

* Base image must have real `alt`.
* Overlay color image must use `alt=""` and `aria-hidden="true"`.
* The effect is decorative and should not affect screen readers.
* On touch devices, fallback should remain visually acceptable.

---

## Troubleshooting

If the brush still feels rough:

1. Increase feather range:

   ```css
   black 0%,
   black 36%,
   rgba(0,0,0,0.55) 58%,
   transparent 82%
   ```

2. Increase damping:

   ```ts
   damping: 32
   ```

3. Lower stiffness:

   ```ts
   stiffness: 140
   ```

4. Increase brush size:

   ```ts
   brushSize={110}
   ```

If the brush feels delayed:

1. Increase stiffness:

   ```ts
   stiffness: 220
   ```

2. Reduce damping:

   ```ts
   damping: 22
   ```

If the color layer appears outside the image:

* Ensure parent wrapper has:

  ```txt
  relative isolate overflow-hidden
  ```

If the mask does not work in Chrome/Safari:

* Ensure both are applied:

  ```tsx
  WebkitMaskImage: maskImage,
  maskImage,
  ```

If TypeScript complains about MotionTemplate:

* Ensure the project imports from the correct Motion package version.
* If `motion/react` does not work, inspect the installed package and use the correct import path.
* Do not leave broken imports.

---

## Final QA Checklist

Before finishing, verify:

* [ ] The image starts grayscale.
* [ ] Hovering reveals color only around the cursor.
* [ ] The color reveal is circular and feathered.
* [ ] The reveal follows the cursor smoothly.
* [ ] No rough brush/pixelated edge appears.
* [ ] The effect disappears smoothly when cursor leaves.
* [ ] No flickering occurs.
* [ ] The reveal does not permanently paint the image.
* [ ] Mobile layout is not broken.
* [ ] The existing hero design remains unchanged.
* [ ] No TypeScript error.
* [ ] No ESLint error.
* [ ] `npm run dev` works.
