#pragma once

#include <fbjni/fbjni.h>
#include <react/renderer/graphics/Size.h>

namespace facebook::react
{

  class JReactModalHostView
      : public facebook::jni::JavaClass<JReactModalHostView>
  {
  public:
    static auto constexpr kJavaDescriptor =
        "Lcom/multiplemodals/RNTModalView;";

    static Size getDisplayMetrics()
    {
      static auto method =
          JReactModalHostView::javaClassStatic()->getStaticMethod<jlong()>(
              "getScreenDisplayMetricsWithoutInsets");
      auto result = method(javaClassStatic());

      // Inspired from yogaMeassureToSize from conversions.h
      constexpr uint32_t MASK_32BIT = 0xFFFFFFFF;
      int32_t wBits = static_cast<uint32_t>(MASK_32BIT & (result >> 32));
      int32_t hBits = static_cast<uint32_t>(MASK_32BIT & result);

      auto *measuredWidth = reinterpret_cast<float *>(&wBits);
      auto *measuredHeight = reinterpret_cast<float *>(&hBits);

      return Size{.width = *measuredWidth, .height = *measuredHeight};
    }
  };

}