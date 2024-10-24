package com.multiplemodals.events

import com.facebook.react.uimanager.events.Event
 
class PressBackEvent(surfaceId: Int, viewTag: Int) : Event<PressBackEvent>(surfaceId, viewTag) {
    companion object {
        const val NAME = "pressBack"
        const val REGISTRATION_NAME = "onPressBackAndroid"
    }

    override fun getEventName(): String {
        return NAME
    }
}