import type { ViewProps } from 'react-native';
import { DirectEventHandler } from 'react-native/Libraries/Types/CodegenTypes';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';

type PressBackAndroidEvent = Readonly<{}>;

interface NativeProps extends ViewProps {
  onPressBackAndroid?: DirectEventHandler<PressBackAndroidEvent>;
  statusBarTranslucent?: boolean;
  statusBarIconsStyle?: string;
  animationType: string;
}

// Codegen doesn't accept variables, so component name is hardcoded
export default codegenNativeComponent<NativeProps>('RNTModalView', {
  interfaceOnly: true,
});
