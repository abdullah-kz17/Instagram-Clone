import { createSlice } from "@reduxjs/toolkit";
const authSlice = createSlice({
  name: "auth",
  initialState: {
    userState: null,
    suggestedUser: [],
    userProfile: null,
  },
  reducers: {
    setSuggestedUsers: (state, action) => {
      state.suggestedUser = action.payload;
    },
    setUserProfile: (state, action) => {
      state.userProfile = action.payload;
    },
    setAuthUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setSuggestedUsers, setUserProfile, setAuthUser } =
  authSlice.actions;
export default authSlice.reducer;
