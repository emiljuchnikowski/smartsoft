export default {
  
  transform: {
    "^.+\\.[tj]sx?$": "ts-jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "html"],
  coverageDirectory: "../../../../coverage/libs/shared/files/nestjs",
  globals: { "ts-jest": { tsConfig: "<rootDir>/tsconfig.spec.json" } },
  displayName: "shared-files-nestjs","preset": "../../../../jest.preset.ts"
};
