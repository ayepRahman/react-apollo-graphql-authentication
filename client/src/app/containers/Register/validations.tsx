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
    .label('Username'),
  [fieldNames.email]: yup
    .string()
    .email()
    .required()
    .label('Email'),
  [fieldNames.password]: yup
    .string()
    .min(4)
    .max(30)
    .required()
    .label('Password'),
  [fieldNames.confirmPassword]: yup
    .string()
    .min(4)
    .max(30)
    .required()
    .oneOf([yup.ref('password'), null], "Passwords don't match")
    .label('Confirm Password'),
});
