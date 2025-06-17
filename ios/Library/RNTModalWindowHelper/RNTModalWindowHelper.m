#ifndef RNTModalWindowHelper_h
#define RNTModalWindowHelper_h

#import <UIKit/UIKit.h>

@protocol RNTModalWindowHelperProtocol <NSObject>

- (UIWindow *_Nullable)getKeyWindow;
- (UIViewController *_Nullable)getRootController;
- (UIInterfaceOrientation)getWindowOrientation;

@end

@interface RNTModalWindowHelper : NSObject <RNTModalWindowHelperProtocol>

@end

#endif /* RNTModalWindowHelper_h */
