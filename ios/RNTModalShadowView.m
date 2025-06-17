#import "RNTModalShadowView.h"

#import "RCTBridge.h"
#import "RCTShadowView.h"
#import "RCTUtils.h"
#import "RNTModalWindowHelper.h"

@implementation RNTModalShadowView

- (void)insertReactSubview:(id<RCTComponent>)subview atIndex:(NSInteger)atIndex
{
    [super insertReactSubview:subview atIndex:atIndex];
    if ([subview isKindOfClass:[RCTShadowView class]]) {
        dispatch_sync(dispatch_get_main_queue(), ^{
            RNTModalWindowHelper *windowHelper = [[RNTModalWindowHelper alloc] init];
            UIInterfaceOrientation orientation = [windowHelper getWindowOrientation];
            
            CGSize screenSize = RCTScreenSize();
            
            if (UIInterfaceOrientationIsPortrait(orientation)) {
                ((RCTShadowView *)subview).size = screenSize;
            } else {
                ((RCTShadowView *)subview).size = CGSizeMake(screenSize.height, screenSize.width);
            }
        });
    }
}

@end
