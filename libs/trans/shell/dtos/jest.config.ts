export default {
  displayName: "trans-shell-dtos",
  
  globals: {
    "ts-jest": {
      tsConfig: "<rootDir>/tsconfig.spec.json",
    },
  },
  testEnvironment: "node",
  transform: {
    "^.+\\.[tj]sx?$": "ts-jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  coverageDirectory: "../../../../coverage/libs/trans/shell/dtos","preset": "../../../../jest.preset.ts"
};
