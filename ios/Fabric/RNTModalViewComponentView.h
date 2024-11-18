#ifndef RNTModalViewComponentView_h
#define RNTModalViewComponentView_h

#import <UIKit/UIKit.h>
#import <React/RCTViewComponentView.h>
#import <React/RCTSurfaceTouchHandler.h>
#import <React/RCTUIManager.h>
#import <React/RCTTouchHandler.h>
#import "RNTModalViewController.h"

NS_ASSUME_NONNULL_BEGIN

@interface RNTModalViewComponentView : RCTViewComponentView

@property(nonatomic, strong) RCTSurfaceTouchHandler *touchHandler;
@property(nonatomic, strong) RNTModalViewController *modalViewController;
@property(nonatomic, assign) BOOL isMounted;

- (void)setupIfNeeded;
- (void)mount;
- (void)unmount;
- (void)update;

@end

NS_ASSUME_NONNULL_END

#endif /* RNTModalViewComponentView_h */
