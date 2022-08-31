/* eslint-disable */
export default {
  
  transform: {
    "^.+\\.[tj]sx?$": "ts-jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "html"],
  coverageDirectory: "../../../../coverage/libs/stream/shell/app-services",
  globals: { "ts-jest": { tsConfig: "<rootDir>/tsconfig.spec.json" } },
  displayName: "stream-shell-app-services","testEnvironment": "node","preset": "../../../../jest.preset.js"
};
