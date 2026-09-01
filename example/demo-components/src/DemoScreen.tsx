import {ComponentType, useCallback, useMemo, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScenarioCard} from './components/scenario-card/ScenarioCard';
import {Typography} from './components/typography/Typography';
import {AnimatedFadeModal} from './modals/animated-fade/AnimatedFadeModal';
import {BlockingModal} from './modals/blocking/BlockingModal';
import {BlurredModal} from './modals/blurred/BlurredModal';
import {DefaultModal} from './modals/default/DefaultModal';
import {FullScreenNoBackgroundModal} from './modals/full-screen-no-bg/FullScreenNoBackgroundModal';
import {GesturedModal} from './modals/gestured/GesturedModal';
import {InBottomTabsModal} from './modals/in-bottom-tabs-modal/InBottomTabsModal';
import {ReanimatedModal} from './modals/reanimated/ReanimatedModal';
import {SimpleModal} from './modals/simple/SimpleModal';
import {AnimatedSlideModal} from './modals/slide/AnimatedSlideModal';
import {WithNavigationInsideModal} from './modals/with-navigation-inside/WithNavigationInsideModal';
import {useTheme} from './theme/colors';
import {IS_FABRIC} from './constants';
import {EmbeddedModal} from './modals/embedded/EmbeddedModal';

type DemoCase = {
  id: string;
  title: string;
  description: string;
  Component: ComponentType<any>;
  additionalProps?: object;
  isExclusive?: boolean;
};

export const DemoScreen = () => {
  const {colors} = useTheme();

  const [activeCases, setActiveCases] = useState<DemoCase[]>([]);

  const openModal = useCallback((caseId: string) => {
    const demoCase = demoCases.find(c => c.id === caseId);

    if (demoCase) {
      setActiveCases(prev => [...prev, demoCase]);
    } else {
      console.error(`Demo case with id "${caseId}" not found.`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const closeModal = useCallback((caseId: string) => {
    setActiveCases(prev => prev.filter(c => c.id !== caseId));
  }, []);

  const demoCases = useMemo<DemoCase[]>(
    () => [
      {
        id: 'default',
        title: 'Default',
        description: 'A default React Native modal',
        Component: DefaultModal,
        additionalProps: {
          onOpenLibraryModal: () => openModal('blocking'),
        },
      },
      {
        id: 'simple',
        title: 'Simple',
        description: 'No animations. Can be dismissed by tapping outside.',
        Component: SimpleModal,
      },
      {
        id: 'embedded',
        title: 'Embedded',
        description:
          'Has a modal inside it. Opening the inner modal should affect the layout.',
        Component: EmbeddedModal,
      },
      {
        id: 'animated-fade',
        title: 'Animated Fade',
        description: 'Animated fade appearance and disappearance.',
        Component: AnimatedFadeModal,
      },
      {
        id: 'animated-slide',
        title: 'Animated Slide',
        description: 'Animated slide appearance and disappearance.',
        Component: AnimatedSlideModal,
      },
      {
        id: 'blocking',
        title: 'Blocking',
        description:
          'A modal that blocks interaction with the background. Appears from the bottom.',
        Component: BlockingModal,
        additionalProps: {
          onOpenAnother: () => openModal('reanimated'),
        },
      },
      {
        id: 'blurred',
        title: 'Blurred',
        description: 'A modal with a custom blurred background.',
        Component: BlurredModal,
      },
      {
        id: 'gestured',
        title: 'Gestured',
        description: 'A modal that supports gestures for dragging.',
        Component: GesturedModal,
      },
      {
        id: 'reanimated',
        title: 'Reanimated',
        description: 'A modal using Reanimated for advanced animations.',
        Component: ReanimatedModal,
      },
      {
        id: 'in-bottom-tab',
        title: 'Modal Above Bottom Tabs',
        description: 'A modal displayed above a bottom tab navigator.',
        Component: InBottomTabsModal,
        isExclusive: true,
      },
      {
        id: 'full-screen',
        title: 'Full Screen',
        description: 'A full-screen modal.',
        Component: FullScreenNoBackgroundModal,
      },
      {
        id: 'with-navigation-inside',
        title: 'With Navigation Inside Modal',
        description: 'A modal that contains a navigation stack inside it.',
        Component: WithNavigationInsideModal,
      },
    ],
    [openModal],
  );

  const isLastCaseExclusive = useMemo(() => {
    const lastCase = activeCases[activeCases.length - 1];
    if (!lastCase) {
      return false;
    }
    return lastCase.isExclusive;
  }, [activeCases]);

  const renderModal = useCallback(
    (item: DemoCase) => (
      <item.Component
        key={item.id}
        title={item.title}
        testID={item.id}
        onRequestDismiss={() => closeModal(item.id)}
        {...item.additionalProps}
      />
    ),
    [closeModal],
  );

  if (isLastCaseExclusive && activeCases.length > 0) {
    const lastCase = activeCases[activeCases.length - 1];

    return renderModal(lastCase);
  }

  return (
    <SafeAreaView
      style={[styles.safeArea, {backgroundColor: colors.background}]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}>
        <Typography testID="screen-top" style={styles.architecture}>
          Current Architecture: {IS_FABRIC ? 'Fabric 🚀' : 'Paper ✈️'}
        </Typography>

        <View style={styles.casesContainer}>
          {demoCases.map(({title, description, id}) => (
            <ScenarioCard
              key={id}
              testID={`${id}-open-button`}
              title={title}
              description={description}
              onPress={() => {
                openModal(id);
              }}
            />
          ))}
        </View>
      </ScrollView>

      {activeCases.map(renderModal)}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  architecture: {
    marginTop: 32,
    fontSize: 20,
    fontWeight: '500',
  },
  scrollContent: {
    paddingHorizontal: 24,
    alignItems: 'center',
    gap: 24,
  },
  casesContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    maxWidth: 800,
    marginBottom: 48,
  },
});
