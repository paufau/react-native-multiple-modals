package com.multiplemodals

import com.facebook.react.common.MapBuilder
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.LayoutShadowNode
import com.facebook.react.uimanager.ReactStylesDiffMap
import com.facebook.react.uimanager.StateWrapper
import com.facebook.react.uimanager.ThemedReactContext
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

    return MapBuilder.builder<String, Any>()
      .put(PressBackEvent.NAME, MapBuilder.of(buildOf, PressBackEvent.REGISTRATION_NAME))
      .build()
  }

  override fun onDropViewInstance(view: RNTModalView) {
    super.onDropViewInstance(view)
    view.onHostDestroy()
  }

  override fun onAfterUpdateTransaction(view: RNTModalView) {
    super.onAfterUpdateTransaction(view)
    view.show()
  }

  override fun updateState(
    view: RNTModalView,
    props: ReactStylesDiffMap,
    stateWrapper: StateWrapper
  ): Any? {
    view.stateWrapper = stateWrapper
    return null
  }
}
