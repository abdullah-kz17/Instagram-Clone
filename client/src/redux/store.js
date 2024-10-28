import { configureStore } from "@reduxjs/toolkit";
import postSlice from "./postSlice";
import authSlice from "./authSlice";

const store = configureStore({
  reducer: {
    post: postSlice,
    auth: authSlice,
  }, // Define your reducers here
});

export default store;
