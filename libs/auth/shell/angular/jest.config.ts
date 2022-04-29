module.exports = {
  
  globals: {
    "ts-jest": {
      tsConfig: "<rootDir>/tsconfig.spec.json",
      stringifyContentPathRegex: "\\.(html|svg)$",
      
    },
  },
  coverageDirectory: "../../../../coverage/libs/auth/shell/angular",
  snapshotSerializers: [
    "jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js",
    "jest-preset-angular/build/AngularSnapshotSerializer.js",
    "jest-preset-angular/build/HTMLCommentSerializer.js",
  ],
  displayName: "auth-shell-angular","transform": {"^.+\\.(ts|js|html)$":"jest-preset-angular"},"preset": "../../../../jest.preset.ts"
};
