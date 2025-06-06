package com.multiplemodals

import android.view.ViewGroup
import com.facebook.react.uimanager.UIManagerModule
import com.facebook.react.uimanager.ViewGroupManager
import com.multiplemodals.library.OnSizeComputedListener

abstract class RNTModalViewManagerSpec<T : ViewGroup> : ViewGroupManager<T>() {
    private fun setViewSize(view: RNTModalView, widthPx: Int, heightPx: Int) {
        val reactContext = view.reactContext

        reactContext.runOnNativeModulesQueueThread {
            reactContext.reactApplicationContext
                .getNativeModule(UIManagerModule::class.java).let { uiManager ->
                    uiManager?.updateNodeSize(view.id, widthPx, heightPx)
                }
        }
    }

    open fun setStatusBarTranslucent(
        view: RNTModalView,
        statusBarTranslucent: Boolean
    ) {
        throw Exception("Not implemented (override in the view manager)")
    }

    open fun setStatusBarIconsStyle(
        view: RNTModalView,
        statusBarIconsStyle: String?
    ) {
        throw Exception("Not implemented (override in the view manager)")
    }

    open fun setAnimationType(
        view: RNTModalView,
        animationType: String?
    ) {
        throw Exception("Not implemented (override in the view manager)")
    }

    override fun onAfterUpdateTransaction(view: T) {
        super.onAfterUpdateTransaction(view)

        if (view is RNTModalView) {
            view.isShadowViewSizeSet = true

            view.onSizeComputedListener = OnSizeComputedListener { widthPx, heightPx ->
                setViewSize(view, widthPx, heightPx)
            }

            view.show()
        }
    }
}
