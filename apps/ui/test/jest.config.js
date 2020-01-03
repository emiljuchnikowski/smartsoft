module.exports = {
  name: "ui-test",
  preset: "../../../jest.config.js",
  coverageDirectory: "../../../coverage/apps/ui/test",
  snapshotSerializers: [
    "jest-preset-angular/AngularSnapshotSerializer.js",
    "jest-preset-angular/HTMLCommentSerializer.js"
  ]
};
