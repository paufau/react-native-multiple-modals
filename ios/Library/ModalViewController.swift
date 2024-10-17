import UIKit

protocol ModalViewControllerProtocol {
    func present(on parentVC: UIViewController, onView parentView: UIView)
    func dismiss()
    func addReactSubview(_ view: UIView)
}

final class ModalViewController: UIViewController {
    private var reactSubviewContainer = UIView()
    private var contentView = UIView()
    
    init() {
        super.init(nibName: nil, bundle: nil)
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    override func viewDidLoad() {
        self.view.addSubview(reactSubviewContainer)
        
        self.reactSubviewContainer.translatesAutoresizingMaskIntoConstraints = false
        
        NSLayoutConstraint.activate([
            self.reactSubviewContainer.topAnchor.constraint(equalTo: self.view.topAnchor),
            self.reactSubviewContainer.bottomAnchor.constraint(equalTo: self.view.bottomAnchor),
            self.reactSubviewContainer.leadingAnchor.constraint(equalTo: self.view.leadingAnchor),
            self.reactSubviewContainer.trailingAnchor.constraint(equalTo: self.view.trailingAnchor),
        ])
    }
}

extension ModalViewController: ModalViewControllerProtocol {
    func present(on parentVC: UIViewController, onView parentView: UIView) {
        self.modalPresentationStyle = .custom
        self.view.accessibilityViewIsModal = true
        
        self.willMove(toParent: parentVC)
        parentVC.addChild(self)
        parentView.addSubview(self.view)
        self.didMove(toParent: parentVC)
    }
    
    func dismiss() {
        self.willMove(toParent: nil)
        self.view.removeFromSuperview()
        self.removeFromParent()
    }
    
    func addReactSubview(_ view: UIView) {
        self.reactSubviewContainer.addSubview(view)
    }
}
