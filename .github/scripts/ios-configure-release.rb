# Sets manual App Store signing and the version on the app target only. Passing these as
# xcodebuild arguments would also apply them to the CocoaPods targets and break the archive.
require 'xcodeproj'

project_path = File.expand_path('../../ios/ContadorDeTrucoNative.xcodeproj', __dir__)
project = Xcodeproj::Project.open(project_path)
target = project.targets.find { |t| t.name == 'ContadorDeTrucoNative' } or abort('App target ContadorDeTrucoNative not found')

release = target.build_configurations.find { |c| c.name == 'Release' } or abort('Release configuration not found')
settings = release.build_settings
settings['CODE_SIGN_STYLE'] = 'Manual'
settings['DEVELOPMENT_TEAM'] = ENV.fetch('IOS_TEAM_ID')
settings['CODE_SIGN_IDENTITY'] = 'Apple Distribution'
settings['PROVISIONING_PROFILE_SPECIFIER'] = ENV.fetch('PROFILE_NAME')
settings['CURRENT_PROJECT_VERSION'] = ENV.fetch('BUILD_NUMBER')
settings['MARKETING_VERSION'] = ENV.fetch('VERSION_NAME')

project.save
puts "Release signing: profile '#{ENV['PROFILE_NAME']}', version #{ENV['VERSION_NAME']} (#{ENV['BUILD_NUMBER']})"
