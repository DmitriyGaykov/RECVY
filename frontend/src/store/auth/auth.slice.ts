// slice

import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type AuthStateType = {
  token?: string;
}

const initialState : AuthStateType = {
  token: null
}

export const DELETE_TOKEN_FROM_COOKIE: string = 'DELETE_TOKEN_FROM_COOKIE';

export const authSlice = createSlice({
  name: 'auth-slice',
  initialState,
  reducers: {
    setToken(state : AuthStateType, action : PayloadAction<string>) {
      state.token = action.payload;
    },
    clearToken(state : AuthStateType) {
      state.token = DELETE_TOKEN_FROM_COOKIE;
    }
  }
})

export const { setToken, clearToken } = authSlice.actions;
export const authReducer = authSlice.reducer;