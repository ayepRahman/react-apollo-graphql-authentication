/**
 * Component Generator
 *
 * @see https://plopjs.com/documentation/#setgenerator
 */

const featuresExists = require("../utils/featuresExists.js");

module.exports = {
  description: "Add a feature",
  prompts: [
    {
      type: "input",
      name: "name",
      message: "What should it be called?",
      default: "user",
      validate: value => {
        if (/.+/.test(value)) {
          return featuresExists(value)
            ? "A feature with this name already exists"
            : true;
        }

        return "The name is required";
      }
    },
    {
      type: "confirm",
      name: "wantQuery",
      default: true,
      message: "Do you want to add graphql Query?"
    },
    {
      type: "confirm",
      name: "wantMutation",
      default: true,
      message: "Do you want to add graphql Mutation?"
    }
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
        type: "add",
        path: "../src/features/{{camelCase name}}/model.ts",
        templateFile: "./component/index.tsx.hbs",
        abortOnFail: true
      },
      {
        type: "add",
        path: "../src/features/{{camelCase name}}/schema.ts",
        templateFile: "./component/index.tsx.hbs",
        abortOnFail: true
      },
      {
        type: "add",
        path: "../src/features/{{camelCase name}}/typeDefs.ts",
        templateFile: "./component/index.tsx.hbs",
        abortOnFail: true
      },
      {
        type: "add",
        path: "../src/features/{{camelCase name}}/resolvers/index.ts",
        templateFile: "./component/index.tsx.hbs",
        abortOnFail: true
      }
    ];

    if (data.wantQuery) {
      actions.push({
        type: "add",
        path: "../src/features/{{camelCase name}}/resolvers/queries.ts",
        templateFile: "./container/validations.tsx.hbs",
        abortOnFail: true
      });
    }

    if (data.wantMutation) {
      actions.push({
        type: "add",
        path: "../src/features/{{camelCase name}}/resolvers/queries.ts",
        templateFile: "./container/validations.tsx.hbs",
        abortOnFail: true
      });
    }

    // if (data.wantSubscription) {
    //   actions.push({
    //     type: "add",
    //     path: "../src/features/{{camelCase name}}/resolvers/queries.ts",
    //     templateFile: "./container/validations.tsx.hbs",
    //     abortOnFail: true
    //   });
    // }

    return actions;
  }
};
