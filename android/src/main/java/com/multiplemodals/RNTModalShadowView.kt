package com.multiplemodals

import com.facebook.react.uimanager.LayoutShadowNode
import com.facebook.react.uimanager.ReactShadowNodeImpl
import com.multiplemodals.library.ModalHostHelper

internal class RNTModalShadowView : LayoutShadowNode() {
    override fun addChildAt(child: ReactShadowNodeImpl, i: Int) {
        super.addChildAt(child, i)
        val modalSize = ModalHostHelper.getModalHostSize(themedContext, false)
        child.setStyleWidth(modalSize.x.toFloat())
        child.setStyleHeight(modalSize.y.toFloat())
    }
}