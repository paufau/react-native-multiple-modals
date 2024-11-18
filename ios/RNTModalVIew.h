#ifndef RNTModalVIew_h
#define RNTModalVIew_h

#import <React/RCTBridge.h>
#import <React/RCTUIManager.h>
#import <React/RCTTouchHandler.h>
#import <UIKit/UIKit.h>
#import "RNTModalViewController.h"

// #ifdef RCT_NEW_ARCH_ENABLED
// #import <React/RCTViewComponentView.h>
// #import <React/RCTSurfaceTouchHandler.h>
// NS_ASSUME_NONNULL_BEGIN

// @interface RNTModalView : RCTViewComponentView <RCTInvalidating>

// @property (nonatomic, strong) RCTSurfaceTouchHandler *touchHandler;

// #else

@interface RNTModalView : UIView <RCTInvalidating>

@property(nonatomic, strong) RCTTouchHandler *touchHandler;

- (instancetype)initWithBridge:(RCTBridge *)bridge;

// #endif

@property(nonatomic, strong) RCTUIManager *uiManager;
@property(nonatomic, strong) RNTModalViewController *modalViewController;
@property(nonatomic, assign) BOOL isMounted;

- (void)setupIfNeeded;
- (void)mount;
- (void)unmount;
- (void)update;

@end

// #ifdef RCT_NEW_ARCH_ENABLED
// NS_ASSUME_NONNULL_END
// #endif

#endif /* RNTModalVIew_h */
