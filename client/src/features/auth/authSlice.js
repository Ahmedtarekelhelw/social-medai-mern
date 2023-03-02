import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    // Auth
    setLogin: (state, action) => {
      state.token = action.payload.token;
    },

    setLogout: (state) => {
      state.token = null;
    },

    setToken: (state, action) => {
      state.token = action.payload.token;
    },
  },
});

export const { setLogin, setLogout, setToken } = authSlice.actions;

export default authSlice.reducer;

export const auth = (state) => state.auth;
