export default {
  roots: [
    "spec"
  ],
  transform: {
    "^.+\\.(js|ts)$": "babel-jest",
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
    "^@stores(.*)$": "<rootDir>/src/stores$1",
    "^@shared(.*)$": "<rootDir>/src/shared$1"
  },
  setupFilesAfterEnv: [
    "@testing-library/jest-dom/extend-expect"
  ],
  transformIgnorePatterns: [
    "node_modules/(?!(svelte-spa-router|svelte-i18n)/)"
  ]
}
