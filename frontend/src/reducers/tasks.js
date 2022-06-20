const defaultTaskState = [];

const tasksReducer = (state = defaultTaskState, action) => {
  switch (action.type) {
    case 'ADD_TASK':
      return [...state, action.task];
    case 'EDIT_TASK':
      return state.map((task) => {
        if (task._id === action._id) {
          return {
            ...task,
          };
        } else {
          return task;
        }
      });
    case 'REMOVE_TASK':
      return state.filter((task) => task._id !== action._id);
    case 'GET_TASKS':
      return action.tasks;

    case 'TASKS_ERROR':
      return {
        ...state,
      };
    case 'LOGOUT':
      return [];
    default:
      return state;
  }
};

export default tasksReducer;
