const isDev = process.env.APP_ENV === "development";
const path = require("path");
const fs = require("fs");

const manifestPath = path.resolve(
  __dirname,
  "..",
  "..",
  "public",
  "assets",
  "manifest.json"
);

const manifest = isDev
  ? {
      "main.js": "/assets/main.js",
      "styles.css": "/assets/styles.css",
      "offline.js": "/assets/offline.js",
      "notes.css": "/assets/notes.css"
    }
  : JSON.parse(fs.readFileSync(manifestPath, { encoding: "utf8" }));

function getDetails(data) {
  if (data === "notes") return manifest["notes.css"];
  if (data === "style") return manifest["styles.css"];
  if (manifest[data]) return manifest[data];
  return null;
}

function getAll() {
  return Object.values(manifest);
}

module.exports = {
  getAll() {
    return getAll();
  },
  getNotes() {
    return getDetails("notes");
  },
  getStyles() {
    return getDetails("style");
  },
  getScripts(which) {
    return getDetails(which);
  },
  path: manifestPath
};
