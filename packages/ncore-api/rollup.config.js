import typescript from '@rollup/plugin-typescript';

export default {
	input: './parser.ts',

	output: {
		sourcemap: true,
		dir: 'dist',
		format: 'cjs',
	},

	plugins: [ typescript() ]

};