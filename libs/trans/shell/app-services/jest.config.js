module.exports = {
  name: "trans-shell-app-services",
  preset: "../../../../jest.config.js",
  transform: {
    "^.+\\.[tj]sx?$": "ts-jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "html"],
  coverageDirectory: "../../../../coverage/libs/trans/shell/app-services",
  globals: { "ts-jest": { tsConfig: "<rootDir>/tsconfig.spec.json" } },
};
