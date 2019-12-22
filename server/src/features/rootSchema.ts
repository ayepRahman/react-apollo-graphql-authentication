import { mergeSchemas } from 'graphql-tools';
import todosSchema from './todos/schema';

export default mergeSchemas({ schemas: [todosSchema] });
