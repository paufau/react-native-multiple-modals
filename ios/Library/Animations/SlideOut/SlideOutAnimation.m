#import "RCTUtils.h"
#import "SlideOutAnimation.h"

@implementation SlideOutAnimation

- (void)prepareAnimation:(UIView*)forView {}

- (void)animate:(UIView*)view completion:(void (^ __nullable)(BOOL finished))completion {
    [UIView animateWithDuration:0.2 animations:^{
        view.transform = CGAffineTransformMakeTranslation(0, RCTScreenSize().height);
    } completion:completion];
}

@end
