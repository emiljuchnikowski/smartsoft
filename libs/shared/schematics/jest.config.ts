/* eslint-disable */
export default {
  displayName: "shared-schematics",
  
  globals: {
    "ts-jest": {
      tsConfig: "<rootDir>/tsconfig.spec.json",
    },
  },
  transform: {
    "^.+\\.[tj]sx?$": "ts-jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  coverageDirectory: "../../../coverage/libs/shared/schematics","testEnvironment": "node","preset": "../../../jest.preset.js"
};
