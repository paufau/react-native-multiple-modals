#import "RNTModalViewComponentView.h"

#import <react/renderer/components/multiplemodals/EventEmitters.h>
#import <react/renderer/components/multiplemodals/Props.h>
#import <react/renderer/components/multiplemodals/RCTComponentViewHelpers.h>
#import <react/renderer/components/multiplemodals/RNTModalViewComponentDescriptor.h>
#import <react/renderer/components/multiplemodals/RNTModalViewShadowNode.h>

#import <React/RCTConversions.h>
#import <React/RCTFabricComponentsPlugins.h>

using namespace facebook::react;

@interface RNTModalViewComponentView () <RCTRNTModalViewViewProtocol>
@end

@implementation RNTModalViewComponentView {
    RNTModalViewShadowNode::ConcreteState::Shared _state;
}

// Needed because of this: https://github.com/facebook/react-native/pull/37274
+ (void)load
{
    [super load];
}

- (instancetype)initWithFrame:(CGRect)frame
{
    if (self = [super initWithFrame:frame]) {
        static const auto defaultProps = std::make_shared<const RNTModalViewProps>();
        _props = defaultProps;
    }
    
    return self;
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
