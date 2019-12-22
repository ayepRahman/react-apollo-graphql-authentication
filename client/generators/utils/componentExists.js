/**
 * componentExists
 *
 * Check whether the given component exist in either the components or containers directory
 */

const fs = require('fs');
const path = require('path');
const pageComponents = fs.readdirSync(path.join(__dirname, '../../src/app/components'));
const pageContainers = fs.readdirSync(path.join(__dirname, '../../src/app/containers'));
const components = pageComponents.concat(pageContainers);

module.exports = comp => {
  return components.indexOf(comp) >= 0;
};
