import React, { useState } from "react";
import TasksForm from "./TasksForm";
import {addTask} from "../../actions/tasks";
import {connect} from "react-redux";
import { useLocation, Navigate,useParams } from "react-router-dom";
import { promise } from "bcrypt/promises";


const AddTask = ({addTask})=>{
  let location = useLocation();
  let params=useParams()
  let date=params.id
    const [submit,setSubmit] = useState(false)
    return submit ? <Navigate to="/dashboard" state={{ from: location }} replace /> :
    (
        <div>
            <TasksForm onSubmit={(task)=>{addTask(task,date)
                setSubmit(true)
            }}/>
        </div>
    )
}

const mapStateToProps = (state,props)=>({
})

export default connect(mapStateToProps,{addTask})(AddTask);
