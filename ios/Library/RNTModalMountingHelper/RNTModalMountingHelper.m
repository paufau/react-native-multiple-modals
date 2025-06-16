#import <UIKit/UIKit.h>
#import "RNTModalMountingHelper.h"

@implementation RNTModalMountingHelper

- (instancetype)init
{
    [NSException raise:@"init" format:@"init has not been implemented"];
    return self;
}

- (instancetype _Nonnull)initWithViewController:(RNTModalViewController * _Nonnull)viewController {
    if (self = [super init]) {
        _modal = viewController;
    }
    
    return self;
}

- (UIWindow *)getKeyWindow {
    for (UIScene *scene in [UIApplication sharedApplication].connectedScenes) {
        if ([scene isKindOfClass:[UIWindowScene class]]) {
            UIWindowScene *windowScene = (UIWindowScene *)scene;
            for (UIWindow *window in windowScene.windows) {
                if (window.isKeyWindow) {
                    return window;
                }
            }
        }
    }
    
    return nil;
}

- (UIViewController *)getRootController {
    UIWindow *keyWindow = [self getKeyWindow];
    
    self.modalWindow = [[UIWindow alloc] initWithFrame: keyWindow.bounds];
    
    self.modalWindow.rootViewController = [[UIViewController alloc] init];
    self.modalWindow.backgroundColor = UIColor.clearColor;
    self.modalWindow.accessibilityViewIsModal = YES;
    self.modalWindow.rootViewController.modalPresentationStyle = UIModalPresentationCustom;
    
    [self.modalWindow makeKeyAndVisible];
    
    return self.modalWindow.rootViewController;
}

- (void)updateChildrenTransaction:(void (^ _Nullable)(void))completion {
    dispatch_async(dispatch_get_main_queue(), ^{
        if (completion) {
            completion();
        }
        self.hasChildren = YES;
        [self mountIfNeeded];
    });
}

- (void)updatePropsTransaction:(void (^ _Nullable)(void))completion { 
    dispatch_async(dispatch_get_main_queue(), ^{
        if (completion) {
            completion();
        }
        self.hasProps = YES;
        [self mountIfNeeded];
    });
}

- (void)mountIfNeeded { 
    if (!self.isMounted && self.hasProps && self.hasChildren) {
        [self mount];
    }
}


- (void)unmountIfNeeded { 
    if (self.isMounted) {
        [self unmount];
    }
}

- (void)mount {
    UIViewController *rvc = [self getRootController];
    
    if (!rvc) {
        NSLog(@"reactViewController not found");
        return;
    }
    
    dispatch_async(dispatch_get_main_queue(), ^{
        [self.modal presentOn:rvc onView:rvc.view];
    });
    
    self.isMounted = YES;
}

- (void)unmount {
    [self.modal dismiss];
    _modal = nil;
    _isMounted = NO;
    _hasProps = NO;
    _hasChildren = NO;
}

@end
