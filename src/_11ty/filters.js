const slugify = require("slugify");
const CleanCSS = require("clean-css");
const { DateTime } = require("luxon");
const markdownLib = require("./markdownLib");
const htmlmin = require("./minify-html");

function clean(post) {
  // this is filtering the HTML, not the markdown
  let content = post.replace(/(<([^>]+)>)/gi, ""); // remove tags
  content = content.replace("tl;dr", ""); // remove tl;dr
  content = content.replace(/(\[\d\])/g, ""); // remove any footnote remnants
  return content;
}

// Already in eleventy-base-blog
module.exports = {
  readableDateFromISO: (dateStr, formatStr = "dd LLL yyyy 'at' hh:mma") => {
    return DateTime.fromISO(dateStr).toFormat(formatStr);
  },

  cssmin: (code) => {
    return new CleanCSS({}).minify(code).styles;
  },

  jsonpath: (url) => {
    const parts = url.split("/");
    const filename = parts[parts.length - 2];
    return `/json/${filename}.json`;
  },

  htmlmin: (code) => {
    return htmlmin.minify(code);
  },

  excerpt: (post) => {
    const content = clean(post);
    return `${content.substr(0, content.lastIndexOf(" ", 200))}...`;
  },

  jsonmin: (input) => {
    return JSON.stringify(JSON.parse(input));
  },

  wordCount: (post) => {
    // this is filtering the HTML, not the markdown
    const content = clean(post);
    return content.split(" ").length;
  },

  readableDate: (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat(
      "dd LLL yyyy"
    );
  },

  readableDateTime: (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat(
      "dd LLL yyyy, HH:mm"
    );
  },

  ms: (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toMillis();
  },

  nbsp: (data) => {
    return data.split(" ").join("&nbsp;");
  },

  htmlDateString: (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("yyyy-LL-dd");
  },

  head: (array, n) => {
    if (n < 0) {
      return array.slice(n);
    }
    return array.slice(0, n);
  },

  pageTags: (tags) => {
    const generalTags = ["all", "nav", "post", "posts"];

    return tags
      .toString()
      .split(",")
      .filter((tag) => {
        return !generalTags.includes(tag);
      });
  },

  slug: (str) => {
    return slugify(str, {
      replacement: "-",
      // the default slugify filter doesn't remove these characters
      remove: /[&,+()$~%.'":*?<>{}!]/g,
      lower: true
    });
  },

  markdownify: (string) => {
    return markdownLib.getMarkdownLib().render(string);
  }
};
