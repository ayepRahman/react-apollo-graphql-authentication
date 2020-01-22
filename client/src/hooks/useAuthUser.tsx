import { useApolloClient } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';
import { LOCAL_STORAGE_TEMPLATE, ROUTES } from 'enumerations';

const useAuthUser = () => {
  const client = useApolloClient();
  const history = useHistory();

  const setAuthUser = (token: string) => {
    localStorage.setItem(LOCAL_STORAGE_TEMPLATE.token, token);
    history.push(ROUTES.dashboard);
  };

  const logout = () => {
    client.resetStore();
    localStorage.clear();
    history.push('/');
  };

  return { logout, setAuthUser };
};

export default useAuthUser;
