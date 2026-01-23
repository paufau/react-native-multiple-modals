package com.multiplemodals.library

import android.R
import android.annotation.SuppressLint
import android.content.Context
import android.graphics.Point
import android.view.WindowManager
import com.facebook.infer.annotation.Assertions

internal object ModalHostHelper {
    private val MIN_POINT = Point()
    private val MAX_POINT = Point()
    private val SIZE_POINT = Point()

    @SuppressLint("InternalInsetResource", "DiscouragedApi")
    fun getModalHostSize(context: Context, includeStatusBar: Boolean): Point {
        val wm = context.getSystemService(Context.WINDOW_SERVICE) as WindowManager
        val display = Assertions.assertNotNull(wm).defaultDisplay
        
        display.getRealSize(SIZE_POINT)
        
        return SIZE_POINT
    }
}