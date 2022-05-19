export default {
  
  globals: {
    "ts-jest": {
      tsConfig: "<rootDir>/tsconfig.spec.json",
    },
  },
  transform: {
    "^.+\\.[tj]sx?$": "ts-jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  coverageDirectory: "../../../../coverage/libs/crud/shell/nestjs",
  displayName: "crud-shell-nestjs","testEnvironment": "node","preset": "../../../../jest.preset.ts"
};
