#import <UIKit/UIKit.h>
#import "RNTModalViewController.h"

#import "ModalAnimation.h"
#import "FadeInAnimation.h"
#import "FadeOutAnimation.h"
#import "SlideInAnimation.h"
#import "SlideOutAnimation.h"

@implementation RNTModalViewController

- (instancetype)initWithDelegate:(id<RNTModalViewControllerDelegate>)delegate {
    self = [super initWithNibName:nil bundle:nil];
    if (self) {
        self.reactSubviewContainer = [[UIView alloc] init];
        self.delegate = delegate;
    }
    return self;
}

- (instancetype)initWithCoder:(NSCoder *)coder {
    [NSException raise:@"initWithCoder" format:@"init(coder:) has not been implemented"];
    self = [super initWithNibName:nil bundle:nil];
    return self;
}

- (instancetype)init {
    [NSException raise:@"init" format:@"init has not been implemented"];
    self = [super initWithNibName:nil bundle:nil];
    return self;
}

- (void)setupReactSubview:(UIView *)subview {
    [self.view addSubview:self.reactSubviewContainer];
    self.reactSubviewContainer.translatesAutoresizingMaskIntoConstraints = NO;
    
    [NSLayoutConstraint activateConstraints:@[
        [self.reactSubviewContainer.topAnchor constraintEqualToAnchor:self.view.topAnchor],
        [self.reactSubviewContainer.bottomAnchor constraintEqualToAnchor:self.view.bottomAnchor],
        [self.reactSubviewContainer.leadingAnchor constraintEqualToAnchor:self.view.leadingAnchor],
        [self.reactSubviewContainer.trailingAnchor constraintEqualToAnchor:self.view.trailingAnchor]
    ]];
}

- (void)viewDidLoad {
    [super viewDidLoad];
    
    [self.inAnimation prepareAnimation:self.reactSubviewContainer];
    [self setupReactSubview:self.reactSubviewContainer];
}

- (void)viewDidAppear:(BOOL)animated {
    [self.inAnimation animate:self.reactSubviewContainer completion:NULL];
}

- (void)viewDidLayoutSubviews
{
    [super viewDidLayoutSubviews];
    if (!CGRectEqualToRect(self.lastBounds, self.view.bounds)) {
        [self.delegate boundsDidChange:self.view.bounds];
        self.lastBounds = self.view.bounds;
    }
}

#pragma mark - ModalViewControllerProtocol

- (void)presentOn:(UIViewController *)parentVC onView:(UIView *)parentView {
    self.modalPresentationStyle = UIModalPresentationCustom;
    self.view.accessibilityViewIsModal = YES;
    
    [self willMoveToParentViewController:parentVC];
    [parentVC addChildViewController:self];
    [parentView addSubview:self.view];
    [self didMoveToParentViewController:parentVC];
}

- (void)dismiss {
    UIView *prevReactSubviewContainer = self.reactSubviewContainer;
    self.reactSubviewContainer = [self.reactSubviewContainer snapshotViewAfterScreenUpdates:NO];
    [prevReactSubviewContainer removeFromSuperview];
    
    [self setupReactSubview:self.reactSubviewContainer];
    [self.outAnimation prepareAnimation:self.reactSubviewContainer];
    [self.outAnimation animate:self.reactSubviewContainer completion:^(BOOL finished) {
        [self willMoveToParentViewController:nil];
        [self.view removeFromSuperview];
        [self removeFromParentViewController];
    }];
}

- (void)addReactSubview:(UIView *)view {
    [self.reactSubviewContainer addSubview:view];
}

- (void)setAnimationType:(NSString *)type {
    typedef void (^CaseBlock)(void);
    
    NSDictionary *cases = @{
        @"fade":
            ^{
                self.inAnimation = [[FadeInAnimation alloc] init];
                self.outAnimation = [[FadeOutAnimation alloc] init];
            },
        @"slide":
            ^{
                self.inAnimation = [[SlideInAnimation alloc] init];
                self.outAnimation = [[SlideOutAnimation alloc] init];
            }
    };
    
    CaseBlock selectedCase = cases[type];
    
    if (selectedCase) {
        selectedCase();
    } else {
        ModalAnimation *defaultAnimation = [[ModalAnimation alloc] init];
        self.inAnimation = defaultAnimation;
        self.outAnimation = defaultAnimation;
    }
}

@end
