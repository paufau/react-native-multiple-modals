import React

class ModalShadowView: RCTShadowView {
    override func insertReactSubview(_ subview: RCTShadowView!, at atIndex: Int) {
        super.insertReactSubview(subview, at: atIndex)
        subview.size = RCTScreenSize()
    }
}
