import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "post",
  initialState: {
    posts: [],
    selectedPosts: null,
  },
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    removePost: (state, action) => {
      state.posts = state.posts.filter((post) => post._id !== action.payload);
    },
    setSelectedPosts: (state, action) => {
      state.selectedPosts = action.payload;
    },
  },
});

export const { setPosts, removePost, setSelectedPosts } = postSlice.actions;

export default postSlice.reducer;
