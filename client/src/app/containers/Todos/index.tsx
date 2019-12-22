import React from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';

import CreateTodos from './CreateTodos';
import ListsTodos from './ListsTodos';
import Divider from 'app/components/Divider/Divider';

const TodosContainer = styled.div`
  color: #fafafa;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 650px;
  height: 750px;
  transform: translate(-50%, -50%);
  background-color: #393f49;
  border-radius: 5px;
  padding: 4rem;
  box-shadow: 5px 5px 15px 5px rgba(0, 0, 0, 0.3);
  overflow-y: auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 2rem;
`;

const DateContent = styled.div`
  font-size: 18px;
`;

const ActiveNumber = styled.div`
  font-size: 14px;
  color: ${p => p.theme.colors.primary};
`;

const Todos: React.FC = () => {
  return (
    <TodosContainer>
      <Header>
        <div>
          <DateContent>{format(new Date(), 'iiii, LLL d')}</DateContent>
          <ActiveNumber>3 active tasks</ActiveNumber>
        </div>
      </Header>
      <CreateTodos />
      <Divider />
      <ListsTodos />
    </TodosContainer>
  );
};

export default Todos;
