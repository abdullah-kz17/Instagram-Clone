import { createSlice } from "@reduxjs/toolkit";
const authSlice = createSlice({
  name: "auth",
  initialState: {
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
  },
});

export const { setSuggestedUsers, setUserProfile } = authSlice.actions;
export default authSlice.reducer;
