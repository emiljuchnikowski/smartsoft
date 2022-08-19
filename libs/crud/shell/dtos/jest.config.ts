/* eslint-disable */
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
  coverageDirectory: "../../../../coverage/libs/crud/shell/dtos",
  displayName: "crud-shell-dtos","testEnvironment": "node","preset": "../../../../jest.preset.ts"
};
