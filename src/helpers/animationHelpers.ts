import { maybeGetElement } from './focusHelpers';
import type { AnimationType } from '../types';

const EXIT_DURATION_MS = 300;

const EXIT_ANIMATION_OPTIONS: KeyframeAnimationOptions = {
  duration: EXIT_DURATION_MS,
  easing: 'ease',
  fill: 'forwards',
};

export function runAfterGuaranteedRender(callback: () => void) {
  let animationFrame2: number | undefined;

  const animationFrame1 = requestAnimationFrame(() => {
    animationFrame2 = requestAnimationFrame(callback);
  });

  return () => {
    cancelAnimationFrame(animationFrame1);
    cancelAnimationFrame(animationFrame2);
  };
}

export function playExitAnimation(
  container: HTMLElement | null,
  content: HTMLElement | null,
  animationType: AnimationType,
) {
  if (!container || animationType === 'none') {
    return;
  }

  const clone = maybeGetElement(container.cloneNode(true));

  if (!clone) {
    return;
  }

  clone.style.pointerEvents = 'none';
  document.body.appendChild(clone);

  const fadeAnimation = clone.animate(
    { opacity: [1, 0] },
    EXIT_ANIMATION_OPTIONS,
  );

  if (animationType === 'slide' && content) {
    const contentIndex = Array.from(container.children).indexOf(content);
    const contentClone = clone.children.item(contentIndex);

    contentClone?.animate(
      { transform: ['translateY(0)', 'translateY(100%)'] },
      EXIT_ANIMATION_OPTIONS,
    );
  }

  const remove = () => clone.remove();

  fadeAnimation.finished.then(remove, remove);
}
