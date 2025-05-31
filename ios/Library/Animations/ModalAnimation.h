#ifndef ModalAnimation_h
#define ModalAnimation_h

#import <UIKit/UIKit.h>

@protocol ModalAnimationProtocol <NSObject>
- (void)prepareAnimation:(UIView *_Nonnull)forView;
- (void)animate:(UIView *_Nonnull)view completion:(void (^__nullable)(BOOL finished))completion;
@end

@interface ModalAnimation : NSObject <ModalAnimationProtocol>

@end

#endif /* ModalAnimation_h */
