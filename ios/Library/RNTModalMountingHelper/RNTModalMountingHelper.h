#ifndef RNTModalMountingHelper_h
#define RNTModalMountingHelper_h

#import <UIKit/UIKit.h>
#import "RNTModalViewController.h"

@protocol RNTModalMountingHelperProtocol <NSObject>
- (instancetype _Nonnull)initWithViewController:(RNTModalViewController *_Nonnull)viewController;
- (void)updatePropsTransaction:(void (^__nullable)(void))completion;
- (void)updateChildrenTransaction:(void (^__nullable)(void))completion;
- (void)mountIfNeeded;
- (void)unmountIfNeeded;
@end

@interface RNTModalMountingHelper : NSObject <RNTModalMountingHelperProtocol>

@property(nonatomic, assign) BOOL isMounted;
@property(nonatomic, assign) BOOL hasProps;
@property(nonatomic, assign) BOOL hasChildren;
@property(nullable, weak) RNTModalViewController *modal;

- (UIWindow *_Nullable)getKeyWindow;
- (UIViewController *_Nullable)getRootController;
- (void)mount;
- (void)unmount;

@end

#endif /* RNTModalMountingHelper_h */
