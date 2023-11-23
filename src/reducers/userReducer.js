import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
  },
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload; 
    },
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
    editUser: (state, action) => {
      const { userId, newData } = action.payload;
      state.users[userId] = newData;
    },
    deleteUser: (state, action) => {
      const userId = action.payload;
      state.users.splice(userId, 1);
    },
  },
});

export const {
  setUsers,
  addUser,
  editUser,
  deleteUser,
} = userSlice.actions;
export default userSlice.reducer;