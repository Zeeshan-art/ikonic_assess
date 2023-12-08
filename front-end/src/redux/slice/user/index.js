import { createSlice } from "@reduxjs/toolkit";
import { signup } from "./thunk";
const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isloading: false,
  token: localStorage.getItem("token") || null,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.isloading = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.user = action.payload;
        console.log("state user:", state.user);
      })
      .addCase(signup.rejected, (state) => {
        state.error = state.error.message;
        console.log("state Error:", state.error.message);
      });
  },
});

export default userSlice.reducer;
