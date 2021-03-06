export default {
  roots: [
    "spec"
  ],
  transform: {
    "^.+\\.(js|ts)$": "esbuild-jest",
    "^.+\\.svelte$": [
      "svelte-jester",
      {
        "preprocess": true
      }
    ]
  },
  moduleFileExtensions: [
    "js",
    "ts",
    "svelte"
  ],
  moduleDirectories: [
    "node_modules",
    "src"
  ],
  moduleNameMapper: {
    "^\\$lib(.*)$": "<rootDir>/src/lib$1",
    "^\\$app(.*)$": ["<rootDir>/.svelte-kit/dev/runtime/app$1", "<rootDir>/.svelte-kit/build/runtime/app$1"],
    ".+\\.(svg|png|jpg)$": "identity-obj-proxy"
  },
  setupFilesAfterEnv: [
    "@testing-library/jest-dom/extend-expect"
  ],
  transformIgnorePatterns: [
    "node_modules/(?!(svelte-spa-router|svelte-i18n)/)"
  ]
}
