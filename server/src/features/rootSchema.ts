import { mergeSchemas } from 'graphql-tools';
import todosSchema from './todos/schema';
import authSchema from './auth/schema';
/* CODE-GENERATOR - ROOTSCHEMA IMPORT */

export default mergeSchemas({
  schemas: [
    todosSchema,
    authSchema,
    /* CODE-GENERATOR - ROOTSCHEMA DEFAULT */
  ],
});
