/* eslint-disable */
export default {
  setupFilesAfterEnv: ["<rootDir>/test-setup.ts"],
  globals: {},
  coverageDirectory: "../../../coverage/libs/shared/domain-core",
  displayName: "shared-domain-core",
  transform: { "^.+\\.(ts|js|html)$": "jest-preset-angular" },
  preset: "../../../jest.preset.js",
  /* TODO: Update to latest Jest snapshotFormat
   * By default Nx has kept the older style of Jest Snapshot formats
   * to prevent breaking of any existing tests with snapshots.
   * It's recommend you update to the latest format.
   * You can do this by removing snapshotFormat property
   * and running tests with --update-snapshot flag.
   * Example: From within the project directory, run "nx test --update-snapshot"
   * More info: https://jestjs.io/docs/upgrading-to-jest29#snapshot-format
   */
  snapshotFormat: { escapeString: true, printBasicPrototype: true },
};
