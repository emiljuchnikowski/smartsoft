module.exports = {
  testMatch: ["**/+(*.)+(spec|test).+(ts|js)?(x)"],
  transform: {
    "^.+\\.(ts|js|html)$": "ts-jest"
  },
  resolver: "@nrwl/jest/plugins/resolver",
  moduleFileExtensions: ["ts", "js", "html"],
  coverageReporters: ["html"],
  passWithNoTests: true,
  setupFiles: [
    "mock-local-storage"
  ],
  "setupFilesAfterEnv": [  "<rootDir>/test-setup.ts" ],
  "moduleNameMapper": {
    "^lodash-es$": "lodash"
  },
  "globals": {
    "ts-jest": {
      diagnostics: false,
      "stringifyContentPathRegex": "\\.html$",
      "astTransformers": [
        "jest-preset-angular/build/InlineFilesTransformer",
        "jest-preset-angular/build/StripStylesTransformer"
      ]
    }
  }
};
