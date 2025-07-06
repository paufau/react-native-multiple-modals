#import <React/RCTBridge.h>
#import <React/RCTUIManager.h>
#import <React/RCTTouchHandler.h>
#import <UIKit/UIKit.h>
#import "RNTModalViewController.h"
#import "RNTModalVIew.h"
#import "RNTModalMountingHelper.h"

@implementation RNTModalView

- (instancetype)initWithBridge:(RCTBridge *)bridge {
    self = [super initWithFrame:CGRectZero];
    
    if (self) {
        self.bridge = bridge;
        self.touchHandler = [[RCTTouchHandler alloc] initWithBridge:bridge];
        self.modalViewController = [[RNTModalViewController alloc] initWithDelegate:self];
        self.mountingHelper = [[RNTModalMountingHelper alloc] initWithViewController:self.modalViewController];
    }
    return self;
}

RCT_NOT_IMPLEMENTED(-(instancetype)initWithCoder : coder)

- (void)layoutSubviews {
    [super layoutSubviews];
    [self.mountingHelper mountIfNeeded];
}

- (void)insertReactSubview:(UIView *)subview atIndex:(NSInteger)atIndex {
    RCTAssert(_reactSubview == nil, @"[RNTModalView]: can only have one react subview");
    
    [super insertReactSubview:subview atIndex:atIndex];
    [self.mountingHelper updateChildrenTransaction:^{
        [self.touchHandler attachToView:subview];
        [self.modalViewController addReactSubview:subview];
        self.reactSubview = subview;
    }];
}

- (void)removeReactSubview:(UIView *)subview
{
    RCTAssert(subview == _reactSubview, @"[RNTModalView]: cannot remove view other than react subview");
    
    [super removeReactSubview:subview];
    dispatch_async(dispatch_get_main_queue(), ^{
        [self.touchHandler detachFromView:subview];
        [self.mountingHelper unmountIfNeeded];
        [subview removeFromSuperview];
        self.reactSubview = nil;
        self.modalViewController = nil;
        self.mountingHelper = nil;
    });
}

- (void)invalidate {
    [self.mountingHelper unmountIfNeeded];
}

- (void) didSetProps: (NSArray<NSString*>*)changedProps {
    [self.mountingHelper updatePropsTransaction:^{
        [self.modalViewController setAnimationType:self.animationType];
    }];
}

#pragma mark - RNTModalViewControllerDelegate

- (void)boundsDidChange:(CGRect)newBounds {
    [self.bridge.uiManager setSize:newBounds.size forView:self.reactSubview];
}

@end
