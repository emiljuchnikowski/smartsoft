/* eslint-disable */
export default {
  
  setupFilesAfterEnv: ["<rootDir>/test-setup.ts"],
  globals: {
    "ts-jest": {
      tsConfig: "<rootDir>/tsconfig.spec.json",
      stringifyContentPathRegex: "\\.(html|svg)$",
      
    },
  },
  coverageDirectory: "../../../coverage/libs/shared/users",
  snapshotSerializers: [
    "jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js",
    "jest-preset-angular/build/AngularSnapshotSerializer.js",
    "jest-preset-angular/build/HTMLCommentSerializer.js",
  ],
  displayName: "shared-users","transform": {"^.+\\.(ts|js|html)$":"jest-preset-angular"},"preset": "../../../jest.preset.ts"
};
