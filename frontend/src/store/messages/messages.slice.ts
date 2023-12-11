import {Message} from "../../models";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {act} from "react-dom/test-utils";
import {dateMapper} from "../../utils";

export interface MessageState {
  messages: Message[];
}

export type EditMessageParams = {
  messageid: string;
  newValue: string;
}

const initialState : MessageState = {
  messages: []
}

export const messageSlice = createSlice({
  name: 'message-slice',
  initialState,
  reducers: {
    setMessages: (state: MessageState, action: PayloadAction<Message[]>) => {
      const messages = action.payload;
      if(messages == null || !Array.isArray(messages)) return;
      state.messages = messages;
    },
    removeMessage: (state: MessageState, action: PayloadAction<string>) => {
      const messages = state.messages;
      const messageid = action.payload;
      state.messages = messages.filter(el => el.messageid !== messageid);
    },
    editMessage: (state: MessageState, action: PayloadAction<EditMessageParams>) => {
      state.messages = state.messages.map(msg => {
        return msg.messageid !== action.payload.messageid ? msg : ({
          ...msg,
          isedited: true,
          message: action.payload.newValue
        });
      })
    },
    addMessage: (state: MessageState, action: PayloadAction<Message>) => {
      if(state.messages.findIndex(value => value.messageid === action.payload.messageid) !== -1)
        return;
      state.messages = [...state.messages, dateMapper(action.payload, 'sentdate')];
    }
  }
})

export const messageReducer = messageSlice.reducer;
export const { setMessages, removeMessage, editMessage, addMessage } = messageSlice.actions;