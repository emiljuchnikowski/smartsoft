const rootWebpackConfig = require("../../../../.storybook/webpack.config");
const path = require("path");
module.exports = {
  stories: ["../src/lib/**/*.stories.mdx", "../src/lib/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-essentials"],
  webpackFinal: async (config, {
    configType
  }) => {
    // config.module.rules.push({
    //   test: /\,css&/,
    //   use: [
    //     {
    //       loader: "postcss-loader",
    //       options: {
    //         ident: "postcss",
    //         plugins: [require("tailwindcss"), require("autoprefixer")],
    //       },
    //     },
    //   ],
    //   include: path.resolve(__dirname, "../"),
    // });

    // apply any global webpack configs that might have been specified in .storybook/main.js

    // for backwards compatibility call the `rootWebpackConfig`
    // this can be removed once that one is migrated fully to
    // use the `webpackFinal` property in the `main.js` file
    config = rootWebpackConfig({
      config
    });

    // add your own webpack tweaks if needed

    return config;
  },
  framework: {
    name: "@storybook/angular",
    options: {}
  },
  docs: {
    autodocs: true
  }
};