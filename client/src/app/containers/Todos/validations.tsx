/*
 * VALIDATIONS
 * Object schema validation
 * @see https://github.com/jquense/yup
 */

import * as yup from 'yup';
import { fieldNames } from './enumerations';

export const createTodoValidationSchema = yup.object().shape({
  [fieldNames.task]: yup
    .string()
    .min(4)
    .max(30)
    .required(),
});

export const updateTodoValidationSchema = yup.object().shape({
  [fieldNames.task]: yup
    .string()
    .min(4)
    .max(30)
    .required(),
});
