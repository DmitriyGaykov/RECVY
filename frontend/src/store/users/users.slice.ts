import {User} from "../../models";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type UsersStateType = {
  current: User;
}

const initialState : UsersStateType = {}

const usersSlice = createSlice({
  name: 'users-slice',
  initialState,
  reducers: {
    setCurrentUser(state, action : PayloadAction<User>) : void {
      state.current = action.payload;
    }
  }
})

export const { setCurrentUser } = usersSlice.actions;
export const usersReducer = usersSlice.reducer;