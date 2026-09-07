import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import {
  playExitAnimation,
  runAfterGuaranteedRender,
} from '../helpers/animationHelpers';
import { maybeGetElement } from '../helpers/focusHelpers';
import type { AnimationType } from '../types';

export function useModalAnimation(animationType: AnimationType) {
  const [isVisible, setVisibility] = useState(animationType === 'none');

  const containerRef = useRef<HTMLElement | null>(null);
  const latestAnimationType = useRef(animationType);
  latestAnimationType.current = animationType;

  const setContainerRef = useCallback((node: unknown) => {
    containerRef.current = maybeGetElement(node);
  }, []);

  useEffect(() => {
    const cancelEnteringAnimation = runAfterGuaranteedRender(() =>
      setVisibility(true),
    );

    const modalContent = containerRef.current;

    return () => {
      cancelEnteringAnimation();
      playExitAnimation(modalContent, latestAnimationType.current);
    };
  }, []);

  const animatedStyle = useMemo(() => {
    switch (animationType) {
      case 'fade':
        return { opacity: isVisible ? 1 : 0, transition: 'opacity 0.3s' };
      case 'slide':
        return {
          transform: isVisible ? 'translateY(0)' : 'translateY(100%)',
          opacity: isVisible ? 1 : 0,
          transition: 'transform 0.3s, opacity 0.3s',
        };
      default:
        return {};
    }
  }, [animationType, isVisible]);

  return { setContainerRef, animatedStyle };
}
