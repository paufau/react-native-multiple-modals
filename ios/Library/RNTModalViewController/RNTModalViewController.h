#ifndef RNTModalViewController_h
#define RNTModalViewController_h

#import <UIKit/UIKit.h>

@protocol RNTModalViewControllerProtocol <NSObject>
- (void)presentOn:(UIViewController *)parentVC onView:(UIView *)parentView;
- (void)dismiss;
- (void)addReactSubview:(UIView *)view;
@end

@interface RNTModalViewController : UIViewController <RNTModalViewControllerProtocol>
@property (nonatomic, strong) UIView *reactSubviewContainer;
@end

#endif /* RNTModalViewController_h */
