import { useEffect, useRef } from 'react';
import type { View } from 'react-native';

import {
  createFocusTrap,
  getModalRoot,
  inertBackground,
  maybeGetElement,
  onDocumentFocus,
} from '../helpers/focusHelpers';
import { useRestoreFocus } from './useRestoreFocus';

export function useFocusTrap(isTopmost: boolean) {
  const contentRef = useRef<View>(null);

  useRestoreFocus();

  useEffect(() => {
    if (!isTopmost) {
      return;
    }

    const modalContent = maybeGetElement(contentRef.current);

    if (!modalContent) {
      return;
    }

    return inertBackground(getModalRoot(modalContent));
  }, [isTopmost]);

  useEffect(() => {
    if (!isTopmost) {
      return;
    }

    const trapFocus = createFocusTrap(() =>
      maybeGetElement(contentRef.current),
    );

    trapFocus();

    return onDocumentFocus(trapFocus);
  }, [isTopmost]);

  return contentRef;
}
