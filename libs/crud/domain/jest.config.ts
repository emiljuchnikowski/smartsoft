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
  coverageDirectory: "../../../coverage/libs/crud/domain",
  displayName: "crud-domain","testEnvironment": "node","preset": "../../../jest.preset.ts"
};
