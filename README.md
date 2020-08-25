# Styled Theme Generator

Figma plugin that generates a CSS in JS theme from your document's text and color styles, or lets you import a theme to generate Figma styles.

## What does it do?

> **Figma Styles** ♻️ **CSS in JS Theme**

This plugin can **generate a CSS in JS theme file** (according to [the System UI specification](https://system-ui.com/theme)) from your Figma document's color and text styles. It parses all the styles and generates a JSON object you can use in your CSS in JS theme file. This way you can take your design to code and remove a layer of translation between designers and developers.

This plugin can **generate Figma styles** from a CSS in JS theme file. It makes it easy to import pre-existing themes from CSS in JS libraries, eliminate the boilerplate of setting up a Figma style guide, and get to prototyping faster.

## Development

This project uses Webpack to compile the Typescript files into JavaScript files, as well as copy over any other files (like HTML).

### Getting Started

1. Install dependencies: `yarn` or `npm i`
2. Run `yarn start` to start Webpack in "watch" mode.
3. Open Figma and import the plugin's `manifest.json` file.

To run the plugin, go to the Figma desktop app and find the plugin in the top menu (Plugins > Development > styled-theme-generator).

Any time you make changes: make sure Webpack has built new `/dist` files, close the plugin window, and run the plugin again in Figma (Run Last Plugin or run plugin directly).

## Generating Styles

1. Make sure you have text or color styles available in your file.
1. Run the plugin.
1. Click the Generate button.

The JSON will be copied to your clipboard, but you can manually copy it from the textbox inside the plugin window.

### Importing Styles

You can import any text or color styles that are structured appropriately in JSON. Here is an example of the structure:

```json
{
  "text": {
    "header.h1": {
      "name": "Header/H1",
      "fontFamily": "roboto",
      "fontWeight": "Bold",
      "fontSize": 11,
      "letterSpacing": {
        "unit": "PERCENT",
        "value": 0
      },
      "lineHeight": {
        "unit": "PERCENT",
        "value": 129.99999523162842
      },
      "textCase": "ORIGINAL",
      "textDecoration": "NONE"
    }
  },
  "colors": {
    "Light Blue": "#e6f7ff",
    "Blue": "#bae7ff"
  }
}
```

> The colors object supports deep nested values, allowing you to create "grouped" color styles like `Blue/500`. The color object would look like: `colors: { "Blue" : { "500": "#e6f7ff" } }`.

### Figma Guide

You can find more information about Figma's plugin setup here:

https://www.figma.com/plugin-docs/setup/

# Credits / Shoutout

- [Diez CLI](https://github.com/diez/diez/blob/7c224a3cb8d66262191da3aef12a1a4144bc39bc/src/extractors/extractors/src/extractors/figma.ts)
- [Figma Plugin DS](https://github.com/thomas-lowry/figma-plugin-ds) by @thomas-lowry
- [deepmerge](https://github.com/TehShrike/deepmerge)
