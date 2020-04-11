module.exports = {
  name: "shared-files-nestjs",
  preset: "../../../../jest.config.js",
  transform: {
    "^.+\\.[tj]sx?$": "ts-jest"
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "html"],
  coverageDirectory: "../../../../coverage/libs/shared/files/nestjs"
};
