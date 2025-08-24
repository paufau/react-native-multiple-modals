import { useRef } from 'react';

export const useID = (defaultID?: string): string => {
  return useRef<string>(defaultID || Math.random().toString(36)).current;
};
