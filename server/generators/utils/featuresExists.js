/**
 * featuresExists
 *
 * Check whether the given feature exist in the directory
 */

const fs = require("fs");
const path = require("path");
const pageFeatures = fs.readdirSync(path.join(__dirname, "../../src/features"));

module.exports = ft => {
  return pageFeatures.indexOf(ft) >= 0;
};
