/**
 * Generators
 * @see https://plopjs.com/documentation/#setgenerator
 */

const componentGenerator = require('./component/index.js');
const containerGenerator = require('./container/index.js');

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
module.exports = plop => {
  plop.setGenerator('component', componentGenerator);
  plop.setGenerator('container', containerGenerator);
  plop.addHelper('curly', (_, open) => (open ? '{' : '}'));
};
