package com.multiplemodals.library

import android.annotation.SuppressLint
import android.view.MotionEvent
import android.view.View
import androidx.annotation.UiThread
import com.facebook.react.bridge.GuardedRunnable
import com.facebook.react.bridge.WritableMap
import com.facebook.react.bridge.WritableNativeMap
import com.facebook.react.config.ReactFeatureFlags
import com.facebook.react.uimanager.JSPointerDispatcher
import com.facebook.react.uimanager.JSTouchDispatcher
import com.facebook.react.uimanager.PixelUtil
import com.facebook.react.uimanager.RootView
import com.facebook.react.uimanager.StateWrapper
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.UIManagerModule
import com.facebook.react.uimanager.events.EventDispatcher
import com.facebook.react.views.view.ReactViewGroup

@SuppressLint("ViewConstructor")
class ModalView(private val reactContext: ThemedReactContext,
                private val eventDispatcher: EventDispatcher): ReactViewGroup(reactContext), RootView {
    private val jSTouchDispatcher = JSTouchDispatcher(this)
    private var jSPointerDispatcher: JSPointerDispatcher? = null
    private var viewWidth = 0
    private var viewHeight = 0
    internal var stateWrapper: StateWrapper? = null

    init {
        if (ReactFeatureFlags.dispatchPointerEvents) {
            this.jSPointerDispatcher = JSPointerDispatcher(this)
        }
    }

    override fun onSizeChanged(w: Int, h: Int, oldw: Int, oldh: Int) {
        super.onSizeChanged(w, h, oldw, oldh)
        viewWidth = w
        viewHeight = h

        updateState(viewWidth, viewHeight)
    }

    @UiThread
    public fun updateState(width: Int, height: Int) {
        val realWidth: Float = PixelUtil.toDIPFromPixel(width.toFloat())
        val realHeight: Float = PixelUtil.toDIPFromPixel(height.toFloat())

        // TODO splint into different files
        stateWrapper?.let { sw ->
            // new architecture
            val newStateData: WritableMap = WritableNativeMap()
            newStateData.putDouble("screenWidth", realWidth.toDouble())
            newStateData.putDouble("screenHeight", realHeight.toDouble())
            sw.updateState(newStateData)
        }
            ?: run {
                // old architecture
                reactContext.runOnNativeModulesQueueThread(
                    object : GuardedRunnable(reactContext) {
                        override fun runGuarded() {
                            reactContext.reactApplicationContext
                                .getNativeModule(UIManagerModule::class.java)
                                ?.updateNodeSize(id, viewWidth, viewHeight)
                        }
                    })
            }
    }

    override fun handleException(exception: Throwable?) {
        val reactContext = context as ThemedReactContext
        reactContext.reactApplicationContext.handleException(RuntimeException(exception))
    }

    // React overrides to make touches work

    override fun onInterceptTouchEvent(ev: MotionEvent): Boolean {
        jSTouchDispatcher.handleTouchEvent(ev, eventDispatcher)
        jSPointerDispatcher?.handleMotionEvent(ev, eventDispatcher, false)
        return super.onInterceptTouchEvent(ev)
    }

    @SuppressLint("ClickableViewAccessibility")
    override fun onTouchEvent(ev: MotionEvent): Boolean {
        jSTouchDispatcher.handleTouchEvent(ev, eventDispatcher)
        jSPointerDispatcher?.handleMotionEvent(ev, eventDispatcher, false)
        super.onTouchEvent(ev)
        return true
    }

    @Deprecated("Deprecated in Java")
    override fun onChildStartedNativeGesture(ev: MotionEvent) {
        this.jSTouchDispatcher.onChildStartedNativeGesture(ev, eventDispatcher)
    }

    override fun onChildStartedNativeGesture(childView: View, ev: MotionEvent) {
        this.jSTouchDispatcher.onChildStartedNativeGesture(ev, eventDispatcher)
        this.jSPointerDispatcher?.onChildStartedNativeGesture(childView, ev, eventDispatcher)
    }

    override fun onChildEndedNativeGesture(childView: View, ev: MotionEvent) {
        this.jSTouchDispatcher.onChildEndedNativeGesture(ev, eventDispatcher)
        this.jSPointerDispatcher?.onChildEndedNativeGesture()
    }

    override fun requestDisallowInterceptTouchEvent(disallowIntercept: Boolean) {
        // No-op - override in order to still receive events to onInterceptTouchEvent
        // even when some other view disallow that
    }
}