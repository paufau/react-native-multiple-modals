package com.multiplemodals

import android.view.ViewGroup
import com.facebook.react.bridge.WritableMap
import com.facebook.react.bridge.WritableNativeMap
import com.facebook.react.uimanager.PixelUtil
import com.facebook.react.uimanager.ReactStylesDiffMap
import com.facebook.react.uimanager.StateWrapper
import com.facebook.react.uimanager.ViewGroupManager
import com.facebook.react.uimanager.ViewManagerDelegate
import com.facebook.react.viewmanagers.RNTModalViewManagerDelegate
import com.facebook.react.viewmanagers.RNTModalViewManagerInterface
import com.multiplemodals.library.ModalHostHelper
import com.multiplemodals.library.OnSizeComputedListener
import kotlin.math.roundToInt

abstract class RNTModalViewManagerSpec<T : ViewGroup> : ViewGroupManager<T>(), RNTModalViewManagerInterface<T> {
  private val mDelegate: ViewManagerDelegate<T> = RNTModalViewManagerDelegate(this)

  override fun getDelegate(): ViewManagerDelegate<T>? {
    return mDelegate
  }

  private fun computeViewSize(view: RNTModalView) {
    val modalSize = ModalHostHelper.getModalHostSize(view.context, view.statusBarTranslucent)

    view.onSizeComputedListener?.onSizeComputed(
      modalSize.x,
      modalSize.y,
    )
  }

  override fun updateState(
    view: T,
    props: ReactStylesDiffMap,
    stateWrapper: StateWrapper
  ): Any? {
    if (view is RNTModalView) {
      val currentWidthDip = stateWrapper.stateData?.getDouble("screenWidth")?.roundToInt()
      val currentHeightDip = stateWrapper.stateData?.getDouble("screenHeight")?.roundToInt()

      if (currentWidthDip != null && currentHeightDip != null) {
        if (currentWidthDip > 0 && currentHeightDip > 0) {
          view.isShadowViewSizeSet = true
        }
      }

      view.onSizeComputedListener = OnSizeComputedListener { widthPx, heightPx ->
        val nextWidthDip = PixelUtil.toDIPFromPixel(widthPx.toFloat()).roundToInt()
        val nextHeightDip = PixelUtil.toDIPFromPixel(heightPx.toFloat()).roundToInt()

        // Comparing props prevents infinite update cycle
        if (currentWidthDip != nextWidthDip || currentHeightDip != nextHeightDip) {
          val newStateData: WritableMap = WritableNativeMap()
          newStateData.putDouble("screenWidth", nextWidthDip.toDouble())
          newStateData.putDouble("screenHeight", nextHeightDip.toDouble())
          stateWrapper.updateState(newStateData)
        }
      }

      computeViewSize(view)
      view.show()
    }

    return null
  }
}
