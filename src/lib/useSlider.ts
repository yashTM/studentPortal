import { useCallback, useRef, useState } from "react";

/**
 * Index state for sliders. Auto-advance is driven by the progress bar's animationend event
 * (see HeroSlider), so the visual progress and the timing can never drift apart.
 */
export function useSlider(count: number) {
  const [index, setIndex] = useState(0);
  const next = useCallback(() => setIndex((i) => (i + 1) % count), [count]);
  const prev = useCallback(() => setIndex((i) => (i - 1 + count) % count), [count]);
  return { index, setIndex, next, prev };
}

/** Horizontal swipe handlers: onSwipe(1) for a swipe left (next), onSwipe(-1) for a swipe right (previous). */
export function useSwipe(onSwipe: (dir: 1 | -1) => void) {
  const startX = useRef(0);
  return {
    onTouchStart: (e: React.TouchEvent) => {
      startX.current = e.touches[0].clientX;
    },
    onTouchEnd: (e: React.TouchEvent) => {
      const dx = e.changedTouches[0].clientX - startX.current;
      if (Math.abs(dx) > 50) onSwipe(dx < 0 ? 1 : -1);
    },
  };
}
