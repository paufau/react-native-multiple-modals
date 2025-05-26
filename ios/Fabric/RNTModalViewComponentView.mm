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
#import "RNTModalMountingHelper.h"

using namespace facebook::react;

@interface RNTModalViewComponentView () <RCTRNTModalViewViewProtocol>
@end

@implementation RNTModalViewComponentView {
    RNTModalViewShadowNode::ConcreteState::Shared _state;
}

RCT_NOT_IMPLEMENTED(-(instancetype)initWithCoder : coder)

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
        _mountingHelper = [[RNTModalMountingHelper alloc] initWithViewController:_modalViewController];
    }
    
    return self;
}

- (void)mountChildComponentView:(UIView<RCTComponentViewProtocol> *)childComponentView index:(NSInteger)index
{
    [self.touchHandler attachToView:childComponentView];
    [self.mountingHelper updateChildrenTransaction:^{
        [self.modalViewController addReactSubview:childComponentView];
    }];
}

- (void)unmountChildComponentView:(UIView<RCTComponentViewProtocol> *)childComponentView index:(NSInteger)index
{
    [self.touchHandler detachFromView:childComponentView];
    [self.mountingHelper unmountIfNeeded];
    [childComponentView removeFromSuperview];
}

// Needed because of this: https://github.com/facebook/react-native/pull/37274
+ (void)load
{
    [super load];
}

- (void)updateProps:(const Props::Shared &)props oldProps:(const Props::Shared &)oldProps
{
    const auto &newProps = static_cast<const RNTModalViewProps &>(*props);
    
    NSString *animationType = [NSString stringWithCString:newProps.animationType.c_str() encoding:NSUTF8StringEncoding];
    
    [self.mountingHelper updatePropsTransaction:^{
        [self.modalViewController setAnimationType:animationType];
    }];
    
    [super updateProps:props oldProps:oldProps];
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
