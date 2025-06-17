#ifndef RNTModalMountingHelper_h
#define RNTModalMountingHelper_h

#import <UIKit/UIKit.h>
#import "RNTModalViewController.h"

@protocol RNTModalMountingHelperProtocol <NSObject>

- (void)updatePropsTransaction:(void (^__nullable)(void))completion;
- (void)updateChildrenTransaction:(void (^__nullable)(void))completion;
- (void)mountIfNeeded;
- (void)unmountIfNeeded;

@end

@interface RNTModalMountingHelper : NSObject <RNTModalMountingHelperProtocol>
- (instancetype _Nonnull)init NS_UNAVAILABLE;

- (instancetype _Nonnull)initWithViewController:(RNTModalViewController *_Nonnull)viewController NS_DESIGNATED_INITIALIZER;

@property(nonatomic, assign) BOOL isMounted;
@property(nonatomic, assign) BOOL hasProps;
@property(nonatomic, assign) BOOL hasChildren;
@property(nullable, weak) RNTModalViewController *modal;

- (void)mount;
- (void)unmount;

@end

#endif /* RNTModalMountingHelper_h */
