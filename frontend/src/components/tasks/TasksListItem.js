import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';


const TasksListItem = (props) => {

  return (
    <div>
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
