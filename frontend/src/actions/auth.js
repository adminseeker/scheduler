import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import url from '../utils/backendUrl'

let backend_url = url()

const register = ({email,password,phone,name}) =>{
  return async (dispatch) => {
    const config = {
      headers: {
        'Content-Type':'application/json',
      }
    }
    const body = JSON.stringify({email,password,phone,name})
    try{
      const res=await axios.post(backend_url+'/api/users',body,config);
      if (!!res.data.token) {
        dispatch({
          type: 'LOGIN_SUCCESS',
          token: res.data.token,
        });
      }

      dispatch(loadUser());
      if(!res.data.token) return res.data.msg

      return res.data;
    } catch (err) {
      if (err && err.response && err.response.status === 400) {
        dispatch({
          type: 'LOGIN_FAIL',
        });
        return err.response.data.errors[0].msg;
      }
    }
  };
};

const login = ({ email, password }) => {
  return async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify({ email, password });
    try {
      const res = await axios.post(backend_url+'/api/auth/login', body, config);
      if (!!res.data.token) {
        dispatch({
          type: 'LOGIN_SUCCESS',
          token: res.data.token,
        });
      }

      dispatch(loadUser());
      if(!res.data.token) return 'fail'

      return 'success';
    } catch (err) {
      if (err && err.response && err.response.status === 400) {
        dispatch({
          type: 'LOGIN_FAIL',
        });
        return err.response.data.errors[0].msg;
      }
    }
  };
};

const logout = () => {
  return async (dispatch) => {
    try {
      await axios.post(backend_url+'/api/auth/logout');
      dispatch({
        type: 'LOGOUT',
      });
    } catch (error) {
      console.log(error);
    }
  };
};

const logoutAll = () => {
  return async (dispatch) => {
    try {
      await axios.post(backend_url+'/api/auth/logoutAll');
      dispatch({
        type: 'LOGOUT',
      });
    } catch (error) {
      console.log(error);
    }
  };
};

const loadUser = () => {
  return async (dispatch) => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    try {
      const res = await axios.get(backend_url+'/api/auth');
      dispatch({
        type: 'USER_LOADED',
        user: res.data,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: 'AUTH_ERROR',
      });
    }
  };
};

const updateAccount = (data) => {
  return async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify(data);
    try {
      let res = await axios.patch(backend_url+'/api/users', body, config);
      await dispatch(loadUser());
      return res.data;
    } catch (err) {
      console.log(err);
      dispatch({
        type: 'AUTH_ERROR',
      });
    }
  };
};

const changePassword = ({ password, newPassword }) => {
  return async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify({ password, newPassword });
    try {
      const res = await axios.patch(backend_url+'/api/users/password', body, config);
      return res.data;
    } catch (err) {
      console.log(err);
      dispatch({
        type: 'ERROR',
      });
    }
  };
};

const sendOtp = (email) => {
  return async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify({ email });
    try {
      const res = await axios.post(backend_url+'/api/auth/sendotp', body, config);
      dispatch({
        type: 'FORGOT_PASSWORD',
        email: email,
      });
      return res.data;
    } catch (err) {
      console.log(err);
      dispatch({
        type: 'FORGOT_PASSWORD_ERROR',
      });
    }
  };
};

const resetPassword = (email, otp, newPassword) => {
  return async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify({ email, otp, newPassword });
    try {
      const res = await axios.post(backend_url+'/api/auth/resetpassword', body, config);
      dispatch({
        type: 'FORGOT_PASSWORD',
        email: '',
      });
      return res.data;
    } catch (err) {
      console.log(err);
      dispatch({
        type: 'FORGOT_PASSWORD_ERROR',
      });
    }
  };
};

const deleteAccount = () => {
  return async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.delete(backend_url+'/api/users/', config);
      dispatch({
        type: 'LOGOUT',
      });
      return res.data;
    } catch (err) {
      console.log(err);
      dispatch({
        type: 'ERROR',
      });
    }
  };
};

export {
  loadUser,
  register,
  login,
  logout,
  logoutAll,
  updateAccount,
  changePassword,
  deleteAccount,
  sendOtp,
  resetPassword,
};
