package com.multiplemodals.library

import android.app.Dialog
import android.os.Bundle
import android.view.WindowManager.LayoutParams
import com.facebook.react.uimanager.ThemedReactContext

class ModalDialog(reactContext: ThemedReactContext, themeId: Int) : Dialog(reactContext, themeId) {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        window?.apply {
            // Makes dialog background opaque
            clearFlags(LayoutParams.FLAG_DIM_BEHIND)
        }
    }

    fun addContent(view: ModalView) {
        setContentView(view)
    }
}