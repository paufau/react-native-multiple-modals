package com.multiplemodals

import android.view.ViewGroup
import com.facebook.react.bridge.GuardedRunnable
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.UIManagerModule
import com.facebook.react.uimanager.ViewGroupManager
import com.multiplemodals.library.OnSizeComputedListener
import kotlin.math.roundToInt

abstract class RNTModalViewManagerSpec<T : ViewGroup> : ViewGroupManager<T>() {
    override fun onAfterUpdateTransaction(view: T) {
        if (view is RNTModalView) {
            super.onAfterUpdateTransaction(view)

            // set by RNTModalShadowView for paper arch
            view.isShadowViewSizeSet = true

            view.onSizeComputedListener = OnSizeComputedListener { id, widthDip, heightDip ->
                val reactContext = view.context as ThemedReactContext

                reactContext.runOnNativeModulesQueueThread(
                    object : GuardedRunnable(reactContext) {
                        override fun runGuarded() {
                            reactContext.reactApplicationContext
                                .getNativeModule(UIManagerModule::class.java)
                                ?.updateNodeSize(id, widthDip.roundToInt(), heightDip.roundToInt())
                        }
                    })
            }

            view.show()
        }
    }
}
