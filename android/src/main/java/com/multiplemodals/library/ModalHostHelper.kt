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

    @SuppressLint("InternalInsetResource")
    fun getModalHostSize(context: Context): Point {
        val wm = context.getSystemService(Context.WINDOW_SERVICE) as WindowManager
        val display = Assertions.assertNotNull(wm).defaultDisplay
        // getCurrentSizeRange will return the min and max width and height that the window can be
        display.getCurrentSizeRange(MIN_POINT, MAX_POINT)
        // getSize will return the dimensions of the screen in its current orientation
        display.getSize(SIZE_POINT)

        val attrs = intArrayOf(R.attr.windowFullscreen)
        val theme = context.theme
        val ta = theme.obtainStyledAttributes(attrs)
        val windowFullscreen = ta.getBoolean(0, false)

        // We need to add the status bar height to the height if we have a fullscreen window,
        // because Display.getCurrentSizeRange doesn't include it.
        val resources = context.resources
        val statusBarId = resources.getIdentifier("status_bar_height", "dimen", "android")
        var statusBarHeight = 0
        if (windowFullscreen && statusBarId > 0) {
            statusBarHeight = resources.getDimension(statusBarId).toInt()
        }

        return if (SIZE_POINT.x < SIZE_POINT.y) {
            // If we are vertical the width value comes from min width and height comes from max height
            Point(MIN_POINT.x, MAX_POINT.y + statusBarHeight)
        } else {
            // If we are horizontal the width value comes from max width and height comes from min height
            Point(MAX_POINT.x, MIN_POINT.y + statusBarHeight)
        }
    }
}