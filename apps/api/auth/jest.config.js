module.exports = {
  preset: "../../../jest.preset.js",
  coverageDirectory: "../../../coverage/apps/api/auth",
  globals: { "ts-jest": { tsConfig: "<rootDir>/tsconfig.spec.json" } },
  displayName: "api-auth",
};
