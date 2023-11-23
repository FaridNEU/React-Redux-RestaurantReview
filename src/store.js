import { configureStore } from '@reduxjs/toolkit';
import postReducer from './reducers/postReducer';
import userReducer from './reducers/userReducer';
import loggedInReducer from './reducers/loggedInReducer';

const store = configureStore({
  reducer: {
    posts: postReducer,
    users: userReducer,
    loggedInUser: loggedInReducer,
  }
});

export default store;
