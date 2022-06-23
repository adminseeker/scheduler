import React, { useState } from 'react';
import { sendOtp, resetPassword, logout } from '../../actions/auth';
import { connect } from 'react-redux';
import { Navigate,useLocation } from 'react-router-dom';



const ForgotPassword = (props) => {
  const [formData, setFormData] = useState({
    otp: '',
    email: '',
    password: '',
    newPassword: '',
    newPassword2: '',
  });

  const [passwordError, setPasswordError] = useState('');

  const [click, setClick] = useState(false);
  const [islogout, setIslogout] = useState(false);

  const { otp, email, newPassword, newPassword2 } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    const res = await props.dispatch(sendOtp(email));
    if (String(res.code) === '1') {
        alert(res.msg)
        setClick(true);
    } else {
      alert(res.msg)
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== newPassword2) {
      setPasswordError('Passwords do not match');
      alert(passwordError)
    } else {
      const res = await props.dispatch(resetPassword(email, otp, newPassword));
      if (String(res.code) === '1') {
        alert(res.msg);
        await props.dispatch(logout());
        setIslogout(true)
      } else {
        alert(res.msg);
      }
    }
  };
  let location=useLocation()
  return props.loading ? <h1>Loading...</h1> : props.isAuthenticated ? <Navigate to="/dashboard" state={{ from: location }} replace /> : islogout ? <Navigate to="/login" state={{ from: location }} replace /> : (
      <div>
        <form  onSubmit={onSubmit}>
            {!click && <input type='email' name='email' placeholder='email' value={email} onChange={onChange}/>}
            {!click && <button onClick={handleSendOtp}>Send OTP</button>}
            {click && <input type='password' name='otp' placeholder='OTP' value={otp} onChange={onChange}/>}
            {click && <input type='password' name='newPassword' placeholder='New Password' value={newPassword} onChange={onChange}/>}
            {click && <input type='password' name='newPassword2' placeholder='Confirm Password' value={newPassword2} onChange={onChange}/>}
            {click && <button type='submit'>Change Password</button>}   
        </form>
      </div>
  );
};

const mapStateToProps = (state, props) => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading:state.auth.loading
});

export default connect(mapStateToProps)(ForgotPassword);