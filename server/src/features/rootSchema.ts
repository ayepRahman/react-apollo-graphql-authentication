import { mergeSchemas } from 'graphql-tools';
import todosSchema from './todos/schema';
import authSchema from './auth/schema';
import usersSchema from './users/schema';
/* CODE-GENERATOR - ROOTSCHEMA IMPORT */

export default mergeSchemas({
  schemas: [
    todosSchema,
    authSchema,
    usersSchema,
    /* CODE-GENERATOR - ROOTSCHEMA DEFAULT */
  ],
});
