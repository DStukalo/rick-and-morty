module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		"airbnb",
		"airbnb/hooks",
		"eslint:recommended",
		"plugin:react/recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:react/jsx-runtime",
	],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: "latest",
		sourceType: "module",
	},
	plugins: ["react", "@typescript-eslint"],
	rules: {
		"no-tabs": 0,
		"react/jsx-indent": [
			2,
			"tab",
			{ checkAttributes: false, indentLogicalExpressions: true },
		],
		"react/jsx-indent-props": [2, "tab"],
		"react/jsx-filename-extension": [
			2,
			{
				extensions: [".js", "jsx", ".ts", ".tsx"],
			},
		],
		"import/extensions": [
			2,
			"ignorePackages",
			{
				js: "never",
				jsx: "never",
				ts: "never",
				tsx: "never",
			},
		],
		"import/prefer-default-export": "off",
		"no-plusplus": ["error", { allowForLoopAfterthoughts: true }],

		indent: ["error", "tab"],
		"linebreak-style": ["error", "unix"],
		quotes: ["error", "single"],
		semi: ["error", "always"],
	},
	settings: {
		"import/resolver": {
			typescript: {},
		},
	},
};
