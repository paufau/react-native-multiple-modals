package com.multiplemodals

import com.facebook.react.common.MapBuilder
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewGroupManager
import com.multiplemodals.events.PressBackEvent

class RNTModalViewManager : ViewGroupManager<RNTModalView>() {
  override fun getName() = RNTModalView.REACT_CLASS

  override fun createViewInstance(reactContext: ThemedReactContext): RNTModalView {
    return RNTModalView(reactContext)
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
}
