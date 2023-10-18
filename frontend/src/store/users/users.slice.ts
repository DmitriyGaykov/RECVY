// slice

import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type UserStateType = {
  token?: string;
}

const initialState : UserStateType = {
  token: null
}

export const usersSlice = createSlice({
  name: 'users-slice',
  initialState,
  reducers: {
    setToken(state : UserStateType, action : PayloadAction<string>) {
      state.token = action.payload;
    }
  }
})

export const { setToken } = usersSlice;
export const usersReducer = usersSlice.reducer;