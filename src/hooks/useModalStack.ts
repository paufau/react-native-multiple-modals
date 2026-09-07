import { useEffect, useSyncExternalStore } from 'react';

let stack: string[] = [];
const listeners = new Set<() => void>();

const emit = () => listeners.forEach(listener => listener());

const subscribe = (listener: () => void) => {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
};

export function useModalStack(id: string) {
  const getIsTopmost = () => stack[stack.length - 1] === id;

  const isTopmost = useSyncExternalStore(subscribe, getIsTopmost, getIsTopmost);

  useEffect(() => {
    stack = [...stack, id];
    emit();

    return () => {
      stack = stack.filter(entry => entry !== id);
      emit();
    };
  }, [id]);

  return { isTopmost };
}
