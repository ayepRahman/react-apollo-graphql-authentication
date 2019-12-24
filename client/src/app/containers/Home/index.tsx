/**
 *
 * Home
 *
 */

import React, { Suspense } from 'react';
import styled from 'styled-components';
import { Row, Button } from 'antd';
import { useSpring, animated } from 'react-spring';
import { Title, Subtitle } from 'app/components/Typography';
import FullPageLoader from 'app/components/Loaders/FullPageLoader';
import Spacing from 'app/components/Spacing';
import Col from 'app/components/Col';
import { slideTypes } from './enumerations';

const Login = React.lazy(() => import('app/containers/Login'));
const Register = React.lazy(() => import('app/containers/Register'));

const HomeContainer = styled.div`
  height: 100vh;
  width: 100vw;
`;

const HoverContainer = styled(animated.div)`
  background: linear-gradient(-255deg, #ad5389, #3c1053);
  box-shadow: 0px 0px 10px 10px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  text-align: center;
  height: 100%;
  width: 50%;
  z-index: 99;
  padding: 5rem;
  color: #ffffff;
`;

export const Home: React.FC = () => {
  const [slideState, setSlideState] = React.useState<string>(slideTypes.signup);

  const slideStyles: any = {
    [slideTypes.login]: {
      from: {
        right: '50%',
        background: 'linear-gradient(-255deg, #ad5389, #3c1053)',
      },
      to: {
        right: '0%',
        background: 'linear-gradient(-255deg, #3c1053, #ad5389)',
      },
    },
    [slideTypes.signup]: {
      from: {
        right: '0%',
        background: 'linear-gradient(-255deg, #3c1053, #ad5389)',
      },
      to: {
        right: '50%',
        background: 'linear-gradient(-255deg, #ad5389, #3c1053)',
      },
    },
  };

  const hoverStyle = useSpring({
    from: slideStyles[slideState].from,
    to: slideStyles[slideState].to,
  });

  const loginStyle = useSpring({
    from: {
      opacity: 0,
    },
    to: {
      opacity: slideState === slideTypes.login ? 1 : 0,
    },
  });

  const signupStyle = useSpring({
    from: {
      opacity: 0,
    },
    to: {
      opacity: slideState === slideTypes.signup ? 1 : 0,
    },
  });

  return (
    <Suspense fallback={<FullPageLoader />}>
      <HoverContainer style={hoverStyle}>
        {slideState === slideTypes.login && (
          <div>
            <Title>Don't have an account yet?</Title>
            <Subtitle>Start creating yours right away!</Subtitle>
            <Spacing margin="16px 0 0 0">
              <Button size="large" onClick={() => setSlideState(slideTypes.signup)}>
                SIGN UP
              </Button>
            </Spacing>
          </div>
        )}
        {slideState === slideTypes.signup && (
          <div>
            <Title>Already Signed up?</Title>
            <Subtitle>Go ahead and log in instead to continue building cool stuff!</Subtitle>
            <Spacing margin="16px 0 0 0">
              <Button size="large" onClick={() => setSlideState(slideTypes.login)}>
                LOG IN
              </Button>
            </Spacing>
          </div>
        )}
      </HoverContainer>
      <HomeContainer>
        <Row type="flex" justify="center" align="middle">
          <Col style={loginStyle} span={12}>
            <Login />
          </Col>
          <Col style={signupStyle} span={12}>
            <Register />
          </Col>
        </Row>
      </HomeContainer>
    </Suspense>
  );
};

export default Home;
