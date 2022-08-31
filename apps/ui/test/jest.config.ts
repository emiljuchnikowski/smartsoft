/* eslint-disable */
export default {
  
  coverageDirectory: "../../../coverage/apps/ui/test",
  snapshotSerializers: ["jest-preset-angular/build/serializers/no-ng-attributes","jest-preset-angular/build/serializers/ng-snapshot","jest-preset-angular/build/serializers/html-comment"],
  setupFilesAfterEnv: ["<rootDir>/src/test-setup.ts"],
  globals: {
    "ts-jest": {
      tsConfig: "<rootDir>/tsconfig.spec.json",
      stringifyContentPathRegex: "\\.(html|svg)$",
      
    },
  },
  displayName: "ui-test","transform": {"^.+\\.(ts|js|html)$":"jest-preset-angular"},"preset": "../../../jest.preset.js"
};
