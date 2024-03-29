const autoprefixer = require("autoprefixer");
const postcssPresetEnv = require("postcss-preset-env");
const atImport = require("postcss-import");
const postcssColorMod = require("postcss-color-mod-function");

const plugins = [
  atImport,
  autoprefixer,
  postcssPresetEnv({
    stage: 1,
    preserve: true,
    features: {
      "custom-properties": true
    }
  }),
  postcssColorMod
];

const isDev = process.env.APP_ENV === "development";

if (!isDev) {
  const cssnano = require("cssnano");
  const purgecss = require("@fullhuman/postcss-purgecss");

  [].push.apply(plugins, [
    purgecss({
      content: ["src/**/*.njk", "src/**/*.md", "src/**/*.js", "src/**/*.ejs"],
      defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || []
    }),
    cssnano({
      preset: "default"
    })
  ]);
}

module.exports = { plugins };
