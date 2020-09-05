module.exports = {
  name: "api-auth",
  preset: "../../../jest.config.js",
  coverageDirectory: "../../../coverage/apps/api/auth",
  globals: { "ts-jest": { tsConfig: "<rootDir>/tsconfig.spec.json" } },
};
