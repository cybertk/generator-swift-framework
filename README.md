# generator-swift-framework

> Scaffolds out a Xcode Embedded Framework project with Swift 2.0

[![Build Status](http://img.shields.io/travis/cybertk/generator-swift-framework.svg?style=flat)](https://travis-ci.org/cybertk/generator-swift-framework)
[![Dependency Status](https://david-dm.org/cybertk/generator-swift-framework.svg)](https://david-dm.org/cybertk/generator-swift-framework)
[![devDependency Status](https://david-dm.org/cybertk/generator-swift-framework/dev-status.svg)](https://david-dm.org/cybertk/generator-swift-framework#info=devDependencies)

generator-swift-framework is used to create a Xcode [Embedded Framework](https://developer.apple.com/library/ios/documentation/General/Conceptual/ExtensibilityPG/ExtensionScenarios.html) project with the following features:

- Embedded Framework template
- Unit Test template based on [Nimble](https://github.com/quick/nimble)
- Example App template
- Swift 2.0 syntax
- Manage dependencies with [Carthage][]
- Support distribution via [CocoaPods](http://cocoapods.com) and [Carthage][]
- MIT License
- Test suites to cover distributions and fundamentals with `make test`
- [Scripts](https://github.com/cybertk/ios-build-scripts) for working on CLI and CI integration
- Optional Travis CI integration
- Optional Apple Development Certification provisioning

[Carthage]: https://github.com/carthage/carthage

## Getting Started

To install generator-swift-framework from npm, run:

```bash
npm install -g generator-swift-framework
```

Make a new directory for the framework, and cd into it:

```bash
mkdir my-new-framework && cd $_
```

Then, initiate the generator via [Yeoman][]:

```bash
yo swift-framework
```

generator-swift-framework is actually a [Yeoman Generator](#yeoman-generators).

[Yeoman]: http://yeoman.io

### What is Yeoman?

Trick question. It's not a thing. It's this guy:

![](http://i.imgur.com/JHaAlBJ.png)

Basically, he wears a top hat, lives in your computer, and waits for you to tell him what kind of application you wish to create.

Not every new computer comes with a Yeoman pre-installed. He lives in the [npm](https://npmjs.org) package repository. You only have to ask for him once, then he packs up and moves into your hard drive. *Make sure you clean up, he likes new and shiny things.*

```bash
npm install -g yo
```

### Yeoman Generators

Yeoman travels light. He didn't pack any generators when he moved in. You can think of a generator like a plug-in. You get to choose what type of application you wish to create, such as a Backbone application or even a Chrome extension.

## License

generator-swift-framework is available under the MIT license.
