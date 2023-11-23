import { createSlice } from '@reduxjs/toolkit';

const loggedInUserSlice = createSlice({
  name: 'loggedInUser',
  initialState: {
    username: '',
  },
  reducers: {
    setLoggedInUser: (state, action) => {
        state.username = action.payload; 
    },
    deleteLoggedInUser: (state) => {
        state.username = ''; 
    },
  },
});

export const {
  setLoggedInUser,
  deleteLoggedInUser,
} = loggedInUserSlice.actions;
export default loggedInUserSlice.reducer;