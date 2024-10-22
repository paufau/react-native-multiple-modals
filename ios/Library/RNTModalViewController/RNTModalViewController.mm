#import <UIKit/UIKit.h>
#import "RNTModalViewController.h"

@implementation RNTModalViewController

- (instancetype)init {
    self = [super initWithNibName:nil bundle:nil];
    if (self) {
        _reactSubviewContainer = [[UIView alloc] init];
    }
    return self;
}

- (instancetype)initWithCoder:(NSCoder *)coder {
    [NSException raise:@"initWithCoder" format:@"init(coder:) has not been implemented"];
    return nil;
}

- (void)viewDidLoad {
    [super viewDidLoad];
    
    [self.view addSubview:self.reactSubviewContainer];
    self.reactSubviewContainer.translatesAutoresizingMaskIntoConstraints = NO;
    
    [NSLayoutConstraint activateConstraints:@[
        [self.reactSubviewContainer.topAnchor constraintEqualToAnchor:self.view.topAnchor],
        [self.reactSubviewContainer.bottomAnchor constraintEqualToAnchor:self.view.bottomAnchor],
        [self.reactSubviewContainer.leadingAnchor constraintEqualToAnchor:self.view.leadingAnchor],
        [self.reactSubviewContainer.trailingAnchor constraintEqualToAnchor:self.view.trailingAnchor]
    ]];
}

#pragma mark - ModalViewControllerProtocol

- (void)presentOn:(UIViewController *)parentVC onView:(UIView *)parentView {
    self.modalPresentationStyle = UIModalPresentationCustom;
    self.view.accessibilityViewIsModal = YES;
    
    [self willMoveToParentViewController:parentVC];
    [parentVC addChildViewController:self];
    [parentView addSubview:self.view];
    [self didMoveToParentViewController:parentVC];
}

- (void)dismiss {
    [self willMoveToParentViewController:nil];
    [self.view removeFromSuperview];
    [self removeFromParentViewController];
}

- (void)addReactSubview:(UIView *)view {
    [self.reactSubviewContainer addSubview:view];
}

@end
