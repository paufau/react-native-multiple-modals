#import <React/RCTViewManager.h>
#import <React/RCTUIManager.h>
#import "RCTBridge.h"
#import "RNTModalShadowView.h"
#import "RNTModalView.h"

@interface RNTModalViewManager : RCTViewManager
@end

@implementation RNTModalViewManager

RCT_EXPORT_MODULE(RNTModalViewManager)

- (RNTModalView *)view
{
    return [[RNTModalView alloc] initWithBridge:self.bridge];
}

- (RNTModalShadowView *)shadowView
{
    return [[RNTModalShadowView alloc] init];
}

+ (BOOL)requiresMainQueueSetup
{
    return true;
}

@end
