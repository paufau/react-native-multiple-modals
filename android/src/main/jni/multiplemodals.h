#pragma once

#include <ReactCommon/JavaTurboModule.h>
#include <ReactCommon/TurboModule.h>
#include <jsi/jsi.h>

#include <react/renderer/components/multiplemodals/RNTModalViewComponentDescriptor.h>

namespace facebook::react
{

  JSI_EXPORT
  std::shared_ptr<TurboModule> multiplemodals_ModuleProvider(const std::string &moduleName, const JavaTurboModule::InitParams &params);

} // namespace facebook