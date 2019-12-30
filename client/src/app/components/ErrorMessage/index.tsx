import React from 'react';
import Message from 'app/components/Message';

interface IErrorMessage {
  errors: any;
  name: string;
}

const ErrorMessage = ({ errors, name }: IErrorMessage) => {
  // Note: if you are using FormContext, then you can use Errors without props eg:
  // const { errors } = useFormContext();
  if (!errors[name]) return null;

  return <Message color="error">{errors[name].message}</Message>;
};

export default ErrorMessage;
