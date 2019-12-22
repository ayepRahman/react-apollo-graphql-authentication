/**
 * Container Generator
 *
 * @see https://plopjs.com/documentation/#setgenerator
 */

const componentExists = require('../utils/componentExists.js');

module.exports = {
  description: 'Add a container component',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'What should it be called?',
      default: 'Form',
      validate: value => {
        if (/.+/.test(value)) {
          return componentExists(value)
            ? 'A component or container with this name already exists'
            : true;
        }

        return 'The name is required';
      },
    },
    {
      type: 'confirm',
      name: 'wantUseQuery',
      default: true,
      message: 'Do you want to useQuery? *Execute query when your component renders',
    },
    {
      type: 'confirm',
      name: 'wantUseLazyQuery',
      default: true,
      message:
        'Do you want to useLazyQuery? *Return a function that you can call whenever you want to execute a query',
    },
    {
      type: 'confirm',
      name: 'wantUseMutation',
      default: true,
      message:
        'Do you want to useMutation? *Return a function that you can call whenever you want to execute a mutation',
    },
    {
      type: 'confirm',
      name: 'wantUseSubscription',
      default: true,
      message:
        'Do you want to useSubscription? *Subscriptions are a way to push data from the server to the clients that choose to listen to real time messages from the server.',
    },
    {
      type: 'confirm',
      name: 'wantFormHooks',
      default: true,
      message: 'Do you want to add react-hooks-form for form handler?',
    },
    {
      type: 'confirm',
      name: 'wantRouteHooks',
      default: true,
      message: 'Do you want to add react router dom hooks for declarative routing?',
    },
    {
      type: 'confirm',
      name: 'wantStyledComponents',
      default: true,
      message: 'Do you want to add styled components?',
    },
  ],
  actions: data => {
    const actions = [
      {
        type: 'add',
        path: '../src/app/containers/{{properCase name}}/index.tsx',
        templateFile: './container/index.tsx.hbs',
        abortOnFail: true,
      },
      {
        type: 'add',
        path: '../src/app/containers/{{properCase name}}/interfaces/index.tsx',
        templateFile: './container/interfaces.tsx.hbs',
        abortOnFail: true,
      },
      {
        type: 'add',
        path: '../src/app/containers/{{properCase name}}/gql.tsx',
        templateFile: './container/gql.tsx.hbs',
        abortOnFail: true,
      },
      {
        type: 'add',
        path: '../src/app/containers/{{properCase name}}/__tests__/index.test.tsx',
        templateFile: './container/test.tsx.hbs',
        abortOnFail: true,
      },
    ];

    if (data.wantFormHooks) {
      actions.push({
        type: 'add',
        path: '../src/app/containers/{{properCase name}}/validations.tsx',
        templateFile: './container/validations.tsx.hbs',
        abortOnFail: true,
      });

      actions.push({
        type: 'add',
        path: '../src/app/containers/{{properCase name}}/enumerations/index.tsx',
        templateFile: './container/enumerations.tsx.hbs',
        abortOnFail: true,
      });
    }

    return actions;
  },
};
