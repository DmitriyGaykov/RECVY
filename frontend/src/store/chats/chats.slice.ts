import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RedirectChatBlockProps} from "../../entities";

export type ChatId = string;
export type SetOnlineOfflineUserChatPayload = { userid: ChatId, isOnline: boolean };

export interface ChatsState {
  current: ChatId;
  toChat: ChatId;
  chats: RedirectChatBlockProps[];
}

const initialState: ChatsState = {
  current: null,
  toChat: null,
  chats: []
}

export const chatsSlice = createSlice({
  name: 'chats-slice',
  initialState,
  reducers: {
    setCurrentChat(state, action: PayloadAction<ChatId>) {
      state.current = action.payload;
    },
    setToChat(state, action: PayloadAction<ChatId>) {
      state.toChat = action.payload;
    },
    setStoreChats(state, action: PayloadAction<RedirectChatBlockProps[]>) {
      state.chats = action.payload || [];
    },
    addChatToStore(state, action: PayloadAction<RedirectChatBlockProps>) {
      const chat = action.payload;
      if (!chat || state.chats.findIndex(el => el.iduserto === chat.iduserto) === -1) return;
      state.chats.push(state);
    },
    updateOrAddChat(state, action: PayloadAction<RedirectChatBlockProps>) {
      const chat = action.payload;
      if (!chat) return;
      if (state.chats.findIndex(el => el.iduserto === chat.iduserto) === -1) {
        state.chats.push(chat);
      } else {
        state.chats = state.chats.map(ch => chat.iduserto === ch.iduserto ? chat : ch);
      }
      state.chats.sort((el1, el2) => el2.sentdate - el1.sentdate);
    },
    setOnlineOfflineUserChat(state, action: PayloadAction<SetOnlineOfflineUserChatPayload>) {
      const {userid, isOnline} = action.payload;
      if (!userid) return;
      const chat = state.chats.find(el => el.iduserto === userid);
      if (!chat) return;
      chat.isOnline = isOnline;
    }
  }
})

export const {setCurrentChat, setStoreChats, setToChat, updateOrAddChat, setOnlineOfflineUserChat} = chatsSlice.actions;
export const chatsReducer = chatsSlice.reducer;