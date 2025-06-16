package com.multiplemodals

import com.facebook.react.uimanager.LayoutShadowNode
import com.facebook.react.uimanager.ReactShadowNodeImpl
import com.facebook.react.uimanager.annotations.ReactProp
import com.multiplemodals.library.ModalHostHelper

internal class RNTModalShadowView : LayoutShadowNode() {
    private var statusBarTranslucent: Boolean = false

    @ReactProp(name = "statusBarTranslucent")
    fun setStatusBarTranslucent(
        statusBarTranslucent: Boolean
    ) {
        this.statusBarTranslucent = statusBarTranslucent
        markUpdated()
    }

    override fun addChildAt(child: ReactShadowNodeImpl, i: Int) {
        super.addChildAt(child, i)
        val modalSize = ModalHostHelper.getModalHostSize(themedContext, statusBarTranslucent)
        setStyleWidth(modalSize.x.toFloat())
        setStyleHeight(modalSize.y.toFloat())
    }
}