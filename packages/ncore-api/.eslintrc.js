export default {
	parserOptions: {
		ecmaVersion: 2020, // 11
		sourceType: 'module'
	},
	env: {
		node: true,
		es6: true
	},
    extends: [
      // add more generic rulesets here, such as:
      // 'eslint:recommended',
      'plugin:vue/vue3-recommended'
    ],
    rules: {
      // override/add rules settings here, such as:
      // 'vue/no-unused-vars': 'error'
      'vue/no-multiple-template-root': 'off',
	  'vue/valid-template-root': 'off',
	  'vue/script-indent': [ "error", 4, {"baseIndent": 1} ],
	  'vue/html-indent': [ "error", 4, {"baseIndent": 1} ],
	  'vue/max-attributes-per-line': 'off'
    }
  }