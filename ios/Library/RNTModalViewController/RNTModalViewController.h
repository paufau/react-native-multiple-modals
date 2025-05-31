#ifndef RNTModalViewController_h
#define RNTModalViewController_h

#import <UIKit/UIKit.h>
#import "ModalAnimation.h"

@protocol RNTModalViewControllerProtocol <NSObject>
- (void)presentOn:(UIViewController *)parentVC onView:(UIView *)parentView;
- (void)dismiss;
- (void)addReactSubview:(UIView *)view;
- (void)setupReactSubview:(UIView *)subview;
- (void)setAnimationType:(NSString *)type;
@end

@interface RNTModalViewController : UIViewController <RNTModalViewControllerProtocol>
@property(nonatomic, strong) UIView *reactSubviewContainer;
@property(nonatomic, strong) ModalAnimation *inAnimation;
@property(nonatomic, strong) ModalAnimation *outAnimation;
@end

#endif /* RNTModalViewController_h */
