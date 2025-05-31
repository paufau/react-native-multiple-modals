#ifndef RNTModalViewComponentView_h
#define RNTModalViewComponentView_h

#import <UIKit/UIKit.h>
#import <React/RCTViewComponentView.h>
#import <React/RCTSurfaceTouchHandler.h>
#import <React/RCTUIManager.h>
#import <React/RCTTouchHandler.h>
#import "RNTModalViewController.h"
#import "RNTModalMountingHelper.h"

NS_ASSUME_NONNULL_BEGIN

@interface RNTModalViewComponentView : RCTViewComponentView

@property(nullable, strong) RCTSurfaceTouchHandler *touchHandler;
@property(nullable, strong) RNTModalViewController *modalViewController;
@property(nonnull, strong) RNTModalMountingHelper *mountingHelper;

@end

NS_ASSUME_NONNULL_END

#endif /* RNTModalViewComponentView_h */
