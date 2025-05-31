#import "RCTUtils.h"
#import "SlideInAnimation.h"

@implementation SlideInAnimation

- (void)prepareAnimation:(UIView*)forView {
    forView.transform = CGAffineTransformMakeTranslation(0, RCTScreenSize().height);
}

- (void)animate:(UIView*)view completion:(void (^ __nullable)(BOOL finished))completion {
    [UIView animateWithDuration:0.2 animations:^{
        view.transform = CGAffineTransformMakeTranslation(0, 0);
    } completion:completion];
}

@end
