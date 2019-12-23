/**
 *
 * Home
 *
 */

import React, { Suspense } from 'react';
import { Row, Col } from 'antd';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';
import FullPageLoader from 'app/components/Loaders/FullPageLoader';

const Login = React.lazy(() => import('app/containers/Login'));
const Register = React.lazy(() => import('app/containers/Register'));

const HomeContainer = styled.div`
  height: 100vh;
  width: 100vw;
  background: linear-gradient(-255deg, #ad5389, #3c1053);
  /* display: flex;
  justify-content: center;
  align-items: center; */
`;

export const Home: React.FC = () => {
  return (
    <Suspense fallback={<FullPageLoader />}>
      <HomeContainer>
        <Row type="flex" justify="space-between" align="middle">
          <Col span={12}>
            <Login />
          </Col>
          <Col span={12}>
            <Register />
          </Col>
        </Row>
      </HomeContainer>
    </Suspense>
  );
};

export default Home;
