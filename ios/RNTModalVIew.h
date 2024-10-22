#ifndef RNTModalVIew_h
#define RNTModalVIew_h

#import <React/RCTBridge.h>
#import <React/RCTUIManager.h>
#import <React/RCTTouchHandler.h>
#import <UIKit/UIKit.h>
#import "RNTModalViewController.h"

@interface RNTModalView : UIView <RCTInvalidating>

@property (nonatomic, strong) RCTUIManager *uiManager;
@property (nonatomic, strong) RCTTouchHandler *touchHandler;
@property (nonatomic, strong) RNTModalViewController *modalViewController;
@property (nonatomic, assign) BOOL isMounted;

- (instancetype)initWithBridge:(RCTBridge *)bridge;
- (void)setupIfNeeded;
- (void)mount;
- (void)unmount;
- (void)update;

@end

#endif /* RNTModalVIew_h */
