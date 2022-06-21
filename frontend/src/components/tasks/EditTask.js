import React, { useState } from "react";
import {connect} from "react-redux";
import TasksForm from "./TasksForm";
import {editTask} from "../../actions/tasks";
import { useLocation, Navigate,useParams } from "react-router-dom";


const EditTask = (props)=>{
    let location = useLocation();
    let params=useParams()
    let date=params.date
    let id=params.id
    let task = props.tasks.filter((task)=>(String(task._id)===String(id)))[0]
    const [submit,setSubmit] = useState(false)
    return !props.isAuthenticated ? <Navigate to="/login" state={{ from: location }} replace /> : submit ? <Navigate to="/dashboard" state={{ from: location }} replace /> :
    (
        <div>
            <TasksForm date={date} task={task} onSubmit={(updates)=>{props.dispatch(editTask(updates,task._id,date)); setSubmit(true)}}/>
        </div>
    )
}

const mapStateToProps = (state,props)=>{
    return{
        tasks:state.tasks,
        isAuthenticated:state.auth.isAuthenticated
    }

};


export default connect(mapStateToProps)(EditTask);
