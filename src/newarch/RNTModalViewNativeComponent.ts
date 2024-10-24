import type { ViewProps } from 'react-native';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';

interface NativeProps extends ViewProps {}

// Doesn't accept variables, so component name is hardcoded
export default codegenNativeComponent<NativeProps>('RNTModalView');
