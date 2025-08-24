#pragma once

#include <glog/logging.h>
#include <react/renderer/components/multiplemodals/RNTModalViewShadowNode.h>
#include <react/renderer/core/ConcreteComponentDescriptor.h>

namespace facebook::react
{
  class RNTModalViewComponentDescriptor final
      : public ConcreteComponentDescriptor<RNTModalViewShadowNode>
  {
  public:
    using ConcreteComponentDescriptor::ConcreteComponentDescriptor;


    #ifdef ANDROID
    State::Shared createInitialState(
        const Props::Shared& props,
        const ShadowNodeFamily::Shared& family) const override;
    #endif // ANDROID

    void adopt(ShadowNode &shadowNode) const override
    {
      auto &layoutableShadowNode =
          static_cast<YogaLayoutableShadowNode &>(shadowNode);
      auto &stateData =
          static_cast<const RNTModalViewShadowNode::ConcreteState &>(
              *shadowNode.getState())
              .getData();

      layoutableShadowNode.setSize(Size{
          .width = stateData.screenSize.width,
          .height = stateData.screenSize.height});
      layoutableShadowNode.setPositionType(YGPositionTypeAbsolute);

      ConcreteComponentDescriptor::adopt(shadowNode);
    }
  };

} // namespace facebook::react