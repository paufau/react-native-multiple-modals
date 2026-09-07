export const maybeGetElement = (node: unknown): HTMLElement | null =>
  node instanceof HTMLElement ? node : null;

export const getModalRoot = (element: HTMLElement): HTMLElement => {
  let root = element;

  while (root.parentElement && root.parentElement !== document.body) {
    root = root.parentElement;
  }

  return root;
};

export const inertBackground = (modalRoot: Element): (() => void) => {
  const backgrounded = Array.from(document.body.children).filter(
    node => node !== modalRoot && !node.hasAttribute('inert'),
  );

  backgrounded.forEach(node => node.setAttribute('inert', ''));

  return () => {
    backgrounded.forEach(node => node.removeAttribute('inert'));
  };
};

export const onDocumentFocus = (handler: () => void): (() => void) => {
  document.addEventListener('focus', handler, true);

  return () => {
    document.removeEventListener('focus', handler, true);
  };
};

const attemptFocus = (element: HTMLElement): boolean => {
  try {
    element.focus();
  } catch {
    // .focus() can throw in rare cases (e.g. a detached node)
  }

  return document.activeElement === element;
};

export const focusFirstDescendant = (element: HTMLElement): boolean => {
  const { children } = element;

  for (let i = 0; i < children.length; i++) {
    const child = children[i];

    if (
      child instanceof HTMLElement &&
      (attemptFocus(child) || focusFirstDescendant(child))
    ) {
      return true;
    }
  }

  return false;
};

export const focusLastDescendant = (element: HTMLElement): boolean => {
  const { children } = element;

  for (let i = children.length - 1; i >= 0; i--) {
    const child = children[i];

    if (
      child instanceof HTMLElement &&
      (attemptFocus(child) || focusLastDescendant(child))
    ) {
      return true;
    }
  }

  return false;
};

export const createFocusTrap = (
  getModalContent: () => HTMLElement | null,
): (() => void) => {
  let trapInProgress = false;
  let lastFocused: Element | null = null;

  return () => {
    const modalContent = getModalContent();

    if (!modalContent || trapInProgress) {
      return;
    }

    trapInProgress = true;

    try {
      const activeElement = document.activeElement;

      if (activeElement && !modalContent.contains(activeElement)) {
        let hasFocused = focusFirstDescendant(modalContent);

        if (lastFocused === document.activeElement) {
          hasFocused = focusLastDescendant(modalContent);
        }

        if (!hasFocused) {
          modalContent.focus();
        }
      }
    } finally {
      trapInProgress = false;
    }

    lastFocused = document.activeElement;
  };
};
