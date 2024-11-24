#import "RNTModalViewComponentView.h"

#import <UIKit/UIKit.h>

#import <react/renderer/components/multiplemodals/EventEmitters.h>
#import <react/renderer/components/multiplemodals/Props.h>
#import <react/renderer/components/multiplemodals/RCTComponentViewHelpers.h>
#import <react/renderer/components/multiplemodals/RNTModalViewComponentDescriptor.h>
#import <react/renderer/components/multiplemodals/RNTModalViewShadowNode.h>

#import <React/RCTConversions.h>
#import <React/RCTFabricComponentsPlugins.h>
#import <React/RCTBridge.h>
#import <React/RCTUIManager.h>
#import <React/RCTTouchHandler.h>

#import "RNTModalViewController.h"

using namespace facebook::react;

@interface RNTModalViewComponentView () <RCTRNTModalViewViewProtocol>
@end

@implementation RNTModalViewComponentView {
    RNTModalViewShadowNode::ConcreteState::Shared _state;
}

+ (BOOL)shouldBeRecycled
{
    return NO;
}

- (instancetype)initWithFrame:(CGRect)frame
{
    self = [super initWithFrame:CGRectZero];
    
    if (self) {
        static const auto defaultProps = std::make_shared<const RNTModalViewProps>();
        _props = defaultProps;
        
        _touchHandler = [RCTSurfaceTouchHandler new];
        _modalViewController = [[RNTModalViewController alloc] init];
        _isMounted = NO;
    }
    
    return self;
}

- (void)mountChildComponentView:(UIView<RCTComponentViewProtocol> *)childComponentView index:(NSInteger)index
{
    [self.touchHandler attachToView:childComponentView];
    [self.modalViewController addReactSubview:childComponentView];
    [self setupIfNeeded];
}

- (void)unmountChildComponentView:(UIView<RCTComponentViewProtocol> *)childComponentView index:(NSInteger)index
{
    [self.touchHandler detachFromView:childComponentView];
    [childComponentView removeFromSuperview];
    [self unmount];
}

- (void)didMoveToSuperview {
    [self setupIfNeeded];
}

// TODO: START - Move to shared class

RCT_NOT_IMPLEMENTED(-(instancetype)initWithCoder : coder)

- (void)layoutSubviews {
    [super layoutSubviews];
    
    [self setupIfNeeded];
}

- (void)addSubview:(UIView *)view {
    [super addSubview:view];
}

- (void)setupIfNeeded {
    if (self.isMounted) {
        [self update];
    } else {
        [self mount];
    }
}

- (UIViewController *)getRootController {
    UIWindow *keyWindow = [UIApplication sharedApplication].windows.firstObject;
    for (UIWindow *window in [UIApplication sharedApplication].windows) {
        if (window.isKeyWindow) {
            keyWindow = window;
            break;
        }
    }
    UIViewController *topController = keyWindow.rootViewController;
    return topController;
}

- (void)mount {
    UIViewController *rvc = [self getRootController];
    if (!rvc) {
        NSLog(@"reactViewController not found");
        return;
    }
    
    dispatch_async(dispatch_get_main_queue(), ^{
        [self.modalViewController presentOn:rvc onView:rvc.view];
    });
    
    self.isMounted = YES;
}

- (void)unmount {
    [self.modalViewController dismiss];
    _isMounted = NO;
    _modalViewController = NULL;
    _touchHandler = NULL;
}

- (void)update {
    // No actions required
}

// TODO: END

// Needed because of this: https://github.com/facebook/react-native/pull/37274
+ (void)load
{
    [super load];
}

#pragma mark - RCTComponentViewProtocol

+ (ComponentDescriptorProvider)componentDescriptorProvider
{
    return concreteComponentDescriptorProvider<RNTModalViewComponentDescriptor>();
}

- (void)updateState:(State::Shared const &)state oldState:(State::Shared const &)oldState
{
    _state = std::static_pointer_cast<RNTModalViewShadowNode::ConcreteState const>(state);
}

@end

Class<RCTComponentViewProtocol> RNTModalViewCls(void)
{
    return RNTModalViewComponentView.class;
}
