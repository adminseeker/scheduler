import React,{useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { getTasksByDate } from '../../actions/tasks';
import { getTotalScore,getScoreByDate } from '../../actions/scores';
import TasksListItem from './TasksListItem';

import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Link } from 'react-router-dom';


const TaskDatePicker = (props) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
    <DatePicker
        label="Date"
        value={props.date}
        onChange={(newValue) => {
          let newDate=new Date(newValue).getFullYear().toString()+"-"+(new Date(newValue).getMonth()+1).toString()+"-"+new Date(newValue).getDate()
          props.setDate(newDate);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  )
}



const TasksList = ({ tasks,getTotalScore,getTasksByDate,getScoreByDate }) => {
  const [totalScore,setTotalScore] = useState(0)
  const [dailyScore,setDailyScore] = useState(0)
  const [date, setDate] = React.useState(new Date().getFullYear().toString()+"-"+(new Date().getMonth()+1).toString()+"-"+new Date().getDate());
  useEffect(() => {
    const fun = async ()=>{
      let totalData=await getTotalScore()
      let dailyData=await getScoreByDate(date)
      setTotalScore(totalData.totalScore)
      setDailyScore(dailyData.dailyScore)
    }
    fun()
    getTasksByDate(date)

  }, [getTasksByDate,getTotalScore,getScoreByDate,date]);
  return Object.keys(tasks).length === 0 ? (
    <div style={{ textAlign: 'center' }}>
      <TaskDatePicker date={date} setDate={setDate}/>
      <Link to={"/tasks/add/"+date}>Add Task</Link>
      <h3>No Tasks</h3>
    </div>
  ) : (
    <div>
      <br></br>
        <TaskDatePicker date={date} setDate={setDate}/>
      <Link to={"/tasks/add/"+date}>Add Task</Link>
     <h3>Tasks</h3>
        <h2>Total Score: {totalScore}</h2>
        <h2>Score on {date}: {dailyScore}</h2>
        { tasks &&
            tasks.map((task) => <TasksListItem key={task._id} task={task} />)
        }
      
    </div>
  );
};

const mapStateToProps = (state, props) => ({
  tasks: state.tasks,
});

export default connect(mapStateToProps, { getTasksByDate,getTotalScore,getScoreByDate })(TasksList);
