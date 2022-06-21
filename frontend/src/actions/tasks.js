import axios from 'axios';
import url from '../utils/backendUrl'

let backend_url = url()


const addTask = (task,date) => {
  return async (dispatch) => {
    try {
      const body = JSON.stringify(task);
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const res = await axios.post(backend_url+'/api/tasks/', body, config);
      await dispatch(getTasksByDate(date));
      return res.data;
    } catch (error) {
      console.log(error);
      dispatch({
        type: 'TASKS_ERROR',
      });
    }
  };
};

const getTasks = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get(backend_url+'/api/tasks');
      dispatch({
        type: 'GET_TASKS',
        tasks: res.data,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: 'TASKS_ERROR',
      });
    }
  };
};


const getTasksByDate = (date) => {
  return async (dispatch) => {
    try {
      const body = JSON.stringify({date});
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const res = await axios.post(backend_url+'/api/tasks/date', body, config);
      dispatch({
        type: 'GET_TASKS',
        tasks: res.data,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: 'TASKS_ERROR',
      });
    }
  };
};


const editTask = (task, id,date) => {
  return async (dispatch) => {
    try {
      const body = JSON.stringify(task);
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const res = await axios.patch('/api/tasks/' + id , body, config);

      await dispatch(getTasksByDate(date));
      return res.data;
    } catch (error) {
      console.log(error);
      dispatch({
        type: 'TASKS_ERROR',
      });
    }
  };
};

const removeTask = (id,date) => {
  return async (dispatch) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const res = await axios.delete('/api/tasks/' + id, config);
      await dispatch(getTasksByDate(date));
      return res.data.msg;
    } catch (error) {
      console.log(error);
      dispatch({
        type: 'TASKS_ERROR',
      });
    }
  };
};

export { addTask,getTasks,getTasksByDate,editTask,removeTask };
