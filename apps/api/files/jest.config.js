module.exports = {
  name: "api-files",
  preset: "../../../jest.config.js",
  coverageDirectory: "../../../coverage/apps/api/files",
  globals: { "ts-jest": { tsConfig: "<rootDir>/tsconfig.spec.json" } },
};
