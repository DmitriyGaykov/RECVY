// slice

import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type AuthStateType = {
  token?: string;
}

const initialState : AuthStateType = {
  token: null
}

export const authSlice = createSlice({
  name: 'auth-slice',
  initialState,
  reducers: {
    setToken(state : AuthStateType, action : PayloadAction<string>) {
      state.token = action.payload;
    }
  }
})

export const { setToken } = authSlice.actions;
export const authReducer = authSlice.reducer;