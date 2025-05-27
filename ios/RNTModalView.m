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
        _touchHandler = [[RCTTouchHandler alloc] initWithBridge:bridge];
        _modalViewController = [[RNTModalViewController alloc] init];
        _mountingHelper = [[RNTModalMountingHelper alloc] initWithViewController:_modalViewController];
    }
    return self;
}

RCT_NOT_IMPLEMENTED(-(instancetype)initWithCoder : coder)

- (void)layoutSubviews {
    [super layoutSubviews];
    [self.mountingHelper mountIfNeeded];
}

- (void)addSubview:(UIView *)view {
    [super addSubview:view];
}

- (void)insertReactSubview:(UIView *)subview atIndex:(NSInteger)atIndex {
    [super insertReactSubview:subview atIndex:atIndex];
    [self.mountingHelper updateChildrenTransaction:^{
        [self.touchHandler attachToView:subview];
        [self.modalViewController addReactSubview:subview];
    }];
}

- (void)removeReactSubview:(UIView *)subview
{
    [super removeReactSubview:subview];
    dispatch_async(dispatch_get_main_queue(), ^{
        [self.touchHandler detachFromView:subview];
        [self.mountingHelper unmountIfNeeded];
        [subview removeFromSuperview];
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

// Props

- (void)setAnimationType:(NSString *)animationType
{
    _animationType = animationType;
}

@end
