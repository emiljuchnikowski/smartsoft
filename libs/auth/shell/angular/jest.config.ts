/* eslint-disable */
export default {
  
  globals: {
    "ts-jest": {
      tsConfig: "<rootDir>/tsconfig.spec.json",
      stringifyContentPathRegex: "\\.(html|svg)$",
      
    },
  },
  coverageDirectory: "../../../../coverage/libs/auth/shell/angular",
  snapshotSerializers: ["jest-preset-angular/build/serializers/no-ng-attributes","jest-preset-angular/build/serializers/ng-snapshot","jest-preset-angular/build/serializers/html-comment"],
  displayName: "auth-shell-angular","transform": {"^.+\\.(ts|js|html)$":"jest-preset-angular"},"preset": "../../../../jest.preset.js"
};
