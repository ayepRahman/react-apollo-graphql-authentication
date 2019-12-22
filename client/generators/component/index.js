/**
 * Component Generator
 *
 * @see https://plopjs.com/documentation/#setgenerator
 */

const componentExists = require('../utils/componentExists.js');

module.exports = {
  description: 'Add an unconnected component',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'What should it be called?',
      default: 'Button',
      validate: value => {
        if (/.+/.test(value)) {
          return componentExists(value)
            ? 'A component or container with this name already exists'
            : true;
        }

        return 'The name is required';
      },
    },
  ],
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  actions: () => {
    const actions = [
      {
        type: 'add',
        path: '../src/app/components/{{properCase name}}/index.tsx',
        templateFile: './component/index.tsx.hbs',
        abortOnFail: true,
      },
      {
        type: 'add',
        path: '../src/app/components/{{properCase name}}/__tests__/index.test.tsx',
        templateFile: './component/test.tsx.hbs',
        abortOnFail: true,
      },
    ];

    return actions;
  },
};
