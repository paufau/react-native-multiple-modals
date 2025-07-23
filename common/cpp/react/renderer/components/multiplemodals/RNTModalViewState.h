
#pragma once

#include <react/renderer/core/graphicsConversions.h>
#include <react/renderer/graphics/Float.h>
#include "RNTModalViewUtils.h"

#ifdef ANDROID
#include <folly/dynamic.h>
#endif

namespace facebook::react
{
  class JSI_EXPORT RNTModalViewState final
  {
  public:
    using Shared = std::shared_ptr<const RNTModalViewState>;

    RNTModalViewState() : screenSize(RNTModalViewSize()) {}
    RNTModalViewState(Size screenSize_) : screenSize(screenSize_) {};

#ifdef ANDROID
    RNTModalViewState(
        const RNTModalViewState &previousState,
        folly::dynamic data)
        : screenSize(Size{
              .width = (Float)data["screenWidth"].getDouble(),
              .height = (Float)data["screenHeight"].getDouble()}) {};
#endif

    const Size screenSize{};

#ifdef ANDROID
    folly::dynamic getDynamic() const;
#endif

#pragma mark - Getters
  };

} // namespace facebook::react