import typescript from '@rollup/plugin-typescript';

import { peerDependencies } from './package.json';
const external = peerDependencies ? Object.keys(peerDependencies) : [];

// export default {
// 	input: 'src/parser.ts',

// 	output: {
// 		sourcemap: true,
// 		dir: 'dist',
// 		format: 'esm',
// 	},

// 	plugins: [ typescript() ]

// };


function getOptions(format, suffix = '', plugins = []) {
	/** @type {import('rollup').RollupOptions} */
	const options = {
		input: 'src/scraper.ts',
		external,
		output: {
			preserveModules: true,
			format,
			dir: 'dist',
			entryFileNames: `[name]${suffix}-[format].js`
		},
		plugins: [
			// nodeResolve(),
			typescript({
				include: 'src/**/*.ts'
			}),
			...plugins
		]
	};

	return options;
}

export default [
	getOptions('cjs'),
	getOptions('esm')
];