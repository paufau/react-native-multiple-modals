import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {FC, useCallback} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ModalView} from 'react-native-multiple-modals';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {AlertContent} from '../../components/alert-content/AlertContent';
import {BaseModalProps} from '../BaseModal';

type InBottomTabsModalProps = BaseModalProps;

const TabNavigator = createBottomTabNavigator();

const ScreenWithModal: FC<InBottomTabsModalProps> = props => {
  return (
    <View style={styles.screen}>
      <Text>Some content</Text>
      <ModalView
        onRequestDismiss={props.onRequestDismiss}
        contentContainerStyle={styles.contentContainer}>
        <AlertContent {...props} />
      </ModalView>
    </View>
  );
};

export const InBottomTabsModal: FC<InBottomTabsModalProps> = props => {
  const MemoizedScreenWithModal = useCallback(
    () => <ScreenWithModal {...props} />,
    [props],
  );

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <TabNavigator.Navigator>
          <TabNavigator.Screen
            name="initial"
            component={MemoizedScreenWithModal}
          />
        </TabNavigator.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  screen: {
    flex: 1,
  },
});
