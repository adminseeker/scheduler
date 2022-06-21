import React from "react";
import {connect} from "react-redux";
import TasksForm from "./TasksForm";
import {editTask} from "../../actions/tasks";


const EditTask = (props)=>{
    return(
        <div>
            <TasksForm task={props.task[0]} onSubmit={(updates)=>{await props.dispatch(editTask(updates,props.task[0].id));}}/>
        </div>
    )
}

const mapStateToProps = (state,props)=>{
    return{
        task : state.tasks.filter((task)=>(String(task.id)===String(props.match.params.id)))
    }

};


export default connect(mapStateToProps)(EditTask);
