![](https://badgen.net/badge/Editor.js/v2.0/blue)

# Blade Tool for Editor.js

Blade Tool for the [Editor.js](https://ifmo.su/editor).

## Installation

### Install via NPM

Get the package

```shell
npm i --save @editorjs/blade
```

Include module at your application

```javascript
const Blade = require('@editorjs/blade');
```

### Download to your project's source dir

1. Upload folder `dist` from repository
2. Add `dist/bundle.js` file to your page.

### Load from CDN

You can also load specific version of package from [jsDelivr CDN](https://www.jsdelivr.com/package/npm/@editorjs/blade).

`https://cdn.jsdelivr.net/npm/@editorjs/blade@1.0.0`

Then require this script on page with Editor.js.

```html
<script src="..."></script>
```

## Usage

Add a new Tool to the `tools` property of the Editor.js initial config.

```javascript
var editor = EditorJS({
  ...

  tools: {
    ...
    blade: {
      class: Blade,
      inlineToolbar: true,
    },
  }

  ...
});
```

## Config Params

The Blade Tool supports these configuration parameters:

| Field | Type     | Description        |
| ----- | -------- | ------------------ |
| placeholder | `string` | The placeholder. Will be shown only in the first paragraph when the whole editor is empty.  |
| preserveBlank | `boolean` | (default: `false`) Whether or not to keep blank paragraphs when saving editor data |

## Output data

| Field  | Type     | Description  |
| ------ | -------- |--------------|
| text   | `string` | blade's text |


```json
{
    "type" : "blade",
    "data" : {
        "text" : "Check out EditorJS projects on their <a href=\"https://github.com/codex-team\">GitHub page</a>.",
    }
}
```

