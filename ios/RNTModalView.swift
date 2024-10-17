import React

@objc(RNTModalView)
class RNTModalView: RCTViewManager {
    override func view() -> ModalView {
        return ModalView(bridge: self.bridge)
    }
    
    override func shadowView() -> RCTShadowView! {
        return ModalShadowView() 
    }
    
    @objc
    override static func requiresMainQueueSetup() -> Bool {
        return true
    }
}
