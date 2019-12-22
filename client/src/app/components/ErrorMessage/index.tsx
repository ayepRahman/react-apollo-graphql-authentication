import React from 'react';
import styled from 'styled-components';

interface IErrorMessage {
  errors: any;
  name: string;
}

const Message = styled.p`
  color: #ff4161;
`;

const ErrorMessage = ({ errors, name }: IErrorMessage) => {
  // Note: if you are using FormContext, then you can use Errors without props eg:
  // const { errors } = useFormContext();
  if (!errors[name]) return null;

  console.log(errors);

  return <Message>{errors[name].message}</Message>;
};

export default ErrorMessage;
