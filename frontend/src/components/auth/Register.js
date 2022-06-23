import React, { useState } from "react";
import {register} from "../../actions/auth";
import {connect} from "react-redux";
import { useLocation, Navigate } from "react-router-dom";


const Register = (props)=>{

  const [formData,setFormData] = useState({
    name:"",
    email:"",
    password:"",
    password2:"",
    phone:""
    
});

const [emailError,setEmailError] = useState("")
const [passwordError,setPasswordError] = useState("")
const [phoneError,setPhoneError] = useState("")





const {name,email,password,password2,phone} = formData;



const onChange = (e)=>{
    setFormData({...formData , [e.target.name]:e.target.value})
}

const onSubmit = async (e)=>{
    e.preventDefault();
    if(password!==password2){
        setPasswordError("Passwords do not match");
        alert(passwordError)
    }
    else{
        const res = await props.dispatch(register({name,email,password,phone}));
        if(String(res)==="Email already registered!"){
            setEmailError(res);
            alert(emailError)
        }
        if(String(res)==="Phone already registered!"){
            setPhoneError(res);
            alert(phoneError)
        }
    }
}
    let location = useLocation();
     return props.loading ? <h1>Loading...</h1> : props.isAuthenticated ? <Navigate to="/dashboard" state={{ from: location }} replace /> : (
        <div>
            <form onSubmit={onSubmit}>
            <input name='name' placeholder='name' value={name} onChange={onChange} />
            <input name='email' placeholder='email' type='email' value={email} onChange={onChange} />
            <input name='password' placeholder='password' type='password' value={password} onChange={onChange} />
            <input name='password2' placeholder='confirm password' type='password' value={password2} onChange={onChange} />
            <input name='phone' placeholder='phone' value={phone} type='number' onChange={onChange} />
            <button type="submit">Register</button>
            </form>
        </div>
    );
}

const mapStateToProps = (state,props)=>({
    isAuthenticated:state.auth.isAuthenticated,
    loading:state.auth.loading
})

export default connect(mapStateToProps)(Register);