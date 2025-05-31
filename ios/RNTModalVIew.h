#ifndef RNTModalVIew_h
#define RNTModalVIew_h

#import <React/RCTBridge.h>
#import <React/RCTUIManager.h>
#import <React/RCTTouchHandler.h>
#import <UIKit/UIKit.h>
#import "RNTModalViewController.h"
#import "RNTModalMountingHelper.h"

@interface RNTModalView : UIView <RCTInvalidating>

- (instancetype)initWithBridge:(RCTBridge *)bridge;

@property(nonatomic, strong) RCTTouchHandler *touchHandler;
@property(nonatomic, strong) RNTModalViewController *modalViewController;
@property(nonatomic, strong) RNTModalMountingHelper *mountingHelper;

// Props
@property(nonatomic, strong) NSString *animationType;

@end

#endif /* RNTModalVIew_h */
