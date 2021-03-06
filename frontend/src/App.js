import React,{useEffect} from 'react';
import AppRouter from './routers/AppRouter';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/auth';

const store = configureStore();

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <div>
      <Provider store={store}>
        <AppRouter/>
      </Provider>
    </div>
  );
}

export default App;
