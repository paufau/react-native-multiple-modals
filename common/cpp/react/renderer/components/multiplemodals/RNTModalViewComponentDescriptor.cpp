/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#include "RNTModalViewComponentDescriptor.h"

namespace facebook::react {

#ifdef ANDROID
State::Shared RNTModalViewComponentDescriptor::createInitialState(
    const Props::Shared& props,
    const ShadowNodeFamily::Shared& family) const {
  auto displaySize = RNTModalViewSize();

  auto measuredWidth = displaySize.width;
  auto measuredHeight = displaySize.height;

  return std::make_shared<RNTModalViewShadowNode::ConcreteState>(
      std::make_shared<const RNTModalViewState>(RNTModalViewState(
          Size{.width = measuredWidth, .height = measuredHeight})),
      family);
}
#endif // ANDROID

} // namespace facebook::react