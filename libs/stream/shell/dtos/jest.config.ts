export default {
  
  transform: {
    "^.+\\.[tj]sx?$": "ts-jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "html"],
  coverageDirectory: "../../../../coverage/libs/stream/shell/dtos",
  globals: { "ts-jest": { tsConfig: "<rootDir>/tsconfig.spec.json" } },
  displayName: "stream-shell-dtos","preset": "../../../../jest.preset.ts"
};
