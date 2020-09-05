module.exports = {
  name: "trans-shell-dtos",
  preset: "../../../../jest.config.js",
  transform: {
    "^.+\\.[tj]sx?$": "ts-jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "html"],
  coverageDirectory: "../../../../coverage/libs/trans/shell/dtos",
  globals: { "ts-jest": { tsConfig: "<rootDir>/tsconfig.spec.json" } },
};
