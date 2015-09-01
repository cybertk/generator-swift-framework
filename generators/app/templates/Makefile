SHELL = /bin/bash -o pipefail
project = <%= projectName %>

test: test-unit test-carthage test-cocoapods

test-unit:
	xcodebuild test -scheme $(project) -sdk iphonesimulator ONLY_ACTIVE_ARCH=NO OBJROOT=$(PWD)/build SYMROOT=$(PWD)/build | xcpretty

test-carthage:
	carthage build --verbose --no-skip-current | xcpretty

test-cocoapods:
	pod lib lint $(project).podspec

bootstrap:
	bundle install
	# Cannot brew install carthage on Travis-CI
	# brew update
	# brew install carthage
	curl -OL https://github.com/Carthage/Carthage/releases/download/0.8/Carthage.pkg
	sudo /usr/sbin/installer -pkg Carthage.pkg -target /

deps:
	carthage bootstrap --verbose | xcpretty

release:
	zip -r -9 $(project).framework.zip Carthage/Build/iOS/*.framework

clean:
	git clean -xfd
	git submodule foreach git clean -xfd
	rm -rf  ~/Library/Developer/Xcode/DerivedData/$(project)-*

.PHONY: all clean test test-unit test-carthage test-cocoapods bootstrap deps release
