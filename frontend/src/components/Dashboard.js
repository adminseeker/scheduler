import React from "react";
import {connect} from 'react-redux'
import { logout } from "../actions/auth";
import { useLocation, Navigate } from "react-router-dom";
import TasksList from "./tasks/TasksList";

const Dashboard = (props)=>{
  
  let location = useLocation();
  return !props.isAuthenticated ? <Navigate to="/login" state={{ from: location }} replace />
    : <div>
      <h1>Dashboard</h1>
      <button onClick={()=>props.dispatch(logout())}>Logout</button>
      <TasksList />
    </div>
}

const mapStateToProps = (state,props) =>({
  user:state.auth.user,
  isAuthenticated:state.auth.isAuthenticated
})

export default connect(mapStateToProps)(Dashboard);
