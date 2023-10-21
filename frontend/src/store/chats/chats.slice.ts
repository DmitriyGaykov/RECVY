import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type ChatId = string;
export interface ChatsState {
  current: ChatId;
}

const initialState : ChatsState = {
  current: null
}

export const chatsSlice = createSlice({
  name: 'chats-slice',
  initialState,
  reducers: {
    setCurrentChat(state, action : PayloadAction<ChatId>) {
      state.current = action.payload;
    }
  }
})

export const { setCurrentChat } = chatsSlice.actions;
export const chatsReducer = chatsSlice.reducer;