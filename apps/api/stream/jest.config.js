module.exports = {
  preset: "../../../jest.preset.js",
  coverageDirectory: "../../../coverage/apps/api/stream",
  globals: { "ts-jest": { tsConfig: "<rootDir>/tsconfig.spec.json" } },
  displayName: "api-stream","testEnvironment": "node"
};
