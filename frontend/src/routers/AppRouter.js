import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createBrowserHistory as createHistory } from 'history';
// import PrivateRoute from './PrivateRoute';
import Dashboard from '../components/Dashboard';
import Landing from '../components/Landing';
import Login from '../components/auth/Login';
import AddTask from '../components/tasks/AddTask';
import EditTask from '../components/tasks/EditTask';
import Register from '../components/auth/Register';
import ForgotPassword from '../components/auth/ForgotPassword';

const history = createHistory();

const AppRouter = () => {
  return (
      <BrowserRouter history={history}>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/forgotpassword' element={<ForgotPassword />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/tasks/add/:date' element={<AddTask />} />
          <Route path='/tasks/edit/:date/:id' element={<EditTask />} />
        </Routes>
        </BrowserRouter>
  );
};

export default AppRouter;
