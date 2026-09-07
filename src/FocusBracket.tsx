import type { FC } from 'react';

// Invisible + focusable sentinels placed on each side of the dialog
// Tabbing past either edge lands on a bracket (outside the trap) and gets bounced back in
export const FocusBracket: FC = () => (
  <div role='none' tabIndex={0} style={{ outline: 'none' }} />
);
