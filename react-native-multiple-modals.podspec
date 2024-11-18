require "json"

fabric_enabled = ENV['RCT_NEW_ARCH_ENABLED'] == '1'

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  s.name         = "react-native-multiple-modals"
  s.version      = package["version"]
  s.summary      = package["description"]
  s.homepage     = package["homepage"]
  s.license      = package["license"]
  s.authors      = package["author"]

  s.platforms    = { :ios => min_ios_version_supported }
  s.source       = { :git => ".git", :tag => "#{s.version}" }

  s.source_files = "ios/**/*.{h,m,mm}"
  s.exclude_files = "ios/Fabric"

  s.dependency "React-Core"

  if fabric_enabled
    install_modules_dependencies(s)

    s.subspec "common" do |ss|
      ss.source_files         = "common/cpp/**/*.{cpp,h,mm}"
      ss.header_dir           = "react/renderer/components/multiplemodals"
      ss.pod_target_xcconfig  = { "HEADER_SEARCH_PATHS" => "\"$(PODS_TARGET_SRCROOT)/common/cpp\"" }
    end

    s.subspec "fabric" do |ss|
      ss.dependency "react-native-multiple-modals/common"
      ss.source_files         = "ios/Fabric/**/*.{h,m,mm}"
      ss.pod_target_xcconfig  = { "HEADER_SEARCH_PATHS" => "\"$(PODS_TARGET_SRCROOT)/common/cpp\"" }
    end
  end
end
