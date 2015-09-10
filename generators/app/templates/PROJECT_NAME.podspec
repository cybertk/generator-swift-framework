Pod::Spec.new do |s|
  s.name             = "<%= projectName %>"
  s.version          = "0.1.0"
  s.license          = "MIT"
  s.summary          = "A short description"
  s.homepage         = "https://github.com/<%= githubUser %>/<%= projectName %>"
  s.author           = "<%= projectName %> Contributors"
  s.source           = { :git => "https://github.com/<%= githubUser %>/<%= projectName %>.git", :tag => "v#{s.version}" }

  s.platform     = :ios, "8.0"
  s.requires_arc = true

  s.source_files = "<%= projectName %>/**/*.{swift,h,m,mm}"
end
