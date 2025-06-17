#import "RNTModalViewUtils.h"

#import <Foundation/Foundation.h>
#import <React/RCTUtils.h>

#import "RNTModalWindowHelper.h"

namespace facebook::react {

Size RNTModalViewSize(void)
{
    __block CGSize screenSize = RCTScreenSize();
    
    dispatch_sync(dispatch_get_main_queue(), ^{
        RNTModalWindowHelper *windowHelper = [[RNTModalWindowHelper alloc] init];
        UIInterfaceOrientation orientation = [windowHelper getWindowOrientation];
        
        if (UIInterfaceOrientationIsLandscape(orientation)) {
            screenSize = CGSizeMake(screenSize.height, screenSize.width);
        }
    });
    
    return { screenSize.width, screenSize.height };
}

} // namespace facebook::react
