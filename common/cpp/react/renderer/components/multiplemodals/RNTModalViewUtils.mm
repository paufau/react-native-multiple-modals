#import "RNTModalViewUtils.h"

#import <Foundation/Foundation.h>
#import <React/RCTUtils.h>

#import "RNTModalWindowHelper.h"

namespace facebook::react {

Size RNTModalViewSize(void)
{
    CGSize screenSize = RCTScreenSize();
    return { screenSize.width, screenSize.height };
}

} // namespace facebook::react
