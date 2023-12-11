import {User} from "../../models";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface SubscribersState {
  subscribers: User[];
}

const initialState: SubscribersState = {
  subscribers: []
}

export const subscribersSlice = createSlice({
  name: 'subscribers-slice',
  initialState,
  reducers: {
    setSubscribers: (state, action: PayloadAction<User[]>) => {
      state.subscribers = action.payload;
    },
    clearSubscribers: state => {
      state.subscribers = [];
    },
    deleteFromSubscribers: (state, action: PayloadAction<string>) => {
      state.subscribers = state.subscribers.filter(subscriber => subscriber.id !== action.payload);
    }
  }
});

export const { setSubscribers: setStoreSubscribers, clearSubscribers, deleteFromSubscribers } = subscribersSlice.actions;
export const subscribersReducer = subscribersSlice.reducer;