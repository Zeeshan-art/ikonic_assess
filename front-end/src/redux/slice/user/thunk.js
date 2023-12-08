import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const signup = createAsyncThunk("user/register-user", async (body) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/user/register-user",
      body,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("signup:", response.data);
    return response.data;
  } catch (error) {
    console.log("sigerror", error.message);
    return error;
  }
});
