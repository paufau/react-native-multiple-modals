import { useEffect } from 'react';

import { maybeGetElement } from '../helpers/focusHelpers';

export function useRestoreFocus() {
  useEffect(() => {
    const previouslyFocused = maybeGetElement(document.activeElement);

    return () => {
      Promise.resolve().then(() => {
        if (previouslyFocused && document.contains(previouslyFocused)) {
          previouslyFocused.focus();
        }
      });
    };
  }, []);
}
