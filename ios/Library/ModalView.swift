import React
import UIKit

final class ModalView: UIView {
    let uiManager: RCTUIManager
    let touchHandler: RCTTouchHandler
    
    var modalViewController: ModalViewController?
    var isMounted = false
    
    init(bridge: RCTBridge) {
        self.uiManager = bridge.uiManager
        self.touchHandler = RCTTouchHandler(bridge: bridge)
        self.modalViewController = ModalViewController()
        super.init(frame: .zero)
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    override func layoutSubviews() {
        super.layoutSubviews()
        self.setupIfNeeded()
    }
    
    // React Native views
    
    override func insertReactSubview(_ subview: UIView!, at atIndex: Int) {
        self.touchHandler.attach(to: subview)
        
        if (atIndex == 0) {
            self.modalViewController?.addReactSubview(subview)
            UIAccessibility.post(notification: .screenChanged, argument: subview)
        }
    }
    
    // React lifecycle
    
    func setupIfNeeded() {
        if self.isMounted {
            self.update()
        } else {
            self.mount()
        }
    }
    
    func mount() {
        guard let rvc = self.reactViewController() else {
            print("reactViewController not found")
            return
        }
        
        self.modalViewController?.present(on: rvc, onView: rvc.view)
        
        self.isMounted = true
    }
    
    func unmount() {
        self.modalViewController?.dismiss()
        self.modalViewController = nil
        self.isMounted = false
        UIAccessibility.post(notification: .screenChanged, argument: null)
    }
    
    func update() {
        // No actions required
    }
}

extension ModalView: RCTInvalidating {
    func invalidate() {
        self.unmount()
    }
}
