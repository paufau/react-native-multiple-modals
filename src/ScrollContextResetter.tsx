import { VirtualizedListContextResetter } from "@react-native/virtualized-lists";
import { FC, ReactNode } from "react";
import { default as ScrollViewContext } from "react-native/Libraries/Components/ScrollView/ScrollViewContext";

type ScrollContextResetterProps = {
  children: ReactNode;
};

// Mimicking RN solution
// https://github.com/facebook/react-native/blob/main/packages/react-native/Libraries/Modal/Modal.js
export const ScrollContextResetter: FC<ScrollContextResetterProps> = ({
  children,
}) => {
  return (
    <VirtualizedListContextResetter>
      <ScrollViewContext.Provider value={null}>
        {children}
      </ScrollViewContext.Provider>
    </VirtualizedListContextResetter>
  );
};
