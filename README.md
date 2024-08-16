![carta-plugin-subscript](https://img.shields.io/npm/v/carta-plugin-subscript)

# carta-plugin-subscript

This plugin adds ability to render subscripts and superscripts to [Carta](https://github.com/BearToCode/carta).

## New in v2

- Support Carta v4
- This plugin is now just a wrapper of [remark-supersub](https://www.npmjs.com/package/remark-supersub)

## Installation

```shell
npm i carta-plugin-subscript
```

## Setup

### Extension

```svelte
<script>
	import { Carta, MarkdownEditor } from 'carta-md';
	import { subscript } from 'carta-plugin-subscript';

	const carta = new Carta({
		extensions: [subscript()],
		gfmOptions: {
			// remark-gfm that Carta uses convert single tilde to strikethrough, disable that to use single tilde for subscript.
			// see https://stackoverflow.com/a/78076200/7884074
			singleTilde: false,
		},
	});
</script>

<MarkdownEditor {carta} />
```

## Usage

This snippet:

```
H~2~O, CO~2~ and CH~4~ are greenhouse gases.
In the 19^th^ century, the concentration of CO~2~ was 280 ppm.
```

will generate this output:

![output](./static/output.png)
