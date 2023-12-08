import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./redux/slice/user";
const store = configureStore({
  reducer: {
    user: userSlice,
  },
});

export default store;
