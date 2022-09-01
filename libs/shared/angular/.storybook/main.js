const rootMain = require("../../../../.storybook/main");
const rootWebpackConfig = require("../../../../.storybook/webpack.config");
const path = require("path");

module.exports = {
  ...rootMain,

  core: { ...rootMain.core, builder: "webpack5" },

  stories: [
    ...rootMain.stories,
    "../src/lib/**/*.stories.mdx",
    "../src/lib/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: [...rootMain.addons],
  webpackFinal: async (config, { configType }) => {
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
    if (rootMain.webpackFinal) {
      config = await rootMain.webpackFinal(config, { configType });
    }

    // for backwards compatibility call the `rootWebpackConfig`
    // this can be removed once that one is migrated fully to
    // use the `webpackFinal` property in the `main.js` file
    config = rootWebpackConfig({ config });

    // add your own webpack tweaks if needed

    return config;
  },
};
