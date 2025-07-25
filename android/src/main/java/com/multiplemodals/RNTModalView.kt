package com.multiplemodals

import android.app.Activity
import android.content.Context
import android.content.DialogInterface
import android.view.KeyEvent
import android.view.View
import android.view.ViewGroup
import android.view.ViewStructure
import android.view.accessibility.AccessibilityEvent
import com.facebook.react.bridge.LifecycleEventListener
import com.facebook.react.bridge.UiThreadUtil
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.UIManagerHelper
import com.facebook.react.uimanager.events.EventDispatcher
import com.facebook.react.uimanager.DisplayMetricsHolder
import com.facebook.react.uimanager.PixelUtil
import com.multiplemodals.events.PressBackEvent
import com.multiplemodals.library.ModalDialog
import com.multiplemodals.library.ModalView
import com.multiplemodals.library.OnSizeComputedListener
import com.facebook.yoga.annotations.DoNotStrip

class RNTModalView(context: Context): ViewGroup(context), LifecycleEventListener {
    companion object {
        const val REACT_CLASS: String = "RNTModalView"
        const val DEFAULT_STATUS_BAR_ICONS_STYLE = "default"
        const val STATUS_BAR_DARK_ICONS_STYLE = "dark-content"

        @JvmStatic
        @DoNotStrip
        private fun getScreenDisplayMetricsWithoutInsets(): Long {
            val displayMetrics = DisplayMetricsHolder.getScreenDisplayMetrics()
            return encodeFloatsToLong(
                PixelUtil.toDIPFromPixel(displayMetrics.widthPixels.toFloat()),
                PixelUtil.toDIPFromPixel(displayMetrics.heightPixels.toFloat())
            )
        }

        private fun encodeFloatsToLong(width: Float, height: Float): Long =
            (width.toRawBits().toLong()) shl 32 or (height.toRawBits().toLong())
    }

    var onSizeComputedListener: OnSizeComputedListener?
        get() = modalView.onSizeComputedListener
        set(value) {
            modalView.onSizeComputedListener = value
        }

    private val surfaceId: Int get() = UIManagerHelper.getSurfaceId(this)

    internal val reactContext: ThemedReactContext get() = context as ThemedReactContext
    private val eventDispatcher: EventDispatcher
    private var modalDialog: ModalDialog? = null
    private val modalView: ModalView

    private var wasShown = false
    internal var isShadowViewSizeSet = false
    internal var statusBarTranslucent: Boolean = false
    internal var statusBarIconsStyle: String = DEFAULT_STATUS_BAR_ICONS_STYLE
    internal var animationType: String = "none"

    init {
        this.reactContext.addLifecycleEventListener(this)
        val maybeEventDispatcher = UIManagerHelper.getEventDispatcherForReactTag(reactContext, id);

        if (maybeEventDispatcher is EventDispatcher) {
            eventDispatcher = maybeEventDispatcher;

            modalView = ModalView(reactContext, eventDispatcher)
        } else {
            throw Exception("Unable to initialize react native event dispatcher");
        }
    }

    fun show() {
        if (wasShown || !isShadowViewSizeSet) {
            return
        }

        UiThreadUtil.assertOnUiThread()

        val dialogStyle: Int =
            when (animationType) {
                "fade" -> R.style.Theme_FullScreenDialogAnimatedFade
                "slide" -> R.style.Theme_FullScreenDialogAnimatedSlide
                else -> R.style.Theme_FullScreenDialog
            }

        modalDialog = ModalDialog(reactContext, dialogStyle)

        modalDialog?.apply {
            attachBackHandler(this)
            setStatusBarTranslucency(statusBarTranslucent)
            if (statusBarIconsStyle == DEFAULT_STATUS_BAR_ICONS_STYLE) {
                val inheritFromActivity = reactContext.currentActivity
                if (inheritFromActivity != null) {
                    inheritStatusBarFromWindow(inheritFromActivity.window)
                }
            } else {
                setStatusBarDarkIcons(statusBarIconsStyle == STATUS_BAR_DARK_ICONS_STYLE)
            }
            addContent(modalView)
            show()
        }

        wasShown = true
    }

    private fun dismiss() {
        UiThreadUtil.assertOnUiThread()

        reactContext.removeLifecycleEventListener(this)

        // Should be called before 'modalDialog.dismiss' to ensure reanimated children are removed correctly
        modalView.removeAllViews()

        modalDialog?.dismiss()
    }

    private fun attachBackHandler(dialog: ModalDialog) {
        // Prevent closing from native part as this is handled by JS
        dialog.setOnKeyListener(object : DialogInterface.OnKeyListener {
            override fun onKey(dialog: DialogInterface, keyCode: Int, event: KeyEvent): Boolean {
                if (event.action != KeyEvent.ACTION_UP) {
                    return false
                }

                // Handle event
                if (keyCode == KeyEvent.KEYCODE_BACK || keyCode == KeyEvent.KEYCODE_ESCAPE) {
                    UiThreadUtil.runOnUiThread {
                        eventDispatcher.dispatchEvent(PressBackEvent(surfaceId, id))
                    }
                    return true
                }

                // Bubble the event up
                val innerCurrentActivity = reactContext.currentActivity
                if (innerCurrentActivity != null) {
                    return innerCurrentActivity.onKeyUp(keyCode, event)
                }

                return false
            }
        })
    }

    // Child management

    override fun addView(subview: View, atIndex: Int) {
        UiThreadUtil.assertOnUiThread()

        if (atIndex > 0) {
            throw Exception("Only one subview expected (at index 0)")
        }

        modalView.addView(subview, atIndex)
    }

    override fun getChildCount(): Int {
        return modalView.childCount
    }

    override fun getChildAt(index: Int): View {
        return modalView.getChildAt(index)
    }

    override fun removeView(view: View?) {
        UiThreadUtil.assertOnUiThread()
        modalView.removeView(view)
    }

    override fun removeViewAt(index: Int) {
        UiThreadUtil.assertOnUiThread()
        modalView.removeViewAt(index)
    }

    override fun removeAllViews() {
        dismiss()
    }

    // Layout

    override fun dispatchProvideStructure(structure: ViewStructure) {
        modalView.dispatchProvideStructure(structure)
    }

    override fun onAttachedToWindow() {
        super.onAttachedToWindow()
        reactContext.addLifecycleEventListener(this)
    }

    override fun onDetachedFromWindow() {
        super.onDetachedFromWindow()
        dismiss()
    }

    override fun onLayout(p0: Boolean, p1: Int, p2: Int, p3: Int, p4: Int) {
        // Handled by Yoga
    }

    override fun onHostDestroy() {
        dismiss()
    }

    override fun onHostPause() {
        // do nothing
    }

    override fun onHostResume() {
        // do nothing
    }

    // Accessibility

    override fun addChildrenForAccessibility(outChildren: ArrayList<View>) {
        // Explicitly override this to prevent accessibility events being passed down to children
        // Those will be handled by the rootView which lives in the dialog
    }

    override fun dispatchPopulateAccessibilityEvent(event: AccessibilityEvent): Boolean {
        // Explicitly override this to prevent accessibility events being passed down to children
        // Those will be handled by the rootView which lives in the dialog
        return false
    }
}