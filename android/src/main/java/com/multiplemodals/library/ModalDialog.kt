package com.multiplemodals.library

import android.app.Dialog
import android.os.Bundle
import android.view.WindowManager.LayoutParams
import com.facebook.react.uimanager.ThemedReactContext

class ModalDialog(private val reactContext: ThemedReactContext, themeId: Int) : Dialog(reactContext, themeId) {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        window?.apply {
            // Removes dialog's paddings
            setFlags(LayoutParams.FLAG_LAYOUT_NO_LIMITS, LayoutParams.FLAG_LAYOUT_NO_LIMITS)

            // Makes the dialog view fullscreen
            setLayout(LayoutParams.MATCH_PARENT, LayoutParams.MATCH_PARENT)

            attributes = attributes.apply {
                // Disables the view resizing when keyboard is opened
                type = LayoutParams.TYPE_APPLICATION_PANEL
            }

            // Makes dialog background opaque
            clearFlags(LayoutParams.FLAG_DIM_BEHIND)
        }
    }

    fun addContent(view: ModalView) {
        setContentView(view)
    }
}