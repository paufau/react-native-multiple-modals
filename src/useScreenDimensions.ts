import { useEffect, useState } from 'react';
import { Dimensions, ScaledSize } from 'react-native';

export const useScreenDimensions = (): ScaledSize => {
  const [screenDimensions, setScreenDimensions] = useState(
    Dimensions.get('screen'),
  );

  useEffect(() => {
    const listener = Dimensions.addEventListener('change', ({ screen }) => {
      setScreenDimensions(screen);
    });

    return listener.remove;
  }, []);

  return screenDimensions;
};
