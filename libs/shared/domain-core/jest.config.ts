/* eslint-disable */
export default {
  
  setupFilesAfterEnv: ["<rootDir>/test-setup.ts"],
  globals: {
    "ts-jest": {
      tsConfig: "<rootDir>/tsconfig.spec.json",
      stringifyContentPathRegex: "\\.(html|svg)$",
      
    },
  },
  coverageDirectory: "../../../coverage/libs/shared/domain-core",
  displayName: "shared-domain-core","transform": {"^.+\\.(ts|js|html)$":"jest-preset-angular"},"preset": "../../../jest.preset.js"
};
