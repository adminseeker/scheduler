import React, { useState } from 'react';
import { login } from '../../actions/auth';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { useLocation, Navigate } from "react-router-dom";
// import { Link } from 'react-router-dom';

const Login = (props) => {
  let location = useLocation();
   

    const [formData, setFormData] = useState({
      email: '',
      password: '',
    });
  
    const { email, password } = formData;
  
    const onChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const onSubmit = async (e) => {
      e.preventDefault();
  
      const res = await props.dispatch(login({ email, password }));
      if (res !== 'success') {
        alert("incorrect password!")
        props.dispatch(setAlert(res, 'error'))
      };
      
    };
  
    return props.loading ? (
      <h1>Loading ...</h1>
    ) : props.isAuthenticated ? <Navigate to="/dashboard" state={{ from: location }} replace /> : (
  
        <div>
          <form  onSubmit={onSubmit}>
            
            <input type="email" placeholder='Enter email' id='email' name='email' value={email} onChange={onChange}></input>
            <input type="password" placeholder='Enter password' id='password' name='password' value={password} onChange={onChange}></input>
            <button type='submit'>Login</button>
          </form>
        </div>
    );
  };


const mapStateToProps = (state, props) => ({
    loading: state.auth.loading,
    isAuthenticated: state.auth.isAuthenticated
  });
  
  export default connect(mapStateToProps)(Login);