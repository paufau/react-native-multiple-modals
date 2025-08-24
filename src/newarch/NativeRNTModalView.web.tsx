import * as React from 'react';

import { View, ViewProps } from 'react-native';

type NativeProps = ViewProps & {
  children?: React.ReactNode;
};

// TODO this components doesn't seem to be used
const NativeRNTModalView: React.FC<NativeProps> = ({ children, ...props }) => (
  <View {...props}>{children}</View>
);

export default NativeRNTModalView;
