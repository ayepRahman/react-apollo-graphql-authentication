/*
 * VALIDATIONS
 * Object schema validation
 * @see https://github.com/jquense/yup
 */

import * as yup from 'yup';
import { fieldNames } from './enumerations';

export const validationSchema = yup.object().shape({
  [fieldNames.userName]: yup
    .string()
    .min(4)
    .max(30)
    .required()
    .label('User name'),
  [fieldNames.password]: yup
    .string()
    .min(4)
    .max(30)
    .required()
    .label('Password'),
});
