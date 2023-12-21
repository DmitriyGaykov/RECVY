import {User} from "../../models";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type UsersStateType = {
  current: User;
  users: User[];
  people: User[];
  usersOnline: string[];
}

const initialState: UsersStateType = {
  users: [],
  people: [],
  usersOnline: []
}

const usersSlice = createSlice({
  name: 'users-slice',
  initialState,
  reducers: {
    setCurrentUser(state, action: PayloadAction<User>): void {
      state.current = action.payload;
    },
    addPhoto(state, action: PayloadAction<string>): void {
      state.current.photos?.push(action.payload);
    },
    dellPhoto(state, action: PayloadAction<string>): void {
      state.current.photos = state.current.photos?.filter(el => el !== action.payload);
    },
    setStoreUsers(state, action: PayloadAction<User[]>): void {
      state.users = action.payload;
    },
    clearUsers(state): void {
      state.users = [];
    },
    setPeople(state, action: PayloadAction<User[]>) : void {
      state.people = action.payload;
    },
    clearPeople(state): void {
      state.people = [];
    },
    addOnlineUser(state, { payload }: PayloadAction<string>) : void {
      state.usersOnline = [...new Set<string>([...state.usersOnline, payload])];
    },
    removeUserFromOnline(state, { payload }: PayloadAction<string>): void {
      state.usersOnline = state.usersOnline.filter(el => el !== payload);
    }
  }
})

export const {setCurrentUser, addPhoto, dellPhoto, setStoreUsers, clearUsers, setPeople, clearPeople, addOnlineUser, removeUserFromOnline } = usersSlice.actions;
export const usersReducer = usersSlice.reducer;