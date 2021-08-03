module.exports = {
	root: true,
	parser: "@typescript-eslint/parser",
	extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
	plugins: ["svelte3", "@typescript-eslint"],
	ignorePatterns: ["*.cjs", "*.spec.js"],
	overrides: [{ files: ["*.svelte"], processor: "svelte3/svelte3" }],
	settings: {
		"svelte3/typescript": () => require("typescript"),
		"svelte3/ignore-styles": () => true
	},
	parserOptions: {
		sourceType: "module",
		ecmaVersion: 2019
	},
	env: {
		browser: true,
		es2017: true,
		node: true
	},
	plugins: [
    "svelte3"
  ],
  overrides: [
    {
      files: [
        "*.svelte"
      ],
      processor: "svelte3/svelte3"
    }
  ],
  rules: {
    "semi": [
      "error",
      "never"
    ],
    "quotes": [
      "error",
      "double"
    ],
    "comma-spacing": [
      "error"
    ],
    "comma-dangle": [
      "error",
      "never"
    ],
    "no-trailing-spaces": [
      "error",
      {
        "skipBlankLines": true
      }
    ],
    "space-before-function-paren": [
      "error",
      "never"
    ],
    "no-var": [
      "error"
    ],
    "prefer-const": [
      "error"
    ],
    "arrow-spacing": [
      "error",
      {
        "before": true,
        "after": true
      }
    ],
    "template-curly-spacing": [
      "error",
      "always"
    ]
  }
};
