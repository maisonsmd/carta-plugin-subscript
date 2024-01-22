import type { CartaExtension } from 'carta-md';
import type { TokenizerAndRendererExtension } from 'marked';

import SubscriptIcon from './icons/SubscriptIcon.svelte';
import SupscriptIcon from './icons/SupscriptIcon.svelte';

export const subscript = (): CartaExtension => {
	return {
		markedExtensions: [
			{
				extensions: [subscriptTokenizerAndRenderer(), supercriptTokenizerAndRenderer()],
			},
		],
		highlightRules: [
			{
				type: 'str',
				match: /(?<!~)~[^~ ]+~(?!~)/g,
			},
			{
				type: 'str',
				match: /(?<!\^)\^[^\^ ]+\^(?!\^)/g,
			},
		],
		icons: [
			{
				id: 'subscript',
				action: (input) => input.toggleSelectionSurrounding('~'),
				label: 'Subscript',
				component: SubscriptIcon,
			},
			{
				id: 'supscript',
				action: (input) => input.toggleSelectionSurrounding('^'),
				label: 'Supscript',
				component: SupscriptIcon,
			},
		],
	};
};

function subscriptTokenizerAndRenderer(): TokenizerAndRendererExtension {
	return {
		name: 'sub',
		level: 'inline',
		start(src) {
			return src.match(/(?<!~)~([^~ ]+)~(?!~)/)?.index;
		},
		tokenizer: (src) => {
			const match = src.match(/^(?<!~)~([^~ ]+)~(?!~)/);

			if (!match) {
				return undefined;
			}

			return {
				type: 'sub',
				raw: match[0],
				text: match[1].trim(),
			};
		},
		renderer(token) {
			return `<sub>${token.text}</sub>`;
		},
	};
}

function supercriptTokenizerAndRenderer(): TokenizerAndRendererExtension {
	return {
		name: 'super',
		level: 'inline',
		start(src) {
			return src.match(/(?<!\^)\^([^\^ ]+)\^(?!\^)/)?.index;
		},
		tokenizer(src) {
			const match = src.match(/^(?<!\^)\^([^\^ ]+)\^(?!\^)/);

			if (!match) {
				return undefined;
			}

			return {
				type: 'super',
				raw: match[0],
				text: match[1].trim(),
			};
		},
		renderer(token) {
			return `<sup>${token.text}</sup>`;
		},
	};
}
