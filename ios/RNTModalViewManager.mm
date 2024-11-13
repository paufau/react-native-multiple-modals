#import <React/RCTViewManager.h>
#import <React/RCTUIManager.h>
#import "RCTBridge.h"
#import "RNTModalView.h"
#import "RNTModalShadowView.h"

@interface RNTModalViewManager : RCTViewManager
@end

@implementation RNTModalViewManager

RCT_EXPORT_MODULE(RNTModalView)

#ifdef RCT_NEW_ARCH_ENABLED
#else

- (UIView *)view
{
    return [[RNTModalView alloc] initWithBridge:self.bridge];
}

- (RCTShadowView *)shadowView
{
    return [RNTModalShadowView new];
}

#endif

+ (BOOL)requiresMainQueueSetup
{
    return true;
}

@end
