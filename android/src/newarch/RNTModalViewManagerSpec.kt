package com.multiplemodals

import android.view.ViewGroup

import com.facebook.react.uimanager.ViewGroupManager
import com.facebook.react.uimanager.ViewManagerDelegate
import com.facebook.react.viewmanagers.RNTModalViewManagerDelegate
import com.facebook.react.viewmanagers.RNTModalViewManagerInterface

abstract class RNTModalViewManagerSpec<T : ViewGroup> : ViewGroupManager<T>(), RNTModalViewManagerInterface<T> {
  private val mDelegate: ViewManagerDelegate<T>

  init {
    mDelegate = RNTModalViewManagerDelegate(this)
  }

  override fun getDelegate(): ViewManagerDelegate<T>? {
    return mDelegate
  }
}
