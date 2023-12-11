import { createSlice } from "@reduxjs/toolkit";
import { signup } from "./thunk";
const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isLoading: false,
  token: null,
  error: null,
  message: null,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.user = action.payload.data;
        if (action.payload.status === 400) {
          localStorage.removeItem("user");
          state.isLoading = false;
        } else {
          localStorage.setItem("user", JSON.stringify(state.user));
          state.message = action.payload.message;
          console.log(" state.user.message", action.payload.message);
          state.isLoading = false;
        }
      })
      .addCase(signup.rejected, (state, action) => {
        state.error = action.error.message;
        localStorage.removeItem("user");
        state.isLoading = false;
      });
  },
});

export default userSlice.reducer;
