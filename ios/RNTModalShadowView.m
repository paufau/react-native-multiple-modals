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
        ((RCTShadowView *)subview).size = RCTScreenSize();
    }
}

@end
