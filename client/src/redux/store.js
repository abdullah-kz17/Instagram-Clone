import { configureStore } from "@reduxjs/toolkit";
import postSlice from "./postSlice";

const store = configureStore({
  reducer: {
    post: postSlice,
  }, // Define your reducers here
});

export default store;
