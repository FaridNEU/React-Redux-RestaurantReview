import { createSlice } from '@reduxjs/toolkit';

const postSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
  },
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload; 
    },
    addPost: (state, action) => {
      state.posts.push(action.payload);
    },
    addComment: (state, action) => {
      const { postId, commentData } = action.payload;
      state.posts[postId].comments.push(commentData);
    },
    editPost: (state, action) => {
      const { postId, newData } = action.payload;
      state.posts[postId].data = newData;
    },
    editComment: (state, action) => {
      const { postId, commentId, newCommentData } = action.payload;
      state.posts[postId].comments[commentId] = newCommentData;
    },
    deletePost: (state, action) => {
      const postId = action.payload;
      state.posts.splice(postId, 1);
    },
    deleteComment: (state, action) => {
      const { postId, commentId } = action.payload;
      state.posts[postId].comments.splice(commentId, 1);
    },
  },
});

export const {
  setPosts,
  addPost,
  addComment,
  editPost,
  editComment,
  deletePost,
  deleteComment,
} = postSlice.actions;
export default postSlice.reducer;