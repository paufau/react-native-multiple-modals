#ifndef RNTModalViewController_h
#define RNTModalViewController_h

#import <UIKit/UIKit.h>
#import "ModalAnimation.h"

@protocol RNTModalViewControllerDelegate <NSObject>
- (void)boundsDidChange:(CGRect)newBounds;
@end

@protocol RNTModalViewControllerProtocol <NSObject>
- (instancetype)initWithDelegate:(id<RNTModalViewControllerDelegate>)delegate;
- (void)presentOn:(UIViewController *)parentVC onView:(UIView *)parentView;
- (void)dismiss;
- (void)addReactSubview:(UIView *)view;
- (void)setupReactSubview:(UIView *)subview;
- (void)setAnimationType:(NSString *)type;
@end

@interface RNTModalViewController : UIViewController <RNTModalViewControllerProtocol>
@property(nonatomic, weak) id<RNTModalViewControllerDelegate> delegate;
@property(nonatomic, strong) UIView *reactSubviewContainer;
@property(nonatomic, strong) ModalAnimation *inAnimation;
@property(nonatomic, strong) ModalAnimation *outAnimation;
@property(nonatomic, assign) CGRect lastBounds;
@end

#endif /* RNTModalViewController_h */
