import { useEffect, useRef } from 'react';

const getRandomId = (): string => Math.random().toString(36);

export const useID = (defaultID?: string): string => {
  const idRef = useRef<string>(defaultID || getRandomId());

  useEffect(() => {
    return () => {
      idRef.current = defaultID || getRandomId();
    };
  }, [defaultID]);

  return idRef.current;
};
