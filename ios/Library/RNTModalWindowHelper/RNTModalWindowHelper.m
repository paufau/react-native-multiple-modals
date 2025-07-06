#import <UIKit/UIKit.h>
#import "RNTModalWindowHelper.h"

@implementation RNTModalWindowHelper

- (UIWindow *)getKeyWindow
{
    for (UIScene *scene in [UIApplication sharedApplication].connectedScenes)
    {
        if ([scene isKindOfClass:[UIWindowScene class]])
        {
            UIWindowScene *windowScene = (UIWindowScene *)scene;
            for (UIWindow *window in windowScene.windows)
            {
                if (window.isKeyWindow)
                {
                    return window;
                }
            }
        }
    }

    return nil;
}

- (UIViewController *)getRootController
{
    return [self getKeyWindow].rootViewController;
}

- (UIInterfaceOrientation)getWindowOrientation
{
    return [self getKeyWindow].windowScene.interfaceOrientation ?: UIInterfaceOrientationPortrait;
}

- (UIWindow *)createNewKeyWindow {
    UIWindow *keyWindow = [self getKeyWindow];
    
    UIWindow *nextWindow = [[UIWindow alloc] initWithFrame: keyWindow.bounds];
    
    nextWindow.windowScene = keyWindow.windowScene;
    nextWindow.rootViewController = [[UIViewController alloc] init];
    nextWindow.backgroundColor = UIColor.clearColor;
    nextWindow.accessibilityViewIsModal = YES;
    nextWindow.rootViewController.modalPresentationStyle = UIModalPresentationCustom;
    
    [nextWindow makeKeyAndVisible];
    
    return nextWindow;
}

@end
