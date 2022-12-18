import { createSlice } from '@reduxjs/toolkit';

const tasksSlice = createSlice({
    name: 'tasks',
    initialState: [],
    reducers: {
      addTask(state, action) {
        state.push(action.payload);
      },
      deleteTask(state, action) {
        state.splice(action.payload, 1);
      },
      loadTasks(state, action) {
        return action.payload;
      },
    },
  });
  

export const { addTask, deleteTask, loadTasks } = tasksSlice.actions;
export default tasksSlice.reducer;
