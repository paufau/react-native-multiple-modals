package com.multiplemodals

import android.content.Context
import android.view.View
import android.view.ViewGroup
import android.view.accessibility.AccessibilityEvent
import com.facebook.react.R
import com.facebook.react.bridge.LifecycleEventListener
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.UIManagerHelper
import com.facebook.react.uimanager.events.EventDispatcher
import com.multiplemodals.library.ModalDialog
import com.multiplemodals.library.ModalView

class RNTModalView(context: Context): ViewGroup(context), LifecycleEventListener {
    companion object {
        const val REACT_CLASS: String = "RNTModalView"
    }

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
        } else {
            throw Exception("Unable to initialize react native event dispatcher");
        }
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
        modalView.removeAllViews()
    }

    // Layout

    override fun onDetachedFromWindow() {
        super.onDetachedFromWindow()
        modalDialog.dismiss()
    }

    override fun onLayout(p0: Boolean, p1: Int, p2: Int, p3: Int, p4: Int) {
        // Handled by Yoga
    }

    override fun onHostDestroy() {
        reactContext.removeLifecycleEventListener(this)
        modalDialog.dismiss()
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