const images = require("../data/images");
const gitinfo = require("../data/gitinfo");

const isDev = process.env.APP_ENV === "development";

module.exports = {
  type: "other",
  permalink: "/{{title | slug}}/index.html",
  eleventyComputed: {
    banner: (data) => {
      return images[data.page.fileSlug];
    },
    isDev: () => {
      return isDev;
    },
    lastModified: (data) => {
      return gitinfo.lastModified(data.page.inputPath);
    }
  }
};
