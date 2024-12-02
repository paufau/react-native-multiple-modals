package com.multiplemodals.library

import android.app.Activity
import android.app.Dialog
import android.os.Build
import android.os.Bundle
import android.view.View
import android.view.WindowInsetsController
import android.view.WindowManager.LayoutParams
import androidx.core.view.ViewCompat
import com.facebook.react.uimanager.ThemedReactContext

@Suppress("DEPRECATION")
class ModalDialog(reactContext: ThemedReactContext, themeId: Int) : Dialog(reactContext, themeId) {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        window?.apply {
            // TODO move under a flag or remove at all
            
            // Removes dialog's paddings
            // setFlags(LayoutParams.FLAG_LAYOUT_NO_LIMITS, LayoutParams.FLAG_LAYOUT_NO_LIMITS)

            // // Makes the dialog view fullscreen
            // setLayout(LayoutParams.MATCH_PARENT, LayoutParams.MATCH_PARENT)

            // attributes = attributes.apply {
            //     // Disables the view resizing when keyboard is opened
            //     type = LayoutParams.TYPE_APPLICATION_PANEL
            // }

            // Makes dialog background opaque
            clearFlags(LayoutParams.FLAG_DIM_BEHIND)

            setSoftInputMode(LayoutParams.SOFT_INPUT_ADJUST_RESIZE)
        }
    }

    fun addContent(view: View) {
        setContentView(view)
    }

    fun setStatusBarTranslucency(isTranslucent: Boolean) {
        window?.apply {
            if (isTranslucent) {
                decorView.setOnApplyWindowInsetsListener { v, insets ->
                    val defaultInsets = v.onApplyWindowInsets(insets)
                    defaultInsets.replaceSystemWindowInsets(
                        defaultInsets.systemWindowInsetLeft,
                        0,
                        defaultInsets.systemWindowInsetRight,
                        defaultInsets.systemWindowInsetBottom)
                }
            } else {
                decorView.setOnApplyWindowInsetsListener(null)
            }
            ViewCompat.requestApplyInsets(decorView)
        }
    }

    fun syncStatusBarAppearance(withActivity: Activity) {
        window?.apply {
            if (Build.VERSION.SDK_INT > Build.VERSION_CODES.R) {
                val insetsController: WindowInsetsController =
                    checkNotNull(withActivity.window.insetsController)
                val activityAppearance: Int = insetsController.systemBarsAppearance

                val activityLightStatusBars =
                    activityAppearance and WindowInsetsController.APPEARANCE_LIGHT_STATUS_BARS

                insetsController.setSystemBarsAppearance(
                    activityLightStatusBars, WindowInsetsController.APPEARANCE_LIGHT_STATUS_BARS
                )
            } else {
                decorView.systemUiVisibility = withActivity.window.decorView.systemUiVisibility
            }
        }
    }
}