#import <React/RCTViewManager.h>
#import <React/RCTUIManager.h>
#import "RCTBridge.h"
#import "RNTModalView.h"
#import "RNTModalShadowView.h"

@interface RNTModalViewManager : RCTViewManager
@end

@implementation RNTModalViewManager

RCT_EXPORT_MODULE(RNTModalView)

- (UIView *)view
{
    return [[RNTModalView alloc] initWithBridge:self.bridge];
}

- (RCTShadowView *)shadowView
{
    return [RNTModalShadowView new];
}

+ (BOOL)requiresMainQueueSetup
{
    return true;
}

@end
