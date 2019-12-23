import { Card as AntdCard } from 'antd';
import styled from 'styled-components';
import { animated } from 'react-spring';

const Card = styled(animated(AntdCard))`
  margin: 5rem !important;
`;

export default Card;
