#include <react/renderer/graphics/Size.h>
#include "../../RNTModalViewUtils.h"
#include "JReactModalHostView.h"

namespace facebook::react
{
  Size RNTModalViewSize()
  {
    return JReactModalHostView::getDisplayMetrics();
  }
}