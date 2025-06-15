#ifndef RNTModalViewController_h
#define RNTModalViewController_h

#import <UIKit/UIKit.h>
#import "ModalAnimation.h"

@protocol RNTModalViewControllerDelegate <NSObject>
- (void)boundsDidChange:(CGRect)newBounds;
@end

@protocol RNTModalViewControllerProtocol <NSObject>
- (void)presentOn:(UIViewController *)parentVC onView:(UIView *)parentView;
- (void)dismiss;
- (void)addReactSubview:(UIView *)view;
- (void)setupReactSubview:(UIView *)subview;
- (void)setAnimationType:(NSString *)type;
@end

@interface RNTModalViewController : UIViewController <RNTModalViewControllerProtocol>
- (instancetype)init NS_UNAVAILABLE;
- (instancetype)initWithCoder:(NSCoder *)coder NS_UNAVAILABLE;
- (instancetype)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil NS_UNAVAILABLE;

- (instancetype)initWithDelegate:(id<RNTModalViewControllerDelegate>)delegate NS_DESIGNATED_INITIALIZER;

@property(nonatomic, weak) id<RNTModalViewControllerDelegate> delegate;
@property(nonatomic, strong) UIView *reactSubviewContainer;
@property(nonatomic, strong) ModalAnimation *inAnimation;
@property(nonatomic, strong) ModalAnimation *outAnimation;
@property(nonatomic, assign) CGRect lastBounds;
@property(nonatomic, assign) BOOL shouldTrackRotationChange;

@end

#endif /* RNTModalViewController_h */
