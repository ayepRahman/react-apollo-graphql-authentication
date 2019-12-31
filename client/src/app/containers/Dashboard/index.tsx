import React from 'react';
import { Row, Button } from 'antd';
import { useApolloClient } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';
import Col from 'app/components/Col';
import styled from 'styled-components';

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
  const client = useApolloClient();
  const history = useHistory();

  const handleClick = () => {
    client.resetStore();
    localStorage.clear();
    history.push('/');
  };

  return (
    <DashboardContainer>
      <Row>
        <Col>
          <h1 style={{ color: '#ffffff' }}>You're in a protected route</h1>
          <p>Only authorize user can access this page.</p>
          <Button size="large" type="primary" onClick={handleClick}>
            Log out
          </Button>
        </Col>
      </Row>
    </DashboardContainer>
  );
};

Dashboard.propTypes = {};

export default Dashboard;
