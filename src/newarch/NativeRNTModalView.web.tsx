import * as React from 'react';
import { View, ViewProps } from 'react-native';

type NativeProps = ViewProps & {
  children?: React.ReactNode;
};

const NativeRNTModalView: React.FC<NativeProps> = ({ children, ...props }) => (
  <View {...props}>{children}</View>
);

export default NativeRNTModalView;