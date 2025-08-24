import { useState, useEffect } from 'react';

const currentModals = new Set<string>();

export function useModalRegistry(modalId: string) {
  const [modals, setModals] = useState<Set<string>>(new Set(currentModals));

  useEffect(() => {
    currentModals.add(modalId);
    setModals(new Set(currentModals));
    return () => {
      currentModals.delete(modalId);
      setModals(new Set(currentModals));
    };
  }, [modalId]);

  return {
    modals,
    isBackdropVisible: modals.size > 0 && Array.from(modals)[0] === modalId,
  };
}
