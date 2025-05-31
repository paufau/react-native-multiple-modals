#import "FadeOutAnimation.h"

@implementation FadeOutAnimation

- (void)prepareAnimation:(UIView*)forView {}

- (void)animate:(UIView*)view completion:(void (^ __nullable)(BOOL finished))completion {
    [UIView animateWithDuration:0.2 animations:^{
        view.alpha = 0.0;
    } completion:completion];
}

@end
