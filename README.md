# generator-swift-framework [![Build Status](https://secure.travis-ci.org/cybertk/generator-swift-framework.png?branch=master)](https://travis-ci.org/cybertk/generator-swift-framework)

> [Yeoman](http://yeoman.io) generator


## Getting Started

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

To install generator-swift-framework from npm, run:

```bash
npm install -g generator-swift-framework
```

Finally, initiate the generator:

```bash
yo swift.framework
```

### Getting To Know Yeoman

Yeoman has a heart of gold. He's a person with feelings and opinions, but he's very easy to work with. If you think he's too opinionated, he can be easily convinced.

If you'd like to get to know Yeoman better and meet some of his friends, [Grunt](http://gruntjs.com) and [Bower](http://bower.io), check out the complete [Getting Started Guide](https://github.com/yeoman/yeoman/wiki/Getting-Started).


## Contributing

### Create new Project Template

1. Create **Cocoa Touch Framework** target in Xcode
    - Use `PROJECT_NAME` for **Product Name**
    - Use `ORGANIZATION-NAME` for **Organization Name**
    - Use `ORGANIZATION-ID` for **Organization Identifier**
    - Do NOT select **Include Unit Tests**, see [reason]()
1. Update Project Settings
    - Share scheme

1. Update Placeholders
    - `make template-update`

## License

MIT
