/**
 * Generators
 * @see https://plopjs.com/documentation/#setgenerator
 */

const featureGenarator = require("./component/index.js");

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
module.exports = plop => {
  plop.setGenerator("features", featureGenarator);
  plop.addHelper("curly", (_, open) => (open ? "{" : "}"));
};
