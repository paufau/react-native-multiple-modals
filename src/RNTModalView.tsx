import { FC } from 'react';
import { RNTModalViewProps } from './oldarch/RNTModalView';

let RNTModalView: FC<RNTModalViewProps>;

if ((global as any)?.nativeFabricUIManager) {
  RNTModalView = require('./newarch/RNTModalViewNativeComponent').default;
} else {
  RNTModalView = require('./oldarch/RNTModalView').default;
}

export default RNTModalView;
