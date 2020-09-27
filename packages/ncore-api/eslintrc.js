module.exports = {
	parserOptions: {
		ecmaVersion: 2020, // 11
		sourceType: 'module'
	},
	env: {
		browser: true,
		es6: true
	},
	extends: [
		// add more generic rulesets here, such as:
		// 'eslint:recommended',
		'@koffeine'
	],
	rules: {
		'no-bitwise': 'off',
		'func-style': 'off'
	}
};