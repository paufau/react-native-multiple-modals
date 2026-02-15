import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ModalView} from 'react-native-multiple-modals';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Button} from '../../components/button/Button';
import {NavigationContainerCompat} from '../../components/compat/navigation-container/NavigationContainerCompat';
import {COLORS, useTheme} from '../../theme/colors';
import {BaseModalProps} from '../BaseModal';

type WithNavigationInsideModalProps = BaseModalProps;

const TabNavigator = createBottomTabNavigator();

export const WithNavigationInsideModal: FC<
  WithNavigationInsideModalProps
> = props => {
  return (
    <View style={styles.screen}>
      <Text>Some content</Text>
      <ModalView
        onRequestDismiss={props.onRequestDismiss}
        contentContainerStyle={styles.contentContainer}>
        <View testID={`${props.testID}-modal`} style={styles.wrapper}>
          <BottomTabsNavigator />
          <Button
            testID={`${props.testID}-close-button`}
            style={styles.confirmButton}
            onPress={props.onRequestDismiss}>
            Close
          </Button>
        </View>
      </ModalView>
    </View>
  );
};

const MockScreen = () => {
  const {colors} = useTheme();

  return (
    <View
      testID="modal-navigation-screen"
      style={{flex: 1, backgroundColor: colors.backgroundHighlight}}
    />
  );
};

export const BottomTabsNavigator = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainerCompat>
        <TabNavigator.Navigator detachInactiveScreens={false}>
          <TabNavigator.Screen name="initial" component={MockScreen} />
        </TabNavigator.Navigator>
      </NavigationContainerCompat>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    paddingVertical: 64,
  },
  modal: {
    width: '80%',
    borderRadius: 26,
    backgroundColor: COLORS.while,
    alignItems: 'stretch',
    justifyContent: 'space-between',
    padding: 20,
  },
  title: {
    fontSize: 26,
    lineHeight: 30,
    fontWeight: '500',
    color: COLORS.grayDark,
  },
  description: {
    fontSize: 18,
    lineHeight: 22,
    fontWeight: '400',
    color: COLORS.grayDark,
    marginTop: 8,
  },
  confirmButton: {
    marginTop: 16,
  },
  screen: {
    flex: 1,
  },
});
