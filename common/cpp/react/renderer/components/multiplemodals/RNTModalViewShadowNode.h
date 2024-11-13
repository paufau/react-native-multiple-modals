#pragma once

#include <jsi/jsi.h>
#include <react/renderer/components/multiplemodals/EventEmitters.h>
#include <react/renderer/components/multiplemodals/Props.h>
#include <react/renderer/components/multiplemodals/RNTModalViewState.h>
#include <react/renderer/components/view/ConcreteViewShadowNode.h>

namespace facebook::react
{
  JSI_EXPORT extern const char RNTModalViewComponentName[];

  class JSI_EXPORT RNTModalViewShadowNode final : public ConcreteViewShadowNode<
                                                      RNTModalViewComponentName,
                                                      RNTModalViewProps,
                                                      RNTModalViewEventEmitter,
                                                      RNTModalViewState>
  {
  public:
    using ConcreteViewShadowNode::ConcreteViewShadowNode;

    static ShadowNodeTraits BaseTraits()
    {
      auto traits = ConcreteViewShadowNode::BaseTraits();
      traits.set(ShadowNodeTraits::Trait::RootNodeKind);
      return traits;
    }
  };

} // namespace facebook::react