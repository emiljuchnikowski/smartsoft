module.exports = {
  preset: "../../../jest.preset.js",
  coverageDirectory: "../../../coverage/apps/api/crud",
  globals: { "ts-jest": { tsConfig: "<rootDir>/tsconfig.spec.json" } },
  displayName: "api-crud",
};
