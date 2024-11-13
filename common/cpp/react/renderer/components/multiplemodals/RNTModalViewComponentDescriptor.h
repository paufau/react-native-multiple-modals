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

    void adopt(ShadowNode &shadowNode) const override
    {
      auto &layoutableShadowNode =
          static_cast<YogaLayoutableShadowNode &>(shadowNode);
      auto &stateData =
          static_cast<const RNTModalViewShadowNode::ConcreteState &>(
              *shadowNode.getState())
              .getData();

      layoutableShadowNode.setSize(
          Size{stateData.screenSize.width, stateData.screenSize.height});
      layoutableShadowNode.setPositionType(YGPositionTypeAbsolute);

      ConcreteComponentDescriptor::adopt(shadowNode);
    }
  };

} // namespace facebook::react