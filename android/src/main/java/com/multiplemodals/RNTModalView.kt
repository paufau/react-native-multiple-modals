package com.multiplemodals

import android.content.Context
import android.content.DialogInterface
import android.view.KeyEvent
import android.view.View
import android.view.ViewGroup
import android.view.accessibility.AccessibilityEvent
import com.facebook.react.bridge.LifecycleEventListener
import com.facebook.react.bridge.UiThreadUtil
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.UIManagerHelper
import com.facebook.react.uimanager.events.EventDispatcher
import com.multiplemodals.events.PressBackEvent
import com.multiplemodals.library.ModalDialog
import com.multiplemodals.library.ModalView

class RNTModalView(context: Context): ViewGroup(context), LifecycleEventListener {
    companion object {
        const val REACT_CLASS: String = "RNTModalView"
    }

    private val surfaceId: Int get() = UIManagerHelper.getSurfaceId(this)

    private val reactContext: ThemedReactContext get() = context as ThemedReactContext
    private val eventDispatcher: EventDispatcher
    private val modalDialog: ModalDialog
    private val modalView: ModalView

    init {
        this.reactContext.addLifecycleEventListener(this)
        val maybeEventDispatcher = UIManagerHelper.getEventDispatcherForReactTag(reactContext, id);

        if (maybeEventDispatcher is EventDispatcher) {
            eventDispatcher = maybeEventDispatcher;

            modalDialog = ModalDialog(reactContext, R.style.Theme_FullScreenDialog)
            modalView = ModalView(reactContext, eventDispatcher)

            attackBackHandler()
        } else {
            throw Exception("Unable to initialize react native event dispatcher");
        }
    }

    fun dismiss() {
        reactContext.removeLifecycleEventListener(this)

        // Should be call before 'modalDialog.dismiss' to ensure reanimated children are removed correctly
        modalView.removeAllViews()

        modalDialog.dismiss()
    }

    private fun attackBackHandler() {
        // Prevent closing from native part as this is handled by JS
        modalDialog.setOnKeyListener(object : DialogInterface.OnKeyListener {
            override fun onKey(dialog: DialogInterface, keyCode: Int, event: KeyEvent): Boolean {
                if (event.action == KeyEvent.ACTION_UP) {
                    if (keyCode == KeyEvent.KEYCODE_BACK || keyCode == KeyEvent.KEYCODE_ESCAPE) {
                        UiThreadUtil.runOnUiThread {
                            eventDispatcher.dispatchEvent(PressBackEvent(surfaceId, id))
                        }

                        return true
                    } else {
                        // Bubble the event up
                        val innerCurrentActivity = reactContext.currentActivity
                        if (innerCurrentActivity != null) {
                            return innerCurrentActivity.onKeyUp(keyCode, event)
                        }
                    }
                }
                return false
            }
        })
    }

    // Child management

    override fun addView(subview: View, atIndex: Int) {
        if (atIndex > 0) {
            throw Exception("Only one subview expected (at index 0)")
        }

        modalView.addView(subview, atIndex)
        modalDialog.addContent(modalView)
        modalDialog.show()
    }

    override fun getChildCount(): Int {
        return modalView.childCount
    }

    override fun getChildAt(index: Int): View {
        return modalView.getChildAt(index)
    }

    override fun removeView(view: View?) {
        modalView.removeView(view)
    }

    override fun removeViewAt(index: Int) {
        modalView.removeViewAt(index)
    }

    override fun removeAllViews() {
        super.removeAllViews()
        dismiss()
    }

    // Layout

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