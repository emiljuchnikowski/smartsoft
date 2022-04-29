module.exports = {
  
  globals: {
    "ts-jest": {
      tsConfig: "<rootDir>/tsconfig.spec.json",
    },
  },
  transform: {
    "^.+\\.[tj]sx?$": "ts-jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  coverageDirectory: "../../../../coverage/libs/crud/shell/app-services",
  displayName: "crud-shell-app-services","testEnvironment": "node","preset": "../../../../jest.preset.ts"
};
