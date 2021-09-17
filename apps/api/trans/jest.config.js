module.exports = {
  preset: "../../../jest.preset.js",
  coverageDirectory: "../../../coverage/apps/api/trans",
  globals: { "ts-jest": { tsConfig: "<rootDir>/tsconfig.spec.json" } },
  displayName: "api-trans","testEnvironment": "node"
};
