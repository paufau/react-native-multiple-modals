import type { RefObject } from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { View } from 'react-native';

import {
  playExitAnimation,
  runAfterGuaranteedRender,
} from '../helpers/animationHelpers';
import { maybeGetElement } from '../helpers/focusHelpers';
import type { AnimationType } from '../types';

export function useModalAnimation(
  animationType: AnimationType,
  contentRef: RefObject<View | null>,
) {
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

    const container = containerRef.current;
    const content = maybeGetElement(contentRef.current);

    return () => {
      cancelEnteringAnimation();
      playExitAnimation(container, content, latestAnimationType.current);
    };
  }, [contentRef]);

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
