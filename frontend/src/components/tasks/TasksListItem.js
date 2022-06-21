import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Link } from 'react-router-dom';
import {  removeTask } from '../../actions/tasks';
import { getScoreByDate, getTotalScore } from '../../actions/scores';



const TasksListItem = (props) => {
 
  return  (
    <div>
      <Link to={"/tasks/edit/"+props.date+"/"+props.task._id}>Edit</Link>
      <button onClick={async (e)=>{
        props.dispatch(removeTask(props.task._id,props.date))
        let totalData=await props.dispatch(getTotalScore())
        let dailyData=await props.dispatch(getScoreByDate(props.date))
        props.setTotalScore(totalData.totalScore)
        props.setDailyScore(dailyData.dailyScore)

      }}>Delete</button>
      <h3> Task: {props.task.name}</h3>
      <h3> Description: {props.task.description}</h3>
      <h3> Status: {props.task.status}</h3>
      <h3> Score: {props.task.score}</h3>
      <h3> start_time: {moment(props.task.start_time).format('MMMM Do YYYY, h:mm:ss a')}</h3>
      <h3> end_time: {moment(props.task.end_time).format('MMMM Do YYYY, h:mm:ss a')}</h3>

      <br></br>
    </div>
  );
};

export default connect()(TasksListItem);
