#import <React/RCTBridge.h>
#import <React/RCTUIManager.h>
#import <React/RCTTouchHandler.h>
#import <UIKit/UIKit.h>
#import "RNTModalViewController.h"
#import "RNTModalVIew.h"

#ifdef RCT_NEW_ARCH_ENABLED

#import <react/renderer/components/RNTModalViewSpec/ComponentDescriptors.h>
#import <react/renderer/components/RNTModalViewSpec/EventEmitters.h>
#import <react/renderer/components/RNTModalViewSpec/Props.h>
#import <react/renderer/components/RNTModalViewSpec/RCTComponentViewHelpers.h>
#import "RCTFabricComponentsPlugins.h"
#import <React/RCTSurfaceTouchHandler.h>

using namespace facebook::react;

@interface RNTModalView () <RCTRNTModalViewViewProtocol>

@end

@implementation RNTModalView

Class<RCTComponentViewProtocol> RNTModalViewCls(void)
{
    return RNTModalView.class;
}

+ (ComponentDescriptorProvider)componentDescriptorProvider
{
    return concreteComponentDescriptorProvider<RNTModalViewComponentDescriptor>();
}

- (instancetype)initWithFrame:(CGRect)frame {
    self = [super initWithFrame:CGRectZero];
    if (self) {
        _touchHandler = [RCTSurfaceTouchHandler new];
        _modalViewController = [[RNTModalViewController alloc] init];
        _isMounted = NO;
    }
    return self;
}

- (void)mountChildComponentView:(UIView<RCTComponentViewProtocol> *)childComponentView index:(NSInteger)index
{
    [self insertReactSubview:childComponentView atIndex:index];
    [self setupIfNeeded];
}

- (void)unmountChildComponentView:(UIView<RCTComponentViewProtocol> *)childComponentView index:(NSInteger)index
{
    [self removeReactSubview:childComponentView];
    [self unmount];
}

- (void)didMoveToSuperview {
    [self setupIfNeeded];
}

#else

@implementation RNTModalView

- (instancetype)initWithBridge:(RCTBridge *)bridge {
    self = [super initWithFrame:CGRectZero];
    if (self) {
        _uiManager = bridge.uiManager;
        _touchHandler = [[RCTTouchHandler alloc] initWithBridge:bridge];
        _modalViewController = [[RNTModalViewController alloc] init];
        _isMounted = NO;
    }
    return self;
}

#endif

RCT_NOT_IMPLEMENTED(-(instancetype)initWithCoder : coder)


- (void)layoutSubviews {
    [super layoutSubviews];
    [self setupIfNeeded];
}

- (void)addSubview:(UIView *)view {
    [super addSubview:view];
}

- (void)insertReactSubview:(UIView *)subview atIndex:(NSInteger)atIndex {
    [super insertReactSubview:subview atIndex:atIndex];
    dispatch_async(dispatch_get_main_queue(), ^{
        [self.touchHandler attachToView:subview];
        [self.modalViewController addReactSubview:subview];
    });
}

- (void)removeReactSubview:(UIView *)subview
{
    [super removeReactSubview:subview];
    dispatch_async(dispatch_get_main_queue(), ^{
        [self.touchHandler detachFromView:subview];
        [subview removeFromSuperview];
    });
}

- (void)setupIfNeeded {
    if (self.isMounted) {
        [self update];
    } else {
        [self mount];
    }
}

- (void)mount {
    UIViewController *rvc = [self reactViewController];
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
    self.isMounted = NO;
}

- (void)update {
    // No actions required
}

- (void)invalidate {
    [self unmount];
}

@end
