#import "ModalAnimation.h"

@implementation ModalAnimation

- (void)prepareAnimation:(UIView*)forView {}

- (void)animate:(UIView*)view completion:(void (^ __nullable)(BOOL finished))completion {
    if (completion) {
        completion(true);
    }
}

@end
