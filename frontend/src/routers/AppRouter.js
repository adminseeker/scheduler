import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createBrowserHistory as createHistory } from 'history';
// import PrivateRoute from './PrivateRoute';
import Dashboard from '../components/Dashboard';
import Landing from '../components/Landing';
import Login from '../components/Login';
import AddTask from '../components/tasks/AddTask';

const history = createHistory();

const AppRouter = () => {
  return (
      <BrowserRouter history={history}>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/login' element={<Login />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/tasks/add/:id' element={<AddTask />} />
        </Routes>
        </BrowserRouter>
  );
};

export default AppRouter;
