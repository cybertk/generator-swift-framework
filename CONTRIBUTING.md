We love that you’re interested in contributing to generator-swift-framework! Any contribution is more than welcome!

## generator-swift-framework is simple

Please file issues or submit pull requests for anything you’d like to see! However, we make no promises that they’ll be accepted—many suggestions will be rejected to preserve simplicity.

## Prefer pull requests

If you know exactly how to implement the feature being suggested or fix the bug being reported, please open a pull request instead of an issue. Pull requests are easier than patches or inline code blocks for discussing and merging the changes.

If you can’t make the change yourself, please open an issue after making sure that one isn’t already logged.

## Get started

After checkout, you can bootstrap the development environment by running the following command from the cloned directory:

```bash
npm install
```
## Update Templates

If you want to update existing Xcode Template Project, you can open it in Xcode by running the following command from the cloned directory:

```bash
gulp open-template-project
```

Then, you can changed everything you want, the Template Project is just a normal Xcode project. It can be built, tested and anything available in Xcode.

When you finished your changes to the Template Project, you need **templatify** the Template Project by closing the Xcode and then run the following command:

```bash
gulp templatify
```

## Create New Template

Create **Cocoa Touch Framework** target in Xcode with following settings:

- Use `PROJECT_NAME` for **Product Name**
- Use `ORGANIZATION_NAME` for **Organization Name**
- Use `ORGANIZATION-ID` for **Organization Identifier**
- Do NOT select **Include Unit Tests**, see [reason]()


## Pass Tests

In order to archive best quality, generator-swift-framework has a lot of tests to pursue this goal. After changed the code, it's better to update the tests accordingly and have all tests passed with the following command:

```bash
npm test
```

## Code style

If you’re interested in contributing code, please have a look at our [style guide](http://standardjs.com/), which we try to match fairly closely.

If you have a case that is not covered in the style guide, simply do your best to match the style of the surrounding code.

**Thanks for contributing!**
