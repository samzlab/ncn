import typescript from '@rollup/plugin-typescript';

import { peerDependencies } from './package.json';
const external = peerDependencies ? Object.keys(peerDependencies) : [];

function getOptions(format, suffix = '', plugins = []) {
	/** @type {import('rollup').RollupOptions} */
	const options = {
		input: 'src/index.ts',
		external,
		output: {
			preserveModules: true,
			format,
			dir: 'dist',
			//entryFileNames: `[name]${suffix}-[format].js`
			entryFileNames: `[name]${suffix}.js`
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
	// getOptions('cjs'),
	getOptions('esm')
];