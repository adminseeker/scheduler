import React, { useState } from "react";
import TasksForm from "./TasksForm";
import {addTask} from "../../actions/tasks";
import {connect} from "react-redux";
import { useLocation, Navigate,useParams } from "react-router-dom";



const AddTask = ({addTask,isAuthenticated})=>{
  let location = useLocation();
  let params=useParams()
  let date=params.date
    const [submit,setSubmit] = useState(false)
    return !isAuthenticated ? <Navigate to="/login" state={{ from: location }} replace /> : submit ? <Navigate to="/dashboard" state={{ from: location }} replace /> :
    (
        <div>
            <TasksForm date={date} onSubmit={(task)=>{addTask(task,date)
                setSubmit(true)
            }}/>
        </div>
    )
}

const mapStateToProps = (state,props)=>({
    isAuthenticated:state.auth.isAuthenticated
})

export default connect(mapStateToProps,{addTask})(AddTask);
