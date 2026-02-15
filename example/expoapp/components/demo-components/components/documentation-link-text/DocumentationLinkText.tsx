import {Linking} from 'react-native';
import {LIBRARY_GIT_URL} from '../../constants';
import {Typography} from '../typography/Typography';

export const DocumentationLinkText = () => {
  const handlePress = async () => {
    const supported = await Linking.canOpenURL(LIBRARY_GIT_URL);

    if (supported) {
      await Linking.openURL(LIBRARY_GIT_URL);
    }
  };

  return (
    <Typography color="secondary" onPress={handlePress}>
      Press the description to open the library documentation page.
    </Typography>
  );
};
