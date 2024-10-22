#import <React/RCTBridge.h>
#import <React/RCTUIManager.h>
#import <React/RCTTouchHandler.h>
#import <UIKit/UIKit.h>
#import "RNTModalViewController.h"
#import "RNTModalVIew.h"

@implementation RNTModalView

- (instancetype)initWithBridge:(RCTBridge *)bridge {
    self = [super initWithFrame:CGRectZero];
    if (self) {
        _uiManager = bridge.uiManager;
        _touchHandler = [[RCTTouchHandler alloc] initWithBridge:bridge];
        _modalViewController = [[RNTModalViewController alloc] init];
        _isMounted = NO;
    }
    return self;
}

- (void)layoutSubviews {
    [super layoutSubviews];
    [self setupIfNeeded];
}

- (void)insertReactSubview:(UIView *)subview atIndex:(NSInteger)atIndex {
    [super insertReactSubview:subview atIndex:atIndex];
    dispatch_async(dispatch_get_main_queue(), ^{
        [self.touchHandler attachToView:subview];
        [self.modalViewController addReactSubview:subview];
    });
}

- (void)removeReactSubview:(UIView *)subview
{
    [super removeReactSubview:subview];
    [_touchHandler detachFromView:subview];
    [subview removeFromSuperview];
}

- (void)setupIfNeeded {
    if (self.isMounted) {
        [self update];
    } else {
        [self mount];
    }
}

- (void)mount {
    UIViewController *rvc = [self reactViewController];
    if (!rvc) {
        NSLog(@"reactViewController not found");
        return;
    }
    
    [self.modalViewController presentOn:rvc onView:rvc.view];
    self.isMounted = YES;
}

- (void)unmount {
    [self.modalViewController dismiss];
    self.modalViewController = nil;
    self.isMounted = NO;
}

- (void)update {
    // No actions required
}

- (void)invalidate {
    [self unmount];
}

@end
