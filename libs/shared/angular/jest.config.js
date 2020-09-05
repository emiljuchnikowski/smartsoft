module.exports = {
  name: "shared-angular",
  preset: "../../../jest.config.js",
  transform: {
    "^.+\\.[tj]sx?$": "ts-jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "html"],
  coverageDirectory: "../../../coverage/libs/shared/angular",
  globals: { "ts-jest": { tsConfig: "<rootDir>/tsconfig.spec.json" } },
};
