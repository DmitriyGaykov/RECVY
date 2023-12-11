import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {User} from "../../models";

export interface FriendsSlice {
  friends: User[]
}

const initialState: FriendsSlice = {
  friends: []
}

export const friendsSlice = createSlice({
  name: 'friends-slice',
  initialState,
  reducers: {
    setFriends: (state, action: PayloadAction<User[]>) => {
      state.friends = action.payload;
    },
    clearFriends: state => {
      state.friends = [];
    },
    deleteFromFriends: (state, action: PayloadAction<string>) => {
      state.friends = state.friends.filter(friend => friend.id !== action.payload);
    }
  }
})

export const {setFriends, clearFriends, deleteFromFriends} = friendsSlice.actions;
export const friendsReducer = friendsSlice.reducer;