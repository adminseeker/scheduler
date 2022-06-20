import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import authReducer from '../reducers/auth';
import alertReducer from '../reducers/alert';
import loadingReducer from '../reducers/loading';
import tasksReducer from '../reducers/tasks';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = () => {
  const store = createStore(
    combineReducers({
      auth: authReducer,
      tasks: tasksReducer,

      alert: alertReducer,
      buffing: loadingReducer,
    }),
    composeEnhancers(applyMiddleware(thunk))
  );
  return store;
};

export default configureStore;
