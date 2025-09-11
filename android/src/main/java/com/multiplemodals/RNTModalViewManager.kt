package com.multiplemodals

import com.facebook.react.common.MapBuilder
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.LayoutShadowNode
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp
import com.multiplemodals.events.PressBackEvent

@ReactModule(name = RNTModalView.REACT_CLASS)
class RNTModalViewManager : RNTModalViewManagerSpec<RNTModalView>() {
  override fun getName() = RNTModalView.REACT_CLASS

  override fun createViewInstance(reactContext: ThemedReactContext): RNTModalView {
    return RNTModalView(reactContext)
  }

  override fun createShadowNodeInstance(): LayoutShadowNode {
    return RNTModalShadowView()
  }

  override fun getExportedCustomDirectEventTypeConstants(): MutableMap<String, Any> {
    val buildOf = "registrationName"

    val map = MapBuilder.builder<String, Any>()
      .put(PressBackEvent.NAME, MapBuilder.of(buildOf, PressBackEvent.REGISTRATION_NAME))
      .build()
    
    return when (map) {
      is MutableMap<String, Any> -> map
      else -> map.toMutableMap()
    }
  }

  override fun onDropViewInstance(view: RNTModalView) {
    super.onDropViewInstance(view)
    view.onHostDestroy()
  }

  @ReactProp(name = "statusBarTranslucent")
  override fun setStatusBarTranslucent(
    view: RNTModalView,
    statusBarTranslucent: Boolean
  ) {
    view.statusBarTranslucent = statusBarTranslucent
  }

  @ReactProp(name = "statusBarIconsStyle")
  override fun setStatusBarIconsStyle(
    view:RNTModalView,
    statusBarIconsStyle: String?
  ) {
    if (statusBarIconsStyle != null) {
      view.statusBarIconsStyle = statusBarIconsStyle
    }
  }

  @ReactProp(name = "animationType")
  override fun setAnimationType(
    view:RNTModalView,
    animationType: String?
  ) {
    if (animationType != null) {
      view.animationType = animationType
    }
  }
}
