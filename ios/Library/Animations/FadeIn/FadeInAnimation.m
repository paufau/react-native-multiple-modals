#import "FadeInAnimation.h"

@implementation FadeInAnimation

- (void)prepareAnimation:(UIView*)forView {
    forView.alpha = 0.0;
}

- (void)animate:(UIView*)view completion:(void (^ __nullable)(BOOL finished))completion {
    [UIView animateWithDuration:0.2 animations:^{
        view.alpha = 1.0;
    } completion:completion];
}

@end
