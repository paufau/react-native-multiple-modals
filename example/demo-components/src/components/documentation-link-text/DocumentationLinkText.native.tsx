// @ts-ignore
import openURLInBrowser from 'react-native/Libraries/Core/Devtools/openURLInBrowser';
import { LIBRARY_GIT_URL } from '../../constants';
import { Typography } from '../typography/Typography';

export const DocumentationLinkText = () => {
  const handlePress = () => {
    openURLInBrowser(LIBRARY_GIT_URL);
  };

  return (
    <Typography color='secondary' onPress={handlePress}>
      Press the description to open the library documentation page.
    </Typography>
  );
};
