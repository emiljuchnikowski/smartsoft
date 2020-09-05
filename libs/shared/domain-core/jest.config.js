module.exports = {
  name: "shared-domain-core",
  preset: "../../../jest.config.js",
  transform: {
    "^.+\\.[tj]sx?$": "ts-jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "html"],
  coverageDirectory: "../../../coverage/libs/shared/domain-core",
  globals: { "ts-jest": { tsConfig: "<rootDir>/tsconfig.spec.json" } },
};
