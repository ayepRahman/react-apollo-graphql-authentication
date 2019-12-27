import React from 'react';
import styled from 'styled-components';
import { animated, useSpring } from 'react-spring';

interface IMessageStyled {
  textAlign?: string;
  color?: string;
}

// const Message = styled(animated.p)<IMessageStyled>`
//   color: ${p => (p.color ? p.theme.colors[p.color] : p.theme.colors.primary)};
//   text-align: ${p => (p.textAlign ? `${p.textAlign}` : 'left')};
//   margin-top: 8px;
// `;

const Message = styled(({ children, ...props }) => {
  const style = useSpring({
    from: {
      opacity: 0,
      transform: `translateX(100%)`,
    },
    to: {
      opacity: 1,
      transform: `translateX(0%)`,
    },
  });

  return (
    <animated.p style={style} {...props}>
      {children}
    </animated.p>
  );
})`
  color: ${p => (p.color ? p.theme.colors[p.color] : p.theme.colors.primary)};
  text-align: ${p => (p.textAlign ? `${p.textAlign}` : 'left')};
  margin-top: 8px;
`;

export default Message;
