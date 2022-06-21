import React, { useState } from 'react';
import { connect } from 'react-redux';
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import moment from "moment";

const TasksForm = (props) => {

  const [name,set_name] = useState(props.task ? props.task.name: "");
  const [description,set_description] = useState(props.task ? props.task.description: "");
  const [status,set_status] = useState(props.task ? props.task.status: "");
  const [score,set_score] = useState(props.task ? props.task.score: 0);
  const [start_time,set_start_time] = useState(props.task ? props.task.start_time: new Date().toISOString());
  const [end_time,set_end_time] = useState(props.task  ? props.task.end_time: new Date().toISOString());

  const onSubmit = (e)=>{
    e.preventDefault();
    if(!name || !score || !start_time || !end_time || !status){
      alert("required");
  }else{
      if(!props.task){
          props.onSubmit({
              name,
              description,
              status,
              score,
              start_time,
              end_time
           });
      }else{
          const updatedItems = {};
          if(props.task.name!==name)
              updatedItems.name=name;
          if(props.task.description!==description)
              updatedItems.description=description;
          if(props.task.status!==status)
              updatedItems.status=status;
          if(props.task.score!==score)
              updatedItems.score=score;
          if(props.task.start_time!==start_time)
              updatedItems.start_time=start_time;
          if(props.task.end_time!==end_time)
              updatedItems.end_time=end_time;
          props.onSubmit(updatedItems);
      }
      
    }
  }

  return (
      <div>
        <form onSubmit={onSubmit}>
          <input name='name' value={name} placeholder='name' onChange={(e)=>set_name(e.target.value)}/>
          <input name='description' value={description} placeholder='description' onChange={(e)=>set_description(e.target.value)}/>
          <input name='score' value={score} placeholder='score' onChange={(e)=>set_score(e.target.value)}/>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
          <TimePicker
          label="start"
          value={start_time}
          onChange={(n) => {
            let date=props.date
            let time=moment(n).format("hh:mm A")
            let datetime = new Date(moment(date+' '+time).format("YYYY-MM-DD hh:mm A"));
            set_start_time(datetime);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
        <TimePicker
          label="end"
          value={end_time}
          onChange={(n) => {
            let date=props.date
            let time=moment(n).format("hh:mm A")
            let datetime = new Date(moment(date+' '+time).format("YYYY-MM-DD hh:mm A"));
            set_end_time(datetime);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
          </LocalizationProvider>
          <select name='status' value={status} onChange={(e)=>set_status(e.target.value)}>
          <option  value=""></option>
            <option  value="completed">Completed</option>
            <option  value="pending">Pending</option>
          </select>
          <button type="submit" >Submit</button>
        </form>
      </div>
  );
};

export default connect()(TasksForm);