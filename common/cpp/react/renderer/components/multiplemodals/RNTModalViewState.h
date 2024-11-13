#pragma once

#include <jsi/jsi.h>
#include <react/renderer/core/graphicsConversions.h>
#include <react/renderer/graphics/Float.h>

#ifdef ANDROID
#include <folly/dynamic.h>
#endif

#if defined(__APPLE__) && TARGET_OS_IOS
#include "RNTModalViewUtils.h"
#endif

namespace facebook::react
{
        class JSI_EXPORT RNTModalViewState final
        {
        public:
                using Shared = std::shared_ptr<const RNTModalViewState>;

#if defined(__APPLE__) && TARGET_OS_IOS
                RNTModalViewState() : screenSize(RNTModalViewSize())
                {
#else
                RNTModalViewState() {
#endif
                };
                RNTModalViewState(Size screenSize_) : screenSize(screenSize_) {};

#ifdef ANDROID
                RNTModalViewState(
                    const RNTModalViewState &previousState,
                    folly::dynamic data)
                    : screenSize(Size{
                          (Float)data["screenWidth"].getDouble(),
                          (Float)data["screenHeight"].getDouble()}) {};
#endif

                const Size screenSize{};

#ifdef ANDROID
                folly::dynamic getDynamic() const;
#endif

#pragma mark - Getters
        };

} // namespace facebook::react