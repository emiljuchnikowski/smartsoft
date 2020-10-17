const path = require("path");

// Export a function. Accept the base config as the only param.
module.exports = async ({ config, mode }) => {
  // `mode` has a value of 'DEVELOPMENT' or 'PRODUCTION'
  // You can change the configuration based on that.
  // 'PRODUCTION' is used when building the static version of storybook.

  // Make whatever fine-grained changes you need

  config.resolve.alias['styles'] =
      path.resolve(__dirname, "../libs/shared/angular/src/lib/styles");

  config.resolve.alias['theme'] =
      path.resolve(__dirname, "../apps/ui/test/src/theme");

  return config;
};
