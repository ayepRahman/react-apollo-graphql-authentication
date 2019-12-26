/**
 * features Generator
 *
 * @see https://plopjs.com/documentation/#setgenerator
 */

const featuresExists = require('../utils/featuresExists.js');

module.exports = {
  description: 'Add a feature',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'What should it be called?',
      default: 'user',
      validate: value => {
        if (/.+/.test(value)) {
          return featuresExists(value) ? 'A feature with this name already exists' : true;
        }

        return 'The name is required';
      },
    },
    {
      type: 'confirm',
      name: 'wantQuery',
      default: true,
      message: 'Do you want to add graphql Query?',
    },
    {
      type: 'confirm',
      name: 'wantMutation',
      default: true,
      message: 'Do you want to add graphql Mutation?',
    },
    // {
    //   type: "confirm",
    //   name: "wantSubscription",
    //   default: true,
    //   message: "Do you want to add graphql Subscription?"
    // }
  ],
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  actions: data => {
    const actions = [
      {
        type: 'add',
        path: '../src/features/{{camelCase name}}/model.ts',
        templateFile: './features/model.ts.hbs',
        abortOnFail: true,
      },
      {
        type: 'add',
        path: '../src/features/{{camelCase name}}/schema.ts',
        templateFile: './features/schema.ts.hbs',
        abortOnFail: true,
      },
      {
        type: 'add',
        path: '../src/features/{{camelCase name}}/typeDefs.ts',
        templateFile: './features/typeDefs.ts.hbs',
        abortOnFail: true,
      },
      {
        type: 'add',
        path: '../src/features/{{camelCase name}}/resolvers/index.ts',
        templateFile: './features/index.ts.hbs',
        abortOnFail: true,
      },
      {
        type: 'add',
        path: '../src/features/{{camelCase name}}/resolvers/__test__/index.ts',
        abortOnFail: true,
      },
    ];

    if (data.wantQuery) {
      actions.push({
        type: 'add',
        path: '../src/features/{{camelCase name}}/resolvers/queries.ts',
        templateFile: './features/queries.ts.hbs',
        abortOnFail: true,
      });
    }

    if (data.wantMutation) {
      actions.push({
        type: 'add',
        path: '../src/features/{{camelCase name}}/resolvers/mutations.ts',
        templateFile: './features/mutations.ts.hbs',
        abortOnFail: true,
      });
    }

    actions.push({
      type: 'modify',
      path: `../src/features/rootModels.ts`,
      pattern: '/* CODE-GENERATOR - ROOTMODELS IMPORT */',
      templateFile: './features/root-models-import.hbs',
      abortOnFail: true,
    });

    actions.push({
      type: 'modify',
      path: `../src/features/rootModels.ts`,
      pattern: '/* CODE-GENERATOR - ROOTMODELS DEFAULT */',
      templateFile: './features/root-models-default.hbs',
      abortOnFail: true,
    });

    actions.push({
      type: 'modify',
      path: `../src/features/rootSchema.ts`,
      pattern: '/* CODE-GENERATOR - ROOTSCHEMA IMPORT */',
      templateFile: './features/root-schema-import.hbs',
      abortOnFail: true,
    });

    actions.push({
      type: 'modify',
      path: `../src/features/rootSchema.ts`,
      pattern: '/* CODE-GENERATOR - ROOTSCHEMA DEFAULT */',
      templateFile: './features/root-schema-default.hbs',
      abortOnFail: true,
    });

    return actions;
  },
};
