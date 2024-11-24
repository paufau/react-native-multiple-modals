package com.multiplemodals

import android.view.ViewGroup
import com.facebook.react.bridge.GuardedRunnable
import com.facebook.react.uimanager.UIManagerModule
import com.facebook.react.uimanager.ViewGroupManager
import com.multiplemodals.library.OnSizeComputedListener

abstract class RNTModalViewManagerSpec<T : ViewGroup> : ViewGroupManager<T>() {
    override fun onAfterUpdateTransaction(view: T) {
        super.onAfterUpdateTransaction(view)

        if (view is RNTModalView) {
            // set by RNTModalShadowView for paper arch
            view.isShadowViewSizeSet = true

            view.onSizeComputedListener = OnSizeComputedListener { widthPx, heightPx ->
                val reactContext = view.reactContext

                reactContext.runOnNativeModulesQueueThread(
                    object : GuardedRunnable(reactContext) {
                        override fun runGuarded() {
                            reactContext.reactApplicationContext
                                .getNativeModule(UIManagerModule::class.java)
                                ?.updateNodeSize(view.id, widthPx, heightPx)
                        }
                    })
            }

            view.show()
        }
    }
}
