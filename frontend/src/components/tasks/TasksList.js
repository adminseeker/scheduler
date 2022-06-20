/* eslint-disable eqeqeq */
import React,{useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { getTasks } from '../../actions/tasks';
import { getTotalScore } from '../../actions/scores';
import TasksListItem from './TasksListItem';



const TasksList = ({ tasks, getTasks,getTotalScore }) => {
  const [totalScore,setTotalScore] = useState(0)
  useEffect(() => {
    getTasks();
    const fun = async ()=>{
      let data=await getTotalScore()
      setTotalScore(data.totalScore)
    }
    fun()
  }, [getTasks,getTotalScore]);
  return Object.keys(tasks).length == 0 ? (
    <div style={{ textAlign: 'center' }}>
      <h3>No Tasks</h3>
    </div>
  ) : (
    <div>
        
     <h3>Tasks</h3>
        <h2>Total Score: {totalScore}</h2>
        { tasks &&
            tasks.map((task) => <TasksListItem key={task._id} task={task} />)
        }
      
    </div>
  );
};

const mapStateToProps = (state, props) => ({
  tasks: state.tasks,
});

export default connect(mapStateToProps, { getTasks,getTotalScore })(TasksList);
