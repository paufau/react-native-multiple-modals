import { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ModalView } from 'react-native-multiple-modals';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AlertContent } from '../../components/alert-content/AlertContent';
import { BaseModalProps } from '../BaseModal';

type EdgeToEdgeModalProps = BaseModalProps;

export const EdgeToEdgeModal: FC<EdgeToEdgeModalProps> = props => {
  return (
    <ModalView
      onRequestDismiss={props.onRequestDismiss}
      backdropColor='#0d47a1'
      contentContainerStyle={styles.contentContainer}
      statusBar={{ barStyle: 'light-content', translucent: true }}
    >
      <SafeAreaView style={styles.body}>
        <View
          style={[styles.edge, styles.topEdge]}
          testID={`${props.testID}-top-edge`}
        >
          <Text style={styles.edgeText}>↑ TOP EDGE ↑</Text>
        </View>

        <AlertContent {...props} />

        <View
          style={[styles.edge, styles.bottomEdge]}
          testID={`${props.testID}-bottom-edge`}
        >
          <Text style={styles.edgeText}>↓ BOTTOM EDGE ↓</Text>
        </View>
      </SafeAreaView>
    </ModalView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
  body: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  edge: {
    alignSelf: 'stretch',
    paddingVertical: 18,
    alignItems: 'center',
    backgroundColor: '#e53935',
  },
  topEdge: {},
  bottomEdge: {},
  edgeText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
});
