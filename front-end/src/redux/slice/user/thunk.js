import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const signup = createAsyncThunk("user/register", async (body) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/user/register",
      body,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    return error.response;
  }
});
