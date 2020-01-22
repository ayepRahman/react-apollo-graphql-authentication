import React from 'react';
import { Row, Button, Avatar } from 'antd';
import { useQuery } from '@apollo/react-hooks';
import { GET_USER } from './gql';
import Col from 'app/components/Col';
import Spacing from 'app/components/Spacing';
import styled from 'styled-components';
import FullPageLoader from 'app/components/Loaders/FullPageLoader';
import useAuthUser from 'hooks/useAuthUser';

const DashboardContainer = styled.div`
  height: 100vh;
  width: 100vw;
  background: linear-gradient(-255deg, #ad5389, #3c1053);
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Dashboard = () => {
  const { logout } = useAuthUser();
  const { loading, error, data } = useQuery(GET_USER);
  React.useEffect(() => {
    if (error) {
      console.log(error.message);
    }
  }, [error]);

  const renderData = () => {
    const userOne = data && data.userOne;

    return (
      <Row justify="center">
        <Col>
          <Spacing margin="0 0 16px" textAlign="center">
            {userOne && userOne.imgUrl && (
              <Spacing margin="0 0 16px" textAlign="center">
                <Avatar size="large" src={userOne.imgUrl} />
              </Spacing>
            )}
            <h2 style={{ color: '#ffffff' }}>
              Welcome {(userOne && userOne.username) || 'John Doe'}! You're in a protected route
            </h2>
            <Spacing margin="0 0 16px" textAlign="center">
              <Button size="large" type="primary" onClick={() => logout()}>
                Log out
              </Button>
            </Spacing>
          </Spacing>
        </Col>
        <Col></Col>
      </Row>
    );
  };

  return (
    <DashboardContainer>
      {loading && <FullPageLoader />}
      {data && data.userOne && renderData()}
    </DashboardContainer>
  );
};

export default Dashboard;
