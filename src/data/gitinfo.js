const gitlog = require("gitlog").default;
const env = require("./env");
let details;

function getInfo(infoType) {
  if (env.IS_DEV) return "";

  if (details === undefined) {
    const options = {
      repo: `${__dirname}/../../.git`, // we're in /src/data/
      number: 1,
      nameStatus: false,
      fields: ["abbrevHash", "subject", "authorName", "authorDate"]
    };
    [details] = gitlog(options);
    // console.log(details);
  }
  return details[infoType];
}

function getLastModified(filePath) {
  // console.log(`getLastModified( ${filePath} )`);
  if (env.IS_DEV) return "";
  const options = {
    repo: `${__dirname}/../../.git`, // we're in /src/data/
    number: 1,
    nameStatus: false,
    fields: ["authorDate"],
    file: filePath
  };
  [details] = gitlog(options);

  if (details) {
    return details.authorDate;
  }
  // console.log("No gitlog authorDate found");
  return "";
}

module.exports = {
  abbrevHash: getInfo("abbrevHash"),
  authorDate: getInfo("authorDate"),
  authorName: getInfo("authorName"),
  subject: getInfo("subject"),
  lastModified: getLastModified
};
